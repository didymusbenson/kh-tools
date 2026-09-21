# BBS Final Mix guide rollout — September 20, 2026

## Research and decisions

Read the per-game specification/readiness, collectible, melding, equipment and challenge research packs and structured inventories. The current refinement playbook supersedes optional stock tracking. BBS uses blue Reports styling, character-specific inventories, single-column inline answers and category-first navigation. Data Jiminy is untouched.

Melding is not deterministic synthesis. Recipes represent one attempt, show ingredient levels, complete outcome probabilities, crystal/type abilities and prior-Shotlock ownership exceptions. They never promise the requested output or consume inventory by marking a historical check. Optional crystals are not silently added to command targets. Movement/defense commands require a retained extra copy. Exclude both disputed input pairs entirely, including otherwise valid outcomes from the same pair, rather than showing incomplete probability groups.

## Implemented

`src/games/bbsfm.ts` exports the guide; `src/games/bbsfm/generate.py` reproducibly normalizes the checked-in evidence into `content.json`.

- 383 treasure acquisitions: 374 numbered main-story chest candidates, eight Secret Episode chests and one tutorial chest outside world collection counts.
- 60 sticker pickups, 15 separate album reward checks, 13 report acquisitions (three chest aliases share canonical state using additional categories).
- 48 character/episode-specific Keyblade records, 90 ability records, 46 normalized finish predicates and 246 character-specific command-shop records.
- 27 Unversed mission goals, 48 Arena battle records, 57 minigame/board goals and Final/Secret Episode unlock references.
- 459 complete, non-quarantined character/input-pair meld recipes and 24 character-scoped ice cream recipes (eight per character).
- 286 independent inventory records covering command inputs, flavors and nine crystal types by character. Stock/targets cannot leak between characters because IDs include scope.
- 1,318 unique entries overall. Primary collections have distinct navigation icons. Existing source URLs and factual uncertainty remain in the data.

## Validation

The generator asserts every surviving character/input-pair outcome group sums to 100%. Every recipe ingredient resolves to an inventory entry. Ice cream quantity totals reproduce the audited Terra 174 / Ventus 178 / Aqua 183 values. TypeScript passed during integration before the final additional-category alias change (parent owns shared type/UI integration). Main and Secret Episode identities remain distinct. No network research or gameplay certification was claimed.

## Remaining content boundaries

This is a substantial working catalog, not a certified complete compendium. Most chest entries have area-level directions, not exact text routes. Sticker optimal placement regions, full command acquisitions/CP curves, complete D-Links/styles/Shotlocks, precise Prize Pod routes and complete farm routes remain missing. Two meld input pairs are quarantined; there is no dynamic probability solver for owned Shotlocks or optional crystals yet, so rules are explicit recipe detail text. Steam achievement identities are not certified and no misleading platform roster was invented. Arena ticket and clear-file AND/OR conditions, mixed-difficulty episode rules and the Secret Gem Upper/Lower Zone conflict remain labeled. Browser layout/persistence validation is handled by the shared guide integration.

## Steam and Bestiary follow-up

Added a primary Steam Achievements destination with 34 actual public BBS goals, using the [official collection list](https://steamcommunity.com/stats/2552430/achievements/) and the existing BBS research scope. Character-specific story/Break Time/Warrior/Adventurer goals retain their character. Platform checks stay independent from physical collectibles. Hidden conditions, duplicate collection names and unverified one-character versus combined-save predicates are not guessed; the coverage statement declares the partial34-goal subset. No PlayStation platinum or in-game Trinity trophy was mislabeled as Steam.

Added a primary Bestiary destination with16 researched crystal-source enemies, including exact Shop Level rate ranges from `materials-and-equipment.md`. Missing spawn rooms are flagged; the index is not described as an exhaustive enemy roster. These source records are non-checkable and excluded from collectible totals.

Both additions live in `src/games/bbsfm/generate.py` and regenerate into `content.json`; no module/theme overrides were modified. Generation now produces1368 entries and483 recipes. Unique IDs and full `npx tsc --noEmit` pass. Shared browser integration remains parent-owned.
