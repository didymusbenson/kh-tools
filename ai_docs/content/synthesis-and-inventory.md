# Synthesis and optional inventory

Status: accepted cross-game product direction, 2026-09-18. Synthesis is a first-class MVP feature: reduce the work of discovering recipes, figuring out remaining materials and finding practical farming sources. Apply the interaction lessons from KH1 to each game's actual crafting system without importing KH1 mechanics into other games.

## Recipe and inventory experience

- Complete recipe reference, unlock conditions, ingredient quantities, product effects and useful material-source links work with inventory disabled.
- Inventory is optional and opt-in. When enabled, players enter owned quantities and see each ingredient as **owned / required**, e.g. “Spirit Shard (2/5).” Include a label or accessible name explaining the numbers.
- Show actual owned stock, including surplus (8/5); missing quantity is max(required − owned, 0). Unknown/unentered quantity must be distinguished from a confirmed zero. Recipe quantity/mode determines the required amount.
- Inventory belongs to the applicable game/profile and any actual character-specific ownership scope. Persist offline, restore across sessions and include it in validated export/import and migrations.
- Disabling inventory hides ownership reminders and inventory-adjusted calculations but preserves saved quantities. Re-enabling restores them.
- Checking historical “crafted” completion does not silently consume materials or assert current product ownership. Default planning behavior keeps manual stock counters and historical checks independent. Any later explicit “record a craft” transaction must define consumption, outputs, undo and failure behavior before implementation.
- Inventory changes recalculate affected rows and planners immediately; show saved state honestly. Inventory is manually maintained, with no game-save synchronization implied.
- Required progression/unlock information remains visible text. Do not require users to track story/ability milestones or provide an Available Now filter.
- No spoiler warnings, concealment or reveal controls apply to recipes, rewards or sources.

## Planning calculations

Support finding a recipe, checking its requirements, calculating materials still needed for the selected craft goal, and navigating directly to concise source/farming instructions. Keep total requirements and remaining requirements clearly distinguished.

Each recipe can show its standalone owned/required counts. A multi-recipe plan must allocate the inventory pool once across that plan: five owned Shards cannot satisfy five requirements independently in several recipes. Define a deterministic allocation rule and expose enough totals to explain it.

Keep historical catalog completion, current material stock, product ownership and intended craft quantities separate. A crafted-but-consumed item stays historically complete. Recrafting is a distinct quantity in the plan. For craftable ingredients, expand only the selected route's shortfall; detect dependency cycles and avoid counting prerequisite crafts twice toward first-craft catalog goals. Never assume a world reward has already been acquired.

Use game-specific recipe variants, ingredient reductions, costs, level/rank rules, ownership restrictions and output probabilities only when supported by sourced data. Unknown or disputed quantities are visible and cannot be presented as verified totals. Data Jiminy uses these same application calculations and recipe records rather than mental arithmetic by the model.

## Per-game application

| Game | Application |
|---|---|
| KH1FM | First-class synthesis catalog, unlock sets, ingredient inventory, remaining-material plan, craftable-ingredient dependencies and farming guidance. |
| KH2FM | Same core workflow with verified synthesis rank/level, modifier-material and recipe-variant rules. |
| BBSFM | Adapt to command melding: owned command copies/levels and crystals where relevant, character eligibility, alternative pairs and chance outcomes. A chance outcome must not be shown as guaranteed. |
| DDD HD | Adapt to Spirit creation: material quantities, alternative formulas, rank and other verified creation inputs. Preserve HD-specific formulas and actual shared/character scopes. |
| KH3 | Synthesis recipes, materials, unlocks and verified variant rules; keep cuisine as a distinct game-specific system. Base/Re Mind boundaries remain explicit. |
| 0.2 | No synthesis inventory requirement; do not invent a crafting system. |

## Required functional acceptance

1. With inventory off, every recipe and source remains usable; no misleading ownership numbers appear.
2. With inventory on, zero/partial/exact/surplus/unknown stock renders correctly and missing quantities are accurate.
3. Edit a quantity; all related recipes and the selected plan update consistently and persist after offline restart.
4. Shared stock is allocated once across multiple planned recipes; alternatives do not add together as simultaneous requirements.
5. Craft quantity changes, material modifiers and craftable ingredients produce independently checked expected totals.
6. Historical crafted checks never silently deduct stock, erase completion or claim product ownership.
7. Toggle inventory off/on; preserve counts. Export/import, content updates, undo where applicable and failed writes do not corrupt stock or checks.
8. Validate invalid/negative/non-integer input against the game's quantity model; prevent overflow and impossible calculation states.
9. Validate recipe IDs, ingredient references, quantities, cycles, output semantics and exact source-conflict status at import/build time.
10. Check representative end-to-end recipe → shortfall → source → saved inventory flows on the initial Apple device matrix, with keyboard/touch/screen-reader use and offline operation.
11. Data Jiminy's quantities and missing-material answers match deterministic planner results.
12. Include game-specific fixtures for alternative recipes, modifiers, character restrictions and chance outcomes wherever those mechanics apply.

See [testing and content validation](../testing-and-content-validation.md) and [persistent progress](persistent-checklists-and-progress.md). Planning only: no working inventory or synthesis UI is claimed.
