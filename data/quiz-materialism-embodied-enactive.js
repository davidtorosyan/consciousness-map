/* The Embodied & Enactive quiz: an axis quiz, like data/quiz-idealisms.js.
   7 theories LOC lists under Materialism / Embodied & Enactive. They agree
   that minds belong to bodies acting in the world; the axes cover where
   they part ways: whether consciousness happens in the head or in engagement
   with the world, whether perception needs inner models, whether mind is
   continuous with life, whether experience is a sensorimotor skill, whether
   intentions make a physical difference, whether awareness is built from
   symbols, whether first-person study is essential, and mind as the gap
   between actual and possible. Profiles carry each theory's justified
   rejections as well as its signature. Checked by tools/eval-quiz.js. Blind role-play of its proponents:
   tools/eval-thinkers-materialism-embodied-enactive.json. */
(function () {
  "use strict";
  var axes = [
    { key: "world", claim: "Consciousness happens in engagement with the world, not inside the head",
      yes: "consciousness happens in engagement with the world", no: "consciousness happens inside the body or brain" },
    { key: "models", claim: "Perception works without inner models of the world",
      yes: "perception works without inner models", no: "perception relies on inner models" },
    { key: "life", claim: "Mind is continuous with life",
      yes: "wherever there is life, mind has begun", no: "mind is something more than being alive" },
    { key: "skill", claim: "Experience is a skill of moving and sensing",
      yes: "experience is a skill of moving and sensing", no: "experience is a state you are in" },
    { key: "cause", claim: "Conscious intentions make a physical difference",
      yes: "intentions make a real physical difference", no: "the body’s physics runs by itself" },
    { key: "symbol", claim: "Awareness is built from symbols",
      yes: "awareness is the body translating the world into symbols", no: "awareness comes before any symbols" },
    { key: "inside", claim: "First-person study of experience is essential",
      yes: "studying experience from the inside is essential", no: "the mind is best studied from the outside" },
    { key: "possible", claim: "Mind is the tension between the actual and the possible",
      yes: "mind is the gap between how things are and how they could be", no: "mind is something actually present" },
  ];

  var profiles = {
    "enactivism":                          { world: 2, models: 2, life: 1, skill: 1, symbol: -1, inside: 1 },
    "froese-s-irruption-theory":           { world: 1, models: 1, life: 1, cause: 2, symbol: -1, inside: 1 },
    "gibson-s-ecological-psychology":      { world: 1, models: 2, symbol: -2 },
    "noe-s-out-of-our-heads-theory":       { world: 2, models: 1, life: 1, skill: 2, symbol: -1 },
    "pretel-wilson-s-human-systems-theory": { possible: 2 },
    "thompson-s-mind-in-life":             { world: 1, models: 1, life: 2, cause: 1, inside: 2 },
    "vucolova-s-collapse-into-translation": { models: -1, symbol: 2 },
  };

  var questions = [
    {
      t: "Consciousness isn’t something happening inside your head. It’s something you do, in your active engagement with the world.",
      why: "Yes means experience is like dancing: it needs a partner, the world. No means it happens inside the body or brain, even if the world feeds it.",
      axes: { world: 1 },
    },
    {
      t: "Perceiving works without any inner picture or model of the world.",
      why: "Yes means you take in the world itself, directly, with nothing standing in for it. No means the brain or body builds some representation of what’s out there.",
      axes: { models: 1 },
    },
    {
      t: "Mind and life are continuous: wherever there’s a living body keeping itself going, mind has already begun.",
      why: "Yes means even a single cell makes sense of its world in a simple way. No means mind needs something beyond being alive.",
      axes: { life: 1 },
    },
    {
      t: "Seeing is a skill: experiencing something is knowing how it would change as you move.",
      why: "Yes means experience is an activity of moving and sensing, like feeling the shape of a bottle by handling it. No means experience is a state you are in, whatever you could do next.",
      axes: { skill: 1 },
    },
    {
      t: "Your conscious intentions make a real physical difference to what your body does, beyond what its physics would do on its own.",
      why: "Yes means your involvement as a subject changes the body’s activity in ways physics alone wouldn’t predict. No means the body’s physics runs by itself, and experience adds nothing extra.",
      axes: { cause: 1 },
    },
    {
      t: "Awareness happens when your body translates what it senses and does into symbols and meanings.",
      why: "Yes means experience is that act of translation. No means awareness comes first, before any symbols.",
      axes: { symbol: 1 },
    },
    {
      t: "A science of the mind needs careful first-person study of experience, not just outside observation.",
      why: "Yes means describing experience from the inside, through trained attention or meditation, is real data. No means the mind is best studied from the outside, through behaviour, bodies and environments.",
      axes: { inside: 1 },
    },
    {
      t: "What we call consciousness is really the tension between how things actually are and how they could be.",
      why: "Yes means mind is the gap between the actual and the possible, held together in a living system. No means mind is something actually present, not a gap.",
      axes: { possible: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-embodied-enactive"] = {
    name: "Embodied & Enactive",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside embodied and enactive views.",
    areas: [
    { key: "enactivism", name: "Enactivism",
      tagline: "Minds are made by bodies acting in the world.",
      url: "https://loc.closertotruth.com/theory/enactivism" },
    { key: "froese-s-irruption-theory", name: "Froese’s Irruption Theory",
      tagline: "Intentions irrupt into the body and move it.",
      url: "https://loc.closertotruth.com/theory/froese-s-irruption-theory" },
    { key: "gibson-s-ecological-psychology", name: "Gibson’s Ecological Psychology",
      tagline: "You see the world directly, ready for action.",
      url: "https://loc.closertotruth.com/theory/gibson-s-ecological-psychology" },
    { key: "noe-s-out-of-our-heads-theory", name: "Noë’s “Out of Our Heads” Theory",
      tagline: "Consciousness isn’t in your head.",
      url: "https://loc.closertotruth.com/theory/noe-s-out-of-our-heads-theory" },
    { key: "pretel-wilson-s-human-systems-theory", name: "Pretel-Wilson’s Human Systems Theory",
      tagline: "Mind is the gap between actual and possible.",
      url: "https://loc.closertotruth.com/theory/pretel-wilson-s-human-systems-theory" },
    { key: "thompson-s-mind-in-life", name: "Thompson’s Mind in Life",
      tagline: "Mind is what living bodies do.",
      url: "https://loc.closertotruth.com/theory/thompson-s-mind-in-life" },
    { key: "vucolova-s-collapse-into-translation", name: "Vucolova’s Collapse into Translation",
      tagline: "Awareness is the body translating the world.",
      url: "https://loc.closertotruth.com/theory/vucolova-s-collapse-into-translation" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
