# Kingdom Hearts II Final Mix Specification

## Status and evidence

Research assessment updated **2026-09-18**. The [research pack](kh2fm/README.md) contains a complete legacy-source coverage audit, all 301 numbered treasure candidates, all 144 puzzle-piece candidates, and new synthesis/equipment/challenge findings. This is planning and content research; no KH2 application implementation or release validation is claimed. See the [readiness assessment](../readiness/kingdom-hearts-ii-final-mix.md).

## Product objective and accepted boundaries

Ars Arcanum is a collectible/acquisition compendium: “Where is this thing and how do I get it?” Required text covers exact locations, acquisition actions, useful prerequisites, rewards and missability. It is not a mandatory story walkthrough or exhaustive biography/Chronicles state tracker. Apply the accepted [collectible-compendium contract](../content/collectible-compendium-and-linked-views.md).

All specified modules remain MVP: world collectibles, synthesis/material planning, equipment/abilities/magic/Forms/summons, optional encounters, minigame records, cups, Gummi and platform achievements. Keep separately named goal sets; world percentages do not silently absorb challenge or narrative completion. Only production screenshot/map **image acquisition** is deferred. Complete text directions, optional media fields and empty-media behavior are MVP.

The app is deliberately spoilerific: no warning, hiding or reveal flow. Do not build Available Now, plot-progress gates or a progress-gate filter. Required access conditions remain plain text in acquisition records. Inventory is opt-in; enabled recipe ingredients show owned/required (`x/y`) and shortages. Apply [synthesis and inventory](../content/synthesis-and-inventory.md).

## Supported releases

Use modern Final Mix; original/non-Final-Mix and PS2 compatibility are out of scope. The user's platform is Steam HD 1.5+2.5. Research uses English Final Mix naming and preserves relevant Japanese/International and modern-platform distinctions. The official Steam page confirms the included game, release on 2024-06-13, and separate Japanese/International save compatibility. [Steam](https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_15_25_ReMIX/).

Square Enix's 2026-10-08 native-edition announcement is tracked as announced/unreleased on this research date, not as verified shipped content or achievement parity. [Official announcement](https://www.jp.square-enix.com/kingdom/collection/). No executable/build was tested in this pass. Follow the shared modern-edition policy as platform evidence improves.

## World collectible records and synchronized views

- Group collectibles by world and category, using the game's Journal order/numbering where evidenced. Label app-assigned ordering explicitly when no equivalent numbered list exists.
- Compact marks, expanded location rows, world/index pages, search and Data Jiminy resolve to **one stable acquisition record and persisted state**. Toggling either presentation updates all other representations in both directions, including after offline relaunch.
- Each detail needs world, area, landmark, approach direction if ambiguous, collection action, contents/reward, necessary movement/form/ability level, prerequisite text, character scope, repeatability/missability and record-level provenance. Image references are optional.
- Keep Hollow Bastion/Radiant Garden under one stable world identity. Standard Sora, Roxas prologue, and temporary transformed movement are explicit scopes, not duplicate world labels or separate game editions.
- World collectibles counts use completed applicable acquisition units divided by the full declared collection set. Remaining/area/search filters never alter the full denominator. Display category counts and units; an incomplete inventory must not produce a certified 100%.
- A chest-contained map, recipe, charm, Torn Page or Orichalcum+ has one acquisition ID reused by item-specific indexes. Do not count both its parent chest and its contents in the same aggregate. A challenge clear and subsequently opening its reward chest remain distinct actions.

Measured inventory anchors: **301 Sora numbered treasures**, **144 puzzle pieces**, **16 separate unnumbered Roxas prologue chest leads**, **13 Secret Ansem Reports**, **5 Torn Pages**, **7 Orichalcum+ sources**, **4 summon charms** and **16 recipe documents**. These overlap through acquisition relationships; do not add these totals together. See [world research](kh2fm/world-collectibles.md) and the candidate indexes. Directly awarded maps/rewards and their complete world denominators still need normalization.

## Puzzle collection and assembly

Six puzzles: Awakening, Heart, Duality and Frontier have 12 pieces each; Daylight and Sunset have 48 each. Persist each piece's collected state independently from arrangement/orientation, puzzle completion and reward receipt. World piece collection totals count 144 pieces once; assembly and rewards have their own linked goal states. Supply text assembly instructions and explicit movement routes, distinguishing standard Growth level from Drive Form level. Exact solution-grid/rotation data remains a research gap.

## Synthesis and material planning

Synthesis is a first-class acquisition tool. Preserve the workflow expressed in the legacy joins: output/recipe → material and quantity → enemy or special source → probability/condition → precise world/area location.

Required data and behavior:

- All 60 material types, family/rank, special sources, chest/reward links, enemy drops and exact enemy areas.
- Every recipe document and Free Development unlock; base and upgraded outputs, ingredients, modifiers, Moogle level, rank, EXP and first-creation rules.
- Computed requested/remaining quantities with opt-in inventory, per-craft rounding, Energy/Moogle discounts, Bright EXP and Serenity variants.
- Distinct collected-ever/deposited, crafted-once and currently-owned state; spending an item cannot erase collection completion.
- Separate finite stock from repeatable farms; recurse into material synthesis without cycles or invented resources.
- The seven-source Orichalcum+ checklist and Ultima Weapon's Energy requirement.
- User-selectable synthesis alternatives where the game provides them, with assumptions visible in calculated totals.

