/* The Consciousness belongs to the cosmos quiz: an axis quiz, like
   data/quiz-idealisms.js. Five theories that tie consciousness to the
   universe at large. Seven axes cover their divides: whether consciousness
   came before life, whether it starts in living cells, whether it is a
   kind of computation, whether the brain tunes into a field filling space,
   whether quantum physics is the meeting point, whether choices ride on
   undetermined quantum events, and whether each mind samples a narrow
   slice of a vaster reality. Profiles carry each theory's justified
   rejections as well as its signature. Checked by tools/eval-quiz.js (no blind role-play yet). */
(function () {
  "use strict";
  var axes = [
    { key: "before", claim: "Consciousness came before life",
      yes: "consciousness came before life", no: "consciousness arrived with life" },
    { key: "cell", claim: "Consciousness starts in living cells",
      yes: "consciousness starts in living cells", no: "consciousness doesn’t need living cells" },
    { key: "computation", claim: "Consciousness is a kind of computation",
      yes: "consciousness is a kind of computation", no: "consciousness is more than computation" },
    { key: "field", claim: "The brain tunes into a field that fills space",
      yes: "the brain tunes into a field that fills all of space", no: "consciousness is generated where it happens" },
    { key: "quantum", claim: "Quantum physics is where mind and cosmos meet",
      yes: "quantum physics is where mind and cosmos meet", no: "quantum physics isn’t the deep level" },
    { key: "choice", claim: "Choices ride on undetermined quantum events",
      yes: "your choices ride on undetermined quantum events", no: "your choices follow from the rules, however complex" },
    { key: "slice", claim: "Each mind samples a narrow slice of a vaster reality",
      yes: "each mind samples a narrow slice of a vaster reality", no: "minds meet reality as it is" },
  ];

  var profiles = {
    "hameroff-s-consciousness-came-before-life":    { before: 2, cell: -1, computation: -2, quantum: 2, choice: 1 },
    "keppler-s-zero-point-field":                   { before: 1, cell: -1, computation: -1, field: 2, quantum: 2 },
    "king-s-symbiotic-existential-cosmology":       { cell: 2, computation: -1, quantum: 1, choice: 2 },
    "torday-s-cellular-and-cosmic-consciousness":   { before: -1, cell: 2, field: -1, quantum: 1 },
    "wolfram-s-consciousness-in-the-ruliad":        { before: -1, cell: -1, computation: 2, field: -1, quantum: -1, choice: -1, slice: 2 },
  };

  var questions = [
    {
      t: "Consciousness, in some simple form, was in the universe before life, and helped bring life about.",
      why: "Yes means consciousness was here first and life learned to use it. No means it first appeared with living things.",
      axes: { before: 1 },
    },
    {
      t: "Consciousness starts in living cells. A single cell already has the first glimmer of it.",
      why: "Yes means being alive and being aware begin together, at the level of the cell. No means consciousness doesn’t depend on cells, either because it’s older than life or because other systems could have it.",
      axes: { cell: 1 },
    },
    {
      t: "Consciousness is a kind of computation: what a system that processes information is like from the inside.",
      why: "Yes means computing in the right way is what makes a mind. No means consciousness is something more than any computation.",
      axes: { computation: 1 },
    },
    {
      t: "Your brain tunes into a background field that fills all of space, the way a radio locks onto a station.",
      why: "Yes means the brain doesn’t make consciousness from scratch but resonates with something already everywhere. No means consciousness is produced where it happens.",
      axes: { field: 1 },
    },
    {
      t: "Quantum physics is where consciousness and the physical universe meet.",
      why: "Yes means the quantum level is where mind connects to the cosmos. No means quantum physics isn’t the deepest level, or isn’t where mind comes in.",
      axes: { quantum: 1 },
    },
    {
      t: "Your free choices are real causes, riding on quantum events that physics leaves undetermined.",
      why: "Yes means the openness of quantum events gives room for genuine choice. No means your choices follow from the underlying rules, however complex and unpredictable they look.",
      axes: { choice: 1 },
    },
    {
      t: "Any mind experiences only a narrow slice of a far vaster reality, and its own limits shape what that slice looks like.",
      why: "Yes means even the laws of physics we see reflect the kind of observers we are. No means minds meet reality more or less as it is.",
      axes: { slice: 1 },
    },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions-cosmic-consciousness"] = {
    name: "Consciousness belongs to the cosmos",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside cosmic consciousness.",
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
