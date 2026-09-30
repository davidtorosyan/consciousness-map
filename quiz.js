/* Landscape of Consciousness Quiz.
   Persistent chrome (brand, dots, nav) + one "view window" card.
   Only the window's contents transition between questions; the page stays put.
   Answers: yes / no / not sure / don't get it. Minimal text by design. */
(function () {
  "use strict";
  var QD = window.QUIZ_DATA;
  var app = document.getElementById("app");
  var qp = null;
  try { qp = new URLSearchParams(location.search).get("quiz"); } catch (e) { /* ignore */ }
  var DRILL = qp && QD.drill && QD.drill[qp] ? QD.drill[qp] : null;
  var QUIZ = DRILL || QD.top;
  var LOC_URL = "https://loc.closertotruth.com/";
  var retParam = null;
  try { retParam = new URLSearchParams(location.search).get("ret"); } catch (e) { /* ignore */ }
  var RET_ID = retParam && QD.cats && QD.cats[retParam] ? retParam : null;
  var RET_URL = RET_ID ? "index.html#/category/" + RET_ID : null;
  var BROWSE = false;
  try { BROWSE = new URLSearchParams(location.search).get("mode") === "browse"; } catch (e) { /* ignore */ }
  // the quiz wears its section's color (default blue only for the top-level quiz)
  if (DRILL && DRILL.color) {
    try { document.documentElement.style.setProperty("--acc", DRILL.color); } catch (e) { /* ignore */ }
  }

  /* ---------- in-progress answers (sessionStorage): survive reloads and Back ---------- */
  var PROG_KEY = "cm_progress_" + (qp || "main");
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

  /* targets: the 11 canonical categories, or a drill quiz's sub-areas */
  function targets() {
    if (!DRILL) return QD.order.map(function (id) {
      var c = QD.cats[id];
      return {
        key: id, name: c.name, color: c.color, tagline: c.tagline,
        url: c.url, mapUrl: "index.html#/category/" + id,
      };
    });
    return DRILL.areas.map(function (a) {
      return {
        key: a.key, name: a.name, color: DRILL.color, tagline: a.tagline || "",
        url: a.url || "", sub: a.sub || "",
        mapUrl: "index.html#/category/" + DRILL.categoryId,
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
  function scores() {
    var qs = QUIZ.questions, sc = {};
    S.answers.forEach(function (ans, i) {
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
    '<footer class="wz-foot"><a href="index.html">Browse the map</a>' +
    '<span aria-hidden="true">·</span>' +
    '<a href="favorites.html">Bookmarked<span data-favcount></span></a>' +
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
    var segs = [{ label: "Home", href: "index.html" }];
    var retQ = RET_ID ? "&ret=" + RET_ID : "";
    var v = cur.name;
    if (DRILL) {
      var cat = QD.cats[DRILL.categoryId];
      if (cat) segs.push({ label: cat.name, href: "index.html#/category/" + DRILL.categoryId });
      if (qp !== DRILL.categoryId) {
        // nested school drill: the school itself is a crumb
        segs.push({ label: DRILL.name, href: "quiz.html?quiz=" + qp + "&mode=browse" + retQ });
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
    return '<span class="here-dot"></span>' + segs.map(function (s, i) {
      var last = i === segs.length - 1;
      var pre = i > 0 ? '<span class="sep">›</span>' : "";
      var cls = "tseg" + (i === 0 ? " root" : "");
      // the last crumb is where you are — never a link
      return pre + (!last && s.href ? '<a class="' + cls + '" href="' + s.href + '">' + s.label + "</a>"
                                    : '<span class="' + cls + '">' + s.label + "</span>");
    }).join("");
  }

  var cur = { name: "start" };
  function go(view, back) {
    if (!back) hist.push(view); else hist.pop();
    cur = view;
    setTimeout(function () { locked = false; }, 1500); // backstop: never leave taps dead
    var nq = QUIZ.questions.length, h, dn, di;
    if (view.name === "start") { h = startView(); dn = 0; di = -1; }
    else if (view.name === "q") { h = questionView(view.idx); dn = nq; di = view.idx; }
    else if (view.name === "results") { clearProgress(); h = resultsView(); dn = nq; di = nq; }
    else if (view.name === "browse") { h = browseView(); dn = 0; di = -1; }
    else { h = detailView(view.key); dn = 0; di = -1; }
    var trailEl = document.getElementById("wz-trail");
    if (trailEl) { trailEl.innerHTML = trailHtml(); }
    setWindow(h, dn, di);
  }
  function backTo() {
    var prev = hist.length > 1 ? hist[hist.length - 2] : { name: "start" };
    go(prev, true);
  }

  /* ---------- window views ---------- */
  function startView() {
    var saved = loadProgress(), startBtn, underBtn;
    var backLink = RET_URL
      ? ""
      : '<a class="q-quiet" href="index.html">' + QUIZ.browse + "</a>";
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

  function questionView(idx) {
    var q = QUIZ.questions[idx];
    var whyBtn = q.why
      ? '<button class="a-btn whyb" data-ans="why"><span class="ic">◇</span><span class="lb">Don\u2019t get it</span></button>'
      : "";
    var whyHtml = q.why
      ? '<div class="q-why" id="why"><div class="why-card">' + q.why + "</div></div>"
      : "";
    return '<div class="q-qwrap"><div class="q-text">' + q.t + "</div></div>" +
      '<div class="a-grid">' +
      '<button class="a-btn yes" data-ans="yes"><span class="ic">✓</span><span class="lb">Yes</span></button>' +
      '<button class="a-btn no" data-ans="no"><span class="ic">✗</span><span class="lb">No</span></button>' +
      '<button class="a-btn maybe" data-ans="skip"><span class="ic">?</span><span class="lb">Not sure</span></button>' +
      whyBtn + "</div>" + whyHtml;
  }

  /* one listing row: rank, name, tier dot + bookmark tight on the right;
     the row itself is lightly tinted with the theory's color (no separate color dot) */
  function rowHtml(t, i, tier) {
    var bm = "";
    if (DRILL && t.url) {
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
    var quizHref = qp ? "quiz.html?quiz=" + qp : "quiz.html";
    return '<div class="r-head"><div class="eyebrow">BROWSE</div>' +
      "<h1>" + name + "</h1>" +
      '<p class="lede">' + ts.length + " " + kind + " — tap one to open it.</p></div>" + rows +
      '<div class="d-quiet">' +
      '<a class="d-link" href="' + quizHref + '">Quiz</a>' +
      '<a class="d-link" href="index.html">Browse the map</a></div>';
  }

  function resultsView() {
    var sc = scores(), ts = targets().slice();
    ts.sort(function (a, b) { return (sc[b.key] || 0) - (sc[a.key] || 0); });
    var nAnswered = 0;
    if (S) S.answers.forEach(function (a) { if (a === "yes" || a === "no") nAnswered++; });
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
    return '<div class="r-head"><div class="eyebrow">YOUR ALIGNMENT</div>' +
      "<h1>Closest first.</h1>" +
      '<div class="tier-legend"><span class="lg hi">●</span> aligned <span class="lg mid">●</span> mixed <span class="lg lo">●</span> not aligned</div>' +
      skipNote + "</div>" + rows +
      '<div class="d-quiet"><a class="d-link" href="index.html">Browse the map</a></div>';
  }

  /* questions that moved the needle for one category, marked by the user's answer */
  function answerRows(key) {
    if (!S || !S.answers.some(function (a) { return !!a; })) return "";
    var qs = QUIZ.questions, out = [];
    qs.forEach(function (q, i) {
      var yp = (q.yes && q.yes[key]) || 0, np = (q.no && q.no[key]) || 0;
      if (!yp && !np) return;
      var a = S.answers[i], cls, mark, alabel;
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
    // bookmark toggle lives on theory (drill) detail screens — only for real theories (with a LOC url), not subcategory entries
    var bmBtn = "";
    if (DRILL && t.url) {
      var fid = DRILL.categoryId + ":" + t.key;
      var on = isFav(fid);
      bmBtn = '<button class="bm-btn' + (on ? " on" : "") + '" data-bm="' + fid +
        '" aria-label="' + (on ? "Remove bookmark: " : "Bookmark ") + t.name + '" aria-pressed="' + on + '">' + BM_SVG + "</button>";
    }
    // action pills: icons only — ? quiz, list browse, pin map. Source lives in the badge up top.
    var srcBadge = t.url
      ? '<a class="src-badge" href="' + t.url + '" target="_blank" rel="noopener" aria-label="Open on Landscape of Consciousness">' + INFO_SVG + "</a>"
      : "";
    var pills = "";
    if (subKey && QD.drill && QD.drill[subKey]) {
      pills += '<button class="pill icon" data-browse="' + subKey + '" aria-label="Browse the theories">' + LIST_SVG + "</button>" +
               '<button class="pill" data-drill="' + subKey + '">' + MAG_SVG + "<span>Quiz</span></button>";
    }
    var actions = pills ? '<div class="d-actions">' + pills + "</div>" : "";
    var eyebrowLabel = !DRILL ? "CATEGORY" : (t.sub ? "SCHOOL" : "THEORY");
    return '<div class="d-head" style="--bm:' + t.color + '">' + srcBadge +
      '<div class="eyebrow">' + eyebrowLabel + bmBtn + "</div>" +
      "<h1>" + t.name + "</h1>" + tag + "</div>" +
      actions +
      answerRows(key);
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

  function actGo(act) {
    if (act === "start") { clearProgress(); S = freshSession(); go({ name: "q", idx: 0 }); }
    else if (act === "resume") {
      var saved = loadProgress(), i = 0;
      if (saved) { S = { answers: saved }; while (i < saved.length && saved[i]) i++; }
      else S = freshSession();
      go({ name: "q", idx: i });
    }
    else if (act === "restart") {
      // always back to the start of the current mode — never a mode switch
      clearProgress(); S = null;
      if (BROWSE) { S = freshSession(); go({ name: "browse" }); }
      else go({ name: "start" });
    }
    else if (act === "back") {
      if (cur.name === "browse") { location.href = RET_URL || "index.html"; return; }
      if (cur.name === "start" && RET_URL) { location.href = RET_URL; return; }
      backTo();
    }
  }

  function bindWindow() {
    winBody.querySelectorAll("[data-act]").forEach(function (el) {
      el.addEventListener("click", function () { actGo(el.dataset.act); });
    });
    winBody.querySelectorAll("[data-ans]").forEach(function (el) {
      el.addEventListener("click", function () { answer(cur.idx, el.dataset.ans); });
    });
    winBody.querySelectorAll("[data-target]").forEach(function (el) {
      el.addEventListener("click", function () { go({ name: "detail", key: el.dataset.target }); });
    });
    winBody.querySelectorAll("[data-drill]").forEach(function (el) {
      el.addEventListener("click", function () {
        location.href = "quiz.html?quiz=" + el.dataset.drill + (RET_ID ? "&ret=" + RET_ID : "");
      });
    });
    winBody.querySelectorAll("[data-browse]").forEach(function (el) {
      el.addEventListener("click", function () {
        location.href = "quiz.html?quiz=" + el.dataset.browse + "&mode=browse" + (RET_ID ? "&ret=" + RET_ID : "");
      });
    });
    winBody.querySelectorAll("[data-bm]").forEach(function (el) {
      el.addEventListener("click", function () {
        var fid = el.getAttribute("data-bm"), t = null;
        targets().forEach(function (x) { if (DRILL.categoryId + ":" + x.key === fid) t = x; });
        if (!t) return;
        var nowOn = toggleFav({ id: fid, name: t.name, tagline: t.tagline, url: t.url, catId: DRILL.categoryId });
        el.classList.toggle("on", nowOn);
        el.setAttribute("aria-pressed", nowOn ? "true" : "false");
        refreshFavCounts();
      });
    });
  }

  refreshFavCounts();
  if (BROWSE) { S = freshSession(); go({ name: "browse" }); }
  else go({ name: "start" });
})();