The [recipe research](kh2fm/synthesis-recipes.md) enumerates 30 base recipes/59 output candidates. This is not yet a certified full planner: Shock Charm ingredient disagreement, rank/modifier inconsistencies, and stacking/rounding rules need source resolution. Do not migrate legacy `Needed` aggregates. Strong formula/quantity validation is required before release; see [testing/content validation](../testing-and-content-validation.md).

## Equipment, abilities, magic, Forms and summons

- Sora's 24 Keyblade acquisition candidates, complete modern Donald staff and Goofy shield inventories, armor and accessories.
- Character/form-specific action, support and Growth abilities, AP costs, equipment grants, level-choice paths and Critical-specific differences.
- Eighteen spell-element grants, deriving tier from element count rather than hard-coding route-dependent tier names.
- Five levelled Forms with distinct EXP units and Growth grants; Final Form acquisition/first activation and Antiform reference where it affects obtaining Forms or movement.
- Four summon charms, shared summon progression and acquisition/progression hooks.

Keep these globally scoped acquisition/progression goals separate from world collection percentages except where a specific reward already belongs to a world collectible record. Modern corrections include Luxord's Magnet grant and Final Mix replacements for legacy Lucky Lucky equipment. See [materials/equipment research](kh2fm/materials-and-equipment.md).

## Optional encounters and record modules

Required separate goal tracks: Mushroom XIII, five Absent Silhouettes, thirteen Organization XIII Data rematches, Sephiroth, Lingering Will, Cavern of Remembrance access/acquisitions, eight cups and their score targets, minigames, Atlantica song records, Gummi missions/blueprints and platform achievements.

Every challenge record needs location, textual access prerequisites, objective, target comparator/unit, controller-neutral strategy, reward links, repeatability and clear/personal-best state. Distinguish Mushroom Journal targets from better farm ranks, cup clear from score targets, and first-time rewards from repeatable Data drops. Gummi and platform achievements use their own denominators. An achievement requiring official Journal completion must state that accurately without asserting that World collectibles 100% proves it or introducing a full narrative trigger manifest.

The [challenge research](kh2fm/challenges-records-and-gummi.md) documents current findings and unresolved exact tables. All these modules remain MVP; partial research is not a future-feature deferral.

## Domain model and offline behavior

Retain concepts, not the old SQL Server schema: `acquisition_record`, `collectible_category`, `world`, `area`, `character_scope`, `puzzle`, `puzzle_piece`, `recipe_document`, `recipe_variant`, `ingredient_requirement`, `material_source`, `encounter`, `score_target`, `platform_achievement`, `source_evidence` and optional `inventory_balance`.

Stable IDs survive names, ordering and numbering corrections. A distinct acquisition event can satisfy multiple linked catalog views without duplicate counts. Availability prerequisites are text metadata, not saved plot flags. Formula and content versions need migrations without losing checks/inventory.

React offline PWA, local persistent progress and backup/update safety, plus bundled local SLM and per-game Coppermind via Data Jiminy, remain MVP. Follow the [shared progress contract](../content/persistent-checklists-and-progress.md) and [Data Jiminy contract](../data-jiminy.md). Source-aware answers point to the same live collectible record and expose unresolved evidence instead of inventing a location or quantity.

## Primary user questions

- What treasures and puzzle pieces am I missing in this world?
- Where exactly is this item, and what movement ability does its route require?
- Which pieces belong to this puzzle, how is it assembled, and what does it award?
- What ingredients do my selected recipes require, and how much am I short?
- Where can I repeatedly obtain this material in Final Mix?
- What grants this Keyblade, spell upgrade, charm or proof?
- What score or action earns this optional challenge reward?
- How do my selected Gummi/Steam goals differ from World collectibles?

## Visual direction — green journal

Accepted direction: KH2 shares the green Jiminy's Journal family with KH1, replacing the older speculative black/silver theme.

- Green outer framing, pale cream/lime pages, binder cues and burgundy category tabs.
- Purple/lavender contents panels can contrast with lighter detail pages.
- World/category context remains visible above content.
- Compact entry grids use labels and accessible individual controls; assets enhance them without being required.
- Completion and newly changed states are distinct and accessible; no progress-gated content hiding.
- Single-page mobile reading; optional index/detail or facing-page composition on wider screens.
- Character-grid references inform browsing structure, not exhaustive character-biography completion requirements.

See [shared design direction](../ui/jiminys-journal-design-direction.md).

## Release acceptance

Validate the **application**, initially on Apple browser/iPhone/iPad, with Android follow-up; no user gameplay or playthrough is a gate. Verify bidirectional checklist synchronization, offline persistence, stable IDs, constant denominators under filters, deduplication, opt-in inventory behavior, ingredient arithmetic and source-grounded Data Jiminy answers. Run with zero production images and confirm that text directions suffice.

Content acceptance requires reconciled inventories and exact source-supported acquisition directions, resolved numeric conflicts and correctly scoped platform requirements. It does not require ordinary plot conversations, full Chronicles transcripts or biography updates. Research and app validation remain separate, with status recorded honestly in readiness.
