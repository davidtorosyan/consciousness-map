#!/usr/bin/env node
/* Pre-deploy checks. No dependencies: `node tools/check.js`.
   1. Every script parses (standalone .js and inline <script> blocks).
   2. No line holding only `return` (ASI makes it return undefined).
   3. The quiz data is internally consistent.
   Exits non-zero on any error; warnings are printed but don't fail. */
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");
var childProcess = require("child_process");

var ROOT = path.resolve(__dirname, "..");
var QUIZ_CAP = 12;
var errors = [];
var warnings = [];
function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

/* ---------- 1 + 2: syntax ---------- */
var html = fs.readdirSync(ROOT).filter(function (f) { return /\.html$/.test(f); });
var indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
// the scripts index.html's loader loads, in order (the site's source of truth)
var scripts = [];
var listMatch = /var JS = (\[[^\]]*\]);/.exec(indexHtml);
if (!listMatch) err("index.html: couldn't find the loader's `var JS = [...]` script list");
else scripts = JSON.parse(listMatch[1]);
// EXTRA_DATA=data/quiz-x.js,...: check quiz files not yet in index.html
(process.env.EXTRA_DATA || "").split(",").filter(Boolean).forEach(function (f) {
  scripts.splice(scripts.indexOf("core.js"), 0, f);
});
var cssMatch = /var CSS = (\[[^\]]*\]);/.exec(indexHtml);
(cssMatch ? JSON.parse(cssMatch[1]) : []).forEach(function (f) {
  if (!fs.existsSync(path.join(ROOT, f))) err("index.html loads missing stylesheet " + f);
});
try {
  var ver = JSON.parse(fs.readFileSync(path.join(ROOT, "version.json"), "utf8"));
  if (!ver.v) err("version.json has no \"v\"");
} catch (e) { err("version.json is missing or not JSON: " + e.message); }
scripts.forEach(function (f) {
  var p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { err("index.html loads missing script " + f); return; }
  try { childProcess.execFileSync(process.execPath, ["--check", p], { stdio: "pipe" }); }
  catch (e) { err("syntax error in " + f + ":\n" + String(e.stderr)); }
  fs.readFileSync(p, "utf8").split("\n").forEach(function (line, i) {
    if (/^\s*return\s*$/.test(line)) err(f + ":" + (i + 1) + ": lone `return` (ASI returns undefined)");
  });
});
html.forEach(function (f) {
  var src = fs.readFileSync(path.join(ROOT, f), "utf8");
  var re = /<script>([\s\S]*?)<\/script>/g, m, n = 0;
  while ((m = re.exec(src))) {
    n++;
    try { new vm.Script(m[1], { filename: f + " inline script " + n }); }
    catch (e) { err("syntax error in " + f + " inline script " + n + ": " + e.message); }
  }
});

/* ---------- 3: data ---------- */
var sandbox = { window: {} };
vm.createContext(sandbox);
scripts.filter(function (f) { return f.indexOf("data/") === 0; }).forEach(function (f) {
  try { vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f }); }
  catch (e) { err("could not load " + f + ": " + e.message); }
});
var W = sandbox.window;
var CATS = W.LOC_CATEGORIES || [];
var QD = W.QUIZ_DATA || {};
var DRILL = QD.drill || {};

if (!W.QUIZ_DATA_VERSION) err("QUIZ_DATA_VERSION is not set");
if (CATS.length !== 11) err("expected 11 LOC categories, found " + CATS.length);

var catIds = {};
CATS.forEach(function (c) {
  ["id", "name", "color", "tagline", "url"].forEach(function (k) {
    if (!c[k]) err("category " + (c.id || "?") + " has no " + k);
  });
  if (catIds[c.id]) err("duplicate category id " + c.id);
  catIds[c.id] = true;
  if (!DRILL[c.id]) err("category " + c.id + " has no quiz (QUIZ_DATA.drill." + c.id + ")");
});

function checkQuestions(label, questions, validKeys) {
  if (!questions || !questions.length) { err(label + ": no questions"); return; }
  if (questions.length > QUIZ_CAP) warn(label + ": " + questions.length + " questions (cap " + QUIZ_CAP + ")");
  questions.forEach(function (q, i) {
    var where = label + " question " + (i + 1);
    if (!q.t) err(where + ": no text");
    ["yes", "no"].forEach(function (a) {
      Object.keys(q[a] || {}).forEach(function (k) {
        if (!validKeys[k]) err(where + ": '" + a + "' scores unknown key " + k);
        if (typeof q[a][k] !== "number") err(where + ": '" + a + "." + k + "' is not a number");
      });
    });
  });
}

/* axis quizzes (the main quiz, and category/school quizzes with `axes`):
   questions measure axes, targets have positions on them */
