#!/usr/bin/env node
/* Do the axis quizzes sort people correctly?
     node tools/eval-quiz.js                  every axis quiz
     node tools/eval-quiz.js panpsychisms     one quiz ("main" for the main quiz)
     node tools/eval-quiz.js main people.json one quiz, scoring the given respondents
   Runs the site's own scoring (core.js) against synthetic respondents:
   1. Ideal respondents: for each target (family or theory), answer every
      question the way its profile implies. It must rank first, or the run
      fails (deploy.sh refuses to ship).
   2. Noisy respondents: the same, but with random answers where the target
      takes no stand, and some answers flipped or skipped, many times.
      Reports how often each still ranks first / top 3, and confusions.
   3. Edge cases: all Yes, all No, all skipped, and others.
   4. Coverage: questions per axis.
   5. Role-played respondents, from tools/eval-thinkers.json (main quiz) or
      tools/eval-thinkers-<quiz key>.json: [{name, family, answers: "ynsy..."}]
      where family is the target key. These come from a blind role-play: an
      agent that never saw the scoring answered as named thinkers. Answers
      are tied to the question wording; stale ones are skipped, so re-run
      the role-play after changing questions. */
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.resolve(__dirname, "..");
/* the data files index.html's loader loads, in order */
function dataFiles() {
  var html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
  var m = /var JS = (\[[^\]]*\]);/.exec(html);
  var files = JSON.parse(m[1]).filter(function (f) { return f.indexOf("data/") === 0; });
  // EXTRA_DATA=data/quiz-x.js,...: try quiz files not yet in index.html
  return files.concat((process.env.EXTRA_DATA || "").split(",").filter(Boolean));
}
var sb = { console: console, btoa: function (s) { return Buffer.from(s, "binary").toString("base64"); },
  atob: function (s) { return Buffer.from(s, "base64").toString("binary"); } };
sb.window = sb;
vm.createContext(sb);
dataFiles().concat(["core.js"]).forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sb, { filename: f });
});
var CM = sb.CM, failures = 0;
/* how a family's ideal respondent answers a question */
function idealAnswer(data, fam, q) {
  var p = data.profiles[fam], s = 0;
  Object.keys(q.axes).forEach(function (k) { s += q.axes[k] * (p[k] || 0); });
  return s > 0 ? "yes" : s < 0 ? "no" : "skip";
}

function pack(a) { return a.map(function (x) { return x === "yes" ? "y" : x === "no" ? "n" : "s"; }).join(""); }
function unpack(s) { return s.split("").map(function (c) { return c === "y" ? "yes" : c === "n" ? "no" : "skip"; }); }
function pct(x) { return (100 * x).toFixed(0).padStart(3) + "%"; }

/* seeded RNG so runs are reproducible */
var seed = 12345;
function rand() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }


