/* Quiz data shared by every quiz, plus the category and school quizzes.
   The main quiz lives in data/main-quiz.js (loaded after this file). */
// Bump this whenever quiz questions change: shared result links carry the
// version they were made with, and links from a different version are rejected.
window.QUIZ_DATA_VERSION = "20261002d";
(function () {
  "use strict";
  var cats = {};
  window.LOC_CATEGORIES.forEach(function (c) {
    cats[c.id] = { name: c.name, color: c.color, tagline: c.tagline, url: c.url };
  });
  window.QUIZ_DATA = {
    cats: cats,
    order: window.LOC_CATEGORIES.map(function (c) { return c.id; }),
    top: null,   // data/main-quiz.js
  };
})();

/* Category and school quizzes, keyed by category id or "<category>-<school>".
   Point-scored: each question's "yes" (and sometimes "no") adds points to
   areas. Quizzes rebuilt as axis quizzes live in their own files
   (data/quiz-<key>.js) and replace their entry here. */
window.QUIZ_DATA.drill = {};   // Panpsychisms: data/quiz-panpsychisms.js

/* Remaining category drills: generated 2026-09-29 from the verified
   Landscape of Consciousness theory list. One drill per category
   (Materialism nests one level: 12 schools, each with its own drill).
   Same answer rules as the Panpsychisms drill. */
/* Drill-down quizzes: Neutral Monism, Non-Reductive Physicalism, Information, Phenomenology.
   One question per verified LOC theory. Same answer rules as the other drills. */
// neutral-monism: data/quiz-neutral-monism.js

// non-reductive-physicalism: data/quiz-non-reductive-physicalism.js

// information: data/quiz-information.js

/* Phenomenology has a single theory on LOC, so it has no quiz: its page
   leads straight to the theory. The entry stays for the map tree. */
window.QUIZ_DATA.drill["phenomenology"] = {
  name: "Phenomenology",
  color: "#FF5733",
  categoryId: "phenomenology",
  areas: [
    { key: "varela-s-neurophenomenology", name: "Varela\u2019s Neurophenomenology",
      tagline: "First-person reports guide brain science.",
      url: "https://loc.closertotruth.com/theory/varela-s-neurophenomenology" }
  ],
  questions: []
};
/* Idealisms + Dualisms drills. Same answer rules as the top level.
   One question per verified theory; no-maps left empty except where a
   negation directly affirms a sibling view. */
// Idealisms: data/quiz-idealisms.js

window.QUIZ_DATA.drill["dualisms"] = {
  name: "Dualisms",
  color: "#007ACC",
  categoryId: "dualisms",
  kicker: "A QUIZ · DUALISMS",
  title: "Which kind fits you?",
  intro: "Twenty-three questions, all inside dualism.",
  browse: "or browse the map instead",
  areas: [
    { key: "steiner-s-esoteric-soul-and-consciousness", name: "Steiner’s Esoteric Soul and Consciousness",
      tagline: "Body, soul, and spirit are three distinct members of you.",
      url: "https://loc.closertotruth.com/theory/steiner-s-esoteric-soul-and-consciousness" },
    { key: "bergson-s-multiplicity-duration-perception-memory", name: "Bergson’s Multiplicity, Duration, Perception, Memory",
      tagline: "Mind is lived time; matter is space.",
      url: "https://loc.closertotruth.com/theory/bergson-s-multiplicity-duration-perception-memory" },
    { key: "feser-s-neo-thomistic-neo-aristotelian-common-sense-dualism", name: "Feser’s Neo-Thomistic, Neo-Aristotelian, Common-Sense Dualism",
      tagline: "Part of your mind is immaterial; you see the world as it is.",
      url: "https://loc.closertotruth.com/theory/feser-s-neo-thomistic-neo-aristotelian-common-sense-dualism" },
    { key: "god-as-the-supplier-of-souls", name: "God as the Supplier of Souls",
      tagline: "God gives each person a soul.",
      url: "https://loc.closertotruth.com/theory/god-as-the-supplier-of-souls" },
    { key: "gomatam-s-gv-vedanta-consciousness", name: "Gomatam’s GV Vedanta Consciousness",
      tagline: "Matter has levels, and mind sits above them all.",
      url: "https://loc.closertotruth.com/theory/gomatam-s-gv-vedanta-consciousness" },
    { key: "historical-and-traditional-dualisms", name: "Historical and Traditional Dualisms",
      tagline: "Humans always assumed spirit alongside matter.",
      url: "https://loc.closertotruth.com/theory/historical-and-traditional-dualisms" },
    { key: "kind-s-dualism-2-0", name: "Kind’s Dualism 2.0",
      tagline: "Dualism updated: physics misses what experience feels like.",
      url: "https://loc.closertotruth.com/theory/kind-s-dualism-2-0" },
    { key: "lorber-s-soul-and-spirit", name: "Lorber’s Soul and Spirit",
      tagline: "A soul and a divine spirit, briefly wearing a body.",
      url: "https://loc.closertotruth.com/theory/lorber-s-soul-and-spirit" },
    { key: "mascari-s-qualion-mind-paradigm", name: "Mascari’s Qualion-Mind Paradigm",
      tagline: "Nature built a higher mind-part into living things.",
      url: "https://loc.closertotruth.com/theory/mascari-s-qualion-mind-paradigm" },
    { key: "moreland-s-christian-soul", name: "Moreland’s Christian Soul",
      tagline: "An immaterial soul is what makes you you.",
      url: "https://loc.closertotruth.com/theory/moreland-s-christian-soul" },
    { key: "nonphysical-component-in-the-human-mind", name: "Nonphysical Component in the Human Mind",
      tagline: "The brain needs a nonphysical partner.",
      url: "https://loc.closertotruth.com/theory/nonphysical-component-in-the-human-mind" },
    { key: "philosophical-history-of-dualism", name: "Philosophical History of Dualism",
      tagline: "The long philosophical case for two kinds of reality.",
      url: "https://loc.closertotruth.com/theory/philosophical-history-of-dualism" },
    { key: "pitts-s-interactionist-dualism-energy-conservation-and-mental-causation", name: "Pitts’s Interactionist Dualism: Energy Conservation and Mental Causation",
      tagline: "Your mind really pushes your brain around.",
      url: "https://loc.closertotruth.com/theory/pitts-s-interactionist-dualism-energy-conservation-and-mental-causation" },
    { key: "property-dualism", name: "Property Dualism",
      tagline: "One stuff, but feelings are beyond physics.",
      url: "https://loc.closertotruth.com/theory/property-dualism" },
    { key: "realms-of-the-soul", name: "Realms of the Soul",
      tagline: "The soul journeys through realms beyond this life.",
      url: "https://loc.closertotruth.com/theory/realms-of-the-soul" },
    { key: "soul-in-indigenous-religions", name: "Soul in Indigenous Religions",
      tagline: "Indigenous traditions knew the soul in many forms.",
      url: "https://loc.closertotruth.com/theory/soul-in-indigenous-religions" },
    { key: "soul-in-islamic-philosophy", name: "Soul in Islamic Philosophy",
      tagline: "Islamic philosophers mapped the soul with care.",
      url: "https://loc.closertotruth.com/theory/soul-in-islamic-philosophy" },
    { key: "soul-in-the-hebrew-bible-and-jewish-philosophy", name: "Soul in the Hebrew Bible and Jewish Philosophy",
      tagline: "The Hebrew scriptures’ vision of soul and spirit.",
      url: "https://loc.closertotruth.com/theory/soul-in-the-hebrew-bible-and-jewish-philosophy" },
    { key: "soul-in-the-new-testament-and-christian-philosophy", name: "Soul in the New Testament and Christian Philosophy",
      tagline: "The Christian immortal soul.",
      url: "https://loc.closertotruth.com/theory/soul-in-the-new-testament-and-christian-philosophy" },
    { key: "stump-s-thomistic-dualism", name: "Stump’s Thomistic Dualism",
      tagline: "The soul is the body’s immaterial organizing form.",
      url: "https://loc.closertotruth.com/theory/stump-s-thomistic-dualism" },
    { key: "swinburne-s-substance-dualism", name: "Swinburne’s Substance Dualism",
      tagline: "Souls are real things, alongside tables and atoms.",
      url: "https://loc.closertotruth.com/theory/swinburne-s-substance-dualism" },
    { key: "theosophy-s-eclectic-soul-and-consciousness", name: "Theosophy’s Eclectic Soul and Consciousness",
      tagline: "Ancient wisdom traditions agree: the soul is real.",
      url: "https://loc.closertotruth.com/theory/theosophy-s-eclectic-soul-and-consciousness" },
    { key: "trialism", name: "Trialism",
      tagline: "Not one stuff, not two, but three.",
      url: "https://loc.closertotruth.com/theory/trialism" }
  ],
  questions: [
    {
      t: "You are three things woven together: a body, a soul, and a spirit.",
      why: "Steiner’s anthroposophy treats body, soul, and spirit as distinct realities in every person. Each follows its own laws.",
      yes: { "steiner-s-esoteric-soul-and-consciousness": 3 },
      no: {}
    },
    {
      t: "Your mind lives in flowing time, while matter just sits in space. They are different kinds of reality.",
      why: "Bergson split reality along time versus space. Consciousness is duration, the flow you live through. Matter is spread-out space.",
      yes: { "bergson-s-multiplicity-duration-perception-memory": 3 },
      no: {}
    },
    {
      t: "Part of your mind is immaterial, and the colors you see are really out there in the world.",
      why: "Feser’s dualism says some mental powers can’t be physical, while perception shows the world as it truly is.",
      yes: { "feser-s-neo-thomistic-neo-aristotelian-common-sense-dualism": 3 },
      no: {}
    },
    {
      t: "God hands each person their soul; it comes from Him, not from your brain.",
      why: "Across Judaism, Christianity, and Islam, many hold that God supplies every individual with a soul.",
      yes: { "god-as-the-supplier-of-souls": 3 },
      no: {}
    },
    {
      t: "Matter comes in levels, but consciousness itself sits above every level.",
      why: "Gomatam’s Vedanta-inspired view gives matter sophisticated levels that carry features of mind, without ever reducing consciousness to matter.",
      yes: { "gomatam-s-gv-vedanta-consciousness": 3 },
      no: {}
    },
    {
      t: "The oldest human idea is the truest: spirit walks alongside matter.",
      why: "For most of history, humans took nonphysical realities for granted. This entry honors that ancient default.",
      yes: { "historical-and-traditional-dualisms": 3 },
      no: {}
    },
    {
      t: "No physics will ever capture what your experience feels like from the inside.",
      why: "Kind’s modern dualism drops the religious baggage. Its core claim: physical description leaves out the felt quality of experience.",
      yes: { "kind-s-dualism-2-0": 3 },
      no: {}
    },
    {
      t: "You are a soul plus a separate spark of the divine, only briefly wearing a body.",
      why: "The mystic Lorber taught that each person is a soul plus a divine spirit, incarnated in matter for a short time.",
      yes: { "lorber-s-soul-and-spirit": 3 },
      no: {}
    },
    {
      t: "Living things come with a built-in higher component that does the feeling.",
      why: "Mascari’s paradigm says nature equips organisms with a higher-level mind component. It is dualism grown by biology rather than given by God.",
      yes: { "mascari-s-qualion-mind-paradigm": 3 },
      no: {}
    },
    {
      t: "What makes you the same person at 8 and at 80 is one immaterial soul.",
      why: "Moreland defends the classic view: a substantial soul, wholly immaterial, is the anchor of personal identity.",
      yes: { "moreland-s-christian-soul": 3 },
      no: {}
    },
    {
      t: "The brain alone can’t make a mind. Something nonphysical works alongside it.",
      why: "This is dualism in its simplest form: the human mind needs a nonphysical component cooperating with the brain.",
      yes: { "nonphysical-component-in-the-human-mind": 3 },
      no: {}
    },
    {
      t: "Centuries of philosophers were right: mind and matter are two different realities.",
      why: "This entry traces dualism’s long philosophical history. Endorsing it means siding with that tradition.",
      yes: { "philosophical-history-of-dualism": 3 },
      no: {}
    },
    {
      t: "Your thoughts genuinely push your neurons around, physics objections aside.",
      why: "Pitts defends interactionist dualism: mind causes physical effects. The famous energy-conservation objection, he argues, rests on circular reasoning.",
      yes: { "pitts-s-interactionist-dualism-energy-conservation-and-mental-causation": 3 },
      no: {}
    },
    {
      t: "There’s only physical stuff, but feelings are real properties of it that physics can never explain.",
      why: "Property dualism keeps one substance and adds two property kinds. Brains generate mental properties that no physical description captures.",
      yes: { "property-dualism": 3 },
      no: {}
    },
    {
      t: "Your soul journeys through other realms before you’re born and after you die.",
      why: "Across traditions, the soul is said to pass through stages and realms beyond this life. This entry gathers that picture.",
      yes: { "realms-of-the-soul": 3 },
      no: {}
    },
    {
      t: "The world’s indigenous traditions were right about the soul all along.",
      why: "Soul concepts in many forms run through indigenous religions worldwide. This entry takes that witness seriously.",
      yes: { "soul-in-indigenous-religions": 3 },
      no: {}
    },
    {
      t: "The medieval Islamic philosophers mapped the soul’s levels correctly.",
      why: "Thinkers like Avicenna and Averroes built a careful metaphysics of soul, intellect, and body. This entry stands with them.",
      yes: { "soul-in-islamic-philosophy": 3 },
      no: {}
    },
    {
      t: "The Hebrew Bible’s picture of soul and spirit gets human nature right.",
      why: "Nephesh and ruach, soul and spirit, anchor the Hebrew scriptures’ view of the person. This entry affirms that vision.",
      yes: { "soul-in-the-hebrew-bible-and-jewish-philosophy": 3 },
      no: {}
    },
    {
      t: "You have an immortal soul, as Christian teaching holds.",
      why: "The immortal soul is core Christian doctrine, rooted in the New Testament. This entry affirms it.",
      yes: { "soul-in-the-new-testament-and-christian-philosophy": 3 },
      no: {}
    },
    {
      t: "Your soul is the immaterial form that organizes your body, not a ghost inside it.",
      why: "Stump’s reading of Aquinas: the soul is an immaterial organizing principle realized in the body. No ghost in a machine, just form shaping matter.",
      yes: { "stump-s-thomistic-dualism": 3 },
      no: {}
    },
    {
      t: "Souls belong in the inventory of the world, right next to tables and atoms.",
      why: "Swinburne’s substance dualism: to tell the whole story of the world you must list souls among its substances.",
      yes: { "swinburne-s-substance-dualism": 3 },
      no: {}
    },
    {
      t: "The hidden wisdom inside every religion points to the same truth about the soul.",
      why: "Theosophy blends esoteric teachings East and West into one wisdom-religion. Its core: the soul’s reality, taught everywhere.",
      yes: { "theosophy-s-eclectic-soul-and-consciousness": 3 },
      no: {}
    },
    {
      t: "Reality is made of three basic kinds, not one and not two.",
      why: "Trialism says mind and matter aren’t enough. Reality needs a third fundamental kind alongside them.",
      yes: { "trialism": 3 },
      no: {}
    }
  ]
};
/* Drill-down quizzes: Quantum & Dimensions, Anomalous & Altered States, Challenge.
   One question per verified LOC theory. Same answer rules as the top level. */
