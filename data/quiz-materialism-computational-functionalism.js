/* The Computational & Functionalism quiz: an axis quiz, like
   data/quiz-idealisms.js. 14 theories LOC lists under Materialism >
   Computational & Functionalism. All treat the mind as something the brain
   does; the 12 axes cover where they split: whether the material matters,
   a central stage vs a society of mindless parts, self-modelling, maths,
   ideas from fundamental physics, holographic wave patterns, mind and
   brain as mirror images, the edge of chaos, resonance, the brain's own
   history, process vs state, and consciousness as a way to stay stable
   in an uncertain world. Profiles
   carry each theory's justified rejections as well as its signature.
   Checked by tools/eval-quiz.js and a blind role-play of named proponents
   (tools/eval-thinkers-materialism-computational-functionalism.json). */
(function () {
  "use strict";
  var axes = [
    { key: "substrate", claim: "A computer running the right program would be conscious",
      yes: "the right program is enough", no: "the living material matters" },
    { key: "central", claim: "Consciousness needs a central stage the rest of the mind reports to",
      yes: "the mind has a central stage", no: "the mind is a crowd with no one in charge" },
    { key: "selfmodel", claim: "A system is conscious when it models itself in its world",
      yes: "consciousness is a self-model", no: "modelling itself isn’t what makes a system conscious" },
    { key: "math", claim: "Consciousness can be captured exactly in mathematics",
      yes: "consciousness is mathematical at heart", no: "consciousness is more than formulas" },
    { key: "physics", claim: "Explaining the mind needs ideas from fundamental physics",
      yes: "the mind needs deep physics", no: "ordinary brain science is enough" },
    { key: "hologram", claim: "The brain holds information spread out like a hologram",
      yes: "the brain stores things like a hologram", no: "the brain stores things in particular places" },
    { key: "mirror", claim: "Mind and brain mirror each other point for point",
      yes: "mind and brain are two mirrored sides of one pattern", no: "mind is simply what the brain does" },
    { key: "edge", claim: "Consciousness lives at the edge between order and chaos",
      yes: "consciousness needs the edge of chaos", no: "consciousness needs no such balance" },
    { key: "resonance", claim: "Awareness is expectation and input locking together",
      yes: "awareness is a resonance", no: "awareness is more than a match" },
    { key: "history", claim: "Each conscious moment folds in the brain’s recent past",
      yes: "each moment carries its own recent history", no: "each moment is a fresh state" },
    { key: "process", claim: "Consciousness is an ongoing process, not a thing or a state",
      yes: "consciousness is a process", no: "consciousness is a state or a thing" },
    { key: "survival", claim: "Consciousness evolved to keep a living system stable amid uncertainty",
      yes: "consciousness is for staying stable in an uncertain world", no: "consciousness is for thinking, not survival" },
  ];

  var profiles = {
    "awret-s-holographic-correspondence-theory-of-consciousness":       { math: 1, physics: 2, mirror: 2 },
    "bitar-s-architectural-theory-of-consciousness":                    { substrate: 1, central: 2, survival: 1 },
    "blums-conscious-turing-machine":                                   { substrate: 2, central: 1, selfmodel: 2, math: 1 },
    "complex-adaptive-systems-models":                                  { central: -1, edge: 1, process: 1, survival: 1 },
    "computational-theories":                                           { substrate: 2, math: 1, physics: -1, hologram: -1 },
    "critical-brain-hypothesis":                                        { physics: 1, edge: 2 },
    "grossberg-s-adaptive-resonance-theory":                            { substrate: 1, math: 1, physics: -1, resonance: 2 },
    "malinkovic-and-aru-s-biological-computationalism":                 { substrate: -2, math: -1, process: 1 },
    "markwell-s-process-identity-theory":                               { selfmodel: 1, physics: -1, process: 2 },
    "mathematical-theories":                                            { substrate: 1, math: 2, physics: 1 },
    "mikkilineni-and-michaels-emergent-optimization-process":           { substrate: 1, selfmodel: 1, survival: 2 },
    "minsky-s-society-of-mind":                                         { substrate: 2, central: -2, physics: -1 },
    "oreilly-shahs-state-space-theory-and-computational-dynamic-monism": { substrate: 1, math: 1, history: 2, process: 1 },
    "pribram-s-holonomic-brain-theory":                                 { physics: 1, hologram: 2, mirror: 1 },
  };

  var questions = [
    {
      t: "A computer running the right program would be conscious, whatever it’s made of.",
      why: "Yes means what matters is the computation, not the material doing it. No means the living, energy-burning material matters too.",
      axes: { substrate: 1 },
    },
    {
      t: "Consciousness needs a central stage or manager that the rest of the mind reports to.",
      why: "Yes means many processes feed one central place that oversees the whole. No means the mind is a crowd of simple parts with no one in charge.",
      axes: { central: 1 },
    },
    {
      t: "A system becomes conscious when it builds a model of itself within its model of the world.",
      why: "Yes means having a self-model is what makes the difference. No means self-modelling alone wouldn’t make a system conscious.",
      axes: { selfmodel: 1 },
    },
    {
      t: "Consciousness can be described exactly in mathematics, or might even be a mathematical structure.",
      why: "Yes means the right equations or formal model would capture it fully. No means something about consciousness goes beyond any formula.",
      axes: { math: 1 },
    },
    {
      t: "Explaining the mind will need ideas from fundamental physics, not just brain science.",
      why: "Ideas like quantum fields, holography or phase transitions. No means ordinary neuroscience and computing are enough.",
      axes: { physics: 1 },
    },
    {
      t: "The brain stores information spread across the whole of it in wave patterns, like a hologram.",
      why: "In a hologram every part holds a blurred copy of the whole image. No means memories and information sit in particular places.",
      axes: { hologram: 1 },
    },
    {
      t: "Mind and brain mirror each other point for point, like two sides of one pattern.",
      why: "Yes means every feature of experience has an exact counterpart in the physical, as an image and its encoding do. No means the mind is simply what the brain does, with no need for a mirror picture.",
      axes: { mirror: 1 },
    },
    {
      t: "Consciousness happens when the brain is balanced on the edge between order and chaos.",
      why: "Too orderly and the brain is rigid; too chaotic and it’s noise. Yes means consciousness lives right at that tipping point.",
      axes: { edge: 1 },
    },
    {
      t: "You become aware of something when the brain’s expectations and the incoming signals match and reinforce each other.",
      why: "Yes means awareness is that locking together, a kind of resonance. No means awareness takes more than a good match.",
      axes: { resonance: 1 },
    },
    {
      t: "Each conscious moment carries the brain’s recent past folded into it.",
      why: "Yes means experience is the brain replaying and building on its own last few moments, not a snapshot. No means each moment is a fresh state.",
      axes: { history: 1 },
    },
    {
      t: "Consciousness is something the brain is doing, an ongoing process, rather than a state it is in.",
      why: "Like weather is moving air, not a thing in the air. No means consciousness is better thought of as a state or a thing.",
      axes: { process: 1 },
    },
    {
      t: "Consciousness evolved to keep a living system stable in a world full of uncertainty.",
      why: "Yes means its job is regulation and survival when things are unpredictable. No means its main role is something else, like reasoning or knowing.",
      axes: { survival: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-computational-functionalism"] = {
    name: "Computational & Functionalism",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside computational and functionalist materialism.",
    areas: [
    { key: "awret-s-holographic-correspondence-theory-of-consciousness", name: "Awret’s Holographic Correspondence Theory of Consciousness",
      tagline: "Mind and matter mirror each other like a hologram.",
      url: "https://loc.closertotruth.com/theory/awret-s-holographic-correspondence-theory-of-consciousness" },
    { key: "bitar-s-architectural-theory-of-consciousness", name: "Bitar’s Architectural Theory of Consciousness",
      tagline: "The brain needs a fast worker and a slow boss.",
      url: "https://loc.closertotruth.com/theory/bitar-s-architectural-theory-of-consciousness" },
    { key: "blums-conscious-turing-machine", name: "Blums’ Conscious Turing Machine",
      tagline: "A thinking machine with a model of the world.",
      url: "https://loc.closertotruth.com/theory/blums-conscious-turing-machine" },
    { key: "complex-adaptive-systems-models", name: "Complex Adaptive Systems Models",
      tagline: "Minds emerge from systems that adapt.",
      url: "https://loc.closertotruth.com/theory/complex-adaptive-systems-models" },
    { key: "computational-theories", name: "Computational Theories",
      tagline: "The mind is an information processor.",
      url: "https://loc.closertotruth.com/theory/computational-theories" },
    { key: "critical-brain-hypothesis", name: "Critical Brain Hypothesis",
      tagline: "The brain works best at the edge of chaos.",
      url: "https://loc.closertotruth.com/theory/critical-brain-hypothesis" },
    { key: "grossberg-s-adaptive-resonance-theory", name: "Grossberg’s Adaptive Resonance Theory",
      tagline: "Awareness is the brain resonating with itself.",
      url: "https://loc.closertotruth.com/theory/grossberg-s-adaptive-resonance-theory" },
    { key: "malinkovic-and-aru-s-biological-computationalism", name: "Malinkovic and Aru’s Biological Computationalism",
      tagline: "Only living, energy-burning computation feels.",
      url: "https://loc.closertotruth.com/theory/malinkovic-and-aru-s-biological-computationalism" },
    { key: "markwell-s-process-identity-theory", name: "Markwell’s Process Identity Theory",
      tagline: "Consciousness is what the brain is doing, like weather.",
      url: "https://loc.closertotruth.com/theory/markwell-s-process-identity-theory" },
    { key: "mathematical-theories", name: "Mathematical Theories",
      tagline: "Consciousness might be mathematics itself.",
      url: "https://loc.closertotruth.com/theory/mathematical-theories" },
    { key: "mikkilineni-and-michaels-emergent-optimization-process", name: "Mikkilineni and Michaels’s Emergent Optimization Process",
      tagline: "Minds evolved to manage uncertainty.",
      url: "https://loc.closertotruth.com/theory/mikkilineni-and-michaels-emergent-optimization-process" },
    { key: "minsky-s-society-of-mind", name: "Minsky’s Society of Mind",
      tagline: "Your mind is a society of tiny mindless workers.",
      url: "https://loc.closertotruth.com/theory/minsky-s-society-of-mind" },
    { key: "oreilly-shahs-state-space-theory-and-computational-dynamic-monism", name: "O'Reilly-Shah's State Space Theory and Computational Dynamic Monism",
      tagline: "Consciousness is the brain replaying its own history.",
      url: "https://loc.closertotruth.com/theory/oreilly-shahs-state-space-theory-and-computational-dynamic-monism" },
    { key: "pribram-s-holonomic-brain-theory", name: "Pribram’s Holonomic Brain Theory",
      tagline: "The brain stores memory like a hologram.",
      url: "https://loc.closertotruth.com/theory/pribram-s-holonomic-brain-theory" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
