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
      no: {},
    },
    {
      t: "The physical world exists inside consciousness, not the other way around.",
      why: "On this view, matter is what mind looks like from the outside.",
      yes: { idealisms: 3 },
      no: {},
    },
    {
      t: "Mind and matter are two sides of some deeper single stuff.",
      why: "Neither mind nor matter is basic. Both are faces of something underneath.",
      yes: { "neutral-monism": 3 },
      no: {},
    },
    {
      t: "The secret of consciousness hides in quantum physics.",
      why: "A few views say the secret hides in quantum effects inside neurons.",
      yes: { "quantum-dimensions": 3 },
      no: {},
    },
    {
      t: "Consciousness is what information feels like from the inside.",
      why: "When a system handles information in the right way, experience comes along with it.",
      yes: { information: 3 },
      no: {},
    },
    {
      t: "Everything is physical, but experience can't be boiled down to brain activity.",
      why: "No souls, no magic. But describing neurons still misses what experience is.",
      yes: { "non-reductive-physicalism": 3 },
      no: {},
    },
    {
      t: "The right starting point is describing experience itself, carefully, as it's lived.",
      why: "Before explaining consciousness, first say exactly what it's like.",
      yes: { phenomenology: 3 },
      no: {},
    },
    {
      t: "Near-death experiences and psychedelic states reveal something real about the mind.",
      why: "Strange states of mind might be telling us something real.",
      yes: { "anomalous-altered-states": 3 },
      no: {},
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

/* Drill-down quizzes: one per category, narrowing only within it.
   Same answer rules as the top level. "no" scores only where the
   negation directly affirms another sub-area.
   Panpsychisms drill covers the 16 verified theories listed under
   Panpsychisms on the Landscape of Consciousness site
   (https://loc.closertotruth.com/theory?category=panpsychisms),
   each linking to its LOC entry. */
window.QUIZ_DATA.drill = {
  "panpsychisms": {
    name: "Panpsychisms",
    color: "#CF56CA",
    categoryId: "panpsychisms",
    kicker: "A QUIZ · PANPSYCHISMS",
    title: "Which kind fits you?",
    intro: "Sixteen questions, all inside panpsychism.",
    browse: "or browse the map instead",
    areas: [
      { key: "micropsychism", name: "Micropsychism",
        tagline: "Tiny bits of matter have tiny bits of experience.",
        url: "https://loc.closertotruth.com/theory/micropsychism" },
      { key: "panprotopsychism", name: "Panprotopsychism",
        tagline: "Matter carries the raw ingredients of feeling, not feeling itself.",
        url: "https://loc.closertotruth.com/theory/panprotopsychism" },
      { key: "cosmopsychism", name: "Cosmopsychism",
        tagline: "The universe is one big mind; we are pieces of it.",
        url: "https://loc.closertotruth.com/theory/cosmopsychism" },
      { key: "qualia-force", name: "Qualia Force",
        tagline: "Consciousness is a new fundamental force, still undiscovered.",
        url: "https://loc.closertotruth.com/theory/qualia-force" },
      { key: "qualia-space", name: "Qualia Space",
        tagline: "Experience lives in a hidden dimension of reality.",
        url: "https://loc.closertotruth.com/theory/qualia-space" },
      { key: "chalmers", name: "Chalmers\u2019s Panpsychism",
        tagline: "Physics can\u2019t explain feeling, so feeling must be fundamental.",
        url: "https://loc.closertotruth.com/theory/chalmers-s-panpsychism" },
      { key: "strawson", name: "Strawson\u2019s Panpsychism",
        tagline: "What matter is, underneath, is experience.",
        url: "https://loc.closertotruth.com/theory/strawson-s-panpsychism" },
      { key: "goff", name: "Goff\u2019s Panpsychism",
        tagline: "Consciousness belongs in science like mass and charge do.",
        url: "https://loc.closertotruth.com/theory/goff-s-panpsychism" },
      { key: "tye", name: "Tye\u2019s Irreducible Consciousness",
        tagline: "What it\u2019s like is real and can\u2019t be reduced away.",
        url: "https://loc.closertotruth.com/theory/tye-s-irreducible-consciousness" },
      { key: "panqualityism", name: "Coleman\u2019s Panqualityism",
        tagline: "Qualities like color exist at the bottom \u2014 with no one feeling them.",
        url: "https://loc.closertotruth.com/theory/coleman-s-panqualityism" },
      { key: "monadic-panpsychism", name: "Kadi\u0107\u2019s Monadic Panpsychism",
        tagline: "Tiny minds don\u2019t combine; one takes the lead, or all feel as one.",
        url: "https://loc.closertotruth.com/theory/monadic-panpsychism" },
      { key: "harris-field", name: "A. Harris\u2019s Panpsychism as Fundamental Field",
        tagline: "Consciousness is a field; brains tune into it.",
        url: "https://loc.closertotruth.com/theory/a-harris-s-panpsychism-as-fundamental-field" },
      { key: "sheldrake", name: "Sheldrake\u2019s Self-Organizing Systems at All Levels of Complexity",
        tagline: "Mind shows up wherever things organize themselves.",
        url: "https://loc.closertotruth.com/theory/sheldrake-s-self-organizing-systems-at-all-levels-of-complexity" },
      { key: "wallace", name: "Wallace\u2019s Panpsychism Inside Physics",
        tagline: "Physics is unfinished \u2014 mind was inside it all along.",
        url: "https://loc.closertotruth.com/theory/wallace-s-panpsychism-inside-physics" },
      { key: "whitehead", name: "Whitehead\u2019s Process Theory (Panpsychism)",
        tagline: "Reality is flashes of feeling, moment to moment.",
        url: "https://loc.closertotruth.com/theory/whitehead-s-process-theory" },
      { key: "starrett", name: "Starrett\u2019s Radical Panpsychism",
        tagline: "To feel is to model your surroundings and respond.",
        url: "https://loc.closertotruth.com/theory/starrett-s-radical-panpsychism" }
    ],
    questions: [
      {
        t: "A single particle has its own tiny spark of experience.",
        why: "Micropsychism takes experience all the way down: an electron never thinks, yet there is still something it is like to be one, however faint.",
        yes: { micropsychism: 3 },
        no: { cosmopsychism: 1 }
      },
      {
        t: "Matter itself feels nothing. It just carries the raw ingredients that become feeling inside a brain.",
        why: "Panprotopsychism gives particles something less than consciousness: raw proto-conscious properties that brains combine into full experience.",
        yes: { panprotopsychism: 3 },
        no: { micropsychism: 1 }
      },
      {
        t: "The universe itself is one big mind, and our minds are pieces of it.",
        why: "Cosmopsychism starts at the top instead of the bottom. The whole cosmos is conscious, and smaller minds split off from it.",
        yes: { cosmopsychism: 3 },
        no: { micropsychism: 1 }
      },
      {
        t: "Consciousness is its own force of nature, like gravity \u2014 still undiscovered.",
        why: "On this view, feeling isn\u2019t made of anything physics knows. It\u2019s a new basic ingredient of nature, a fifth force waiting to be found.",
        yes: { "qualia-force": 3 },
        no: {}
      },
      {
        t: "Experience lives in a hidden dimension of reality, alongside space and time.",
        why: "On this view, experience needs its own room in reality \u2014 a hidden dimension or structure beyond matter, energy, space, and time.",
        yes: { "qualia-space": 3 },
        no: {}
      },
      {
        t: "No physics equation will ever explain why pain feels like anything. So feeling must be built into reality from the start.",
        why: "Chalmers argues the hard problem has no physical solution. If physics can\u2019t produce feeling, feeling must be fundamental.",
        yes: { chalmers: 3 },
        no: {}
      },
      {
        t: "What matter really is, underneath it all, is experience.",
        why: "Strawson\u2019s realistic monism: physics tells us what matter does. What matter is, in itself, is experience.",
        yes: { strawson: 3 },
        no: { panprotopsychism: 1 }
      },
      {
        t: "Consciousness should sit in science the way mass and charge do \u2014 a basic feature of nature.",
        why: "Goff argues Galileo narrowed science to quantities and left qualities out by design. Put consciousness back as a fundamental feature of the physical world.",
        yes: { goff: 3 },
        no: {}
      },
      {
        t: "What it\u2019s like to see red can\u2019t be reduced to anything else. It\u2019s just real.",
        why: "Tye holds that what it\u2019s like \u2014 the redness of red \u2014 is real and irreducible. No description in other terms captures it.",
        yes: { tye: 3 },
        no: {}
      },
      {
        t: "Qualities like redness exist at the bottom of things \u2014 but nothing down there experiences them.",
        why: "Coleman drops the tiny minds but keeps tiny qualities. Colors and feelings exist unexperienced at the bottom; brains do the experiencing.",
        yes: { panqualityism: 3 },
        no: { micropsychism: 1 }
      },
      {
        t: "Tiny minds never add up. In a brain, one tiny mind feels the whole thing \u2014 or they all feel it together.",
        why: "Kadi\u0107\u2019s fix for the combination problem: don\u2019t combine minds. One tiny subject takes the lead, or every tiny subject feels the whole at once.",
        yes: { "monadic-panpsychism": 3 },
        no: {}
      },
      {
        t: "Consciousness fills reality like a field, and brains tap into it.",
        why: "Harris treats consciousness as a field of nature. A brain taps into it the way a radio picks up a signal.",
        yes: { "harris-field": 3 },
        no: { micropsychism: 1 }
      },
      {
        t: "Anything that organizes itself \u2014 a cell, a flock, a brain \u2014 has some spark of mind.",
        why: "Sheldrake sees mind wherever things organize themselves: cells, crystals, flocks, brains. Self-organization and mentality go together.",
        yes: { sheldrake: 3 },
        no: {}
      },
      {
        t: "Physics left mind out by habit, not by proof. A finished physics includes consciousness.",
        why: "Wallace argues the exclusion of consciousness from science was an assumption, not a finding. A complete physics includes mind from the start.",
        yes: { wallace: 3 },
        no: {}
      },
      {
        t: "Reality is made of tiny flashes of experience, moment to moment.",
        why: "Whitehead\u2019s process view: little drops of feeling, one after another, are what everything is made of.",
        yes: { whitehead: 3 },
        no: {}
      },
      {
        t: "Anything that senses its surroundings and responds has a kind of experience \u2014 atoms included.",
        why: "Starrett defines experience as a thing\u2019s inner model of its surroundings. Atoms model simply; brains model richly. Same kind of thing.",
        yes: { starrett: 3 },
        no: {}
      }
    ]
  }
};
