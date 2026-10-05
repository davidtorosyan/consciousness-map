/* The Eliminative/Illusionism quiz: an axis quiz, like data/quiz-idealisms.js.
   11 theories LOC lists under Materialism / Eliminative/Illusionism, six
   of them still under review at LOC. Four of those share a result with a
   theory the quiz can't tell them from: Feyerabend and Irvine with
   Churchland, Kammerer with Humphrey, Ryle with Frankish. They
   agree that our ordinary picture of the mind is wrong; the axes cover
   what each says is wrong with it: everyday mental concepts as a false
   theory, the inner "what it's like" as an illusion, awareness as a model
   of attention, the self as a simulation, experience as prediction, and
   whether looking closely at experience exposes the illusion. Profiles
   carry each theory's justified rejections as well as its signature.
   Checked by tools/eval-quiz.js. Blind role-play of its proponents:
   tools/eval-thinkers-materialism-eliminative-illusionism.json. */
(function () {
  "use strict";
  var axes = [
    { key: "folk", claim: "Everyday ideas about the mind are a false theory",
      yes: "everyday ideas about the mind will be replaced", no: "beliefs and desires are real" },
    { key: "qualia", claim: "The inner “what it’s like” is an illusion",
      yes: "the inner glow of experience is an illusion", no: "the felt quality of experience is real" },
    { key: "attention", claim: "Awareness is the brain’s model of its own attention",
      yes: "awareness is the brain’s model of attention", no: "awareness is more than a model of attention" },
    { key: "self", claim: "The self is a simulation",
      yes: "the self is a simulation the brain runs", no: "there is a real self" },
    { key: "predict", claim: "Experience is the brain’s predictions",
      yes: "experience is the brain’s predictions", no: "experience is a readout of the senses" },
    { key: "looking", claim: "Looking closely at experience exposes the illusion",
      yes: "looking closely shows experience isn’t what it seems", no: "looking closely leaves the illusion in place" },
  ];

  var profiles = {
    "blackmore-s-it-s-all-models":                  { qualia: 2, self: 2, predict: 1, looking: 2 },
    "churchland-s-eliminative-materialism":         { folk: 2 },
    "frankish-s-illusionism":                       { folk: -1, qualia: 2, looking: -1 },
    "graziano-s-attention-schema-theory":           { qualia: 1, attention: 2 },
    "ostendorf-s-predictive-pattern-driven-interface": { qualia: 1, self: 2, predict: 2 },
    "dennett-s-illusionism":                        { folk: -1, qualia: 2, self: 1, predict: 1 },
    "humphrey-s-magical-compelling-user-illusion":  { qualia: 2, looking: -1 },
  };

  var questions = [
    {
      t: "Our everyday ideas about the mind, like beliefs and desires, are a flawed theory that brain science will replace.",
      why: "Yes means talk of believing and wanting will go the way of old, discarded theories in science. No means beliefs and desires are real, whatever brain science finds.",
      axes: { folk: 1 },
    },
    {
      t: "Your experiences are real brain events, but the special inner “what it’s like” quality they seem to have is an illusion.",
      why: "Yes means the brain represents its own states as having a private glow they don’t really have. No means that felt quality is real, even if it turns out to be a brain process.",
      axes: { qualia: 1 },
    },
    {
      t: "Your sense of being aware is your brain’s simplified model of its own attention.",
      why: "The brain keeps a rough sketch of the body to control it; on this view it keeps a rough sketch of its attention too, and that sketch is what you call awareness. No means awareness is more than such a model.",
      axes: { attention: 1 },
    },
    {
      t: "There is no real self. The “you” that seems to be having your experiences is a simulation the brain runs.",
      why: "Yes means the self is a useful construction, with nobody behind it. No means there really is a self, even if it is a physical one.",
      axes: { self: 1 },
    },
    {
      t: "What you experience is your brain’s best prediction of the world and body, not a readout of your senses.",
      why: "Yes means the senses mostly correct the brain’s guesses, and the guesses are what you experience. No means experience comes mainly from what the senses deliver.",
      axes: { predict: 1 },
    },
    {
      t: "Looking very closely at your own experience, for example in meditation, shows that it isn’t what it seems.",
      why: "Yes means careful attention can expose the illusions in how experience seems. No means the illusion stays in place however closely you look; only theory can reveal it.",
      axes: { looking: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-eliminative-illusionism"] = {
    name: "Eliminative/Illusionism",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside eliminativism and illusionism.",
    areas: [
    { key: "blackmore-s-it-s-all-models", name: "Blackmore’s “It’s All Models”",
      tagline: "It’s models all the way down.",
      url: "https://loc.closertotruth.com/theory/blackmore-s-it-s-all-models" },
    { key: "churchland-s-eliminative-materialism", name: "Churchland’s Eliminative Materialism",
      tagline: "Brain science will replace everyday talk of beliefs and desires.",
      url: "https://loc.closertotruth.com/theory/churchland-s-eliminative-materialism" },
    { key: "frankish-s-illusionism", name: "Frankish’s Illusionism",
      tagline: "Experience is real, but its glow is fake.",
      url: "https://loc.closertotruth.com/theory/frankish-s-illusionism" },
    { key: "graziano-s-attention-schema-theory", name: "Graziano’s Attention Schema Theory",
      tagline: "Awareness is your brain’s model of attention.",
      url: "https://loc.closertotruth.com/theory/graziano-s-attention-schema-theory" },
    { key: "ostendorf-s-predictive-pattern-driven-interface", name: "Ostendorf’s Predictive, Pattern-Driven Interface",
      tagline: "The self is a useful simulation.",
      url: "https://loc.closertotruth.com/theory/ostendorf-s-predictive-pattern-driven-interface" },
    { key: "dennett-s-illusionism", name: "Dennett’s Illusionism",
      tagline: "There are no qualia; experience isn’t what it seems.",
      url: "https://loc.closertotruth.com/theory/dennett-s-illusionism", review: true },
    { key: "feyerabends-revisable-disposable-mind", name: "Feyerabend's Revisable, Disposable Mind",
      tagline: "Experience is real; our words for it may be scrapped.",
      url: "https://loc.closertotruth.com/theory/feyerabends-revisable-disposable-mind", review: true,
      group: "churchland-s-eliminative-materialism" },
    { key: "humphrey-s-magical-compelling-user-illusion", name: "Humphrey’s Magical-Compelling User Illusion",
      tagline: "Experience is a magic show the brain stages for itself.",
      url: "https://loc.closertotruth.com/theory/humphrey-s-magical-compelling-user-illusion", review: true },
    { key: "kammerer-s-introspective-illusionism", name: "Kammerer’s Introspective Illusionism",
      tagline: "Introspection misleads us into thinking experience glows.",
      url: "https://loc.closertotruth.com/theory/kammerer-s-introspective-illusionism", review: true,
      group: "humphrey-s-magical-compelling-user-illusion" },
    { key: "irvine-s-scientific-eliminativism", name: "Irvine’s Scientific Eliminativism",
      tagline: "Science may do better without the word “consciousness”.",
      url: "https://loc.closertotruth.com/theory/irvine-s-scientific-eliminativism", review: true,
      group: "churchland-s-eliminative-materialism" },
    { key: "ryle-s-category-dissolution-of-inner-theater-consciousness", name: "Ryle’s Category-Dissolution of Inner-Theater Consciousness",
      tagline: "The inner theater is a category mistake, not a place.",
      url: "https://loc.closertotruth.com/theory/ryle-s-category-dissolution-of-inner-theater-consciousness", review: true,
      group: "frankish-s-illusionism" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
