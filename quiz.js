/* Landscape of Consciousness Quiz.
   Persistent chrome (brand, dots, nav) + one "view window" card.
   Only the window's contents transition between questions; the page stays put.
   Answers: yes / no / not sure / don't get it. Minimal text by design. */
(function () {
  "use strict";
  var QD = window.QUIZ_DATA;
  var app = document.getElementById("app");
  /* ---------- shareable results: ?r=<base64url({v,q,a})> ----------
     The payload names its own quiz, so the URL never duplicates it. */
  function b64urlEncode(s) {
    try {
      var b = btoa(unescape(encodeURIComponent(s)));
      return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    } catch (e) { return ""; }
  }
  function b64urlDecode(s) {
    var b = String(s).replace(/-/g, "+").replace(/_/g, "/");
    while (b.length % 4) b += "=";
    return decodeURIComponent(escape(atob(b)));
  }
  // compact answers: "yns-" instead of ["yes","no","skip",null]; arrays still accepted
  function packAnswers(a) {
    return a.map(function (x) { return x === "yes" ? "y" : x === "no" ? "n" : x === "skip" ? "s" : "-"; }).join("");
  }
  function unpackAnswers(s) {
    return String(s).split("").map(function (c) {
      return c === "y" ? "yes" : c === "n" ? "no" : c === "s" ? "skip" : null;
    });
  }
  /* ---------- routing: every view lives at / with ?path=<a/b/c> ----------
     quiz:          ?path=quiz | ?path=<cat>/quiz | ?path=<cat>/<school>/quiz
     theory list:   ?path=<cat>/browse | ?path=<cat>/<school>/browse (bare school path too)
     theory:        ?path=<cat>/<theory> | ?path=<cat>/<school>/<theory>
     shared result: ?path=share/<payload>   (legacy ?r=<payload> still read) */
  var SEGS = window.CM_PATH || [];
  function drillPath(key) {
    var cs = window.LOC_CATEGORIES || [];
    for (var i = 0; i < cs.length; i++) {
      var c = cs[i].id;
      if (key === c) return c;
      if (key.indexOf(c + "-") === 0) return c + "/" + key.slice(c.length + 1);
    }
    return key;
  }
  function pathForQuiz(key) { return "?path=" + (key ? drillPath(key) + "/quiz" : "quiz"); }
  function pathForBrowse(key) { return "?path=" + drillPath(key) + "/browse"; }
  function pathForCategory(id) { return "?path=" + id + "/"; }
  function pathForTheory(drillKey, tkey) { return "?path=" + drillPath(drillKey) + "/" + tkey; }
  var MODE = null, QKEY = null, TKEY = null, SHARE_R = null;
  (function () {
    if (!SEGS.length) {
      try { SHARE_R = new URLSearchParams(location.search).get("r"); } catch (e) { /* ignore */ }
      if (SHARE_R) MODE = "share";
      return;
    }
    var a = SEGS[0], b = SEGS[1], c = SEGS[2];
    if (a === "quiz" && !b) { MODE = "quiz"; return; }
    if (a === "share" && b) { MODE = "share"; SHARE_R = b; return; }
    var key = null, mode = null, tkey = null;
    if ((b === "quiz" || b === "browse") && !c) { key = a; mode = b; }
    else if ((c === "quiz" || c === "browse") && b) { key = a + "-" + b; mode = c; }
    else if (a && b && c) { key = a + "-" + b; mode = "theory"; tkey = c; }
    else if (a && b && !c && !(QD.drill && QD.drill[a + "-" + b])) { key = a; mode = "theory"; tkey = b; }
    else if (a && b && !c) { key = a + "-" + b; mode = "browse"; } // bare school path -> theory list
    if (mode === "theory") {
      var d = key && QD.drill && QD.drill[key], ok = false;
      if (d) d.areas.forEach(function (x) { if (x.key === tkey) ok = true; });
      if (ok) { MODE = "theory"; QKEY = key; TKEY = tkey; }
    }
    else if (key && mode && QD.drill && QD.drill[key]) { MODE = mode; QKEY = key; }
  })();
  if (!MODE) return; // another view owns this URL
  window.CM_CLAIMED = true;
  document.title = "Landscape of Consciousness Quiz";
  var DRILL = null;
  if (MODE === "share" && SHARE_R) {
    try {
      var _pq = JSON.parse(b64urlDecode(SHARE_R)).q;
      if (_pq && _pq !== "main" && QD.drill[_pq]) { DRILL = QD.drill[_pq]; QKEY = _pq; }
    } catch (e) { /* handled below */ }
  } else if (QKEY && QD.drill[QKEY]) {
    DRILL = QD.drill[QKEY];
  }
  var QUIZ = DRILL || QD.top;
  var LOC_URL = "https://loc.closertotruth.com/";
  var BROWSE = MODE === "browse";
  var SHARE_ANS = null, SHARE_BAD = false;
  if (MODE === "share") {
    try {
      var _p = JSON.parse(b64urlDecode(SHARE_R)), _ans = null;
      if (_p && Array.isArray(_p.a) && _p.a.length === QUIZ.questions.length) _ans = _p.a;
      else if (_p && typeof _p.a === "string" && _p.a.length === QUIZ.questions.length) _ans = unpackAnswers(_p.a);
      var _okQ = _p && ((_p.q === "main" && !DRILL) || (_p.q && DRILL && _p.q === QKEY));
      if (_p && _p.v === window.QUIZ_DATA_VERSION && _okQ && _ans) SHARE_ANS = _ans;
      else SHARE_BAD = true;
    } catch (e) { SHARE_BAD = true; }
  }
  // the quiz wears its section's color (default blue only for the top-level quiz)
  if (DRILL && DRILL.color) {
    try { document.documentElement.style.setProperty("--acc", DRILL.color); } catch (e) { /* ignore */ }
  }
  // a theory's own URL: title it with the theory's name
  if (MODE === "theory" && DRILL) {
    DRILL.areas.forEach(function (x) { if (x.key === TKEY) document.title = x.name; });
  }

  /* ---------- in-progress answers (sessionStorage): survive reloads and Back ---------- */
  var PROG_KEY = "cm_progress_" + (QKEY || "main");
  function saveProgress() {
    try { if (S) sessionStorage.setItem(PROG_KEY, JSON.stringify(S.answers)); } catch (e) {}
  }
  function loadProgress() {
    try {
      var a = JSON.parse(sessionStorage.getItem(PROG_KEY));
      if (Array.isArray(a) && a.length === QUIZ.questions.length &&
          a.some(function (x) { return !!x; }) && a.some(function (x) { return !x; })) return a;
    } catch (e) {}
    return null;
  }
  function clearProgress() { try { sessionStorage.removeItem(PROG_KEY); } catch (e) {} }

  /* ---------- bookmarked theories (localStorage) ---------- */
  var FAV_KEY = "cm_favorites_v1";
  var BM_SVG = '<svg class="bm-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h11V21l-5.5-3.8L6.5 21z"/></svg>';
  var TIER_DOT = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>';
  var INFO_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="11" x2="12" y2="16.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1.5" fill="currentColor"/></svg>';
  var LIST_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none"/><line x1="10.5" y1="6" x2="20" y2="6"/><line x1="10.5" y1="12" x2="20" y2="12"/><line x1="10.5" y1="18" x2="20" y2="18"/></g></svg>';
  var MAG_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15.8" y1="15.8" x2="20.5" y2="20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var SHARE_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14.5V4"/><path d="M8 7.5 12 3.5l4 4"/><path d="M5 12.5v7h14v-7"/></g></svg>';
  function getFavs() {
    try { var f = JSON.parse(localStorage.getItem(FAV_KEY)); return Array.isArray(f) ? f : []; }
    catch (e) { return []; }
  }
  function setFavs(f) { try { localStorage.setItem(FAV_KEY, JSON.stringify(f)); } catch (e) {} }
  function isFav(id) { return getFavs().some(function (f) { return f.id === id; }); }
  function toggleFav(entry) {
    var f = getFavs(), idx = -1;
    for (var i = 0; i < f.length; i++) if (f[i].id === entry.id) { idx = i; break; }
    if (idx >= 0) f.splice(idx, 1); else f.push(entry);
    setFavs(f);
    return idx < 0; // true when the theory is now bookmarked
  }
  function refreshFavCounts() {
    var n = getFavs().length, label = n ? " (" + n + ")" : "";
    document.querySelectorAll("[data-favcount]").forEach(function (el) { el.textContent = label; });
  }

  /* ---------- quiz history (localStorage) ---------- */
  var HIST_KEY = "cm_history_v1";
  function getHistory() {
    try { var h = JSON.parse(localStorage.getItem(HIST_KEY)); return Array.isArray(h) ? h : []; }
    catch (e) { return []; }
  }
  function saveHistory() {
    try {
      if (!S || !S.answers.some(function (a) { return a === "yes" || a === "no"; })) return;
      var sc = scores(), ts = targets().slice();
      ts.sort(function (a, b) { return (sc[b.key] || 0) - (sc[a.key] || 0); });
      var h = getHistory();
      h.unshift({ q: QKEY || "main", t: Date.now(), a: S.answers.slice(), top: ts.length ? ts[0].name : "" });
      while (h.length > 30) h.pop();
      localStorage.setItem(HIST_KEY, JSON.stringify(h));
    } catch (e) {}
  }

  /* targets: the 11 canonical categories, or a drill quiz's sub-areas */
  function targets() {
    if (!DRILL) return QD.order.map(function (id) {
      var c = QD.cats[id];
      return {
        key: id, name: c.name, color: c.color, tagline: c.tagline,
        url: c.url, mapUrl: pathForCategory(id),
      };
    });
    return DRILL.areas.map(function (a) {
      return {
        key: a.key, name: a.name, color: DRILL.color, tagline: a.tagline || "",
        url: a.url || "", sub: a.sub || "",
        mapUrl: pathForCategory(DRILL.categoryId),
      };
    });
  }

  /* ---------- session state ---------- */
  var S = null; // {answers: ["yes"|"no"|"skip"|null ...]}
  function freshSession() {
    var a = [];
    for (var i = 0; i < QUIZ.questions.length; i++) a.push(null);
    return { answers: a };
  }
  // answers behind the current view: a shared/history snapshot when the view
  // carries one, otherwise the live session
  function viewAnswers() {
    if (typeof cur !== "undefined" && cur.answers) return cur.answers;
    return S && S.answers;
  }
  function scores() {
    var qs = QUIZ.questions, sc = {}, A = viewAnswers();
    if (!A) return sc;
    A.forEach(function (ans, i) {
      if (ans !== "yes" && ans !== "no") return;
      var pts = qs[i][ans] || {};
      Object.keys(pts).forEach(function (k) { sc[k] = (sc[k] || 0) + pts[k]; });
    });
    return sc;
  }

  /* ---------- persistent chrome: brand, dots, window, footer ---------- */
  app.innerHTML =
    '<nav class="trail" id="wz-trail" aria-label="Where you are"></nav>' +
    '<div class="wz-dotsrow"><div class="q-dots" id="wz-dots" aria-hidden="true"></div><span class="q-count" id="wz-count"></span></div>' +
    '<main class="wz-window" id="wz-window"><div class="wz-body" id="wz-body"></div></main>' +
    '<footer class="wz-foot"><a href="./">Browse the map</a>' +
    '<span aria-hidden="true">·</span>' +
    '<a href="' + LOC_URL + '" target="_blank" rel="noopener">Landscape of Consciousness ↗</a></footer>';

  var winBody = document.getElementById("wz-body");
  var dotsEl = document.getElementById("wz-dots");

  function renderDots(n, idx) {
    var dots = "";
    for (var i = 0; i < n; i++) {
      dots += '<span class="q-dot' + (i < idx ? " done" : i === idx ? " now" : "") + '"></span>';
    }
    dotsEl.innerHTML = dots;
    dotsEl.parentElement.style.display = n ? "" : "none";
    var c = document.getElementById("wz-count");
    if (c) c.textContent = (n && idx >= 0 && idx < n) ? (idx + 1) + " of " + n : "";
  }

  /* Swap only the window's content: quick fade/slide inside the card. */
  var locked = false;
  function setWindow(html, n, idx) {
    renderDots(n, idx);
    winBody.classList.add("wz-leave");
    setTimeout(function () {
      winBody.innerHTML = html;
      winBody.classList.remove("wz-leave");
      winBody.classList.add("wz-enter");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { winBody.classList.remove("wz-enter"); });
      });
      bindWindow();
      locked = false;
    }, 100);
  }

  /* ---------- tiny router ---------- */
  var hist = [];
  /* breadcrumb: Map › Category › School › Theory, following the drill nesting */
  function targetByKey(key) {
    var found = null;
    targets().forEach(function (x) { if (x.key === key) found = x; });
    return found;
  }
  function trailHtml() {
    var segs = [{ label: "Home", href: "./" }];
    var v = cur.name;
    if (DRILL) {
      var cat = QD.cats[DRILL.categoryId];
      // the category crumb always links to the category page: it is the way back up
      if (cat) segs.push({ label: cat.name, href: pathForCategory(DRILL.categoryId), sec: true });
      if (QKEY !== DRILL.categoryId) {
        // nested school drill: the school crumb links to the school's theory list,
        // except on that list itself, where the school is where you are
        segs.push({ label: DRILL.name, href: pathForBrowse(QKEY), sec: v !== "browse" });
      }
      if (v === "detail") {
        var t = targetByKey(cur.key);
        if (t) segs.push({ label: t.name });
      }
    } else if (v === "detail") {
      var c = QD.cats[cur.key];
      if (c) segs.push({ label: c.name });
    } else {
      // main quiz views: the trail should show where you are
      segs.push({ label: "Quiz" });
    }
    var crumbs = '<span class="here-dot"></span>' + segs.map(function (s, i) {
      var last = i === segs.length - 1;
      var pre = i > 0 ? '<span class="sep">›</span>' : "";
      var cls = "tseg" + (i === 0 ? " root" : "");
      // section crumbs link to their section index even when last, so there is
      // always a way back up; the true current view is never a link
      var link = s.href && (!last || s.sec);
      return pre + (link ? '<a class="' + cls + '" href="' + s.href + '">' + s.label + "</a>"
                         : '<span class="' + cls + '">' + s.label + "</span>");
    }).join("");
    // results get a share button pinned to the top right
    var shareBtn = v === "results"
      ? '<button class="trail-share" id="wz-share" aria-label="Share results">' + SHARE_SVG + "</button>"
      : "";
    return crumbs + shareBtn;
  }

  var cur = { name: "start" };
  function go(view, back) {
    // no landing page: a quiz opens straight into its first question, with a fresh
    // answer session (the old Start button used to create it). Saved progress still
    // lands on the resume screen, so it can be resumed or discarded.
    if (!back && view.name === "start" && !loadProgress()) { S = freshSession(); view = { name: "q", idx: 0 }; }
    if (!back) hist.push(view); else hist.pop();
    cur = view;
    setTimeout(function () { locked = false; }, 1500); // backstop: never leave taps dead
    var nq = QUIZ.questions.length, h, dn, di;
    if (view.name === "start") { h = startView(); dn = 0; di = -1; }
    else if (view.name === "q") { h = questionView(view.idx); dn = nq; di = view.idx; }
    else if (view.name === "results") {
      // snapshots (shared links, history, back-from-detail) don't clear the live
      // progress and are never written back to history
      if (!view.answers) clearProgress();
      h = resultsView(); dn = nq; di = nq;
      if (!view.answers && !view.shared) saveHistory();
    }
    else if (view.name === "badshare") { h = badShareView(); dn = 0; di = -1; }
    else if (view.name === "browse") { h = browseView(); dn = 0; di = -1; }
    else if (view.name === "detail") {
      h = detailView(view.key); dn = 0; di = -1;
      // the theory owns this URL now: tapping a theory puts it in the path
      // (drill theories only — main-quiz category details stay on the quiz URL)
      // preserve any pushed state (e.g. results-back) across the replace
      if (!back && DRILL) {
        try { history.replaceState(history.state, "", pathForTheory(QKEY, view.key)); } catch (e) {}
      }
    }
    var trailEl = document.getElementById("wz-trail");
    if (trailEl) {
      trailEl.innerHTML = trailHtml();
      var shareBtn = document.getElementById("wz-share");
      if (shareBtn) shareBtn.addEventListener("click", function () { shareResults(shareBtn); });
    }
    setWindow(h, dn, di);
  }
  function backTo() {
    var prev = hist.length > 1 ? hist[hist.length - 2] : { name: "start" };
    go(prev, true);
  }

  /* ---------- window views ---------- */
  function startView() {
    var saved = loadProgress(), startBtn, underBtn;
    var backLink = '<a class="q-quiet" href="./">' + QUIZ.browse + "</a>";
    if (saved) {
      var i = 0;
      while (i < saved.length && saved[i]) i++;
      startBtn = '<button class="big-start" data-act="resume">Resume — question ' + (i + 1) + " of " + saved.length + "</button>";
      underBtn = '<div><button class="q-quiet" data-act="start" style="background:none;border:none;cursor:pointer;width:100%">Start over instead</button></div>';
    } else {
      startBtn = '<button class="big-start" data-act="start">Start</button>';
      underBtn = "";
    }
    return '<div class="q-start">' +
      '<div class="eyebrow">' + QUIZ.kicker + "</div>" +
      "<h1>" + QUIZ.title + "</h1>" +
      '<p class="lede">' + QUIZ.intro + "</p>" +
      startBtn + underBtn +
      "<div>" + backLink + "</div></div>";
  }

  function badShareView() {
    var quizHref = pathForQuiz(QKEY);
    return '<div class="q-start"><div class="eyebrow">SHARED RESULT</div>' +
      "<h1>That link didn\u2019t work.</h1>" +
      '<p class="lede">It may be from an older version of the quiz.</p>' +
      '<div><a class="q-quiet" href="' + quizHref + '">Take the quiz instead</a></div></div>';
  }

  function questionView(idx) {
    var q = QUIZ.questions[idx];
    var whyBtn = q.why
      ? '<button class="a-btn whyb" data-ans="why"><span class="ic">◇</span><span class="lb">Don\u2019t get it</span></button>'
      : "";
    var whyHtml = q.why
      ? '<div class="q-why" id="why"><div class="why-card">' + q.why + "</div></div>"
      : "";
    // undo: stepping back shows the answer already given, highlighted
    var prev = (S && S.answers) ? S.answers[idx] : null;
    function abtn(base, ans, ic, lb) {
      var picked = prev === ans ? " picked-" + (ans === "skip" ? "skip" : ans) : "";
      return '<button class="a-btn ' + base + picked + '" data-ans="' + ans + '"><span class="ic">' + ic + '</span><span class="lb">' + lb + "</span></button>";
    }
    var backRow = idx > 0
      ? '<div class="q-backrow"><button class="q-backbtn" data-act="qback" aria-label="Previous question">\u2039</button></div>'
      : "";
    return backRow +
      '<div class="q-qwrap"><div class="q-text">' + q.t + "</div></div>" +
      '<div class="a-grid">' +
      abtn("yes", "yes", "\u2713", "Yes") +
      abtn("no", "no", "\u2717", "No") +
      abtn("maybe", "skip", "?", "Not sure") +
      whyBtn + "</div>" + whyHtml;
  }

  /* one listing row: rank, name, tier dot + bookmark tight on the right;
     the row itself is lightly tinted with the theory's color (no separate color dot) */
  function rowHtml(t, i, tier) {
    var bm = "";
    // bookmarks are theories only — schools keep their rows clean
    if (DRILL && t.url && !t.sub) {
      var fid = DRILL.categoryId + ":" + t.key, on = isFav(fid);
      bm = '<button class="bm-btn sm' + (on ? " on" : "") + '" data-bm="' + fid +
        '" aria-label="' + (on ? "Remove bookmark: " : "Bookmark ") + t.name + '" aria-pressed="' + on + '">' + BM_SVG + "</button>";
    }
    return '<div class="r-row' + (i === 0 && tier ? " top1" : "") + '" style="--bm:' + t.color + ";--tint:" + t.color + '">' +
      '<button class="r-open" data-target="' + t.key + '" aria-label="View ' + t.name + '">' +
      '<span class="rank">' + (i + 1) + "</span>" +
      '<span class="nm">' + t.name + "</span>" +
      (tier ? '<span class="tier ' + tier + '" aria-label="' +
        (tier === "hi" ? "aligned" : tier === "mid" ? "mixed" : "not aligned") + '">' + TIER_DOT + "</span>" : "") +
      "</button>" + bm + "</div>";
  }

  function browseView() {
    var ts = targets();
    var rows = ts.map(function (t, i) { return rowHtml(t, i, null); }).join("");
    var name = DRILL ? DRILL.name : "All categories";
    var kind = !DRILL ? "categories" : (ts.some(function (t) { return !!t.sub; }) ? "schools" : "theories");
    var quizHref = pathForQuiz(QKEY);
    // drill browse pages get an info badge for their category
    var catBadge = "";
    if (DRILL) {
      var cu = QD.cats[DRILL.categoryId] && QD.cats[DRILL.categoryId].url;
      if (cu) catBadge = '<a class="src-badge" href="' + cu + '" target="_blank" rel="noopener" aria-label="Open ' + name + ' on Landscape of Consciousness">' + INFO_SVG + "</a>";
    }
    return '<div class="r-head"><div class="eyebrow">BROWSE</div>' + catBadge +
      "<h1>" + name + "</h1>" +
      '<p class="lede">' + ts.length + " " + kind + " — tap one to open it.</p></div>" + rows +
      '<div class="d-quiet">' +
      '<a class="d-link" href="' + quizHref + '">Quiz</a>' +
      '<a class="d-link" href="./">Browse the map</a></div>';
  }

  function resultsView() {
    var sc = scores(), ts = targets().slice(), A = viewAnswers() || [];
    ts.sort(function (a, b) { return (sc[b.key] || 0) - (sc[a.key] || 0); });
    var nAnswered = 0;
    A.forEach(function (a) { if (a === "yes" || a === "no") nAnswered++; });
    var skipNote = nAnswered === 0
      ? '<div class="r-note">You didn\u2019t answer Yes or No to anything \u2014 there\u2019s nothing to align yet.</div>'
      : "";
    // flat status dots: green = aligned, yellow = mixed, red = not aligned
    var rows = ts.map(function (t, i) {
      var s = sc[t.key] || 0;
      // ternary, absolute: aligned = endorsed the core claim (3+), mixed = partial lean, lo = no signal
      var tier = s >= 3 ? "hi" : s > 0 ? "mid" : "lo";
      return rowHtml(t, i, tier);
    }).join("");
    var eyebrow = cur.shared ? "SHARED RESULT" : "YOUR ALIGNMENT";
    return '<div class="r-head"><div class="eyebrow">' + eyebrow + "</div>" +
      "<h1>Closest first.</h1>" +
      '<div class="tier-legend"><span class="lg hi">●</span> aligned <span class="lg mid">●</span> mixed <span class="lg lo">●</span> not aligned</div>' +
      skipNote + "</div>" + rows +
      '<div class="d-quiet"><a class="d-link" href="./">Browse the map</a>' +
      '<button class="d-link" data-act="share" style="background:none;border:none;cursor:pointer;font:inherit">Share results</button></div>';
  }

  /* questions that moved the needle for one category, marked by the user's answer */
  function answerRows(key) {
    var A = viewAnswers();
    if (!A || !A.some(function (a) { return !!a; })) return "";
    var qs = QUIZ.questions, out = [];
    qs.forEach(function (q, i) {
      var yp = (q.yes && q.yes[key]) || 0, np = (q.no && q.no[key]) || 0;
      if (!yp && !np) return;
      var a = A[i], cls, mark, alabel;
      if (a === "yes") { cls = yp > 0 ? "al" : "mis"; mark = yp > 0 ? "✓" : "✗"; alabel = "yes"; }
      else if (a === "no") { cls = np > 0 ? "al" : "mis"; mark = np > 0 ? "✓" : "✗"; alabel = "no"; }
      else { cls = "na"; mark = "–"; alabel = a === "skip" ? "not sure" : "–"; }
      out.push('<div class="qa-row ' + cls + '"><span class="qa-mark">' + mark + "</span>" +
        '<span class="qa-q">' + q.t + '</span><span class="qa-a">' + alabel + "</span></div>");
    });
    if (!out.length) return "";
    return '<div class="qa-sec"><div class="eyebrow">HOW YOU LINED UP</div>' + out.join("") + "</div>";
  }

  function detailView(key) {
    var t = null;
    targets().forEach(function (x) { if (x.key === key) t = x; });
    if (!t) return resultsView();
    var tag = t.tagline ? '<p class="tag">' + t.tagline + "</p>" : "";
    var subKey = DRILL ? t.sub : key;
    // bookmark toggle lives on theory detail screens only — schools get the
    // info badge, not a bookmark
    var bmBtn = "";
    if (DRILL && t.url && !t.sub) {
      var fid = DRILL.categoryId + ":" + t.key;
      var on = isFav(fid);
      bmBtn = '<button class="bm-btn' + (on ? " on" : "") + '" data-bm="' + fid +
        '" aria-label="' + (on ? "Remove bookmark: " : "Bookmark ") + t.name + '" aria-pressed="' + on + '">' + BM_SVG + "</button>";
    }
    // action pills: icons only — ? quiz, list browse, pin map. Source lives in the badge up top.
    // schools without their own LOC overview page fall back to the category page
    var infoUrl = t.url || (DRILL && QD.cats[DRILL.categoryId] && QD.cats[DRILL.categoryId].url);
    var srcBadge = infoUrl
      ? '<a class="src-badge" href="' + infoUrl + '" target="_blank" rel="noopener" aria-label="Open on Landscape of Consciousness">' + INFO_SVG + "</a>"
      : "";
    var pills = "";
    if (subKey && QD.drill && QD.drill[subKey]) {
      pills += '<button class="pill" data-drill="' + subKey + '">' + MAG_SVG + "<span>Quiz</span></button>" +
               '<button class="pill icon" data-browse="' + subKey + '" aria-label="Browse the theories">' + LIST_SVG + "</button>";
    }
    var actions = pills ? '<div class="d-actions">' + pills + "</div>" : "";
    var eyebrowLabel = !DRILL ? "CATEGORY" : (t.sub ? "SCHOOL" : "THEORY");
    var backRes = cur.from === "results"
      ? '<div class="d-quiet"><button class="d-link" data-act="back-results" style="background:none;border:none;cursor:pointer;font:inherit">\u2039 Results</button></div>'
      : "";
    return '<div class="d-head" style="--bm:' + t.color + '">' + srcBadge +
      '<div class="eyebrow">' + eyebrowLabel + bmBtn + "</div>" +
      "<h1>" + t.name + "</h1>" + tag + "</div>" +
      actions +
      answerRows(key) +
      backRes;
  }

  /* ---------- events ---------- */
  function answer(idx, ans) {
    if (locked) return;
    if (ans === "why") {
      var w = document.getElementById("why");
      if (w) {
        var willOpen = !w.classList.contains("open");
        w.classList.toggle("open", willOpen);
        // size to content so long explanations are never clipped mid-word
        w.style.maxHeight = willOpen ? w.scrollHeight + "px" : "";
      }
      return;
    }
    locked = true;
    S.answers[idx] = ans;
    saveProgress();
    var btn = winBody.querySelector('[data-ans="' + ans + '"]');
    if (btn) btn.classList.add(ans === "yes" ? "picked-yes" : ans === "no" ? "picked-no" : "picked-skip");
    var n = QUIZ.questions.length;
    setTimeout(function () {
      if (idx + 1 < n) go({ name: "q", idx: idx + 1 });
      else go({ name: "results" });
    }, ans === "skip" ? 80 : 120);
  }

  /* shareable results link: quiz key + data version + answers, base64url'd */
  function resultsShareUrl() {
    var A = viewAnswers();
    if (!A) return null;
    var enc = b64urlEncode(JSON.stringify({ v: window.QUIZ_DATA_VERSION, q: QKEY || "main", a: packAnswers(A) }));
    if (!enc) return null;
    var base = location.href.split("?")[0].split("#")[0];
    return base + "?path=share/" + enc;
  }
  function shareResults(btn) {
    var url = resultsShareUrl();
    var isIcon = btn && btn.classList && btn.classList.contains("trail-share");
    function done(ok) {
      if (!btn) return;
      if (isIcon) {
        btn.classList.toggle("ok", !!ok);
        setTimeout(function () { btn.classList.remove("ok"); }, 1600);
      } else btn.textContent = ok ? "Copied" : "Couldn\u2019t copy";
    }
    if (!url) { done(false); return; }
    // native share sheet where available (iOS), clipboard everywhere else
    if (navigator.share) {
      try {
        navigator.share({ title: "My consciousness-map results", url: url })
          .then(function () { done(true); }, function () { /* dismissed */ });
        return;
      } catch (e) { /* fall through to clipboard */ }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
    } else done(false);
  }

  function actGo(act, el) {
    if (act === "start") { clearProgress(); S = freshSession(); go({ name: "q", idx: 0 }); }
    else if (act === "resume") {
      var saved = loadProgress(), i = 0;
      if (saved) { S = { answers: saved }; while (i < saved.length && saved[i]) i++; }
      else S = freshSession();
      go({ name: "q", idx: i });
    }
    else if (act === "share") { shareResults(el); }
    else if (act === "back-results") {
      try { history.replaceState(null, "", pathForQuiz(QKEY)); } catch (e) {}
      go({ name: "results", answers: cur.answers, shared: cur.shared });
    }
    else if (act === "restart") {
      // always back to the start of the current mode — never a mode switch
      clearProgress(); S = null;
      if (BROWSE) { S = freshSession(); go({ name: "browse" }); }
      else go({ name: "start" });
    }
    else if (act === "back") {
      if (cur.name === "browse") { location.href = pathForCategory(DRILL.categoryId); return; }
      backTo();
    }
    else if (act === "qback") {
      // undo: step to the previous question, keeping answers intact
      if (cur.name === "q" && cur.idx > 0) go({ name: "q", idx: cur.idx - 1 }, true);
    }
  }

  function bindWindow() {
    winBody.querySelectorAll("[data-act]").forEach(function (el) {
      el.addEventListener("click", function () { actGo(el.dataset.act, el); });
    });
    winBody.querySelectorAll("[data-ans]").forEach(function (el) {
      el.addEventListener("click", function () { answer(cur.idx, el.dataset.ans); });
    });
    winBody.querySelectorAll("[data-target]").forEach(function (el) {
      el.addEventListener("click", function () {
        var t = targetByKey(el.dataset.target);
        // rows tapped from a browse list get their own page — and their own
        // history entry — so back returns to the list; everywhere else
        // details stay in-page
        if (t && DRILL && cur.name === "browse") { location.href = pathForTheory(QKEY, t.key); return; }
        if (t && cur.name === "results") {
          // push a real history entry for the theory/school so a swipe-back
          // lands on the results instead of wherever the quiz was opened from
          var dest = DRILL ? pathForTheory(QKEY, t.key) : pathForCategory(t.key);
          try { history.pushState({ qm: "detail", key: t.key }, "", dest); } catch (e) {}
        }
        go({ name: "detail", key: el.dataset.target, from: cur.name, answers: viewAnswers(), shared: cur.shared });
      });
    });
    winBody.querySelectorAll("[data-drill]").forEach(function (el) {
      el.addEventListener("click", function () {
        location.href = pathForQuiz(el.dataset.drill);
      });
    });
    winBody.querySelectorAll("[data-browse]").forEach(function (el) {
      el.addEventListener("click", function () {
        location.href = pathForBrowse(el.dataset.browse);
      });
    });
    winBody.querySelectorAll("[data-bm]").forEach(function (el) {
      el.addEventListener("click", function () {
        var fid = el.getAttribute("data-bm"), t = null;
        targets().forEach(function (x) { if (DRILL.categoryId + ":" + x.key === fid) t = x; });
        if (!t) return;
        var nowOn = toggleFav({ id: fid, name: t.name, tagline: t.tagline, url: t.url, catId: DRILL.categoryId, drill: QKEY });
        el.classList.toggle("on", nowOn);
        el.setAttribute("aria-pressed", nowOn ? "true" : "false");
        refreshFavCounts();
      });
    });
  }

  refreshFavCounts();
  // swipe-back from a theory/school opened off the results: the tap pushed a
  // real history entry, so popstate restores the results in-page — and a
  // swipe-forward re-opens the detail
  window.addEventListener("popstate", function (ev) {
    var st = ev.state || {};
    if (st.qm === "detail") {
      var t = targetByKey(st.key);
      if (t) go({ name: "detail", key: st.key, from: "results", answers: viewAnswers(), shared: cur.shared });
    } else if (cur.name === "detail" && cur.from === "results") {
      go({ name: "results", answers: cur.answers, shared: cur.shared });
    }
  });
  if (BROWSE) { S = freshSession(); go({ name: "browse" }); }
  else if (SHARE_ANS) go({ name: "results", answers: SHARE_ANS, shared: true });
  else if (SHARE_BAD) go({ name: "badshare" });
  else if (MODE === "theory") go({ name: "detail", key: TKEY });
  else go({ name: "start" });
})();
