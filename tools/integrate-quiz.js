#!/usr/bin/env node
/* Switch the site over to rebuilt axis quizzes:
     node tools/integrate-quiz.js <key> [<key> ...]
   For each key: adds data/quiz-<key>.js to index.html's loader (before
   core.js) and removes the old point-scored block for that key from
   data/quiz-data.js. Refuses if the new file is missing or isn't an
   axis quiz with the same areas as the old one. */
"use strict";
var fs = require("fs"), path = require("path"), vm = require("vm");
var ROOT = path.resolve(__dirname, "..");
var QD = path.join(ROOT, "data/quiz-data.js"), INDEX = path.join(ROOT, "index.html");
function load(files) {
  var sb = {}; sb.window = sb; vm.createContext(sb);
  files.forEach(function (f) { vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sb); });
  return sb.QUIZ_DATA.drill;
}
var src = fs.readFileSync(QD, "utf8"), html = fs.readFileSync(INDEX, "utf8");
process.argv.slice(2).forEach(function (key) {
  var file = "data/quiz-" + key + ".js";
  if (!fs.existsSync(path.join(ROOT, file))) throw new Error(file + " is missing");
  var before = load(["data/categories.js", "data/quiz-data.js"])[key];
  var after = load(["data/categories.js", "data/quiz-data.js", file])[key];
  if (!after.axes) throw new Error(file + " isn't an axis quiz");
  var sig = function (d) { return JSON.stringify(d.areas.map(function (a) { return [a.key, a.name, a.url || "", a.sub || ""]; })); };
  if (before && sig(before) !== sig(after)) throw new Error(file + ": areas differ from the old quiz");
  // remove the old block: from its opening line to the first line that is exactly "};"
  var open = 'window.QUIZ_DATA.drill["' + key + '"] = {';
  var a = src.indexOf(open);
  if (a >= 0) {
    var b = src.indexOf("\n};\n", a);
    src = src.slice(0, a) + "// " + key + ": " + file + "\n" + src.slice(b + 4);
  }
  if (html.indexOf('"' + file + '"') < 0) html = html.replace('"core.js"', '"' + file + '", "core.js"');
  console.log("integrated " + key);
});
fs.writeFileSync(QD, src);
fs.writeFileSync(INDEX, html);
