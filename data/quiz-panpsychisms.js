/* The Panpsychisms quiz: an axis quiz, like the main quiz (data/main-quiz.js).
   axes      the questions panpsychist theories disagree on among themselves
   profiles  each theory's position: 2 / 1 / -1 / -2; missing = no stand
   questions one axis each
   Checked by tools/eval-quiz.js (every theory's ideal respondent must rank
   first) and a blind role-play of named proponents
   (tools/eval-thinkers-panpsychisms.json). Covers the 16 theories LOC lists
   under Panpsychisms. */
(function () {
  "use strict";
  var axes = [
    { key: "cosmos", claim: "The universe as a whole is the basic conscious subject",
      yes: "the universe is one big mind", no: "consciousness builds up from small things" },
    { key: "subjects", claim: "The tiniest things are subjects with experiences",
      yes: "the tiniest things really experience", no: "the tiniest things carry only ingredients of experience" },
    { key: "combine", claim: "Small experiences combine into bigger minds",
      yes: "small experiences combine into minds like yours", no: "small experiences don\u2019t simply add up" },
    { key: "qualities", claim: "Qualities can exist with no one experiencing them",
      yes: "qualities can exist with no one experiencing them", no: "every quality belongs to someone" },
    { key: "intrinsic", claim: "Experience is what matter is, underneath what physics says it does",
      yes: "experience is matter\u2019s inner nature", no: "experience isn\u2019t just matter\u2019s inner nature" },
    { key: "tuning", claim: "Brains tune into consciousness rather than producing it",
      yes: "brains tune into consciousness", no: "brains don\u2019t just receive consciousness" },
    { key: "force", claim: "Consciousness is a force that pushes matter around",
      yes: "consciousness is a force of nature", no: "consciousness isn\u2019t a force" },
    { key: "dimension", claim: "Experience lives in a hidden dimension of reality",
      yes: "experience has its own dimension of reality", no: "experience needs no extra dimension" },
    { key: "process", claim: "Reality is made of momentary events of experience",
      yes: "reality is a flow of moments of experience", no: "reality is made of lasting things" },
    { key: "organize", claim: "Mind shows up wherever things organize themselves",
      yes: "mind goes with self-organizing activity", no: "mind isn\u2019t about activity" },
    { key: "sharp", claim: "Consciousness has no borderline cases",
      yes: "consciousness is all-or-nothing", no: "consciousness can be a matter of degree" },
    { key: "physical", claim: "A complete physics would include consciousness",
      yes: "consciousness belongs inside physics", no: "consciousness lies outside physics" },
  ];

  /* Besides each theory's signature, profiles record what it rejects where
     that follows from the view: Russellian views (experience is matter's
     inner nature) reject experience as an extra force, dimension or signal;
     bottom-up views reject a cosmic subject. Signature-only profiles were
     swamped by people's other answers in tools/eval-quiz.js. */
  var profiles = {
    "micropsychism":       { cosmos: -2, subjects: 2, combine: 2, qualities: -1, intrinsic: 1, tuning: -1, force: -1, dimension: -1, organize: -1 },
    "panprotopsychism":    { cosmos: -1, subjects: -2, combine: 1, qualities: -1, intrinsic: 1, tuning: -1, force: -1, dimension: -1, sharp: -1 },
    "cosmopsychism":       { cosmos: 2, subjects: -1, combine: -1, tuning: 1, organize: -1 },
    "qualia-force":        { intrinsic: -1, tuning: -1, force: 2, dimension: -1, physical: 1 },
    "qualia-space":        { intrinsic: -1, force: -1, dimension: 2, physical: -1 },
    "chalmers":            { combine: -1, intrinsic: 2, tuning: -1, force: -1, dimension: -1, physical: -1 },
    "strawson":            { cosmos: -1, subjects: 2, combine: 1, intrinsic: 2, tuning: -1, force: -1, dimension: -1, organize: -1, sharp: 1, physical: 2 },
    "goff":                { cosmos: 1, subjects: 1, intrinsic: 2, tuning: -1, force: -1, dimension: -1, physical: 1 },
    "tye":                 { cosmos: -1, subjects: 1, qualities: -1, sharp: 2 },
    "panqualityism":       { cosmos: -1, subjects: -2, combine: 1, qualities: 2, intrinsic: 1, tuning: -1, force: -1 },
    "monadic-panpsychism": { cosmos: -1, subjects: 2, combine: -2, tuning: -1 },
    "harris-field":        { cosmos: 1, combine: -1, intrinsic: -1, tuning: 2 },
    "sheldrake":           { cosmos: 1, subjects: 1, tuning: 1, process: 1, organize: 2 },
    "wallace":             { intrinsic: 1, tuning: -1, physical: 2 },
    "whitehead":           { subjects: 2, intrinsic: 1, process: 2, organize: 1 },
    "starrett":            { cosmos: -1, subjects: 2, combine: 1, intrinsic: -1, tuning: -1, organize: 2 },
  };

  var questions = [
    {
      t: "The smallest bits of nature, like electrons, have experiences of their own, however faint.",
      why: "Yes means the smallest things genuinely experience: there is something it is like to be them. No means they carry at most the raw ingredients of experience, or that experience starts somewhere bigger.",
      axes: { subjects: 1 },
    },
    {
      t: "The tiny experiences of the particles in your brain somehow combine to make up your mind.",
      why: "This is the \u2018combination\u2019 question. Not that they simply add up like bricks, but that your mind is made out of smaller experiences in some way. No means your mind isn\u2019t built from smaller experiences at all.",
      axes: { combine: 1 },
    },
    {
      t: "The universe as a whole is conscious, and your mind is a small part of that one big mind.",
      why: "Most panpsychists build up from tiny bits of experience. This view starts at the top instead: one cosmic consciousness, with individual minds as parts or aspects of it.",
      axes: { cosmos: 1 },
    },
    {
      t: "Physics only tells us what matter does, not what it is in itself, and what it is in itself is experience, or something close to it.",
      why: "Physics describes mass and charge by how things behave. This view says that leaves a gap, the inner nature of matter, and that\u2019s where experience fits.",
      axes: { intrinsic: 1 },
    },
    {
      t: "Qualities like redness or warmth can exist at the bottom of reality even when no one is experiencing them.",
      why: "Normally a quality like red is a quality for someone. Yes means the qualities themselves are basic, and the subjects who experience them come later.",
      axes: { qualities: 1 },
    },
    {
      t: "Your brain doesn\u2019t produce consciousness; it picks it up, the way a radio picks up a signal.",
      why: "Yes means consciousness is already out there in nature, and brains are receivers or channels for it.",
      axes: { tuning: 1 },
    },
    {
      t: "Wherever something organises itself or responds to its surroundings, from an atom to a cell to a flock of birds, there is some mind.",
      why: "This ties mind to activity: sensing, responding, self-organising. The more richly something does that, the richer its mind.",
      axes: { organize: 1 },
    },
    {
      t: "Reality is made of momentary events of experience, one after another, not of lasting things.",
      why: "On this picture, what seem like solid, enduring objects are really chains of tiny moments of feeling, each one inheriting from the last.",
      axes: { process: 1 },
    },
    {
      t: "Consciousness is an undiscovered force of nature that pushes matter around, like gravity or electromagnetism.",
      why: "This treats consciousness as active in physics, something experiments could one day detect, rather than a hidden inner side of matter.",
      axes: { force: 1 },
    },
    {
      t: "Experience lives in a hidden dimension of reality, alongside space and time.",
      why: "Yes means experience needs its own room in reality: a dimension or structure beyond matter, energy, space and time.",
      axes: { dimension: 1 },
    },
    {
      t: "A thing is either conscious or it isn\u2019t: there are no borderline cases where it\u2019s neither.",
      why: "Many things come in degrees, with borderline cases, like being tall or being a heap. This asks whether being conscious is like that, or whether there is always a sharp yes or no.",
      axes: { sharp: 1 },
    },
    {
      t: "Consciousness belongs inside physics: a complete science of the physical world would include it.",
      why: "Yes means consciousness is part of the physical world, so a finished physics would have to take it in. No means it lies outside physics, however complete physics becomes.",
      axes: { physical: 1 },
    },
  ];

  window.QUIZ_DATA.drill.panpsychisms = {
    name: "Panpsychisms",
    color: "#CF56CA",
    categoryId: "panpsychisms",
    kicker: "A QUIZ \u00B7 PANPSYCHISMS",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside panpsychism.",
    areas: [
    { key: "micropsychism", name: "Micropsychism",
      tagline: "Tiny bits of matter have tiny bits of experience.",
      url: "https://loc.closertotruth.com/theory/micropsychism" },
    { key: "panprotopsychism", name: "Panprotopsychism",
      tagline: "Matter carries the raw ingredients of feeling, not feeling itself.",
      url: "https://loc.closertotruth.com/theory/panprotopsychism" },
    { key: "cosmopsychism", name: "Cosmopsychism",
      tagline: "The universe is one big mind; we are pieces of it.",
      url: "https://loc.closertotruth.com/theory/cosmopsychism" },
    { key: "qualia-force", name: "Qualia Force",
      tagline: "Consciousness is a new fundamental force, still undiscovered.",
      url: "https://loc.closertotruth.com/theory/qualia-force" },
    { key: "qualia-space", name: "Qualia Space",
      tagline: "Experience lives in a hidden dimension of reality.",
      url: "https://loc.closertotruth.com/theory/qualia-space" },
    { key: "chalmers", name: "Chalmers’s Panpsychism",
      tagline: "Physics can’t explain feeling, so feeling must be fundamental.",
      url: "https://loc.closertotruth.com/theory/chalmers-s-panpsychism" },
    { key: "strawson", name: "Strawson’s Panpsychism",
      tagline: "What matter is, underneath, is experience.",
      url: "https://loc.closertotruth.com/theory/strawson-s-panpsychism" },
    { key: "goff", name: "Goff’s Panpsychism",
      tagline: "Consciousness belongs in science like mass and charge do.",
      url: "https://loc.closertotruth.com/theory/goff-s-panpsychism" },
    { key: "tye", name: "Tye’s Irreducible Consciousness",
      tagline: "What it’s like is real and can’t be reduced away.",
      url: "https://loc.closertotruth.com/theory/tye-s-irreducible-consciousness" },
    { key: "panqualityism", name: "Coleman’s Panqualityism",
      tagline: "Qualities like color exist at the bottom — with no one feeling them.",
      url: "https://loc.closertotruth.com/theory/coleman-s-panqualityism" },
    { key: "monadic-panpsychism", name: "Kadić’s Monadic Panpsychism",
      tagline: "Tiny minds don’t combine; one takes the lead, or all feel as one.",
      url: "https://loc.closertotruth.com/theory/monadic-panpsychism" },
    { key: "harris-field", name: "A. Harris’s Panpsychism as Fundamental Field",
      tagline: "Consciousness is a field; brains tune into it.",
      url: "https://loc.closertotruth.com/theory/a-harris-s-panpsychism-as-fundamental-field" },
    { key: "sheldrake", name: "Sheldrake’s Self-Organizing Systems at All Levels of Complexity",
      tagline: "Mind shows up wherever things organize themselves.",
      url: "https://loc.closertotruth.com/theory/sheldrake-s-self-organizing-systems-at-all-levels-of-complexity" },
    { key: "wallace", name: "Wallace’s Panpsychism Inside Physics",
      tagline: "Physics is unfinished — mind was inside it all along.",
      url: "https://loc.closertotruth.com/theory/wallace-s-panpsychism-inside-physics" },
    { key: "whitehead", name: "Whitehead’s Process Theory (Panpsychism)",
      tagline: "Reality is flashes of feeling, moment to moment.",
      url: "https://loc.closertotruth.com/theory/whitehead-s-process-theory" },
    { key: "starrett", name: "Starrett’s Radical Panpsychism",
      tagline: "To feel is to model your surroundings and respond.",
      url: "https://loc.closertotruth.com/theory/starrett-s-radical-panpsychism" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
