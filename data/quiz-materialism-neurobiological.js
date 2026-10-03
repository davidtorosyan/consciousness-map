/* The Neurobiological quiz: an axis quiz, like data/quiz-idealisms.js.
   12 theories LOC lists under Materialism > Neurobiological. All look for
   consciousness in the workings of the brain; the 11 axes cover where they
   split: experience as real, reduction to brain science, emergence, a
   minimal neural correlate, signals looping between areas, circuits
   selected like species, the brain's restless background activity,
   attention, whether a computer could be conscious, privacy of experience,
   and free will. Profiles carry each theory's justified rejections as
   well as its signature. Checked by tools/eval-quiz.js and a blind
   role-play of named proponents
   (tools/eval-thinkers-materialism-neurobiological.json). */
(function () {
  "use strict";
  var axes = [
    { key: "real", claim: "Experience is real and can’t be explained away",
      yes: "experience is undeniably real", no: "experience is a kind of model or story" },
    { key: "reduce", claim: "Experience will turn out to be nothing but brain activity",
      yes: "experience reduces to brain activity", no: "experience is a real feature of its own, caused by the brain" },
    { key: "emerge", claim: "Mind is an emergent property of brain systems",
      yes: "mind emerges from brain systems as a whole", no: "mind is found in the parts" },
    { key: "ncc", claim: "Each experience has a minimal, specific pattern of brain activity",
      yes: "each experience has its own neural signature", no: "experience belongs to the brain as a whole" },
    { key: "loops", claim: "Consciousness needs signals looping back between brain areas",
      yes: "consciousness takes loops of feedback", no: "a single sweep of activity can be enough" },
    { key: "selection", claim: "Brain circuits compete, and the winners are selected",
      yes: "the brain works by selection, like evolution", no: "the brain works by instruction, not selection" },
    { key: "background", claim: "The brain’s restless background activity is where experience begins",
      yes: "experience begins in the brain’s own background activity", no: "experience begins with responses to the world" },
    { key: "attention", claim: "Attention is what makes something conscious",
      yes: "attention makes things conscious", no: "experience overflows attention" },
    { key: "machine", claim: "A computer running the right program could be conscious",
      yes: "the right program could be conscious", no: "only biology like ours makes consciousness" },
    { key: "shared", claim: "Two brains could share one experience",
      yes: "experiences could be shared brain to brain", no: "every experience is private to its owner" },
    { key: "agent", claim: "You are a real agent who makes genuine choices",
      yes: "you genuinely choose", no: "biology and circumstance decide everything" },
  ];

  var profiles = {
    "brain-circuits-and-cycles-theories":                         { ncc: -1, loops: 2, background: 1 },
    "crick-and-koch-s-neural-correlates-of-consciousness":        { reduce: 2, ncc: 2, attention: -1 },
    "bach-s-cortical-conductor-theory":                           { real: -1, attention: 2, machine: 2 },
    "block-s-biological-reductionism":                            { real: 2, reduce: 2, attention: -2, machine: -1 },
    "bunge-s-emergent-materialism":                               { real: 1, emerge: 2, machine: -1 },
    "edelman-s-neural-darwinism-and-reentrant-neural-circuitry":  { loops: 2, selection: 2, reduce: 1 },
    "hirstein-s-mindmelding":                                     { reduce: 1, shared: 2 },
    "mitchell-s-free-agents":                                     { emerge: 1, machine: -1, agent: 2 },
    "northoff-s-temporo-spatial-sentience":                       { ncc: -1, background: 2 },
    "prinz-s-neurofunctionalism-attention-engenders-experience":  { ncc: 1, attention: 2 },
    "sapolsky-s-hard-incompatibilism":                            { reduce: 2, agent: -2, emerge: 1 },
    "searle-s-biological-naturalism":                             { real: 2, reduce: -1, emerge: 1, ncc: -1, machine: -2, shared: -1 },
  };

  var questions = [
    {
      t: "Conscious experience is undeniably real; no theory can explain it away.",
      why: "Yes means whatever science finds, the felt quality of experience is a real fact to be explained. No means experience may be more like a model or story the brain tells itself.",
      axes: { real: 1 },
    },
    {
      t: "Experience will turn out to be nothing but brain activity, the way heat is nothing but moving molecules.",
      why: "Yes means once neuroscience is done, experience will be fully identified with brain processes. No means experience is a real feature caused by the brain but not the same thing as its activity.",
      axes: { reduce: 1 },
    },
    {
      t: "The mind is an emergent property of brain systems, something the whole has that its parts don’t.",
      why: "Like wetness belongs to water but not to single molecules. No means the mind is found in particular parts and their activity.",
      axes: { emerge: 1 },
    },
    {
      t: "For each experience there’s a minimal, specific pattern of brain activity that matches it exactly.",
      why: "Yes means the way forward is to pin down that exact neural signature for each experience. No means experience belongs to the brain’s activity as a whole.",
      axes: { ncc: 1 },
    },
    {
      t: "Consciousness needs signals looping back and forth between brain areas, not just flowing one way.",
      why: "Yes means feedback loops and rhythmic cycles of activity are essential. No means a single forward sweep of activity can be enough.",
      axes: { loops: 1 },
    },
    {
      t: "Brain circuits compete like species in evolution, and experience selects the ones that win.",
      why: "Yes means the brain develops and works by selection among many variants. No means the brain is shaped more by instruction, like a program being written.",
      axes: { selection: 1 },
    },
    {
      t: "Experience begins in the brain’s own restless background activity, not just in its responses to the world.",
      why: "Even at rest the brain hums with activity in time and space. Yes means that hum is where sentience starts. No means experience begins with how the brain responds to input.",
      axes: { background: 1 },
    },
    {
      t: "You only experience something when your attention picks it up.",
      why: "Yes means attention is what turns brain signals into experience. No means you can experience more than you attend to.",
      axes: { attention: 1 },
    },
    {
      t: "A computer running the right program could be conscious.",
      why: "Yes means the right organization is enough, whatever it runs on. No means consciousness needs the biology of real brains, or something with the same physical powers.",
      axes: { machine: 1 },
    },
    {
      t: "Two brains, properly linked, could share one and the same experience.",
      why: "Yes means experiences aren’t necessarily private: with the right connection, your experience could become mine. No means every experience belongs to just one subject.",
      axes: { shared: 1 },
    },
    {
      t: "You are a real agent who makes genuine choices.",
      why: "Yes means organisms act on reasons and their choices are their own, even in a physical world. No means your genes, brain and history fully decide what you do.",
      axes: { agent: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-neurobiological"] = {
    name: "Neurobiological",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside neurobiological materialism.",
    areas: [
    { key: "brain-circuits-and-cycles-theories", name: "Brain Circuits and Cycles Theories",
      tagline: "Loops and rhythms in brain circuits.",
      url: "https://loc.closertotruth.com/theory/brain-circuits-and-cycles-theories" },
    { key: "crick-and-koch-s-neural-correlates-of-consciousness", name: "Crick and Koch’s Neural Correlates of Consciousness",
      tagline: "Find the exact brain activity, find the mind.",
      url: "https://loc.closertotruth.com/theory/crick-and-koch-s-neural-correlates-of-consciousness" },
    { key: "bach-s-cortical-conductor-theory", name: "Bach’s Cortical Conductor Theory",
      tagline: "A conductor in the brain picks what you notice.",
      url: "https://loc.closertotruth.com/theory/bach-s-cortical-conductor-theory" },
    { key: "block-s-biological-reductionism", name: "Block’s Biological Reductionism",
      tagline: "Experience is real — and it’s biology.",
      url: "https://loc.closertotruth.com/theory/block-s-biological-reductionism" },
    { key: "bunge-s-emergent-materialism", name: "Bunge’s Emergent Materialism",
      tagline: "No separate mind-stuff, just precise brain science.",
      url: "https://loc.closertotruth.com/theory/bunge-s-emergent-materialism" },
    { key: "edelman-s-neural-darwinism-and-reentrant-neural-circuitry", name: "Edelman’s Neural Darwinism and Reentrant Neural Circuitry",
      tagline: "Brain circuits compete, and the winners think.",
      url: "https://loc.closertotruth.com/theory/edelman-s-neural-darwinism-and-reentrant-neural-circuitry" },
    { key: "hirstein-s-mindmelding", name: "Hirstein’s Mindmelding",
      tagline: "Minds could link up directly, brain to brain.",
      url: "https://loc.closertotruth.com/theory/hirstein-s-mindmelding" },
    { key: "mitchell-s-free-agents", name: "Mitchell’s Free Agents",
      tagline: "Free will is real, and fully physical.",
      url: "https://loc.closertotruth.com/theory/mitchell-s-free-agents" },
    { key: "northoff-s-temporo-spatial-sentience", name: "Northoff’s Temporo-Spatial Sentience",
      tagline: "The brain’s restless background activity feels.",
      url: "https://loc.closertotruth.com/theory/northoff-s-temporo-spatial-sentience" },
    { key: "prinz-s-neurofunctionalism-attention-engenders-experience", name: "Prinz’s Neurofunctionalism: Attention Engenders Experience",
      tagline: "Attention turns brain signals into experience.",
      url: "https://loc.closertotruth.com/theory/prinz-s-neurofunctionalism-attention-engenders-experience" },
    { key: "sapolsky-s-hard-incompatibilism", name: "Sapolsky’s Hard Incompatibilism",
      tagline: "Free will is an illusion; biology decides.",
      url: "https://loc.closertotruth.com/theory/sapolsky-s-hard-incompatibilism" },
    { key: "searle-s-biological-naturalism", name: "Searle’s Biological Naturalism",
      tagline: "Consciousness is biology, and it’s real.",
      url: "https://loc.closertotruth.com/theory/searle-s-biological-naturalism" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
