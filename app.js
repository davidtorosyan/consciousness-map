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
      '<a class="pill rise" style="--i:2" href="?path=browse">' + I.list + "<span>All categories</span></a></div>" +
      (nHist || nFav ? '<div class="d-actions">' +
        (nHist ? '<a class="pill rise" style="--i:3" href="?path=history">' + I.history + "<span>History</span></a>" : "") +
        (nFav ? '<a class="pill rise" style="--i:4" href="?path=saved">' + I.bookmark + "<span>Saved (" + nFav + ")</span></a>" : "") +
        "</div>" : "") +
      '<div class="foot rise" style="--i:5">Names and colors follow the official ' +
      '<a href="' + CM.LOC_URL + '" target="_blank" rel="noopener">Landscape of Consciousness ↗</a>' +
      '<div class="build">build ' + esc(window.CM_BUILD || "dev") + "</div></div>";
  };

  CM.views.browse = function () {
    var rows = CM.categories.map(function (c, i) {
      return '<a class="subcard rise" style="--i:' + (i + 3) + '" href="' + CM.href(c) + '">' +
        '<span class="loc-dot" style="background:' + esc(c.color) + '" aria-hidden="true"></span>' +
        '<span class="grow"><span class="sub-name">' + esc(c.name) + "</span><br>" +
        '<span class="sub-tag">' + esc(c.tagline) + "</span></span>" +
        '<span class="chev">›</span></a>';
    }).join("");
    app.innerHTML = CM.trail([{ label: "Home", href: "./" }, { label: "All categories" }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">ALL CATEGORIES</div>' +
      "<h1>The eleven categories</h1>" +
      '<p class="desc">Every family of theories on the map. Open one to see what\u2019s inside it or take its quiz.</p></header>' +
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
  /* school pages without their own LOC entry link to their category's */
  function locPill(node) {
    var url = node.url || node.category.url;
    return '<a class="pill" href="' + esc(url) + '" target="_blank" rel="noopener">' +
      "<span>Read on LOC \u2197</span></a>";
  }
  function head(node, kicker) {
    var long = node.name.length > 36 ? ' class="long"' : "";
    return '<div class="d-head"><div class="eyebrow">' + kicker + "</div>" +
      "<h1" + long + ">" + esc(node.name) + "</h1>" +
      (node.tagline ? '<p class="tag">' + esc(node.tagline) + "</p>" : "") + "</div>";
  }
  function listRows(nodes) {
    return nodes.map(function (t) {
      return '<div class="r-row" style="--bm:' + esc(t.color) + ";--tint:" + esc(t.color) + '">' +
        '<a class="r-open" href="' + CM.href(t) + '"><span class="grow">' +
        '<span class="nm">' + esc(t.name) + "</span>" +
        (t.tagline ? '<span class="tg">' + esc(t.tagline) + "</span>" : "") +
        "</span>" + (t.kind === "school" ? '<span class="chev">\u203A</span>' : "") + "</a>" +
        (t.kind === "theory" ? CM.bookmarkButton(t, true) : "") + "</div>";
    }).join("");
  }
  function render(node, body) {
    CM.setAccent(node.color);
    document.title = node.name + " \u2014 Landscape of Consciousness";
    app.innerHTML = CM.frame(nodeTrail(node), body);
    CM.bindBookmarks(app);
    CM.bindBackToResults(app);
  }

  /* a category or school. One clear call to action: take its quiz.
     Its schools/theories stay folded behind a secondary Browse button. */
  CM.views.group = function (route) {
    var node = route.node, n = node.children.length;
    var kind = node.children.some(function (x) { return x.kind === "school"; }) ? "schools" : "theories";
    var open = route.expand || (!node.quiz && n > 1);
    var nq = node.quiz ? CM.quiz(node.quiz).questions.length : 0;
    render(node, head(node, node.kind === "school" ? "SCHOOL" : "CATEGORY") +
      (node.quiz ? '<a class="big-start cta" href="' + CM.href(node, "quiz") + '">' +
        "<span>Take the " + esc(node.name) + " quiz</span>" +
        '<span class="cta-sub">' + nq + (nq === 1 ? " question" : " questions") + "</span></a>"
        // a one-theory category has no quiz: lead straight to the theory
        : n === 1 ? '<a class="big-start cta" href="' + CM.href(node.children[0]) + '">' +
          "<span>Read about " + esc(node.children[0].name) + "</span>" +
          '<span class="cta-sub">the one theory LOC lists here</span></a>' : "") +
      CM.answerRows(route.from, node.key) +
      '<div class="d-quiet secondary">' +
      (node.quiz ? '<button class="d-link" data-browse data-count="browse" aria-expanded="' + open + '" aria-controls="kids">' +
        "Browse " + n + " " + kind + ' <span class="caret" aria-hidden="true">\u25BE</span></button>' : "<span></span>") +
      '<a class="d-link" href="' + esc(node.url || node.category.url) + '" target="_blank" rel="noopener">Read on LOC \u2197</a></div>' +
      '<div id="kids"' + (open ? "" : " hidden") + ">" + listRows(node.children) + "</div>");
    var btn = app.querySelector("[data-browse]");
    if (btn) btn.addEventListener("click", function () {
      var nowOpen = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(nowOpen));
      document.getElementById("kids").hidden = !nowOpen;
      // remember it in the URL, so coming back from a school or theory
      // lands on the open list
      try { history.replaceState(history.state, "", CM.href(node, nowOpen ? "browse" : "") + location.search.replace(/^\?path=[^&]*/, "")); }
      catch (e) { /* ignore */ }
    });
  };

  /* a theory: save it, read it on LOC, or go back up to its school/category */
  CM.views.theory = function (route) {
    var node = route.node, parent = node.parent;
    // theories its quiz can't tell apart from this one (same positions)
    var lead = node.lead || node;
    var twins = [lead].concat(lead.members).filter(function (t) { return t !== node; });
    render(node, '<div style="--bm:' + esc(node.color) + '">' + head(node, "THEORY") +
      '<div class="d-actions">' + CM.bookmarkButton(node, false, true) + locPill(node) + "</div>" +
      (node.review ? '<p class="d-note">LOC is still reviewing this entry.</p>' : "") +
      (twins.length ? '<p class="d-note">The ' + esc(parent.name) + " quiz can\u2019t tell this apart from " +
        twins.map(function (t) { return '<a href="' + esc(CM.fromResults(CM.href(t), route.from)) + '">' + esc(t.name) + "</a>"; })
          .join(", ") + ": they answer its questions the same way.</p>" : "") +
      "</div>" +
      CM.answerRows(route.from, node.key) +
      '<div class="d-quiet"><a class="d-link" href="' + CM.href(parent) + '">\u2039 Back to ' + esc(parent.name) + "</a></div>");
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
      QUIZ_CAP + " per quiz. " + (over ? over + " over cap." : "All within cap.") + "</p>" +
      '<p class="desc">Usage counting from this device: ' + (CM.counting && CM.counting() ? "on" : "off") +
      ' (<a class="dbg-link" href="?path=debug&amp;count=off">turn off</a> · <a class="dbg-link" href="?path=debug&amp;count=on">on</a>; never on localhost).</p></header>' +
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
