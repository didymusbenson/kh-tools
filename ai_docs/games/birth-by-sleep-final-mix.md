# Kingdom Hearts Birth by Sleep Final Mix — family specification

## Status and boundary

Research assessment updated 2026-09-18. [Research pack](bbsfm/README.md) and [readiness](../readiness/birth-by-sleep-final-mix.md) replace the previous unaudited discovery claims. Candidate inventories and detailed mechanics exist; the content is not yet certified or implemented.

BBS Final Mix is the modern HD game with separate Terra, Ventus and Aqua progress. **0.2 remains in the Birth by Sleep family with its own [dedicated specification](kingdom-hearts-02.md), data, objectives and completion state.** Do not apply BBS command melding or three-character progression to 0.2. BBS's playable Secret Episode “A Fragmentary Passage” and the later game “0.2 … A fragmentary passage” are different scopes. 2.8 is a collection, not a separate game checklist.

The user's game baseline is Steam BBSFM in HD 1.5+2.5 ReMIX, published on Steam on 2024-06-13. [Steam product](https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_15_25_ReMIX/). Pin the installed/current build when validating rules; no unsupported “latest” claim. Square Enix lists new editions for 2026-10-08, which are announced and unreleased on this audit date; no future platform mechanics are certified. [Official collection site](https://www.jp.square-enix.com/kingdom/collection/). PSP/non-Final-Mix compatibility is outside the product baseline.

## Accepted product behavior

Ars Arcanum answers where an acquisition is and how to obtain it. Apply the [collectible compendium and linked views contract](../content/collectible-compendium-and-linked-views.md), [synthesis and inventory contract](../content/synthesis-and-inventory.md), and [app/content validation contract](../testing-and-content-validation.md).

- Spoilerific throughout: no spoiler warnings, hiding or reveal controls.
- No Available Now filter, story-progress-gate tracker or milestone input. Prerequisites remain useful acquisition text.
- World percentages count applicable collectible acquisitions only. Narrative story/character Reports content is context and does not block world completion.
- Compact world marks, detailed location rows, indexes, search and Data Jiminy use one stable record and saved value.
- Commands, equipment, melding, optional challenges and platform achievements remain separately named MVP modules.
- React offline PWA, persistent local progress, backup/migration safety and bundled local SLM/per-game Coppermind remain MVP.
- Inventory tracking is optional and opt-in. When enabled, recipes show owned/required counts such as `2/3`; command instances retain level/ability information needed by melding.
- Initial app smoke/acceptance targets Apple browsers on iPhone/iPad; Android follows. The user playing on Steam does not mean the app runs only on Windows.
- Validate app behavior, formulas and content sources. A required user gameplay playthrough is not a release gate. Only missing production screenshots/map image assets are deferred; text directions, media fields and image-free rendering are MVP.

## Evidence now available

| Dataset | Inspected/created evidence | Important limit |
|---|---|---|
| Legacy workbook | All bounded grids read; 296 outcome rows, 112 matrix cells, 150 catalog rows, nine materials | Old letter mappings and typos are incompatible with naïve migration |
| Existing user reference | Reused 296 outcomes with ingredient levels, character rates and rare-Shotlock ownership rules | Two current-source conflicts quarantined |
| Collectibles | 443 candidates: 374 numbered main chests, eight Secret Episode chests, one tutorial chest, 60 stickers | Area inventory; complete directions and Reports order still need source validation |
| Reports | Letter and I–XII acquisition table | Chest-linked reports must not double-count |
| Abilities | 30 stack-cap entries; 28 meldable types | CP/learning and random-crystal details need final checks |
| Keyblades | 24 forms, scoped stats and acquisition | Reach/passive normalization remains partial |
| Other acquisition tables | 14 ice cream recipes, 42 flavors, 108 command-shop candidate rows, 42 finish-unlock predicate rows | Source leads; not all acquisition alternatives or mode exceptions |
| Challenges | 16 Arena battles, 29 level-up conditions, nine Unversed Missions, four racing courses, five rhythm songs, seven boards | Complete strategies and modern source reconciliation remain open |

The inventory totals are measured candidate-source coverage, not automatic proof of a complete production compendium. [Source manifest](bbsfm/source-manifest.json).

## First-class command melding

Support both directions: “What can these commands become?” and “How do I obtain this command with this ability?” Show alternative acquisition routes and guaranteed versus random outcomes. The result depends on character, input levels, retained movement/defense copies, ability crystal, and previously obtained rare Shotlocks.

Store recipe outcomes separately from input-pair identity; probabilities can vary by character and ownership. Recipe type A–P means crystal/ability mapping, not command class or DDD-style rank. Basic/Advanced/Ultimate and recipe-item visibility are distinct properties. Both commands must meet their recipe-specific level requirements; do not assume universal mastery.