// quantum-dimensions: data/quiz-quantum-dimensions.js

// quantum-dimensions-quantum-machinery: data/quiz-quantum-dimensions-quantum-machinery.js

// quantum-dimensions-mind-and-collapse: data/quiz-quantum-dimensions-mind-and-collapse.js

// quantum-dimensions-hidden-orders: data/quiz-quantum-dimensions-hidden-orders.js

// quantum-dimensions-cosmic-consciousness: data/quiz-quantum-dimensions-cosmic-consciousness.js

// quantum-dimensions-relational-views: data/quiz-quantum-dimensions-relational-views.js

window.QUIZ_DATA.drill["anomalous-altered-states"] = {
  name: "Anomalous & Altered States",
  color: "#686882",
  categoryId: "anomalous-altered-states",
  kicker: "A QUIZ · ANOMALOUS & ALTERED STATES",
  title: "Which kind fits you?",
  intro: "Twenty-three questions, all inside strange states of mind.",
  browse: "or browse the map instead",
  areas: [
    { key: "grinberg-s-syntergic-neuronal-field-theory", name: "Grinberg\u2019s Syntergic/Neuronal Field Theory",
      tagline: "The brain\u2019s woven field of activity is experience.",
      url: "https://loc.closertotruth.com/theory/grinberg-s-syntergic-neuronal-field-theory" },
    { key: "josephson-s-psi-informed-models", name: "Josephson\u2019s Psi-Informed Models",
      tagline: "Strange mind phenomena are real clues physics must include.",
      url: "https://loc.closertotruth.com/theory/josephson-s-psi-informed-models" },
    { key: "jung-s-collective-unconscious-and-synchronicity", name: "Jung\u2019s Collective Unconscious and Synchronicity",
      tagline: "All minds share a deep hidden layer.",
      url: "https://loc.closertotruth.com/theory/jung-s-collective-unconscious-and-synchronicity" },
    { key: "wilber-s-integral-theory", name: "Wilber\u2019s Integral Theory",
      tagline: "No single view is complete \u2014 weave them all together.",
      url: "https://loc.closertotruth.com/theory/wilber-s-integral-theory" },
    { key: "baruss-meaning-fields", name: "Baru\u0161s\u2019s Meaning Fields",
      tagline: "Fields of pure meaning run beneath ordinary reality.",
      url: "https://loc.closertotruth.com/theory/baruss-meaning-fields" },
    { key: "combs-s-chaotic-attractor-and-autopoietic-systems", name: "Combs\u2019s Chaotic Attractor and Autopoietic Systems",
      tagline: "Experience settles the way chaos settles into patterns.",
      url: "https://loc.closertotruth.com/theory/combs-s-chaotic-attractor-and-autopoietic-systems" },
    { key: "dops-s-consciousness-research-and-theory", name: "DOPS\u2019s Consciousness Research and Theory",
      tagline: "The evidence points to mind as fundamental.",
      url: "https://loc.closertotruth.com/theory/dops-s-consciousness-research-and-theory" },
    { key: "ferrer-s-participatory-enactive-realism", name: "Ferrer\u2019s Participatory Enactive Realism",
      tagline: "Consciousness is what happens between you and the world.",
      url: "https://loc.closertotruth.com/theory/ferrer-s-participatory-enactive-realism" },
    { key: "graboi-s-three-aspect-model", name: "Graboi\u2019s Three-Aspect Model",
      tagline: "Reality has three layers: matter, mind, and pure awareness.",
      url: "https://loc.closertotruth.com/theory/graboi-s-three-aspect-model" },
    { key: "harp-s-universal-or-god-consciousness", name: "Harp\u2019s Universal or God Consciousness",
      tagline: "Each of us is consciousness wearing a mind and body.",
      url: "https://loc.closertotruth.com/theory/harp-s-universal-or-god-consciousness" },
    { key: "hiller-s-eternal-discarnate-consciousness", name: "Hiller\u2019s Eternal Discarnate Consciousness",
      tagline: "Your soul outlives the body, in a universal field.",
      url: "https://loc.closertotruth.com/theory/hiller-s-eternal-discarnate-consciousness" },
    { key: "johnson-and-debold-s-urantia-theocosmic-cosmopsychism", name: "Johnson and Debold\u2019s Urantia Theocosmic Cosmopsychism",
      tagline: "Consciousness flows down from an infinite personal source.",
      url: "https://loc.closertotruth.com/theory/johnson-and-debold-s-urantia-theocosmic-cosmopsychism" },
    { key: "khasho-s-nde-enabled-unified-field-level-model", name: "Khasho\u2019s NDE-Enabled Field-Substrate Translation Model",
      tagline: "The brain filters a deeper field of awareness.",
      url: "https://loc.closertotruth.com/theory/khasho-s-nde-enabled-unified-field-level-model" },
    { key: "mossbridge-s-informational-substrate-as-collective-unconscious", name: "Mossbridge\u2019s Informational Substrate as Collective Unconscious",
      tagline: "A shared deep layer underlies all minds.",
      url: "https://loc.closertotruth.com/theory/mossbridge-s-informational-substrate-as-collective-unconscious" },
    { key: "near-death-experiences-survival-past-lives", name: "Near-Death Experiences, Survival, Past Lives",
      tagline: "Near-death experiences show mind can exist apart from body.",
      url: "https://loc.closertotruth.com/theory/near-death-experiences-survival-past-lives" },
    { key: "no-l-s-nested-field-theory", name: "No\u00ebl\u2019s Nested Field Theory",
      tagline: "Consciousness rides a hidden field inside quantum fields.",
      url: "https://loc.closertotruth.com/theory/no-l-s-nested-field-theory" },
    { key: "radin-s-challenge-to-materialism", name: "Radin\u2019s Challenge to Materialism",
      tagline: "Your intentions can nudge the physical world.",
      url: "https://loc.closertotruth.com/theory/radin-s-challenge-to-materialism" },
    { key: "schlitz-s-theory-of-mind", name: "Schlitz\u2019s Theory of Mind",
      tagline: "Inner and outer meet at a real interface.",
      url: "https://loc.closertotruth.com/theory/schlitz-s-theory-of-mind" },
    { key: "schooler-s-general-resonance-theory-and-subjective-time", name: "Schooler\u2019s General Resonance Theory and Subjective Time",
      tagline: "Consciousness arises as you move through time.",
      url: "https://loc.closertotruth.com/theory/schooler-s-general-resonance-theory-and-subjective-time" },
    { key: "sheldrake-s-morphic-fields", name: "Sheldrake\u2019s Morphic Fields",
      tagline: "Nature runs on habit \u2014 fields carry the memory of forms.",
      url: "https://loc.closertotruth.com/theory/sheldrake-s-morphic-fields" },
    { key: "shiah-s-contentless-consciousness-theory", name: "Shiah\u2019s Contentless Consciousness Theory",
      tagline: "Your everyday mind is an illusion over timeless awareness.",
      url: "https://loc.closertotruth.com/theory/shiah-s-contentless-consciousness-theory" },
    { key: "swimme-s-cosmogenesis", name: "Swimme\u2019s Cosmogenesis",
      tagline: "The universe is growing toward consciousness.",
      url: "https://loc.closertotruth.com/theory/swimme-s-cosmogenesis" },
    { key: "tart-s-emergent-interactionism", name: "Tart\u2019s Emergent Interactionism",
      tagline: "Mind and body are different things that interact.",
      url: "https://loc.closertotruth.com/theory/tart-s-emergent-interactionism" }
  ],
  questions: [
    {
      t: "Your brain weaves all of its activity into a single field, and that field is what you experience.",
      why: "Grinberg\u2019s syntergic theory says the brain creates a hypercomplex neuronal field that unifies all its activity. Consciousness is that unification, interacting with a deeper lattice of reality.",
      yes: { "grinberg-s-syntergic-neuronal-field-theory": 3 },
      no: {}
    },
    {
      t: "Strange phenomena of mind are real clues, and physics will have to stretch to include them.",
      why: "Josephson, a Nobel physicist, argues that taking psi seriously changes how we model the brain. Explaining mind means building models that honor both physics and the anomalous evidence.",
      yes: { "josephson-s-psi-informed-models": 3 },
      no: {}
    },
    {
      t: "All human minds share a deep hidden layer, and meaningful coincidences are its fingerprints.",
      why: "Jung\u2019s collective unconscious connects every individual to ancient, universal patterns, the archetypes. Synchronicity is when inner and outer events line up meaningfully without any causal link.",
      yes: { "jung-s-collective-unconscious-and-synchronicity": 3 },
      no: {}
    },
    {
      t: "No single view of mind is complete. The truth weaves together science, spirit, and psychology.",
      why: "Wilber\u2019s Integral Theory is a metatheory harmonizing over a hundred traditions, from neuroscience to meditation. Each captures part of the human condition; the map needs all of them.",
      yes: { "wilber-s-integral-theory": 3 },
      no: {}
    },
    {
      t: "Beneath ordinary reality run fields of pure meaning, and your mind can touch them.",
      why: "Baru\u0161s builds a transcendent theory that takes anomalous phenomena and altered states seriously. Meaning fields, structures of significance woven into reality, play the central role.",
      yes: { "baruss-meaning-fields": 3 },
      no: {}
    },
    {
      t: "Your stream of experience holds together the way chaotic systems settle into repeating patterns.",
      why: "Combs uses chaos theory to explain the unity of consciousness. The many elements of experience cling together as a chaotic attractor, stable in form but never exactly repeating.",
      yes: { "combs-s-chaotic-attractor-and-autopoietic-systems": 3 },
      no: {}
    },
    {
      t: "The evidence points to mind as fundamental: a highest consciousness underlying everything.",
      why: "The University of Virginia\u2019s Division of Perceptual Studies has spent decades documenting cases suggestive of survival and reincarnation. Their conclusion: mind is irreducible, grounded in a highest consciousness.",
      yes: { "dops-s-consciousness-research-and-theory": 3 },
      no: {}
    },
    {
      t: "Consciousness isn\u2019t a thing inside you. It\u2019s what happens in the living relationship between you and the world.",
      why: "Ferrer shifts the search from hidden substances to the co-creative encounter itself. Experience is embodied and relational: it arises between persons, between body and environment, between the human and the Real.",
      yes: { "ferrer-s-participatory-enactive-realism": 3 },
      no: {}
    },
    {
      t: "Reality has three layers: matter, mind, and pure awareness. Your brain taps into the deepest one.",
      why: "Motivated by taking telepathy and clairvoyance as real, Graboi proposes matter, nonphysical mind, and an absolute pure awareness. The brain interacts with pure awareness energy to produce consciousness.",
      yes: { "graboi-s-three-aspect-model": 3 },
      no: {}
    },
    {
      t: "Each of us is consciousness wearing a mind and body, making sense of the universe one moment at a time.",
      why: "Harp seeks to unify physics with spiritual teaching. You are not a body that has consciousness; you are consciousness, experiencing a causal sequence of states through mind and body.",
      yes: { "harp-s-universal-or-god-consciousness": 3 },
      no: {}
    },
    {
      t: "Your soul outlives your body and belongs to a universal field of consciousness.",
      why: "Hiller\u2019s eternal discarnate consciousness, the soul in plain speech, dwells in a Universal Field of Consciousness when freed from the body. It carries moral values that often clash with our pleasure-seeking drives.",
      yes: { "hiller-s-eternal-discarnate-consciousness": 3 },
      no: {}
    },
    {
      t: "Consciousness flows down from an infinite personal source, through levels of mind, to you.",
      why: "Drawing on the Urantia Book, this is a theocosmic cosmopsychism: a Deity-originated mindal architecture, top-down and hierarchical, manifesting through progressively complex levels of mind.",
      yes: { "johnson-and-debold-s-urantia-theocosmic-cosmopsychism": 3 },
      no: {}
    },
    {
      t: "Your brain doesn\u2019t make consciousness. It filters a deeper field of awareness, as near-death experiences reveal.",
      why: "Khasho\u2019s translation model links a unified field-level state with the brain\u2019s biology. Consciousness lives in the field; the brain renders it as localized experience. The veridical features of NDEs are the key evidence.",
      yes: { "khasho-s-nde-enabled-unified-field-level-model": 3 },
      no: {}
    },
    {
      t: "Beneath all minds lies a shared informational deep layer: pure awareness, separate from its contents.",
      why: "Mossbridge treats the collective unconscious as an ontological reality most theories ignore. Her model separates consciousness itself from the contents it carries, grounding both in one informational substrate.",
      yes: { "mossbridge-s-informational-substrate-as-collective-unconscious": 3 },
      no: {}
    },
    {
      t: "Near-death experiences are real evidence that the mind can exist apart from the body.",
      why: "If even a fraction of NDE reports were accurate, every materialist theory would fall. The entry weighs a vast ocean of anecdotes, and stays skeptical while admitting something is going on.",
      yes: { "near-death-experiences-survival-past-lives": 3 },
      no: {}
    },
    {
      t: "Consciousness is a hidden field nested inside the quantum fields of physics, running too high to detect, behind every psychic phenomenon.",
      why: "Nested Field Theory starts from the reality of paranormal phenomena and posits a ubiquitous quantum-like information field operating at frequencies beyond detection. It claims to explain the paranormal more naturally than any rival.",
      yes: { "no-l-s-nested-field-theory": 3 },
      no: {}
    },
    {
      t: "Experiments show your intentions can nudge the physical world. Mind reaches beyond the brain.",
      why: "Radin marshals what he sees as overwhelming laboratory evidence for psi. His inference is direct: intention affects matter, so materialism about mind cannot stand.",
      yes: { "radin-s-challenge-to-materialism": 3 },
      no: {}
    },
    {
      t: "Your inner life and outer events meet at a real interface, and that\u2019s where phenomena like telepathy happen.",
      why: "Schlitz treats consciousness as an interconnected blend of inner and outer realms. That interface, linking what it feels like to be someone with how they behave, is her model for psi and transpersonal experience.",
      yes: { "schlitz-s-theory-of-mind": 3 },
      no: {}
    },
    {
      t: "Consciousness arises as you move through time, and there may be a hidden dimension of time that only minds travel.",
      why: "Schooler combines General Resonance Theory, in which layers of consciousness resonate together, with subjective time: awareness comes with an observer\u2019s movement through time, including a dimension of it physics hasn\u2019t acknowledged.",
      yes: { "schooler-s-general-resonance-theory-and-subjective-time": 3 },
      no: {}
    },
    {
      t: "Nature runs on habit. Invisible fields carry the memory of forms, from crystals to minds.",
      why: "Sheldrake\u2019s morphic fields are fields of organization: every kind of thing has one, shaped by what similar things did before. Memory is inherent in nature, not stored in brains alone.",
      yes: { "sheldrake-s-morphic-fields": 3 },
      no: {}
    },
    {
      t: "Your everyday mind is an illusion. True consciousness is a timeless, contentless awareness underneath it.",
      why: "Drawing on Buddhist wisdom, this view says ordinary consciousness is a dependent illusion. Beneath perceptions, desires, and ego lies an eternal, non-dual awareness with no contents at all.",
      yes: { "shiah-s-contentless-consciousness-theory": 3 },
      no: {}
    },
    {
      t: "The universe is growing toward consciousness, and your awareness is part of its purpose.",
      why: "Swimme\u2019s cosmogenesis sees the cosmos evolving toward greater complexity and consciousness as its ultimate aim. Human awareness isn\u2019t an accident; it\u2019s what the whole process was heading toward.",
      yes: { "swimme-s-cosmogenesis": 3 },
      no: {}
    },
    {
      t: "Mind and body are different things that interact, and altered states of consciousness prove it.",
      why: "Tart\u2019s dualism is grounded in a lifetime studying altered states and parapsychology. Consciousness emerges in interaction with the brain but isn\u2019t reducible to it.",
      yes: { "tart-s-emergent-interactionism": 3 },
      no: {}
    }
  ]
};

