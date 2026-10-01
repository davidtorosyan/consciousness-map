/* Bookmarked theories (the localStorage list the theory pages write). */
(function () {
  "use strict";
  var esc = CM.esc, I = CM.icons;

  /* the theory a bookmark points at; null if it's no longer on the map */
  function nodeOf(f) {
    var id = String(f.id), i = id.indexOf(":");
    return CM.node("theory", i < 0 ? id : id.slice(i + 1));
  }

  function cardHtml(f, i) {
    var node = nodeOf(f), c = CM.node("category", f.catId);
    var meta = c ? '<div class="fav-meta"><span class="loc-dot sm" style="background:' + esc(c.color) +
      '" aria-hidden="true"></span><span>' + esc(c.name) + "</span></div>" : "";
    var loc = f.url
      ? '<a class="src-badge" href="' + esc(f.url) + '" target="_blank" rel="noopener" aria-label="Open on Landscape of Consciousness">' + I.info + "</a>"
      : "";
    var map = node
      ? '<a class="fav-link" style="margin-left:14px" href="' + CM.href(node.parent, "browse") + '">See on the map ›</a>'
      : "";
    var name = node
      ? '<a class="fav-name" href="' + CM.href(node) + '">' + esc(f.name) + "</a>"
      : '<div class="fav-name">' + esc(f.name) + "</div>";
    return '<div class="fav-card rise" style="--i:' + Math.min(i + 2, 9) + '">' +
      '<button class="bm-btn on" data-unbm="' + esc(f.id) + '" aria-label="Remove bookmark">' + I.bookmark + "</button>" +
      '<div class="grow">' + name +
      (f.tagline ? '<div class="fav-tag">' + esc(f.tagline) + "</div>" : "") +
      meta + "<div>" + loc + map + "</div></div></div>";
  }

  function render() {
    var favs = CM.favs.all();
    var h = CM.trail([{ label: "Home", href: "./" }, { label: "Saved" }]) +
      '<header class="hero rise" style="--i:1"><div class="kicker">SAVED</div><h1>Bookmarked theories</h1>';
    if (favs.length) {
      h += '<p class="desc">' + favs.length + (favs.length === 1 ? " theory" : " theories") + " saved.</p></header>" +
        favs.map(cardHtml).join("");
    } else {
      h += '<p class="desc">Nothing saved yet. Tap the bookmark on any theory and it will land here.</p></header>' +
        '<div class="d-actions"><a class="pill rise" style="--i:2" href="?path=quiz">' + I.search + "<span>Quiz</span></a></div>";
    }
    var app = document.getElementById("app");
    app.innerHTML = h;
    app.querySelectorAll("[data-unbm]").forEach(function (el) {
      el.addEventListener("click", function () {
        CM.favs.remove(el.getAttribute("data-unbm"));
        render();
      });
    });
  }

  CM.views.saved = function () {
    document.title = "Bookmarked theories";
    render();
  };
})();
