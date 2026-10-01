/* Map pages: home, the category list, a category, and the debug page. */
(function () {
  "use strict";
  var esc = CM.esc, I = CM.icons;
  var app = document.getElementById("app");
  var QUIZ_CAP = 12;

  function favCount() {
    var n = CM.favs.all().length;
    return n ? " (" + n + ")" : "";
  }

  CM.views.home = function () {
    app.innerHTML = CM.trail([{ label: "Home" }]) +
      '<div class="landing-head rise" style="--i:0">' +
      '<div class="eyebrow">THE LANDSCAPE OF CONSCIOUSNESS</div>' +
      "<h1>Find your view</h1>" +
      '<p class="lede">Eleven families of theories about what consciousness is. ' +
      "Pick the one that sounds closest.</p></div>" +
      '<div class="d-actions">' +
      '<a class="pill rise" style="--i:1" href="?path=quiz">' + I.search + "<span>Quiz</span></a>" +
      '<a class="pill rise" style="--i:2" href="?path=browse">' + I.list + "<span>Browse</span></a>" +
      '<a class="pill icon rise" style="--i:3" href="?path=history" aria-label="Quiz history">' + I.history + "</a>" +
      '<a class="pill icon rise" style="--i:4" href="?path=saved" aria-label="Bookmarked theories">' + I.bookmark +
      '<span class="fav-n">' + favCount() + "</span></a></div>" +
      '<div class="foot rise" style="--i:5">Names and colors follow the official ' +
      '<a href="https://loc.closertotruth.com/" target="_blank" rel="noopener">Landscape of Consciousness ↗</a>' +
      ' · <a href="?path=debug">Debug</a></div>';
  };

  CM.views.browse = function () {
    var rows = CM.categories.map(function (c, i) {
      return '<a class="subcard rise" style="--i:' + (i + 3) + '" href="' + CM.href(c) + '">' +
        '<span class="loc-dot" style="background:' + esc(c.color) + '" aria-hidden="true"></span>' +
        '<span class="grow"><span class="sub-name">' + esc(c.name) + "</span><br>" +
        '<span class="sub-tag">' + esc(c.tagline) + "</span></span>" +
        '<span class="chev">›</span></a>';
    }).join("");
    app.innerHTML = CM.trail([{ label: "Home", href: "./" }, { label: "Browse" }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">BROWSE</div>' +
      "<h1>The eleven categories</h1>" +
      '<p class="desc">Every family of theories on the map. Open one to take its quiz or browse its theories.</p></header>' +
      rows;
  };

  CM.views.category = function (route) {
    var c = route.node;
    var hasSchools = c.children.some(function (x) { return x.kind === "school"; });
    CM.setAccent(c.color);
    app.innerHTML = CM.trail([{ label: "Home", href: "./" }, { label: c.name }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">CATEGORY</div>' +
      '<a class="src-badge" href="' + esc(c.url) + '" target="_blank" rel="noopener" aria-label="Open on Landscape of Consciousness">' + I.info + "</a>" +
      "<h1>" + esc(c.name) + "</h1>" +
      '<p class="desc">' + esc(c.tagline) + "</p></header>" +
      '<div class="d-actions rise" style="--i:3">' +
      '<a class="pill" href="' + CM.href(c, "quiz") + '">' + I.search + "<span>Quiz</span></a>" +
      '<a class="pill icon" href="' + CM.href(c, "browse") + '" aria-label="' +
      (hasSchools ? "Browse the schools" : "Browse the theories") + '">' + I.list + "</a></div>";
  };

  /* ---------- debug: quiz nesting + question counts ---------- */
  CM.views.debug = function () {
    var rows = [];
    function addRow(depth, name, href, qs, items, kind) {
      rows.push({ depth: depth, name: name, href: href, qs: qs, items: items, kind: kind, over: qs > QUIZ_CAP });
    }
    addRow(0, "Main quiz", null, window.QUIZ_DATA.top.questions.length, CM.categories.length, "categories");
    (function walk(nodes, depth) {
      nodes.forEach(function (n) {
        if (!n.quiz) return;
        var q = CM.quiz(n.quiz);
        var kind = n.children.some(function (x) { return x.kind === "school"; }) ? "schools" : "theories";
        addRow(depth, n.name, CM.href(n, "quiz"), q.questions.length, n.children.length, kind);
        walk(n.children, depth + 1);
      });
    })(CM.categories, 0);
    var over = rows.filter(function (r) { return r.over; }).length;
    document.title = "Debug — Landscape of Consciousness";
    app.innerHTML = CM.trail([{ label: "Home", href: "./" }, { label: "Debug" }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">DEBUG</div>' +
      "<h1>Quiz breakdown</h1>" +
      '<p class="desc">Every quiz on the site, nested, with question counts. Cap: ' +
      QUIZ_CAP + " per quiz. " + (over ? over + " over cap." : "All within cap.") + "</p></header>" +
      '<div class="dbg-table rise" style="--i:3">' +
      '<div class="dbg-row dbg-head"><span class="dbg-name">Quiz</span>' +
      '<span class="dbg-num">Questions</span><span class="dbg-num">Items</span></div>' +
      rows.map(function (r) {
        var indent = r.depth ? '<span class="dbg-indent">' + new Array(r.depth + 1).join("› ") + "</span>" : "";
        var name = r.href ? '<a class="dbg-link" href="' + esc(r.href) + '">' + esc(r.name) + "</a>" : esc(r.name);
        return '<div class="dbg-row"><span class="dbg-name">' + indent + name + "</span>" +
          '<span class="dbg-num' + (r.over ? " dbg-over" : "") + '">' + r.qs + "</span>" +
          '<span class="dbg-num">' + r.items + " " + r.kind + "</span></div>";
      }).join("") + "</div>";
  };
})();
