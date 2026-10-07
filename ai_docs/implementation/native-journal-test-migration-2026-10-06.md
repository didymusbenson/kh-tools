# Native journal browser-test migration

## Original migration scope (2026-10-06)

The original work was a test-only migration from published master `62643025d81c291a83cbdd5bdbb539893f6ef43a`.
At that migration stage, application behavior, the published site, and the separate typography/geometry branches were unchanged.
That request was to update tests that looked for the old UI before deciding whether to fix exposed product gaps. Subsequent product fixes and the approved deferrals below supersede that historical boundary.

Old inline/card selectors were replaced with native index, reading-page, stock, filter, and treasure controls. At the migration stage, meaningful behavioral contracts remained asserted and missing behavior was left as an ordinary failing assertion, with no skip or expected-failure annotation. Some combined scenarios are split so a missing convenience control cannot prevent independent behavior from being checked.

## Baseline

[Published-master CI](https://github.com/didymusbenson/kh-tools/actions/runs/37342765770): 298 passed, 50 failed, 2 existing skips. The 50 failures are 25 scenarios run on desktop and phone, each initially blocked by obsolete selectors or interactions. Baseline counts are the completed CI results, not a claimed new local baseline run.

## Migrated coverage

The original scenario mapping is recorded below. Integration validation must be reported separately for the final merged commit; historical failures and intentional deferrals are not current pass results.

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

## Approved deferrals (2026-10-07)

The user approved cutting exactly four failing scenario definitions, corresponding to eight desktop/phone executions, and retaining their unmet behavior as intentional TODOs. Only those four definitions were removed; no other scenario or independent assertion was retired, and no skip/expected-failure annotations were added.

| Removed scenario | Deferred work |
| --- | --- |
| `farming-plan.spec.ts`: craftable material information includes its ingredients without leaving the farming plan | [SYN-01: nested ingredient exploration](../design/synthesis-lab-design-session.md#deferred-acceptance-todos) |
| `journal-regressions.spec.ts`: reference category selection survives entry visits and a bare-route revisit | [REF-01: Reference category selection and retention](../design/reference-category-backlog.md#ref-01-category-selection-and-retention) |
| `journal.spec.ts`: synthesis recipe workspace exposes owned, required and remaining quantities | [SYN-02: workspace remaining quantities](../design/synthesis-lab-design-session.md#deferred-acceptance-todos) |
| `materials.spec.ts`: selected materials show direct drop rates and locations without expanding related sources | [SYN-03: direct rate/location summaries](../design/synthesis-lab-design-session.md#deferred-acceptance-todos) |

The four deferred capabilities have not been implemented by this retirement. Active coverage still includes direct recipe-entry arithmetic, stock/catalog persistence, farming targets and source disclosures, Reference world/status filters, material-family grouping and boilerplate checks. The complete nested-crafting scenario was removed, including its first-level ingredient assertions; those are not claimed as retained independent coverage.

Any other failing test remains an unmet contract requiring investigation. The authorization above is narrow and does not permit silently retiring further tests.

## Original 25-scenario assertion mapping

This table records the migration-stage contracts before the 2026-10-07 integration and approved deferrals. Statements below about failing or required behavior describe that historical stage, not present test results. Each original scenario ran in desktop and mobile projects; splitting and later removing scenarios changes the total. Rows 4, 11, 13 and 15 are affected by the explicit deferrals above; other independent coverage remains active.

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
