#!/usr/bin/env node
/* Headless walk-through of the site at phone size: `node tools/smoke.js`.
   Serves the repo on a local port, opens every category and school page plus
   a sample of theory pages, takes the main quiz end to end, and fails on any
   JS error, blank page, sideways
   scrolling at phone width, or broken flow. Needs Playwright (resolved locally or
   from the global npm root); skips with exit 0 if it isn't installed.
   SMOKE_ALL_THEORIES=1 opens every theory page instead of a sample. */
"use strict";
var fs = require("fs");
var http = require("http");
var path = require("path");
var vm = require("vm");
var childProcess = require("child_process");

var ROOT = path.resolve(__dirname, "..");

function loadPlaywright() {
  try { return require("playwright"); } catch (e) { /* fall through */ }
  try {
    var g = childProcess.execSync("npm root -g", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    return require(path.join(g, "playwright"));
  } catch (e) { return null; }
}

var TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
function serve() {
  return new Promise(function (resolve) {
    var server = http.createServer(function (req, res) {
      var p = decodeURIComponent(req.url.split("?")[0]);
      if (p.endsWith("/")) p += "index.html";
      var f = path.join(ROOT, p);
      if (f.indexOf(ROOT) !== 0 || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
      fs.createReadStream(f).pipe(res);
    });
    server.listen(0, "127.0.0.1", function () { resolve(server); });
  });
}

/* the data files index.html's loader loads, in order */
function dataFiles() {
  var html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  var m = /var JS = (\[[^\]]*\]);/.exec(html);
  return JSON.parse(m[1]).filter(function (f) { return f.indexOf("data/") === 0; });
}
/* the data, loaded the way the browser loads it, to enumerate pages */
function loadData() {
  var sb = { window: {} };
  vm.createContext(sb);
  dataFiles().forEach(function (f) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sb);
  });
  return sb.window;
}
function pages(W) {
  var D = W.QUIZ_DATA.drill, out = ["", "browse", "quiz", "saved", "history", "debug"];
  function hasQuiz(k) { return D[k].questions && D[k].questions.length; }
  W.LOC_CATEGORIES.forEach(function (c) { out.push(c.id); if (hasQuiz(c.id)) out.push(c.id + "/quiz"); });
  Object.keys(D).forEach(function (k) {
    var d = D[k], base = k === d.categoryId ? k : d.categoryId + "/" + k.slice(d.categoryId.length + 1);
    if (k !== d.categoryId) { out.push(base); if (hasQuiz(k)) out.push(base + "/quiz"); }
    out.push(base + "/browse");
    var leaves = d.areas.filter(function (a) { return !a.sub; });
    if (!process.env.SMOKE_ALL_THEORIES) leaves = leaves.slice(0, 1);
    leaves.forEach(function (a) { out.push(base + "/" + a.key); });
  });
  return out;
}

