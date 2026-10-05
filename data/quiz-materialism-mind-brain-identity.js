/* The Mind-Brain Identity quiz: an axis quiz, like data/quiz-idealisms.js.
   11 theories LOC lists under Materialism / Mind-Brain Identity, 9 targets:
   Armstrong's and Lewis's causal-role identity theories are grouped with
   Smart's Topic-Neutral Identity, which takes the same side on every axis
   (contingent, deflationary type identity). The school holds
   its defenders and two of its best-known critics (Kripke, Levine). The axes
   cover where they part ways: whether experiences literally are brain
   processes, mental states defined by their causal job, a lasting
   explanatory gap, identity as necessary rather than contingent, the
   "phenomenological fallacy" (nothing in you is green when you see green),
   physics needing to grow to take in sensation, and kinds of experience
   matching kinds of brain state. Profiles carry each theory's justified
   rejections as well as its signature. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "identity", claim: "Experiences literally are brain processes",
      yes: "experiences are brain processes", no: "experiences are something over and above the brain" },
    { key: "role", claim: "A mental state is defined by the job it does",
      yes: "a pain is whatever does pain’s job", no: "a pain is defined by how it feels" },
    { key: "gap", claim: "Brain science can’t show why experience feels as it does",
      yes: "a real explanatory gap remains", no: "nothing would be left unexplained" },
    { key: "necessary", claim: "If minds are brains, they are so necessarily",
      yes: "mind-brain identity is necessary", no: "mind-brain identity is a contingent discovery" },
    { key: "fallacy", claim: "Nothing in you has the qualities your experience presents",
      yes: "the greenness is in how things appear, not in you", no: "experience has inner qualities of its own" },
    { key: "physics", claim: "Science must go beyond today’s physics to take in sensation",
      yes: "physics will have to grow", no: "today’s physical science has room for it" },
    { key: "type", claim: "Each kind of experience is one kind of brain state",
      yes: "kinds of experience match kinds of brain state", no: "mental kinds don’t line up with brain kinds" },
  ];

  var profiles = {
    "feigls-double-knowledge-of-raw-feels":                 { identity: 2, role: -1, necessary: -1, fallacy: -1, physics: -1, type: 1 },
    "kripke-s-modal-argument-against-mind-brain-identity":  { identity: -2, role: -2, gap: 1, necessary: 2, fallacy: -2 },
    "levine-s-explanatory-gap":                             { identity: -1, role: -1, gap: 2, fallacy: -1, physics: 1 },
    "mclaughlins-neurobiologicalism":                       { identity: 2, role: -2, gap: 1, necessary: 2, physics: -1, type: 2 },
    "papineau-s-mind-brain-identity":                       { identity: 2, role: -1, gap: -2, necessary: 1, physics: -1 },
    "place-s-empirical-identity-and-the-phenomenological-fallacy": { identity: 2, gap: -1, necessary: -2, fallacy: 2, type: 1 },
    "quine-s-naturalized-mind-and-the-demoted-phenomenal":  { identity: 1, physics: -1, type: -2 },
    "sellars-s-sensa-beyond-the-given":                     { identity: 1, role: -1, fallacy: -2, physics: 2 },
    "smart-s-topic-neutral-identity":                       { identity: 2, role: 1, gap: -1, necessary: -2, fallacy: 2, physics: -2, type: 1 },
  };

  var questions = [
    {
      t: "Your experiences are literally processes in your brain, the way lightning is literally an electrical discharge.",
      why: "Yes means a pain is not caused by or correlated with a brain process; it is that process. No means experience is something over and above the brain, however closely tied to it.",
      axes: { identity: 1 },
    },
    {
      t: "What makes a state a pain is the job it does: what typically causes it and what it leads you to do.",
      why: "Yes means mental states are defined by their causal role, and science finds what fills that role. No means a pain is defined by how it feels, whatever job it does.",
      axes: { role: 1 },
    },
    {
      t: "Even a complete science of the brain would leave it unexplained why its activity feels the way it does.",
      why: "Yes means a real explanatory gap would remain, unlike heat, which molecular motion fully explains. No means once the brain is understood, nothing about experience would be left over to explain.",
      axes: { gap: 1 },
    },
    {
      t: "If pain is a certain brain state, it could not have been otherwise: it would be that state in every possible world.",
      why: "Like water being H₂O: a true identity holds necessarily, even if it took discovery to learn it. No means the identity is a contingent fact about how our world turned out.",
      axes: { necessary: 1 },
    },
    {
      t: "When you see a green after-image, nothing in you is actually green.",
      why: "Yes means the greenness belongs to how things appear, not to some inner object or quality in the mind. No means experience has inner qualities of its own that a theory must account for.",
      axes: { fallacy: 1 },
    },
    {
      t: "To take in sensations, science will have to grow beyond the physics we have today.",
      why: "Yes means the qualities of sensation need something new in our picture of nature. No means today’s physical science already has room for them.",
      axes: { physics: 1 },
    },
    {
      t: "Each kind of experience, such as pain, will turn out to be one kind of brain state.",
      why: "Yes means mental kinds match brain kinds, as heat matches molecular motion. No means each experience is a brain event, but our mental categories don’t line up with neural ones.",
      axes: { type: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-mind-brain-identity"] = {
    name: "Mind-Brain Identity",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all about mind-brain identity.",
    areas: [
    { key: "feigls-double-knowledge-of-raw-feels", name: "Feigl's Double Knowledge of Raw Feels",
      tagline: "Felt from inside, measured from outside: one event.",
      url: "https://loc.closertotruth.com/theory/feigls-double-knowledge-of-raw-feels", review: true },
    { key: "kripke-s-modal-argument-against-mind-brain-identity", name: "Kripke’s Modal Argument Against Mind–Brain Identity",
      tagline: "Pain could exist without its brain state, so they differ.",
      url: "https://loc.closertotruth.com/theory/kripke-s-modal-argument-against-mind-brain-identity", review: true },
    { key: "levine-s-explanatory-gap", name: "Levine’s Explanatory Gap",
      tagline: "Brain facts never show why pain feels like pain.",
      url: "https://loc.closertotruth.com/theory/levine-s-explanatory-gap", review: true },
    { key: "mclaughlins-neurobiologicalism", name: "McLaughlin's Neurobiologicalism",
      tagline: "Each experience type is a neurobiological type.",
      url: "https://loc.closertotruth.com/theory/mclaughlins-neurobiologicalism", review: true },
    { key: "papineau-s-mind-brain-identity", name: "Papineau’s Mind-Brain Identity",
      tagline: "Conscious states are brain states; the gap is an illusion.",
      url: "https://loc.closertotruth.com/theory/papineau-s-mind-brain-identity", review: true },
    { key: "place-s-empirical-identity-and-the-phenomenological-fallacy", name: "Place’s Empirical Identity and the Phenomenological Fallacy",
      tagline: "Experience is a brain process, found by discovery.",
      url: "https://loc.closertotruth.com/theory/place-s-empirical-identity-and-the-phenomenological-fallacy", review: true },
    { key: "quine-s-naturalized-mind-and-the-demoted-phenomenal", name: "Quine’s Naturalized Mind and the Demoted Phenomenal",
      tagline: "Mental events are bodily events, without neat categories.",
      url: "https://loc.closertotruth.com/theory/quine-s-naturalized-mind-and-the-demoted-phenomenal", review: true },
    { key: "sellars-s-sensa-beyond-the-given", name: "Sellars’s Sensa Beyond the Given",
      tagline: "Sensations are physical, but physics must grow to fit them.",
      url: "https://loc.closertotruth.com/theory/sellars-s-sensa-beyond-the-given", review: true },
    { key: "smart-s-topic-neutral-identity", name: "Smart’s Topic-Neutral Identity",
      tagline: "Sensations are brain processes, and nothing extra.",
      url: "https://loc.closertotruth.com/theory/smart-s-topic-neutral-identity", review: true },
    { key: "armstrong-s-causal-role-central-state-materialism", name: "Armstrong’s Causal-Role Central-State Materialism",
      tagline: "Mental states are the brain states that cause behavior.",
      url: "https://loc.closertotruth.com/theory/armstrong-s-causal-role-central-state-materialism", review: true,
      group: "smart-s-topic-neutral-identity" },
    { key: "lewis-s-analytic-functionalism-and-causal-role-identity-theory", name: "Lewis’s Analytic Functionalism and Causal-Role Identity Theory",
      tagline: "Experiences are whatever brain states fill their roles.",
      url: "https://loc.closertotruth.com/theory/lewis-s-analytic-functionalism-and-causal-role-identity-theory", review: true,
      group: "smart-s-topic-neutral-identity" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
