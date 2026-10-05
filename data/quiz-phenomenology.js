/* The Phenomenology quiz: an axis quiz, like data/quiz-idealisms.js.
   21 theories LOC lists under Phenomenology, from Brentano and Husserl to
   today's neurophenomenology. Two are grouped with a close lead because
   the quiz can't tell them apart: Meinong with Brentano (intentional acts
   that present themselves), Petitmengin with Varela (disciplined
   first-person method checked against brain science).
   LOC lists them flat, so there are no invented sub-schools; instead the
   axes cover where they part ways: brain science and lived experience
   checking each other, trust in careful first-person description, every
   experience being of something, experience quietly aware of itself, a
   real self at its core, consciousness as bodily engagement with a world,
   altered states as evidence, and science as resting on experience.
   Profiles carry each theory's justified rejections as well as its
   signature. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "mutual", claim: "Brain science and lived experience must check each other",
      yes: "brain science and lived experience must check each other", no: "one side should lead: experience on its own terms, or science" },
    { key: "inside", claim: "Careful attention reveals experience's true structure",
      yes: "careful first-person description is real evidence", no: "first-person reports are data to explain, not revelations" },
    { key: "of", claim: "Every experience is an experience of something",
      yes: "every experience is directed at something", no: "some experience isn't about anything" },
    { key: "selfaware", claim: "Every experience is quietly aware of itself",
      yes: "every experience is quietly aware of itself", no: "we know experiences only by later reflection or inference" },
    { key: "self", claim: "There is a real self at the core of experience",
      yes: "a self belongs to every experience", no: "the self is a construction, not experience's core" },
    { key: "engaged", claim: "Consciousness is a body's practical engagement with the world",
      yes: "consciousness is a body's engagement with the world", no: "consciousness is first an inner life of its own" },
    { key: "altered", claim: "Altered states are key evidence about consciousness",
      yes: "dreams, sleep, meditation and psychedelics are key evidence", no: "ordinary waking experience is what to study" },
    { key: "prior", claim: "Science can never fully explain consciousness, since it starts from experience",
      yes: "science can never fully explain the experience it starts from", no: "science can in principle explain consciousness" },
  ];

  var profiles = {
    "varela-s-neurophenomenology":                         { mutual: 2, inside: 2, self: -2, engaged: 2, altered: 1 },
    "bitbol-s-radical-neurophenomenology":                 { mutual: 1, inside: 1, engaged: 1, altered: 1, prior: 2 },
    "brentano-s-intentionality-and-self-awareness":        { inside: 2, of: 2, selfaware: 2, self: 1, engaged: -1 },
    "d-w-smith-s-three-facet-ontological-phenomenology":   { inside: 1, of: 2, selfaware: 2, engaged: 1, prior: -1 },
    "dennett-s-heterophenomenology":                       { mutual: -1, inside: -2, self: -2, prior: -2 },
    "derrida-s-deconstruction-of-self-presence":           { inside: -2, selfaware: -2, self: -2 },
    "gallagher-s-embodied-self-and-interactive-consciousness": { mutual: 2, inside: 1, selfaware: 1, self: 1, engaged: 2 },
    "gurwitsch-s-structured-field-of-experience":          { inside: 2, of: 1, self: -2 },
    "heidegger-s-dasein-being-in-the-world-without-qualia": { mutual: -1, inside: -1, of: -1, engaged: 2, prior: 1 },
    "henry-s-auto-affective-self-revelation-of-life":      { mutual: -2, of: -2, selfaware: 2, self: 2, engaged: -2, prior: 2 },
    "husserl-s-transcendental-phenomenology":              { mutual: -2, inside: 2, of: 2, selfaware: 1, self: 2, prior: 2 },
    "james-s-stream-of-thought-consciousness":             { mutual: 1, inside: 1, of: 1, self: -1, altered: 2 },
    "merleau-pontys-embodied-perception-and-the-lived-body": { mutual: 1, of: 1, engaged: 2, prior: 2 },
    "peirce-s-phaneroscopic-semiotics":                    { inside: -2, of: -1, selfaware: -2, self: -1 },
    "sartre-s-pre-reflective-consciousness-as-for-itself": { of: 2, selfaware: 2, self: -2 },
    "shanons-cartography-and-structured-spectrum":         { mutual: -1, inside: 2, altered: 2 },
    "thompsons-phenomenology-waking-dreaming-sleeping-pure-awareness": { mutual: 2, inside: 1, of: -1, selfaware: 1, engaged: 2, altered: 2 },
    "winkelmans-integrative-mode-of-neurognostic-structures": { mutual: 2, inside: 1, engaged: -1, altered: 2, prior: -1 },
    "zahavi-s-pre-reflective-for-me-ness":                 { mutual: 1, inside: 1, selfaware: 2, self: 2, prior: 1 },
  };

  var questions = [
    {
      t: "To understand consciousness, brain science and careful descriptions of lived experience have to check and correct each other.",
      why: "Yes means neither is enough alone: each constrains the other, as equal partners. No means one side should lead: either experience is described on its own terms first, or brain science has the final say.",
      axes: { mutual: 1 },
    },
    {
      t: "With practice, paying careful attention to your own experience can reveal how it is really structured.",
      why: "Yes means disciplined description from the inside is genuine evidence about experience. No means first-person reports are interpretations that can mislead: data to be explained, not a window onto how experience really is.",
      axes: { inside: 1 },
    },
    {
      t: "Every experience is an experience of something: a thing, a thought, a person, a place.",
      why: "Yes means being directed at something is what makes anything mental. No means some experience, such as pure feeling, a bare quality or contentless awareness, isn’t about anything at all.",
      axes: { of: 1 },
    },
    {
      t: "Every experience is quietly aware of itself as it happens, without any separate act of looking at it.",
      why: "Yes means experience lights itself up: you don’t need to reflect to know you’re seeing. No means we only know our experiences afterwards, by reflection or inference, or that this immediate self-presence is a myth.",
      axes: { selfaware: 1 },
    },
    {
      t: "There is a real self at the core of experience: every experience is someone’s, from the inside.",
      why: "Yes means a self or subject, even a minimal one, belongs to experience itself. No means the self is a construction, an object or a story, and experience has no owner at its core.",
      axes: { self: 1 },
    },
    {
      t: "Consciousness is, first of all, a living body’s practical engagement with the world around it.",
      why: "Yes means experience is something an embodied creature does, absorbed in tasks, tools and others. No means consciousness is first an inner life, of mental acts or feelings, that the world and the body come after.",
      axes: { engaged: 1 },
    },
    {
      t: "Dreams, deep sleep, meditation and psychedelic states are key evidence about what consciousness is.",
      why: "Yes means you can’t understand ordinary waking experience without comparing it with its other forms. No means ordinary waking experience is what a theory should study; unusual states add little.",
      axes: { altered: 1 },
    },
    {
      t: "Science can never fully explain consciousness, because science itself starts from experience.",
      why: "Yes means every measurement and theory is already something lived, so experience can’t be turned into one more object of science. No means consciousness is a natural phenomenon that science can, in principle, explain like any other.",
      axes: { prior: 1 },
    },
  ];

  window.QUIZ_DATA.drill.phenomenology = {
    name: "Phenomenology",
    color: "#FF5733",
    categoryId: "phenomenology",
    kicker: "A QUIZ · PHENOMENOLOGY",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside phenomenology.",
    areas: [
    { key: "varela-s-neurophenomenology", name: "Varela’s Neurophenomenology",
      tagline: "First-person reports guide brain science.",
      url: "https://loc.closertotruth.com/theory/varela-s-neurophenomenology" },
    { key: "bitbol-s-radical-neurophenomenology", name: "Bitbol’s Radical Neurophenomenology",
      tagline: "Consciousness can’t be explained objectively; all explaining starts there.",
      url: "https://loc.closertotruth.com/theory/bitbol-s-radical-neurophenomenology", review: true },
    { key: "brentano-s-intentionality-and-self-awareness", name: "Brentano’s Intentionality and Self-Awareness",
      tagline: "Every mental act is about something and aware of itself.",
      url: "https://loc.closertotruth.com/theory/brentano-s-intentionality-and-self-awareness", review: true },
    { key: "meinongs-self-presenting-experience", name: "Meinong's Self-Presenting Experience",
      tagline: "Experience can aim even at things that don’t exist.",
      url: "https://loc.closertotruth.com/theory/meinongs-self-presenting-experience", review: true,
      group: "brentano-s-intentionality-and-self-awareness" },
    { key: "d-w-smith-s-three-facet-ontological-phenomenology", name: "D.W. Smith’s Three-Facet Ontological Phenomenology",
      tagline: "Consciousness has three facets: meaning, appearance and natural basis.",
      url: "https://loc.closertotruth.com/theory/d-w-smith-s-three-facet-ontological-phenomenology", review: true },
    { key: "dennett-s-heterophenomenology", name: "Dennett’s Heterophenomenology",
      tagline: "Study what people report, not a private inner show.",
      url: "https://loc.closertotruth.com/theory/dennett-s-heterophenomenology", review: true },
    { key: "derrida-s-deconstruction-of-self-presence", name: "Derrida’s Deconstruction of Self-Presence",
      tagline: "Experience is never simply present to itself.",
      url: "https://loc.closertotruth.com/theory/derrida-s-deconstruction-of-self-presence", review: true },
    { key: "gallagher-s-embodied-self-and-interactive-consciousness", name: "Gallagher’s Embodied Self and Interactive Consciousness",
      tagline: "The whole embodied, interacting organism is conscious, not just the brain.",
      url: "https://loc.closertotruth.com/theory/gallagher-s-embodied-self-and-interactive-consciousness", review: true },
    { key: "gurwitsch-s-structured-field-of-experience", name: "Gurwitsch’s Structured Field of Experience",
      tagline: "Experience is a field: a focus, its context and a margin.",
      url: "https://loc.closertotruth.com/theory/gurwitsch-s-structured-field-of-experience", review: true },
    { key: "heidegger-s-dasein-being-in-the-world-without-qualia", name: "Heidegger’s Dasein (Being-In-The-World) Without Qualia",
      tagline: "Before consciousness comes caring, practical involvement in a world.",
      url: "https://loc.closertotruth.com/theory/heidegger-s-dasein-being-in-the-world-without-qualia", review: true },
    { key: "henry-s-auto-affective-self-revelation-of-life", name: "Henry’s Auto-Affective Self-Revelation of Life",
      tagline: "At root, consciousness is life feeling itself, with no object.",
      url: "https://loc.closertotruth.com/theory/henry-s-auto-affective-self-revelation-of-life", review: true },
    { key: "husserl-s-transcendental-phenomenology", name: "Husserl’s Transcendental Phenomenology",
      tagline: "Describe how things appear before explaining them causally.",
      url: "https://loc.closertotruth.com/theory/husserl-s-transcendental-phenomenology", review: true },
    { key: "james-s-stream-of-thought-consciousness", name: "James’s Stream of Thought/Consciousness",
      tagline: "Consciousness is a continuous, personal, ever-changing stream.",
      url: "https://loc.closertotruth.com/theory/james-s-stream-of-thought-consciousness", review: true },
    { key: "merleau-pontys-embodied-perception-and-the-lived-body", name: "Merleau-Ponty's Embodied Perception and the Lived Body",
      tagline: "The lived, moving body is where experience happens.",
      url: "https://loc.closertotruth.com/theory/merleau-pontys-embodied-perception-and-the-lived-body", review: true },
    { key: "peirce-s-phaneroscopic-semiotics", name: "Peirce’s Phaneroscopic Semiotics",
      tagline: "Whatever appears breaks down into feeling, reaction and meaning.",
      url: "https://loc.closertotruth.com/theory/peirce-s-phaneroscopic-semiotics", review: true },
    { key: "petitmengin-s-micro-phenomenology", name: "Petitmengin’s Micro-Phenomenology",
      tagline: "Guided interviews bring experience’s unnoticed fine detail to light.",
      url: "https://loc.closertotruth.com/theory/petitmengin-s-micro-phenomenology", review: true,
      group: "varela-s-neurophenomenology" },
    { key: "sartre-s-pre-reflective-consciousness-as-for-itself", name: "Sartre’s Pre-reflective Consciousness as For-Itself",
      tagline: "Consciousness points outward, and is silently aware of itself.",
      url: "https://loc.closertotruth.com/theory/sartre-s-pre-reflective-consciousness-as-for-itself", review: true },
    { key: "shanons-cartography-and-structured-spectrum", name: "Shanon's Cartography and Structured Spectrum",
      tagline: "Map ordinary consciousness by comparing it with altered states.",
      url: "https://loc.closertotruth.com/theory/shanons-cartography-and-structured-spectrum", review: true },
    { key: "thompsons-phenomenology-waking-dreaming-sleeping-pure-awareness", name: "Thompson's Phenomenology: Waking, Dreaming, Sleeping, Pure Awareness",
      tagline: "Study waking, dreaming and deep sleep with science and meditation.",
      url: "https://loc.closertotruth.com/theory/thompsons-phenomenology-waking-dreaming-sleeping-pure-awareness", review: true },
    { key: "winkelmans-integrative-mode-of-neurognostic-structures", name: "Winkelman's Integrative Mode of Neurognostic Structures",
      tagline: "Inborn brain structures give us several modes of consciousness.",
      url: "https://loc.closertotruth.com/theory/winkelmans-integrative-mode-of-neurognostic-structures", review: true },
    { key: "zahavi-s-pre-reflective-for-me-ness", name: "Zahavi’s Pre-Reflective For-Me-Ness",
      tagline: "Every experience is given as mine, before any reflection.",
      url: "https://loc.closertotruth.com/theory/zahavi-s-pre-reflective-for-me-ness", review: true }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
