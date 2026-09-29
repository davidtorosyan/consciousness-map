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
  function getFavs() {
    try { var f = JSON.parse(localStorage.getItem(FAV_KEY)); return Array.isArray(f) ? f : []; }
    catch (e) { return []; }
  }
  function refreshFavCounts() {
    var n = getFavs().length, label = n ? " (" + n + ")" : "";
    document.querySelectorAll("[data-favcount]").forEach(function (el) { el.textContent = label; });
  }

  /* ---------- shared chrome ---------- */
  function topbar(showBack) {
    return '<div class="topbar rise" style="--i:0">' +
      (showBack
        ? '<button class="icon-btn" data-nav="back" aria-label="Back">‹</button>'
        : '<span></span>') +
      '<button class="icon-btn" data-nav="home" aria-label="Start over">↺</button></div>';
  }
  function trail(segs) {
    var h = '<nav class="trail rise" style="--i:1" aria-label="Where you are"><span class="here-dot"></span>';
    segs.forEach(function (s, i) {
      if (i > 0) h += '<span class="sep">›</span>';
      h += s.view
        ? '<button class="tseg" data-goto=\'' + JSON.stringify(s.view) + "'>" + s.label + "</button>"
        : '<span class="tseg">' + s.label + "</span>";
    });
    return h + "</nav>";
  }
  function bottomNav() {
    return '<div class="bottom-nav rise" style="--i:98">' +
      '<button class="nav-btn" data-nav="back">‹ Back</button>' +
      '<button class="nav-btn primary" data-nav="home">↺ Start over</button></div>';
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
    var rows = CATS.map(function (c, i) { return rowHtml(c, i + 4); }).join("");
    return '<div class="landing-head rise" style="--i:0">' +
      '<div class="eyebrow">THE LANDSCAPE OF CONSCIOUSNESS</div>' +
      "<h1>Find your view</h1>" +
      '<p class="lede">Eleven families of theories about what consciousness is. ' +
      "Pick the one that sounds closest.</p></div>" +
      '<div class="landing-tools">' +
      '<a class="tool-btn rise" style="--i:1;text-decoration:none" href="quiz.html">' +
      '<span>◉ <strong>Take the quiz</strong> — 11 quick questions</span><span class="arr">›</span></a>' +
      '<a class="tool-btn rise" style="--i:2;text-decoration:none" href="favorites.html">' +
      "<span>" + BM_SVG + ' <strong>Bookmarked theories</strong><span data-favcount></span></span><span class="arr">›</span></a></div>' +
      '<div class="section-label rise" style="--i:3">THE ELEVEN CATEGORIES</div>' +
      rows +
      '<div class="foot rise" style="--i:16">Names and colors follow the official ' +
      '<a href="https://loc.closertotruth.com/" target="_blank" rel="noopener">Landscape of Consciousness ↗</a></div>';
  }

  function categoryView(id) {
    var c = catById(id);
    if (!c) return landingView();
    // On a category page, "Take the quiz" means that category's own quiz;
    // the top-level one is labeled the main quiz so the two can't be confused.
    var drill = window.QUIZ_DATA && window.QUIZ_DATA.drill && window.QUIZ_DATA.drill[id];
    var quizBtns;
    if (drill) {
      var intro = drill.intro.charAt(0).toLowerCase() + drill.intro.slice(1);
      var hasSub = drill.areas.some(function (a) { return !!a.sub; });
      var browseLabel = hasSub ? "Browse the schools" : "Browse the theories";
      quizBtns =
        '<a class="tool-btn rise" style="--i:4;text-decoration:none" href="quiz.html?quiz=' + id + "&ret=" + id + '">' +
        "<span>◉ <strong>Take the quiz</strong> — " + intro + "</span>" +
        '<span class="arr">›</span></a>' +
        '<a class="tool-btn rise" style="--i:5;text-decoration:none" href="quiz.html?quiz=' + id + "&mode=browse&ret=" + id + '">' +
        "<span><strong>" + browseLabel + "</strong> — no questions, just the list</span>" +
        '<span class="arr">›</span></a>' +
        '<a class="tool-btn rise" style="--i:6;text-decoration:none" href="quiz.html">' +
        "<span>◉ <strong>Take the main quiz</strong> — see where you land</span>" +
        '<span class="arr">›</span></a>';
    } else {
      quizBtns =
        '<a class="tool-btn rise" style="--i:4;text-decoration:none" href="quiz.html">' +
        "<span>◉ <strong>Take the quiz</strong> — see where you land</span>" +
        '<span class="arr">›</span></a>';
    }
    return topbar(true) +
      trail([{ label: "Map", view: { view: "landing" } }, { label: c.name, view: null }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">CATEGORY</div>' +
      "<h1>" + c.name + "</h1>" +
      '<p class="desc">' + c.tagline + "</p></header>" +
      '<div class="landing-tools">' +
      '<a class="tool-btn rise" style="--i:3;text-decoration:none" href="' + c.url +
      '" target="_blank" rel="noopener">' +
      "<span><strong>Explore on Landscape of Consciousness</strong> ↗</span>" +
      '<span class="arr">›</span></a>' +
      quizBtns + "</div>" +
      bottomNav();
  }

  /* ---------- router ---------- */
  function hashFor(view) {
    if (view.view === "category") return "#/category/" + view.id;
    return "#/";
  }
  function viewFromHash() {
    var m = /^#\/category\/([^\/]+)/.exec(location.hash || "");
    if (m && catById(m[1])) return { view: "category", id: m[1] };
    return null;
  }
  function render(view) {
    setAccent(view.view === "category" ? catById(view.id).color : null);
    app.innerHTML = view.view === "category" ? categoryView(view.id) : landingView();
    bind();
    refreshFavCounts();
  }
  function navigate(view, back) {
    document.documentElement.classList.toggle("nav-back", !!back);
    try { history.replaceState(null, "", hashFor(view)); } catch (e) {}
    var apply = function () {
      render(view);
      current = view;
      window.scrollTo(0, 0);
    };
    if (document.startViewTransition) {
      try {
        var vt = document.startViewTransition(apply);
        if (vt && vt.finished && vt.finished.catch) vt.finished.catch(function () {});
      } catch (e) { apply(); }
    } else apply();
  }
  function parentOf(view) {
    if (view.view === "category") return { view: "landing" };
    return { view: "landing" };
  }
  function bind() {
    app.querySelectorAll("[data-goto]").forEach(function (el) {
      el.addEventListener("click", function () {
        navigate(JSON.parse(el.dataset.goto), false);
      });
    });
    app.querySelectorAll('[data-nav="back"]').forEach(function (el) {
      el.addEventListener("click", function () { navigate(parentOf(current), true); });
    });
    app.querySelectorAll('[data-nav="home"]').forEach(function (el) {
      el.addEventListener("click", function () { navigate({ view: "landing" }, true); });
    });
  }

  var deepStart = viewFromHash();
  if (deepStart) current = deepStart;
  render(current);
})();
