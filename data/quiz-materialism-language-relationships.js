/* The Language Relationships quiz: an axis quiz, like data/quiz-idealisms.js.
   11 theories LOC lists under Materialism's Language Relationships. They
   disagree about how language and consciousness depend on each other, so
   11 axes cover: whether consciousness needs language, whether human
   self-awareness is a different kind of thing made by language and
   culture, how recent it is, the self as given by others' words,
   consciousness as what can be told, language as a tool for thinking or
   for talking, words as labels or makers of experience, language and mind
   growing together, tools alongside words, reality as itself language-like,
   and whether the mystery is beyond our minds. Profiles carry each
   theory's justified rejections as well as its signature. Checked by
   tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "needs", claim: "Consciousness needs language",
      yes: "no language, no consciousness", no: "consciousness comes before words" },
    { key: "human", claim: "Language and culture made human self-awareness a new kind of thing",
      yes: "language and culture made human self-awareness something new", no: "human awareness is continuous with other animals’" },
    { key: "recent", claim: "Consciousness as we know it is only a few thousand years old",
      yes: "consciousness as we know it is only a few thousand years old", no: "consciousness is far older than history" },
    { key: "social", claim: "Your sense of self comes from how others talk about you",
      yes: "your self is given to you by others’ words", no: "your self grows from within" },
    { key: "tell", claim: "To be conscious of something is to be able to tell someone",
      yes: "being conscious is being able to tell someone", no: "you can be conscious of what you could never report" },
    { key: "thought", claim: "Language is mainly a tool for thinking, not for talking",
      yes: "language is mainly a tool for thinking", no: "language is mainly a tool for talking to others" },
    { key: "labels", claim: "Words sort and label experiences you already have",
      yes: "words sort experiences you already have", no: "words shape and create experience" },
    { key: "together", claim: "Language and consciousness grew up together",
      yes: "language and consciousness lifted each other up", no: "one came first and the other built on it" },
    { key: "tools", claim: "Making tools shaped the human mind as much as language did",
      yes: "tools shaped our minds as much as words", no: "tools weren’t central to how our minds formed" },
    { key: "speaks", claim: "Reality itself is language-like",
      yes: "reality itself speaks, and minds arise by listening", no: "language is something minds bring to the world" },
    { key: "mystery", claim: "Consciousness may be beyond what human minds can understand",
      yes: "consciousness may be beyond our grasp", no: "we can understand consciousness" },
  ];

  var profiles = {
    "brand-deisler-s-linguistically-attributed-biographical-self-and-conscious-action": { social: 2, human: 1, labels: -1, needs: -1 },
    "chomsky-s-language-and-consciousness":                  { mystery: 2, thought: 2, tell: -2, social: -1, needs: -1 },
    "drabkin-s-language-as-fundamental-expression":          { speaks: 2, needs: 1, labels: -1 },
    "fedotovs-communication-hypothesis-of-consciousness":    { tell: 2, thought: -2, social: 1, needs: -1 },
    "hickey-s-language-and-consciousness":                   { thought: 2, needs: -2, labels: 1, human: -1, mystery: -1 },
    "jaynes-s-breakdown-of-the-bicameral-mind":              { recent: 2, human: 2, needs: 1, labels: -1, social: 1, mystery: -1 },
    "koch-s-consciousness-does-not-depend-on-language":      { needs: -2, tell: -2, human: -2, recent: -2, labels: 1, mystery: -1 },
    "parrington-s-language-and-tool-driven-consciousness":   { tools: 2, human: 2, social: 1, together: 1, needs: -1, recent: -1 },
    "searle-s-language-and-consciousness":                   { together: 2, needs: -2, mystery: -2, speaks: -2, recent: -2, tell: -1 },
    "skopelitou-s-logos-language-before-consciousness":      { needs: 2, labels: -2, tell: 1, together: -1 },
    "smith-s-language-as-classifier-of-consciousness":       { labels: 2, tell: 1, needs: -1, thought: -1 },
  };

  var questions = [
    {
      t: "Without language, there could be no consciousness at all.",
      why: "Yes means words, or something like them, are what make experience conscious. No means creatures without language can still feel and see.",
      axes: { needs: 1 },
    },
    {
      t: "Language and culture made human self-awareness a new kind of thing, not just a richer version of what other animals have.",
      why: "Yes means there is a real break between our inner life and theirs. No means human awareness is continuous with other animals’.",
      axes: { human: 1 },
    },
    {
      t: "Consciousness as we know it, an inner voice and a private mental space, is only a few thousand years old.",
      why: "Yes means people in early civilisations didn’t yet have it; it was learned through culture. No means it is far older than written history.",
      axes: { recent: 1 },
    },
    {
      t: "Your sense of being a continuing self came from the way other people talked to you and about you.",
      why: "Yes means your life story was handed to you in others’ words, and you grew into it. No means the sense of self grows mainly from within.",
      axes: { social: 1 },
    },
    {
      t: "To be conscious of something is to be able, at least in principle, to tell someone else about it.",
      why: "Yes means consciousness is tied to communicating, in words or gestures. No means you can be conscious of things you could never report.",
      axes: { tell: 1 },
    },
    {
      t: "Language is mainly a tool for thinking, and only secondarily for talking to others.",
      why: "Yes means its main job is organising thought inside your head. No means it exists mainly to share things with other people.",
      axes: { thought: 1 },
    },
    {
      t: "Words mostly sort and label experiences you already have, rather than shaping what you experience.",
      why: "Yes means experience comes first and words file it away. No means words help make your experience what it is.",
      axes: { labels: 1 },
    },
    {
      t: "Language and consciousness grew up together, each making the other richer.",
      why: "Yes means a two-way process: better minds made better language, which made better minds. No means one came first and the other simply built on it.",
      axes: { together: 1 },
    },
    {
      t: "Making tools did as much as language to shape the human mind.",
      why: "Yes means shaping objects and shaping words grew together, and both formed our kind of awareness. No means tools weren’t central to it.",
      axes: { tools: 1 },
    },
    {
      t: "Reality itself is language-like: it expresses itself, and minds arise by taking part in that expression.",
      why: "Yes means meaning and expression are built into the world. No means language is something minds bring to a world that has none of its own.",
      axes: { speaks: 1 },
    },
    {
      t: "Consciousness may be beyond what human minds can ever understand, just as some ideas are beyond a dog’s.",
      why: "Yes means the mystery may reflect the limits of our minds. No means we can come to understand it.",
      axes: { mystery: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-language-relationships"] = {
    name: "Language Relationships",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside language and consciousness.",
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
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
