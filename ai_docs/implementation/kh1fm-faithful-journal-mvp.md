# KH1FM faithful journal — MVP review pass

**Date:** 2026-09-23  
**Status:** Implemented locally for visual/interaction review; not deployed.  
**Plan:** [KH1FM new UI plan](../ui/kh1fm-new-ui-plan.md).

## Authorization and purpose

After the initial plan was drafted, the user authorized an MVP pass to make the design unknowns easier to resolve through a working preview. This supersedes the earlier documentation-only boundary for this follow-up. Provisional design choices below remain revisable; implementation is not user acceptance of those choices.

Local preview: **http://localhost:4179/#/kh1fm/contents**. The original three-game mockup remains separate at port 4178. The local server must be running for these URLs. Preview origins have separate browser storage; using this new port does not automatically display progress saved on another origin.

## Implemented

- Replaced the KH1 wiki-style sidebar/shell with a green native-style journal frame, purple Jiminy index leaf, ruled entry pages, binding and compact navigation.
- Added Contents, Guide Notes, short paginated indexes and focused entry pages backed by the real KH1 data package. Main game selection enters KH1 Contents.
- Exposed Reports, Heartless, Dalmatians, Trinities, minigames, worlds, treasures/postcards, torn pages, magic, equipment/abilities/summons, challenges/Gummi, achievements and all reference entries. No sample biography prose was copied from the mockup.
- Added world and uncollected filters, URL-backed pagination/search and acquired controls on both the index and entry page. Filtered lists retain the full selected scope's completion denominator.
- Reused the existing progress calculation for collection summaries, preserving deduplicated acquisition actions and three-puppy groups.
- Kept existing synthesis/stock/farming and save/settings components inside the journal frame. Their detailed presentation is transitional; their business logic was not rewritten.
- Preserved canonical IDs, IndexedDB names/records, backup formats and the existing entry-link forms, including `entry/<id>` and `?entry=<id>`.
- Kept save failure/retry, undo, update notices and missing-entry states visible. Removed redundant puppy metadata from the rendered details, retaining the clear group label and reward.
- Added a compact header “Ask Jiminy” launcher with the existing game-scoped dialog and disclaimer; it no longer floats over the new KH1 pages.
- Added a reflowed single-page phone layout. Wide screens use the notebook spread. Original commercial fonts and exact artwork remain approximated.
- Included the new local fonts in PWA precaching. Reference screenshots remain outside the runtime bundle.

## Provisional decisions exercised by the MVP

| Plan question | Choice demonstrated | Still open |
|---|---|---|
| Q01 | Short Journal contents with Guide Notes for additional companion content; Synthesis directly on Contents | Final native contents/menu order after more references |
| Q02 | Existing completion-companion content; no new full Chronicles/biography/report-text inventory | Whether that content should be added |
| Q03 | Selecting a record opens a focused reading spread; acquired check is a separate action | Whether a retained adjacent index is preferable |
| Q04 | Single readable leaf on narrow phones; split spread on desktop | User acceptance, real-device/zoom review |
| Q05 | Compact header Search and Save & Settings; URL-backed search results | Final placement and labels |
| Q06 | Explicit header Ask Jiminy, no duplicate floating character | Whether native help-area integration is better |
| Q07 | Preserved current always-enabled stock behavior | Optional inventory product discrepancy remains |
| Q08 | Real acquisition checks only; no invented unread markers or personal-score editing | State semantics and any new score input |
| Q09 | No fake rotating-model/full-view control | Need for a genuine model viewer |
| Q10 | Existing game selector preserved during this KH1-focused pass; KH1 opens Contents | Global cover redesign remains open |
| Q11 | Itim/Chakra Petch approximations and prototype assets | Exact typography, textures and KH1 Jiminy artwork |

## Validation performed

- TypeScript compile passed during implementation.
- All **76 existing unit tests across 9 files passed**, covering content, planner, persistence, material presentation, other-game data, PWA and Jiminy behavior.
- Production build passed after integration; content validation reported **1,149 entries, 33 recipes and 23 coverage groups**, and the browser retrieval pack passed its content check. Existing bundle-size advisory remains.
- Browser inspected desktop Contents and a real puppy-group reading page.
- Checked a puppy group in the index and confirmed the detail page showed it acquired. Separately checked Puppies 22–24, reloaded, and confirmed the live checkbox remained checked. Restored these temporary review checks afterward.
- Navigated the second Dalmatian index page and verified page/query links and the 33-group denominator.
- Opened the synthesis workspace and confirmed recipe, material and farming-plan navigation remained available.
- Inspected a 390px phone layout and searched for Fury Stone; results rendered without horizontal page overflow or broken images.
- Opened/closed the compact Data Jiminy dialog and confirmed the KH1 scope/disclaimer. Did not download models or run a new inference-quality evaluation.
- No browser console errors were reported in the inspected flow. Restored the default desktop viewport afterward.

## Deliberate limitations and follow-up

