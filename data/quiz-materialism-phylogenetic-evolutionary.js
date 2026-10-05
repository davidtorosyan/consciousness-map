/* The Phylogenetic/Evolutionary quiz: an axis quiz, like data/quiz-idealisms.js.
   16 theories LOC lists under Materialism's Phylogenetic/Evolutionary
   theories, four of them still under review at LOC (Birch, Ginsburg and
   Jablonka, Godfrey-Smith, McGinn). Birch shares a result with Andrews:
   the quiz can't tell their comparative, widely-spread views apart.
   LOC's "Additional Theories" grab-bag is left out. They all agree
   evolution made consciousness; 11 axes cover where they part ways: how far down the tree of life it goes (cells,
   simple animals), whether it is a late arrival needing language or
   self-reflection, whether experience itself does anything, whether it
   evolved for sharing with others, whether evolution leaves a mystery,
   feelings first vs inner images first, a sharp origin vs gradual dawning,
   comparing species as the method, and experience as discrete grains.
   Profiles carry each theory's justified rejections as well as its
   signature. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "cells", claim: "Even single cells have some form of experience",
      yes: "even single cells feel something", no: "consciousness needs a nervous system" },
    { key: "simple", claim: "Animals with small, simple nervous systems are conscious",
      yes: "insects and other simple animals are conscious", no: "consciousness needs a big, complex brain" },
    { key: "late", claim: "Full consciousness needs language or thinking about your own mind",
      yes: "full consciousness came late, with language or self-reflection", no: "consciousness came early, long before language" },
    { key: "causal", claim: "Experience itself makes a difference to what creatures do",
      yes: "experience itself steers what creatures do", no: "experience is a by-product; the brain does the work" },
    { key: "social", claim: "Consciousness evolved mainly for sharing with others",
      yes: "consciousness evolved for sharing with others", no: "consciousness evolved for each creature’s own survival" },
    { key: "nomystery", claim: "Evolution leaves no deep mystery about experience",
      yes: "evolution explains experience, with no mystery left", no: "a deep puzzle remains about why experience exists" },
    { key: "affect", claim: "Consciousness began as feeling",
      yes: "consciousness began as feelings like pain and pleasure", no: "feelings came later than perception and thought" },
    { key: "images", claim: "Consciousness began as inner images of the world",
      yes: "consciousness began as inner images of the world", no: "inner images aren’t where consciousness began" },
    { key: "gradual", claim: "Consciousness dawned gradually, with no first conscious creature",
      yes: "consciousness dawned gradually, by degrees", no: "consciousness began with a particular change in evolution" },
    { key: "compare", claim: "Consciousness is best studied by comparing many species and ages",
      yes: "compare many species and ages, not just adult humans", no: "start from adult humans who can tell us what they feel" },
    { key: "grains", claim: "Experience is made of tiny, discrete grains",
      yes: "experience is built from tiny, rapid grains", no: "experience is a truly continuous stream" },
  ];

  var profiles = {
    "andrews-consciousness-without-complex-brains": { simple: 2, late: -2, compare: 2 },
    "cabral-calderin-hechavarria-and-melloni-s-neuroethological-approach": { compare: 2, late: -1 },
    "cleeremans-and-tallon-baudry-s-functional-value": { causal: 2, affect: 1, late: 1, cells: -2 },
    "dennett-s-evolution-of-minds": { nomystery: 2, gradual: 2, late: 2, social: 1, cells: -1, simple: -1 },
    "feinberg-and-mallatt-s-ancient-origins-of-consciousness": { simple: 2, images: 2, cells: -2, late: -2, causal: 1, nomystery: 1, gradual: 1, compare: 1 },
    "halligan-and-oakley-s-species-enhancing-epiphenomenalism": { causal: -2, social: 2, late: 1, nomystery: 1 },
    "holmgren-s-grainy-atomic-feels": { grains: 2 },
    "ledoux-s-deep-roots-of-consciousness": { late: 2, affect: -2, simple: -2, cells: -1, compare: -2 },
    "nichols-s-primal-eye": { images: 2, gradual: -2, affect: -1, cells: -2, late: -1 },
    "no-hard-problem-in-william-james-s-psychology": { causal: 2, nomystery: 2, grains: -1, late: -1 },
    "reber-s-cellular-basis-of-consciousness": { cells: 2, simple: 2, late: -2, affect: 1, nomystery: 1, compare: 1 },
    "sreedharan-s-affective-survival-theory": { affect: 2, causal: 1, simple: 1, late: -1, images: -1 },
    "ginsburg-and-jablonka-s-associative-learning-during-evolution": { simple: 2, late: -2, cells: -2, gradual: -1 },
    "godfrey-smith-s-naturalist-gradualist-diversified-evolution-of-consciousness": { gradual: 2, compare: 2, simple: 1, late: -2, nomystery: 1 },
    "mcginn-s-living-consciousness": { cells: 2, simple: 1, nomystery: -2 },
  };

  var questions = [
    {
      t: "Even a single living cell, like a bacterium, has some faint form of experience.",
      why: "Yes means feeling began with life itself. No means experience needs at least a nervous system.",
      axes: { cells: 1 },
    },
    {
      t: "Animals with small, simple nervous systems, like bees or snails, are conscious.",
      why: "Yes means you don’t need a big, complex brain to feel something. No means consciousness needs much more brain than that.",
      axes: { simple: 1 },
    },
    {
      t: "Full consciousness arrived late in evolution, with language or the ability to think about your own mind.",
      why: "Yes means most animals, however clever, lack consciousness as we know it. No means consciousness is far older than language or self-reflection.",
      axes: { late: 1 },
    },
    {
      t: "Your experiences make a real difference to what you do; they aren’t idle by-products of brain activity.",
      why: "Yes means feeling pain or seeing red helps steer your actions, whether or not experience is itself a kind of brain activity. No means the brain does all the work and experience comes along as a by-product.",
      axes: { causal: 1 },
    },
    {
      t: "Consciousness evolved mainly so that we could share what is in our heads with others.",
      why: "Yes means its main use is social: telling, explaining, coordinating. No means it evolved to serve each creature’s own survival.",
      axes: { social: 1 },
    },
    {
      t: "Once you understand how evolution built the brain, there’s no deep mystery left about why we have experiences.",
      why: "Yes means the “hard problem” fades once the evolutionary story is told. No means a real puzzle would remain even then.",
      axes: { nomystery: 1 },
    },
    {
      t: "Consciousness began as feeling: pain, pleasure, hunger and fear came before seeing or thinking.",
      why: "Yes means the first experiences were feelings of good and bad. No means feelings are a later layer, built on perception and thought.",
      axes: { affect: 1 },
    },
    {
      t: "Consciousness began when brains started building inner images or maps of the world around them.",
      why: "Yes means its root is a brain picturing the world, as in seeing or dreaming. No means inner images weren’t where it started.",
      axes: { images: 1 },
    },
    {
      t: "There was no first conscious creature: consciousness dawned gradually, by tiny degrees.",
      why: "Yes means no single step in evolution switched it on. No means it began with a particular change, at a particular point in the history of life.",
      axes: { gradual: 1 },
    },
    {
      t: "To understand consciousness, compare many species and stages of life, rather than starting from adult humans.",
      why: "Yes means adult humans who can describe their feelings are too narrow a sample. No means our own reports are the best place to start.",
      axes: { compare: 1 },
    },
    {
      t: "Your seemingly smooth stream of experience is really made of tiny, rapid grains of feeling.",
      why: "Yes means experience comes in discrete units that blur together, like frames of a film. No means it is truly continuous.",
      axes: { grains: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-phylogenetic-evolutionary"] = {
    name: "Phylogenetic/Evolutionary",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside evolutionary materialism.",
    areas: [
    { key: "andrews-consciousness-without-complex-brains", name: "Andrews's Consciousness Without Complex Brains",
      tagline: "You don’t need a big brain to feel.",
      url: "https://loc.closertotruth.com/theory/andrews-consciousness-without-complex-brains" },
    { key: "cabral-calderin-hechavarria-and-melloni-s-neuroethological-approach", name: "Cabral-Calderin, Hechavarria, and Melloni’s Neuroethological Approach",
      tagline: "Study minds across species, not just humans.",
      url: "https://loc.closertotruth.com/theory/cabral-calderin-hechavarria-and-melloni-s-neuroethological-approach" },
    { key: "cleeremans-and-tallon-baudry-s-functional-value", name: "Cleeremans and Tallon-Baudry’s Functional Value",
      tagline: "Feelings evolved because they’re useful.",
      url: "https://loc.closertotruth.com/theory/cleeremans-and-tallon-baudry-s-functional-value" },
    { key: "dennett-s-evolution-of-minds", name: "Dennett’s Evolution of Minds",
      tagline: "Natural selection built minds, no magic needed.",
      url: "https://loc.closertotruth.com/theory/dennett-s-evolution-of-minds" },
    { key: "feinberg-and-mallatt-s-ancient-origins-of-consciousness", name: "Feinberg and Mallatt’s Ancient Origins of Consciousness",
      tagline: "Consciousness is ancient — fish feel too.",
      url: "https://loc.closertotruth.com/theory/feinberg-and-mallatt-s-ancient-origins-of-consciousness" },
    { key: "halligan-and-oakley-s-species-enhancing-epiphenomenalism", name: "Halligan and Oakley’s Species-Enhancing Epiphenomenalism",
      tagline: "Consciousness changes nothing — but helps the species.",
      url: "https://loc.closertotruth.com/theory/halligan-and-oakley-s-species-enhancing-epiphenomenalism" },
    { key: "holmgren-s-grainy-atomic-feels", name: "Holmgren’s Grainy, Atomic Feels",
      tagline: "Experience comes in tiny rapid grains.",
      url: "https://loc.closertotruth.com/theory/holmgren-s-grainy-atomic-feels" },
    { key: "ledoux-s-deep-roots-of-consciousness", name: "LeDoux’s Deep Roots of Consciousness",
      tagline: "Consciousness grew out of survival circuits.",
      url: "https://loc.closertotruth.com/theory/ledoux-s-deep-roots-of-consciousness" },
    { key: "nichols-s-primal-eye", name: "Nichols’s Primal Eye",
      tagline: "A lost third eye gave us inner vision.",
      url: "https://loc.closertotruth.com/theory/nichols-s-primal-eye" },
    { key: "no-hard-problem-in-william-james-s-psychology", name: "No Hard Problem in William James’s Psychology",
      tagline: "Consciousness evolved to pick the best action.",
      url: "https://loc.closertotruth.com/theory/no-hard-problem-in-william-james-s-psychology" },
    { key: "reber-s-cellular-basis-of-consciousness", name: "Reber’s Cellular Basis of Consciousness",
      tagline: "Life itself is the start of mind.",
      url: "https://loc.closertotruth.com/theory/reber-s-cellular-basis-of-consciousness" },
    { key: "sreedharan-s-affective-survival-theory", name: "Sreedharan’s Affective Survival Theory",
      tagline: "Feelings evolved to keep you alive.",
      url: "https://loc.closertotruth.com/theory/sreedharan-s-affective-survival-theory" },
    { key: "birch-s-comparative-sentience-consciousness-profiles-across-diverse-minds", name: "Birch’s Comparative Sentience: Consciousness Profiles Across Diverse Minds",
      tagline: "Study sentience across species without settling what it is.",
      url: "https://loc.closertotruth.com/theory/birch-s-comparative-sentience-consciousness-profiles-across-diverse-minds", review: true,
      group: "andrews-consciousness-without-complex-brains" },
    { key: "ginsburg-and-jablonka-s-associative-learning-during-evolution", name: "Ginsburg and Jablonka’s Associative Learning During Evolution",
      tagline: "Open-ended learning was the mark of the first minds.",
      url: "https://loc.closertotruth.com/theory/ginsburg-and-jablonka-s-associative-learning-during-evolution", review: true },
    { key: "godfrey-smith-s-naturalist-gradualist-diversified-evolution-of-consciousness", name: "Godfrey-Smith’s Naturalist, Gradualist, Diversified Evolution of Consciousness",
      tagline: "Experience dawned slowly, in many forms, across animal life.",
      url: "https://loc.closertotruth.com/theory/godfrey-smith-s-naturalist-gradualist-diversified-evolution-of-consciousness", review: true },
    { key: "mcginn-s-living-consciousness", name: "McGinn’s Living Consciousness",
      tagline: "Mind is found in all living tissue, and nowhere else.",
      url: "https://loc.closertotruth.com/theory/mcginn-s-living-consciousness", review: true }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
