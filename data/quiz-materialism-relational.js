/* The Relational quiz: an axis quiz, like data/quiz-idealisms.js.
   13 theories LOC lists under Materialism / Relational, five of them still
   under review at LOC (Campbell, Fish, Harman, Hofstadter, Manzotti); Fish
   shares a result with Campbell, since both make experience a direct
   relation to the things themselves. Each puts
   consciousness in relations (mind to tools and world, experience to
   experience, organism to its parts, observer to frame) rather than in a
   single place or stuff. The axes cover where they actually split: whether
   the mind extends past the body, whether only living things can be
   conscious, whether experiences are defined by their relations, whether
   "is it experience?" depends on a point of view, whether the world we see
   is an interface, whether experience needs a subject, and whether physics
   and neuroscience leave nothing over. Profiles carry each theory's
   justified rejections as well as its signature. Checked by tools/eval-quiz.js. Blind role-play of its proponents:
   tools/eval-thinkers-materialism-relational.json. */
(function () {
  "use strict";
  var axes = [
    { key: "extend", claim: "The mind can extend beyond the body",
      yes: "the mind can reach out into tools and world", no: "the mind stays within the organism" },
    { key: "life", claim: "Only living things can be conscious",
      yes: "consciousness belongs to living things", no: "the right organization is enough, alive or not" },
    { key: "structure", claim: "An experience is defined by its relations to other experiences",
      yes: "experiences are defined by their relations", no: "each experience has a character of its own" },
    { key: "frame", claim: "Whether there is experience depends on the point of view",
      yes: "experience depends on the point of view", no: "there is one viewpoint-free account of what’s there" },
    { key: "interface", claim: "The world you experience is an interface your mind builds",
      yes: "the world you see is an interface", no: "experience mirrors the world itself" },
    { key: "subject", claim: "Experience needs a subject who has it",
      yes: "experience always belongs to a subject", no: "experience can happen without a unified subject" },
    { key: "reduce", claim: "Physics and neuroscience can explain experience completely",
      yes: "physics and neuroscience leave nothing over", no: "the mind needs something beyond physical explanation" },
  ];

  var profiles = {
    "a-clark-s-extended-mind":                              { extend: 2, life: -2 },
    "cooke-s-nondual-naturalism-living-mirror-theory":      { extend: 1, life: 2, structure: 1, interface: 1, subject: -1, reduce: 1 },
    "jaworski-s-hylomorphism":                              { extend: -1, life: 1, subject: 2, reduce: -2 },
    "kojdi-s-interface-ontology-of-consciousness":          { interface: 2, frame: 1, reduce: -1 },
    "lahav-s-relativistic-theory":                          { extend: -1, life: -1, frame: 2, reduce: 1 },
    "loorits-s-structural-realism":                         { extend: -1, life: -1, structure: 2, frame: -1, reduce: 2 },
    "mitchell-and-jenning-s-consciousness-needs-a-subject": { extend: -1, life: 2, subject: 2 },
    "tsuchiya-s-relational-approach-to-consciousness":      { structure: 2 },
    "campbell-s-attention-empowered-relationalism":         { interface: -2 },
    "harman-s-object-oriented-ontology":                    { interface: 1, reduce: -1 },
    "hofstadter-s-strange-loops":                           { extend: 1, life: -1, subject: 1 },
    "manzotti-s-mind-object-identity-spread-mind":          { extend: 2, interface: -2, reduce: 2 },
  };

  var questions = [
    {
      t: "Your mind can extend beyond your body, into your notebook, your phone and the world around you.",
      why: "Yes means a tool that does a mind’s job can be part of your mind. No means the mind stays inside the organism, however much it leans on tools.",
      axes: { extend: 1 },
    },
    {
      t: "Only living things can be conscious.",
      why: "Yes means consciousness belongs to life: beings that keep themselves going and have something at stake. No means the right organization could be conscious even if it isn’t alive, like a machine.",
      axes: { life: 1 },
    },
    {
      t: "What an experience is like is fixed by how it relates to your other experiences: what it resembles and what it contrasts with.",
      why: "Yes means red is defined by its place among colours and other experiences, like a point on a map. No means each experience has a character of its own, apart from its relations.",
      axes: { structure: 1 },
    },
    {
      t: "From the inside a brain process is a feeling; from the outside it is neurons firing. Neither view is more correct than the other.",
      why: "Yes means “is there experience here?” has no answer apart from a point of view, the way motion has none apart from a frame of reference. No means there is one correct, viewpoint-free account of what’s there.",
      axes: { frame: 1 },
    },
    {
      t: "The world you experience is an interface your mind builds, not the world as it is in itself.",
      why: "Yes means what you see is a usable simplification of reality, like icons on a screen. No means experience reflects the world itself, even if only partly.",
      axes: { interface: 1 },
    },
    {
      t: "There can be no experience without a subject: a single being who has it and to whom it matters.",
      why: "Yes means experience always belongs to someone with a point of view that lasts through time. No means experiences can happen without a unified someone who has them.",
      axes: { subject: 1 },
    },
    {
      t: "Once physics and neuroscience have described what the brain and body do, nothing about the mind will be left to explain.",
      why: "Yes means a full physical story leaves no residue. No means something more, such as the organization of the whole being, has to be counted as basic too.",
      axes: { reduce: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-relational"] = {
    name: "Relational",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside relational materialism.",
    areas: [
    { key: "a-clark-s-extended-mind", name: "A. Clark and Chalmers’s Extended Mind",
      tagline: "Your mind extends into your tools.",
      url: "https://loc.closertotruth.com/theory/a-clark-s-extended-mind" },
    { key: "cooke-s-nondual-naturalism-living-mirror-theory", name: "Cooke’s Nondual Naturalism and Living Mirror Theory",
      tagline: "Consciousness is life mirroring reality.",
      url: "https://loc.closertotruth.com/theory/cooke-s-nondual-naturalism-living-mirror-theory" },
    { key: "jaworski-s-hylomorphism", name: "Jaworski’s Hylomorphism",
      tagline: "Mind is the form of an organized body.",
      url: "https://loc.closertotruth.com/theory/jaworski-s-hylomorphism" },
    { key: "kojdi-s-interface-ontology-of-consciousness", name: "Kojdić’s Interface Ontology of Consciousness",
      tagline: "The world you see is an interface your mind builds.",
      url: "https://loc.closertotruth.com/theory/kojdi-s-interface-ontology-of-consciousness" },
    { key: "lahav-s-relativistic-theory", name: "Lahav’s Relativistic Theory",
      tagline: "Consciousness depends on your point of view.",
      url: "https://loc.closertotruth.com/theory/lahav-s-relativistic-theory" },
    { key: "loorits-s-structural-realism", name: "Loorits’s Structural Realism",
      tagline: "Experiences are patterns, nothing spooky.",
      url: "https://loc.closertotruth.com/theory/loorits-s-structural-realism" },
    { key: "mitchell-and-jenning-s-consciousness-needs-a-subject", name: "Mitchell and Jennings’s Consciousness Needs a Subject",
      tagline: "No subject, no consciousness.",
      url: "https://loc.closertotruth.com/theory/mitchell-and-jenning-s-consciousness-needs-a-subject" },
    { key: "tsuchiya-s-relational-approach-to-consciousness", name: "Tsuchiya’s Relational Approach to Qualia",
      tagline: "Qualia are defined by how they relate.",
      url: "https://loc.closertotruth.com/theory/tsuchiya-s-relational-approach-to-consciousness" },
    { key: "campbell-s-attention-empowered-relationalism", name: "J. Campbell’s Attention-Empowered Relationalism",
      tagline: "Consciously attending to a thing lets you think about it.",
      url: "https://loc.closertotruth.com/theory/campbell-s-attention-empowered-relationalism", review: true },
    { key: "fish-s-naive-realism", name: "Fish’s Naïve Realism",
      tagline: "Experience is a direct relation to real things themselves.",
      url: "https://loc.closertotruth.com/theory/fish-s-naive-realism", review: true,
      group: "campbell-s-attention-empowered-relationalism" },
    { key: "harman-s-object-oriented-ontology", name: "Harman’s Object-Oriented Ontology",
      tagline: "Consciousness is just one way objects relate to objects.",
      url: "https://loc.closertotruth.com/theory/harman-s-object-oriented-ontology", review: true },
    { key: "hofstadter-s-strange-loops", name: "Hofstadter’s Strange Loops",
      tagline: "The “I” is a loop of symbols perceiving itself.",
      url: "https://loc.closertotruth.com/theory/hofstadter-s-strange-loops", review: true },
    { key: "manzotti-s-mind-object-identity-spread-mind", name: "Manzotti’s Mind-Object Identity (\"Spread Mind\")",
      tagline: "Your experience of an object is the object itself.",
      url: "https://loc.closertotruth.com/theory/manzotti-s-mind-object-identity-spread-mind", review: true }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
