/* The Mind settles quantum maybes quiz: an axis quiz, like
   data/quiz-idealisms.js. Four theories on which mind turns quantum
   possibilities into facts (two still under LOC review). Four axes tell
   them apart: attention holding brain states in place, living cells poised between quantum and classical,
   whether mind is at work wherever possibilities become facts, and whether
   minds outrun any algorithm. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "attention", claim: "Attention steers the brain by holding it in place",
      yes: "attention steers the brain by holding it steady", no: "mind’s role lies elsewhere than attention" },
    { key: "poised", claim: "Living cells are poised between quantum and classical",
      yes: "living cells hover between quantum and classical", no: "cells are ordinary classical machines" },
    { key: "everywhere", claim: "Something mind-like is at work wherever possibilities become facts",
      yes: "something mind-like is at work wherever maybes become facts", no: "only observers’ minds turn maybes into facts" },
    { key: "algorithm", claim: "Minds do what no algorithm can",
      yes: "minds do what no algorithm can", no: "minds could in principle be run as programs" },
  ];

  var profiles = {
    "kauffman-s-mind-mediating-possibles-to-actuals":            { poised: 2, everywhere: 1, algorithm: 2 },
    "stapp-s-collapsing-the-wave-function-via-asking-questions": { attention: 2, everywhere: -1, algorithm: 1 },
    // under LOC review
    "chalmers-and-mcqueen-s-quantum-collapse":                  { attention: -1, everywhere: 1 },
    "wigner-von-neumann-s-consciousness-collapse-experience-at-the-quantum-cut": { attention: -1, everywhere: -2 },
  };

  var questions = [
    {
      t: "When you hold your attention steady on something, your mind is keeping a pattern of brain activity in place that would otherwise slip away.",
      why: "Yes means effort of attention is how mind steers the brain, by choosing which question to put to nature and repeating it. No means mind’s part in settling quantum maybes is something other than attention.",
      axes: { attention: 1 },
    },
    {
      t: "Living cells hover on the edge between the quantum world of possibilities and the everyday classical world.",
      why: "Yes means life itself keeps one foot in quantum possibility, and that’s where mind gets its foothold. No means cells work as ordinary classical machines.",
      axes: { poised: 1 },
    },
    {
      t: "Wherever in nature a quantum possibility becomes a definite fact, something like a flicker of mind may be involved, not only in observers like us.",
      why: "Yes means turning maybes into facts could be mind-like all through the universe. No means it is specifically the minds of observers that do it.",
      axes: { everywhere: 1 },
    },
    {
      t: "What your mind does could never be fully captured by a computer program.",
      why: "Yes means minds are not machines following rules. No means a program could, in principle, do whatever a mind does.",
      axes: { algorithm: 1 },
    },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions-mind-and-collapse"] = {
    name: "Mind settles quantum maybes",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside minds settling quantum maybes.",
    areas: [
    { key: "kauffman-s-mind-mediating-possibles-to-actuals", name: "Kauffman’s Mind Mediating Possibles to Actuals",
      tagline: "Mind turns quantum maybes into definite realities.",
      url: "https://loc.closertotruth.com/theory/kauffman-s-mind-mediating-possibles-to-actuals" },
    { key: "stapp-s-collapsing-the-wave-function-via-asking-questions", name: "Stapp’s Collapsing the Wave Function via Asking “Questions”",
      tagline: "Your mind makes reality definite by questioning nature.",
      url: "https://loc.closertotruth.com/theory/stapp-s-collapsing-the-wave-function-via-asking-questions" },
    { key: "chalmers-and-mcqueen-s-quantum-collapse", name: "Chalmers and McQueen’s Quantum Collapse",
      tagline: "Integrated conscious states may be what makes quantum outcomes definite.",
      url: "https://loc.closertotruth.com/theory/chalmers-and-mcqueen-s-quantum-collapse", review: true },
    { key: "wigner-von-neumann-s-consciousness-collapse-experience-at-the-quantum-cut", name: "Wigner–von Neumann’s Consciousness-Collapse: Experience at the Quantum Cut",
      tagline: "An observer’s consciousness ends the quantum measurement chain.",
      url: "https://loc.closertotruth.com/theory/wigner-von-neumann-s-consciousness-collapse-experience-at-the-quantum-cut", review: true }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
