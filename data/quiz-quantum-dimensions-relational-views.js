/* The Everything is relations quiz: an axis quiz, like
   data/quiz-idealisms.js. Two physicists' relational pictures. Four axes
   tell them apart: whether time is real and basic, whether facts are
   relative to each observer, whether every event has an inside, and
   whether the laws of nature themselves evolve. Checked by
   tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "time", claim: "The passing of time is real and basic",
      yes: "the passing of time is real and basic", no: "the flow of time emerges from something timeless" },
    { key: "relative", claim: "Facts are relative to each observer",
      yes: "facts are relative to each observer", no: "there is one complete set of facts" },
    { key: "inside", claim: "Every event has an inner, felt side",
      yes: "every event has an inner side", no: "inner experience belongs to complex creatures" },
    { key: "laws", claim: "The laws of nature evolve",
      yes: "the laws of nature evolve over time", no: "the laws of nature are fixed" },
  ];

  var profiles = {
    "rovelli-s-relational-physics":    { time: -2, relative: 2, inside: -1 },
    "smolin-s-causal-theory-of-views": { time: 2, relative: -1, inside: 1, laws: 2 },
  };

  var questions = [
    {
      t: "Time really passes. The flow from past to future is one of the most basic facts about the universe.",
      why: "Yes means time is fundamental, not something we read into the world. No means the flow of time emerges from a deeper, timeless physics, partly from our own viewpoint.",
      axes: { time: 1 },
    },
    {
      t: "A fact can hold for one observer and not for another. There is no single, complete list of everything that has happened.",
      why: "Yes means facts are relative to each observer, the way speed is relative to who measures it. No means all the views fit together into one shared reality.",
      axes: { relative: 1 },
    },
    {
      t: "Every event in nature, not just in brains, has its own inner side: something it is like from its point of view.",
      why: "Yes means experience goes all the way down, in a simple form. No means inner experience belongs only to complex creatures like us.",
      axes: { inside: 1 },
    },
    {
      t: "The laws of nature are not fixed forever. They can change and evolve, as habits of the universe.",
      why: "Yes means even physics has a history. No means the laws are the same now as they always were.",
      axes: { laws: 1 },
    },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions-relational-views"] = {
    name: "Everything is relations",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside relational views.",
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
