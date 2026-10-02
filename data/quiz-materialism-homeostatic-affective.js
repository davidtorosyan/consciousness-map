/* The Homeostatic & Affective quiz: an axis quiz, like data/quiz-idealisms.js.
   15 theories LOC lists under Materialism > Homeostatic & Affective. They
   share a picture of the brain as a living, self-regulating system; the 12
   axes cover where they split: raw feeling as the root, perception as
   prediction, the self as the brain tracking the body, energy and entropy,
   self-maintaining systems, memory, self-generated rhythms, fixing errors
   in control, attention, layers of feeling and thought, and whether a
   machine running the right loop could be conscious. Profiles carry each
   theory's justified rejections as well as its signature. Checked by
   tools/eval-quiz.js and a blind role-play of named proponents
   (tools/eval-thinkers-materialism-homeostatic-affective.json). */
(function () {
  "use strict";
  var axes = [
    { key: "affect", claim: "Raw feeling is the root of all consciousness",
      yes: "feeling is the root of awareness", no: "feeling is one kind of experience among many" },
    { key: "predict", claim: "What you perceive is mostly your brain’s prediction",
      yes: "perception is the brain’s best guess", no: "perception is driven by the senses" },
    { key: "body", claim: "Your sense of self comes from the brain tracking your body",
      yes: "the self is the brain’s read on the body", no: "the self comes from elsewhere" },
    { key: "energy", claim: "Consciousness is how the brain’s physical energy is organized",
      yes: "consciousness is organized energy", no: "consciousness is information, whatever the energy" },
    { key: "entropy", claim: "Richer experience comes from freer, more disorderly brain activity",
      yes: "richer minds come from freer brain activity", no: "richer minds come from more ordered brain activity" },
    { key: "selforg", claim: "A self appears where a system keeps itself going",
      yes: "selves are systems keeping themselves going", no: "keeping itself going isn’t what makes a self" },
    { key: "memory", claim: "Consciousness exists to remember the past and imagine the future",
      yes: "consciousness is for remembering", no: "consciousness is for the present moment" },
    { key: "rhythms", claim: "The brain runs on its own rhythms, and input only adjusts them",
      yes: "the brain drives itself from within", no: "the brain mostly responds to input" },
    { key: "control", claim: "Consciousness appears when the brain must fix errors in reaching its goals",
      yes: "consciousness comes in to fix errors", no: "consciousness is there whether or not things go wrong" },
    { key: "attention", claim: "Attention is what makes something conscious",
      yes: "attention makes things conscious", no: "experience can happen without attention" },
    { key: "layers", claim: "Consciousness has two layers: feeling below, thinking above",
      yes: "consciousness has a layer of feeling and a layer of thought", no: "consciousness is one kind of thing" },
    { key: "machine", claim: "A machine running the right loop could be conscious",
      yes: "a machine could be conscious", no: "only living things are conscious" },
  ];

  var profiles = {
    "budsons-consciousness-as-a-memory-system":                         { affect: -1, memory: 2, control: -1 },
    "buzsaki-s-neural-syntax-and-self-caused-rhythms":                  { predict: 1, memory: 1, rhythms: 2 },
    "carhart-harris-s-entropic-brain-hypothesis":                       { predict: 1, entropy: 2, layers: 1 },
    "damasio-s-homeostatic-feelings-and-emergence-of-consciousness":    { affect: 2, body: 2, selforg: 1, layers: 1, machine: -1 },
    "deacon-s-self-organized-constraint-and-emergence-of-self":         { selforg: 2, machine: -1 },
    "entropic-theories":                                                { energy: 2, entropy: 1, selforg: 1 },
    "friston-s-free-energy-principle-and-active-inference":             { predict: 2, entropy: -1, selforg: 2, energy: -1, machine: 1 },
    "mansell-s-perceptual-control-theory":                              { predict: -1, control: 2 },
    "marchetti-s-attention-based-theory-of-consciousness":              { energy: 1, attention: 2 },
    "pepperell-s-organization-of-energy":                               { predict: -1, energy: 2, machine: -2 },
    "pereira-s-sentience":                                              { affect: 1, body: 1, layers: 2, machine: -1 },
    "predictive-theories-top-down":                                     { predict: 2, energy: -1, rhythms: 1 },
    "sebastian-s-predictive-machine":                                   { predict: 2, machine: 2 },
    "seth-s-beast-machine-theory":                                      { affect: 1, predict: 2, body: 2, machine: -2 },
    "solms-s-affect-as-the-hidden-spring-of-consciousness":             { affect: 2, predict: 1, body: 1, memory: -1, control: 1, machine: 1 },
  };

  var questions = [
    {
      t: "Every conscious experience is built on raw feeling, like hunger, fear or comfort.",
      why: "Yes means feeling is the root that seeing, thinking and remembering grow from. No means feeling is just one kind of experience among many.",
      axes: { affect: 1 },
    },
    {
      t: "What you perceive is mostly your brain’s prediction, with your senses only correcting it.",
      why: "Yes means the brain guesses first and the senses check the guess. No means perception is mainly driven by what comes in through the senses.",
      axes: { predict: 1 },
    },
    {
      t: "Your sense of being you comes from your brain keeping track of your body’s inner state.",
      why: "Heartbeat, breathing, temperature, chemistry. Yes means the self is built on the brain’s ongoing read of the body. No means the self comes from something else.",
      axes: { body: 1 },
    },
    {
      t: "Consciousness is a matter of how the brain’s physical energy is organized.",
      why: "Yes means experience depends on real energy flowing in a certain pattern. No means what matters is the information processed, whatever the energy behind it.",
      axes: { energy: 1 },
    },
    {
      t: "The richness of your experience tracks how varied and unconstrained your brain activity is.",
      why: "Yes means looser, more varied brain activity gives a richer, more flexible mind, as in dreams or psychedelic states. No means richer experience comes from more ordered activity.",
      axes: { entropy: 1 },
    },
    {
      t: "A self appears when a system keeps itself going, holding its own shape against falling apart.",
      why: "Like a flame or a living cell maintaining itself. Yes means that self-maintenance is what a self is. No means self-maintenance alone doesn’t make a self.",
      axes: { selforg: 1 },
    },
    {
      t: "Consciousness exists mainly so you can remember your past and imagine your future.",
      why: "Yes means its main job is reliving and planning, not just reacting. No means consciousness is mainly about the present moment.",
      axes: { memory: 1 },
    },
    {
      t: "Your brain generates its own rhythms, and the outside world only adjusts them.",
      why: "Yes means the brain is driven from within, and incoming signals tune activity that is already going. No means brain activity is mostly a response to input.",
      axes: { rhythms: 1 },
    },
    {
      t: "Consciousness kicks in when your brain has to fix errors in reaching what it is aiming for.",
      why: "Yes means routine, well-working control runs unconsciously, and awareness appears when it must adjust or reorganize. No means consciousness is there whether or not anything goes wrong.",
      axes: { control: 1 },
    },
    {
      t: "Attention is what makes something conscious.",
      why: "Yes means whatever attention focuses on becomes experience, and the rest stays dark. No means you can experience things without attending to them.",
      axes: { attention: 1 },
    },
    {
      t: "Consciousness has two layers: basic feeling underneath, and thinking on top.",
      why: "Yes means raw sentience and reflective awareness are different levels, one built on the other. No means consciousness is all one kind of thing.",
      axes: { layers: 1 },
    },
    {
      t: "A machine running the right loop of predicting and correcting could be conscious.",
      why: "Yes means the right process is enough, whatever it runs on. No means consciousness needs a living body with something at stake.",
      axes: { machine: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-homeostatic-affective"] = {
    name: "Homeostatic & Affective",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside homeostatic and affective materialism.",
    areas: [
    { key: "budsons-consciousness-as-a-memory-system", name: "Budson’s Consciousness as a Memory System",
      tagline: "Consciousness exists to remember the past.",
      url: "https://loc.closertotruth.com/theory/budsons-consciousness-as-a-memory-system" },
    { key: "buzsaki-s-neural-syntax-and-self-caused-rhythms", name: "Buzsáki’s Neural Syntax and Self-Caused Rhythms",
      tagline: "The brain makes its own rhythms to run on.",
      url: "https://loc.closertotruth.com/theory/buzsaki-s-neural-syntax-and-self-caused-rhythms" },
    { key: "carhart-harris-s-entropic-brain-hypothesis", name: "Carhart-Harris’s Entropic Brain Hypothesis",
      tagline: "Richer minds are brains running hotter.",
      url: "https://loc.closertotruth.com/theory/carhart-harris-s-entropic-brain-hypothesis" },
    { key: "damasio-s-homeostatic-feelings-and-emergence-of-consciousness", name: "Damasio’s Homeostatic Feelings and Emergence of Consciousness",
      tagline: "Feelings about the body came first.",
      url: "https://loc.closertotruth.com/theory/damasio-s-homeostatic-feelings-and-emergence-of-consciousness" },
    { key: "deacon-s-self-organized-constraint-and-emergence-of-self", name: "Deacon’s Self-Organized Constraint and Emergence of Self",
      tagline: "A self appears when a system holds itself together.",
      url: "https://loc.closertotruth.com/theory/deacon-s-self-organized-constraint-and-emergence-of-self" },
    { key: "entropic-theories", name: "Entropic Theories",
      tagline: "Minds run on the physics of energy flow.",
      url: "https://loc.closertotruth.com/theory/entropic-theories" },
    { key: "friston-s-free-energy-principle-and-active-inference", name: "Friston’s Free-Energy Principle and Active Inference",
      tagline: "The brain is a prediction machine avoiding surprise.",
      url: "https://loc.closertotruth.com/theory/friston-s-free-energy-principle-and-active-inference" },
    { key: "mansell-s-perceptual-control-theory", name: "Mansell’s Perceptual Control Theory",
      tagline: "Awareness appears where the brain fixes its errors.",
      url: "https://loc.closertotruth.com/theory/mansell-s-perceptual-control-theory" },
    { key: "marchetti-s-attention-based-theory-of-consciousness", name: "Marchetti’s Attention-Based Theory",
      tagline: "Attention directs the energy that becomes awareness.",
      url: "https://loc.closertotruth.com/theory/marchetti-s-attention-based-theory-of-consciousness" },
    { key: "pepperell-s-organization-of-energy", name: "Pepperell’s Organization of Energy",
      tagline: "It’s how the brain’s energy is organized.",
      url: "https://loc.closertotruth.com/theory/pepperell-s-organization-of-energy" },
    { key: "pereira-s-sentience", name: "Pereira’s Sentience",
      tagline: "Feeling comes in two layers.",
      url: "https://loc.closertotruth.com/theory/pereira-s-sentience" },
    { key: "predictive-theories-top-down", name: "Predictive Theories (Top-Down)",
      tagline: "You see what your brain expects to see.",
      url: "https://loc.closertotruth.com/theory/predictive-theories-top-down" },
    { key: "sebastian-s-predictive-machine", name: "Sebastian’s Predictive Machine",
      tagline: "A loop that predicts the world, over and over.",
      url: "https://loc.closertotruth.com/theory/sebastian-s-predictive-machine" },
    { key: "seth-s-beast-machine-theory", name: "Seth’s “Beast Machine” Theory",
      tagline: "Your brain predicts your body, and that’s you.",
      url: "https://loc.closertotruth.com/theory/seth-s-beast-machine-theory" },
    { key: "solms-s-affect-as-the-hidden-spring-of-consciousness", name: "Solms’s Affect as the Hidden Spring of Consciousness",
      tagline: "Feeling is the root of all awareness.",
      url: "https://loc.closertotruth.com/theory/solms-s-affect-as-the-hidden-spring-of-consciousness" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
