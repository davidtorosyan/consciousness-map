#!/usr/bin/env node
/* Start an axis quiz for an existing point-scored quiz:
     node tools/scaffold-axis-quiz.js <quiz key> > data/quiz-<quiz key>.js
   Copies the quiz's areas (keys, names, taglines, LOC links, and `sub` for
   schools) exactly, and leaves axes, profiles and questions to fill in.
   See data/quiz-idealisms.js for a finished example. */
"use strict";
var fs = require("fs"), path = require("path"), vm = require("vm");
var ROOT = path.resolve(__dirname, "..");
var key = process.argv[2];
var sb = {}; sb.window = sb; vm.createContext(sb);
["data/categories.js", "data/quiz-data.js"].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sb);
});
var d = sb.QUIZ_DATA.drill[key];
if (!d) { console.error("no quiz " + key + " in data/quiz-data.js"); process.exit(1); }
function js(s) { return JSON.stringify(s); }
var areas = d.areas.map(function (a) {
  return "    { key: " + js(a.key) + ", name: " + js(a.name) + ",\n      tagline: " + js(a.tagline || "") +
    (a.url ? ",\n      url: " + js(a.url) : "") + (a.sub ? ",\n      sub: " + js(a.sub) : "") + " }";
}).join(",\n");
var profiles = d.areas.map(function (a) { return "    " + js(a.key) + ": { },"; }).join("\n");
console.log([
  "/* The " + d.name + " quiz: an axis quiz, like data/quiz-idealisms.js.",
  "   TODO: say what the axes cover and how it was checked. */",
  "(function () {",
  '  "use strict";',
  "  var axes = [",
  '    // { key: "x", claim: "...", yes: "phrase for leaning toward it", no: "phrase for leaning away" },',
  "  ];",
  "",
  "  var profiles = {",
  profiles,
  "  };",
  "",
  "  var questions = [",
  '    // { t: "statement", why: "what Yes and No mean", axes: { x: 1 } },',
  "  ];",
  "",
  "  window.QUIZ_DATA.drill[" + js(key) + "] = {",
  "    name: " + js(d.name) + ",",
  "    color: " + js(d.color) + ",",
  "    categoryId: " + js(d.categoryId) + ",",
  "    kicker: " + js(d.kicker) + ",",
  '    title: "Which kind fits you?",',
  '    intro: questions.length + " questions.",',
  "    areas: [",
  areas,
  "    ],",
  "    axes: axes,",
  "    profiles: profiles,",
  "    questions: questions,",
  "  };",
  "})();",
].join("\n"));
