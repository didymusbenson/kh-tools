# BBS research resolution — October 1, 2026

Follow-up to [the research audit](research_audit.md), with live source checks and generated-data integration. Audit appendix locations remain historical references to `f933ab1`; the statuses below describe the corrected repository.

| Finding | Applied answer | Current boundary |
|---|---|---|
| BBS-006 | Outcome 90 now uses Aerora + Ignite. Restored its three character groups and the three Aerora + Aerora groups previously excluded with it. | **Partly resolved:** the level-3 recipe is sourced; minimum Ignite level remains disputed. |
| BBS-007 | Outcome 182 is Magnet Spiral, the 20% alternative to Collision Magnet's 80%, using Stun Edge Lv3 + Magnera Lv3 for all three characters. Restored three groups. | **Closed.** |
| BBS-008 | Outcome 140 now uses the BBS name Confusion Strike. Original “Confusing Strike” spelling is retained in correction provenance. | **Closed.** This is an edition-specific name correction, not a separate command. |
| BBS-017 | Spiderchest → Fleeting Crystal, 3.6% at Shop Levels 1–2 only, added to melding sources, material details and bestiary. | **Closed for the drop relationship.** Character-specific accessible farm routes remain BBS-015; no unconditional farm is claimed. |
| BBS-015 detail | Archraven's first Shimmering band is Shop 1–4, replacing the old 2–4 transcription in generated prose and the materials table. | **Broader finding remains open:** full room/character routes and drop coverage are unfinished. |

## Evidence and decisions

- [Mine Square](https://www.khwiki.com/Mine_Square) gives both ingredients at Lv3, all characters, 100%, and the seven attached abilities. The separately published [Destiny Islands FM magic table](https://www.destinyislands.com/bbs-fm/melding/magic-commands/) agrees on ingredients, availability, rate and abilities but omits Ignite's level. The [guiding-key FM guide](https://guiding-key.tumblr.com/khbbs-abilities) lists Ignite Lv1 in its ability-recipe lists. The app therefore offers the documented Lv3 combination with a specific lower-level eligibility note; it does not certify Lv3 as the minimum. This replaces the former whole-pair quarantine.
- [Magnet Spiral](https://www.khwiki.com/Magnet_Spiral) and the [Destiny Islands FM attack table](https://www.destinyislands.com/bbs-fm/melding/attack-commands/) agree on the corrected 20% outcome, ingredient levels and crystal mappings. Source-local recipe letters remain unchanged.
- [Confusing Strike / Confusion Strike](https://www.khwiki.com/Confusion_Strike) distinguishes the BBS name from DDD's spelling; the FM attack table independently uses Confusion Strike for Quick Blitz + Confuse.
- [Spiderchest](https://www.khwiki.com/Spiderchest) supplies the conditional Fleeting drop; the Shop 3–8 tables do not include it. No character/room route was inferred from the drop table.
- [Archraven](https://www.khwiki.com/Archraven) explicitly lists Shimmering at 2.4% for Shop 1–4 and 3% for 5–6, then Chaos at 7–8.

Original altered values, reviewed URLs and date are retained on each corrected melding row. The source manifest records these new inspections separately from its earlier snapshot.

## Integration and validation

Both BBS generators now emit **468 melding groups plus 24 ice cream recipes**, with **1,368 entries**, **139 command identities** and **46 finisher nodes**. Every character/input probability group totals 100%; this arithmetic does not certify unrelated facts. Existing IDs are preserved and nine recipe IDs are added. The lower-level eligibility note propagates to both generated recipe prose and structured melding outcomes.

Regression coverage checks the restored outcomes by character, attached abilities, minimum-level filtering, canonical command joins and conditional drop text. The complete suite and production-build results are recorded in the shared [resolution pass](../../research/research-resolution-2026-10-01.md).
