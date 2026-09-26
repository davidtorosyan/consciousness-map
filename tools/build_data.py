#!/usr/bin/env python3
"""Build data/map-data.js for the Consciousness Map (V3).

Reads theory metadata + CTT links from the quiz repo
(~/workspace/consciousness-theory-quiz/data/theories.js) and combines them
with the V3 taxonomy defined below. Output is a single JS file assigning
window.MAP_DATA.
"""
import json
import re
import sys
from pathlib import Path

QUIZ_DATA = Path.home() / "workspace/consciousness-theory-quiz/data/theories.js"
OUT = Path.home() / "workspace/consciousness-map/data/map-data.js"

src = QUIZ_DATA.read_text()
theories = json.loads(re.search(r"window\.THEORIES_120 = Object\.freeze\((\[.*\])\)", src, re.S).group(1))
links = json.loads(re.search(r"window\.THEORY_LINKS_120 = Object\.freeze\((\{.*\})\)", src, re.S).group(1))
T = {t["id"]: t for t in theories}

# Recovered CTT links (2026-09-26): the quiz repo's THEORY_LINKS_120 only had
# 70 of 120. The other 50 were matched against the CTT sitemap and verified
# HTTP 200. Kept here (not in the quiz repo) while quiz work is paused.
OVERRIDES = Path(__file__).resolve().parent.parent / "data" / "link-overrides.json"
if OVERRIDES.exists():
    links.update({int(k): v for k, v in json.loads(OVERRIDES.read_text()).items()})

# ---------------------------------------------------------------- taxonomy
# Each card: id, name, tagline, description, palette (g1,g2,accent), subs.
# Each sub: id, name, tagline, description, theories=[ids], see_also=[{label,target}]
# target is "cardId.subId".

