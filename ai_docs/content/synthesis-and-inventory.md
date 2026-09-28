# Synthesis, inventory and farming plans

Status: updated from the September 20, 2026 refinement session; supersedes the September 18 opt-in inventory and recipe-queue proposal. Synthesis is a first-class MVP feature: reduce the work of discovering recipes, figuring out remaining materials and finding practical farming sources. Apply the interaction lessons from KH1 to each game's actual crafting system without importing KH1 mechanics into other games.

## Recipe and inventory experience

- Order workshop tabs Recipes → Materials → Farming Plan. Recipe reference, unlock conditions, ingredient quantities, product effects and source details remain usable before the player enters any stock.
- Inventory controls are always available; there is no opt-in switch. Players may leave quantities blank. Show ingredients as **owned / required**, e.g. “Spirit Shard (2/5),” with an accessible explanation.
- Show actual owned stock, including surplus (8/5); missing quantity is max(required − owned, 0). Unknown/unentered quantity must be distinguished from a confirmed zero. A recipe displays requirements for one craft; the Farming Plan displays the saved total stock target.
- Inventory belongs to the applicable game/profile and any actual character-specific ownership scope. Persist offline, restore across sessions and include it in validated export/import and migrations.
- Group materials by family and grade. Collapsed rows show enemy/source, percentage (or “Conditional”), farming location, owned stock and Add to farming plan. Expand for specific rules and finite alternatives; omit repeated generic drop-boost advice.
- Checking historical “crafted” completion does not silently consume materials or assert current product ownership. Default planning behavior keeps manual stock counters and historical checks independent. Any later explicit “record a craft” transaction must define consumption, outputs, undo and failure behavior before implementation.
- Inventory changes recalculate affected rows and planners immediately; show saved state honestly. Inventory is manually maintained, with no game-save synchronization implied.
- Required progression/unlock information remains visible text. Do not require users to track story/ability milestones or provide an Available Now filter.
- No spoiler warnings, concealment or reveal controls apply to recipes, rewards or sources.

## Planning calculations

Adding a recipe adds its direct ingredient quantities for one craft to persistent material targets. Repeated additions accumulate. Adding a material alone sets a target of one only if it has no existing positive target. Never reset a target or subtract stock while adding ingredients.

The Farming Plan is a material-target list, not a live recipe queue or “up next” list. Show target, owned and remaining = max(target − owned, 0) for each material; blank stock means unknown. Shared ingredients aggregate into one target, so owned stock is counted once. Editing or removing a target preserves owned stock. Historical crafting checks neither alter targets nor consume stock.

All farming details must be available inline in the plan. Craftable ingredients may expose their own recipe and source details, with cycle guards; do not automatically expand their dependency requirements into additional targets. Selecting alternate formulas adds only the chosen formula. Future optimizers or explicit craft transactions need their own verified semantics and must not silently change this manual-target workflow.

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

1. On first use, inventory controls are visible and blank stock is unknown; recipes and sources work without entering quantities.
2. Zero/partial/exact/surplus/unknown stock renders correctly and missing quantities are accurate.
3. Edit a quantity; all related recipes and the selected plan update consistently and persist after offline restart.
4. Recipe additions aggregate direct ingredients into material targets; repeated additions accumulate, and alternatives are not all added together.
5. Recipe additions, manual target edits and supported modifiers produce independently checked totals; no implicit dependency expansion changes a target.
6. Historical crafted checks never silently deduct stock, erase completion or claim product ownership.
7. Export/import, content updates, undo where applicable and failed writes preserve stock, checks and farming targets. Removing a target leaves stock intact.
8. Validate invalid/negative/non-integer input against the game's quantity model; prevent overflow and impossible calculation states.
9. Validate recipe IDs, ingredient references, quantities, cycles, output semantics and exact source-conflict status at import/build time.
10. Check representative end-to-end recipe → shortfall → source → saved inventory flows on the initial Apple device matrix, with keyboard/touch/screen-reader use and offline operation.
11. Data Jiminy's quantities and missing-material answers match deterministic planner results.
12. Include game-specific fixtures for alternative recipes, modifiers, character restrictions and chance outcomes wherever those mechanics apply.

See [testing and content validation](../testing-and-content-validation.md) and [persistent progress](persistent-checklists-and-progress.md). The KHFM implementation is the interaction reference; other games must document their actual implemented coverage.
