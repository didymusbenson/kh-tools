# KH3 faithful Gummiphone — proposed implementation contract

**Date:** 2026-10-03  
**Status:** Research-derived proposal. The user asked to start research; this document does not authorize implementation, merge or deployment.  
**Source of truth:** [Screen-family research and evidence](kh3-interface-research.md), starting from the [five supplied originals](references/kh3/README.md).

## 1. Non-negotiable direction

- Recreate KH3's Gummiphone composition closely. Do not reuse DDD's book, rings, paper, magenta plaques, Sora/Riku scope or a generic dashboard with KH3 colors.
- Preserve distinct native families: icon launcher; dark geometric records; gold Lucky Emblem world/board; monochrome Classic Kingdom filmstrip; digital readers; green Workshop; separate technical Gummi/Premium contexts.
- Keep all existing practical content and routes useful. No empty Story/Character/Photo Album tiles merely to fill the native grid, no fake playtime/stats/save data and no narrative progress tracking.
- Research screenshots remain evidence only. Production artwork extraction is not authorized. No source-code or data changes belong to this research checkpoint.

## 2. Proposed work order after authorization

### A. Route and state contract first

Introduce a KH3 presentation adapter at the dedicated-renderer boundary in `src/games/GuideJournal.tsx`. Retain all 44 categories, 17 hubs and old hash links. Keep game/profile/entry/recipe identities unchanged.

Define URL state for canonical selected entry, world/area/category scope, text query, status filter, list page, note page, active presentation mode and return target. Unknown/malformed values fail safely. Resume of an old `kh3/worlds` route still opens its world view. A new Gummiphone landing route is proposed for fresh entry; it must not override existing saved resume.

Preserve IndexedDB transaction behavior, cross-tab notifications, quantity validation, import/recovery and error rollback through shared `profile.ts`. Do not redesign the schema just to fit visual panels. The current single KH3 profile has separate base/DLC IDs, not implemented multiple save-lineage profiles.

### B. Build the visual frame families

| Frame | Supported by | Essential composition |
|---|---|---|
| Gummiphone launcher | X01/X06 | Fixed digital stage; 3×4 icon/label grid at landscape reference size; compact help strip; balanced right context/art region |
| Record frame | U04/U05 | Dark diamond rails, compact mint/cyan header, broad split content, blue/teal detail field, stable footer |
| Lucky Emblems | X02/X03 | Light diamond backdrop, three gold plaques, world-card index and framed board, warm selected state |
| Classic Kingdom | X08 | Monochrome texture, selected-game summary, filmstrip rows, separate page controls and completion marks |
| Reader | U02/U03 | Thin centered colored header, broad list/text columns, dark pattern/scrim, numbered app continuation pages |
| Workshop | X04/X07 | Green field and vertical rail; native hub; product list, description and requirements panels; source-linked manual inventory |
| Gummi catalogue | X09, partial | Technical cyan frames and gold selection; text-first catalogue when model assets are absent; other Gummi screens unresolved |
| Premium reference | X05, provisional | Black technical chrome, amber code family, separate rank/history summary; no fake active-code toggles |

Keep tokens local to KH3. Geometry and texture can be coded, but do not crop source motifs/assets into production. Use existing properly licensed fonts only as acknowledged substitutes; technical chrome and rounded reading text are different roles. Match letter rhythm and spacing before adding glows. Accessibility contrast is a requirement even where native captions are dim.

### C. Deliver coherent player flows

1. Home → Worlds → Treasures / Lucky Emblems / named activity → Notes → check → return to exact selected slot
2. Home → native-framed Treasures → grouped world slots → acquisition notes, preserving totals and chest numbering
3. Lucky Emblems → world cards → numbered/photo board → camera-position notes and manual photographed state
4. Classic Kingdom → filmstrip catalogue → acquisition source or score goal, retaining independent saved identities
5. Game Records → Combat / Missions / Minigames → practical predicate/control/reward details; no invented numeric player scores
6. Gummiphone Synthesis history ↔ Workshop, with explicit distinction between made-once record and active crafting
7. Workshop → Synthesis / Forge / cooking link → Recipes / Materials / Farming Plan → material source → return with focus intact
8. Adversaries ↔ material routes ↔ Battlegates; Secret Reports link to canonical Battlegate acquisitions
9. Gummi zones → missions/battles/treasures; separate parts/blueprints/abilities/building references and correct units
10. Re Mind → separate DLC chests/encounters/Premium guidance; Steam Achievements stays an explicit platform overlay
11. Search → canonical item; Progress & Backups → export/import/recovery; cold-offline resume after each important flow