(async function main() {
  var pw = loadPlaywright();
  if (!pw) { console.log("smoke: Playwright not found, skipping"); process.exit(0); }
  var W = loadData();
  var server = await serve();
  var base = "http://127.0.0.1:" + server.address().port + "/";
  var launch = {};
  if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
  var browser = await pw.chromium.launch(launch);
  var ctx = await browser.newContext(pw.devices["iPhone 13"]);
  var page = await ctx.newPage();
  var failures = [], jsErrors = [];
  page.on("pageerror", function (e) { jsErrors.push(e.message); });
  page.on("console", function (m) { if (m.type() === "error") jsErrors.push(m.text()); });
  function fail(where, msg) { failures.push(where + ": " + msg); }

  async function open(url) {
    jsErrors = [];
    await page.goto(base + url, { waitUntil: "load" });
    // index.html loads its scripts after asking version.json for the build
    try { await page.waitForFunction(function () { return window.CM_READY; }, null, { timeout: 5000 }); }
    catch (e) { fail(url, "page never finished loading"); }
    await page.waitForTimeout(100);
  }
  async function checkPage(where) {
    if (jsErrors.length) fail(where, "JS error: " + jsErrors.join(" | "));
    var info = await page.evaluate(function () {
      var app = document.getElementById("app");
      return {
        text: app ? app.innerText.trim() : "",
        notFound: document.title.indexOf("Not found") === 0,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    if (!info.text) fail(where, "blank page");
    if (info.notFound) fail(where, "rendered as not found");
    if (info.overflow > 0) fail(where, "scrolls sideways by " + info.overflow + "px at phone width");
  }

  /* 1. every page renders */
  var list = pages(W);
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    await open(p ? "?path=" + p : "");
    await checkPage("?path=" + p);
  }
  await open("?path=no/such/page");
  if ((await page.title()).indexOf("Not found") !== 0) fail("?path=no/such/page", "expected the not-found page");

  /* 2. legacy URLs still land somewhere real */
  var legacy = ["quiz.html", "quiz.html?quiz=materialism-higher-order", "favorites.html",
    "history.html", "#/category/dualisms"];
  for (i = 0; i < legacy.length; i++) {
    await open(legacy[i]);
    await page.waitForTimeout(200);
    await checkPage(legacy[i]);
  }

  /* 3. main quiz end to end: answer, results, open a result, come back */
  try {
    await page.evaluate(function () { localStorage.clear(); sessionStorage.clear(); });
    await open("?path=quiz");
    var nq = W.QUIZ_DATA.top.questions.length;
    for (i = 0; i < nq; i++) {
      await page.click(i % 2 ? '[data-ans="no"]' : '[data-ans="yes"]');
      await page.waitForTimeout(260);
    }
    await page.waitForSelector(".r-row", { timeout: 3000 });
    var rows = await page.$$(".r-row");
    if (rows.length !== W.LOC_CATEGORIES.length) fail("main quiz", "expected " + W.LOC_CATEGORIES.length + " result rows, got " + rows.length);
    var shareBox = await (await page.$("[data-share]")).boundingBox();
    var viewH = page.viewportSize().height;
    if (!shareBox || shareBox.y + shareBox.height > viewH) fail("main quiz", "Share button isn't visible without scrolling");
    var firstName = (await page.$eval(".r-row .nm", function (el) { return el.firstChild.textContent; })).trim();
    await page.click(".r-row .r-open");
    await page.waitForTimeout(400);
    var h1 = (await page.innerText("h1")).trim();
    if (h1 !== firstName) fail("main quiz", "tapping '" + firstName + "' opened '" + h1 + "'");
    await page.goBack();
    await page.waitForTimeout(400);
    if (!(await page.$(".r-row"))) fail("main quiz", "back from a result didn't return to the results");
    await checkPage("main quiz results");

    await open("?path=history");
    if ((await page.$$(".fav-card")).length !== 1) fail("history", "finished quiz isn't in history");
    await page.click(".fav-card");
    await page.waitForTimeout(400);
    if (!(await page.$(".r-row"))) fail("history", "history entry didn't open results");
  } catch (e) { fail("main quiz flow", e.message); }

  /* 4. a school's quiz: Previous, resume, results -> theory -> back to results */
  try {
    var school = "materialism-first-order", sq = W.QUIZ_DATA.drill[school];
    await open("?path=materialism/first-order/quiz");
    await page.click('[data-ans="no"]');
    await page.waitForTimeout(300);
    await page.click(".q-backbtn");
    await page.waitForTimeout(300);
    if (!(await page.$(".a-btn.picked-no"))) fail("school quiz", "Previous didn't show the earlier answer");
    await page.click('[data-ans="yes"]');
    await page.waitForTimeout(300);
    await open("?path=materialism/first-order/quiz");      // reload mid-quiz
    if (!(await page.$('[data-act="resume"]'))) fail("school quiz", "reload mid-quiz didn't offer to resume");
    await page.click('[data-act="resume"]');
    await page.waitForTimeout(300);
    for (i = 1; i < sq.questions.length; i++) {
      await page.click('[data-ans="skip"]');
      await page.waitForTimeout(260);
    }
    await page.waitForSelector(".r-row", { timeout: 3000 });
    if ((await page.$$(".r-row")).length !== sq.areas.length) fail("school quiz", "wrong number of result rows");
    // Yes to Q1 alone: the best match leans furthest that way on Q1's axis
    // (cosine with a one-axis answer); ties allowed
    var ax = Object.keys(sq.questions[0].axes)[0], sign = sq.questions[0].axes[ax];
    var fit = sq.areas.map(function (a) {
      var p = sq.profiles[a.key], n = Math.sqrt(Object.keys(p).reduce(function (s, k) { return s + p[k] * p[k]; }, 0));
      return { name: a.name, v: (p[ax] || 0) * sign / n };
    });
    var best = Math.max.apply(null, fit.map(function (f) { return f.v; }));
    var tops = fit.filter(function (f) { return f.v > best - 1e-9; }).map(function (f) { return f.name; });
    var got = (await page.$eval(".r-row .nm", function (el) { return el.firstChild.textContent; })).trim();
    if (tops.indexOf(got) < 0) fail("school quiz", "Yes to Q1 ranked " + got + " first, expected " + tops.join(" or "));
    await page.click(".r-row .r-open");
    await page.waitForTimeout(400);
    if (!(await page.$(".qa-sec"))) fail("school quiz", "theory opened from results doesn't show how you lined up");
    await page.click("[data-back-results]");
    await page.waitForTimeout(400);
    if (!(await page.$(".r-row"))) fail("school quiz", "'Results' link didn't return to the results");
  } catch (e) { fail("school quiz flow", e.message); }

  /* 5. a category page has one clear call to action: its quiz, above the
        fold; the schools stay folded until Browse is tapped */
  try {
    await open("?path=materialism");
    var cta = await page.$("a.cta");
    var box = cta && await cta.boundingBox();
    if (!box || box.y + box.height > page.viewportSize().height) fail("category page", "quiz button isn't visible without scrolling");
    if (await page.isVisible("#kids .r-row")) fail("category page", "the list should start folded");
    await page.click("[data-browse]");
    if (!(await page.isVisible("#kids .r-row"))) fail("category page", "Browse didn't open the list");
    await page.click("#kids .r-open");
    await page.waitForTimeout(300);
    await page.goBack();
    await page.waitForFunction(function () { return window.CM_READY; });
    if (!(await page.isVisible("#kids .r-row"))) fail("category page", "coming back from a school folded the list again");
  } catch (e) { fail("category page flow", e.message); }

  /* 6. bookmarks: save a theory, see it on the saved page, remove it */
  try {
    var dk = "panpsychisms", t = W.QUIZ_DATA.drill[dk].areas[0];
    await open("?path=" + dk + "/" + t.key);
    await page.click("[data-bm]");
    await open("?path=saved");
    var saved = await page.innerText("#app");
    if (saved.indexOf(t.name) < 0) fail("saved", "bookmarked '" + t.name + "' isn't listed");
    await page.click("[data-unbm]");
    await page.waitForTimeout(200);
    if ((await page.$$(".fav-card")).length) fail("saved", "removing the bookmark didn't remove it");
  } catch (e) { fail("bookmark flow", e.message); }

  /* 7. grouped and under-review theories: results show members on their
        lead's row; member pages say which theories they share answers with */
  try {
    var gq = Object.keys(W.QUIZ_DATA.drill).filter(function (k) {
      return W.QUIZ_DATA.drill[k].areas.some(function (a) { return a.group; });
    })[0];
    var gd = W.QUIZ_DATA.drill[gq], mem = gd.areas.filter(function (a) { return a.group; })[0];
    var lead = gd.areas.filter(function (a) { return a.key === mem.group; })[0];
    await open("?path=" + gq.replace(gd.categoryId + "-", gd.categoryId + "/") + "/quiz");
    var nq2 = gd.questions.length;
    for (i = 0; i < nq2; i++) { await page.click('[data-ans="skip"]'); await page.waitForTimeout(240); }
    await page.waitForSelector(".r-row", { timeout: 3000 });
    var rowsText = await page.innerText("#app");
    if (rowsText.indexOf(mem.name) < 0) fail("grouped theory", mem.name + " isn't shown on " + lead.name + "'s row");
    if ((await page.$$(".r-row")).length !== gd.areas.filter(function (a) { return !a.group; }).length) fail("grouped theory", "grouped theories should not get rows of their own");
    var memNode = await page.evaluate(function (k) { var n = CM.node("theory", k); return n && CM.href(n); }, mem.key);
    await open(memNode);
    var note = await page.innerText("#app");
    if (note.indexOf(lead.name) < 0) fail("grouped theory", mem.name + "'s page doesn't mention " + lead.name);
    if (mem.review && note.indexOf("still reviewing") < 0) fail("under review", mem.name + "'s page doesn't say LOC is reviewing it");
    await checkPage(memNode);
  } catch (e) { fail("grouped theory flow", e.message); }

  await browser.close();
  server.close();
  failures.forEach(function (f) { console.log("FAIL: " + f); });
  console.log("smoke: " + list.length + " pages, " + legacy.length + " legacy URLs, 5 flows: " +
    (failures.length ? failures.length + " failure(s)" : "ok"));
  process.exit(failures.length ? 1 : 0);
})().catch(function (e) { console.error(e); process.exit(1); });
