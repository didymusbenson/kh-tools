# Native journal browser-test migration

## Scope

Test-only migration from published master `62643025d81c291a83cbdd5bdbb539893f6ef43a`.
Application behavior, published site, and the separate typography/geometry branches are unchanged.
The request is to update tests that look for the old UI before deciding whether to fix exposed product gaps.

Old inline/card selectors are replaced with native index, reading-page, stock, filter, and treasure controls. Meaningful behavioral contracts remain asserted. Missing behavior is left as an ordinary failing assertion, with no skip or expected-failure annotation. Some combined scenarios are split so a missing convenience control cannot prevent independent behavior from being checked.

## Baseline

[Published-master CI](https://github.com/didymusbenson/kh-tools/actions/runs/37342765770): 298 passed, 50 failed, 2 existing skips. The 50 failures are 25 scenarios run on desktop and phone, each initially blocked by obsolete selectors or interactions. Baseline counts are the completed CI results, not a claimed new local baseline run.

## Migrated coverage

A complete scenario mapping and final validation results will be added when the final run completes.

### Media (three original scenarios)

- Empty-media entries still have no gallery and retain instructions.
- Image/map metadata, zoom, initial close-button focus, Escape focus restoration, annotations and horizontal fit are retained. Targets must be geometrically inside the selected notes page before interaction.
- Aborted optional image requests still show fallback while retaining instructions; the gallery page is visited to trigger its lazy request.
- Screenshots use each test's own output directory.

### Keyboard and Jiminy (one original scenario)

- Skip link uses its current name and `#kh1-reading` target; URL stability and keyboard focus remain asserted.
- Header-integrated Jiminy replaces the floating-launcher geometry. Its rectangle must stay inside the viewport and above the reading area.
- The original minimum 44px width/height contract remains. Height uses a soft assertion so dialog opening, Escape, and restored focus still execute when desktop height fails.

### CoM race (additional reliability correction)

- The Remaining-filter completion uses one click rather than `check()`: completion removes the checkbox, making `check()`'s post-click checked-state lookup race with intentional removal.
- Row removal, unchanged entry navigation, increased total, save feedback, reload persistence, retained Remaining filter and checked state after returning to All are all asserted.
- Six repetitions on each viewport passed (12/12) in the focused verification.

## Decisions still required

An ordinary failing test here is evidence of an unmet contract, not authorization to change the app or to retire that contract. Final results distinguish restored test coverage from unresolved behavior.

## Original 25-scenario assertion mapping

Each original scenario was run in desktop and mobile projects. Splits below retain independent guarantees; counts therefore cannot be compared as if the total number of scenarios were unchanged.

| # | Original scenario | Native test journey and retained guarantee |
| --- | --- | --- |
| 1 | Shared recipe ingredients | Material spinbutton + recipe actions; owned 8, combined target 3, reload 3, repeated add 5, no deduction or obsolete craft-quantity controls. |
| 2 | Unknown/partial/surplus farming stock | Native target group; blank versus numeric ownership, remaining arithmetic, target stability, reload, source rate/location in same plan, zero target removal. |
| 3 | Remove farming target | Native Remove control; target disappears while owned inventory remains 3. |
| 4 | Nested crafting information in plan | Dark Matter World route source retains first-level ingredients, one target and plan URL; nested Mythril disclosure remains a failing in-plan contract. |
| 5 | Keyboard inline collection entry | Keyboard index entry, focused reading page, keyboard check, return focus, acquired state and reload. Focused pages replace obsolete inline/bulk expansion mechanics. |
| 6 | Single-column collection rows | Every native page is traversed; exact expected reachable record set, shared row alignment, vertical ordering and viewport fit. |
| 7 | Legacy links with remaining filter | Checked item disappears from filtered index but both historical and explicit filtered deep links show readable notes and acquired state, including reload. |
| 8 | Completed entries remain readable | Explicit Remaining/All filtering, uncheck/recheck, readable focused notes after checking, then omission upon returning to Remaining index. |
| 9 | Completed counts under Remaining | Numerator/denominator and filtered omission before/after reload; visible completed/total summary remains required on both viewports. |
| 10 | Recipe unknown/surplus/zero stock | Direct recipe entry retains explicit owned/required/remaining labels for unknown, 8 owned and 0 owned; stale surplus label must disappear. |
| 11 | Reference/challenge/synthesis filters | Separate native entry/reload flows run independently; reference Weapons selection and bare-route retention contract stays failing instead of being silently removed. |
| 12 | Journal launch, fit and shared checks | Launch Contents, fit, category check to focused entry and reload, reverse uncheck, no exposed source links/labels or raw record ID. |
| 13 | Synthesis inventory/catalog persistence | Native material stock, crafted state, additive ingredient targets and reload are retained. Direct entry verifies explicit remaining arithmetic; native workspace remaining display has a separate failing contract. |
| 14 | Always-available stock, zero versus unknown | Selected material spinbutton, zero and blank across reload, no obsolete opt-in inventory controls. |
| 15 | Collapsed material source summaries/families | Split direct source-rate/location lines, Frost family grouping, and no generic Lucky Strike boilerplate; missing summaries/grouping stay failing. |
| 16 | No empty media gallery | Native notes replace obsolete row fixture; instructions remain and gallery count is zero. |
| 17 | Media captions, zoom, focus and fit | Genuine note-page traversal; platform metadata, image modal, initial focus, 200% zoom, Escape focus restoration, map annotation and no horizontal overflow. |
| 18 | Optional image failure | Reach gallery page to initiate lazy request; aborted image yields fallback while directions remain readable. |
| 19 | KH2 collection persistence/fit | Native treasure board selection, check, saved feedback, focused notes, reload, same record, viewport and native frame guarantees. Other games remain covered. |
| 20 | Workshop targets/sources/isolation | KH2 recipe addition twice, correct doubled target, owned 1, in-plan source disclosure and unchanged URL, reload, empty isolated BBS plan. |
| 21 | Character filters and aliases | Split BBS Terra/Ventus record identity and isolated checks/reload from KH2 Torn Page-to-treasure shared state and reverse uncheck. |
| 22 | World hub navigation | Native World index and exact world-scoped record set across all pages; saved collection route still selects/filter world. |
| 23 | Cross-world collections/achievement separation | Split exact all-world and filtered Trinity sets, usable Postcard shortcut, all Postcard deep-link records, and separate challenge/achievement sets. Phone shortcut remains failing. |
| 24 | Contents/legacy world-entry routes | Real Contents navigation replaces obsolete redirect assumption; old world entry route opens notes and returns to correct focused world record. |
| 25 | Skip link/Jiminy safe region/touch target | Current skip link and reading target, unchanged route, no reading overlap or horizontal clipping, retained 44px target contract, dialog/Escape/restored focus. |