CARDS = [
    dict(
        id="brain", name="Just the brain",
        short="Mind is what the brain does.",
        tagline="Your mind is what your brain does — nothing more.",
        description=("Consciousness is entirely physical: neurons firing, brain regions "
                      "coordinating, maybe a brain-wide field. There's no extra ingredient — "
                      "a complete neuroscience would fully explain what it's like to see red "
                      "or feel pain. This is the working assumption of most neuroscientists."),
        palette=dict(g1="#06182e", g2="#0b4f6c", accent="#5ee7ff"),
        see_also=[dict(label="Integrated Information Theory lives under Something deeper",
                       target="deeper.information")],
        subs=[
            dict(id="illusion", name="It's an illusion",
                 tagline="\u201cConsciousness\u201d as we imagine it doesn't exist; the brain tricks itself.",
                 description=("On this view, the mind isn't a magical inner theater — it's a trick "
                              "the brain plays on itself. What you call \u201cexperience\u201d is really "
                              "just information processing plus a powerful illusion of a unified self "
                              "watching it all happen. Philosophers like Daniel Dennett argue there's no "
                              "extra \u201csomething it's like\u201d beyond the brain's storytelling. If this "
                              "is right, neuroscience doesn't need to explain consciousness — it needs "
                              "to explain why we think we have it."),
                 theories=[27, 99, 100, 101, 102, 103, 104, 105, 97]),
            dict(id="wiring", name="It's the wiring",
                 tagline="Specific brain mechanisms explain experience: global workspaces, higher-order thoughts, recurrent loops.",
                 description=("Somewhere in the brain's wiring is the difference between being conscious "
                              "and not. Maybe it's a \u201cglobal workspace\u201d where information becomes "
                              "available to the whole brain, or a higher-order thought that turns a "
                              "perception into an experience of perceiving. Researchers hunt for the "
                              "neural correlates of consciousness — the exact circuits that switch "
                              "experience on. On this view, consciousness is an engineering problem, "
                              "and we're reverse-engineering the machine."),
                 theories=[14, 18, 20, 21, 28, 84, 85, 86, 87, 88, 89, 90, 92, 93, 94, 95, 96, 98]),
            dict(id="computation", name="It's computation",
                 tagline="The mind is software; the right program is conscious.",
                 description=("What matters isn't the squishy neurons — it's the program running on "
                              "them. If a system processes information the right way, it will be "
                              "conscious, whether it's made of brain cells, silicon chips, or something "
                              "else entirely. This is the view behind most AI optimism: build the right "
                              "software and experience comes along for free. Your mind is what your "
                              "brain does, and what your brain does is compute."),
                 theories=[17, 106, 107, 108, 109, 110]),
            dict(id="field", name="It's a field",
                 tagline="Consciousness is the brain's electromagnetic field.",
                 description=("Every firing neuron generates a tiny electromagnetic field, and together "
                              "they merge into one unified brain-wide field. On this view, that field "
                              "isn't just a byproduct — it IS consciousness. It explains the unity of "
                              "experience in one stroke: your visual field feels unified because it "
                              "literally is one field. The brain's wiring creates the field, and the "
                              "field is where experience happens."),
                 theories=[25, 77, 78, 79, 80, 81, 82, 83]),
            dict(id="body", name="It's the body too",
                 tagline="Mind needs flesh, movement, and environment — not just neurons.",
                 description=("A brain in a vat wouldn't be conscious, because consciousness isn't in "
                              "the brain at all — it's in the whole loop of body, action, and world. "
                              "You see with your eyes and your hands and your movement through space; "
                              "take away the body and there's nothing left to be conscious with. On "
                              "this view, the mind isn't a thing inside your head. It's something your "
                              "whole organism does."),
                 theories=[24, 111, 112, 113]),
            dict(id="evolved", name="It evolved",
                 tagline="Consciousness is an evolved survival tool, graded across species.",
                 description=("Consciousness wasn't designed — it evolved, like eyes or wings. It "
                              "started simple, as basic sensing tied to survival, and grew more "
                              "elaborate in creatures that needed to model themselves and their world. "
                              "That means it's not all-or-nothing: there's something it's like to be a "
                              "bee or an octopus, just less of it, or a different kind. To understand "
                              "consciousness, study its history across the tree of life."),
                 theories=[22, 23, 114, 115, 116, 117]),
            dict(id="notreducible", name="Physical, but not reducible",
                 tagline="It's all physical, yet no equation will capture \u201cwhat it's like.\u201d",
                 description=("Everything is physical — no souls, no magic. But that doesn't mean "
                              "physics can explain everything. Consciousness might be a genuinely new "
                              "property that appears when matter gets organized the right way: real, "
                              "physical, and yet impossible to reduce to equations about particles. "
                              "The map is not the territory, and the equations are not the experience. "
                              "This is physicalism for people who take the mystery seriously."),
                 theories=[15, 16, 91]),
        ],
    ),
    dict(
        id="twokinds", name="Two kinds of stuff",
        short="Mind and matter: two different things.",
        tagline="Mind and matter are both real — and fundamentally different.",
        description=("Reality contains (at least) two basic kinds of things: physical stuff and "
                     "mental stuff. Your brain is physical, but your conscious self — the part that "
                     "experiences — isn't made of matter and can't be reduced to it. This is the "
                     "classic \u201csoul\u201d intuition, in philosophical dress."),
        palette=dict(g1="#1d1030", g2="#5b2a1e", accent="#f2b25c"),
        subs=[
            dict(id="soulapart", name="A soul apart",
                 tagline="An immaterial self that could in principle survive the body.",
                 description=("The oldest answer: you are not your brain. Your conscious self is an "
                              "immaterial thing — call it a soul — temporarily paired with a physical "
                              "body. In principle it could exist without the body at all. This is "
                              "Descartes' view, and the intuition behind most religious ideas of an "
                              "afterlife."),
                 theories=[4, 44, 45, 47, 48, 7]),
            dict(id="mindmoves", name="Mind moves matter",
                 tagline="The nonphysical mind genuinely pushes neurons around.",
                 description=("Mind and brain are different stuff, but they interact: your conscious "
                              "decisions genuinely cause neurons to fire. Free will is real because "
                              "the mental can push the physical around. The puzzle this view must "
                              "solve: how does something nonphysical nudge a physical brain without "
                              "breaking the laws of physics?"),
                 theories=[6, 42, 49, 50, 51]),
            dict(id="ridesalong", name="Mind rides along",
                 tagline="Experience is real but causes nothing; the brain does all the work.",
                 description=("Consciousness exists — your experiences are real — but they're causally "
                              "powerless, like the whistle on a steam train: produced by the engine, "
                              "moving nothing. Your brain makes every decision; your feeling of "
                              "deciding is just along for the ride. Strange, but it neatly explains "
                              "why physics never needs to mention the mind."),
                 theories=[52]),
            dict(id="twoproperties", name="Two properties, one stuff",
                 tagline="The world is physical, but consciousness is an extra fundamental property.",
                 description=("There's only one kind of stuff — the physical world — but it has two "
                              "kinds of properties: physical ones (mass, charge) and experiential "
                              "ones. Consciousness is a basic feature of nature, like gravity: not a "
                              "separate substance, but irreducible to anything else. One world, two "
                              "kinds of facts."),
                 theories=[5, 43, 46]),
        ],
    ),
    dict(
        id="everywhere", name="Mind is everywhere",
        short="Experience is built into everything.",
        tagline="A spark of experience is built into everything that exists.",
        description=("Consciousness isn't something brains manufacture — it's a basic feature of "
                     "reality, like mass or charge. Particles, fields, or the universe itself have "
                     "some form of experience, and our minds are built out of (or are fragments of) "
                     "that."),
        palette=dict(g1="#04241f", g2="#0d5c43", accent="#6dffa8"),
        see_also=[dict(label="Russellian monism lives under Something deeper",
                       target="deeper.neither")],
        subs=[
            dict(id="tinybits", name="Tiny bits feel",
                 tagline="The smallest pieces of matter have rudimentary experience.",
                 description=("Start at the bottom: what if the tiniest bits of matter already feel "
                              "something — unimaginably simple, nothing like human thought, but "
                              "experience nonetheless? Then brains don't create consciousness from "
                              "nothing; they combine and organize the little sparks that were there "
                              "all along. Your mind is what a mountain of tiny experiences feels "
                              "like from the inside."),
                 theories=[11, 61, 62, 63, 64, 67]),
            dict(id="universeconscious", name="The universe is conscious",
                 tagline="One cosmic consciousness first; we're dissociated fragments of it.",
                 description=("Flip the direction: instead of tiny minds combining upward, start "
                              "with one vast cosmic consciousness and go down. You are a fragment of "
                              "it — dissociated, like a whirlpool in a stream that doesn't know it's "
                              "water. The universe isn't built out of mind-stuff; it IS one mind, and "
                              "we're its parts."),
                 theories=[12],
                 see_also=[dict(label="Also filed under Everything is mind",
                                target="allmind.cosmicmind")]),
            dict(id="protomind", name="Proto-mind",
                 tagline="Building blocks have not-quite-experience; full minds need the right organization.",
                 description=("Maybe the basic ingredients aren't experiences but something one step "
                              "removed: raw qualities with no one feeling them — like the redness of "
                              "red with no observer. Full-blown consciousness only appears when these "
                              "proto-qualities get organized into a subject, a point of view. It's "
                              "panpsychism with a crucial gap between ingredients and experience."),
                 theories=[13, 66]),
            dict(id="quantummindstuff", name="Quantum mind-stuff",
                 tagline="Experience lives in quantum events; entanglement stitches tiny minds together.",
                 description=("What if experience lives at the quantum level — in the strange, "
                              "probabilistic events beneath ordinary physics? And quantum "
                              "entanglement, which links particles across space, could be what "
                              "stitches trillions of tiny experiences into your one unified mind. "
                              "It's panpsychism with quantum mechanics doing the heavy lifting."),
                 theories=[65, 73]),
        ],
    ),
    dict(
        id="allmind", name="Everything is mind",
        short="Reality is fundamentally mind.",
        tagline="The physical world is what mind looks like from the outside.",
        description=("Flip the usual picture: consciousness isn't in the universe — the universe is "
                     "in consciousness. Matter, brains, and bodies are how one fundamental mind "
                     "appears when viewed from outside. There's nothing \u201cnon-mental\u201d at rock "
                     "bottom."),
        palette=dict(g1="#170b33", g2="#5c1a6e", accent="#e08bff"),
        subs=[
            dict(id="cosmicmind", name="One cosmic mind",
                 tagline="Reality is a single universal consciousness; we're like whirlpools in it.",
                 description=("There is one mind — universal consciousness — and everything you call "
                              "\u201cthe physical world\u201d is what its thoughts and feelings look like "
                              "from the outside. You are a dissociated fragment of it, the way a "
                              "whirlpool is a dissociated fragment of a stream. Brains don't generate "
                              "experience; brains are what experience looks like from across the room."),
                 theories=[1, 31, 37, 38, 39, 12],
                 see_also=[dict(label="Also filed under Mind is everywhere",
                                target="everywhere.universeconscious")]),
            dict(id="nondualism", name="Eastern nondualism",
                 tagline="Pure awareness is the sole reality; the separate self is an illusion.",
                 description=("Long before modern philosophy, contemplative traditions arrived at the "
                              "same conclusion: at bottom there is only pure, self-shining awareness. "
                              "The separate self — the \u201cI\u201d that feels cut off from the world — is "
                              "a kind of ignorance or confusion. Wake up from it, and the boundary "
                              "between mind and world dissolves."),
                 theories=[2, 29, 35, 36, 41]),
            dict(id="mindmakesmatter", name="Mind makes matter",
                 tagline="Physical objects are ideas or perceptions; nothing exists unperceived.",
                 description=("What if matter is the illusion and mind is the reality? On this view, "
                              "tables and trees and stars are ideas — perceptions in minds — not "
                              "mind-independent stuff. The physical world doesn't sit out there "
                              "waiting to be seen; to be is to be perceived. It's the most radical "
                              "flip of common sense on this map."),
                 theories=[3, 30, 32, 34, 40]),
        ],
    ),
    dict(
        id="deeper", name="Something deeper",
        short="Quantum, information \u2014 or something neutral.",
        tagline="It's something stranger — quantum effects, pure information, or a reality that's neither mind nor matter.",
        description=("The standard options all feel wrong. Maybe reality is one deeper thing that "
                     "shows up as \u201cmind\u201d and \u201cmatter\u201d the way one coin shows heads and "
                     "tails. Or maybe consciousness comes from quantum physics, or from the "
                     "structure of information itself — something today's science hasn't cracked."),
        palette=dict(g1="#0b1030", g2="#2a3a7a", accent="#9db4ff"),
        see_also=[dict(label="Emergent materialism lives under Just the brain",
                       target="brain.notreducible")],
        subs=[
            dict(id="neither", name="Neither mind nor matter",
                 tagline="Reality is one neutral stuff; mind and matter are two faces of it.",
                 description=("Maybe the whole debate starts from a false choice. Suppose reality is "
                              "made of one deeper stuff that is neither mental nor physical — and "
                              "\u201cmind\u201d and \u201cmatter\u201d are just two ways it shows up, like heads "
                              "and tails on one coin. You never see the coin itself, only its faces. "
                              "Consciousness isn't built from matter or matter from mind; both are "
                              "aspects of something deeper."),
                 theories=[8, 9, 10, 33, 53, 54, 55, 56, 57, 58, 59]),
            dict(id="quantum", name="It's quantum",
                 tagline="Consciousness needs quantum physics, not just neurons.",
                 description=("Classical physics — billiard balls bouncing — can't explain experience. "
                              "But quantum physics is genuinely strange: particles in two places at "
                              "once, instantaneous connections, observation affecting outcomes. Maybe "
                              "consciousness lives in that strangeness: quantum events in the brain's "
                              "microtubules, or mind collapsing quantum possibilities into reality. On "
                              "this view, you need the weirdest physics we have to explain the "
                              "weirdest thing we know."),
                 theories=[26, 68, 69, 70, 71, 72, 74, 75, 76]),
            dict(id="information", name="It's information",
                 tagline="Consciousness is what integrated information feels like from the inside.",
                 description=("Forget stuff — think structure. What if consciousness is what "
                              "information feels like when it's integrated into a unified whole? A "
                              "system is conscious to the degree its information can't be split into "
                              "independent parts. This view comes with actual math: in principle, you "
                              "could calculate how conscious anything is — a human, a mouse, a "
                              "thermostat."),
                 theories=[19, 60, 120]),
        ],
    ),
    dict(
        id="beyond", name="Beyond knowing",
        short="We may never explain it.",
        tagline="Consciousness is real — but we may never fully explain it.",
        description=("Maybe the mind-body problem isn't solvable by us. Our brains may simply lack "
                     "the concepts to understand how matter gives rise to experience, the way a dog "
                     "can't understand calculus. The mystery might be permanent — and that's an "
                     "honest position, not a cop-out."),
        palette=dict(g1="#14161c", g2="#3a4150", accent="#c9d4e3"),
        subs=[
            dict(id="builtnottoget", name="Built to not get it",
                 tagline="Evolution never gave us the concepts; the answer exists but we can't grasp it.",
                 description=("Maybe there IS an answer — and we're just not equipped to find it. "
                              "Evolution built brains to survive, not to solve metaphysics; a dog "
                              "can't do calculus, and we may be the dog relative to consciousness. "
                              "The explanation exists in principle, but our kind of mind can't grasp "
                              "it. Not a failure of science — a fact about us."),
                 theories=[],
                 note="The classic statements of this view aren't in the theory set yet — coming soon."),
            dict(id="noexplanation", name="No explanation in sight",
                 tagline="We currently have no idea what an explanation would even look like.",
                 description=("It's not just that we lack the answer — we lack any idea of what an "
                              "answer would even look like. Every proposed explanation of "
                              "consciousness either sneaks the mystery in through the back door or "
                              "changes the subject. Honest mysterianism starts here: before solving "
                              "the problem, admit we can't yet conceive the solution."),
                 theories=[],
                 note="The classic statements of this view aren't in the theory set yet — coming soon."),
            dict(id="mysterypoint", name="The mystery is the point",
                 tagline="The hard problem may be a permanent feature, not a puzzle to solve.",
                 description=("What if the \u201chard problem\u201d of consciousness isn't a problem at "
                              "all, but a permanent feature of reality — like the fact that there's "
                              "something rather than nothing? Some mysteries aren't puzzles to solve "
                              "but depths to respect. On this view, demanding an explanation of "
                              "experience is like demanding an explanation of existence: the question "
                              "itself may be the mistake."),
                 theories=[],
                 note="The classic statements of this view aren't in the theory set yet — coming soon."),
        ],
    ),
]

