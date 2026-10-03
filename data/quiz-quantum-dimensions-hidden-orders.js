/* The Hidden orders and dimensions quiz: an axis quiz, like
   data/quiz-idealisms.js. Five theories that place mind in a deeper level
   of reality. Seven axes cover their divides: an enfolded whole beneath
   the visible world, literal extra dimensions, meaning that acts
   physically, whether the brain is where the deeper level matters, psychic
   phenomena, repeating layers, and whether quantum physics is the way in.
   Profiles carry each theory's justified rejections as well as its
   signature. Checked by tools/eval-quiz.js (no blind role-play yet). */
(function () {
  "use strict";
  var axes = [
    { key: "enfold", claim: "The visible world unfolds from a deeper, undivided whole",
      yes: "the visible world unfolds from a deeper, undivided whole", no: "the world is made of separate parts" },
    { key: "extra", claim: "Reality has extra dimensions, and mind lives in them",
      yes: "reality has extra dimensions where mind lives", no: "mind’s deeper level is an order, not extra dimensions" },
    { key: "meaning", claim: "Meaning can act physically",
      yes: "meaning can steer physical events", no: "meaning plays no part in physics" },
    { key: "brain", claim: "The deeper level matters for mind through the brain",
      yes: "the deeper level matters for mind through the brain", no: "mind reaches beyond the brain" },
    { key: "psi", claim: "Psychic phenomena are real",
      yes: "psychic phenomena are real", no: "psychic phenomena aren’t part of the picture" },
    { key: "layers", claim: "Reality is built in repeating layers",
      yes: "reality is built in repeating layers", no: "reality isn’t a stack of repeating layers" },
    { key: "quantum", claim: "Quantum physics is the way into the hidden level",
      yes: "quantum physics is the way into the hidden level", no: "the hidden level is found some other way" },
  ];

  var profiles = {
    "bohm-s-implicate-explicate-order":                             { enfold: 2, meaning: 1, brain: -1, layers: 1, quantum: 2 },
    "carr-s-quantum-theory-psi-mental-space":                       { extra: 2, brain: -1, psi: 2 },
    "pacheco-s-science-of-unity":                                   { enfold: 1, extra: 2, brain: -1, layers: 2 },
    "tozzi-s-multidimensional-brain":                               { extra: 1, brain: 2, quantum: -1 },
    "pylkkaenen-s-quantum-potential-energy-and-active-information": { enfold: 1, extra: -1, meaning: 2, brain: 1, quantum: 2 },
  };

  var questions = [
    {
      t: "The visible world of separate things unfolds from a deeper, undivided whole, and keeps folding back into it.",
      why: "Yes means separate objects are like ripples on one underlying movement. No means the world really is made of separate parts.",
      axes: { enfold: 1 },
    },
    {
      t: "Reality has more dimensions than the three of space plus time, and consciousness lives in those extra dimensions.",
      why: "Yes means mind occupies real dimensions that physics hasn’t yet mapped. No means mind’s deeper level, if there is one, isn’t a matter of extra dimensions.",
      axes: { extra: 1 },
    },
    {
      t: "Meaning can act physically: information that means something can steer what particles and brains do.",
      why: "Like a ship steered by radio signals, where what the signal says matters more than its strength. No means meaning has no direct part in physics.",
      axes: { meaning: 1 },
    },
    {
      t: "Whatever deeper level of reality there is, it matters for consciousness mainly through what goes on in the brain.",
      why: "Yes means the brain is where the deeper level shows up as mind. No means mind reaches beyond the brain, which works more like a receiver or a filter.",
      axes: { brain: 1 },
    },
    {
      t: "Psychic phenomena such as telepathy are real, and a hidden level of reality could explain them.",
      why: "Yes means minds can connect in ways ordinary physics can’t account for. No means such phenomena aren’t real, or aren’t part of the picture.",
      axes: { psi: 1 },
    },
    {
      t: "Reality is built in repeating layers, each echoing the pattern of the others, with matter and mind woven through all of them.",
      why: "Yes means a nested, fractal-like hierarchy of levels. No means reality isn’t organised as a stack of repeating layers.",
      axes: { layers: 1 },
    },
    {
      t: "Quantum physics is the best clue to the hidden level of reality where mind belongs.",
      why: "Yes means the strangeness of quantum theory points straight at that deeper level. No means the hidden level is better found some other way, such as through geometry or experience.",
      axes: { quantum: 1 },
    },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions-hidden-orders"] = {
    name: "Hidden orders and dimensions",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside hidden orders and dimensions.",
    areas: [
    { key: "bohm-s-implicate-explicate-order", name: "Bohm’s Implicate-Explicate Order",
      tagline: "A hidden order folds beneath the visible world.",
      url: "https://loc.closertotruth.com/theory/bohm-s-implicate-explicate-order" },
    { key: "carr-s-quantum-theory-psi-mental-space", name: "Carr’s Higher Dimensions and Mental Space",
      tagline: "Consciousness lives in a hidden higher dimension.",
      url: "https://loc.closertotruth.com/theory/carr-s-quantum-theory-psi-mental-space" },
    { key: "pacheco-s-science-of-unity", name: "Pacheco’s Science of Unity",
      tagline: "Matter and mind are woven together in repeating layers.",
      url: "https://loc.closertotruth.com/theory/pacheco-s-science-of-unity" },
    { key: "tozzi-s-multidimensional-brain", name: "Tozzi’s Multidimensional Brain",
      tagline: "The brain’s real work happens in higher dimensions.",
      url: "https://loc.closertotruth.com/theory/tozzi-s-multidimensional-brain" },
    { key: "pylkkaenen-s-quantum-potential-energy-and-active-information", name: "Pylkkänen’s Quantum Potential Energy and Active Information",
      tagline: "A deeper quantum order carries meaning in the brain.",
      url: "https://loc.closertotruth.com/theory/pylkkaenen-s-quantum-potential-energy-and-active-information" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