With inventory enabled, validate quantities and levels, reserve the required action-command copy, account for two identical ingredients, consume both input commands and the chosen material only when the user records a completed meld, and add the actual selected outcome atomically. Do not record a probabilistic preview as a guaranteed acquisition. Undo restores quantities, levels and identities exactly. With inventory disabled, all reference/calculation features remain useful.

Permanent learned ability, attached ability, enabled stack count, command ownership and mastered-command state are distinct. The planner must not claim abilities attach to Shotlocks or treat a rare Shotlock's already-obtained state as irrelevant. Strong validation covers probability sums, source conflicts, formula boundaries, levels, inventory consumption, duplicate inputs, optional inventory, undo and persistence.

Historical acquired/crafted checks never consume stock or imply present ownership. An explicit completed-meld transaction is a separate action. Unknown inventory differs from zero; show surplus honestly and calculate missing quantities as max(required − owned, 0). Multi-recipe plans allocate the shared command/crystal pool once and expand only the chosen route, with cycle detection and no duplicate prerequisite crafting. Disabling inventory preserves its saved values. Data Jiminy uses the same deterministic calculations as the planner.

## Collectible and acquisition modules

Terra, Ventus and Aqua share reference facts but retain independent acquisition state. Separate main, Final and Secret Episode save contexts where applicable.

- Treasures by world/character in verified Reports order; tutorial and Secret Episode scope explicit.
- Sticker pickup locations and album placement/point rewards. Collection and optimal placement are distinct.
- Xehanort reports and letter, linking chest or event sources.
- Command catalog: attack, magic, item, friendship, movement, defense/reprisal, Shotlocks, D-Links, Styles and Finish Commands, with modern availability.
- Every material/flavor and its enemy/shop/event source; conditional rates, precise area and farming directions.
- Every Keyblade with character/episode scope and acquisition.
- Mirage Arena battles, bonus challenges, cumulative medal missions, level progression and rewards.
- Command Board panels/modes, Rumble Racing, Ice Cream Beat, Fruitball and Unversed Missions.
- Optional bosses, Final/Secret Episode unlock requirements and separate in-game Trinity trophies/platform achievements.

Each collectible detail needs precise text directions, action, reward, movement/character prerequisite, revisit/missability facts, unit/count scope and provenance. Search filters never shrink the full-world denominator. Duplicate representations and chest-contained reports resolve to a single acquisition record.

## 0.2 relationship

The separate [0.2 spec](kingdom-hearts-02.md) owns its numbered objectives, treasures, wardrobe unlocks, equipment/combat facts, optional encounters, difficulty requirements and achievements. The full KHBBS workbook contains no 0.2 data. Family navigation may connect the experiences; saved state, denominators and mechanics must remain distinct.

## Primary questions and grounded answers

- Which Terra/Ventus/Aqua treasure or sticker am I missing, and how do I reach it?
- Which meld guarantees this command for my character?
- Which crystal and recipe grant Second Chance, Once More or Magic Haste?
- Can an ability be attached to a base command such as Aero? Check whether it can be a meld result; never invent a recipe.
- Where can this character obtain a crystal, command, Keyblade or ice cream ingredient?
- What will this meld consume from my optional inventory, and what can it produce?
- What remains for the album's 140-point reward, Arena level 30, or a separate Steam achievement?
- Is this the BBS Secret Episode or the distinct 0.2 game?

## Ars Arcanum visual direction — blue Reports

Accepted user direction: Birth by Sleep uses the blue Reports journal treatment shown in the supplied references.

- Cobalt/royal-blue framing with cyan header accents.
- Deep navy, lightly starry contents surfaces with violet-blue list panels.
- Pale icy-blue reading pages for tables, collectibles, and detailed entries.
- Binder-ring cues and burgundy section tabs maintain the journal relationship to KH1–2.
- Clear character name and emblem identify Terra, Ventus, or Aqua; character accents are secondary to the shared blue theme.
- Completion badges align with rows; rewards and point thresholds remain scannable.
- The Sticker Album reference informs reward-table hierarchy. Album art is optional and not required for MVP.
- On phones, collapse the portrait/contents spread into a compact character header and full-width content.
- 0.2 remains part of the BBS family, but its exact visual variation awaits additional inspiration; do not treat the earlier dark/fragmented suggestion as approved.

See [shared design direction](../ui/jiminys-journal-design-direction.md).


## Current blockers and acceptance

Detailed rows and algorithms are ready to be modeled, but shipment still requires resolving the two meld conflicts, precise collectible directions, independent inventory/order validation, complete alternative command acquisitions, normalized character/mode exceptions, and Steam achievement predicates. None requires the user to play through the game for us.

Acceptance must demonstrate bidirectional checklist synchronization, character/episode isolation, stable denominators, source-grounded answers, opt-in inventory and correct atomic melding/undo, image-free text guidance, offline/relaunch/backup behavior and accessible Apple mobile layouts. Formula/content validation must exercise the known conflicting cases rather than trusting extraction totals.
