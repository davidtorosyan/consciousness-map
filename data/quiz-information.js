/* The Information quiz: an axis quiz, like data/quiz-idealisms.js.
   6 theories LOC lists under Information. All put information at the centre
   of mind; they differ on what it is and where it lives. LOC lists them
   flat. 8 axes cover the real divides: the cosmos as a mind vs mind in
   brains, information as fundamental vs emerging over time, reality as
   mathematical, whether consciousness does any work, whether a machine
   could be conscious, plus signatures (the brain's world model, replaying
   past experience, parallel tracks). Profiles carry each theory's justified
   rejections as well as its signature. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "cosmic", claim: "The universe as a whole is a kind of mind",
      yes: "the universe as a whole is a kind of mind", no: "minds live in brains and bodies" },
    { key: "emerge", claim: "Information emerged in nature with new powers",
      yes: "information emerged in nature with new powers", no: "information is there from the start" },
    { key: "math", claim: "Reality’s deepest structure is mathematical, and mind shares it",
      yes: "mind and reality share a mathematical structure", no: "mathematics is a tool, not reality’s stuff" },
    { key: "acts", claim: "Consciousness itself makes things happen",
      yes: "consciousness makes things happen", no: "consciousness rides along" },
    { key: "machine", claim: "A computer with the right design could be conscious",
      yes: "a machine could be conscious", no: "no machine could be conscious" },
    { key: "model", claim: "Consciousness is the brain’s model of its world",
      yes: "consciousness is the brain’s world model", no: "consciousness is more than a model" },
    { key: "replay", claim: "Experience is the brain replaying stored past experiences",
      yes: "experience is replay of stored experience", no: "experience is built fresh each moment" },
    { key: "tracks", claim: "Consciousness runs on several parallel tracks at once",
      yes: "consciousness runs on parallel tracks", no: "consciousness is one single stream" },
  ];

  var profiles = {
    "boyd-s-emergent-information-theory":                 { emerge: 2, acts: -2, cosmic: -1, math: -1 },
    "doyle-s-experience-recorder-and-reproducer":         { replay: 2, acts: 2, emerge: 1, cosmic: -1, machine: -1 },
    "langan-s-cognitive-theoretic-model-of-the-universe": { cosmic: 2, emerge: -2, math: 1, acts: 1, model: -1 },
    "moll-s-multitrack-consciousness-conjecture":         { tracks: 2, cosmic: -1 },
    "resch-s-platonic-functionalism":                     { math: 2, machine: 2, emerge: -1, cosmic: 1 },
    "safron-s-integrated-world-modeling-theory":          { model: 2, cosmic: -2, acts: 1, machine: 1, tracks: -1 },
  };

  var questions = [
    {
      t: "The universe as a whole is a kind of mind, creating and understanding itself.",
      why: "Yes means mind belongs to reality at its largest scale. No means minds are found in brains and bodies, not in the cosmos as a whole.",
      axes: { cosmic: 1 },
    },
    {
      t: "Information is something that emerged in nature over time, and brought new powers with it.",
      why: "Yes means information appeared as the universe grew complex, and can do things matter alone couldn’t. No means information was part of reality from the very start.",
      axes: { emerge: 1 },
    },
    {
      t: "Reality’s deepest structure is mathematical, and minds share that same structure.",
      why: "Yes means mathematics isn’t just a tool for describing the world but what the world, and mind, are made of. No means mathematics describes reality without being its stuff.",
      axes: { math: 1 },
    },
    {
      t: "Consciousness itself makes things happen. It’s not just along for the ride.",
      why: "Yes means being conscious changes what you do. No means the information processing does all the work, and experience simply accompanies it.",
      axes: { acts: 1 },
    },
    {
      t: "A computer built and programmed the right way could be conscious.",
      why: "Yes means what matters is how information is organised, not what it runs on. No means no machine, however clever, could have experiences.",
      axes: { machine: 1 },
    },
    {
      t: "Consciousness is your brain’s integrated model of the world and your place in it, constantly updated.",
      why: "Yes means experience is that model, built and revised by the brain. No means consciousness is something more than, or other than, a model.",
      axes: { model: 1 },
    },
    {
      t: "When you experience something, your brain is replaying stored past experiences that resemble it.",
      why: "Yes means the brain records what it lives through, and seeing or feeling now is partly playback of that record. No means experience is built fresh each moment.",
      axes: { replay: 1 },
    },
    {
      t: "Consciousness runs on several parallel tracks at once, not one single stream.",
      why: "Yes means separate streams of information run side by side and are woven into what you experience. No means consciousness is a single stream.",
      axes: { tracks: 1 },
    },
  ];

  window.QUIZ_DATA.drill["information"] = {
    name: "Information",
    color: "#BF2B39",
    categoryId: "information",
    kicker: "A QUIZ · INFORMATION",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside information views.",
    areas: [
    { key: "boyd-s-emergent-information-theory", name: "Boyd’s Emergent Information Theory",
      tagline: "Information gains new powers; consciousness rides along.",
      url: "https://loc.closertotruth.com/theory/boyd-s-emergent-information-theory" },
    { key: "doyle-s-experience-recorder-and-reproducer", name: "Doyle’s Experience Recorder and Reproducer",
      tagline: "The brain records experiences and plays them back.",
      url: "https://loc.closertotruth.com/theory/doyle-s-experience-recorder-and-reproducer" },
    { key: "langan-s-cognitive-theoretic-model-of-the-universe", name: "Langan’s Cognitive-Theoretic Model of the Universe",
      tagline: "The universe is a self-creating mind.",
      url: "https://loc.closertotruth.com/theory/langan-s-cognitive-theoretic-model-of-the-universe" },
    { key: "moll-s-multitrack-consciousness-conjecture", name: "Moll’s Multitrack Consciousness Conjecture",
      tagline: "Consciousness runs on parallel tracks of information.",
      url: "https://loc.closertotruth.com/theory/moll-s-multitrack-consciousness-conjecture" },
    { key: "resch-s-platonic-functionalism", name: "Resch’s Platonic Functionalism",
      tagline: "Mind and reality share one deep mathematical structure.",
      url: "https://loc.closertotruth.com/theory/resch-s-platonic-functionalism" },
    { key: "safron-s-integrated-world-modeling-theory", name: "Safron’s Integrated World Modeling Theory",
      tagline: "Consciousness is the brain’s updating world model.",
      url: "https://loc.closertotruth.com/theory/safron-s-integrated-world-modeling-theory" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
