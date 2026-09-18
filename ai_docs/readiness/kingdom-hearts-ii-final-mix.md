# Kingdom Hearts II Final Mix readiness

Status: **Audited; substantial research available, not implementation-ready in every category and not release-validated.** Updated 2026-09-18.

Specification: [KHII Final Mix](../games/kingdom-hearts-ii-final-mix.md). Evidence: [research pack](../games/kh2fm/README.md), [inspected-source manifest](../games/kh2fm/sources-and-legacy-audit.md). All specified modules remain MVP. The accepted [collectible contract](../content/collectible-compendium-and-linked-views.md), [synthesis/inventory contract](../content/synthesis-and-inventory.md) and [testing/content validation](../testing-and-content-validation.md) govern acceptance.

## Accepted decisions and answer log

| ID | Decision | Answer / status |
|---|---|---|
| KH2-D01 | Edition baseline | Modern Final Mix, Steam is the user's platform; no original/PS2 compatibility. Accepted. |
| KH2-D02 | Main purpose | Locate/acquire collectibles; ordinary plot and biography flags are not world totals or release blockers. Accepted 2026-09-18. |
| KH2-D03 | Linked views | Compact marks and expanded rows share stable saved state bidirectionally across worlds, search and Data Jiminy. Accepted 2026-09-18. |
| KH2-D04 | Spoilers | Show directly; no warnings, hiding or reveal controls. Accepted 2026-09-18. |
| KH2-D05 | Availability filtering | No Available Now or progress-gate tracking/filter. Keep relevant prerequisites in text. Accepted 2026-09-18. |
| KH2-D06 | Inventory | Opt-in; ingredient owned/required x/y when enabled. Core collection tracking must work without inventory setup. Accepted 2026-09-18. |
| KH2-D07 | Validation | App/functionality acceptance, Apple browser/iPhone/iPad first; Android follow-up. No user gameplay/playthrough gate. Accepted 2026-09-18. |
| KH2-D08 | Visual / assets | KH1/2 green Journal family; only production screenshot/map images deferred, not text/media support. Accepted. |

No additional user decision blocks this research. Facts below are research/engineering work, not questions the user must answer.

## Category evidence and remaining work

