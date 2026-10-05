/* The Electromagnetic Field quiz: an axis quiz, like data/quiz-idealisms.js.
   12 theories LOC lists under Materialism's Electromagnetic Field theories
   (3 of them still under LOC review).
   They share a focus on the brain's electrical activity and part ways on
   10 axes: experience as the field itself vs neurons' firing, the field
   acting back on neurons, experience causing actions, synchrony across
   the brain, consciousness beyond brains, light-speed signalling, the
   brain's own rhythms, only special field patterns being conscious,
   experience arising locally, and whether ordinary computers could be
   conscious. Profiles carry each theory's justified rejections as well as
   its signature. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "field", claim: "Experience is the brain’s electromagnetic field itself",
      yes: "experience is the brain’s electromagnetic field", no: "experience is in the neurons’ activity" },
    { key: "feedback", claim: "The brain’s field acts back on its neurons",
      yes: "the brain’s field acts back on its neurons", no: "the field is a by-product of neurons firing" },
    { key: "causal", claim: "Conscious experience causes some of what you do",
      yes: "experience causes some of what you do", no: "experience doesn’t cause your actions" },
    { key: "sync", claim: "Consciousness is brain regions falling into step",
      yes: "consciousness is brain regions falling into step", no: "synchrony isn’t what makes experience" },
    { key: "beyond", claim: "Consciousness isn’t limited to brains",
      yes: "anything that resonates may have some experience", no: "consciousness needs a brain" },
    { key: "speed", claim: "Some brain signals travel at light speed",
      yes: "the brain links up at light speed", no: "nerve impulses do the linking" },
    { key: "rhythm", claim: "The brain generates its own rhythms; the senses only tune them",
      yes: "the brain’s own rhythms come first; the senses tune them", no: "the senses drive what the brain does" },
    { key: "pattern", claim: "Only certain field patterns are conscious",
      yes: "only special field patterns are conscious", no: "any field of the right strength may be conscious" },
    { key: "local", claim: "Experience arises locally, in the waves around neurons",
      yes: "experience arises locally, around active neurons", no: "experience needs the whole brain working together" },
    { key: "machine", claim: "No ordinary computer could be conscious",
      yes: "ordinary computer chips can’t be conscious", no: "a computer might be conscious" },
  ];

  var profiles = {
    "ephaptic-coupling":                                      { feedback: 2, sync: 1, local: 1 },
    "zhang-s-long-distance-light-speed-telecommunications":   { speed: 2, sync: 2, feedback: 1, local: -1 },
    "ambron-s-local-field-potentials-and-electromagnetic-waves": { local: 2, field: 1 },
    "hunt-and-schooler-s-general-resonance-theory":           { beyond: 2, sync: 2, field: 1, machine: -1 },
    "jones-s-electromagnetic-fields":                         { field: 2, machine: 1, local: 1, beyond: 1 },
    "llinas-s-mindness-state-of-oscillations":                { rhythm: 2, sync: 1, field: -1, beyond: -2, causal: 1 },
    "mcfadden-s-conscious-electromagnetic-information-theory": { field: 2, feedback: 2, causal: 2, machine: 2, beyond: -1, speed: 1 },
    "pockett-s-conscious-and-non-conscious-patterns":         { pattern: 2, field: 2, causal: -2, beyond: -1, machine: 1 },
    "singer-and-melloni-s-large-scale-synchrony":             { sync: 2, local: -2, field: -1, beyond: -2 },
    // under LOC review
    "becker-s-analog-body-electric":                          { field: 2, feedback: 1, local: -1 },
    "fingelkurts-and-fingelkurts-s-operational-architectonics": { field: 1, sync: 1, machine: 1 },
    "miller-s-brain-waves-analog-organization-of-cortex":     { sync: 2, local: -2, causal: 1, feedback: 1 },
  };

  var questions = [
    {
      t: "Your experience is the electromagnetic field your brain generates, not the firing of the neurons that make it.",
      why: "Yes means the neurons produce the field, but experience is the field itself. No means experience lives in the neurons’ activity.",
      axes: { field: 1 },
    },
    {
      t: "The brain’s electrical field acts back on its own neurons, changing when they fire.",
      why: "Yes means the field is a player in its own right, nudging cells directly, not only through their connections. No means it’s just a by-product of their firing.",
      axes: { feedback: 1 },
    },
    {
      t: "Your conscious experience actually causes some of what you do.",
      why: "Yes means experience isn’t just along for the ride. No means your actions are fully caused by brain processes, with experience making no difference.",
      axes: { causal: 1 },
    },
    {
      t: "Consciousness happens when many brain regions fall into step, firing in the same rhythm.",
      why: "Yes means synchrony, things oscillating together, is what makes experience. No means something else does.",
      axes: { sync: 1 },
    },
    {
      t: "Consciousness isn’t limited to brains: anything that vibrates in sync may have some faint experience.",
      why: "Yes means experience comes in degrees throughout nature, wherever things resonate together. No means it needs a brain.",
      axes: { beyond: 1 },
    },
    {
      t: "Some signals in the brain travel at light speed, far faster than nerve impulses.",
      why: "Yes means fields or light link distant parts of the brain almost instantly. No means slower nerve impulses do the linking.",
      axes: { speed: 1 },
    },
    {
      t: "Your brain generates its own rhythms from within; the senses only tune what is already going on.",
      why: "Yes means the brain is always active on its own, and the senses adjust that activity. No means the senses drive the brain’s activity.",
      axes: { rhythm: 1 },
    },
    {
      t: "Only certain special patterns in the brain’s field are conscious; most of its field activity isn’t.",
      why: "Yes means the shape of the field pattern decides whether it feels like anything. No means no special pattern is needed.",
      axes: { pattern: 1 },
    },
    {
      t: "Experience can arise locally, in the electrical waves around active neurons, without the whole brain joining in.",
      why: "Yes means a small patch of brain activity can be enough. No means experience needs widespread brain regions working together.",
      axes: { local: 1 },
    },
    {
      t: "A computer made of ordinary chips could never be conscious, however well it was programmed.",
      why: "Yes means the right program isn’t enough; the physical stuff matters. No means a computer might one day be conscious.",
      axes: { machine: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-electromagnetic-field"] = {
    name: "Electromagnetic Field",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside electromagnetic field theories.",
    areas: [
    { key: "ephaptic-coupling", name: "Ephaptic Coupling",
      tagline: "Neurons whisper through electric fields.",
      url: "https://loc.closertotruth.com/theory/ephaptic-coupling" },
    { key: "zhang-s-long-distance-light-speed-telecommunications", name: "Zhang’s Long-Distance Light-Speed Telecommunications",
      tagline: "The brain syncs itself at light speed.",
      url: "https://loc.closertotruth.com/theory/zhang-s-long-distance-light-speed-telecommunications" },
    { key: "ambron-s-local-field-potentials-and-electromagnetic-waves", name: "Ambron’s Local Field Potentials and Electromagnetic Waves",
      tagline: "Awareness rides on waves around neurons.",
      url: "https://loc.closertotruth.com/theory/ambron-s-local-field-potentials-and-electromagnetic-waves" },
    { key: "hunt-and-schooler-s-general-resonance-theory", name: "Hunt and Schooler’s General Resonance Theory",
      tagline: "Consciousness arises when things resonate in sync.",
      url: "https://loc.closertotruth.com/theory/hunt-and-schooler-s-general-resonance-theory" },
    { key: "jones-s-electromagnetic-fields", name: "Jones’s Electromagnetic Fields",
      tagline: "Your mind is a field your brain generates.",
      url: "https://loc.closertotruth.com/theory/jones-s-electromagnetic-fields" },
    { key: "llinas-s-mindness-state-of-oscillations", name: "Llinás’s Mindness State of Oscillations",
      tagline: "Oscillating neurons create the mind state.",
      url: "https://loc.closertotruth.com/theory/llinas-s-mindness-state-of-oscillations" },
    { key: "mcfadden-s-conscious-electromagnetic-information-theory", name: "McFadden’s Conscious Electromagnetic Information Theory",
      tagline: "Information in the brain’s field is the mind.",
      url: "https://loc.closertotruth.com/theory/mcfadden-s-conscious-electromagnetic-information-theory" },
    { key: "pockett-s-conscious-and-non-conscious-patterns", name: "Pockett’s Conscious and Non-Conscious Patterns",
      tagline: "Only certain field patterns feel like anything.",
      url: "https://loc.closertotruth.com/theory/pockett-s-conscious-and-non-conscious-patterns" },
    { key: "singer-and-melloni-s-large-scale-synchrony", name: "Singer and Melloni’s Large-Scale Synchrony",
      tagline: "Consciousness is the whole brain syncing up.",
      url: "https://loc.closertotruth.com/theory/singer-and-melloni-s-large-scale-synchrony" },
    { key: "becker-s-analog-body-electric", name: "Becker’s Analog Body Electric",
      tagline: "Slow electric currents through the nervous system unify experience.",
      url: "https://loc.closertotruth.com/theory/becker-s-analog-body-electric", review: true },
    { key: "fingelkurts-and-fingelkurts-s-operational-architectonics", name: "Fingelkurts and Fingelkurts’s Operational Architectonics",
      tagline: "Brain field patterns and moments of mind share one structure.",
      url: "https://loc.closertotruth.com/theory/fingelkurts-and-fingelkurts-s-operational-architectonics", review: true },
    { key: "miller-s-brain-waves-analog-organization-of-cortex", name: "Miller’s Brain Waves’ Analog Organization of Cortex",
      tagline: "Brain waves big enough to unify the cortex bring awareness.",
      url: "https://loc.closertotruth.com/theory/miller-s-brain-waves-analog-organization-of-cortex", review: true }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
