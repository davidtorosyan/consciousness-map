/* The Consciousness belongs to the cosmos quiz: an axis quiz, like data/quiz-idealisms.js.
   TODO: say what the axes cover and how it was checked. */
(function () {
  "use strict";
  var axes = [
    // { key: "x", claim: "...", yes: "phrase for leaning toward it", no: "phrase for leaning away" },
  ];

  var profiles = {
    "hameroff-s-consciousness-came-before-life": { },
    "keppler-s-zero-point-field": { },
    "king-s-symbiotic-existential-cosmology": { },
    "torday-s-cellular-and-cosmic-consciousness": { },
    "wolfram-s-consciousness-in-the-ruliad": { },
  };

  var questions = [
    // { t: "statement", why: "what Yes and No mean", axes: { x: 1 } },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions-cosmic-consciousness"] = {
    name: "Consciousness belongs to the cosmos",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions.",
    areas: [
    { key: "hameroff-s-consciousness-came-before-life", name: "Hameroff’s Consciousness Came Before Life",
      tagline: "Consciousness was here first; it helped bring about life.",
      url: "https://loc.closertotruth.com/theory/hameroff-s-consciousness-came-before-life" },
    { key: "keppler-s-zero-point-field", name: "Keppler’s Zero-Point Field",
      tagline: "The brain tunes into a background field of the universe.",
      url: "https://loc.closertotruth.com/theory/keppler-s-zero-point-field" },
    { key: "king-s-symbiotic-existential-cosmology", name: "King’s Symbiotic Existential Cosmology",
      tagline: "Life, mind, and cosmos grew up together.",
      url: "https://loc.closertotruth.com/theory/king-s-symbiotic-existential-cosmology" },
    { key: "torday-s-cellular-and-cosmic-consciousness", name: "Torday’s Cellular and Cosmic Consciousness",
      tagline: "Consciousness starts in the cell itself.",
      url: "https://loc.closertotruth.com/theory/torday-s-cellular-and-cosmic-consciousness" },
    { key: "wolfram-s-consciousness-in-the-ruliad", name: "Wolfram’s Consciousness in the Ruliad",
      tagline: "Consciousness is a mind sampling all possible computations.",
      url: "https://loc.closertotruth.com/theory/wolfram-s-consciousness-in-the-ruliad" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