// challenge: data/quiz-challenge.js
/* Materialism drills — generated draft.
   Top-level drill: 12 schools of materialism, each linking to a sub-drill.
   Sub-drills: one per school, covering every verified LOC theory in it. */
window.QUIZ_DATA.drill["materialism"] = {
  name: "Materialism",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Twelve questions, one per materialist school — then go deeper.",
  browse: "or browse the map instead",
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
  questions: [
    {
      t: "Consciousness starts with feelings about what your body needs.",
      why: "This school says experience begins with the body. Hunger, thirst, and pain are the original form of awareness.",
      yes: { "materialism-homeostatic-affective": 3 },
      no: {}
    },
    {
      t: "Your mind is a kind of program running on brain hardware.",
      why: "This school treats the mind as software. What matters is what the brain does, not what it's made of.",
      yes: { "materialism-computational-functionalism": 3 },
      no: {}
    },
    {
      t: "Consciousness will be found in specific brain circuits and activity patterns.",
      why: "This school hunts for the exact neural machinery. Find the circuits behind experience and you've found consciousness.",
      yes: { "materialism-neurobiological": 3 },
      no: {}
    },
    {
      t: "Consciousness evolved gradually, so animals have it in simpler forms.",
      why: "This school reads consciousness through evolution. It appeared step by step, so simpler animals have simpler versions.",
      yes: { "materialism-phylogenetic-evolutionary": 3 },
      no: {}
    },
    {
      t: "Language is what turns raw feeling into full human consciousness.",
      why: "This school ties our kind of awareness to words. Language lets us name, keep, and share experience.",
      yes: { "materialism-language-relationships": 3 },
      no: {}
    },
    {
      t: "Consciousness is the brain's electromagnetic field, not just its neurons.",
      why: "This school says the field that neurons generate is where experience happens. Neurons make it, but the field is the mind.",
      yes: { "materialism-electromagnetic-field": 3 },
      no: {}
    },
    {
      t: "Careful argument can show the mind is fully physical without losing what experience feels like.",
      why: "This school defends materialism with philosophy. The mystery is in our thinking, not in reality itself.",
      yes: { "materialism-philosophical": 3 },
      no: {}
    },
    {
      t: "Consciousness lives in relationships between brain, body, and world, not in any single place.",
      why: "This school says experience is relational. It's what happens between a brain, a body, and its surroundings.",
      yes: { "materialism-relational": 3 },
      no: {}
    },
    {
      t: "You need a living body acting in the world to have a mind.",
      why: "This school says the mind isn't in the head alone. It emerges from a body moving, sensing, and engaging.",
      yes: { "materialism-embodied-enactive": 3 },
      no: {}
    },
    {
      t: "You're conscious of something when your brain forms thoughts about its own thoughts.",
      why: "This school adds a second layer. Awareness happens when the brain represents its own representations.",
      yes: { "materialism-higher-order": 3 },
      no: {}
    },
    {
      t: "Seeing red just is your brain representing red, with no second layer needed.",
      why: "This school says experience is direct. The brain represents the world, and that representing is the feeling.",
      yes: { "materialism-first-order": 3 },
      no: {}
    },
    {
      t: "Consciousness, as you imagine it, doesn't really exist: it's an illusion.",
      why: "This school says our idea of experience is wrong. There is no inner glow; the brain just convinces you there is.",
      yes: { "materialism-eliminative-illusionism": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-homeostatic-affective"] = {
  name: "Homeostatic & Affective",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Fifteen questions, all inside homeostatic and affective materialism.",
  browse: "or browse the map instead",
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
  questions: [
    {
      t: "Consciousness evolved so you could remember your life, not just react to the moment.",
      why: "Budson argues the point of being conscious is episodic memory. Reliving the past is what the system is for.",
      yes: { "budsons-consciousness-as-a-memory-system": 3 },
      no: {}
    },
    {
      t: "Your brain doesn’t wait for the world; it generates its own rhythms and the world just tunes them.",
      why: "Buzsáki says the brain is self-driven. Its internal rhythms come first; incoming signals only adjust them.",
      yes: { "buzsaki-s-neural-syntax-and-self-caused-rhythms": 3 },
      no: {}
    },
    {
      t: "The richness of your experience tracks how disorderly your brain activity is.",
      why: "Carhart-Harris links consciousness to entropy. More disorder means a richer, more flexible mind, up to a point.",
      yes: { "carhart-harris-s-entropic-brain-hypothesis": 3 },
      no: {}
    },
    {
      t: "Consciousness began as feelings that tell the body how it’s doing.",
      why: "Damasio argues feelings came before thoughts. Hunger, pain, and thirst are the original form of awareness.",
      yes: { "damasio-s-homeostatic-feelings-and-emergence-of-consciousness": 3 },
      no: {}
    },
    {
      t: "A self emerges when living processes organize themselves and keep themselves going.",
      why: "Deacon sees the self as a pattern that sustains itself. Consciousness appears where systems maintain their own order.",
      yes: { "deacon-s-self-organized-constraint-and-emergence-of-self": 3 },
      no: {}
    },
    {
      t: "Consciousness is what happens when a brain manages energy the way physics demands.",
      why: "These views treat the mind as a thermodynamic process. Experience is tied to how the brain handles energy and disorder.",
      yes: { "entropic-theories": 3 },
      no: {}
    },
    {
      t: "Your brain constantly predicts what’s coming, and consciousness is the process of correcting those guesses.",
      why: "Friston’s view: the brain minimizes surprise. It predicts the world, and updates when the prediction is wrong.",
      yes: { "friston-s-free-energy-principle-and-active-inference": 3 },
      no: {}
    },
    {
      t: "Consciousness shows up when your brain reorganizes itself to fix mistakes in pursuing its goals.",
      why: "Mansell ties awareness to error correction. When control systems reorganize to reduce mistakes, consciousness emerges.",
      yes: { "mansell-s-perceptual-control-theory": 3 },
      no: {}
    },
    {
      t: "Consciousness is what happens when attention focuses energy in a special brain system.",
      why: "Marchetti puts attention at the center. Where attention directs energy, experience follows.",
      yes: { "marchetti-s-attention-based-theory-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Consciousness is simply what organized energy in the brain feels like from the inside.",
      why: "Pepperell argues energy is fundamental. Arrange it the way a brain does, and you get experience.",
      yes: { "pepperell-s-organization-of-energy": 3 },
      no: {}
    },
    {
      t: "There’s a basic layer of feeling underneath, and thinking sits on top of it.",
      why: "Pereira splits consciousness in two: raw sentience at the bottom, and reflective awareness built on top.",
      yes: { "pereira-s-sentience": 3 },
      no: {}
    },
    {
      t: "What you perceive is mostly your brain’s prediction, with your senses just checking the details.",
      why: "These views say perception flows downward. The brain predicts, and raw input only corrects the guess.",
      yes: { "predictive-theories-top-down": 3 },
      no: {}
    },
    {
      t: "Consciousness is a feedback loop that keeps predicting the world and updating its model.",
      why: "Sebastian describes a machine that loops: predict, compare, update. Experience is what that loop produces.",
      yes: { "sebastian-s-predictive-machine": 3 },
      no: {}
    },
    {
      t: "Your experience of being you comes from your brain predicting your body’s signals.",
      why: "Seth says the self is a prediction. The brain guesses what the body is doing, and that controlled hallucination is you.",
      yes: { "seth-s-beast-machine-theory": 3 },
      no: {}
    },
    {
      t: "Every conscious experience is built on raw feeling, which starts in the body’s needs.",
      why: "Solms argues affect is the foundation. Before thought, before perception, there is feeling, rooted in keeping the body alive.",
      yes: { "solms-s-affect-as-the-hidden-spring-of-consciousness": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-computational-functionalism"] = {
  name: "Computational & Functionalism",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Fourteen questions, all inside computational and functionalist materialism.",
  browse: "or browse the map instead",
  areas: [
    { key: "awret-s-holographic-correspondence-theory-of-consciousness", name: "Awret’s Holographic Correspondence Theory of Consciousness",
      tagline: "Mind and matter mirror each other like a hologram.",
      url: "https://loc.closertotruth.com/theory/awret-s-holographic-correspondence-theory-of-consciousness" },
    { key: "bitar-s-architectural-theory-of-consciousness", name: "Bitar’s Architectural Theory of Consciousness",
      tagline: "The brain needs a fast worker and a slow boss.",
      url: "https://loc.closertotruth.com/theory/bitar-s-architectural-theory-of-consciousness" },
    { key: "blums-conscious-turing-machine", name: "Blums’ Conscious Turing Machine",
      tagline: "A thinking machine with a model of the world.",
      url: "https://loc.closertotruth.com/theory/blums-conscious-turing-machine" },
    { key: "complex-adaptive-systems-models", name: "Complex Adaptive Systems Models",
      tagline: "Minds emerge from systems that adapt.",
      url: "https://loc.closertotruth.com/theory/complex-adaptive-systems-models" },
    { key: "computational-theories", name: "Computational Theories",
      tagline: "The mind is an information processor.",
      url: "https://loc.closertotruth.com/theory/computational-theories" },
    { key: "critical-brain-hypothesis", name: "Critical Brain Hypothesis",
      tagline: "The brain works best at the edge of chaos.",
      url: "https://loc.closertotruth.com/theory/critical-brain-hypothesis" },
    { key: "grossberg-s-adaptive-resonance-theory", name: "Grossberg’s Adaptive Resonance Theory",
      tagline: "Awareness is the brain resonating with itself.",
      url: "https://loc.closertotruth.com/theory/grossberg-s-adaptive-resonance-theory" },
    { key: "malinkovic-and-aru-s-biological-computationalism", name: "Malinkovic and Aru’s Biological Computationalism",
      tagline: "Only living, energy-burning computation feels.",
      url: "https://loc.closertotruth.com/theory/malinkovic-and-aru-s-biological-computationalism" },
    { key: "markwell-s-process-identity-theory", name: "Markwell’s Process Identity Theory",
      tagline: "Consciousness is what the brain is doing, like weather.",
      url: "https://loc.closertotruth.com/theory/markwell-s-process-identity-theory" },
    { key: "mathematical-theories", name: "Mathematical Theories",
      tagline: "Consciousness might be mathematics itself.",
      url: "https://loc.closertotruth.com/theory/mathematical-theories" },
    { key: "mikkilineni-and-michaels-emergent-optimization-process", name: "Mikkilineni and Michaels’s Emergent Optimization Process",
      tagline: "Minds evolved to manage uncertainty.",
      url: "https://loc.closertotruth.com/theory/mikkilineni-and-michaels-emergent-optimization-process" },
    { key: "minsky-s-society-of-mind", name: "Minsky’s Society of Mind",
      tagline: "Your mind is a society of tiny mindless workers.",
      url: "https://loc.closertotruth.com/theory/minsky-s-society-of-mind" },
    { key: "oreilly-shahs-state-space-theory-and-computational-dynamic-monism", name: "O'Reilly-Shah's State Space Theory and Computational Dynamic Monism",
      tagline: "Consciousness is the brain replaying its own history.",
      url: "https://loc.closertotruth.com/theory/oreilly-shahs-state-space-theory-and-computational-dynamic-monism" },
    { key: "pribram-s-holonomic-brain-theory", name: "Pribram’s Holonomic Brain Theory",
      tagline: "The brain stores memory like a hologram.",
      url: "https://loc.closertotruth.com/theory/pribram-s-holonomic-brain-theory" }
  ],
  questions: [
    {
      t: "Mental states and physical states are two sides of one holographic pattern.",
      why: "Awret borrows the holographic principle from physics. The mind corresponds to matter the way a hologram’s surface holds its image.",
      yes: { "awret-s-holographic-correspondence-theory-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Consciousness needs two systems: one fast and parallel, one slow and in charge.",
      why: "Bitar argues survival demands both. Quick parallel responses handle the body, while a central serial unit manages the whole.",
      yes: { "bitar-s-architectural-theory-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Consciousness is a computation: a machine running a model of the world inside itself.",
      why: "Blum proposes a conscious Turing machine. Give a computer the right architecture and inner models, and experience follows.",
      yes: { "blums-conscious-turing-machine": 3 },
      no: {}
    },
    {
      t: "Consciousness emerges when a system keeps adapting to survive, the way ecosystems do.",
      why: "These models treat the brain as a complex adaptive system. Consciousness is what emerges from all that adapting.",
      yes: { "complex-adaptive-systems-models": 3 },
      no: {}
    },
    {
      t: "Your mind is an information-processing system, like software running on the brain.",
      why: "These views model the mind on computation. Thinking is processing information, and the brain is the hardware.",
      yes: { "computational-theories": 3 },
      no: {}
    },
    {
      t: "Your brain works best balanced between order and chaos, and that’s where consciousness lives.",
      why: "This view says the brain tunes itself to a critical point. Too orderly and it’s rigid; too chaotic and it’s noise. Consciousness sits at the edge.",
      yes: { "critical-brain-hypothesis": 3 },
      no: {}
    },
    {
      t: "You become aware of something when your brain’s signals resonate and lock together.",
      why: "Grossberg says consciousness is resonance. When incoming signals match the brain’s expectations, they amplify each other into awareness.",
      yes: { "grossberg-s-adaptive-resonance-theory": 3 },
      no: {}
    },
    {
      t: "Consciousness needs computation done the biological way, with real energy and chemistry, not just logic.",
      why: "Malinkovic and Aru argue the medium matters. What produces feeling is the brain’s physical, energy-hungry kind of computation, not abstract logic.",
      yes: { "malinkovic-and-aru-s-biological-computationalism": 3 },
      no: {}
    },
    {
      t: "Consciousness is identical to the brain’s ongoing activity, the way weather is identical to moving air.",
      why: "Markwell extends identity theory to processes. Experience isn’t a brain state but the brain’s continuous self-modeling activity, like weather arising from air.",
      yes: { "markwell-s-process-identity-theory": 3 },
      no: {}
    },
    {
      t: "Consciousness can be captured in mathematics, or might be mathematical at its core.",
      why: "These views treat math as the right language for the mind. Some go further: experience itself may be a mathematical structure.",
      yes: { "mathematical-theories": 3 },
      no: {}
    },
    {
      t: "Consciousness evolved to handle uncertainty: keeping a complex body steady in an unpredictable world.",
      why: "Mikkilineni and Michaels see consciousness as regulation. It emerged to manage the unknowns a living system faces.",
      yes: { "mikkilineni-and-michaels-emergent-optimization-process": 3 },
      no: {}
    },
    {
      t: "Your mind is built from countless tiny, mindless parts cooperating like members of a society.",
      why: "Minsky’s famous picture: no single part thinks. Intelligence emerges from hordes of simple agents doing simple jobs.",
      yes: { "minsky-s-society-of-mind": 3 },
      no: {}
    },
    {
      t: "Consciousness is what happens when the brain reconstructs its own recent history through feedback loops.",
      why: "O’Reilly and Shah argue the brain embeds its past states into the present. Experience is that temporally extended replay, not any single state.",
      yes: { "oreilly-shahs-state-space-theory-and-computational-dynamic-monism": 3 },
      no: {}
    },
    {
      t: "Your brain works like a hologram, with memories spread across the whole thing in wave patterns.",
      why: "Pribram proposed the brain processes information holographically. Memories are distributed in interference patterns, not stored in single spots.",
      yes: { "pribram-s-holonomic-brain-theory": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-neurobiological"] = {
  name: "Neurobiological",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Twelve questions, all inside neurobiological materialism.",
  browse: "or browse the map instead",
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
      tagline: "You are a real agent, not a machine.",
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
  questions: [
    {
      t: "Consciousness comes from rhythmic loops of activity circling through large brain networks.",
      why: "These views point to circuits and cycles. When signals loop back through the brain rhythmically, experience arises.",
      yes: { "brain-circuits-and-cycles-theories": 3 },
      no: {}
    },
    {
      t: "There is a specific pattern of brain activity that exactly matches each conscious experience.",
      why: "Crick and Koch launched the hunt for neural correlates: the minimum brain activity needed for any given experience.",
      yes: { "crick-and-koch-s-neural-correlates-of-consciousness": 3 },
      no: {}
    },
    {
      t: "A kind of conductor in your brain selects what gets attention, and consciousness is the record of what it picked.",
      why: "Bach imagines a conductor-like process. It directs attention and integrates, and your awareness is the memory of its choices.",
      yes: { "bach-s-cortical-conductor-theory": 3 },
      no: {}
    },
    {
      t: "Consciousness is completely real, and it reduces to complex processes in the brain.",
      why: "Block defends reduction without dismissal. Experience genuinely exists, and neuroscience will explain it fully.",
      yes: { "block-s-biological-reductionism": 3 },
      no: {}
    },
    {
      t: "Talk of a separate mental realm blocks progress; the mind is neural processes described precisely.",
      why: "Bunge rejects any non-physical mind as unscientific. Psychology must become psychobiology, stated in exact terms.",
      yes: { "bunge-s-emergent-materialism": 3 },
      no: {}
    },
    {
      t: "Your brain’s circuits compete like species in evolution, and consciousness comes from the winners linking up.",
      why: "Edelman’s neural Darwinism: circuits are selected by experience, and reentrant loops between them generate awareness.",
      yes: { "edelman-s-neural-darwinism-and-reentrant-neural-circuitry": 3 },
      no: {}
    },
    {
      t: "Consciousness isn’t necessarily private: two brains could in principle share one experience.",
      why: "Hirstein argues privacy isn’t essential. With the right brain-to-brain link, your experience could become mine.",
      yes: { "hirstein-s-mindmelding": 3 },
      no: {}
    },
    {
      t: "You genuinely choose your actions; you’re a real agent, not just physics playing out.",
      why: "Mitchell defends agency. Organisms aren’t clockwork; they act on reasons, and that agency is real.",
      yes: { "mitchell-s-free-agents": 3 },
      no: { "sapolsky-s-hard-incompatibilism": 1 }
    },
    {
      t: "Even your brain’s background hum, its restless activity in time and space, carries a basic sentience.",
      why: "Northoff starts from the brain’s spontaneous activity. Its temporal and spatial structure is where sentience begins.",
      yes: { "northoff-s-temporo-spatial-sentience": 3 },
      no: {}
    },
    {
      t: "You experience something when attention grabs it at just the right stage of brain processing.",
      why: "Prinz says attention is the key. Information becomes conscious when attention makes it available mid-stream in processing.",
      yes: { "prinz-s-neurofunctionalism-attention-engenders-experience": 3 },
      no: {}
    },
    {
      t: "You don’t really choose anything: every action is fully determined by biology and circumstance.",
      why: "Sapolsky argues free will can’t survive neuroscience. Given your genes, brain, and history, you could not have done otherwise.",
      yes: { "sapolsky-s-hard-incompatibilism": 3 },
      no: { "mitchell-s-free-agents": 1 }
    },
    {
      t: "Consciousness is a real biological feature of brains, like digestion is a feature of stomachs.",
      why: "Searle’s naturalism: experience is caused by the brain and is a real feature of it. No dualism, no reduction away.",
      yes: { "searle-s-biological-naturalism": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-phylogenetic-evolutionary"] = {
  name: "Phylogenetic / Evolutionary",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Twelve questions, all inside evolutionary materialism.",
  browse: "or browse the map instead",
  areas: [
    { key: "andrews-consciousness-without-complex-brains", name: "Andrews's Consciousness Without Complex Brains",
      tagline: "You don’t need a big brain to feel.",
      url: "https://loc.closertotruth.com/theory/andrews-consciousness-without-complex-brains" },
    { key: "cabral-calderin-hechavarria-and-melloni-s-neuroethological-approach", name: "Cabral-Calderin, Hechavarria, and Melloni’s Neuroethological Approach",
      tagline: "Study minds across species, not just humans.",
      url: "https://loc.closertotruth.com/theory/cabral-calderin-hechavarria-and-melloni-s-neuroethological-approach" },
    { key: "cleeremans-and-tallon-baudry-s-functional-value", name: "Cleeremans and Tallon-Baudry’s Functional Value",
      tagline: "Feelings evolved because they’re useful.",
      url: "https://loc.closertotruth.com/theory/cleeremans-and-tallon-baudry-s-functional-value" },
    { key: "dennett-s-evolution-of-minds", name: "Dennett’s Evolution of Minds",
      tagline: "Natural selection built minds, no magic needed.",
      url: "https://loc.closertotruth.com/theory/dennett-s-evolution-of-minds" },
    { key: "feinberg-and-mallatt-s-ancient-origins-of-consciousness", name: "Feinberg and Mallatt’s Ancient Origins of Consciousness",
      tagline: "Consciousness is ancient — fish feel too.",
      url: "https://loc.closertotruth.com/theory/feinberg-and-mallatt-s-ancient-origins-of-consciousness" },
    { key: "halligan-and-oakley-s-species-enhancing-epiphenomenalism", name: "Halligan and Oakley’s Species-Enhancing Epiphenomenalism",
      tagline: "Consciousness changes nothing — but helps the species.",
      url: "https://loc.closertotruth.com/theory/halligan-and-oakley-s-species-enhancing-epiphenomenalism" },
    { key: "holmgren-s-grainy-atomic-feels", name: "Holmgren’s Grainy, Atomic Feels",
      tagline: "Experience comes in tiny rapid grains.",
      url: "https://loc.closertotruth.com/theory/holmgren-s-grainy-atomic-feels" },
    { key: "ledoux-s-deep-roots-of-consciousness", name: "LeDoux’s Deep Roots of Consciousness",
      tagline: "Consciousness grew out of survival circuits.",
      url: "https://loc.closertotruth.com/theory/ledoux-s-deep-roots-of-consciousness" },
    { key: "nichols-s-primal-eye", name: "Nichols’s Primal Eye",
      tagline: "A lost third eye gave us inner vision.",
      url: "https://loc.closertotruth.com/theory/nichols-s-primal-eye" },
    { key: "no-hard-problem-in-william-james-s-psychology", name: "No Hard Problem in William James’s Psychology",
      tagline: "Consciousness evolved to pick the best action.",
      url: "https://loc.closertotruth.com/theory/no-hard-problem-in-william-james-s-psychology" },
    { key: "reber-s-cellular-basis-of-consciousness", name: "Reber’s Cellular Basis of Consciousness",
      tagline: "Life itself is the start of mind.",
      url: "https://loc.closertotruth.com/theory/reber-s-cellular-basis-of-consciousness" },
    { key: "sreedharan-s-affective-survival-theory", name: "Sreedharan’s Affective Survival Theory",
      tagline: "Feelings evolved to keep you alive.",
      url: "https://loc.closertotruth.com/theory/sreedharan-s-affective-survival-theory" }
  ],
  questions: [
    {
      t: "Consciousness doesn’t need a complex brain; simpler animals may feel things too.",
      why: "Andrews argues we’ve been too brain-chauvinist. Progress in studying animal minds suggests simpler creatures have inner lives.",
      yes: { "andrews-consciousness-without-complex-brains": 3 },
      no: {}
    },
    {
      t: "To understand consciousness, study it across species and ages, not just in adult humans.",
      why: "This approach says human adults are a narrow sample. Compare brains across the tree of life to find what consciousness really needs.",
      yes: { "cabral-calderin-hechavarria-and-melloni-s-neuroethological-approach": 3 },
      no: {}
    },
    {
      t: "Conscious experience survived evolution because feeling things helps you decide and act.",
      why: "Cleeremans and Tallon-Baudry give consciousness a job. Experience guides behavior, and that’s why it evolved.",
      yes: { "cleeremans-and-tallon-baudry-s-functional-value": 3 },
      no: {}
    },
    {
      t: "Minds were built by natural selection alone: no mysteries, just evolution doing its work.",
      why: "Dennett’s story: competence without comprehension came first. Layer by layer, evolution produced creatures that think.",
      yes: { "dennett-s-evolution-of-minds": 3 },
      no: {}
    },
    {
      t: "Consciousness is hundreds of millions of years old; fish and maybe insects have it.",
      why: "Feinberg and Mallatt push the origin way back. If they’re right, consciousness came with the first complex brains, not with humans.",
      yes: { "feinberg-and-mallatt-s-ancient-origins-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Your conscious experience doesn’t cause your actions; it’s a byproduct, though a useful one for the species.",
      why: "Halligan and Oakley say experience is causally idle. The brain does the work; consciousness rides along, still benefiting the species.",
      yes: { "halligan-and-oakley-s-species-enhancing-epiphenomenalism": 3 },
      no: {}
    },
    {
      t: "Your smooth stream of experience is actually built from tiny, rapid grains of feeling.",
      why: "Holmgren proposes atomic feels: discrete micro-experiences, flickering fast, that blend into the continuous flow you notice.",
      yes: { "holmgren-s-grainy-atomic-feels": 3 },
      no: {}
    },
    {
      t: "Consciousness grew out of ancient survival machinery: the circuits that kept early animals alive.",
      why: "LeDoux traces awareness to survival. The systems that detected danger and opportunity gradually became conscious ones.",
      yes: { "ledoux-s-deep-roots-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Consciousness, including dreams, began when our ancestors lost a light-sensing “third eye” on top of the head.",
      why: "Nichols’s striking claim: the atrophy of the ancestral median eye freed up brain machinery that became phenomenal consciousness and dreaming.",
      yes: { "nichols-s-primal-eye": 3 },
      no: {}
    },
    {
      t: "Consciousness evolved to solve a practical problem: choosing the best behavior in a complex world.",
      why: "Reading James this way, there’s no deep mystery. Awareness is a tool for selecting actions, and selection explains it.",
      yes: { "no-hard-problem-in-william-james-s-psychology": 3 },
      no: {}
    },
    {
      t: "Consciousness began with the first living cells; even a single cell has a primitive kind of mind.",
      why: "Reber argues sentience came with life, not brains. Every cell’s responsiveness is the seed of experience.",
      yes: { "reber-s-cellular-basis-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Consciousness evolved as a system of feelings that help you survive, not as a side effect of big brains.",
      why: "Sreedharan puts affect first. Emotions are the point of consciousness: they steer the organism toward survival.",
      yes: { "sreedharan-s-affective-survival-theory": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-language-relationships"] = {
  name: "Language Relationships",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Eleven questions, all inside language and consciousness.",
  browse: "or browse the map instead",
  areas: [
    { key: "brand-deisler-s-linguistically-attributed-biographical-self-and-conscious-action", name: "Brand Deisler’s Linguistically Attributed Biographical Self and Conscious Action",
      tagline: "Your self was built by other people’s words.",
      url: "https://loc.closertotruth.com/theory/brand-deisler-s-linguistically-attributed-biographical-self-and-conscious-action" },
    { key: "chomsky-s-language-and-consciousness", name: "Chomsky’s Language and Consciousness",
      tagline: "The mystery shows our limits, not magic.",
      url: "https://loc.closertotruth.com/theory/chomsky-s-language-and-consciousness" },
    { key: "drabkin-s-language-as-fundamental-expression", name: "Drabkin’s “Language” as Fundamental Expression",
      tagline: "Reality speaks, and minds listen.",
      url: "https://loc.closertotruth.com/theory/drabkin-s-language-as-fundamental-expression" },
    { key: "fedotovs-communication-hypothesis-of-consciousness", name: "Fedotov's Communication Hypothesis of Consciousness",
      tagline: "To be conscious is to be able to tell someone.",
      url: "https://loc.closertotruth.com/theory/fedotovs-communication-hypothesis-of-consciousness" },
    { key: "hickey-s-language-and-consciousness", name: "Hickey’s Language and Consciousness",
      tagline: "Language organizes thought, but isn’t required.",
      url: "https://loc.closertotruth.com/theory/hickey-s-language-and-consciousness" },
    { key: "jaynes-s-breakdown-of-the-bicameral-mind", name: "Jaynes’s Breakdown of The Bicameral Mind",
      tagline: "Consciousness was invented a few thousand years ago.",
      url: "https://loc.closertotruth.com/theory/jaynes-s-breakdown-of-the-bicameral-mind" },
    { key: "koch-s-consciousness-does-not-depend-on-language", name: "Koch’s Consciousness Does Not Depend on Language",
      tagline: "You can lose words and keep your mind.",
      url: "https://loc.closertotruth.com/theory/koch-s-consciousness-does-not-depend-on-language" },
    { key: "parrington-s-language-and-tool-driven-consciousness", name: "Parrington’s Language and Tool-Driven Consciousness",
      tagline: "Words and tools made us self-aware.",
      url: "https://loc.closertotruth.com/theory/parrington-s-language-and-tool-driven-consciousness" },
    { key: "searle-s-language-and-consciousness", name: "Searle’s Language and Consciousness",
      tagline: "Language and mind lift each other up.",
      url: "https://loc.closertotruth.com/theory/searle-s-language-and-consciousness" },
    { key: "skopelitou-s-logos-language-before-consciousness", name: "Skopelitou’s Logos: Language Before Consciousness?",
      tagline: "No words, no consciousness.",
      url: "https://loc.closertotruth.com/theory/skopelitou-s-logos-language-before-consciousness" },
    { key: "smith-s-language-as-classifier-of-consciousness", name: "Smith’s Language as Classifier of Consciousness",
      tagline: "Words sort and share our experiences.",
      url: "https://loc.closertotruth.com/theory/smith-s-language-as-classifier-of-consciousness" }
  ],
  questions: [
    {
      t: "Your sense of being a continuous self was built by the words other people used about you.",
      why: "Brand Deisler argues the biographical self is socially constructed. Others’ language gives the child a lasting identity to grow into.",
      yes: { "brand-deisler-s-linguistically-attributed-biographical-self-and-conscious-action": 3 },
      no: {}
    },
    {
      t: "Consciousness looks mysterious because we barely understand matter, not because the mind is special.",
      why: "Chomsky suggests the hard problem reflects our ignorance. We don’t grasp what matter can do, so minds seem impossible.",
      yes: { "chomsky-s-language-and-consciousness": 3 },
      no: {}
    },
    {
      t: "Reality expresses itself in a kind of language, and consciousness emerges from being immersed in it.",
      why: "Drabkin treats language as fundamental. Minds arise from dwelling in a reality that articulates itself.",
      yes: { "drabkin-s-language-as-fundamental-expression": 3 },
      no: {}
    },
    {
      t: "Consciousness is the ability to share what’s inside you with another person, through words or gestures.",
      why: "Fedotov defines consciousness by communication. If you can potentially signal your state to others, you’re conscious.",
      yes: { "fedotovs-communication-hypothesis-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Language organizes and shares experience, but consciousness itself doesn’t need words.",
      why: "Hickey gives language a supporting role. It structures thought and spreads experience around, yet feeling predates speech.",
      yes: { "hickey-s-language-and-consciousness": 3 },
      no: {}
    },
    {
      t: "Human consciousness as you know it is only a few thousand years old, invented through language rather than evolved.",
      why: "Jaynes’s radical claim: ancient humans heard gods, not inner voices. Introspective consciousness arrived with language-based culture.",
      yes: { "jaynes-s-breakdown-of-the-bicameral-mind": 3 },
      no: {}
    },
    {
      t: "People who lose all language in brain injuries stay fully conscious, so words aren’t what make a mind.",
      why: "Koch points to clinical cases. When strokes destroy language but spare awareness, consciousness clearly doesn’t need words.",
      yes: { "koch-s-consciousness-does-not-depend-on-language": 3 },
      no: { "skopelitou-s-logos-language-before-consciousness": 1 }
    },
    {
      t: "Human self-consciousness came from language and tool-making evolving together.",
      why: "Parrington ties our kind of awareness to two partners: speaking and making. Each pushed the other forward.",
      yes: { "parrington-s-language-and-tool-driven-consciousness": 3 },
      no: {}
    },
    {
      t: "Language and consciousness grew up together, each making the other richer.",
      why: "Searle sees a bootstrapping loop. Better minds made better language, which made still better minds.",
      yes: { "searle-s-language-and-consciousness": 3 },
      no: {}
    },
    {
      t: "Without language, consciousness could never appear; words come first.",
      why: "Skopelitou puts language before mind. Experience becomes consciousness only when it can be put into words.",
      yes: { "skopelitou-s-logos-language-before-consciousness": 3 },
      no: { "koch-s-consciousness-does-not-depend-on-language": 1 }
    },
    {
      t: "Language lets you sort your experiences and tell others about them.",
      why: "Smith treats language as a filing system for feeling. Words group experiences so they can be kept and communicated.",
      yes: { "smith-s-language-as-classifier-of-consciousness": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-electromagnetic-field"] = {
  name: "Electromagnetic Field",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Nine questions, all inside electromagnetic field theories.",
  browse: "or browse the map instead",
  areas: [
    { key: "ephaptic-coupling", name: "Ephaptic Coupling",
      tagline: "Neurons whisper through electric fields.",
      url: "https://loc.closertotruth.com/theory/ephaptic-coupling" },
    { key: "zhang-s-long-distance-light-speed-telecommunications", name: "Zhang’s Long-Distance Light-Speed Telecommunications",
      tagline: "The brain syncs itself at light speed.",
      url: "https://loc.closertotruth.com/theory/zhang-s-long-distance-light-speed-telecommunications" },
    { key: "ambron-s-local-field-potentials-and-electromagnetic-waves", name: "Ambron’s Local Field Potentials and Electromagnetic Waves",
      tagline: "Awareness rides on waves around neurons.",
      url: "https://loc.closertotruth.com/theory/ambron-s-local-field-potentials-and-electromagnetic-waves" },
    { key: "hunt-and-schooler-s-general-resonance-theory", name: "Hunt and Schooler’s General Resonance Theory",
      tagline: "Everything conscious resonates together.",
      url: "https://loc.closertotruth.com/theory/hunt-and-schooler-s-general-resonance-theory" },
    { key: "jones-s-electromagnetic-fields", name: "Jones’s Electromagnetic Fields",
      tagline: "Your mind is a field your brain generates.",
      url: "https://loc.closertotruth.com/theory/jones-s-electromagnetic-fields" },
    { key: "llinas-s-mindness-state-of-oscillations", name: "Llinás’s Mindness State of Oscillations",
      tagline: "Oscillating neurons create the mind state.",
      url: "https://loc.closertotruth.com/theory/llinas-s-mindness-state-of-oscillations" },
    { key: "mcfadden-s-conscious-electromagnetic-information-theory", name: "McFadden’s Conscious Electromagnetic Information Theory",
      tagline: "Information in the brain’s field is the mind.",
      url: "https://loc.closertotruth.com/theory/mcfadden-s-conscious-electromagnetic-information-theory" },
    { key: "pockett-s-conscious-and-non-conscious-patterns", name: "Pockett’s Conscious and Non-Conscious Patterns",
      tagline: "Only certain field patterns feel like anything.",
      url: "https://loc.closertotruth.com/theory/pockett-s-conscious-and-non-conscious-patterns" },
    { key: "singer-and-melloni-s-large-scale-synchrony", name: "Singer and Melloni’s Large-Scale Synchrony",
      tagline: "Consciousness is the whole brain syncing up.",
      url: "https://loc.closertotruth.com/theory/singer-and-melloni-s-large-scale-synchrony" }
  ],
  questions: [
    {
      t: "Neurons influence each other through electric fields directly, skipping the synapses.",
      why: "Ephaptic coupling: the fields neurons generate nudge their neighbors. Communication happens at field speed, not just across synapses.",
      yes: { "ephaptic-coupling": 3 },
      no: {}
    },
    {
      t: "Distant brain cells sync up through electrical fields at light speed, faster than nerves allow.",
      why: "Zhang suggests field-speed links solve a puzzle: how far-apart brain regions coordinate so fast. The answer may be electromagnetic.",
      yes: { "zhang-s-long-distance-light-speed-telecommunications": 3 },
      no: {}
    },
    {
      t: "Consciousness may arise from the electromagnetic waves that ripple around active neurons.",
      why: "Ambron, a pain researcher, points to local field potentials. The waves they generate could be where experience happens.",
      yes: { "ambron-s-local-field-potentials-and-electromagnetic-waves": 3 },
      no: {}
    },
    {
      t: "Consciousness is resonance: physical systems syncing up, especially nested electromagnetic fields.",
      why: "Hunt and Schooler generalize the idea. Wherever things resonate in sync, in brains or beyond, consciousness can appear.",
      yes: { "hunt-and-schooler-s-general-resonance-theory": 3 },
      no: {}
    },
    {
      t: "Your mind isn’t made by neurons; it IS the electromagnetic field they generate.",
      why: "Jones’s identity claim: the field is the mind. Neurons produce it, but experience happens in the field itself.",
      yes: { "jones-s-electromagnetic-fields": 3 },
      no: {}
    },
    {
      t: "Your brain’s neurons constantly oscillate, and that ongoing oscillation is the state of being minded.",
      why: "Llinás centers the mindness state on oscillation. The brain’s rhythmic electrical activity is what it is to have a mind.",
      yes: { "llinas-s-mindness-state-of-oscillations": 3 },
      no: {}
    },
    {
      t: "Consciousness is information held in the brain’s electromagnetic field, with neurons as just the power supply.",
      why: "McFadden’s CEMI theory: the field integrates information across the brain instantly. That integrated field-information is experience.",
      yes: { "mcfadden-s-conscious-electromagnetic-information-theory": 3 },
      no: {}
    },
    {
      t: "Some electromagnetic patterns in the brain feel like something; most don’t, and that’s the difference.",
      why: "Pockett distinguishes patterns. The brain makes many field patterns, but only specific ones are conscious experiences.",
      yes: { "pockett-s-conscious-and-non-conscious-patterns": 3 },
      no: {}
    },
    {
      t: "Consciousness happens when far-apart brain regions briefly synchronize, with no single area in charge.",
      why: "Singer and Melloni point to large-scale synchrony. Awareness is the transient binding of distributed regions into one rhythm.",
      yes: { "singer-and-melloni-s-large-scale-synchrony": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-philosophical"] = {
  name: "Philosophical",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Eight questions, all inside philosophical materialism.",
  browse: "or browse the map instead",
  areas: [
    { key: "emergence", name: "Emergence",
      tagline: "New properties appear that can’t be reduced.",
      url: "https://loc.closertotruth.com/theory/emergence" },
    { key: "flanagan-s-constructive-naturalism", name: "Flanagan’s Constructive Naturalism",
      tagline: "Fully natural, yet genuinely meaningful.",
      url: "https://loc.closertotruth.com/theory/flanagan-s-constructive-naturalism" },
    { key: "functionalism", name: "Functionalism",
      tagline: "What the mind does matters, not what it’s made of.",
      url: "https://loc.closertotruth.com/theory/functionalism" },
    { key: "goldstein-s-mind-body-problem", name: "Goldstein’s Mind-Body Problem",
      tagline: "Physical, yet science can’t fully capture it.",
      url: "https://loc.closertotruth.com/theory/goldstein-s-mind-body-problem" },
    { key: "hardcastle-s-argument-against-materialism-skeptics", name: "Hardcastle’s Argument Against Materialism Skeptics",
      tagline: "The mystery is in our heads, not reality.",
      url: "https://loc.closertotruth.com/theory/hardcastle-s-argument-against-materialism-skeptics" },
    { key: "mitchell-s-15-questions", name: "Mitchell’s 15 Questions",
      tagline: "Fifteen questions any theory must answer.",
      url: "https://loc.closertotruth.com/theory/mitchell-s-15-questions" },
    { key: "philosophical-history-of-materialism", name: "Philosophical History of Materialism",
      tagline: "Materialism is thousands of years old.",
      url: "https://loc.closertotruth.com/theory/philosophical-history-of-materialism" },
    { key: "stoljar-s-epistemic-view-and-non-standard-physicalism", name: "Stoljar’s Epistemic View and Non-Standard Physicalism",
      tagline: "The gap is our ignorance, not a real divide.",
      url: "https://loc.closertotruth.com/theory/stoljar-s-epistemic-view-and-non-standard-physicalism" }
  ],
  questions: [
    {
      t: "Consciousness emerges from physical systems in ways that can’t be reduced back to them.",
      why: "Emergence says wholes surprise us. Put matter together right, and genuinely new properties like experience appear.",
      yes: { "emergence": 3 },
      no: {}
    },
    {
      t: "Consciousness is entirely natural and brain-based, and your inner life still really matters.",
      why: "Flanagan wants both. The mind is fully part of nature, yet subjective experience keeps real meaning and causal power.",
      yes: { "flanagan-s-constructive-naturalism": 3 },
      no: {}
    },
    {
      t: "What makes something a mind is what it does (the roles it plays), not what it’s made of.",
      why: "Functionalism defines mental states by their function. Pain is whatever plays pain’s role, in brains or in anything else.",
      yes: { "functionalism": 3 },
      no: {}
    },
    {
      t: "We are fully physical beings, but brain science alone can never fully capture inner experience.",
      why: "Goldstein holds both truths. Materialism is right about what we are, yet something about experience resists scientific capture.",
      yes: { "goldstein-s-mind-body-problem": 3 },
      no: {}
    },
    {
      t: "Consciousness is physical and explainable; the sense of mystery comes from how we think, not from the world.",
      why: "Hardcastle turns the tables on skeptics. The hard problem is a confusion in our thinking, not a gap in nature.",
      yes: { "hardcastle-s-argument-against-materialism-skeptics": 3 },
      no: {}
    },
    {
      t: "Any real theory of consciousness must answer these fifteen hard questions.",
      why: "Mitchell lists what a theory must explain. Any account that handles all fifteen questions in one framework earns the title.",
      yes: { "mitchell-s-15-questions": 3 },
      no: {}
    },
    {
      t: "Materialism isn’t new; thinkers have said mind is matter since ancient Greece and India.",
      why: "This entry traces the lineage. From atomists to Enlightenment mechanism to modern science, one long tradition.",
      yes: { "philosophical-history-of-materialism": 3 },
      no: {}
    },
    {
      t: "Consciousness is physical; the apparent gap exists only because we don’t yet know certain physical facts.",
      why: "Stoljar’s epistemic view: we mistake our ignorance for a metaphysical mystery. Learn the missing physics and the gap closes.",
      yes: { "stoljar-s-epistemic-view-and-non-standard-physicalism": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-relational"] = {
  name: "Relational",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Eight questions, all inside relational materialism.",
  browse: "or browse the map instead",
  areas: [
    { key: "a-clark-s-extended-mind", name: "A. Clark and Chalmers’s Extended Mind",
      tagline: "Your mind extends into your tools.",
      url: "https://loc.closertotruth.com/theory/a-clark-s-extended-mind" },
    { key: "cooke-s-nondual-naturalism-living-mirror-theory", name: "Cooke’s Nondual Naturalism and Living Mirror Theory",
      tagline: "Consciousness is life mirroring reality.",
      url: "https://loc.closertotruth.com/theory/cooke-s-nondual-naturalism-living-mirror-theory" },
    { key: "jaworski-s-hylomorphism", name: "Jaworski’s Hylomorphism",
      tagline: "Mind is the form of an organized body.",
      url: "https://loc.closertotruth.com/theory/jaworski-s-hylomorphism" },
    { key: "kojdi-s-interface-ontology-of-consciousness", name: "Kojdić’s Interface Ontology of Consciousness",
      tagline: "The world you see is an interface your mind builds.",
      url: "https://loc.closertotruth.com/theory/kojdi-s-interface-ontology-of-consciousness" },
    { key: "lahav-s-relativistic-theory", name: "Lahav’s Relativistic Theory",
      tagline: "Consciousness depends on your point of view.",
      url: "https://loc.closertotruth.com/theory/lahav-s-relativistic-theory" },
    { key: "loorits-s-structural-realism", name: "Loorits’s Structural Realism",
      tagline: "Experiences are patterns, nothing spooky.",
      url: "https://loc.closertotruth.com/theory/loorits-s-structural-realism" },
    { key: "mitchell-and-jenning-s-consciousness-needs-a-subject", name: "Mitchell and Jennings’s Consciousness Needs a Subject",
      tagline: "No subject, no consciousness.",
      url: "https://loc.closertotruth.com/theory/mitchell-and-jenning-s-consciousness-needs-a-subject" },
    { key: "tsuchiya-s-relational-approach-to-consciousness", name: "Tsuchiya’s Relational Approach to Qualia",
      tagline: "Qualia are defined by how they relate.",
      url: "https://loc.closertotruth.com/theory/tsuchiya-s-relational-approach-to-consciousness" }
  ],
  questions: [
    {
      t: "Your mind doesn’t stop at your skull; it extends into your notebook, phone, and surroundings.",
      why: "Clark and Chalmers argue cognition leaks outward. If a notebook does what memory does, it’s part of the mind.",
      yes: { "a-clark-s-extended-mind": 3 },
      no: {}
    },
    {
      t: "Consciousness is how living things mirror the world: pure relationship, no separate mind-stuff.",
      why: "Cooke’s living mirror: experience is the relational dynamics of life itself, embedded in a reality that is entirely relational.",
      yes: { "cooke-s-nondual-naturalism-living-mirror-theory": 3 },
      no: {}
    },
    {
      t: "Consciousness is what an organized body does; its form and structure explain the mind.",
      why: "Jaworski revives hylomorphism. Mind isn’t extra stuff added to matter; it’s the structured activity of an organized body.",
      yes: { "jaworski-s-hylomorphism": 3 },
      no: {}
    },
    {
      t: "The world you experience is an interface: your mind’s way of making reality usable.",
      why: "Kojdić says we meet reality through an interface. Consciousness is the capacity that builds and stabilizes that interface.",
      yes: { "kojdi-s-interface-ontology-of-consciousness": 3 },
      no: {}
    },
    {
      t: "Consciousness is physical, but what it looks like depends on the observer’s frame of reference, just like motion in physics.",
      why: "Lahav borrows from relativity. Just as motion depends on your frame, consciousness depends on the cognitive frame observing it.",
      yes: { "lahav-s-relativistic-theory": 3 },
      no: {}
    },
    {
      t: "Your experiences are structural patterns in brain activity, with nothing nonphysical about them.",
      why: "Loorits says structure is enough. Experiences are patterns of neural relations, with nothing ineffable left over.",
      yes: { "loorits-s-structural-realism": 3 },
      no: {}
    },
    {
      t: "Consciousness needs a subject: a living being with interests, persisting through time.",
      why: "Mitchell and Jennings argue experience requires an experiencer. Subjects with interests come first; consciousness belongs to them.",
      yes: { "mitchell-and-jenning-s-consciousness-needs-a-subject": 3 },
      no: {}
    },
    {
      t: "What makes red feel like red is how it relates to every other feeling: the whole structure.",
      why: "Tsuchiya maps relations between experiences. Qualia get their character from their place in the network, not from private glow.",
      yes: { "tsuchiya-s-relational-approach-to-consciousness": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-embodied-enactive"] = {
  name: "Embodied & Enactive",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Seven questions, all inside embodied and enactive views.",
  browse: "or browse the map instead",
  areas: [
    { key: "enactivism", name: "Enactivism",
      tagline: "Minds are made by bodies acting in the world.",
      url: "https://loc.closertotruth.com/theory/enactivism" },
    { key: "froese-s-irruption-theory", name: "Froese’s Irruption Theory",
      tagline: "Intentions irrupt into the body and move it.",
      url: "https://loc.closertotruth.com/theory/froese-s-irruption-theory" },
    { key: "gibson-s-ecological-psychology", name: "Gibson’s Ecological Psychology",
      tagline: "You see the world directly, ready for action.",
      url: "https://loc.closertotruth.com/theory/gibson-s-ecological-psychology" },
    { key: "noe-s-out-of-our-heads-theory", name: "Noë’s “Out of Our Heads” Theory",
      tagline: "Consciousness isn’t in your head.",
      url: "https://loc.closertotruth.com/theory/noe-s-out-of-our-heads-theory" },
    { key: "pretel-wilson-s-human-systems-theory", name: "Pretel-Wilson’s Human Systems Theory",
      tagline: "Mind is the gap between actual and possible.",
      url: "https://loc.closertotruth.com/theory/pretel-wilson-s-human-systems-theory" },
    { key: "thompson-s-mind-in-life", name: "Thompson’s Mind in Life",
      tagline: "Mind is what living bodies do.",
      url: "https://loc.closertotruth.com/theory/thompson-s-mind-in-life" },
    { key: "vucolova-s-collapse-into-translation", name: "Vucolova’s Collapse into Translation",
      tagline: "Awareness is the body translating the world.",
      url: "https://loc.closertotruth.com/theory/vucolova-s-collapse-into-translation" }
  ],
  questions: [
    {
      t: "Your mind arises from your body interacting with the world, not from the brain alone.",
      why: "Enactivism says cognition is something organisms do. Perception and thought emerge from the loop between body and environment.",
      yes: { "enactivism": 3 },
      no: {}
    },
    {
      t: "Your intentions genuinely push into your body’s physics and make things happen.",
      why: "Froese treats subjectivity as causally real. Intentions irrupt into bodily dynamics as measurable deviations that start actions.",
      yes: { "froese-s-irruption-theory": 3 },
      no: {}
    },
    {
      t: "You perceive the world directly, seeing what you can do with things, with no inner model in between.",
      why: "Gibson rejected mental representations. Perception picks up what the environment affords for action, directly.",
      yes: { "gibson-s-ecological-psychology": 3 },
      no: {}
    },
    {
      t: "Consciousness isn’t in your brain; it happens in your active engagement with the world.",
      why: "Noë argues experience is something we do. Like dancing, it needs a partner: the world you’re engaged with.",
      yes: { "noe-s-out-of-our-heads-theory": 3 },
      no: {}
    },
    {
      t: "What we call consciousness is the tension between how things are and how they could be.",
      why: "Pretel-Wilson replaces consciousness with a duality: actual states versus possible ones, held together in human systems.",
      yes: { "pretel-wilson-s-human-systems-theory": 3 },
      no: {}
    },
    {
      t: "Mind and life are one continuous thing; consciousness grows out of the body’s self-organizing processes.",
      why: "Thompson sees no sharp line between living and minding. Where there’s autonomous, sense-making life, mind is already beginning.",
      yes: { "thompson-s-mind-in-life": 3 },
      no: {}
    },
    {
      t: "Consciousness happens when your body translates raw sensations into meaningful symbols.",
      why: "Vucolova describes a collapse into translation. Sensory-motor engagement gets converted into symbolic awareness, and that conversion is experience.",
      yes: { "vucolova-s-collapse-into-translation": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-higher-order"] = {
  name: "Higher-Order",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Seven questions, all inside higher-order theories.",
  browse: "or browse the map instead",
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
  questions: [
    {
      t: "Symbols transformed our minds; human consciousness is awareness reorganized around meaning.",
      why: "Deacon argues symbolic communication rewired us. Once minds could handle symbols, a new virtual kind of awareness appeared.",
      yes: { "deacon-s-symbolic-communication-human-consciousness": 3 },
      no: {}
    },
    {
      t: "What you experience isn’t raw sensation; it’s your brain’s interpretation settling into a stable pattern.",
      why: "Humphrey says the brain interprets. Sensory input falls into attractor states, and the resulting interpretation is what you feel.",
      yes: { "humphrey-s-mental-representations-and-brain-attractors": 3 },
      no: {}
    },
    {
      t: "You consciously see something when a higher brain process certifies it as really out there.",
      why: "Lau’s reality monitoring: the brain tags some signals as real. That higher-order stamp of approval is what makes perception conscious.",
      yes: { "lau-s-perceptual-reality-monitoring-theory": 3 },
      no: {}
    },
    {
      t: "An emotion becomes conscious when your brain forms a higher-order read on what your body is doing.",
      why: "LeDoux extends higher-order theory to feelings. Fear isn’t the racing heart; it’s the brain’s representation of the racing heart.",
      yes: { "ledoux-s-higher-order-theory-of-emotional-consciousness": 3 },
      no: {}
    },
    {
      t: "Your mind is built from layers of simpler sub-systems, each doing a smaller job, stacked into consciousness.",
      why: "Lycan’s homuncular picture: dumb little agents at the bottom, smarter ones above. Stack enough layers and you get a mind.",
      yes: { "lycan-s-homuncular-functionalism": 3 },
      no: {}
    },
    {
      t: "The self doesn’t exist; your brain builds a transparent model that feels like being someone.",
      why: "Metzinger argues nobody is home. The brain’s self-model is transparent: you look through it and mistake it for a real self.",
      yes: { "metzinger-s-no-self-representational-theory-of-subjectivity": 3 },
      no: {}
    },
    {
      t: "Consciousness comes from four brain jobs working together: representing, binding, keeping coherent, and competing.",
      why: "Thagard names the machinery. Representations compete, get bound together and cohere; the winners become your experience.",
      yes: { "thagard-s-neural-representation-binding-coherence-competition": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-first-order"] = {
  name: "First-Order",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Six questions, all inside first-order theories.",
  browse: "or browse the map instead",
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
      url: "https://loc.closertotruth.com/theory/tye-s-contingentism" }
  ],
  questions: [
    {
      t: "You perceive the world directly, with no inner pictures or processing between you and things.",
      why: "Direct perception denies the middleman. Seeing isn’t building a model; it’s an unmediated openness to the world.",
      yes: { "direct-perception-theory": 3 },
      no: {}
    },
    {
      t: "What an experience feels like is nothing more than what it tells you about the world.",
      why: "Jackson’s representationalism: phenomenal character is representational content. The redness of red is information about red things.",
      yes: { "jackson-s-representationalism-and-the-knowledge-argument": 3 },
      no: {}
    },
    {
      t: "You see something consciously when signals loop back through your visual brain areas, not on the first pass.",
      why: "Lamme’s key distinction: feedforward sweep is unconscious. Consciousness needs recurrent feedback within sensory cortex.",
      yes: { "lamme-s-recurrent-processing-theory": 3 },
      no: {}
    },
    {
      t: "Consciousness is the structured content moving through your brain’s processing: the representations themselves.",
      why: "Clark identifies consciousness with content. What flows through the system, richly structured, is what you experience.",
      yes: { "t-w-clark-s-content-hypothesis": 3 },
      no: {}
    },
    {
      t: "Try to inspect your experience and you find only the world; experience is transparent.",
      why: "Transparency: when you look at your seeing, you see the tree, not your seeing of the tree. Experience points outward.",
      yes: { "transparency-theory": 3 },
      no: {}
    },
    {
      t: "In our world, experiences are identical to brain states, but that identity is a local fact, not a universal law.",
      why: "Tye’s contingentism: the mind-brain identity holds here the way water is H2O here. Elsewhere, things could be otherwise.",
      yes: { "tye-s-contingentism": 3 },
      no: {}
    }
  ]
};

window.QUIZ_DATA.drill["materialism-eliminative-illusionism"] = {
  name: "Eliminative / Illusionism",
  color: "#EDCF4A",
  categoryId: "materialism",
  kicker: "A QUIZ · MATERIALISM",
  title: "Which kind fits you?",
  intro: "Five questions, all inside eliminativism and illusionism.",
  browse: "or browse the map instead",
  areas: [
    { key: "blackmore-s-it-s-all-models", name: "Blackmore’s “It’s All Models”",
      tagline: "It’s models all the way down.",
      url: "https://loc.closertotruth.com/theory/blackmore-s-it-s-all-models" },
    { key: "churchland-s-eliminative-materialism", name: "Churchland’s Eliminative Materialism",
      tagline: "Folk psychology is false; the mind goes.",
      url: "https://loc.closertotruth.com/theory/churchland-s-eliminative-materialism" },
    { key: "frankish-s-illusionism", name: "Frankish’s Illusionism",
      tagline: "Experience is real, but its glow is fake.",
      url: "https://loc.closertotruth.com/theory/frankish-s-illusionism" },
    { key: "graziano-s-attention-schema-theory", name: "Graziano’s Attention Schema Theory",
      tagline: "Awareness is your brain’s model of attention.",
      url: "https://loc.closertotruth.com/theory/graziano-s-attention-schema-theory" },
    { key: "ostendorf-s-predictive-pattern-driven-interface", name: "Ostendorf’s Predictive, Pattern-Driven Interface",
      tagline: "The self is a useful simulation.",
      url: "https://loc.closertotruth.com/theory/ostendorf-s-predictive-pattern-driven-interface" }
  ],
  questions: [
    {
      t: "Consciousness belongs to the models your brain builds, not to the brain or body themselves.",
      why: "Blackmore says drop the owner. There are only models: of the body, the world, the self. The models are all there is.",
      yes: { "blackmore-s-it-s-all-models": 3 },
      no: {}
    },
    {
      t: "Our everyday ideas about the mind (beliefs, feelings, qualia) are false theories that science will eliminate.",
      why: "Churchland compares folk psychology to phlogiston. Neuroscience will replace our mental vocabulary, not vindicate it.",
      yes: { "churchland-s-eliminative-materialism": 3 },
      no: {}
    },
    {
      t: "Your experiences are real, but the special “what it’s like” quality you think they have is an illusion.",
      why: "Frankish’s careful cut: experiences exist, but their phenomenal glow doesn’t. The brain misrepresents its own states as having magic properties.",
      yes: { "frankish-s-illusionism": 3 },
      no: {}
    },
    {
      t: "Consciousness is your brain’s simplified model of its own attention: useful, but not what it seems.",
      why: "Graziano compares it to the body schema. The brain models attention the way it models the body, and that model is what you call awareness.",
      yes: { "graziano-s-attention-schema-theory": 3 },
      no: {}
    },
    {
      t: "Your inner self is a recursive simulation your brain runs: convincing and adaptive, but not real.",
      why: "Ostendorf calls consciousness a predictive interface. It’s a simulation that helps you act, with no real self behind it.",
      yes: { "ostendorf-s-predictive-pattern-driven-interface": 3 },
      no: {}
    }
  ]
};
