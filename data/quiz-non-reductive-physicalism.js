/* The Non-Reductive Physicalism quiz: an axis quiz, like data/quiz-idealisms.js.
   9 theories LOC lists under Non-Reductive Physicalism. All agree people are
   wholly physical yet the mind isn't reduced away; they differ on how. LOC
   lists them flat. 10 axes cover the real divides: mind acting down on the
   brain, new basic principles for mind, physicalism without a finished
   theory, lived experience as revealing what physics leaves out, abstract
   patterns as real, brain science as the main road, plus signatures (the
   brain's own background activity, settling into one stable pattern, a
   one-to-one match between experiences and brain processes, life after
   death for a wholly physical person). Profiles carry each theory's
   justified rejections as well as its signature. Checked by
   tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "topdown", claim: "The mind can change what brain cells do",
      yes: "the mind acts down on the brain", no: "causes run only from the bottom up" },
    { key: "principles", claim: "Mind needs its own basic principles alongside physics",
      yes: "mind needs its own basic principles", no: "no new basic principles are needed" },
    { key: "notheory", claim: "Mind can be physical with no theory ever explaining how",
      yes: "mind is physical even if no theory explains how", no: "a physical view owes us a theory of how" },
    { key: "experience", claim: "Lived experience shows real features physics leaves out",
      yes: "lived experience shows what physics leaves out", no: "physical science can describe everything real" },
    { key: "abstract", claim: "Abstract patterns are real and shape how minds work",
      yes: "abstract patterns are real and shape minds", no: "only concrete physical things do any work" },
    { key: "brain", claim: "Brain science is the main road to understanding consciousness",
      yes: "brain science is the main road in", no: "philosophy has to lead the way" },
    { key: "background", claim: "Consciousness comes from the brain’s own ongoing activity",
      yes: "consciousness comes from the brain’s ongoing activity", no: "consciousness comes from responding to the world" },
    { key: "settle", claim: "Each conscious moment is the brain settling into one stable pattern",
      yes: "each moment is the brain settling into one pattern", no: "experience is a continuous flow" },
    { key: "match", claim: "Each kind of experience matches exactly one kind of brain process",
      yes: "each experience matches one kind of brain process", no: "the same experience can arise in many ways" },
    { key: "afterlife", claim: "A wholly physical person could live again after death",
      yes: "a physical person could live again after death", no: "the body’s death is the end" },
  ];

  var profiles = {
    "cai-and-cai-s-canxian":                            { principles: 2, notheory: -1, experience: 1, topdown: 2 },
    "ellis-s-strong-emergence-and-top-down-causation":  { topdown: 2, abstract: 2, brain: 1, match: -1 },
    "heraths-state-space-selection-and-the-sentience-factor": { settle: 2, brain: 2, principles: 1, notheory: -1 },
    "maxwell-s-unique-matching-theory":                 { experience: 2, match: 2, brain: -1 },
    "murphy-s-non-reductive-physicalism":               { topdown: 2, afterlife: 2, principles: -1, brain: 1, match: -1 },
    "nagasawa-s-nontheoretical-physicalism":            { notheory: 2, experience: 1, principles: -1, brain: -1 },
    "northoff-s-non-reductive-neurophilosophy":         { background: 2, brain: 2, notheory: -1, principles: -1 },
    "sanfey-s-abstract-realism":                        { experience: 1, notheory: -1, topdown: 1 },
    "van-inwagen-s-christian-materialism-and-the-resurrection-of-the-dead": { afterlife: 2, notheory: 1, abstract: -1, brain: -1 },
  };

  var questions = [
    {
      t: "Your mind can genuinely change what your brain cells do, not only the other way round.",
      why: "Yes means higher levels, like thoughts and plans, have causal power of their own over the parts beneath them. No means all the real causing happens at the level of cells and molecules.",
      axes: { topdown: 1 },
    },
    {
      t: "To explain consciousness, science will need new basic principles about mind, alongside those of physics.",
      why: "Yes means mind fits in one physical world, but only once we add principles of its own. No means no new basic principles are needed.",
      axes: { principles: 1 },
    },
    {
      t: "The mind can be fully physical even if no theory will ever explain how.",
      why: "Yes means physicalism can be true without anyone being able to spell it out. No means a physical view of mind owes us an actual account of how it works.",
      axes: { notheory: 1 },
    },
    {
      t: "Lived experience reveals real features of the world that physical science leaves out.",
      why: "Yes means colours as seen, or pain as felt, are real and missing from physics’ description of the same world. No means science can, in principle, describe everything that’s real.",
      axes: { experience: 1 },
    },
    {
      t: "Abstract things, like patterns, numbers or plans, play a real part in how minds work.",
      why: "Yes means some of what shapes a mind isn’t just matter in motion but abstract structure. No means only concrete physical things ever make a difference.",
      axes: { abstract: 1 },
    },
    {
      t: "Brain science is the main road to understanding consciousness.",
      why: "Yes means the answers will come mostly from studying the living brain. No means the key questions are philosophical, and brain data alone won’t settle them.",
      axes: { brain: 1 },
    },
    {
      t: "Consciousness comes mainly from the brain’s own restless background activity, more than from its responses to what comes in.",
      why: "The brain is never idle; it hums with activity even at rest. Yes means that ongoing activity is where consciousness starts. No means consciousness comes mainly from processing what the senses bring in.",
      axes: { background: 1 },
    },
    {
      t: "Each conscious moment is the brain settling into one stable pattern, out of many possible ones.",
      why: "Picture the brain as a landscape of possible states, with each experience one pattern locking in. No means experience isn’t a series of settled patterns like that.",
      axes: { settle: 1 },
    },
    {
      t: "Each kind of experience goes with exactly one kind of brain process, matched one to one.",
      why: "Yes means for every way things can feel there is a single matching brain process, and the two always go together. No means the same experience could arise from many different physical arrangements.",
      axes: { match: 1 },
    },
    {
      t: "Even if you are a wholly physical being, you could live again after death.",
      why: "Yes means a physical person could be raised or remade, still the same person. No means when the body dies, the person is gone for good.",
      axes: { afterlife: 1 },
    },
  ];

  window.QUIZ_DATA.drill["non-reductive-physicalism"] = {
    name: "Non-Reductive Physicalism",
    color: "#E4822D",
    categoryId: "non-reductive-physicalism",
    kicker: "A QUIZ · NON-REDUCTIVE PHYSICALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside non-reductive physicalism.",
    areas: [
    { key: "cai-and-cai-s-canxian", name: "Cai and Cai’s Canxian",
      tagline: "One physical world, with basic principles for mind.",
      url: "https://loc.closertotruth.com/theory/cai-and-cai-s-canxian" },
    { key: "ellis-s-strong-emergence-and-top-down-causation", name: "Ellis’s Strong Emergence and Top-Down Causation",
      tagline: "The mind genuinely pushes back down on the brain.",
      url: "https://loc.closertotruth.com/theory/ellis-s-strong-emergence-and-top-down-causation" },
    { key: "heraths-state-space-selection-and-the-sentience-factor", name: "Herath's State-Space Selection and the Sentience Factor",
      tagline: "Each conscious moment is one stable brain pattern.",
      url: "https://loc.closertotruth.com/theory/heraths-state-space-selection-and-the-sentience-factor" },
    { key: "maxwell-s-unique-matching-theory", name: "Maxwell’s Unique-Matching Theory",
      tagline: "Science and lived experience must match, both real.",
      url: "https://loc.closertotruth.com/theory/maxwell-s-unique-matching-theory" },
    { key: "murphy-s-non-reductive-physicalism", name: "Murphy’s Non-Reductive Physicalism",
      tagline: "Fully physical humans, with irreducible higher capacities.",
      url: "https://loc.closertotruth.com/theory/murphy-s-non-reductive-physicalism" },
    { key: "nagasawa-s-nontheoretical-physicalism", name: "Nagasawa’s Nontheoretical Physicalism",
      tagline: "All is physical, yet some physical facts escape every theory.",
      url: "https://loc.closertotruth.com/theory/nagasawa-s-nontheoretical-physicalism" },
    { key: "northoff-s-non-reductive-neurophilosophy", name: "Northoff’s Non-Reductive Neurophilosophy",
      tagline: "Consciousness grows from the brain’s background activity.",
      url: "https://loc.closertotruth.com/theory/northoff-s-non-reductive-neurophilosophy" },
    { key: "sanfey-s-abstract-realism", name: "Sanfey’s Abstract Realism",
      tagline: "Consciousness fuses two clashing time perspectives into one moment.",
      url: "https://loc.closertotruth.com/theory/sanfey-s-abstract-realism" },
    { key: "van-inwagen-s-christian-materialism-and-the-resurrection-of-the-dead", name: "Van Inwagen’s Christian Materialism and Resurrection of the Dead",
      tagline: "Entirely material beings, still raised to new life.",
      url: "https://loc.closertotruth.com/theory/van-inwagen-s-christian-materialism-and-the-resurrection-of-the-dead" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
