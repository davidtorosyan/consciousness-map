/* The Quantum & Dimensions quiz: an axis quiz, like data/quiz-idealisms.js.
   LOC's Quantum & Dimensions category, split into five schools (each a
   nested quiz). Six axes separate them: whether quantum effects inside
   brain cells make consciousness, whether minds turn quantum possibilities
   into facts, whether mind belongs to a hidden order or extra dimension,
   whether consciousness is part of the cosmos from the start, whether
   everything exists only in relation, and whether mind is more than
   matter. Profiles carry each school's justified rejections as well as its
   signature. Checked by tools/eval-quiz.js and a blind role-play of named
   proponents (tools/eval-thinkers-quantum-dimensions.json). */
(function () {
  "use strict";
  var axes = [
    { key: "brain", claim: "Quantum effects inside brain cells make consciousness",
      yes: "quantum effects inside neurons make consciousness", no: "the key to mind lies outside the brain’s quantum chemistry" },
    { key: "collapse", claim: "Minds turn quantum possibilities into facts",
      yes: "minds turn quantum possibilities into facts", no: "quantum outcomes happen with or without minds" },
    { key: "hidden", claim: "Mind belongs to a hidden order or extra dimension",
      yes: "mind belongs to a hidden level beneath the visible world", no: "the visible world is the only level there is" },
    { key: "cosmic", claim: "Consciousness was part of the universe long before brains",
      yes: "consciousness is part of the universe from the start", no: "consciousness arrived with brains" },
    { key: "relations", claim: "Things exist only in relation to other things",
      yes: "everything exists only in relation", no: "things have their own properties" },
    { key: "beyond", claim: "Mind is something more than physical matter",
      yes: "mind is more than physical matter", no: "mind is part of the physical world" },
  ];

  var profiles = {
    "quantum-dimensions-quantum-machinery":   { brain: 2, collapse: -1, hidden: -1, cosmic: -1, relations: -1, beyond: -1 },
    "quantum-dimensions-mind-and-collapse":   { brain: 1, collapse: 2, hidden: -1, beyond: 1 },
    "quantum-dimensions-hidden-orders":       { brain: -1, collapse: -1, hidden: 2, beyond: 1 },
    "quantum-dimensions-cosmic-consciousness": { brain: -1, collapse: -1, cosmic: 2, beyond: -1 },
    "quantum-dimensions-relational-views":    { brain: -1, collapse: -2, hidden: -1, relations: 2, beyond: -1 },
  };

  var questions = [
    {
      t: "Consciousness comes from quantum effects happening inside your brain cells.",
      why: "Yes means special quantum physics in neurons, such as entanglement or collapse, is what makes experience. No means the key to consciousness lies somewhere else.",
      axes: { brain: 1 },
    },
    {
      t: "A quantum possibility only becomes a definite fact when a mind gets involved.",
      why: "Yes means minds play a real part in turning quantum maybes into actual events. No means quantum events settle into facts whether or not any mind is around.",
      axes: { collapse: 1 },
    },
    {
      t: "Beneath the visible world lies a hidden order or extra dimension, and mind belongs to that deeper level.",
      why: "Yes means everyday space and time are not all there is, and consciousness is rooted below or beyond them. No means the visible world is the only level of reality.",
      axes: { hidden: 1 },
    },
    {
      t: "Consciousness was part of the universe long before there were brains.",
      why: "Yes means consciousness, or something like it, belongs to the cosmos from the start, and brains came to use it. No means it first appeared with brains or nervous systems.",
      axes: { cosmic: 1 },
    },
    {
      t: "Nothing has properties all by itself. Everything, including your mind, exists only in relation to other things.",
      why: "Yes means reality is a web of relationships, not a collection of separate things. No means things have properties of their own, whatever else is around.",
      axes: { relations: 1 },
    },
    {
      t: "Your mind is something more than physical matter, even if it works through matter.",
      why: "Yes means physics as we know it leaves something out about minds. No means minds are part of the physical world, however strange that world turns out to be.",
      axes: { beyond: 1 },
    },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions"] = {
    name: "Quantum & Dimensions",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside quantum physics and hidden dimensions.",
    areas: [
    { key: "quantum-dimensions-quantum-machinery", name: "Quantum machinery in the brain",
      tagline: "Experience comes from quantum effects in your neurons.",
      sub: "quantum-dimensions-quantum-machinery" },
    { key: "quantum-dimensions-mind-and-collapse", name: "Mind settles quantum maybes",
      tagline: "Your choices turn possibilities into facts.",
      sub: "quantum-dimensions-mind-and-collapse" },
    { key: "quantum-dimensions-hidden-orders", name: "Hidden orders and dimensions",
      tagline: "Mind belongs to a deeper level of reality.",
      sub: "quantum-dimensions-hidden-orders" },
    { key: "quantum-dimensions-cosmic-consciousness", name: "Consciousness belongs to the cosmos",
      tagline: "Mind isn't just a brain thing — it's the universe's business.",
      sub: "quantum-dimensions-cosmic-consciousness" },
    { key: "quantum-dimensions-relational-views", name: "Everything is relations",
      tagline: "Nothing exists on its own — only in relation.",
      sub: "quantum-dimensions-relational-views" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
