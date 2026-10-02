/* The Materialism quiz: an axis quiz, like data/quiz-idealisms.js.
   The top level of materialism: 12 schools LOC lists, each a nested quiz
   (`sub`). All agree the mind is physical; the 12 axes are where the
   schools part ways: feeling and the body's needs first, computation
   independent of what does it, specific brain circuits, consciousness as
   ancient and widespread, language, the brain's electromagnetic field, the
   mystery as a gap in our concepts, experience defined by relations, a
   living body acting in the world, higher-order vs first-order
   representation, and the inner glow as an illusion. Profiles carry each
   school's justified rejections as well as its signature. Checked by
   tools/eval-quiz.js and a blind role-play of named proponents
   (tools/eval-thinkers-materialism.json). */
(function () {
  "use strict";
  var axes = [
    { key: "feeling", claim: "Consciousness starts with feelings about the body’s needs",
      yes: "consciousness starts with feeling", no: "feeling is one kind of experience among many" },
    { key: "substrate", claim: "The right information processing is conscious, whatever runs it",
      yes: "what matters is the processing, not the material", no: "the material that does it matters" },
    { key: "circuits", claim: "Consciousness will be found in specific brain circuits",
      yes: "consciousness sits in specific brain circuits", no: "consciousness is spread beyond particular circuits" },
    { key: "ancient", claim: "Consciousness is ancient and widespread among animals",
      yes: "many simple animals are conscious", no: "consciousness is a late, rare achievement" },
    { key: "language", claim: "Language is what makes human consciousness",
      yes: "language makes our kind of consciousness", no: "consciousness comes before words" },
    { key: "field", claim: "Experience is the brain’s electromagnetic field",
      yes: "experience lives in the brain’s field", no: "experience lives in what neurons do" },
    { key: "gap", claim: "The mystery of consciousness is in our concepts, not in the world",
      yes: "the mystery is a gap in our concepts", no: "the mystery is a real puzzle about the world" },
    { key: "relations", claim: "An experience is what it is because of its relations",
      yes: "experiences are defined by their relations", no: "experiences have a character of their own" },
    { key: "body", claim: "A mind needs a living body acting in the world",
      yes: "minds need living bodies in action", no: "a mind could exist without a living body" },
    { key: "ho", claim: "Being conscious of something takes the brain registering its own state",
      yes: "consciousness takes a second, inner layer", no: "the first layer of perception is enough" },
    { key: "represent", claim: "Experience is the brain representing the world",
      yes: "experience is the brain’s picture of the world", no: "experience is activity, not a picture" },
    { key: "illusion", claim: "The inner glow of experience is an illusion",
      yes: "the inner glow is an illusion", no: "the inner glow is real" },
  ];

  var profiles = {
    "materialism-homeostatic-affective":       { feeling: 2, substrate: -1, ancient: 1, language: -1, body: 1, illusion: -1 },
    "materialism-computational-functionalism": { feeling: -1, substrate: 2, circuits: -1, relations: 1, body: -2, represent: 1 },
    "materialism-neurobiological":             { substrate: -1, circuits: 2, field: -1, relations: -1, body: -1, illusion: -2 },
    "materialism-phylogenetic-evolutionary":   { feeling: 1, ancient: 2, language: -1, ho: -1 },
    "materialism-language-relationships":      { feeling: -1, ancient: -2, language: 2, ho: 1 },
    "materialism-electromagnetic-field":       { substrate: -2, circuits: -1, field: 2, illusion: -1 },
    "materialism-philosophical":               { substrate: 1, gap: 2, illusion: -1 },
    "materialism-relational":                  { circuits: -1, relations: 2, body: 1, illusion: -1 },
    "materialism-embodied-enactive":           { substrate: -2, circuits: -1, ancient: 1, relations: 1, body: 2, represent: -2 },
    "materialism-higher-order":                { substrate: 1, ancient: -1, ho: 2, represent: 1 },
    "materialism-first-order":                 { ancient: 1, ho: -2, represent: 2, illusion: -1 },
    "materialism-eliminative-illusionism":     { feeling: -1, substrate: 1, gap: 1, ho: 1, illusion: 2 },
  };

  var questions = [
    {
      t: "Consciousness starts with feelings about what your body needs, like hunger, thirst and pain.",
      why: "Yes means raw feeling is the root that every other kind of experience grows from. No means feeling is just one kind of experience among many.",
      axes: { feeling: 1 },
    },
    {
      t: "If a computer processed information exactly the way your brain does, it would be conscious.",
      why: "Yes means what matters is the pattern of processing, not what does it. No means the material, living cells or something else, matters too.",
      axes: { substrate: 1 },
    },
    {
      t: "Consciousness will be found in specific brain circuits and patterns of neural activity.",
      why: "Yes means the key is to find the exact neural machinery. No means consciousness isn’t located in particular circuits.",
      axes: { circuits: 1 },
    },
    {
      t: "Consciousness is ancient: fish, and maybe insects, have experiences too.",
      why: "Yes means consciousness appeared early in evolution and is widespread. No means it is a late, rare achievement, perhaps only in a few species.",
      axes: { ancient: 1 },
    },
    {
      t: "Language is what turns raw sensation into full human consciousness.",
      why: "Yes means words let us name, hold and reflect on experience, and that makes our kind of consciousness. No means consciousness comes first, and language only describes it.",
      axes: { language: 1 },
    },
    {
      t: "Experience happens in the electromagnetic field the brain generates, not just in neurons firing.",
      why: "Neurons produce an electric field around them. Yes means that field is where experience happens. No means the field is a side effect of what neurons do.",
      axes: { field: 1 },
    },
    {
      t: "The mystery of consciousness comes from the limits of our concepts, not from anything strange about the world.",
      why: "Yes means the gap between brain and experience is a gap in how we think about them. No means there is a real puzzle about the world still to solve.",
      axes: { gap: 1 },
    },
    {
      t: "An experience is what it is because of how it relates to other experiences and things, not because of anything inside it alone.",
      why: "For example, red is defined by being like orange and unlike green. No means each experience has a character all its own.",
      axes: { relations: 1 },
    },
    {
      t: "You need a living body acting in the world to have a mind.",
      why: "Yes means the mind isn’t in the head alone: it comes from a body moving, sensing and engaging. No means a brain, or something else, could have a mind on its own.",
      axes: { body: 1 },
    },
    {
      t: "You’re only conscious of seeing something when your brain also registers that it is seeing it.",
      why: "Yes means consciousness needs a second layer: the brain representing its own states. No means the first layer, perceiving the world, is enough.",
      axes: { ho: 1 },
    },
    {
      t: "Experience is your brain representing the world: what it’s like to see red is just how red is represented.",
      why: "Yes means experience is a kind of inner picture or model of things. No means experience is better seen as activity or engagement than as a representation.",
      axes: { represent: 1 },
    },
    {
      t: "The inner glow of experience, the feeling that there’s something it’s like to be you, is an illusion your brain creates.",
      why: "Yes means the brain convinces you there is an inner glow when really there isn’t. No means experience is real, even if it is physical.",
      axes: { illusion: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism"] = {
    name: "Materialism",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside materialism.",
    areas: [
    { key: "materialism-homeostatic-affective", name: "Homeostatic & Affective",
      tagline: "Feelings that track what the body needs.",
      url: "https://loc.closertotruth.com/theories/homeostatic-and-affective",
      sub: "materialism-homeostatic-affective" },
    { key: "materialism-computational-functionalism", name: "Computational & Functionalism",
      tagline: "The mind is a program the brain runs.",
      url: "https://loc.closertotruth.com/theories/computational-and-functionalism",
      sub: "materialism-computational-functionalism" },
    { key: "materialism-neurobiological", name: "Neurobiological",
      tagline: "Consciousness lives in specific brain circuits.",
      url: "https://loc.closertotruth.com/theories/neurobiological",
      sub: "materialism-neurobiological" },
    { key: "materialism-phylogenetic-evolutionary", name: "Phylogenetic / Evolutionary",
      tagline: "Consciousness evolved, step by step.",
      url: "https://loc.closertotruth.com/theories/phylogenetic-evolutionary",
      sub: "materialism-phylogenetic-evolutionary" },
    { key: "materialism-language-relationships", name: "Language Relationships",
      tagline: "Words shape what consciousness becomes.",
      url: "https://loc.closertotruth.com/theories/language-relationships",
      sub: "materialism-language-relationships" },
    { key: "materialism-electromagnetic-field", name: "Electromagnetic Field",
      tagline: "Experience is the brain's electric field.",
      url: "https://loc.closertotruth.com/theories/electromagnetic-field",
      sub: "materialism-electromagnetic-field" },
    { key: "materialism-philosophical", name: "Philosophical",
      tagline: "Arguments for a fully physical mind.",
      url: "https://loc.closertotruth.com/theories/philosophical",
      sub: "materialism-philosophical" },
    { key: "materialism-relational", name: "Relational",
      tagline: "Experience lives between things, not in them.",
      url: "https://loc.closertotruth.com/theories/relational",
      sub: "materialism-relational" },
    { key: "materialism-embodied-enactive", name: "Embodied & Enactive",
      tagline: "Minds need bodies in motion.",
      url: "https://loc.closertotruth.com/theories/embodied-and-enactive",
      sub: "materialism-embodied-enactive" },
    { key: "materialism-higher-order", name: "Higher-Order",
      tagline: "Consciousness is the brain watching itself.",
      url: "https://loc.closertotruth.com/theories/higher-order",
      sub: "materialism-higher-order" },
    { key: "materialism-first-order", name: "First-Order",
      tagline: "Experience is the brain's direct picture.",
      url: "https://loc.closertotruth.com/theories/first-order",
      sub: "materialism-first-order" },
    { key: "materialism-eliminative-illusionism", name: "Eliminative / Illusionism",
      tagline: "The inner glow is a trick of the brain.",
      url: "https://loc.closertotruth.com/theories/eliminative-illusionism",
      sub: "materialism-eliminative-illusionism" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