PHENOMENOLOGY = dict(
    id="phenomenology", name="Start with experience",
    tagline="Rather describe experience carefully first?",
    description=("Maybe the way in isn't to explain consciousness but to describe it — carefully, "
                 "precisely, setting aside every theory about brains and souls. Phenomenology is "
                 "the disciplined study of experience as it's lived: what seeing, remembering, and "
                 "being embodied actually feel like from the inside. Some philosophers think this "
                 "careful description has to come before any explanation."),
    palette=dict(g1="#101418", g2="#2b3a42", accent="#ffd9a0"),
    theories=[118, 119],
)

# ------------------------------------------------------------------ build

def main():
    # sanity: every theory id 1..120 assigned exactly once across card subs
    # (phenomenology handled separately; card-6 subs intentionally empty)
    assigned = []
    for c in CARDS:
        for s in c["subs"]:
            assigned.extend(s["theories"])
    phen = PHENOMENOLOGY["theories"]
    all_ids = set(range(1, 121))
    got = set(assigned) | set(phen)
    missing = sorted(all_ids - got)
    dupes = sorted({x for x in assigned if assigned.count(x) > 1})
    # cosmopsychism (12) is intentionally cross-listed
    dupes = [d for d in dupes if d != 12]
    if missing:
        sys.exit(f"MISSING theory ids: {missing}")
    if dupes:
        sys.exit(f"DUPLICATE theory ids: {dupes}")
    for tid in assigned:
        if tid not in T:
            sys.exit(f"Unknown theory id {tid}")

    theories_out = {str(tid): {"name": T[tid]["name"], "summary": T[tid]["summary"]}
                    for tid in range(1, 121)}
    data = {
        "cards": CARDS,
        "phenomenology": PHENOMENOLOGY,
        "theories": theories_out,
        "links": links,
    }
    js = "/* Generated by tools/build_data.py — do not edit by hand. */\nwindow.MAP_DATA = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
    OUT.write_text(js, encoding="utf-8")
    counts = {c["id"]: sum(len(s["theories"]) for s in c["subs"]) for c in CARDS}
    print("wrote", OUT, f"({len(js)//1024} KB)")
    print("theory counts per card:", counts, "+ phenomenology:", len(phen))

if __name__ == "__main__":
    main()
