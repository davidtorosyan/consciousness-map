/* The Higher-Order quiz: an axis quiz, like data/quiz-idealisms.js.
   7 theories LOC lists under Materialism / Higher-Order: the brain's
   representations of its own states (or of itself) make experience. The
   axes cover where they part ways: whether a perception must be represented
   by a further brain state, whether the brain tags perceptions as real,
   whether conscious feelings are cognitive reads on bodily states, whether
   the self is only a model, whether human consciousness needs symbols,
   whether experience's magic is the brain's own show, whether the mind is
   layers of simpler sub-systems, and whether competing, bound
   representations make experience. Profiles carry each theory's justified
   rejections as well as its signature. Checked by tools/eval-quiz.js. Blind role-play of its proponents:
   tools/eval-thinkers-materialism-higher-order.json. */
(function () {
  "use strict";
  var axes = [
    { key: "higher", claim: "A perception is conscious when the brain represents it",
      yes: "a perception is conscious when the brain represents it in turn", no: "a perception can be conscious on its own" },
    { key: "reality", claim: "Conscious perception is perception tagged as real",
      yes: "the brain tags some signals as real, and that makes them conscious", no: "telling real from imagined comes after consciousness" },
    { key: "emotion", claim: "Feelings are the brain’s cognitive read on the body",
      yes: "feelings are the brain’s read on what the body is doing", no: "feelings are built into the body’s own reactions" },
    { key: "self", claim: "The self is only a model",
      yes: "the self is a model the brain builds", no: "the self is real" },
    { key: "symbol", claim: "Human consciousness is built on symbols",
      yes: "symbols made human consciousness a new kind of thing", no: "human and animal experience are the same kind of thing" },
    { key: "show", claim: "The magic of experience is a show the brain puts on",
      yes: "experience’s magic is a show the brain puts on", no: "experience is just what it seems" },
    { key: "layers", claim: "The mind is layers of simpler sub-systems",
      yes: "the mind is layers of ever simpler sub-systems", no: "the mind is not built from layers of sub-systems" },
    { key: "compete", claim: "Experience is the winners of a competition among representations",
      yes: "experience is the winning, bound-together representations", no: "experience isn’t settled by competition" },
  ];

  var profiles = {
    "deacon-s-symbolic-communication-human-consciousness":          { self: -1, symbol: 2 },
    "humphrey-s-mental-representations-and-brain-attractors":       { higher: 1, symbol: -1, show: 2, self: 1 },
    "lau-s-perceptual-reality-monitoring-theory":                   { higher: 2, reality: 2 },
    "ledoux-s-higher-order-theory-of-emotional-consciousness":      { higher: 2, emotion: 2, symbol: 1 },
    "lycan-s-homuncular-functionalism":                             { higher: 2, symbol: -1, show: -1, layers: 2 },
    "metzinger-s-no-self-representational-theory-of-subjectivity":  { self: 2, symbol: -1, show: 1 },
    "thagard-s-neural-representation-binding-coherence-competition": { higher: -1, self: -1, symbol: -1, show: -1, layers: 1, compete: 2 },
  };

  var questions = [
    {
      t: "You’re conscious of seeing something only when another part of your brain represents that seeing: a perception about the perception.",
      why: "Yes means a perception the brain doesn’t register in this second way stays unconscious. No means a perception can be conscious on its own, without being represented again.",
      axes: { higher: 1 },
    },
    {
      t: "A perception becomes conscious when the brain tags it as real: out there now, not imagined or noise.",
      why: "Yes means the brain’s check on whether a signal reflects the world is what makes it conscious. No means telling real from imagined happens after something is already conscious.",
      axes: { reality: 1 },
    },
    {
      t: "A feeling like fear is the brain’s interpretation of what the body is doing, not the body’s reaction itself.",
      why: "Yes means the racing heart and freezing aren’t the fear; the fear is the brain’s conscious read on them. No means the feeling is built into the body’s reactions themselves.",
      axes: { emotion: 1 },
    },
    {
      t: "There is no self. What exists is a model of a self, built by the brain, that you can’t see as a model.",
      why: "Yes means the feeling of being someone is produced by the brain’s self-model, with no one behind it. No means the self is real, whatever it’s made of.",
      axes: { self: 1 },
    },
    {
      t: "Symbols and language made human consciousness a different kind of thing from the experience of other animals.",
      why: "Yes means our awareness was reorganized around meaning, not just extended. No means human and animal experience are the same kind of thing, differing in degree.",
      axes: { symbol: 1 },
    },
    {
      t: "The seemingly magical quality of experience is a show the brain puts on for itself.",
      why: "Yes means the vivid feel of sensation is something the brain produces that isn’t what it seems. No means experience is just what it seems to be, and needs no such special account.",
      axes: { show: 1 },
    },
    {
      t: "Your mind is built from layers of simpler sub-systems, each simpler than the one above, down to simple switches.",
      why: "Yes means a mind is a team of smaller, dumber agents, stacked in levels. No means this layered picture doesn’t capture how a mind is built.",
      axes: { layers: 1 },
    },
    {
      t: "Brain representations compete; the ones that win, bound together into a coherent whole, are what you experience.",
      why: "Yes means experience is decided by a contest among the brain’s representations. No means something other than such a competition decides what becomes conscious.",
      axes: { compete: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-higher-order"] = {
    name: "Higher-Order",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside higher-order theories.",
    areas: [
    { key: "deacon-s-symbolic-communication-human-consciousness", name: "Deacon’s Symbolic Communication (Human Consciousness)",
      tagline: "Symbols turned animal minds into human ones.",
      url: "https://loc.closertotruth.com/theory/deacon-s-symbolic-communication-human-consciousness" },
    { key: "humphrey-s-mental-representations-and-brain-attractors", name: "Humphrey’s Mental Representations and Brain Attractors",
      tagline: "Experience is the brain’s interpretation, not raw input.",
      url: "https://loc.closertotruth.com/theory/humphrey-s-mental-representations-and-brain-attractors" },
    { key: "lau-s-perceptual-reality-monitoring-theory", name: "Lau’s Perceptual Reality Monitoring Theory",
      tagline: "You’re aware of it when your brain stamps it “real”.",
      url: "https://loc.closertotruth.com/theory/lau-s-perceptual-reality-monitoring-theory" },
    { key: "ledoux-s-higher-order-theory-of-emotional-consciousness", name: "LeDoux’s Higher-Order Theory of Emotional Consciousness",
      tagline: "Feelings are the brain’s read on the body.",
      url: "https://loc.closertotruth.com/theory/ledoux-s-higher-order-theory-of-emotional-consciousness" },
    { key: "lycan-s-homuncular-functionalism", name: "Lycan’s Homuncular Functionalism",
      tagline: "Layers of tiny sub-minds make your mind.",
      url: "https://loc.closertotruth.com/theory/lycan-s-homuncular-functionalism" },
    { key: "metzinger-s-no-self-representational-theory-of-subjectivity", name: "Metzinger’s No-Self Representational Theory of Subjectivity",
      tagline: "There is no self — only a model of one.",
      url: "https://loc.closertotruth.com/theory/metzinger-s-no-self-representational-theory-of-subjectivity" },
    { key: "thagard-s-neural-representation-binding-coherence-competition", name: "Thagard’s Neural Representation, Binding, Coherence, Competition",
      tagline: "Four brain mechanisms compete into awareness.",
      url: "https://loc.closertotruth.com/theory/thagard-s-neural-representation-binding-coherence-competition" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