| Category | Starting evidence | What this pass adds | Current status / remaining work |
|---|---|---|---|
| Legacy coverage | Prior audit sampled tables; readiness was a stub | All 20 tabs read over bounded content ranges; all six SQL documents fetched/scanned; branch tree/code inspected | Audited. Accessories trailing-space recovery proves 33 rows, not empty. Five tabs truly empty. |
| Sora treasures | 301 legacy records, with 24 missing Cavern locators | All 301 indexed; per-world counts/content compared; Agrabah #24 and canonical names corrected | Complete candidate index; precise directions/revisit rules need source verification and original writing. Numbering needs modern reference confirmation. |
| Prologue | Absent from main treasure sheet | 16 unnumbered Roxas chest leads found in separate community table | Missing detailed record extraction/locators; character/time scope required. Must not block Sora's 39-entry Twilight Town list. |
| Puzzle pieces | 144 rows; blank per-world number column | All pieces indexed; six set counts reconcile; Daylight #23 character scope corrected | Candidate coverage complete; movement alternatives/conflicts and exact directions partial. |
| Puzzle assembly | Reward/set SQL only | 12/12/12/12/48/48 rewards; collected vs assembled vs claimed states | Missing precise grid/orientation solutions and accessible assembly guide. |
| Reports/pages/charms/maps | Scattered chest/magic records | 13 Final Mix report grants, 5 page links, 4 charm sources, 16 recipe-document set | Direct reward/map inventory, area IDs and aggregate deduplication remain incomplete. |
| Materials/farms | 60 material candidates, old rates and world-only enemy joins | 60-type taxonomy; nine family drop tables; seven Orichalcum+ sources; FM Serenity/Lucky Lucky corrections | Exact enemy areas/spawns, all Bright/Dark sources, collector thresholds/rank conflict remain partial. |
| Synthesis recipes | 25 complete base rows plus placeholders and obsolete totals | 30 item-specific base recipes, 29 upgrade candidates = 59 outputs; ingredients/unlocks/modifiers/EXP | Community catalog, not certified menu completion. Shock Charm, ranks and modifier/rounding interactions unresolved. |
| Equipment | 24 Keyblades; 12 staves; 12 shields; 34 armor; 33 accessories | Full legacy-name indexes, 24 sourced Keyblade acquisitions, FM ability corrections | Staff/shield FM additions absent from legacy; complete current acquisitions/stats and missability remain partial. |
| Forms/abilities/magic | Abilities empty; 18 hard-coded magic tiers | Five form EXP/Growth mappings; ability-table scope; eighteen element-grant sources; Luxord correction | Full ability/AP/level-choice/party matrix and summon level thresholds unnormalized. |
| Mushroom XIII | Empty tab; leads inside Missions sheet | All 13 locations/targets; distinction between appeasement, rank and rewards | Detailed appearance conditions, numeric farming tiers and strategies still incomplete. |
| Silhouettes/Data/proofs | Empty silhouette tab; SQL material leads | Five portal/recipe sources; thirteen Data reward mapping; Proof chest trigger/dedup rules | Complete encounter guidance and exact Lingering Will unlock evidence still partial. |
| Cups/records | Empty cup tab; Missions sheet | Eight score targets, unlock/reward corrections, 23 other record targets | Titan unlock predicate and Limit Form inclusion in Paradox gates conflict/uncertain; round/strategy detail partial. |
| Gummi | Achievement references only | Nine routes × 3 × 2 modes = 54 records; 28 sample + 12 special main models; 12 special sources | Full score/rank/EX conditions, treasures, sample blocks and Teeny Ship dependencies missing. |
| Achievements | 51 platform-mixed trophy candidates | Official Steam product/197 collection total distinguished from KH2; hidden-description limitations recorded | Steam-specific IDs/requirements and other modern-platform differences not fully reconciled. |
| Modern release evidence | Generic modern baseline | Steam official release/inclusion; announced 2026-10-08 native editions distinguished | No executable build verified; preserve platform/evidence status rather than claiming parity. |

Counts above overlap by acquisition and are not a sum for overall completion. The 301/144 tables support category denominators, not an already-certified complete world acquisition set.

## Source conflicts requiring resolution

- **KH2-R01 / Shock Charm:** item page vs Recipe/Tranquility summaries disagree on Tranquility Gem/Stone quantities; legacy also reverses Remembrance quantities. Preserve alternatives, resolve through an independent reliable modern reference before totals.
- **KH2-R02 / rank/modifiers:** Moon Amulet rank A vs S; Mythril Gem's rank/modifier pairing; Manifest Illusion A vs S. Rank influences discounts/collector goals, so these are numerical blockers.
- **KH2-R03 / recipe arithmetic:** establish exact Energy + Moogle stacking, rounding per craft and Ultima special treatment; confirm first-creation requirements, modifier quantities and all alternative methods. Do not certify legacy aggregate material totals.
- **KH2-R04 / movement:** Daylight 14 requirements differ; other routes have alternatives. Distinguish standard Growth level, Form level and convenient versus necessary prerequisites.
- **KH2-R05 / cup unlocks:** resolve exact Titan world prerequisite set and whether Final Mix Limit Form participates in Cerberus/Hades Paradox checks.

Known corrected errors: Agrabah #24 Serenity Gem; Sora's Daylight #23; Final Mix Ultima Serenity Crystals and Petite Ribbon quantity; Luxord Magnet grant; original Lucky Lucky weapon abilities and Nobody Serenity farms. Full facts and citations live in the research companions.

## Research queue

