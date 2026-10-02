# Research gap resolution — October 1, 2026

> Historical October 1 checkpoint. The [active gap-closure coordination report](gap-closure-coordination-2026-10-02.md) and current per-game ledgers supersede its aggregate counts and remaining-work statements.

**Task status: research remains in progress.** There are 91 factual families still partially resolved or unresolved. The user requested merging the current work into `master`; that integration checkpoint does not mark the fact-finding mission complete. Passing application tests establishes implementation behavior, not completeness or accuracy of every game fact.

This follows through on **all 208 issue families across all seven games** in the [original audit](research-audit-2026-10-01.md). It supersedes the earlier two-game correction summary. Every finding has a current disposition, researched corrections or an exact remaining evidence boundary. The original audit appendices remain explicitly historical at `f933ab1`.

This is a complete review of the audited backlog, **not a claim that every game fact is now resolved**. After the [recovery continuation](research-recovery-2026-10-01.md), the current register contains 103 closed families (including preserved historical closures), 75 partially resolved families, 16 unresolved/conflicted families, and 14 provenance, engineering or excluded-scope families. All 99 factual residual families from checkpoint `2fd2927` received follow-up investigation; eight more families closed. Counts classify issue families, not individual facts or source accuracy. The per-game ledgers control the exact meaning of each status.

| Game | Closed | Partial | Unresolved / conflicted | Other limitations | Current evidence and dispositions |
|---|---:|---:|---:|---:|---|
| KH1 Final Mix | 10 | 6 | 4 | 0 | [20-finding ledger](../games/kh1fm/research-resolution-2026-10-01.md) |
| Re:CoM HD | 15 | 11 | 3 | 3 | [32-finding ledger](../games/recom/research-resolution-2026-10-01.md) |
| KH2 Final Mix | 31 | 3 | 0 | 6 | [40-finding ledger](../games/kh2fm/research-resolution-2026-10-01.md) |
| BBS Final Mix | 12 | 17 | 4 | 5 | [38-finding ledger](../games/bbsfm/research-resolution-2026-10-01.md) |
| DDD HD | 7 | 17 | 1 | 0 | [25-finding ledger](../games/dddhd/audit-dispositions.md) |
| KH0.2 | 10 | 7 | 1 | 0 | [18-finding ledger](../games/kh02/audit-dispositions.md) |
| KH3 / Re Mind | 18 | 14 | 3 | 0 | [35-finding ledger](../games/kh3/audit-resolution-2026-10-01.md) |
| **Total** | **103** | **75** | **16** | **14** | **208 families accounted for** |

## Recovery continuation results

The [continuation report](research-recovery-2026-10-01.md) links a new per-game account of every residual finding, including unchanged outcomes and concrete evidence still needed. It also records git checkpoints and current validation. The substantial catalog work below remains preserved.

Newly integrated evidence includes 55 KH1, 47 Re:CoM, 45 BBS, 54 DDD and 14 KH0.2 individually observed Steam key associations; KH1 Theater availability and replay-reward guidance; Re:CoM summon and stock details; KH2 Mushroom gates, 25 MP cup Limits, Dark Anklet stock preservation and source-derived Mushroom base attributes; BBS board/D-Link/Secret Episode tables; DDD corrected shop price and HD chest numbering; a KH0.2 Ether approach; and KH3's full 78 Collector Goals, 59 shop rows and final fragment approach. API/research metadata remains separate from player-facing instructions. KH3 now has **1,926 entries**; all prior saved IDs and recipe counts are retained.

Active shared and game readiness tables were reconciled. False Sweetstack and Jestabocky diagnoses are explicitly corrected; historical appendices remain identifiable as history. The remaining factual queue is **75 partial plus 16 unresolved/conflicted families**, with subfield-level limits in the ledgers. The eight new family closures are KH1-016, KH1-019, COM-010, KH2-013, KH2-015, DDD-002, DDD-008 and KH3-009.

## Integrated results

- **KH1:** Gummi block/editor/blueprint acquisition expansion, Bambi and mushroom farming mechanics, item/ability details, minigame registration and remaining farming routes. The 824-row legacy numeric crosswalk and Steam API-key provenance are explicit, without claiming a prose-equivalence comparison or inventing identifier joins. All 1,259 entry IDs and 33 recipes are generated from maintained inputs.
- **Re:CoM:** all 98 sleight effects, 92 structured stock recipes, six duel activations, 99 progression levels, 59 combat records with 379 floor rows, 43 explicit timers and 24 boss deck tables. All eight friend windows, basic card/reload effects, minigame routes, mushroom predicates and farm footnotes now reach the app. The 152 Sora/59 Riku card denominators remain unchanged.
- **KH2:** all 301 treasure routes and 144 puzzle rows reviewed; 31 reward-event areas and six assembly grids verified. Added full equipment/ability/combat catalogs, maps, recipe-document links, Limits, collector goals, cup rounds, songs, Gummi dependencies and FM Form/summon progression. All 59 recipe outputs retain provenance. Four puzzle-location precision limits remain explicitly named.
- **BBS:** all 374 main chest approaches, 60 sticker pickup/placement instructions, 42 ingredient routes, 187 command identities, 154 acquisition lists, 152 CP curves and 38 command-drop records. All ability effects, Arena predicates, tickets, styles, D-Links, minigame rank/reward tables and character strategies are integrated. Aqua’s Mega Magic Recipe identity is corrected without resetting its saved ID.
- **DDD:** all 438 chest directions with explicit HD substitutions and numbering conflicts; all 54 boards/1,144 nodes; 124 command definitions with 78 known reloads and one exact source contradiction; recipe ownership, material/portal/shop relations, 43 Links, 27 Flick lineups and 54 Steam goals. Parser omissions are corrected rather than labeled missing research.
- **KH0.2:** corrected pillar items, flower colors, Pisces/memory routes, objective actions and Steam Spellweaver behavior. Default defense/healing mechanics and Critical exceptions are now sourced; physical collectible IDs and the 55-find denominator are retained.
- **KH3:** full available synthesis, equipment/forge, material, cuisine, adversary/record and Gummi catalogs; ten Slider prizes, Re Mind routes, optional/DLC guidance and Premium predicates. Peer review additionally covers all 335 base chest/emblem routes, 13 special weapons, merit unlocks and 45 physical Gummi fragments; their per-record evidence distinguishes text, visually reviewed images and genuine residuals.

