/* The Philosophical quiz: an axis quiz, like data/quiz-idealisms.js.
   14 theories LOC lists under Materialism's Philosophical theories: 11
   with their own profiles (3 still under LOC review) and 3 grouped with a
   theory the quiz can't tell them apart from (Kim with Epiphenomenalism;
   Ney and Weisberg with Hardcastle). All
   take mind to be physical; 8 axes cover how they differ: experience as an
   irreducible new property, mind defined by its job rather than its stuff,
   a lasting limit to science, the mystery as a quirk of our thinking vs
   missing facts about matter, experience's real causal power and meaning,
   a theory having to answer many questions at once, and materialism as an
   ancient idea. Profiles carry each theory's justified rejections as well
   as its signature. Checked by tools/eval-quiz.js. */
(function () {
  "use strict";
  var axes = [
    { key: "irreducible", claim: "Experience is a new property that can’t be reduced to its parts",
      yes: "experience is a genuinely new, irreducible property", no: "experience reduces to physical processes" },
    { key: "role", claim: "A mental state is defined by its job, not its stuff",
      yes: "a mind is defined by what it does", no: "what a mind is made of matters" },
    { key: "limit", claim: "Science will never fully capture experience",
      yes: "science will never fully capture experience", no: "science can fully explain experience" },
    { key: "illusion", claim: "The sense of mystery comes from how we think about minds",
      yes: "the mystery is a quirk of how we think", no: "the mystery reflects something real" },
    { key: "missing", claim: "We are missing basic facts about matter",
      yes: "we’re missing basic facts about matter", no: "we know enough about matter already" },
    { key: "power", claim: "Your inner life has real causal power and meaning",
      yes: "your inner life has real power and meaning", no: "the inner life adds nothing to the physics" },
    { key: "questions", claim: "A theory must answer many questions at once",
      yes: "a real theory must answer many questions at once", no: "solving the central puzzle is enough" },
    { key: "ancient", claim: "Materialism was worked out by ancient thinkers",
      yes: "ancient thinkers already saw that mind is matter", no: "materialism is a modern, scientific idea" },
  ];

  var profiles = {
    "emergence":                                            { irreducible: 2, power: 1, illusion: -1 },
    "flanagan-s-constructive-naturalism":                   { power: 2, limit: -2, illusion: 1, questions: 1 },
    "functionalism":                                        { role: 2, limit: -1, missing: -1 },
    "goldstein-s-mind-body-problem":                        { limit: 2, irreducible: 1, illusion: -1 },
    "hardcastle-s-argument-against-materialism-skeptics":   { illusion: 2, limit: -2, irreducible: -2, missing: -1, role: -1 },
    "mitchell-s-15-questions":                              { questions: 2, power: 2, irreducible: 1, limit: -1 },
    "philosophical-history-of-materialism":                 { ancient: 2, irreducible: -1, limit: -1 },
    "stoljar-s-epistemic-view-and-non-standard-physicalism": { missing: 2, illusion: -1, irreducible: -1 },
    // under LOC review
    "epiphenomenalism":                                     { irreducible: 2, power: -2 },
    "hobbes-s-mechanical-phantasms-and-the-material-mind":  { irreducible: -2, limit: -1 },
    "locke-s-reflexive-consciousness-and-the-making-of-the-person": { missing: 1, limit: 1, illusion: -1 },
  };

  var questions = [
    {
      t: "Experience is a genuinely new property that appears when matter is organised the right way, and it can’t be reduced to what the parts do.",
      why: "Yes means the whole has something the parts, even fully understood, don’t explain. No means experience comes down to physical processes, such as what brain cells do.",
      axes: { irreducible: 1 },
    },
    {
      t: "What makes something a mind is the job it does, not what it’s made of.",
      why: "Yes means anything playing the same roles, in brains or in other stuff, would have the same mental states. No means the material matters.",
      axes: { role: 1 },
    },
    {
      t: "Even though we are wholly physical, science will never fully capture what experience is like.",
      why: "Yes means something about experience will always slip through scientific description. No means science can, in principle, explain it all.",
      axes: { limit: 1 },
    },
    {
      t: "The feeling that consciousness is a deep mystery comes from how our minds think about minds, not from anything in the world.",
      why: "Yes means the puzzle is a kind of mental habit or confusion that can be cleared up. No means it reflects something real that needs explaining.",
      axes: { illusion: 1 },
    },
    {
      t: "Consciousness seems puzzling because we are still missing basic facts about what matter is.",
      why: "Yes means physics, as we know it, gives an incomplete picture of the physical world. No means we already know enough about matter; the work lies elsewhere.",
      axes: { missing: 1 },
    },
    {
      t: "In a fully natural world, your inner life still has real causal power and meaning.",
      why: "Yes means your thoughts and feelings genuinely make a difference to what you do. No means the inner life adds nothing beyond the physical processes.",
      axes: { power: 1 },
    },
    {
      t: "A real theory of consciousness must answer many questions at once: what it is for, which creatures have it, how it varies, and more.",
      why: "Yes means a theory that handles only one puzzle isn’t yet a theory of consciousness. No means solving the central puzzle would be enough.",
      axes: { questions: 1 },
    },
    {
      t: "The core idea that mind is matter was already worked out by ancient thinkers in Greece and India.",
      why: "Yes means modern materialism continues a very old line of thought. No means it is essentially a modern, scientific idea.",
      axes: { ancient: 1 },
    },
  ];

  window.QUIZ_DATA.drill["materialism-philosophical"] = {
    name: "Philosophical",
    color: "#EDCF4A",
    categoryId: "materialism",
    kicker: "A QUIZ · MATERIALISM",
    title: "Which kind fits you?",
    intro: questions.length + " questions, all inside philosophical materialism.",
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
      url: "https://loc.closertotruth.com/theory/stoljar-s-epistemic-view-and-non-standard-physicalism" },
    { key: "epiphenomenalism", name: "Epiphenomenalism (Materialism)",
      tagline: "Experience is real and physical, but causes nothing.",
      url: "https://loc.closertotruth.com/theory/epiphenomenalism", review: true },
    { key: "hobbes-s-mechanical-phantasms-and-the-material-mind", name: "Hobbes’s Mechanical Phantasms and the Material Mind",
      tagline: "Sensation and thought are just matter in motion.",
      url: "https://loc.closertotruth.com/theory/hobbes-s-mechanical-phantasms-and-the-material-mind", review: true },
    { key: "kim-s-supervenience", name: "Kim’s Supervenience",
      tagline: "No mental difference without a physical difference.",
      url: "https://loc.closertotruth.com/theory/kim-s-supervenience", review: true, group: "epiphenomenalism" },
    { key: "locke-s-reflexive-consciousness-and-the-making-of-the-person", name: "Locke’s Reflexive Consciousness and the Making of the Person",
      tagline: "We may never know whether matter itself can think.",
      url: "https://loc.closertotruth.com/theory/locke-s-reflexive-consciousness-and-the-making-of-the-person", review: true },
    { key: "ney-s-physicalism-not-scientism", name: "Ney’s Physicalism, Not Scientism",
      tagline: "Consciousness is physical, in the sense physics gives that word.",
      url: "https://loc.closertotruth.com/theory/ney-s-physicalism-not-scientism", review: true, group: "hardcastle-s-argument-against-materialism-skeptics" },
    { key: "weisberg-s-explanatory-optimism-via-automated-compression-theory", name: "Weisberg’s Explanatory Optimism via Automated Compression Theory",
      tagline: "Compressed self-access makes experience only look mysterious.",
      url: "https://loc.closertotruth.com/theory/weisberg-s-explanatory-optimism-via-automated-compression-theory", review: true, group: "hardcastle-s-argument-against-materialism-skeptics" }
    ],
    axes: axes,
    profiles: profiles,
    questions: questions,
  };
})();
