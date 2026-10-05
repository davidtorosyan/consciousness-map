/* The First-Order quiz: an axis quiz, like data/quiz-idealisms.js.
   9 theories LOC lists under Materialism / First-Order, three of them still
   under review at LOC (Carruthers, Dretske, Hill): experience needs no
   second layer of the brain watching the first. The axes cover where they
   part ways: direct contact with the world vs inner representation, feel
   fixed by what is represented, introspection finding only the world,
   seeing made conscious in the sensory brain itself, experience existing
   only for the system that has it, and mind-brain identity as a local fact
   rather than a necessary one. Profiles carry each theory's justified
   rejections as well as its signature. Checked by tools/eval-quiz.js. Blind role-play of its proponents:
   tools/eval-thinkers-materialism-first-order.json. */
(function () {
  "use strict";
  var axes = [
    { key: "direct", claim: "In perception you meet the world itself, with nothing in between",
      yes: "perception is direct contact with the world", no: "perception works through inner representations" },
    { key: "content", claim: "What an experience feels like is what it represents",
      yes: "how an experience feels is fixed by what it represents", no: "how an experience feels goes beyond what it represents" },
    { key: "transparent", claim: "Looking inward, you find only the world",
      yes: "looking inward, you find only the world", no: "you can notice features of experience itself" },
    { key: "local", claim: "Conscious seeing happens in the sensory brain itself",
      yes: "the sensory brain alone can make seeing conscious", no: "seeing is conscious when the rest of the mind can use it" },
    { key: "system", claim: "Experience exists only for the system that has it",
      yes: "experience exists only for the one who has it", no: "experience can be found from the outside" },
    { key: "contingent", claim: "Mind-brain identity is a local fact, not a necessary one",
      yes: "minds are brains here, but could have been otherwise", no: "the physical facts settle the mind everywhere" },
  ];

  var profiles = {
    "direct-perception-theory":                                { direct: 2, content: -1, transparent: 1 },
    "jackson-s-representationalism-and-the-knowledge-argument": { direct: -2, content: 2, transparent: 1, contingent: -2 },
    "lamme-s-recurrent-processing-theory":                     { direct: -1, local: 2, system: -1 },
    "t-w-clark-s-content-hypothesis":                          { direct: -2, content: 1, system: 2 },
    "transparency-theory":                                     { content: 1, transparent: 2 },
    "tye-s-contingentism":                                     { direct: -1, content: 2, transparent: 1, local: -1, contingent: 2 },
    "carruthers-first-order-representationalism":              { direct: -2, content: 1, local: -2 },
    "dretske-s-information-and-representationalism":           { direct: -1, content: 2, transparent: 2, local: -1 },
    "hills-representationalism-qualia-s-appearance-and-reality": { direct: -1, content: 2, transparent: -1 },
  };

  var questions = [
    {
      t: "When you see a tree, you are in direct contact with the tree itself, with no inner picture or representation in between.",
      why: "Yes means perceiving is an openness to the world itself. No means the brain builds a representation of the tree, and that is what you experience.",
      axes: { direct: 1 },
    },
    {
      t: "What an experience feels like is nothing more than what it presents the world as being like.",
      why: "Yes means the redness of seeing red is just the experience presenting something as red. No means experiences also have a feel of their own, over and above what they present.",
      axes: { content: 1 },
    },
    {
      t: "When you try to inspect your own experience, you find only the things experienced: colours, shapes and sounds out in the world.",
      why: "Yes means experience is like a clear window: you look through it, never at it. No means, if you look carefully, you can notice features of the experience itself.",
      axes: { transparent: 1 },
    },
    {
      t: "You can consciously see something even if it never reaches the parts of your brain that think, remember or report.",
      why: "Yes means the sensory brain alone, with signals looping back and forth inside it, makes seeing conscious. No means seeing becomes conscious only when it is available to thought, memory or report.",
      axes: { local: 1 },
    },
    {
      t: "Experience exists only for the system that has it. No outside observer could ever find it among the neurons.",
      why: "Yes means consciousness is real for the one who has it, but isn’t a further thing in the brain for anyone else to see. No means, in principle, scientists could find the experience itself by measuring the brain.",
      axes: { system: 1 },
    },
    {
      t: "In our world, experiences are brain states, but that’s a fact about our world, not a necessary truth; things could have been otherwise.",
      why: "Like water being H₂O: true here, but it took discovery, not logic, to learn it. No means the physical facts settle the facts about experience everywhere, as a matter of necessity.",
      axes: { contingent: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-first-order"] = {
    name: "First-Order",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside first-order theories.",
    areas: [
    { key: "direct-perception-theory", name: "Direct Perception Theory",
      tagline: "You see the world itself, directly.",
      url: "https://loc.closertotruth.com/theory/direct-perception-theory" },
    { key: "jackson-s-representationalism-and-the-knowledge-argument", name: "Jackson’s Representationalism and the Knowledge Argument",
      tagline: "What it’s like is what it represents.",
      url: "https://loc.closertotruth.com/theory/jackson-s-representationalism-and-the-knowledge-argument" },
    { key: "lamme-s-recurrent-processing-theory", name: "Lamme’s Recurrent Processing Theory",
      tagline: "Feedback loops in sensory areas make experience.",
      url: "https://loc.closertotruth.com/theory/lamme-s-recurrent-processing-theory" },
    { key: "t-w-clark-s-content-hypothesis", name: "T. W. Clark’s Content Hypothesis",
      tagline: "Consciousness is structured inner content.",
      url: "https://loc.closertotruth.com/theory/t-w-clark-s-content-hypothesis" },
    { key: "transparency-theory", name: "Transparency Theory",
      tagline: "Looking inward, you only find the world.",
      url: "https://loc.closertotruth.com/theory/transparency-theory" },
    { key: "tye-s-contingentism", name: "Tye’s Contingentism",
      tagline: "Mind equals brain here, but not everywhere.",
      url: "https://loc.closertotruth.com/theory/tye-s-contingentism" },
    { key: "carruthers-first-order-representationalism", name: "Carruthers’s First-Order Representationalism",
      tagline: "Perceptions are conscious when broadcast for thought and action.",
      url: "https://loc.closertotruth.com/theory/carruthers-first-order-representationalism", review: true },
    { key: "dretske-s-information-and-representationalism", name: "Dretske’s Information and Representationalism",
      tagline: "Experience is information about the world, ready for use.",
      url: "https://loc.closertotruth.com/theory/dretske-s-information-and-representationalism", review: true },
    { key: "hills-representationalism-qualia-s-appearance-and-reality", name: "Hill's Representationalism: Qualia’s Appearance and Reality",
      tagline: "Even qualia can seem other than they really are.",
      url: "https://loc.closertotruth.com/theory/hills-representationalism-qualia-s-appearance-and-reality", review: true }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
