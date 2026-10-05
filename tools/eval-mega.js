#!/usr/bin/env node
/* Does the mega quiz (mega.js) find people's theory, and how fast?
   `node tools/eval-mega.js [sample]`

   For a sample of theories (default 60, "all" for every one), a simulated
   respondent who holds that theory takes the adaptive quiz: on questions the
   theory takes a stand on, they agree (consistent) or agree with the
   likelihood the quiz assumes (noisy: 15% slips on top); elsewhere they
   answer at random, with some Not sure. Reports how often the theory comes
   out first / in the top 3, and how many questions it took. */
"use strict";
var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.resolve(__dirname, "..");
var html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
var files = JSON.parse(/var JS = (\[[^\]]*\]);/.exec(html)[1])
  .filter(function (f) { return f.indexOf("data/") === 0; }).concat(["core.js", "mega.js"]);
var sb = { console: console, btoa: function (s) { return Buffer.from(s, "binary").toString("base64"); },
  atob: function (s) { return Buffer.from(s, "base64").toString("binary"); } };
sb.window = sb;
vm.createContext(sb);
files.forEach(function (f) { vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sb, { filename: f }); });
var CM = sb.CM, M = CM.mega.build();
// MEGA_STOP='{"sure":0.5}' tries other stopping rules
if (process.env.MEGA_STOP) Object.assign(CM.mega.STOP, JSON.parse(process.env.MEGA_STOP));

var seed = 4242;
function rand() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }

function respond(h, qq, mode) {
  var s = h.st[qq.axis];
  // no stand: plenty of Not sure, otherwise a coin flip
  if (!s) { var r = rand(); return r < 0.4 ? "skip" : r < 0.7 ? "yes" : "no"; }
  var agree = s[0] * qq.sign > 0;
  if (mode === "noisy") {
    // as in eval-quiz.js: 10% Not sure, 15% slips
    if (rand() < 0.1) return "skip";
    if (rand() < 0.15) agree = !agree;
  }
  return agree ? "yes" : "no";
}
function run(h, mode) {
  var answers = [], st;
  for (;;) {
    st = CM.mega.step(answers);
    if (st.next === null) break;
    answers.push([st.next, respond(h, M.questions[st.next], mode)]);
  }
  var rank = 1 + st.ranked.map(function (x) { return x.node; }).indexOf(h.node);
  var fam = {};
  st.ranked.forEach(function (x) { fam[x.node.category.key] = (fam[x.node.category.key] || 0) + x.p; });
  var topFam = Object.keys(fam).sort(function (a, b) { return fam[b] - fam[a]; })[0];
  return { rank: rank, n: answers.length, fam: topFam === h.node.category.key };
}

var arg = process.argv[2], idx = M.hyps.map(function (h, i) { return i; });
var n = arg === "all" ? idx.length : Math.min(idx.length, parseInt(arg, 10) || 60);
for (var i = idx.length - 1; i > 0; i--) { var j = Math.floor(rand() * (i + 1)), t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
idx = idx.slice(0, n);

console.log("mega quiz: " + M.questions.length + " questions, " + M.hyps.length + " candidates (" + M.theories +
  " theories incl. grouped); sample " + n + "\n");
var bad = 0;
["consistent", "noisy"].forEach(function (mode) {
  var top1 = 0, top3 = 0, top10 = 0, fam = 0, lens = [], misses = [];
  idx.forEach(function (i) {
    var r = run(M.hyps[i], mode);
    if (r.rank === 1) top1++;
    if (r.rank <= 3) top3++;
    if (r.rank <= 10) top10++;
    if (r.fam) fam++;
    else misses.push(M.hyps[i].node.name + " (rank " + r.rank + ")");
    lens.push(r.n);
  });
  lens.sort(function (a, b) { return a - b; });
  var mean = lens.reduce(function (a, b) { return a + b; }, 0) / lens.length;
  console.log(mode.padEnd(11) + " top-1 " + Math.round(100 * top1 / n) + "%, top-3 " + Math.round(100 * top3 / n) + "%, top-10 " +
    Math.round(100 * top10 / n) + "%, family right " + Math.round(100 * fam / n) + "%;" +
    " questions: median " + lens[Math.floor(lens.length / 2)] + ", mean " + mean.toFixed(1) + ", max " + lens[lens.length - 1]);
  if (misses.length) console.log("  family wrong: " + misses.slice(0, 8).join("; ") + (misses.length > 8 ? "; ..." : ""));
  if (mode === "consistent" && (top10 < n * 0.8 || fam < n * 0.9)) bad++;
});
console.log(bad ? "\nFAIL: consistent respondents should get their family first 90% of the time and their theory in the top 10 80% of the time" : "\nok");
process.exit(bad ? 1 : 0);