function checkAxisQuiz(label, T, targetKeys) {
  var axisKeys = {};
  (T.axes || []).forEach(function (x) {
    if (axisKeys[x.key]) err(label + ": duplicate axis " + x.key);
    axisKeys[x.key] = 0;
    ["claim", "yes", "no"].forEach(function (k) { if (!x[k]) err(label + ": axis " + x.key + " has no " + k); });
  });
  if (!T.questions || !T.questions.length) err(label + ": no questions");
  else if (T.questions.length > QUIZ_CAP + 1) warn(label + ": " + T.questions.length + " questions (cap " + QUIZ_CAP + ")");
  (T.questions || []).forEach(function (q, i) {
    var where = label + " question " + (i + 1);
    if (!q.t) err(where + ": no text");
    if (!q.why) warn(where + ": no \"Don't get it\" explanation");
    var keys = Object.keys(q.axes || {});
    if (keys.length !== 1) err(where + ": must measure exactly one axis (see CLAUDE.md)");
    keys.forEach(function (k) {
      if (!(k in axisKeys)) err(where + ": unknown axis " + k);
      else axisKeys[k]++;
      if (typeof q.axes[k] !== "number" || !q.axes[k]) err(where + ": axis " + k + " needs a non-zero number");
    });
  });
  Object.keys(axisKeys).forEach(function (k) { if (!axisKeys[k]) err(label + ": no question measures axis " + k); });
  Object.keys(targetKeys).forEach(function (c) {
    var p = (T.profiles || {})[c];
    if (!p) { err(label + ": no profile for " + c); return; }
    if (!Object.keys(p).length) err(label + ": empty profile for " + c);
    Object.keys(p).forEach(function (k) {
      if (!(k in axisKeys)) err(label + ": " + c + " has a position on unknown axis " + k);
      if ([-2, -1, 1, 2].indexOf(p[k]) < 0) err(label + ": " + c + "." + k + " must be -2, -1, 1 or 2");
    });
  });
  Object.keys(T.profiles || {}).forEach(function (c) { if (!targetKeys[c]) err(label + ": profile for unknown target " + c); });
}
if (!QD.top) err("QUIZ_DATA.top (the main quiz) is missing");
else if (!QD.top.axes) err("the main quiz should be an axis quiz");
else checkAxisQuiz("main quiz", QD.top, catIds);

var theoryHome = {};   // theory key -> drill key that lists it
var subParent = {};    // sub drill key -> parent drill key
Object.keys(DRILL).forEach(function (dk) {
  var d = DRILL[dk], label = "quiz " + dk;
  if (!catIds[d.categoryId]) err(label + ": unknown categoryId " + d.categoryId);
  if (!d.name) err(label + ": no name");
  if (!d.areas || !d.areas.length) { err(label + ": no areas"); return; }
  var keys = {};
  d.areas.forEach(function (a) {
    if (!a.key) { err(label + ": area without a key"); return; }
    if (keys[a.key]) err(label + ": duplicate area " + a.key);
    keys[a.key] = true;
    if (!a.name) err(label + ": area " + a.key + " has no name");
    if (!a.tagline) warn(label + ": area " + a.key + " has no tagline");
    if (a.sub) {
      if (a.sub !== a.key) err(label + ": school " + a.key + " has sub " + a.sub + " (expected the same key)");
      if (!DRILL[a.sub]) err(label + ": school " + a.key + " has no quiz");
      else if (DRILL[a.sub].categoryId !== d.categoryId) err(label + ": school " + a.sub + " is in a different category");
      if (subParent[a.sub]) err("school " + a.sub + " is listed by both " + subParent[a.sub] + " and " + dk);
      subParent[a.sub] = dk;
      if (a.key.indexOf(d.categoryId + "-") !== 0) err(label + ": school key " + a.key + " must start with '" + d.categoryId + "-'");
    } else {
      if (!a.url) err(label + ": theory " + a.key + " has no LOC url");
      if (theoryHome[a.key]) err("theory " + a.key + " is listed by both " + theoryHome[a.key] + " and " + dk);
      theoryHome[a.key] = dk;
      if (DRILL[d.categoryId + "-" + a.key]) err("theory " + a.key + " collides with school quiz " + d.categoryId + "-" + a.key);
    }
    if (a.url && !/^https:\/\/loc\.closertotruth\.com\//.test(a.url)) warn(label + ": area " + a.key + " links outside LOC: " + a.url);
  });
  if (d.axes) checkAxisQuiz(label, d, keys);
  else checkQuestions(label, d.questions, keys);
});
Object.keys(DRILL).forEach(function (dk) {
  if (dk !== DRILL[dk].categoryId && !subParent[dk]) err("school quiz " + dk + " isn't listed by any parent");
  if (dk === DRILL[dk].categoryId && !catIds[dk]) err("quiz " + dk + " isn't a category or a school");
});

/* ---------- report ---------- */
warnings.forEach(function (w) { console.log("warn: " + w); });
errors.forEach(function (e) { console.log("ERROR: " + e); });
console.log(scripts.length + " scripts, " + html.length + " html files, " +
  Object.keys(DRILL).length + " quizzes, " + Object.keys(theoryHome).length + " theories: " +
  (errors.length ? errors.length + " error(s)" : "ok") +
  (warnings.length ? ", " + warnings.length + " warning(s)" : ""));
process.exit(errors.length ? 1 : 0);
