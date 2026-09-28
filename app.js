/* The Consciousness Map — V3. Tiny SPA: pick the closest, go deeper. */
(function () {
  "use strict";
  var D = window.MAP_DATA;
  var app = document.getElementById("app");
  var bg = document.querySelector(".bg");
  var current = { view: "landing" };
  var unsureReturn = { view: "landing" };

  function cardById(id) { return D.cards.find(function (c) { return c.id === id; }); }
  function subById(cardId, subId) {
    return cardById(cardId).subs.find(function (s) { return s.id === subId; });
  }
  function theoryById(id) { return D.theories[String(id)]; }
  function linkFor(id) { return D.links[String(id)] || null; }

  function setTerritory(t) {
    if (document.body.dataset.territory === t) return;
    bg.classList.add("fade");
    setTimeout(function () {
      if (t) document.body.dataset.territory = t;
      else document.body.removeAttribute("data-territory");
      bg.classList.remove("fade");
    }, 200);
  }

  /* ---------- shared chrome ---------- */
  function topbar(showBack) {
    return '<div class="topbar rise" style="--i:0">' +
      (showBack
        ? '<button class="icon-btn" data-nav="back" aria-label="Back">‹</button>'
        : '<span></span>') +
      '<button class="icon-btn" data-nav="home" aria-label="Start over">↺</button></div>';
  }
  // segs: [{label, view}] ; last has view:null
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
  function escapeBtn() {
    return '<button class="tool-btn rise" style="--i:99" data-nav="unsure">' +
      "<span><strong>None of these</strong> / not sure</span>" +
      '<span class="arr">›</span></button>';
  }
  function bottomNav(backView) {
    return '<div class="bottom-nav rise" style="--i:98">' +
      '<button class="nav-btn" data-nav="back">‹ Back</button>' +
      '<button class="nav-btn primary" data-nav="home">↺ Start over</button></div>';
  }
  function seeAlso(list) {
    if (!list || !list.length) return "";
    var h = '<div class="seealso rise" style="--i:90"><div class="sa-label">ALSO WORTH A LOOK</div>';
    list.forEach(function (sa) {
      var parts = sa.target.split(".");
      h += '<button class="chip" data-goto=\'' +
        JSON.stringify({ view: "leaf", card: parts[0], sub: parts[1] }) +
        "'>◈ " + sa.label + "</button>";
    });
    return h + "</div>";
  }
  function theoryRow(tid, i) {
    var t = theoryById(tid), link = linkFor(tid);
    var inner = '<div class="t-name">' + t.name + (link ? '<span class="ext">↗</span>' : "") + "</div>" +
      '<div class="t-sum">' + t.summary + "</div>";
    return link
      ? '<a class="theory rise" style="--i:' + i + '" href="' + link + '" target="_blank" rel="noopener">' + inner + "</a>"
      : '<div class="theory rise" style="--i:' + i + '">' + inner + "</div>";
  }

  /* ---------- views ---------- */
  function landingView() {
    var cards = D.cards.map(function (c, i) {
      return '<button class="card rise" style="--i:' + (i + 2) + ';--cg1:' + c.palette.g1 +
        ";--cg2:" + c.palette.g2 + ";--cacc:" + c.palette.accent + '"' +
        " data-goto='" + JSON.stringify({ view: "category", card: c.id }) + "'>" +
        '<span class="num">0' + (i + 1) + "</span>" +
        '<span class="card-name">' + c.name + "</span>" +
        '<span class="card-tag">' + (c.short || c.tagline) + "</span></button>";
    }).join("");
    return '<div class="landing-head rise" style="--i:0">' +
      '<div class="eyebrow">A FIELD GUIDE TO CONSCIOUSNESS</div>' +
      "<h1>The Consciousness<br>Map</h1>" +
      '<p class="prompt">What is consciousness, <em>fundamentally?</em></p>' +
      '<p class="lede">Pick the card that sounds closest — then go deeper.</p></div>' +
      '<div class="grid">' + cards + "</div>" +
      '<div class="landing-tools">' +
      '<a class="tool-btn rise" style="--i:8;text-decoration:none" href="quiz.html">' +
      '<span>◉ <strong>Find your view</strong> — 9 quick questions</span><span class="arr">›</span></a>' +
      '<button class="tool-btn rise" style="--i:9" data-nav="unsure"><span><strong>None of these fit?</strong> Take your time</span><span class="arr">›</span></button>' +
      '<button class="tool-btn rise" style="--i:10" data-goto=\'' + JSON.stringify({ view: "phenomenology" }) +
      '\'><span>◈ <strong>Rather start by describing experience?</strong></span><span class="arr">›</span></button>' +
      "</div>" +
      '<div class="foot rise" style="--i:11">120 theories · sources: Closer to Truth<br>' +
      '<a href="https://loc.closertotruth.com/" target="_blank" rel="noopener">Landscape of Consciousness ↗</a></div>';
  }

  function categoryView(cardId) {
    var c = cardById(cardId);
    var subs = c.subs.map(function (s, i) {
      var n = s.theories.length;
      return '<button class="subcard rise" style="--i:' + (i + 4) + '"' +
        " data-goto='" + JSON.stringify({ view: "leaf", card: cardId, sub: s.id }) + "'>" +
        '<span class="grow"><span class="sub-name">' + s.name + "</span><br>" +
        '<span class="sub-tag">' + s.tagline + "</span></span>" +
        (n ? '<span class="count-pill">' + n + "</span>" : "") +
        '<span class="chev">›</span></button>';
    }).join("");
    return topbar(true) +
      trail([{ label: "Map", view: { view: "landing" } }, { label: c.name, view: null }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">TERRITORY</div>' +
      "<h1>" + c.name + "</h1>" +
      '<p class="desc">' + c.description + "</p></header>" +
      '<div class="section-label rise" style="--i:3">GO DEEPER — <em>PICK THE CLOSEST</em></div>' +
      subs + seeAlso(c.see_also) +
      '<div class="landing-tools">' + escapeBtn() + "</div>" + bottomNav();
  }

  function leafView(cardId, subId) {
    var c = cardById(cardId), s = subById(cardId, subId);
    var n = s.theories.length;
    var body = n
      ? s.theories.map(function (tid, i) { return theoryRow(tid, i + 4); }).join("")
      : '<div class="note-box rise" style="--i:4">' + (s.note || "Theories are still being filed here.") + "</div>";
    return topbar(true) +
      trail([
        { label: "Map", view: { view: "landing" } },
        { label: c.name, view: { view: "category", card: cardId } },
        { label: s.name, view: null },
      ]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">' +
      (n ? "THEORIES · " + n : "TERRITORY") + "</div>" +
      "<h1>" + s.name + "</h1>" +
      '<p class="desc">' + s.description + "</p></header>" +
      body + seeAlso(s.see_also) +
      '<div class="landing-tools">' + escapeBtn() + "</div>" + bottomNav();
  }

  function phenomenologyView() {
    var p = D.phenomenology;
    var body = p.theories.map(function (tid, i) { return theoryRow(tid, i + 4); }).join("");
    return topbar(true) +
      trail([{ label: "Map", view: { view: "landing" } }, { label: p.name, view: null }]) +
      '<header class="hero rise" style="--i:2"><div class="kicker">ANOTHER WAY IN</div>' +
      "<h1>" + p.name + "</h1>" +
      '<p class="desc">' + p.description + "</p></header>" +
      '<div class="section-label rise" style="--i:3">START HERE</div>' + body + bottomNav();
  }

  function unsureView() {
    // list the options at the current level so the user can browse deliberately
    var items = "", title = "No wrong answers.",
      text = "Take your time — read through the options and tap any of them to explore it.";
    if (current.view === "landing" || current.view === "unsure") {
      items = D.cards.map(function (c, i) {
        return '<button class="subcard rise" style="--i:' + (i + 3) + '"' +
          " data-goto='" + JSON.stringify({ view: "category", card: c.id }) + "'>" +
          '<span class="grow"><span class="sub-name">' + c.name + "</span><br>" +
          '<span class="sub-tag">' + c.tagline + "</span></span>" +
          '<span class="chev">›</span></button>';
      }).join("");
    } else {
      var cardId = current.card, c = cardById(cardId);
      items = c.subs.map(function (s, i) {
        return '<button class="subcard rise" style="--i:' + (i + 3) + '"' +
          " data-goto='" + JSON.stringify({ view: "leaf", card: cardId, sub: s.id }) + "'>" +
          '<span class="grow"><span class="sub-name">' + s.name + "</span><br>" +
          '<span class="sub-tag">' + s.tagline + "</span></span>" +
          '<span class="chev">›</span></button>';
      }).join("");
      text = "Not sure which fits? Read through these slowly — tap any one to explore it, no commitment.";
    }
    items += '<button class="tool-btn rise" style="--i:20" data-goto=\'' +
      JSON.stringify({ view: "phenomenology" }) +
      '\'><span>◈ <strong>Rather start by describing experience?</strong></span><span class="arr">›</span></button>';
    return topbar(true) +
      '<div class="unsure-head rise" style="--i:1"><div class="eyebrow">TAKE YOUR TIME</div>' +
      "<h1>" + title + "</h1>" +
      '<p class="lede">' + text + "</p></div>" +
      '<div class="section-label rise" style="--i:2">BROWSE EVERYTHING</div>' +
      items + bottomNav();
  }

  /* ---------- router ---------- */
  // deep links: index.html#/category/brain , index.html#/leaf/brain/illusion
  function hashFor(view) {
    if (view.view === "category") return "#/category/" + view.card;
    if (view.view === "leaf") return "#/leaf/" + view.card + "/" + view.sub;
    if (view.view === "phenomenology") return "#/phenomenology";
    return "#/";
  }
  function viewFromHash() {
    var m = /^#\/(category|leaf|phenomenology)(?:\/([^\/]+))?(?:\/([^\/]+))?/.exec(location.hash || "");
    if (!m) return null;
    if (m[1] === "category" && m[2] && cardById(m[2])) return { view: "category", card: m[2] };
    if (m[1] === "leaf" && m[2] && m[3] && cardById(m[2]) && subById(m[2], m[3]))
      return { view: "leaf", card: m[2], sub: m[3] };
    if (m[1] === "phenomenology") return { view: "phenomenology" };
    return null;
  }
  function territoryFor(view) {
    if (view.view === "category" || view.view === "leaf") return view.card;
    if (view.view === "phenomenology") return "phenomenology";
    if (view.view === "unsure") return territoryFor(current);
    return null;
  }
  function render(view) {
    var h;
    if (view.view === "landing") h = landingView();
    else if (view.view === "category") h = categoryView(view.card);
    else if (view.view === "leaf") h = leafView(view.card, view.sub);
    else if (view.view === "phenomenology") h = phenomenologyView();
    else h = unsureView();
    app.innerHTML = h;
    bind();
  }
  function navigate(view, back) {
    document.documentElement.classList.toggle("nav-back", !!back);
    if (view.view === "unsure") unsureReturn = current;
    setTerritory(territoryFor(view));
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
    if (view.view === "leaf") return { view: "category", card: view.card };
    if (view.view === "category" || view.view === "phenomenology") return { view: "landing" };
    if (view.view === "unsure") return unsureReturn;
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
    app.querySelectorAll('[data-nav="unsure"]').forEach(function (el) {
      el.addEventListener("click", function () { navigate({ view: "unsure" }, false); });
    });
  }

  var deepStart = viewFromHash();
  if (deepStart) { current = deepStart; setTerritory(territoryFor(current)); }
  render(current);
})();
