/* Map pages: home, the category list, category/school pages, theory pages, debug. */
(function () {
  "use strict";
  var esc = CM.esc, I = CM.icons;
  var app = document.getElementById("app");
  var QUIZ_CAP = 12;

  CM.views.home = function () {
    // History and Saved only appear once there's something in them
    var nFav = CM.favs.all().length, nHist = CM.history.all().length;
    var nq = window.QUIZ_DATA.top.questions.length;
    app.innerHTML = CM.trail([{ label: "Home" }]) +
      '<div class="landing-head rise" style="--i:0">' +
      '<div class="eyebrow">THE LANDSCAPE OF CONSCIOUSNESS</div>' +
      "<h1>Find your view</h1>" +
      '<p class="lede">There are hundreds of theories of what consciousness is. ' +
      "The Landscape of Consciousness sorts them into eleven families. " +
      "Answer " + nq + " quick questions to see which sound closest to you.</p></div>" +
      '<div class="d-actions">' +
      '<a class="pill rise" style="--i:1" href="?path=quiz">' + I.search + "<span>Take the quiz</span></a>" +
      '<a class="pill rise" style="--i:2" href="?path=browse">' + I.list + "<span>Browse</span></a></div>" +
      (nHist || nFav ? '<div class="d-actions">' +
        (nHist ? '<a class="pill rise" style="--i:3" href="?path=history">' + I.history + "<span>History</span></a>" : "") +
        (nFav ? '<a class="pill rise" style="--i:4" href="?path=saved">' + I.bookmark + "<span>Saved (" + nFav + ")</span></a>" : "") +
        "</div>" : "") +
      '<div class="foot rise" style="--i:5">Names and colors follow the official ' +
      '<a href="' + CM.LOC_URL + '" target="_blank" rel="noopener">Landscape of Consciousness ↗</a></div>';
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

  /* Home › Category › School › Theory, current page last and unlinked */
  function nodeTrail(node) {
    var chain = [];
    for (var n = node; n; n = n.parent) chain.unshift(n);
    return CM.trail([{ label: "Home", href: "./" }].concat(chain.map(function (n, i) {
      return { label: n.name, href: i < chain.length - 1 ? CM.href(n) : null };
    })));
  }
  function locBadge(url, name) {
    return url ? '<a class="src-badge" href="' + esc(url) + '" target="_blank" rel="noopener" aria-label="Open ' +
      esc(name) + ' on Landscape of Consciousness">' + I.info + "</a>" : "";
  }
  /* school pages without their own LOC entry link to their category's */
  function locUrl(node) { return node.url || node.category.url; }
  function render(node, body) {
    CM.setAccent(node.color);
    document.title = node.name + " — Landscape of Consciousness";
    app.innerHTML = CM.frame(nodeTrail(node), body);
    CM.bindBookmarks(app);
    CM.bindBackToResults(app);
  }

  /* a category or school: its quiz and everything inside it */
  CM.views.group = function (route) {
    var node = route.node;
    var hasSchools = node.children.some(function (x) { return x.kind === "school"; });
    var rows = node.children.map(function (t) {
      return '<div class="r-row" style="--bm:' + esc(t.color) + ";--tint:" + esc(t.color) + '">' +
        '<a class="r-open" href="' + CM.href(t) + '"><span class="grow">' +
        '<span class="nm">' + esc(t.name) + "</span>" +
        (t.tagline ? '<span class="tg">' + esc(t.tagline) + "</span>" : "") +
        "</span>" + (t.kind === "school" ? '<span class="chev">\u203A</span>' : "") + "</a>" +
        (t.kind === "theory" ? CM.bookmarkButton(t, true) : "") + "</div>";
    }).join("");
    render(node, '<div class="d-head">' + locBadge(locUrl(node), node.name) +
      '<div class="eyebrow">' + (node.kind === "school" ? "SCHOOL" : "CATEGORY") + "</div>" +
      "<h1>" + esc(node.name) + "</h1>" +
      (node.tagline ? '<p class="tag">' + esc(node.tagline) + "</p>" : "") + "</div>" +
      (node.quiz ? '<div class="d-actions"><a class="pill" href="' + CM.href(node, "quiz") + '">' + I.search + "<span>Quiz</span></a></div>" : "") +
      CM.answerRows(route.from, node.key) +
      '<div class="r-head"><div class="eyebrow">' + node.children.length + (hasSchools ? " SCHOOLS" : " THEORIES") + "</div></div>" +
      rows);
  };

  CM.views.theory = function (route) {
    var node = route.node;
    render(node, '<div class="d-head" style="--bm:' + esc(node.color) + '">' + locBadge(node.url, node.name) +
      '<div class="eyebrow">THEORY' + CM.bookmarkButton(node) + "</div>" +
      "<h1>" + esc(node.name) + "</h1>" +
      (node.tagline ? '<p class="tag">' + esc(node.tagline) + "</p>" : "") + "</div>" +
      CM.answerRows(route.from, node.key));
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
