/* Anonymous usage counts, sent to GoatCounter (https://www.goatcounter.com):
   no cookies, nothing personal, no third-party script. Dashboard:
   https://<CODE>.goatcounter.com.

   Page views use the page's ?path= with result payloads replaced by the
   quiz they came from ("/results/materialism/quiz"). Events (shown with the
   pages, flagged as events) are named so they sort into groups:
     quiz-start/<quiz>, quiz-resume/<quiz>, quiz-restart/<quiz>
     answer/<quiz>/q<N>/<yes|no|not-sure>   (the drop-off funnel: count of q1, q2, …)
     dont-get-it/<quiz>/q<N>                ("Don't get it" opened)
     quiz-left/<quiz>/at-q<N>-of-<n>        (left the page mid-quiz)
     quiz-finish/<quiz>
     result/<quiz>/top/<key>-<tier>         (top match and how strong)
     result/<quiz>/not-sure/<count>-of-<n>
     result/<quiz>/flag/<no-answers|no-match|all-same|contradictory>
     click/<what>/<where>                   (elements with data-count)
     out/loc/<page>                         (Read on LOC)
   <quiz> is the quiz's own path: "quiz" for the main quiz, else e.g.
   "materialism/higher-order/quiz".

   Not counted: localhost, headless browsers (the smoke test), and any
   device that has opened the site once with ?count=off (undo: ?count=on). */
(function () {
  "use strict";
  var CODE = "consciousness-map";
  var ENDPOINT = "https://" + CODE + ".goatcounter.com/count";
  var OFF_KEY = "cm_nocount";

  function store(fn) { try { return fn(window.localStorage); } catch (e) { return null; } }
  var flag = /[?&]count=(on|off)\b/.exec(location.search);
  if (flag) store(function (s) { if (flag[1] === "off") s.setItem(OFF_KEY, "1"); else s.removeItem(OFF_KEY); });

  function enabled() {
    var h = location.hostname;
    if (!CODE || !h || h === "localhost" || h === "127.0.0.1" || h === "[::1]") return false;
    if (navigator.webdriver) return false;
    return store(function (s) { return s.getItem(OFF_KEY); }) !== "1";
  }
  CM.counting = enabled;

  function send(path, title, isEvent) {
    if (!enabled()) return;
    var q = "p=" + encodeURIComponent(path) + "&t=" + encodeURIComponent(title || path) +
      "&s=" + encodeURIComponent(screen.width + "," + screen.height + "," + (window.devicePixelRatio || 1)) +
      "&rnd=" + Math.random().toString(36).slice(2);
    if (isEvent) q += "&e=true";
    else {
      var ref = document.referrer;   // only outside referrers; internal ones are noise
      if (ref && ref.indexOf(location.origin) !== 0) q += "&r=" + encodeURIComponent(ref);
    }
    var url = ENDPOINT + "?" + q;
    // sendBeacon survives the page unloading (quiz-left, outbound links)
    try { if (navigator.sendBeacon && navigator.sendBeacon(url)) return; } catch (e) { /* fall back */ }
    new Image().src = url;
  }

  /* a quiz's path: "quiz" or "<category>[/<school>]/quiz" */
  function quizPath(key) { return CM.quizHref(key).replace(/^\?path=/, ""); }

  function pagePath(route) {
    if (!route) return "/not-found";
    if (route.view === "results") {
      var r = CM.share.decode(route.payload);
      return "/" + (route.shared ? "share/" : "results/") + (r ? quizPath(r.quiz.key) : "invalid");
    }
    if (route.view === "home") return "/";
    if (route.view === "quiz") return "/" + quizPath(route.quiz);
    if (route.node) return "/" + route.node.path + (route.expand ? "/browse" : "");
    return "/" + route.view;
  }

  CM.count = {
    page: function (route) { send(pagePath(route), document.title, false); },
    event: function (name) { send(name, name, true); },
    quizPath: quizPath,
  };

  /* clicks on anything marked data-count="<what>", and outbound LOC links */
  document.addEventListener("click", function (ev) {
    var el = ev.target && ev.target.closest && ev.target.closest("[data-count], a[href]");
    if (!el) return;
    var where = pagePath(CM.route).slice(1) || "home";
    if (el.hasAttribute("data-count")) CM.count.event("click/" + el.getAttribute("data-count") + "/" + where);
    else if (/^https:\/\/loc\.closertotruth\.com\//.test(el.getAttribute("href"))) CM.count.event("out/loc/" + where);
  }, true);
})();