1. This is an MVP review build, not final UI acceptance. Native contents order, puppy-grid/world-toggle layout, Trinity tally and minigame record geometry still need the references listed in the [workbook](../ui/references/kh1fm/README.md).
2. Dalmatians and Trinities currently use the verified journal **index/page language** with real checks, not a falsely claimed pixel-exact reconstruction of unverified native collection screens.
3. Backup workflows retain earlier controls inside the new frame. Synthesis was subsequently replaced with the facing-page design documented below.
4. The body fonts and later-game Jiminy render are provisional. [Asset sources and font licenses](../../public/assets/kh1-journal/README.md) are checked in. Exact KH1 production art/typography still need review.
5. Keyboard focus, readable phone reflow and reduced-motion styling are implemented, but physical iPhone/VoiceOver, 200% zoom, full browser Back/Forward regression, offline browser reload and exhaustive deep-link acceptance have not all been validated in this pass. PWA unit tests/build checks are not a substitute for those checks.
6. The old browser test suite contains assumptions about the superseded sidebar/inline layout. It was not represented as passing against this redesign; update and rerun affected acceptance cases before production cutover.
7. Native Chronicles and full character biographies remain a scope question. Their absence from this MVP is recorded, not disguised with placeholders.
8. The former KH1 shell was replaced; some unused old view helpers/styles remain in the module pending the final content/tool redesign. Shared styles and other-game presentation were not broadly deleted.

## Suggested revision pass

Start with Contents → 101 Dalmatians → one entry → Return to index; then compare Guide Notes and Synthesis. Review the same flow on a narrow window. Answer Q01–Q06 first if useful, using the actual controls as the discussion reference. The remaining questions can be resolved as the relevant page families are refined.

## Interaction stability fix — 2026-09-23

Reproduced a 21.7px vertical jump at a 1002px viewport when changing from the short Synthesis help text to the longer Heartless description. The header's intrinsic grid sizing allowed help text to squeeze the tool column, wrap its links and increase header height. The context column now uses `minmax(0, 1fr)` with a zero minimum on its container; desktop tools reserve their natural width with `max-content`. Help still truncates within its allocated space.

Browser geometry checks passed for all seven contents items at 390, 800, 1002 and 1265px widths, using keyboard focus to exercise the same contextual-help updates as mouse entry. Header, tools, book and rows retained identical document positions and dimensions. Dalmatian entry focus and an acquired checkbox toggle also retained their geometry; the temporary check was restored. Hover/focus styles remain background/color/outline and absolutely positioned cursor art only. Interaction stability is now an explicit requirement in the UI plan.

## Synthesis facing-page revision — 2026-09-23

Replaced the full-width legacy synthesis workspace with a dedicated journal spread shared by Recipes, Materials and Farming Plan. A seven-row index and filters occupy the left leaf; the selected record and stock/crafting controls occupy the right. Ingredient links retain the spread and select the matching material page, including existing `entry` deep links. Long desktop notes scroll within the leaf; phones stack both pages. Recipe facts are presented once as ingredients, unlock requirements and output, rather than repeating them across dashboard cards and expanded prose. Shared persistence and farming calculations remain in use.

Verified in the browser: recipe ingredients added to a three-material farming plan; owned quantity updated remaining stock; ingredient deep link selected Spirit Shard on its correct index page; 390px phone layout had no horizontal overflow. Production build passed. Long notes scrolling versus numbered note pages remains an explicit design question.

## No-scroll synthesis leaves — 2026-09-23

Supersedes the prior scrolling-notes choice: reduced index pagination from seven to five entries, removed synthesized emphasis from headings/links, reduced note typography and control spacing, and replaced vertical leaf scrolling with measured CSS-column continuation pages. Page count recomputes for resized leaves, loaded fonts and expanded related details. Keyboard focus on a link/control in another note column selects its page. Phone pages remain stacked; no inner vertical scroller is used.

Verified the compact recipe and long Mythril Shard notes visually, including turning to the continuation text. Checked leaf geometry at desktop, tablet and 390px phone sizes. Production build checked.

## Viewport-height frame — 2026-09-23

Unified all KH1 chapter sizing under the viewport-height shell. Removed content-driven minimum heights from the active frame; header, footer and save status reserve stable space, and the spread takes the remainder. Extended note pagination to entry overviews, entry details and settings. Phone layouts show a single leaf with page selectors instead of stacking both leaves.

Browser measurements at 1280×720 confirmed identical outer frame (1248×624) and book (1071.56×448) for Contents, Synthesis, Dalmatians and a Dalmatian entry, with document height exactly 720px. At 390×844, Contents, Synthesis index and selected detail all retained the same 374×764 frame and 348×560 leaf, with document height exactly 844px.

## Shared adaptive index capacity — 2026-09-23

Extracted Contents-only measurement into a shared hook used by all general journal lists and all three Synthesis indexes. Capacity accounts for filters, controls, actual row sizes and available leaf height. Compact spacing and fixed book geometry remain intact. Synthesis selected-item links take priority over stale page numbers when capacity changes. At 1280×1050, treasures displayed ten rows (32 pages instead of 64) and recipes displayed thirteen rows; both leaves remained free of vertical overflow. Verified treasure next-page navigation.
