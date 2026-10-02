/* The Quantum machinery in the brain quiz: an axis quiz, like
   data/quiz-idealisms.js. Nine theories that all put quantum physics inside
   the brain; they disagree about whether a non-physical mind acts on the
   brain, whether each moment of experience is a collapse, whether new
   physics is needed, where the quantum work happens (synapses, nuclear
   spins, one particle, or a brain-wide field), whether experience is
   computable, whether mind reaches outside the body, whether experience
   builds up level by level, what the quantum effect is for (binding), and
   whether the experienced world is the brain's own creation. Profiles carry
   each theory's justified rejections as well as its signature. Checked by tools/eval-quiz.js (no blind role-play yet). */
(function () {
  "use strict";
  var axes = [
    { key: "mind", claim: "A non-physical mind acts on the brain",
      yes: "a non-physical mind acts on the brain", no: "the mind is the brain’s own physics" },
    { key: "collapse", claim: "Each moment of experience is a quantum collapse",
      yes: "each moment of experience is a quantum collapse", no: "experience comes from quantum processes other than collapse" },
    { key: "newphysics", claim: "Consciousness needs new physics",
      yes: "consciousness needs physics we don’t have yet", no: "today’s quantum physics is enough" },
    { key: "synapse", claim: "The key quantum events happen at synapses",
      yes: "the key quantum events happen where neurons connect", no: "the key quantum events happen elsewhere in the brain" },
    { key: "spin", claim: "Atomic nuclei hold the brain’s quantum information",
      yes: "spinning atomic nuclei hold the brain’s quantum information", no: "something other than nuclear spins carries it" },
    { key: "field", claim: "The whole brain acts as one quantum field",
      yes: "the whole brain acts as one quantum field", no: "the quantum work happens in specific spots" },
    { key: "computer", claim: "No computer could be conscious",
      yes: "no computer could be conscious", no: "the right computer could be conscious" },
    { key: "psi", claim: "Mind can affect matter outside the body",
      yes: "mind can affect matter outside the body", no: "mind acts only through its own body" },
    { key: "ladder", claim: "Experience builds up level by level from molecules",
      yes: "experience builds up level by level from molecules", no: "experience is there from the start, not built up" },
    { key: "binding", claim: "Quantum effects bind experience into one",
      yes: "quantum effects bind experience into one", no: "quantum effects do some other job" },
    { key: "world", claim: "The world you experience is your brain’s own creation",
      yes: "the world you experience is your brain’s own creation", no: "experience is a window onto an outside world" },
  ];

  var profiles = {
    "beck-eccles-s-quantum-processes-in-the-synapse":             { mind: 2, collapse: 1, newphysics: -1, synapse: 2, computer: 1, ladder: -2, world: -1 },
    "caveliers-entangled-spins-at-the-nmda-receptor":             { mind: -1, newphysics: -1, synapse: 1, spin: 2, field: -1, ladder: 2 },
    "fisher-s-quantum-cognition":                                 { mind: -2, collapse: -1, newphysics: -1, spin: 2, computer: -1, psi: -2 },
    "globus-s-quantum-thermofield-brain-dynamics":                { mind: -1, collapse: -1, field: 2, spin: -1, world: 2 },
    "penrose-hameroff-s-orchestrated-objective-reduction":        { mind: -1, collapse: 2, newphysics: 2, synapse: -1, spin: -1, computer: 2, ladder: -1, binding: 1 },
    "rourk-s-catecholaminergic-neuron-electron-transport-theory": { newphysics: -1, spin: -1, field: -1, psi: -1, ladder: 1, binding: 2 },
    "morrison-s-position-selecting-interactionism":               { mind: 2, collapse: 1, synapse: -1, field: -2, computer: 1, psi: -1, ladder: -1 },
    "shiah-s-cryptochrome-theory":                                { mind: 2, newphysics: -1, synapse: -1, field: -1, computer: 1, psi: 2, ladder: -1 },
    "poznanski-s-dynamic-organicity-theory":                      { mind: -2, synapse: -1, field: 1, computer: 1, psi: -1, ladder: 1 },
  };

  var questions = [
    {
      t: "Your mind is something non-physical that reaches into the brain and nudges what happens there.",
      why: "Yes means mind and brain are two different things that interact. No means the mind is the brain’s own physical activity, quantum effects included.",
      axes: { mind: 1 },
    },
    {
      t: "Each moment of awareness is a quantum collapse: a set of possibilities snapping into one definite outcome.",
      why: "Yes means experience happens at the instant quantum possibilities become a fact. No means the brain’s quantum processes matter in some other way.",
      axes: { collapse: 1 },
    },
    {
      t: "To explain consciousness, physics itself will have to change. Today’s quantum theory isn’t enough.",
      why: "Yes means some new law of nature is needed. No means standard quantum physics, applied to the brain, has what it takes.",
      axes: { newphysics: 1 },
    },
    {
      t: "The quantum events that matter most for the mind happen at synapses, the junctions where neurons pass signals.",
      why: "Yes means the action is at the gaps between neurons. No means it happens somewhere else: inside cells, in particular molecules, or across the whole brain.",
      axes: { synapse: 1 },
    },
    {
      t: "The brain stores quantum information in the spin of atomic nuclei, which are well shielded from the brain’s warm, noisy chemistry.",
      why: "A spinning nucleus can hold a quantum state far longer than most things in a warm cell. No means something other than nuclear spins carries the brain’s quantum states.",
      axes: { spin: 1 },
    },
    {
      t: "The whole brain behaves as one quantum field, rather than doing its quantum work in particular molecules or spots.",
      why: "Yes means consciousness belongs to a brain-wide quantum state. No means the important quantum events are located in specific places in the brain.",
      axes: { field: 1 },
    },
    {
      t: "No computer, however powerful, could ever be conscious.",
      why: "Yes means something about consciousness can’t be captured by any computation. No means a machine with the right workings, perhaps a quantum computer, might be conscious.",
      axes: { computer: 1 },
    },
    {
      t: "A mind can sometimes affect physical things outside its own body.",
      why: "Yes means effects like mind over matter at a distance can be real, and a quantum link could carry them. No means a mind acts on the world only through its own body.",
      axes: { psi: 1 },
    },
    {
      t: "Experience is built up step by step: from quantum events in molecules, to cells, to circuits, to a whole conscious mind.",
      why: "Yes means each level of the brain adds something until experience appears at the top. No means experience doesn’t emerge from a stack of levels.",
      axes: { ladder: 1 },
    },
    {
      t: "The main job of quantum effects in the brain is to bind countless separate signals into one unified experience.",
      why: "Your sights, sounds and thoughts arrive as one experience, not a scatter of parts. Yes means quantum physics is what ties them together. No means quantum effects matter for some other reason.",
      axes: { binding: 1 },
    },
    {
      t: "The world you experience isn’t a picture of an outside world. It is your brain’s own activity, settling moment by moment.",
      why: "Yes means there is no gap between brain and lived world to bridge. No means experience is a view onto a world that exists apart from it.",
      axes: { world: 1 },
    },
  ];

  window.QUIZ_DATA.drill["quantum-dimensions-quantum-machinery"] = {
    name: "Quantum machinery in the brain",
    color: "#FFA9A0",
    categoryId: "quantum-dimensions",
    kicker: "A QUIZ · QUANTUM & DIMENSIONS",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside quantum machinery in the brain.",
    areas: [
    { key: "beck-eccles-s-quantum-processes-in-the-synapse", name: "Beck-Eccles’s Quantum Processes in the Synapse",
      tagline: "Mind nudges synapses through quantum effects.",
      url: "https://loc.closertotruth.com/theory/beck-eccles-s-quantum-processes-in-the-synapse" },
    { key: "caveliers-entangled-spins-at-the-nmda-receptor", name: "Cavelier's Entangled Spins at the NMDA Receptor",
      tagline: "Experience lives in entangled spins in the brain.",
      url: "https://loc.closertotruth.com/theory/caveliers-entangled-spins-at-the-nmda-receptor" },
    { key: "fisher-s-quantum-cognition", name: "Fisher’s Quantum Cognition",
      tagline: "The brain does quantum computing with phosphorus atoms.",
      url: "https://loc.closertotruth.com/theory/fisher-s-quantum-cognition" },
    { key: "globus-s-quantum-thermofield-brain-dynamics", name: "Globus’s Quantum Thermofield Brain Dynamics",
      tagline: "The brain is a quantum field; your world is how it settles.",
      url: "https://loc.closertotruth.com/theory/globus-s-quantum-thermofield-brain-dynamics" },
    { key: "penrose-hameroff-s-orchestrated-objective-reduction", name: "Penrose-Hameroff’s Orchestrated Objective Reduction",
      tagline: "Each aware moment is a quantum collapse in neurons.",
      url: "https://loc.closertotruth.com/theory/penrose-hameroff-s-orchestrated-objective-reduction" },
    { key: "rourk-s-catecholaminergic-neuron-electron-transport-theory", name: "Rourk’s Catecholaminergic Neuron Electron Transport Theory",
      tagline: "Electron traffic in key neurons binds experience.",
      url: "https://loc.closertotruth.com/theory/rourk-s-catecholaminergic-neuron-electron-transport-theory" },
    { key: "morrison-s-position-selecting-interactionism", name: "Morrison’s Position Selecting Interactionism",
      tagline: "Your inner life is tied to one tiny particle in the brain.",
      url: "https://loc.closertotruth.com/theory/morrison-s-position-selecting-interactionism" },
    { key: "shiah-s-cryptochrome-theory", name: "Shiah’s Cryptochrome Theory",
      tagline: "A tiny protein turns mental intent physical.",
      url: "https://loc.closertotruth.com/theory/shiah-s-cryptochrome-theory" },
    { key: "poznanski-s-dynamic-organicity-theory", name: "Poznanski’s Dynamic Organicity Theory",
      tagline: "Consciousness is a living system’s quantum reach.",
      url: "https://loc.closertotruth.com/theory/poznanski-s-dynamic-organicity-theory" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
