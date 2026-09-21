# KH2FM guide rollout — September 20, 2026

## Research and plan

Read the refinement playbook, KH2FM specification/readiness, complete treasure and puzzle candidate indexes, synthesis recipes, material/equipment acquisitions, world rules, and challenge/Gummi research. The old `games/kh2fm.html` is a placeholder, so this implements a new typed guide on the shared collection/workshop interface. No Data Jiminy code or data was changed.

Use item destinations, single-column inline detail, independent persistent checks, world filters, explicit uncertainty, and stable candidate IDs. Keep chest-contained Torn Pages and summon charms as category aliases of the same acquisition. Keep puzzle assembly separate from its pieces. Use material stock/targets rather than a recipe queue, with no automatic inventory consumption on historical crafting checks.

## Implemented content

- 301 Sora treasure records, preserving world numbering and stable research IDs; 144 puzzle pieces, preserving set/position IDs and Sora scope.
- Five Torn Page aliases and two chest summon aliases; two directly awarded summon charms. These aliases share the treasure acquisition state.
- Six puzzle assembly goals; 24 Keyblade acquisitions; five Drive Forms with growth/EXP rules; 18 magic element grants; 13 Secret Ansem Reports.
- 13 Mushroom goals, five Absent Silhouettes, thirteen Replica Data fights, eight cup score goals, 23 minigame record targets.
- 54 Gummi mission/mode records plus twelve sourced special blueprint acquisition records.
- All 60 synthesis material types. Nine families retain sourced base enemy percentages. Conditional rewards remain conditional. Missing source areas and incomplete Dark/Bright/Serenity tables are labeled honestly.
- 59 synthesis output recipes (30 base +29 upgraded), including direct ingredients and upgrade modifiers. Upgraded recipes do not consume previously crafted equipment.
- Fifteen world overview pages with game-specific collection/access context; primary categories use distinct available icons.

The module and generated catalog are `src/games/kh2fm.ts` and `src/games/kh2fm/catalog.ts`. Regenerate the latter from the checked-in research using `python3 src/games/kh2fm/generate.py` at repository root. Generation asserts 301 treasures, 144 pieces, 59 recipes, unique IDs and valid ingredient references.

## Recipe assumptions

All normal recipe targets use undiscounted ingredients. Ultima Weapon is a necessary exception: its recipe includes one Energy Crystal and halved/rounded-up paid ingredients, including seven Orichalcum+, so its plan never requests an impossible thirteen finite rewards. No additional Moogle discount is assumed. Optional discount optimization is not represented by this static recipe catalog.

Shock Charm preserves the item-page Tranquility Gem1/Stone3 candidate and explicitly calls out conflicting Gem3/Stone1 evidence. Moon Amulet warns about rank conflict. Firagun Bangle's upgrade modifier is marked as a legacy lead. Recipes state unlocks and preserve literal researched modifiers, including Mythril Gem's Serenity Gem requirement. Full multi-modifier rounding remains outside certified coverage.

## Coverage limitations

This is a substantial browsable first implementation, not a declaration that the full prior specification or official Journal is complete. Exact chest landmarks, puzzle approach routes/rotation solutions, sixteen Roxas prologue chests, full modern equipment/bestiary/ability catalogs, platform-mapped Steam achievements, several conditional reward tables and detailed Gummi thresholds/EX constraints remain source work. Treasury and puzzle records expose known areas while flagging missing exact directions. World counts represent the available records, not the official Journal completion denominator. No legacy PS platinum was mislabeled as a Steam achievement. The shared guide exposes coverage explicitly.

## Validation

Generator assertions passed. `npx tsc --noEmit` passed before adding category aliases; final shared compilation requires the root agent's `categories?: string[]` extension. Parent agent owns shared UI, persistence integration and desktop/phone browser verification. No game executable/playthrough validation is claimed.

## Follow-up coverage added during integration

The Bestiary now exposes 62 enemies from the researched material-drop relations, with their base drop percentages. It is explicitly a partial source index; unverified spawn-room and combat guidance is not invented.

Steam Achievements now includes 23 public KHII-scoped goals whose names and requirements were read directly from the [official Steam collection achievement list](https://steamcommunity.com/stats/2552430/achievements/) on September 20, 2026. These cover world episodes, regular cups, Struggle, maps/puzzles/Nobodies, level99 and Gummi goals. Hidden descriptions and ambiguous collection-duplicate names remain outside this partial subset. The UI coverage text explicitly states23 rather than claiming a complete platform set. No PS platinum was imported. Full TypeScript checking now only reports the in-progress KH3 registry import, not a KH2 alias issue.