## Review and documentation rules applied

Canonical authoring inputs, generators where present, generated runtime data and active specifications/readiness were updated together. Sources remain attached to records and in the research files. In-app citation blocks were not restored; the home attribution-modal requirements remain a separate document.

Cross-review specifically challenged accessible-but-unextracted claims. It recovered DDD command timings, full DDD/KH2/KH3 location guides, BBS album placements and minigame tables, Re:CoM boss decks, KH2 summon/assembly evidence and KH3 special-weapon/merit/fragment details. Source access failures are recorded by method; a successful later web/image read does not rewrite an earlier direct-fetch failure.

False gaps are closed as such: Re:CoM Ansem’s player effect is edition-correct; KH2 Material/G shape variants share inventory. Community mirrors and multiple pages on one wiki are not treated as independent corroboration. Pinned modding/test fixtures are labeled source-derived evidence, not fresh retail extractions. No user playthrough is required.

Remaining facts have specific questions and consulted sources: examples include BBS Ignite minimum and command mastery conflicts, Aura Lion/Jestabocky board inconsistencies, Strike Raid’s 22-versus-24-second reload, KH0.2 Lightning/objective-50 predicates, KH3 Forest Clasp/Flan/PRO-rank conflicts, and exact Steam/save-state behavior absent from public evidence. Unknown values are not inferred from empty cells or assumed equal across editions. Large findings can remain partial after substantial extraction when one named subfield is still unresolved.

## Validation at the recovered checkpoint `2fd2927`

Preserved machine-readable record: [research-validation-2026-10-01.json](research-validation-2026-10-01.json). These results and catalog hashes describe the checkpoint before the continuation; current results are recorded in the [recovery report](research-recovery-2026-10-01.md).

- `npm test`: **133 tests passed in 14 files** after the final catalog merge.
- `npm run build`: **passed** canonical content validation, empty-Coppermind validation, TypeScript and production/PWA generation. The existing large-chunk advisory remains; no build error is suppressed.
- Browser validation: **26 distinct desktop/mobile Chromium scenarios passed** across two focused runs, including eight final expanded-catalog checks. Covered all seven games, saved checks/reload, offline reopening, linked KH2 map/treasure state, read-only equipment/abilities/special weapons, KH1 item access, KH3 fragments, BBS calculator/character state and long Re:CoM notes. This is viewport/browser coverage, not a physical iOS/WebKit certification.
- Compared every entry and recipe ID against `b839005`: **zero removed IDs, zero duplicate IDs within either namespace, zero broken ingredient references, and zero entries without source arrays**. KH1 intentionally shares each recipe’s acquisition ID between its recipe and entry representations.
- Catalogs at `2fd2927`: KH1 **1,259 entries / 33 recipes**; Re:CoM **431 / 0**; KH2 **1,315 / 59**; BBS **1,653 / 492**; DDD **1,283 / 263**; KH0.2 **177 / 0**; KH3 **1,900 / 286**. These are runtime record counts, including references and overlapping acquisition views, not collectible denominators.
- All **208 distinct audit IDs** occur exactly once in their current per-game disposition register, with no missing or duplicate finding ID.
- KH1 source-date audit: **404 new entry/source associations** are dated October 1; **1,277 unchanged September 18 source objects** match the prior checkpoint. Historical dates were preserved rather than retroactively rewritten.
- Per-game generators and targeted data validators passed; BBS, DDD, KH0.2 and Re:CoM regeneration checks were deterministic. `git diff --check` passed.

The initial production check caught authoring-only route-review metadata leaking into KH2’s typed runtime. The generator now projects the supported gameplay/provenance fields while retaining full inspection metadata in canonical research. The four actual puzzle-location caveats reach the player-facing records.

Data Jiminy stays **flushed, zero thoughts**. Its empty KH1 pack was refreshed to match the corrected content hash; neither the database nor browser pack was reseeded. Canonical guide changes do not restore inaccurate memories.

## Historical first correction checkpoint

Commit `b839005` previously restored nine BBS melding groups and corrected names/chances, resolved the Re:CoM Ansem false gap, and integrated Riku sleight requirements. At that checkpoint, 115 tests and the production build passed. Those corrections are preserved. Its statement that the other five games were unchanged no longer describes the repository.
