# DDD HD faithful Reports — implementation plan

**Revision 0.1 · 2026-10-03 · User-authorized implementation.**

The user requested research followed by implementation, explicitly requiring near parity with the native style, subject to the established other-game journal constraints. This is a functional replacement of DDD's generic presentation, not a static mockup or a palette-only reskin. [Research and native evidence](dddhd-journal-design-research.md) · [Original images](references/dddhd/README.md).

## Settled requirements

- Charcoal/silver Reports frame; outside-left metallic rings; black cover with art and gray section menu; glossy magenta hierarchy plaques; one broad cool-white ruled leaf; quiet gray title panel; hand-selection gutter; contextual gray footer.
- Do not force the KH1/KH2 two-leaf spread into DDD. Do not use Help's cyan/violet treatment as Reports.
- Keep the outside frame/book fixed across sections, tools, search and save/settings. Measure compact top-aligned list capacity. Long instructions use numbered continuations. Use separate labels for entry navigation and note-page navigation.
- Preserve hover/focus geometry, logical browser history, return selection, canonical deep links, touch/keyboard semantics, 44px targets, readable phone text and reduced motion. Reflow rather than scale a desktop screenshot down.
- Maintain every real DDD catalogue and first-class Spirit Creation/material/farming workflow. No empty Story, Character Files or lore transcript placeholders. No invented plot tracking, Available Now gates or spoiler hiding.
- Keep progress truthful: one canonical chest per character/world/source identity; shared Spirit facts; individual recipe items/formulas/commands/material stock remain separate. Search and filters do not shrink declared completion denominators.
- Preserve existing persistence, import/export/recovery and empty Data Jiminy behavior. Do not change catalog IDs or backup schema for a presentation refactor.

## Working screen map

This is the companion's navigation mapping, not a claim that every label below is a native Reports entry.

| Screen family | Working composition | Data / purpose |
|---|---|---|
| Reports cover | Native black cover, paired art/menu panels, eight compact destinations where feasible | Direct useful journal destinations; app tools remain discoverable |
| Worlds / Treasures | Magenta section hierarchy, Sora/Riku/Both scope, world index and compact acquisition list | Same 438 canonical chest records, source order and numbered acquisition notes |
| Dream Eaters | Native paper/ruled breed index; truthful acquired marks | Existing 54 Spirit breeds, linked recipes/boards/providers; no invented Nightmare collection |
| Game Records | Ruled list of useful record families | Links, Dives, challenges and portals; no invented gameplay counters |
| Collection catalogues | Same Reports index/detail family | Commands, abilities, Keyblades, recipe items, training and mechanics remain reachable |
| Spirit Creation | Reports-styled working recipe, material and farming pages | All formulas, ingredients, unknown stock vs zero, additive targets and historical crafted checks |
| Completion / Trophy Shelf | Scoped truthful app summary and award index | In-game awards distinct from Steam achievements; no simulated Play Time or official Reports percentage |
| Search / Save & Settings | Same fixed leaf, measured pages and context footer | Existing search, backup/restore/recovery and status controls |

Exact grouped root labels should be recorded alongside the implementation once the real component is in place. Keep useful categories directly reachable within their logical family; do not hide the whole guide behind a generic Guide Notes catch-all.

## Reuse boundary

Implement a DDD-specific journal and CSS alongside existing journals, routed through the existing `GuideJournal` ownership of profile state. Reuse `useIndexCapacity`, `JournalNotePages`, entry presentation and canonical recipe/material calculations. Keep DDD styles scoped. Existing DDD hash routes and saved routes continue working; a fresh profile may open a Reports cover without breaking saved-world/category links.

Current data baseline: 1,285 entries / 263 formulas on `083dd13`. A parallel factual-research task is finalizing documentation independently; do not overwrite its generated files or reports. Validate identity sets against baseline before final handoff.

## Asset boundary

The six supplied JPGs are preserved research references, not production textures. Recreate structural elements in code and use already permitted standalone assets. `public/assets/ddd.png` differs from the native cover portrait; record this specific limitation. Do not copy screenshot badges, native `NEW` marks or completion values when the app does not implement their meaning. Bundled Chakra Petch/Itim are font substitutes, not verified native fonts.

## Validation before claiming ready

1. Desktop screenshots of cover, treasure index/detail, Dream Eaters, Spirit Creation, search and settings; compare directly against original source layout/palette/type hierarchy.
2. Phone portrait and short landscape screens: no clipping, horizontal overflow, unreadable compressed rows or assistant overlap; stable bounds and measured capacity after resize.
3. Open → check → Back → search → reopen → reload; independent Sora/Riku checks, aggregate counts and fixed denominators.
4. Recipe ingredient link, stock blank/zero/positive, additive targets, crafted-state toggle without inventory consumption, farming remaining calculation.
5. Existing deep links, Back/Forward, return focus, filters, pagination, repeated menu actions and empty search state.
6. Backup export/import/recovery, failed-write visibility, offline installed reload, cross-tab synchronization where supported.
7. Full relevant unit/e2e suite and production build; distinguish Chromium mobile emulation from real Safari/iPhone acceptance.
8. Original image SHA-256 values and data identity sets unchanged; no stale knowledge pack added.

Record actual results, screenshot paths, known approximations and any blocked checks in the implementation validation report. Passing tests is not user visual acceptance or native gameplay verification. Keep the completed work on the feature branch, publish verified checkpoints and do not merge automatically.
