/* The Everything is relations quiz: an axis quiz, like data/quiz-idealisms.js.
   TODO: say what the axes cover and how it was checked. */
(function () {
  "use strict";
  var axes = [
    // { key: "x", claim: "...", yes: "phrase for leaning toward it", no: "phrase for leaning away" },
  ];

  var profiles = {
    "rovelli-s-relational-physics": { },
    "smolin-s-causal-theory-of-views": { },
  };

  var questions = [
    // { t: "statement", why: "what Yes and No mean", axes: { x: 1 } },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions-relational-views"] = {
    name: "Everything is relations",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions.",
    areas: [
    { key: "rovelli-s-relational-physics", name: "Rovelli’s Relational Physics",
      tagline: "Nothing exists on its own — everything is relations.",
      url: "https://loc.closertotruth.com/theory/rovelli-s-relational-physics" },
    { key: "smolin-s-causal-theory-of-views", name: "Smolin’s Causal Theory of Views",
      tagline: "Every event has its own point of view.",
      url: "https://loc.closertotruth.com/theory/smolin-s-causal-theory-of-views" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
