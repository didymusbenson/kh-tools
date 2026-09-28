# KH3 / Re Mind rollout — 2026-09-20

## Research and plan

Read the complete `ai_docs/games/kh3` research set and readiness assessment, then applied the refinement playbook. The existing research supplies numbered collectible identities but explicitly does not establish complete precise routes. Do not promote those identities to fully verified route guidance.

Normalize the existing factual tables into stable records; reuse chest IDs for Classic Kingdom acquisitions; preserve separate cooking, high-score, DLC and achievement outcomes; expose direct input quantities as additive farming targets. Use the shared journal renderer for searchable category pages, world links and independent inline details. Data Jiminy is excluded.

Additional source inspection on 2026-09-20:

- https://www.khwiki.com/Le_Grand_Bistrot — all 28 recipe ingredient lists, cooking methods and Classic/Special distinction. Recipe inputs are one unit of each listed ingredient. All attempts consume ingredients; crafting history is not Excellent cooking history.
- https://www.khwiki.com/Ingredients — 59 ingredient identities, listed source areas and available shop prices.
- https://steamcommunity.com/stats/2552450/achievements/ — 51 achievement names and publicly visible requirements. Three hidden story predicates remain explicitly unavailable; other hidden conditions are tied to the existing research, with uncertainty retained.

## Implemented coverage

`src/games/kh3.ts` configures the guide; `src/games/kh3/content.json` stores 617 entries and 39 recipe actions.

- 245 base chests, 90 Lucky Emblems and nine separate Re Mind chests. Canonical numbered IDs follow the research convention. Base collectible totals exclude Re Mind, achievements, story rewards and record goals.
- 23 Classic Kingdom acquisition views: 18 share their chest event IDs and five have independent acquisition records. The 23 high-score records remain separate.
- 20 Photo Missions, with recipe unlocks explicitly distinguished from receiving finished equipment.
- 15 Battlegates; gates 1–13 appear in the Reports category using the same event IDs. Gate 0 has no report; gate 14 awards Crystal Regalia.
- Five Golden Herc Figures, seven Flan upper-tier objectives, five named minigame rank/achievement comparisons.
- 28 Excellent cuisine records, all 28 cooking input recipes, 59 ingredient stock/found-ever records. Twenty Classic and eight Special dishes are distinguished. An acquired dish does not mark it cooked Excellent.
- Ultima Weapon synthesis and the ten individual Kingdom Key forge steps. Forge steps are explicit source-level→target-level actions, not a purported universal upgrade ladder. Ultima synthesis creates a level-10 weapon.
- 13 synthesis/forge materials, 16 Keyblade acquisition anchors and Forest Clasp’s conservative missability warning.
- Nine Gummi constellations and two optional Gummi bosses.
- Thirteen Limitcut victories and Yozora, distinct from the nine Re Mind chests. DLC labels and prerequisites remain visible.
- All 51 Steam achievements; completion remains independent from the base collectible denominator.

## Actual limits

This is a functioning sourced guide with broad coverage, not a complete KH3 acquisition encyclopedia. Full synthesis output/ingredient graphs, all Keyblade forge ladders, bestiary, equipment sources, Gummi treasure/sphere/fragment catalogs, Frozen Slider’s ten exact prize routes, Premium Menu code predicates and comprehensive minigame rewards remain unfinished. No fabricated entries fill those gaps. Several material sources remain explicitly unverified. World chest/emblem records generally give an area and number rather than a precise physical route, and retain a visible note saying so. Toy Box emblem 8 retains the conflicting floor evidence.

One shared game profile currently contains explicitly named base and DLC records, with distinct IDs/categories; this does not implement multiple save-lineage or New Game+ profiles. Related events do not automatically alter inventory or derived reward checks. Photo missions lack some precise camera positions. The shared journal aesthetic is retained; a complete digital Gummiphone visual skin is not part of this module.

## Validation

- `npx tsc --noEmit --pretty false` passed after the module was written.
- Data validation passed: 656 distinct entry/recipe IDs; all recipe input IDs resolve to entries; all quantities positive.
- Asserted 28 cuisine records with exactly 20 Classic Menu and eight Special Menu recipes.
- Numbered inventories reproduce the checked-in 245/90/9 counts.
- Root integration owns browser, shared-profile and full build checks; these were not independently claimed by this content agent.
