/* The main quiz: positions on underlying questions, not one claim per family.

   axes      the questions the 11 families genuinely disagree on. Each has a
             claim, and short phrases for leaning toward it (yes) or away (no),
             used in the results summary and "how you lined up".
   profiles  where each family stands on each axis: 2 strongly agrees,
             1 leans agree, -1 leans disagree, -2 strongly disagrees; a
             missing axis means the family takes no stand on it.
   questions each measures one axis. axes: {axis: weight}; answering Yes
             moves you toward the sign of the weight, No away from it.
             (Questions that measured two axes at once turned out to push
             people the wrong way when they answered No; see eval-quiz.js.)

   Scoring (core.js): your position on an axis is the weighted average of your
   Yes(+1)/No(-1) answers on it. A family's match is the cosine similarity
   between your positions and its profile. tools/eval-quiz.js checks that
   every family's ideal respondent lands on that family. */
(function () {
  "use strict";
  var axes = [
    { key: "physical", claim: "The mind is entirely physical",
      yes: "the mind is entirely physical", no: "something about the mind is non-physical" },
    { key: "mind", claim: "Experience is a basic ingredient of reality",
      yes: "experience is one of reality\u2019s basic ingredients", no: "experience is built from something more basic" },
    { key: "deeper", claim: "Mind and matter are two sides of something deeper",
      yes: "mind and matter share a deeper source", no: "mind or matter is the bottom layer" },
    { key: "independent", claim: "The physical world exists independently of minds",
      yes: "the world exists without minds", no: "the world depends on mind" },
    { key: "causal", claim: "Thoughts cause things in their own right",
      yes: "thoughts cause things in their own right", no: "the neurons do all the causing" },
    { key: "explain", claim: "Brain science could fully explain experience",
      yes: "brain science can explain experience", no: "brain science leaves something out" },
    { key: "wide", claim: "Experience reaches all the way down to simple things",
      yes: "experience reaches down to atoms", no: "experience belongs to complex systems" },
    { key: "medium", claim: "The right program would be conscious in any material",
      yes: "a machine could be conscious", no: "consciousness takes more than the right program" },
    { key: "separate", claim: "The mind could exist without a body",
      yes: "the mind could exist without a body", no: "the mind needs a body" },
    { key: "physics", claim: "Consciousness needs new physics",
      yes: "it will take new physics", no: "today\u2019s physics is enough" },
    { key: "anomaly", claim: "Unusual experiences show the mind reaches beyond the brain",
      yes: "the mind reaches beyond the brain", no: "unusual experiences are just brain states" },
    { key: "firstp", claim: "The science must start from lived experience",
      yes: "the science must start from lived experience", no: "the science should start from the brain" },
    { key: "solvable", claim: "The mystery can be solved",
      yes: "the mystery can be solved", no: "the mystery may be permanent" },
  ];

  var profiles = {
    "materialism":               { physical: 2, mind: -2, deeper: -1, independent: 2, causal: -1, explain: 2, wide: -1, medium: 1, separate: -2, physics: -1, anomaly: -1, firstp: -1, solvable: 2 },
    "non-reductive-physicalism": { physical: 2, mind: -1, independent: 2, causal: 2, explain: -2, wide: -1, separate: -2, anomaly: -1, solvable: 1 },
    "quantum-dimensions":        { physical: 1, independent: 1, explain: -1, medium: -2, physics: 2, solvable: 1 },
    "information":               { mind: 1, explain: -1, wide: 1, medium: 2, separate: -1, physics: -1, solvable: 2 },
    "panpsychisms":              { mind: 2, independent: 1, explain: -2, wide: 2, separate: -1, solvable: 1 },
    "neutral-monism":            { physical: -1, mind: -1, deeper: 2, explain: -1, solvable: 1 },
    "dualisms":                  { physical: -2, mind: 2, deeper: -1, independent: 2, causal: 1, explain: -2, wide: -1, medium: -1, separate: 2, anomaly: 1 },
    "idealisms":                 { physical: -2, mind: 2, deeper: -1, independent: -2, explain: -2, separate: 1, anomaly: 1, firstp: 1, solvable: 1 },
    "phenomenology":             { causal: 1, explain: -1, medium: -1, separate: -1, firstp: 2 },
    "anomalous-altered-states":  { physical: -1, mind: 1, explain: -1, separate: 1, anomaly: 2 },
    "challenge":                 { explain: -1, solvable: -2 },
  };

  var questions = [
    {
      t: "Even a complete scientific account of the brain would leave out what it actually feels like to see red.",
      why: "Science can describe everything your brain does when you see red. This asks whether that description would capture the redness itself, or whether the feeling is something extra it can\u2019t reach.",
      axes: { explain: -1 },
    },
    {
      t: "Your mind is entirely physical: nothing over and above the physical processes in your brain and body.",
      why: "Yes means thoughts and feelings are physical processes, like digestion or weather, even if we don\u2019t fully understand them yet. No means something about your mind isn\u2019t physical.",
      axes: { physical: 1 },
    },
    {
      t: "Experience isn\u2019t built from anything more basic. It\u2019s one of reality\u2019s fundamental ingredients, like space, time or mass.",
      why: "Most things are made of something more basic. This asks whether experience is like that too, or whether it sits at the bottom of reality, not built from anything else.",
      axes: { mind: 1 },
    },
    {
      t: "Your thoughts and decisions cause things to happen in their own right, not only because of the neuron-level physics underneath them.",
      why: "When you decide to raise your hand, is the decision itself doing causal work, or is it all neurons firing, with \u2018the decision\u2019 just a way of describing them?",
      axes: { causal: 1 },
    },
    {
      t: "Something as simple as an atom might have a tiny glimmer of experience.",
      why: "Not thoughts or feelings like yours, just the faintest trace of there being something it\u2019s like to be it. No means experience only shows up in brains, or at least in complex systems.",
      axes: { wide: 1 },
    },
    {
      t: "A computer running the right program would genuinely be conscious.",
      why: "Yes means only the pattern of information processing matters, so neurons or silicon would both do. No means something else matters too, such as being alive or the right physical makeup.",
      axes: { medium: 1 },
    },
    {
      t: "The basic stuff of reality is neither mental nor physical. Mind and matter are two sides of it.",
      why: "Instead of mind coming from matter, or matter from mind, both could be ways of seeing one underlying stuff that is neither. No means the bottom layer is matter, or mind, or two separate things.",
      axes: { deeper: 1 },
    },
    {
      t: "Setting God aside, the physical world would still exist even if no human or animal mind had ever existed.",
      why: "Most people assume so. But some views hold that the physical world is how mind appears, so without minds there would be no world at all.",
      axes: { independent: 1 },
    },
    {
      t: "Your mind could exist without any physical body or brain at all.",
      why: "This asks whether the mind depends on a body to exist, not whether it actually does survive death. Yes means a mind isn\u2019t the kind of thing that needs a body.",
      axes: { separate: 1 },
    },
    {
      t: "Understanding consciousness will take new physics, such as quantum effects in the brain or hidden dimensions of reality.",
      why: "Some think today\u2019s physics, applied to the brain, is enough. Others think consciousness points to physics we haven\u2019t discovered yet.",
      axes: { physics: 1 },
    },
    {
      t: "Near-death experiences, psychic phenomena or mystical states show that the mind reaches beyond the brain.",
      why: "Nobody doubts people have these experiences. The question is whether they\u2019re evidence that the mind isn\u2019t confined to the brain, or are unusual brain states.",
      axes: { anomaly: 1 },
    },
    {
      t: "A science of consciousness has to start from careful descriptions of what experience is like from the inside. Brain data only makes sense in their light.",
      why: "This is about method. Yes means first-person description is the foundation; No means we should start from the brain and explain experience from there.",
      axes: { firstp: 1 },
    },
    {
      t: "Consciousness may be a mystery we can never solve, because human minds just aren\u2019t built to understand it.",
      why: "This isn\u2019t about whether we\u2019ve solved it yet, but whether we\u2019re capable of solving it at all.",
      axes: { solvable: -1 },
    },
  ];

  window.QUIZ_DATA.top = {
    kicker: "A QUIZ · THE BIG PICTURE",
    title: "Find your view",
    intro: questions.length + " quick questions.",
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
