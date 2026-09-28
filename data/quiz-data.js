/* Quiz data for the Consciousness Map drill-down quizzes. Hand-authored.
   Principles: one plain sentence per question, minimal jargon.
   "why" is a 1-2 sentence explainer revealed only by "Don't get it".
   yes/no add points to the named areas; "not sure" scores nothing. */
window.QUIZ_DATA = {
  top: {
    id: "top",
    kicker: "THE BIG PICTURE",
    title: "Find your view",
    intro: "9 quick questions.",
    questions: [
      {
        q: "Your mind is just what your brain does — nothing extra.",
        yes: { brain: 2 },
        no: { twokinds: 1, everywhere: 1, allmind: 1, deeper: 1, beyond: 1 }
      },
      {
        q: "Mind and matter are two fundamentally different kinds of stuff.",
        yes: { twokinds: 2 },
        no: { brain: 1, allmind: 1, everywhere: 1 }
      },
      {
        q: "Even a grain of sand has a tiny spark of experience.",
        why: "This view puts a spark of experience in everything. Brains just combine tiny sparks into a big one.",
        yes: { everywhere: 2 },
        no: { brain: 1, twokinds: 1 }
      },
      {
        q: "The physical world is really what mind looks like from the outside.",
        yes: { allmind: 2 },
        no: { brain: 1, twokinds: 1 }
      },
      {
        q: "Explaining consciousness will need quantum physics — brain cells alone won't cut it.",
        why: "A few views say the secret hides in quantum effects inside neurons.",
        yes: { deeper: 2 },
        no: { brain: 1 }
      },
      {
        q: "We may simply never fully explain consciousness — our minds aren't built for it.",
        yes: { beyond: 2 },
        no: { brain: 1, deeper: 1 }
      },
      {
        q: "A computer running the right program could truly feel happy or sad.",
        yes: { brain: 2 },
        no: { twokinds: 1, beyond: 1 }
      },
      {
        q: "Consciousness is mostly a trick — the brain convincing itself it's \u2018someone\u2019.",
        why: "On this view, the \u2018inner movie\u2019 is the brain\u2019s own storytelling.",
        yes: { brain: 2 },
        no: { twokinds: 1, allmind: 1, everywhere: 1 }
      },
      {
        q: "Properly organized information is conscious, whatever it's made of.",
        why: "On this view, consciousness is what information feels like from the inside.",
        yes: { deeper: 2, everywhere: 1 },
        no: { brain: 1, twokinds: 1 }
      }
    ]
  },
  cats: {
    brain: {
      id: "brain",
      kicker: "JUST THE BRAIN",
      title: "Which version fits you?",
      intro: "8 quick questions inside \u201cJust the brain\u201d.",
      questions: [
        {
          q: "The feeling of being \u2018you\u2019 is mostly a trick your brain plays on itself.",
          why: "On this view, the \u2018inner movie\u2019 is the brain\u2019s own storytelling.",
          yes: { illusion: 2 },
          no: { wiring: 1, notreducible: 1 }
        },
        {
          q: "There's a specific brain mechanism that switches consciousness on.",
          yes: { wiring: 2 }
        },
        {
          q: "The right software on the right computer would be truly conscious — neurons optional.",
          yes: { computation: 2 },
          no: { notreducible: 1 }
        },
        {
          q: "Consciousness is literally the brain's electromagnetic field.",
          why: "Every firing neuron makes a tiny electric field. This view says those fields merge into one brain-wide field, and that field is your experience.",
          yes: { field: 2 }
        },
        {
          q: "A brain with no body — floating in a vat — couldn't be conscious.",
          yes: { body: 2 },
          no: { computation: 1 }
        },
        {
          q: "Consciousness evolved gradually — animals have simpler versions of what you feel.",
          yes: { evolved: 2 }
        },
        {
          q: "Even with perfect brain science, something about experience would stay unexplained.",
          yes: { notreducible: 2 },
          no: { wiring: 1, computation: 1 }
        },
        {
          q: "Copy your brain atom by atom, and the copy would be conscious just like you.",
          yes: { computation: 1, wiring: 1 },
          no: { notreducible: 1, body: 1 }
        }
      ]
    }
  }
};