function evalQuiz(quiz, thinkersFile) {
  var Q = quiz.questions, data = quiz.data;
  var fams = quiz.targets.map(function (n) { return n.key; });
  var name = {};
  quiz.targets.forEach(function (n) { name[n.key] = n.name; });
  function nm(k) { var s = name[k] || k; return s.length > 30 ? s.slice(0, 29) + "\u2026" : s; }
  function ideal(fam) { return Q.map(function (q) { return idealAnswer(data, fam, q); }); }
  seed = 12345;
  /* ---------- 1. ideal respondents ---------- */
  console.log("1. IDEAL RESPONDENTS (must rank first)");
  fams.forEach(function (f) {
    var a = ideal(f), r = CM.ranked(quiz, a), rank = r.map(function (x) { return x.node.key; }).indexOf(f) + 1;
    var margin = rank === 1 ? r[0].score - r[1].score : r[0].score - r[rank - 1].score;
    if (rank !== 1) failures++;
    console.log("  " + (rank === 1 ? "ok  " : "FAIL") + " " + nm(f).padEnd(30) + " answers " + pack(a) +
      "  rank " + rank + "  score " + r[rank - 1].score.toFixed(2) +
      (rank === 1 ? "  lead over #2 (" + name[r[1].node.key] + ") " + margin.toFixed(2) : "  behind " + name[r[0].node.key]));
  });

  /* ---------- 2. noisy respondents ---------- */
  var RUNS = 2000;
  [{ flip: 0.15, skip: 0.1 }, { flip: 0.25, skip: 0.15 }].forEach(function (noise) {
    console.log("\n2. NOISY RESPONDENTS (" + RUNS + " runs each; random answers where the family takes no stand; " + pct(noise.flip).trim() + " flipped, " +
      pct(noise.skip).trim() + " skipped)");
    console.log("  " + "target".padEnd(30) + " top-1  top-3  most often mistaken for");
    var strongCounts = [];
    fams.forEach(function (f) {
      var base = ideal(f), top1 = 0, top3 = 0, wrong = {};
      for (var i = 0; i < RUNS; i++) {
        // a real person has opinions where their family takes no stand:
        // those answers are random, then some answers are flipped or skipped
        var a = base.map(function (x) {
          if (x === "skip") x = rand() < 0.5 ? "yes" : "no";
          var u = rand();
          if (u < noise.skip) return "skip";
          if (u < noise.skip + noise.flip) return x === "yes" ? "no" : "yes";
          return x;
        });
        var ranked = CM.ranked(quiz, a), order = ranked.map(function (x) { return x.node.key; });
        strongCounts.push(ranked.filter(function (x) { return x.tier === "strong"; }).length);
        var rank = order.indexOf(f);
        if (rank === 0) top1++; else wrong[order[0]] = (wrong[order[0]] || 0) + 1;
        if (rank < 3) top3++;
      }
      var worst = Object.keys(wrong).sort(function (x, y) { return wrong[y] - wrong[x]; }).slice(0, 2)
        .map(function (k) { return name[k] + " " + pct(wrong[k] / RUNS).trim(); }).join(", ");
      console.log("  " + nm(f).padEnd(30) + " " + pct(top1 / RUNS) + "   " + pct(top3 / RUNS) + "   " + (worst || "-"));
    });
    var hist = [0, 0, 0, 0];
    strongCounts.forEach(function (k) { hist[Math.min(k, 3)]++; });
    console.log("  strong matches per result: " + hist.map(function (h, k) {
      return (k === 3 ? "3+" : k) + " " + pct(h / strongCounts.length).trim();
    }).join(", "));
  });

  /* ---------- 3. edge cases ---------- */
  console.log("\n3. EDGE CASES (top 3, with tiers)");
  var n = Q.length;
  function fill(c) { var a = []; for (var i = 0; i < n; i++) a.push(c); return a; }
  [["all Yes", fill("yes")], ["all No", fill("no")], ["all skipped", fill("skip")],
   ["Yes, No alternating", Q.map(function (q, i) { return i % 2 ? "no" : "yes"; })],
   ["only Q1 Yes", Q.map(function (q, i) { return i === 0 ? "yes" : "skip"; })]].forEach(function (c) {
    var r = CM.ranked(quiz, c[1]);
    console.log("  " + c[0].padEnd(22) + r.slice(0, 3).map(function (x) {
      return name[x.node.key] + " " + x.score.toFixed(2) + " (" + x.tier + ")";
    }).join(" | "));
    var s = CM.summary(quiz, c[1]), k = CM.conflicts(quiz, c[1]);
    if (s) console.log("  " + "".padEnd(22) + s);
    if (CM.lopsided(quiz, c[1])) console.log("  " + "".padEnd(22) + "lopsided: " + CM.lopsided(quiz, c[1]) + " (tiers capped, summary hidden)");
    if (k.length) console.log("  " + "".padEnd(22) + "contradictions flagged: " + k.map(function (p) { return "Q" + (p[0] + 1) + "/Q" + (p[1] + 1); }).join(", "));
  });

  /* ---------- 4. coverage ---------- */
  console.log("\n4. COVERAGE (questions measuring each axis)");
  data.axes.forEach(function (x) {
    var qs = Q.map(function (q, i) { return q.axes[x.key] ? "Q" + (i + 1) : null; }).filter(Boolean);
    var stands = fams.filter(function (f) { return data.profiles[f][x.key]; }).length;
    console.log("  " + x.key.padEnd(9) + " " + (qs.join(" ") || "NONE").padEnd(14) + " targets taking a stand: " + stands);
    if (!qs.length) failures++;
  });

  /* ---------- 5. role-played respondents (optional) ---------- */
  if (thinkersFile && fs.existsSync(thinkersFile)) {
    var people = JSON.parse(fs.readFileSync(thinkersFile, "utf8"));
    console.log("\n5. ROLE-PLAYED RESPONDENTS");
    var hit1 = 0, hit3 = 0;
    people = people.filter(function (p) { return p.answers.length === Q.length; });
    if (!people.length) console.log("  (answers don't match the current " + Q.length + " questions; re-run the role-play)");
    people.forEach(function (p) {
      var r = CM.ranked(quiz, unpack(p.answers)), order = r.map(function (x) { return x.node.key; });
      var rank = order.indexOf(p.family) + 1;
      if (rank === 1) hit1++;
      if (rank <= 3) hit3++;
      console.log("  " + (rank === 1 ? "ok  " : rank <= 3 ? "near" : "MISS") + " " + p.name.padEnd(22) + " expected " +
        nm(p.family).padEnd(30) + " rank " + rank + "  got " + r.slice(0, 3).map(function (x) {
          return name[x.node.key] + " " + x.score.toFixed(2);
        }).join(", "));
    });
    if (people.length) console.log("  top-1 " + hit1 + "/" + people.length + ", top-3 " + hit3 + "/" + people.length);
  }

}

/* which quizzes: all axis quizzes, or the one named on the command line */
var only = process.argv[2], file = process.argv[3];
var keys = [null].concat(Object.keys(sb.QUIZ_DATA.drill).filter(function (k) { return sb.QUIZ_DATA.drill[k].axes; }));
keys.filter(function (k) { return !only || (k || "main") === only; }).forEach(function (k) {
  var quiz = CM.quiz(k);
  console.log("\n================ " + (k ? quiz.owner.name + " quiz (" + k + ")" : "Main quiz") + " ================\n");
  evalQuiz(quiz, file || path.join(__dirname, k ? "eval-thinkers-" + k + ".json" : "eval-thinkers.json"));
});
if (only && !keys.some(function (k) { return (k || "main") === only; })) { console.log("no axis quiz called " + only); failures++; }

console.log(failures ? "\nFAIL: " + failures + " problem(s)" : "\nok");
process.exit(failures ? 1 : 0);