Full route/category ownership is in the [research mapping](kh3-interface-research.md#screen-map-and-route-coverage).

### D. Resolve presentation-exposed data gaps deliberately

These are existing runtime gaps, not permission to modify facts during this research:

- Recipe checks and `synthesis-history` checks are independent today. A unified made-once view needs a mapping, migration/conflict policy and tests, not an implicit visual merge.
- Raw KH3 content holds acquisition links, forge ladders, material/ingredient routes, meal effects, Gummi rewards and Collector Goal metadata not exposed by the shared type/detail renderer. Use a typed KH3 adapter rather than flattening or discarding it.
- `collectible:true` does not cover every relevant named goal. Show category units explicitly; do not manufacture one native completion percentage from arbitrary checkable rows.
- The existing generic view lacks recent-action undo, retained filters and selected-entry deep links. Their implementation belongs to the enduring progress/navigation requirements, with verification.

Inventory controls remain always available; blank is unknown. Recipe additions accumulate direct ingredient targets, never implicitly consume stock. Synthesis, Forge and Cuisine remain distinct. Add no Available Now filter or story milestone system.

## 3. Responsive and accessible behavior

The source game provides landscape/controller references. Phone behavior below is deliberate app design.

- Measure viewport-owned stage after chrome/footer/safe areas; keep its outside bounds stable across sections.
- Measure rows/cards after text wrapping and fonts; do not use fixed five-row pages or stretch rows to fill height.
- Wide: related index/grid and notes can appear together where the native family supports it. A gold photo-board need not be forced into two equal “leaves.”
- Narrow: show one useful panel with labeled World / Collection / Notes or Index / Notes modes; no microscopic console screenshot, mandatory swipe or hover-only help.
- Use distinct index-page, notes-page and adjacent-entry controls. Preserve selection when measured capacity changes.
- Focus/check/hover may change color/outline/glow only within allocated geometry. Reserve status/cursor gutters.
- Ordinary primary targets aim for 44px; support keyboard, screen reader, browser zoom, text reflow, visible focus and reduced motion.
- Do not let the fixed-stage preference clip text at exceptional zoom. Use an accessible reflow fallback when a bounded page cannot fit.
- Announce save status/errors truthfully. Under Remaining, checking a row must keep a predictable next focus and support undo.
- Missing media produces complete text-first content, no blank illustration cavity or pretend photograph.

## 4. Proposed acceptance gates

| Gate | Required evidence before calling it complete |
|---|---|
| Native identity | Side-by-side reference captures for each implemented frame; list all artwork/font substitutions; no statement of full fidelity while key native screens remain unverified |
| Structure | All 44 categories reachable in meaningful groups; old routes and Resume preserved; no fabricated unsupported native features |
| State identity | World/slot/detail/search share checks; chest-contained Classic aliases stay one acquisition; score/result/crafted/owned meanings stay distinct |
| Counts | 245 base chests, 90 emblems, 9 DLC chests and 10 Slider prizes separate; filters do not shrink declared denominators; no 0/0 “complete” references |
| Workshop | Correct Synthesis/Forge/Cuisine selection, independent stock/history, unknown versus zero, actual surplus, additive direct targets, safe recipe/history migration if included |
| Navigation | Deep link/reload/back/forward and material-source return retain world/area/category scope, page and focus; repeated clicks, resizing and long notes remain stable |
| Persistence | Write failure/rollback/retry, cross-tab change, import validation/recovery, update safety, undo, and installed cold-offline restart |
| Accessibility | Keyboard/touch/screen-reader labels, focus, live status, contrast, reduced motion and zoom/reflow; real Apple-browser/device acceptance separately recorded |
| Regression | Existing content/unit/build checks plus KH3-specific e2e; no CoM/DDD/other-game or empty Data Jiminy regression |

No application tests were run for this documentation-only research pass. A later implementation must run the full required checks against its final source and separately disclose untested visual/device boundaries.

## 5. Decisions for design review

1. **Root substitutions:** proposed 3×4 grid replaces four unsupported native apps with Worlds, Equipment, Gummi Ship and Re Mind, retaining the eight native-backed apps in their relative positions. Alternatively use a native-backed page plus companion-tools page. Neither is yet user-approved.
2. **Text-first Lucky Emblem/Classic tiles:** intentional numbered/title cards until authorized usable photos/illustrations exist. This is a fidelity compromise, not a reason to lose location guidance.
3. **Treasure notes:** retain native grouped chest-grid overview, then an app-owned Notes mode for practical acquisition guidance. Do not claim native per-world navigation not shown by the screenshot.
4. **Synthesis access:** keep the Gummiphone history tile distinct and Workshop first-class/one activation away. Recipe-history consolidation requires the explicit state plan above.
5. **Evidence gates:** resolve P1 capture gaps for missing/complete collectibles, Adversaries, Gummiphone Synthesis and Workshop secondary screens before claiming near parity there. Exact motion/audio remains optional polish pending observable video.

These questions are recorded for the next design/implementation conversation. The useful research does not depend on asking the user to decide them immediately.