1. **KH2-R06 — Directions:** Write exact approach/landmark/action/revisit text for all treasure/puzzle records; start with the 24 Cavern rows having no legacy directions. Verify using reliable source evidence; do not ask the user to complete a gameplay run.
2. **KH2-R07 — Completion sets:** Extract Roxas records, direct maps/reports/recipe rewards, reward-linked acquisition identities, and per-world denominators. Preserve real numbering; clearly label app indexes.
3. **KH2-R08 — Assembly:** Record six puzzle dimensions, placements and rotation solutions as accessible text/data.
4. **KH2-R09 — Synthesis/source graph:** Resolve R01–R03, complete collector list and farm areas, reconcile all output/menu counts and calculation scenarios. Add owned/required fixtures with and without optional inventory.
5. **KH2-R10 — Remaining catalogs:** Complete modern staff/shield/armor/accessory acquisition/stats, ability/party/level matrix and summon progression. Audit one-time prologue rewards without introducing a story checklist.
6. **KH2-R11 — Challenges:** Complete mushroom rank rewards, encounter access/guidance and cup/record exact conditions.
7. **KH2-R12 — Gummi/platform:** Normalize all 54 mode records, reward/blueprint/block relations, Steam IDs and genuine platform differences.

## Engineering acceptance fixtures

These are required tests when implementation exists; this research task did not run them. Follow [shared validation](../testing-and-content-validation.md).

| ID | Test | Expected result |
|---|---|---|
| KH2-E01 | Toggle treasure in compact list, inspect expanded row/search/Data Jiminy, then reverse toggle | Every view and count agree on one saved acquisition ID |
| KH2-E02 | Offline relaunch, backup/import and content rename/reorder | Progress stays attached; no duplicate or lost checks |
| KH2-E03 | Filter remaining/area/search and switch world alias Hollow Bastion/Radiant Garden | Full applicable category denominator and identity remain unchanged |
| KH2-E04 | Finish Data challenge then inspect treasure 46 | Chest remains unchecked until opened/marked; Proof index links the same acquisition |
| KH2-E05 | Check five Torn Pages through item index | Only the five linked treasure acquisitions change; no aggregate double count |
| KH2-E06 | Mark all puzzle pieces; leave assembly incomplete | World piece count can be complete while assembly/reward goals remain pending |
| KH2-E07 | Switch Sora/prologue scope | No leakage between 39 Sora treasures and 16 prologue leads |
| KH2-E08 | Disable inventory, then enable and enter stock | Checklists work both ways; enabled recipe ingredients show owned/required and correct nonnegative shortages |
| KH2-E09 | Four Lucky Rings, base already created, no discounts | Raw material multiplication matches the explicit six-material fixture in research |
| KH2-E10 | Apply verified Energy/Moogle/Serenity cases, including odd quantities and multiple crafts | Correct per-craft rounding/modifier costs/output; unresolved recipes cannot show certified totals |
| KH2-E11 | Compare 301 treasures, world collectibles, official Journal and Steam goal tracks | Labels and sets are distinct; no false trophy guarantee |
| KH2-E12 | Remove every production image; use touch/keyboard/screen reader on Apple browser/iPhone/iPad | Directions remain usable, check controls labelled, opening details does not accidentally toggle; Android follow-up |
| KH2-E13 | Simulate storage failure and conflicting open views | Consistent rollback/retry state and accessible error handling |
| KH2-E14 | Inspect spoilers and prerequisite presentation | All content visible; no reveal prompts, Available Now or saved plot-gate filter |

## Data Jiminy evidence/evaluation set

The per-game Coppermind must ground these answers in acquisition IDs/source rows and retain current saved state:

- Where is Twilight Town Daylight 23, and is it Roxas-only? Correct Sora/Other Twilight Town scope.
- I defeated all Data members; why is treasure 46 missing? Explain chest appearance versus opening.
- Which five chests contain Torn Pages? Return the existing acquisition records.
- Can I farm Serenity Crystals from Sorcerers in Final Mix? Correct the original-game source contamination.
- What makes four Lucky Rings cost this amount? State quantity, modifier, discount and inventory assumptions.
- Does beating Xigbar give the final Magnet element in Final Mix? Correct to Luxord.
- Where are all seven Orichalcum+ sources? Distinguish three chests and four rewards.
- Does 100% World collectibles prove the Journal trophy? Explain the separate goal set.
- What is the Shock Charm recipe? Surface the unresolved disagreement and provenance rather than invent certainty.
- How do Form level 7 and standard Glide level 3 relate? State the correct scopes.

Answer evaluation, offline SLM performance, app build, responsive UI and persistence migrations remain engineering work. No feature is validated simply because this research pack exists.
