# KH2FM faithful-journal MVP

Local implementation pass, 2026-09-24. Based on the [new UI plan](../ui/kh2fm-new-ui-plan.md), the user's video and accepted KH2 mockup. This is ready for visual revision, not final fidelity or release certification.

## Implemented

`Kh2Journal` replaces KH2's generic guide interior with green journal framing, burgundy navigation ribbons, cream facing pages and burgundy world covers. The existing GuideJournal controller still owns profile loading, transactional updates, cross-tab updates, import/export and recovery. No saved-data schema or canonical ID changes were introduced.

Worlds, Collection, every existing category, global search and all three synthesis destinations use the same viewport-height journal. Synthesis keeps ingredient links, Crafted checks, optional owned quantities, additive farming targets, remaining quantities and material source notes. Material and record indexes retain world filtering. Long notes and backup content use continuation pages. World totals count only the 445 treasure/puzzle acquisition records; aliases and challenge goals do not inflate them.

Compact rows use the shared measured-capacity hook; facing leaves have equal widths. Help and selection occupy reserved space. Phones use one leaf with explicit page controls. A phone QA finding where recipe-action text widened the outer grid was corrected by constraining the grid/volume width and allowing the action label to wrap.

## Validation

- Existing suite: 76 tests across 9 files passed; production build passed, including content validation and Coppermind checks.
- Browser: Port Royal cover, filtered treasures, Collection, recipes, ingredient-to-material links, owned stock and farming-plan add/remove. Searching for Naval Map returned the existing Port Royal / Rampart acquisition and its saved unchecked state.
- Changed a treasure check and material stock/target temporarily, verified reflected state, then restored those test values. Cleared stock was verified as unknown after a reload.
- At 1280×720, frame and book stayed within a 720px document. Facing leaves measured 523.32px each; neither leaf vertically overflowed.
- At 390×844, the world index, cover overview and recipe notes fit the 390×844 document with a stable 352×573px book. Index and notes remain separate selectable leaves.
- At 1280×1050, the recipe index increased to nine compact rows, with equal 523.32px leaves and no document overflow.

- Contextual-help focus changed the footer text while book dimensions, index height and leaf dimensions remained identical.
- At 1280×1050, Treasures also showed nine compact rows. At 1280×720, Save & Settings retained the same book bounds; all backup controls were visible on notes page 4.

Existing suite coverage is a regression check; this pass does not claim a fresh offline install, every backup recovery path, every catalog entry or a complete game playthrough was tested.

## Provisional items

Port Royal uses the approved artwork/logo; other world covers use a written title and crown pending matching assets. Typography remains the accepted study's approximation. Native Treasure/Pieces grids, full story/character/album/map content and certified official Journal completion are not claimed. Broader KH2 catalog and Data Jiminy gaps remain tracked in their existing specs. Open design questions are listed in the UI plan for the next user revision.
