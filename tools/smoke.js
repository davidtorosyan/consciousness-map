#!/usr/bin/env node
/* Headless walk-through of the site at phone size: `node tools/smoke.js`.
   Serves the repo on a local port, opens every category and school page plus
   a sample of theory pages, takes the main quiz end to end, and fails on any
   JS error, blank page or broken flow. Needs Playwright (resolved locally or
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

/* the data, loaded the way the browser loads it, to enumerate pages */
function loadData() {
  var sb = { window: {} };
  vm.createContext(sb);
  ["data/categories.js", "data/quiz-data.js"].forEach(function (f) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sb);
  });
  return sb.window;
}
function pages(W) {
  var D = W.QUIZ_DATA.drill, out = ["", "browse", "quiz", "saved", "history", "debug"];
  W.LOC_CATEGORIES.forEach(function (c) { out.push(c.id, c.id + "/quiz"); });
  Object.keys(D).forEach(function (k) {
    var d = D[k], base = k === d.categoryId ? k : d.categoryId + "/" + k.slice(d.categoryId.length + 1);
    if (k !== d.categoryId) out.push(base, base + "/quiz");
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
    await page.waitForTimeout(150);
  }
  async function checkPage(where) {
    if (jsErrors.length) fail(where, "JS error: " + jsErrors.join(" | "));
    var info = await page.evaluate(function () {
      var app = document.getElementById("app");
      return {
        text: app ? app.innerText.trim() : "",
        notFound: document.title.indexOf("Not found") === 0,
      };
    });
    if (!info.text) fail(where, "blank page");
    if (info.notFound) fail(where, "rendered as not found");
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
    var firstName = (await page.innerText(".r-row .nm")).trim();
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

  /* 4. bookmarks: save a theory, see it on the saved page, remove it */
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

  await browser.close();
  server.close();
  failures.forEach(function (f) { console.log("FAIL: " + f); });
  console.log("smoke: " + list.length + " pages, " + legacy.length + " legacy URLs, 2 flows: " +
    (failures.length ? failures.length + " failure(s)" : "ok"));
  process.exit(failures.length ? 1 : 0);
})().catch(function (e) { console.error(e); process.exit(1); });
