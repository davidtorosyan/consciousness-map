/* Landscape of Consciousness Quiz — top level.
   11 questions, one per canonical category. Yes/No/Not sure/Don't understand.
   "Not sure" and "Don't understand" give no points. */
(function () {
  "use strict";
  var cats = {};
  window.LOC_CATEGORIES.forEach(function (c) {
    cats[c.id] = { name: c.name, color: c.color, tagline: c.tagline, url: c.url };
  });

  var Q = [
    {
      t: "Your mind is just what your brain does. Nothing extra.",
      why: "Most scientists start here: damage the brain, you damage the mind.",
      yes: { materialism: 3 },
      no: { dualisms: 2, idealisms: 1 },
    },
    {
      t: "Your mind and your body are two fundamentally different kinds of thing.",
      why: "On this view, thoughts aren't brain events in disguise. They're something else entirely.",
      yes: { dualisms: 3 },
      no: { materialism: 1 },
    },
    {
      t: "Even a grain of sand has a tiny spark of experience.",
      why: "This view puts a spark of experience in everything. Brains just combine tiny sparks into a big one.",
      yes: { panpsychisms: 3 },
      no: { materialism: 1, dualisms: 1 },
    },
    {
      t: "The physical world exists inside consciousness, not the other way around.",
      why: "On this view, matter is what mind looks like from the outside.",
      yes: { idealisms: 3 },
      no: { materialism: 1 },
    },
    {
      t: "Mind and matter are two sides of some deeper single stuff.",
      why: "Neither mind nor matter is basic. Both are faces of something underneath.",
      yes: { "neutral-monism": 3 },
      no: { materialism: 1, dualisms: 1 },
    },
    {
      t: "The secret of consciousness hides in quantum physics.",
      why: "A few views say the secret hides in quantum effects inside neurons.",
      yes: { "quantum-dimensions": 3 },
      no: { materialism: 1 },
    },
    {
      t: "Consciousness is what information feels like from the inside.",
      why: "When a system handles information in the right way, experience comes along with it.",
      yes: { information: 3 },
      no: { materialism: 1, dualisms: 1 },
    },
    {
      t: "Everything is physical, but experience can't be boiled down to brain activity.",
      why: "No souls, no magic. But describing neurons still misses what experience is.",
      yes: { "non-reductive-physicalism": 3 },
      no: { materialism: 1, dualisms: 1 },
    },
    {
      t: "The right starting point is describing experience itself, carefully, as it's lived.",
      why: "Before explaining consciousness, first say exactly what it's like.",
      yes: { phenomenology: 3 },
      no: { materialism: 1 },
    },
    {
      t: "Near-death experiences and psychedelic states reveal something real about the mind.",
      why: "Strange states of mind might be telling us something real.",
      yes: { "anomalous-altered-states": 3 },
      no: { materialism: 1 },
    },
    {
      t: "Science may never fully explain consciousness.",
      why: "Maybe the mystery is permanent. Or we're asking the wrong question.",
      yes: { challenge: 3 },
      no: { materialism: 1, "non-reductive-physicalism": 1 },
    },
  ];

  window.QUIZ_DATA = {
    cats: cats,
    order: window.LOC_CATEGORIES.map(function (c) { return c.id; }),
    top: {
      kicker: "A QUIZ · THE BIG PICTURE",
      title: "Find your view",
      intro: "11 quick questions.",
      browse: "or browse the map instead",
      questions: Q,
    },
  };
})();
