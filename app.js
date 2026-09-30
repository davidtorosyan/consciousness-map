/* Landscape of Consciousness — map. Tiny SPA over the 11 canonical categories. */
(function () {
  "use strict";
  var CATS = window.LOC_CATEGORIES;
  var app = document.getElementById("app");
  var current = { view: "landing" };

  function catById(id) {
    for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i];
    return null;
  }
  function setAccent(color) {
    if (color) document.body.style.setProperty("--acc", color);
    else document.body.style.removeProperty("--acc");
  }

  /* ---------- bookmarked theories (localStorage) ---------- */
  var FAV_KEY = "cm_favorites_v1";
  var BM_SVG = '<svg class="bm-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h11V21l-5.5-3.8L6.5 21z"/></svg>';
  var INFO_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="11" x2="12" y2="16.6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="7.6" r="1.5" fill="currentColor"/></svg>';
  var LIST_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="6" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="5" cy="18" r="1.5" fill="currentColor" stroke="none"/><line x1="10.5" y1="6" x2="20" y2="6"/><line x1="10.5" y1="12" x2="20" y2="12"/><line x1="10.5" y1="18" x2="20" y2="18"/></g></svg>';
  var MAG_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><line x1="15.8" y1="15.8" x2="20.5" y2="20.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var HIST_SVG = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3.2 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function getFavs() {
    try { var f = JSON.parse(localStorage.getItem(FAV_KEY)); return Array.isArray(f) ? f : []; }
    catch (e) { return []; }
  }
  function refreshFavCounts() {
    var n = getFavs().length, label = n ? " (" + n + ")" : "";
    document.querySelectorAll("[data-favcount]").forEach(function (el) { el.textContent = label; });
  }

  /* ---------- shared chrome ---------- */
  function trail(segs) {
    var h = '<nav class="trail rise" style="--i:1" aria-label="Where you are"><span class="here-dot"></span>';
    segs.forEach(function (s, i) {
      if (i > 0) h += '<span class="sep">›</span>';
      var cls = "tseg" + (i === 0 ? " root" : "");
      h += s.view
        ? '<button class="' + cls + '" data-goto=\'' + JSON.stringify(s.view) + "'>" + s.label + "</button>"
        : '<span class="' + cls + '">' + s.label + "</span>";
    });
    return h + "</nav>";
  }
  /* ---------- views ---------- */
  function rowHtml(c, i) {
    return '<button class="subcard rise" style="--i:' + i + '"' +
      " data-goto='" + JSON.stringify({ view: "category", id: c.id }) + "'>" +
      '<span class="loc-dot" style="background:' + c.color + '" aria-hidden="true"></span>' +
      '<span class="grow"><span class="sub-name">' + c.name + "</span><br>" +
      '<span class="sub-tag">' + c.tagline + "</span></span>" +
      '<span class="chev">›</span></button>';
  }

  function landingView() {
    var rows = CATS.map(function (c, i) { return rowHtml(c, i + 5); }).join("");
    return trail([{ label: "Home", view: null }]) +
      '<div class="landing-head rise" style="--i:0">' +
      '<div class="eyebrow">THE LANDSCAPE OF CONSCIOUSNESS</div>' +
      "<h1>Find your view</h1>" +
      '<p class="lede">Eleven families of theories about what consciousness is. ' +
      "Pick the one that sounds closest.</p></div>" +
      '<div class="d-actions">' +
      '<a class="pill rise" style="--i:1" href="?path=quiz">' + MAG_SVG + "<span>Quiz</span></a>" +
      '<a class="pill icon rise" style="--i:2" href="?path=history" aria-label="Quiz history">' + HIST_SVG + "</a>" +
      '<a class="pill icon rise" style="--i:3" href="?path=saved" aria-label="Bookmarked theories">' + BM_SVG + '<span class="fav-n" data-favcount></span></a></div>' +
      '<div class="section-label rise" style="--i:4">THE ELEVEN CATEGORIES</div>' +
      rows +
      '<div class="foot rise" style="--i:17">Names and colors follow the official ' +
      '<a href="https://loc.closertotruth.com/" target="_blank" rel="noopener">Landscape of Consciousness ↗</a>' +
      ' · <a href="?path=history">History</a></div>';
  }

  function categoryView(id) {
    var c = catById(id);
    if (!c) return landingView();
    // "Quiz" here means that category's own quiz. The top-level quiz lives
    // only on the map landing page — it is never linked from sub pages.
    var drill = window.QUIZ_DATA && window.QUIZ_DATA.drill && window.QUIZ_DATA.drill[id];
    var pills;
    if (drill) {
      var browseAria = drill.areas.some(function (a) { return !!a.sub; }) ? "Browse the schools" : "Browse the theories";
      pills =
        '<a class="pill" href="?path=' + id + '/quiz">' + MAG_SVG + "<span>Quiz</span></a>" +
        '<a class="pill icon" href="?path=' + id + '/browse" aria-label="' + browseAria + '">' + LIST_SVG + "</a>";
    } else {
      pills = '<a class="pill" href="?path=quiz">' + MAG_SVG + "<span>Quiz</span></a>";
    }
    return trail([{ label: "Home", view: { view: "landing" } }, { label: c.name, view: null }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">CATEGORY</div>' +
      '<a class="src-badge" href="' + c.url + '" target="_blank" rel="noopener" aria-label="Open on Landscape of Consciousness">' + INFO_SVG + "</a>" +
      "<h1>" + c.name + "</h1>" +
      '<p class="desc">' + c.tagline + "</p></header>" +
      '<div class="d-actions rise" style="--i:3">' + pills + "</div>";
  }

  /* ---------- router: every view lives at / with ?path=<a/b/c> ---------- */
  function viewFromHash() {
    var m = /^#\/category\/([^\/]+)/.exec(location.hash || "");
    if (m && catById(m[1])) return { view: "category", id: m[1] };
    return null;
  }
  function viewFromPath() {
    var segs = window.CM_PATH || [];
    if (segs.length === 0) return { view: "landing" };
    if (segs.length === 1 && catById(segs[0])) return { view: "category", id: segs[0] };
    return null;
  }
  function render(view) {
    setAccent(view.view === "category" ? catById(view.id).color : null);
    app.innerHTML = view.view === "category" ? categoryView(view.id) : landingView();
    bind();
    refreshFavCounts();
  }
  function navigate(view) {
    location.href = view.view === "category" ? "?path=" + view.id + "/" : "./";
  }
  function bind() {
    app.querySelectorAll("[data-goto]").forEach(function (el) {
      el.addEventListener("click", function () {
        navigate(JSON.parse(el.dataset.goto), false);
      });
    });
  }

  var start = viewFromHash() || viewFromPath();
  if (!start) return; // another view owns this URL
  window.CM_CLAIMED = true;
  current = start;
  render(current);
})();
