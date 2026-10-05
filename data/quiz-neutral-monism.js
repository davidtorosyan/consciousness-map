/* The Neutral Monism quiz: an axis quiz, like data/quiz-idealisms.js.
   17 theories LOC lists under Neutral Monism, from dual-aspect views to
   panpsychist "real materialism", a physicist's state of matter, theistic
   cosmologies, Spinoza, Leibniz and Whitehead. LOC lists them flat. Seven are
   still under review at LOC; two of those are grouped with a verified view
   the quiz can't tell them from (James with Velmans, Pauli with
   Atmanspacher). LOC's two grab-bag "Additional Theories" entries are left
   out. 11 axes cover the field's real
   divides: two sides of one deeper reality vs everything physical, matter's
   hidden inner nature, experience everywhere vs only in some arrangements,
   exact mind-brain laws, new physics, quantum physics, God, a universe that
   exists because it is good, cosmic evolution toward mind, and the seen
   world as itself experience. Profiles carry each theory's justified
   rejections as well as its signature. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "aspects", claim: "Mind and matter are two sides of one deeper reality",
      yes: "mind and matter are two sides of one deeper reality", no: "one side is the more basic" },
    { key: "physical", claim: "Everything, experience included, is physical",
      yes: "everything, experience included, is physical", no: "reality is more than the physical" },
    { key: "inner", claim: "Physics shows only matter’s structure; inside, it is experience-like",
      yes: "matter’s hidden inner nature is experience-like", no: "physics can tell us all that matter is" },
    { key: "everywhere", claim: "Some form of experience is in all matter",
      yes: "some form of experience is in all matter", no: "only some arrangements of matter experience" },
    { key: "laws", claim: "Exact laws link brain states to experiences",
      yes: "exact laws link brain and experience", no: "the mind follows no strict laws" },
    { key: "newphysics", claim: "Explaining consciousness needs a new physics",
      yes: "consciousness needs a new physics", no: "the physics we have is enough" },
    { key: "quantum", claim: "Quantum physics is key to how mind and matter connect",
      yes: "quantum physics is key to mind and matter", no: "quantum physics is beside the point" },
    { key: "god", claim: "A personal God created the universe",
      yes: "a personal God created the universe", no: "the universe has no personal creator" },
    { key: "good", claim: "The universe exists because it is good that it should",
      yes: "the universe exists because its existence is good", no: "goodness doesn’t explain why anything exists" },
    { key: "evolve", claim: "The universe is evolving toward greater consciousness",
      yes: "the universe is heading toward greater consciousness", no: "evolution has no direction" },
    { key: "outthere", claim: "The world you see around you is part of your experience",
      yes: "the world you see is itself experience", no: "experience is a picture inside the head" },
  ];

  var profiles = {
    "atmanspacher-s-dual-aspect-monism":                { aspects: 2, physical: -1, newphysics: 1, quantum: 2 },
    "davidson-s-anomalous-monism":                      { physical: 2, laws: -2, inner: -1, everywhere: -1, newphysics: -1 },
    "leslie-s-consciousness-inside-an-infinite-mind":   { aspects: -1, physical: -2, inner: 1, god: -1, good: 2 },
    "polkinghorne-s-dual-aspect-monism":                { aspects: 2, physical: -1, everywhere: -1, god: 2, good: 1 },
    "ramachandran-s-new-physics-and-neuroscience":      { physical: 1, everywhere: -1, laws: 1, newphysics: 2, outthere: -1, god: -1 },
    "russellian-monism":                                { aspects: 1, inner: 2, everywhere: 1, newphysics: -1, outthere: -1 },
    "strawson-s-realistic-monism-and-real-materialism": { aspects: -1, physical: 2, inner: 2, everywhere: 2, newphysics: -1, god: -1 },
    "tegmark-s-state-of-matter":                        { aspects: -1, physical: 2, inner: -2, everywhere: -2, laws: 2, newphysics: -1, quantum: -2, god: -1 },
    "teilhard-de-chardin-s-evolving-consciousness":     { aspects: 1, physical: -1, inner: 1, everywhere: 2, god: 1, evolve: 2 },
    "velmans-s-reflexive-monism":                       { aspects: 2, physical: -1, everywhere: 1, outthere: 2 },
    "leibnizs-monads":                                  { aspects: -1, physical: -2, everywhere: 2, god: 2, good: 2, outthere: -1 },
    "spinoza-s-one-reality-embodied-mind-and-graded-consciousness": { aspects: 2, physical: -1, everywhere: 2, laws: 1, god: -2, good: -2, evolve: -1 },
    "whiteheads-experience-is-fundamental-consciousness-is-not": { aspects: 1, physical: -1, inner: 1, everywhere: 1, god: -1 },
    "pereira-s-three-aspect-monism":                    { aspects: 1, everywhere: -1, newphysics: -1 },
    "qri-s-state-space-qualia-formalism-valence-realism": { physical: 1, laws: 2 },
  };

  var questions = [
    {
      t: "Mind and matter are two sides of one deeper reality, and neither is more basic than the other.",
      why: "Like the two faces of a coin. No means one side really is the more basic: everything is at bottom physical, or at bottom mental.",
      axes: { aspects: 1 },
    },
    {
      t: "Everything that exists is physical, and that includes your experiences.",
      why: "Yes means experience is part of the physical world, however we end up describing it. No means reality includes something beyond the physical.",
      axes: { physical: 1 },
    },
    {
      t: "Physics only tells us how matter behaves. What matter is in itself, on the inside, is something like experience.",
      why: "Yes means science describes structure and relations but is silent on matter’s inner nature, which may be experiential. No means physics can in principle tell us everything matter is.",
      axes: { inner: 1 },
    },
    {
      t: "Some simple form of experience is present in all matter, even in single particles.",
      why: "Yes means experience goes all the way down. No means only certain arrangements of matter, such as working brains, have any experience at all.",
      axes: { everywhere: 1 },
    },
    {
      t: "Science can find exact laws that say which brain states go with which experiences.",
      why: "Yes means the link between brain and mind is lawful and could be written down precisely. No means thoughts and feelings follow no strict laws, even if each one is a brain event.",
      axes: { laws: 1 },
    },
    {
      t: "To explain consciousness, we will need a new kind of physics, not just more brain research.",
      why: "Yes means something basic is missing from today’s physics. No means the physics we have is enough; what’s missing lies elsewhere.",
      axes: { newphysics: 1 },
    },
    {
      t: "Quantum physics is key to understanding how mind and matter connect.",
      why: "Some think the strange features of quantum physics point to where mind and matter meet. Others think the brain is too warm and noisy for quantum effects to matter.",
      axes: { quantum: 1 },
    },
    {
      t: "The universe was created by a personal God.",
      why: "Yes means a God who knows and wills brought the world into being. No means there is no personal creator, whether or not reality has some other deep source.",
      axes: { god: 1 },
    },
    {
      t: "The universe exists because it is good that it should exist.",
      why: "Yes means goodness itself, rather than any prior cause, explains why there is something rather than nothing. No means value can’t explain why anything exists.",
      axes: { good: 1 },
    },
    {
      t: "The universe is evolving in a direction: toward ever greater consciousness.",
      why: "Yes means the rise of mind is where cosmic history is heading, not a lucky accident. No means evolution has no built-in direction.",
      axes: { evolve: 1 },
    },
    {
      t: "The room you see around you is itself part of your experience, not a picture of it inside your head.",
      why: "Yes means the world as it appears to you, out there in space, is your experience of it. No means experience happens inside the head, and the world out there is something else.",
      axes: { outthere: 1 },
    },
  ];

  window.QUIZ_DATA.drill["neutral-monism"] = {
    name: "Neutral Monism",
    color: "#6A22D1",
    categoryId: "neutral-monism",
    kicker: "A QUIZ · NEUTRAL MONISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside neutral monism.",
    areas: [
    { key: "atmanspacher-s-dual-aspect-monism", name: "Atmanspacher’s Dual-Aspect Monism",
      tagline: "Mind and matter are two faces of one underlying reality.",
      url: "https://loc.closertotruth.com/theory/atmanspacher-s-dual-aspect-monism" },
    { key: "davidson-s-anomalous-monism", name: "Davidson’s Anomalous Monism",
      tagline: "Thoughts are brain events, but psychology won't reduce.",
      url: "https://loc.closertotruth.com/theory/davidson-s-anomalous-monism" },
    { key: "leslie-s-consciousness-inside-an-infinite-mind", name: "Leslie’s Consciousness Inside an Infinite Mind",
      tagline: "The universe sits inside an infinite mind.",
      url: "https://loc.closertotruth.com/theory/leslie-s-consciousness-inside-an-infinite-mind" },
    { key: "polkinghorne-s-dual-aspect-monism", name: "Polkinghorne’s Dual-Aspect Monism",
      tagline: "Mind and body form one psychosomatic unity.",
      url: "https://loc.closertotruth.com/theory/polkinghorne-s-dual-aspect-monism" },
    { key: "ramachandran-s-new-physics-and-neuroscience", name: "Ramachandran’s New Physics and Neuroscience",
      tagline: "Consciousness needs a new physics, not just new data.",
      url: "https://loc.closertotruth.com/theory/ramachandran-s-new-physics-and-neuroscience" },
    { key: "russellian-monism", name: "Russellian Monism",
      tagline: "Physics maps structure. Inside, matter is experience-like.",
      url: "https://loc.closertotruth.com/theory/russellian-monism" },
    { key: "strawson-s-realistic-monism-and-real-materialism", name: "Strawson’s Realistic Monism and Real Materialism",
      tagline: "Honest materialism counts experience as fully physical.",
      url: "https://loc.closertotruth.com/theory/strawson-s-realistic-monism-and-real-materialism" },
    { key: "tegmark-s-state-of-matter", name: "Tegmark’s State of Matter",
      tagline: "Consciousness is a state of matter, like solid or liquid.",
      url: "https://loc.closertotruth.com/theory/tegmark-s-state-of-matter" },
    { key: "teilhard-de-chardin-s-evolving-consciousness", name: "Teilhard de Chardin’s Evolving Consciousness",
      tagline: "The universe is evolving toward greater consciousness.",
      url: "https://loc.closertotruth.com/theory/teilhard-de-chardin-s-evolving-consciousness" },
    { key: "velmans-s-reflexive-monism", name: "Velmans’s Reflexive Monism",
      tagline: "Mind and world are two views of one reality.",
      url: "https://loc.closertotruth.com/theory/velmans-s-reflexive-monism" },
    { key: "leibnizs-monads", name: "Leibniz's Monads",
      tagline: "All reality is perceiving souls, kept in step by God.",
      url: "https://loc.closertotruth.com/theory/leibnizs-monads", review: true },
    { key: "spinoza-s-one-reality-embodied-mind-and-graded-consciousness", name: "Spinoza\u2019s One Reality: Embodied Mind and Graded Consciousness",
      tagline: "Mind and body are one thing, seen as thought or as extension.",
      url: "https://loc.closertotruth.com/theory/spinoza-s-one-reality-embodied-mind-and-graded-consciousness", review: true },
    { key: "whiteheads-experience-is-fundamental-consciousness-is-not", name: "Whitehead's Experience is Fundamental, Consciousness is Not",
      tagline: "Feeling goes all the way down; awareness is rare and late.",
      url: "https://loc.closertotruth.com/theory/whiteheads-experience-is-fundamental-consciousness-is-not", review: true },
    { key: "pereira-s-three-aspect-monism", name: "Pereira\u2019s Triple-Aspect Monism",
      tagline: "Brain activity has three sides: bodily, unconscious and conscious.",
      url: "https://loc.closertotruth.com/theory/pereira-s-three-aspect-monism", review: true },
    { key: "qri-s-state-space-qualia-formalism-valence-realism", name: "QRI\u2019s State-Space, Qualia Formalism, Valence Realism",
      tagline: "Experience has exact mathematical shape, and its pleasantness is real.",
      url: "https://loc.closertotruth.com/theory/qri-s-state-space-qualia-formalism-valence-realism", review: true },
    { key: "james-s-radical-empiricism-of-monistic-pure-experience", name: "James\u2019s Radical Empiricism of Monistic Pure Experience",
      tagline: "Mind and matter are two arrangements of one pure experience.",
      url: "https://loc.closertotruth.com/theory/james-s-radical-empiricism-of-monistic-pure-experience", group: "velmans-s-reflexive-monism", review: true },
    { key: "pauli-s-one-world-two-aspects-psychophysical-complementarity", name: "Pauli\u2019s One World, Two Aspects: Psychophysical Complementarity",
      tagline: "Psyche and matter are complementary sides of one deeper order.",
      url: "https://loc.closertotruth.com/theory/pauli-s-one-world-two-aspects-psychophysical-complementarity", group: "atmanspacher-s-dual-aspect-monism", review: true }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
