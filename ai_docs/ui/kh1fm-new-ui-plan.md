# KH1FM faithful journal — new UI plan

**Revision:** 0.2 · 2026-09-23  
**Status:** Direction accepted; initial local MVP implemented for revision. Detailed design remains provisional.

[Working MVP report and provisional choices](../implementation/kh1fm-faithful-journal-mvp.md).  
**Decision:** [DEC-020](../07-decision-log.md#dec-020-faithful-game-journals-replace-the-initial-ars-arcanum-ui).  
**Reference workbook:** [KH1FM source images and remaining gaps](references/kh1fm/README.md).

## 1. What is settled

The initial Ars Arcanum UI is scrapped as the design target. The user accepted the standalone journal mockups and requested workable game journals in that direction, starting with KH1. Recreate the actual journals' composition and visual character: this is a replacement of the presentation architecture, not another decorative pass over the existing wiki-like interface.

- KH1FM is the first implementation slice. Other games remain in product scope; this sequencing does not defer their requirements.
- KH1 uses its own journal reference, including the green frame, purple index leaf, pale ruled reading pages, central binding, compact header and Jiminy guidance. Do not copy KH2's Port Royal notebook into KH1.
- KH2FM remains the user's preferred reference for the overall project's clarity. It does not override the explicit request for game-specific journals.
- The research and useful application capabilities remain the foundation. Redesigning the interface does not authorize discarding content or resetting saved progress.
- The initial plan was documentation-only. The user subsequently authorized a working MVP to aid revision; see the implementation report. Mockup acceptance establishes a visual direction, not acceptance of every sample label, invented navigation state, font substitution or temporary implementation shortcut.

### Precedence

This plan and DEC-020 supersede conflicting **presentation** requirements in the former [design direction](jiminys-journal-design-direction.md), previous UI feedback, information architecture and rollout documents. In particular, “do not reproduce the game layout,” generic themed shells, mandatory inline expansion and decorative card-heavy navigation are no longer constraints.

Data correctness, persistent progress, offline use, accessibility, canonical entry links, synthesis/farming calculations and Data Jiminy's factual behavior remain requirements. Placement and visual treatment of those features are being redesigned. Previous UI test success is a regression baseline, not evidence that the new design is complete.

## 2. Reference findings and fidelity boundary

Two additional archived KH HD screenshots were inspected and saved under the reference workbook. They establish a useful distinction missing from the first mockup:

1. **Section index:** an indigo/purple left page with Jiminy and a speech bubble; a ruled right page with a short list, glove selection cursor, compact new markers and header pagination.
2. **Reading spread:** pale ruled pages on both sides of a central binding; continuous entry prose, a compact name and an upper-right character portrait. The header carries the current section and contextual help.

Use those compositions as the first measurable reference targets. The supplied video corroborates the character-reading treatment and shows a model-view mode. Exact top-level contents, Dalmatian grid, Trinity tally and minigame report layouts still need direct visual verification. Their existence and category names are supported by secondary documentation; that does not establish their geometry or all Final Mix states.

The archived screenshots come from a 2013 HD promotional set. Modern English Final Mix is the product baseline, with Steam as the user's game context. Preserve their visual evidence while checking platform-specific button prompts and completion indicators against modern footage. Never silently blend PS2, Re:Chain of Memories, KH2 and KH1HD screens.

### Fidelity targets

- Reproduce proportions, hierarchy, page spacing, green/olive/indigo colors, burgundy Journal label, restrained gold section title, binding, ruled lines, selection and navigation placement.
- Establish type samples from reference images. The prototype's Itim/Chakra Petch and fan KHMenu fonts are approximations, not settled production typography.
- Keep the composition quiet. No oversized introduction, promotional copy, decorative card grid, persistent audit badges or multiple competing progress panels.
- Separate selected, unread/new, acquired and section-complete states. A gold emblem must not falsely imply that the native game journal is complete.
- Artwork belongs in the places the journal uses it. No arbitrary portraits or ornaments added to fill empty space.
- Render real accessible text and controls. Do not flatten the interface into screenshots or copy the mockup's fixed 1120×630 transform-scaled canvas into production.
- Dense app-only tools use the same frame and reading language; do not force quantities or tables onto ruled lines when doing so makes them harder to read.

## 3. Proposed information architecture

**Proposal, pending Q01–Q03:** distinguish the native journal from additional companion tools, with one short index visible at a time. Use a small Journal / Guide Notes switch in the journal header or contents page; its exact label and placement need review. Keep Synthesis directly reachable from the contents without a chain of miscellaneous submenus.

| Destination | Intended content | Native or extension | Design dependency |
|---|---|---|---|
| Journal contents | Native journal section list | Native | Verify order, labels and selected states |
| Chronicles | Existing world context initially; narrative expansion only if requested | Native section, incomplete content scope | Q02: do not mislabel a world checklist as native Chronicles |
| Ansem's Report | Numbered index, acquisition instructions, saved acquisition checks | Native section plus guide annotations | Full report transcription is not assumed |
| Characters | Characters I / II and Heartless navigation | Native | Q02: full biography coverage is currently outside the data contract |
| 101 Dalmatians | Numbered puppy overview, world grouping, location pages | Native plus location guidance | Verify native visual grid; preserve grouped chest acquisition |
| Trinity Marks | Color totals and world/location pages | Native plus location guidance | Verify native tally layout |
| Mini-Games | Record/requirement pages and useful strategies | Native plus guide annotations | Verify native report geometry; Q08 for editable scores |
| Worlds / Collections | Treasures, postcards, torn pages, rewards and all existing collection access | Extension | Make app-defined chest ordering explicit |
| Synthesis | Recipe index, material index, stock, goals, shortfalls and farming plan | Extension | Keep domain calculations intact |
| Equipment / Progression | Weapons, accessories, abilities, magic, summons, starting choices and level tables | Extension | Compact index, focused entry or table |
| Challenges / Gummi / Achievements | Cups, bosses, missions, blueprints, run goals and platform conditions | Extension | Separate goal definitions; no universal 100% claim |
| Search / Data Jiminy / Save tools | Existing discovery, assistance, backup and recovery | App utilities | Q05–Q06 for unobtrusive placement |

No empty or invented “complete” native section ships. First map available canonical data to the design; record missing content explicitly. The full biography/Chronicles question is a scope decision, not permission to add filler or remove useful reference data. Preserve the existing fully spoilerful policy and omission of manual story/ability gates.

## 4. Screen and interaction contracts

### KH1-01 — Contents and section index

Use the verified index spread: Jiminy/context on the left, a short navigation list on the right, current section and page position above. Contents returns from every nested view; a separate escape reaches game selection. Pointer hover and keyboard selection update the help line without navigating. Click, tap or Enter opens the selected destination. Touch opens directly; it must not require hover or a second ambiguous tap.

Paginate a short native-style index where appropriate. Define ordering explicitly and restore the selected row/page on return. App search provides direct access without making users turn through every index page. Avoid a persistent desktop sidebar alongside the book.

### KH1-02 — Entry reading spread

Use two ruled pages for short prose at comfortable wide-screen sizes. Place name, portrait, concise practical answer and acquisition details in a stable reading order. Longer content continues naturally through pages or an intentional reading scroll; never truncate it to match a screenshot. A clear Next/Previous action distinguishes changing entries from continuing one long entry. No forced page-turn gestures or mandatory animation.

For a collectible, expose a labeled acquired checkbox independently of opening the entry. Location, requirements and reward remain available together. Related item, enemy, recipe and area links open the same canonical records used elsewhere. Returning restores the originating index and focus.

A rotating 3D viewer is an observed game feature, not yet a production requirement. Do not show a “full view” prompt that only enlarges an unrelated static portrait or does nothing (Q09).

### KH1-03 — Collection tracking

Dalmatians are the first functional test case: open the numbered collection, inspect one puppy group's world/area/directions, mark its acquisition, return, reload offline and see the same state. Preserve the existing single acquisition record for a group of three puppies; multiple numbered slots must not create duplicate checks or inflate totals.

Trinities follow with color totals and individual locations. Treasures, postcards and torn pages reuse the collection interaction without pretending their app indexes are native KH1 journal sections. Preserve existing world membership, acquisition groups and completion denominators. Distinguish “uncollected” from “unread.” Do not add a story-progress meter.

### KH1-04 — Synthesis and farming

A recipe page presents product, unlock condition, ingredients, required/owned amounts and a compact action to add a goal. Material links open sources/farming guidance. Stock, selected goals, remaining requirements, crafted history and farm-plan actions retain their current meanings and undo behavior. No automatic inventory deduction merely because a historical crafted check changes.

Use focused pages for recipe/material detail and a quiet table for aggregate planning. Avoid reintroducing a dashboard full of cards. The current implementation forces inventory enabled in the player store, while older docs describe optional inventory: preserve current behavior for this UI refactor and resolve that discrepancy explicitly in Q07 before changing product behavior.

### KH1-05 — Search, assistant and utility states

Proposed compact Search action opens a journal-styled result list. Results show enough context to distinguish entries and open directly to their canonical destination. Preserve query, result position and Back behavior. Search remains available offline for installed content.

Data Jiminy remains game-scoped, factual and temporary in memory, with the existing disclaimer and canonical in-app citations. The decorative Jiminy on an index page is not automatically a chat button. A labeled assistant action must be discoverable and must not cover the reading page or completion controls.

Place backup/export, import/recovery, update status and settings in a compact utility destination. Important save failures remain visible with recovery actions even though routine technical clutter is removed. Empty results, missing media, unknown entries, loading, offline availability and storage errors must all have explicit states.

## 5. Responsive and accessible adaptation

Desktop/tablet landscape should preserve the recognizable spread. On narrow phones, propose one readable page with compact header, section index and Next/Previous controls. Preserve the journal colors, ruled page treatment and hierarchy rather than shrinking the entire desktop screenshot. The single-page phone composition needs its own user review (Q04).

- Minimum 16px body text as the initial implementation baseline; tune against the user's earlier request for readable type.
- Comfortable 44px touch targets, usable keyboard focus, semantic headings/links/checkboxes, labeled pagination and screen-reader status updates.
- Real text reflow at 200% zoom; ruled backgrounds follow text rhythm or simplify rather than crossing wrapped text.
- DOM order follows reading order across both desktop leaves and the phone page.
- Reduced-motion mode removes decorative transitions; no sound required for feedback.
- Standard Tab/Enter/Space and browser Back work. Optional arrow-key list navigation never traps focus or hijacks text inputs.
- Small-screen search, assistant and stock editing remain usable with the software keyboard and safe areas.
- Current initial targets: desktop Chrome and iPhone 17. Test layouts automatically; report physical-device checks separately when available.

## 6. Refactor boundary and migration

Code inspection on 2026-09-22 found KH1's presentation and routing concentrated in `src/App.tsx`, with `styles.css` and `ui-polish.css`. Other games render through `GuideLoader` / `GuideJournal`. This is a KH1-first replacement, not a rewrite of every game's data pipeline.

| Preserve / reuse | Replace or extract |
|---|---|
| `data/kh1fm/*`, generated `public/data/kh1fm.json`, canonical IDs and provenance | KH1 shell and crowded navigation composition in `src/App.tsx` |
| `src/state/playerStore.ts`, `usePlayerState.ts`, progress and planner calculations | World/catalogue/entry presentation and inline-expansion assumptions |
| Existing IndexedDB `ars-arcanum-player` / `profiles`, `kh1fm-current` and recovery record | KH1-specific layout, theme and page components; scope styles to avoid other-game regressions |
| Jiminy runtime/retrieval/session boundaries, PWA installation/cache behavior | Assistant launcher placement after Q06; retain assistant behavior |
| Canonical entry resolution and cross-links | Route-to-journal-page adapter and compatibility handling |

Proposed component boundaries: `Kh1JournalShell`, `JournalHeader`, `JournalIndex`, `JournalReadingPage`, `CollectionPage`, `SynthesisPage` and `JournalUtilities`. Names and file placement are implementation proposals, not a new framework requirement. Keep shared business logic separate from game-specific visual compositions.

Route migration must handle existing `#/kh1fm/worlds[/<world>]`, catalogue routes, synthesis recipe/material paths, `reference`, `progress`, `search`, `entry/<id>` and `?entry=<id>` links. Inspect and replace the current contents-to-worlds redirect when contents becomes a real journal index. Preserve old external links and stored last-route values through aliases/adapters; do not silently send every deep link to the cover.

Do not rename content IDs, clear browser storage or change backup formats as a side effect of the UI. If a necessary schema change emerges, design and test a versioned migration using existing backups first. Keep new view-only selection/page state separate from collectible state.

## 7. Work sequence and review points

| Step | Deliverable | Exit condition |
|---|---|---|
| 1. Reference and decision pass | Verified screen inventory; Q01–Q04 decisions; initial typography/assets | Unknown native screens remain flagged; no cross-game guessing |
| 2. Production shell slice | KH1 contents/index + one real entry in React, wide and phone layouts | Side-by-side reference review; readable native controls; no mockup transform canvas |
| 3. First working collection | Dalmatians end to end, then Trinities | One saved acquisition across every view; offline reload/undo/backup checks pass |
| 4. Complete content mapping | Worlds, remaining collections, equipment/progression, reports, challenges, Gummi and achievements | Every current route/category remains reachable; no orphaned data |
| 5. Tools and utilities | Synthesis/farming, search, Data Jiminy, storage/update feedback | Existing domain behavior preserved; Q05–Q09 resolved where needed |
| 6. Cutover | KH1 uses new journal; obsolete KH1 presentation removed | Visual acceptance + regression checks; other game views unaffected |
| 7. Next game planning | KH2FM plan based on its own references | Reuse state/accessibility primitives; do not force the KH1 layout on every game |

These are work/review slices, not separate release-scope reductions. During the revision cycle, update this document rather than stacking conflicting mini-specs. Each decision should close a numbered question and identify the changed requirement.

### Acceptance checks

- Compare wide-screen index and reading pages against the two saved references and supplied video. Record deliberate deviations (font, phone reflow, extra guide controls).
- No old wiki/card/sidebar layout survives under a new texture. No empty slots, placeholder navigation or decorative unsupported actions.
- Every existing KH1 content category is reachable; complete instructions and numerical values remain intact.
- Open → check → Back → search → reopen presents one consistent acquired state. Puppy grouping and unrelated completion goals retain their correct counting units.
- Recipe/material/farming calculations and saved state match baseline fixtures before and after the presentation change.
- Existing hashes, `?entry=` links, browser Back/Forward, resume and canonical Jiminy links reach the correct entry with usable focus.
- Reload and use installed content offline; validate save errors, undo, export/import, recovery and update behavior.
- Inspect phone, desktop, keyboard, zoom and reduced-motion states. Do not claim physical-device or user visual acceptance from automated checks.

## 8. Open questions for revision

Reply with question IDs or edit the Answer fields. Recommendations below are proposals, not accepted requirements. “Before” identifies the dependent design task; unanswered questions do not block unrelated work.

| ID | Question / design clarification | Recommended starting point | Needed before | Answer |
|---|---|---|---|---|
| Q01 | Should KH1 reproduce the native contents list first, with companion tools on a separate Guide Notes page, or use one expanded native-looking index? | Native journal + a compact Guide Notes destination; Synthesis stays directly accessible | Contents implementation | Open |
| Q02 | Does “workable journal” now include complete Chronicles, character biographies and report reading text, or retain the established completion-companion content scope? | Keep current facts/scope while designing those native page families; treat full narrative coverage as an explicit addition | Native section content/denominators | Open |
| Q03 | On collection pages, should opening a row replace the reading page, or retain a short index beside detail? | Focused page; return to the same index selection. Retire mandatory expand-all rows | First collection slice | Open |
| Q04 | Is a single reflowing journal leaf on portrait phones acceptable? | Yes; faithful spread on wide screens, readable single page on phones | Responsive shell acceptance | Open |
| Q05 | Where should search and save/settings utilities live? | Small labeled header/contents actions; avoid permanent toolbars around the book | Utility navigation | Open |
| Q06 | Should Data Jiminy use the native Jiminy/help area or retain a separate launcher? | Explicit Ask Jiminy action near that area; no duplicate floating character covering the page | Assistant placement | Open |
| Q07 | Keep currently always-enabled synthesis inventory, or restore the older optional inventory behavior? | Preserve current behavior during UI refactor; handle a behavior change separately | Synthesis controls | Open |
| Q08 | Should native-style “new” markers track app unread entries, and should minigame pages accept personal score entry? | Acquired checks only until defined; no fake new flags or player scores | State indicators / records | Open |
| Q09 | Is the character full-view/rotation interaction required? | Static portrait/detail initially; no nonfunctional console prompt | Character detail scope | Open |
| Q10 | Should the global game-selection screen also change in this direction? | Plan it after the KH1 interior; do not treat earlier home-screen art direction as reapproved | Shared cover redesign | Open |
| Q11 | How close should the final body font and page texture be before acceptance? | Closest legible usable font with side-by-side samples; exact texture/font remains an explicit fidelity gap | Visual sign-off | Open |

## 9. Blockers and uncertainties

- **R01 — Partial source coverage:** usable index and character images are now available. Native contents, Dalmatian overview/world toggle, Trinity tally, minigame list, completed-section marks and navigation transitions still lack inspected modern KH1FM references. Needed before claiming faithful reproduction of those specific screens. Continue sourcing; a short user video covering these screens would close the gap if independent research fails.
- **R02 — Native narrative scope:** existing requirements deliberately exclude exhaustive biographies/Chronicles. Q02 determines whether this refactor also expands the content inventory. Do not quietly import the prototype's sample prose.
- **R03 — Exact typography/assets:** the mockup demonstrates direction, not final font fidelity or a complete asset pack. Record source, edition, purpose and reuse terms per production asset. Reference images in `ai_docs` are comparison evidence, not runtime backgrounds.
- **R04 — Old docs versus current stock behavior:** Q07 records the concrete inventory discrepancy found in code. Do not use a visual redesign to silently reverse behavior.
- **R05 — Phone adaptation:** the prototype scales a console-sized canvas. That is not evidence of production mobile usability; an actual reflowed page needs review.

No blocker prevents drafting the plan or implementing an isolated shell against the verified reference screens. Resolve each gap at the work slice it affects; record decisions and remaining uncertainty rather than claiming full fidelity prematurely.

## Revision log

- **0.1 — 2026-09-22:** accepted direction recorded; old UI target superseded; two additional source images inspected; KH1 screen/content mapping, refactor sequence, migration guarantees and revision questions drafted. No application code changed.

- **0.2 — 2026-09-23:** user authorized and received an initial local MVP; provisional choices and executed checks are recorded in the linked implementation report. Open question answers remain open pending review.

### Interaction stability (revision feedback, 2026-09-23)

Hover, keyboard focus, selected, active and checked states must preserve control positions and dimensions. Use color, backgrounds, outlines and out-of-flow cursor art for feedback; do not change padding, border thickness, font metrics or transforms between states. Contextual help must fit within its allocated header column without changing the header, tool navigation or journal page geometry. Verify short and long descriptions around responsive breakpoints as well as collection checks. Navigating to different content or explicitly expanding content may change the page layout.

### Synthesis must remain a journal (revision feedback, 2026-09-23)

The lack of a direct native journal counterpart does not permit a separate dashboard aesthetic. Recipes, Materials and Farming Plan use the same facing paper leaves, central binding, typography and ruled selection rows. The left page holds chapter navigation, filters and a paginated index; the right page shows one selected recipe or material with its relevant controls. Long notes use numbered continuation pages; the desktop leaves must not scroll. Phone layouts stack the pages. Hover, focus and selection preserve the book geometry.

Implemented in this revision: recipe search/set/uncrafted filters, crafted checks, ingredient stock comparisons and material links, editable owned stock, additive recipe/material farming targets, target/remaining counts and removal. Resolved 2026-09-23: use numbered continuation pages for long notes. Reduce type size/weight and spacing before adding pages; never hide overflowing content or introduce a scrolling book leaf.

### Compact synthesis pages — 2026-09-23

Keep the approved left-index/right-detail composition. Synthesis now shows five index entries per page, with regular-weight labels, 16–17px note text and tighter controls. Notes flow into numbered continuation pages sized to the available leaf, with previous/next controls. The desktop book keeps a bounded height without leaf scrollbars. Narrow phone layouts retain stacked leaves and ordinary document navigation, with the notes themselves paginated.

### Viewport-height journal frame — 2026-09-23

The screen height owns the journal geometry, rather than the current chapter's content. Use a 100dvh application shell with reserved outer navigation, header, footer and save-status rows; the book fills the remaining height. Contents, collections, entries and Synthesis must have identical frame and book bounds at a given viewport. Long entry/overview/tool content uses continuation pages. Record lists show five entries; simple contents/world indexes retain seven.

On phones, show one leaf at a time with Index/Details or Overview/Notes selectors in a reserved row. This supersedes the earlier stacked-phone-leaves design and keeps navigation from changing the book size. Selecting a synthesis record opens Details.

### Compact index rhythm — 2026-09-23

The viewport-sized book must not stretch index rows to fill its height. Use content-sized rows with compact padding (44px minimum for simple links; 58px for records with a world subtitle). Extra room remains below the list, with page controls at the bottom. Hover/focus/checked states retain identical spacing.

### Equal facing content pages — 2026-09-23

Open-book views with content on both sides (entry overview/notes and all Synthesis spreads) use equal-width leaves, a binding at exactly 50%, and mirrored inner/outer margins. The art-and-index contents layout retains its distinct composition. Single-leaf phone navigation is unchanged.

### Flatten Guide Notes — 2026-09-23

Removed the Guide Notes submenu. Worlds, Treasures & Postcards, Torn Pages, Magic, Equipment & Abilities, Challenges & Gummi, Steam Achievements and All Reference Entries are now direct chapters in the main Contents index, alongside the existing journal chapters. The fourteen chapters use two seven-row contents pages. The footer links to Contents; saved `/kh1fm/notes` links redirect to the second Contents page.

### Contents uses available space — 2026-09-23

Supersedes the fixed two-page contents decision: calculate the number of compact rows that fit in the current leaf. Show all fourteen chapters on one page when space permits; paginate only when the screen cannot fit them. Old Guide Notes links now redirect to Contents without a forced page number.

### All indexes use available page space — 2026-09-23

Apply adaptive row capacity to every journal index, not just Contents: worlds, collectibles, reference categories, search results, recipes, materials and farming targets. Measure the available list height after filters and page controls, then fit compact rows using their rendered height. Recalculate for viewport changes, font loading and wrapped labels. Keep the largest observed row height within a layout to prevent pagination oscillation. Supersedes the fixed five/seven-entry limits above.
