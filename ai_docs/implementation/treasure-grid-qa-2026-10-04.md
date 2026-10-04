# Treasure-grid interaction QA · 2026-10-04

## Result

**60/60 focused browser cases passed against the final production build with offline checks enabled**, at 03:35 UTC on 2026-10-04. Playwright reported a 1.1-minute run. This is 30 tests across desktop Chromium and the configured iPhone 13 Chromium project.

The suite is `tests/e2e/treasure-grids.spec.ts`. It exercises all seven adapters through their real journal shells and IndexedDB stores. Additional viewport checks cover 320×568, 1440×900 and 844×390. Existing legacy tests were not weakened or edited.

## Verified behavior

- **Stable identity and position:** selecting a square never collects it. Remaining keeps the visible slot sequence, numbers and pixel positions after marking; full-scoped denominators stay fixed. Mark, unmark, Undo and reload preserve the selected acquisition ID.
- **Navigation:** original ID-based entry links resolve to the same record. Grid/Notes navigation, browser Back/Forward, selected-square return focus and responsive page anchoring pass for every game.
- **Narrow layouts:** square and checkbox-label targets and fixed board controls meet the 44×44 px bound. At 320×568, controls stay in the board both before and after marking, including Undo. Every compact filter control remains reachable and passes hit-testing without outer-page scrolling.
- **Character/story separation:** KH2 Sora 301/Roxas 16; BBS Terra 122/Ventus 130/Aqua 122/Secret Episode 8; DDD Sora 225/Riku 213; KH3 base 245/Re Mind 9. Native BBS header pills and DDD character selection restore each character's prior world, selected ID and independent checks, including after reload.
- **Concurrent state:** another tab receives collection changes in all seven games. Undo preserves newer unrelated checks and rejects a stale same-ID reversal without claiming success.
- **Storage errors:** injected IndexedDB quota failures in both the guide store and KH1 store keep the saved acquisition unchecked and produce a retryable failure announcement, never a successful collection announcement.
- **CoM:** finite reward claims and card discovery use separate checks. Riku receives no fabricated reward board.
- **KH0.2:** Zodiac filtering retains the original chest ID and physical position.
- **KH1:** the postcard list, acquisition notes and original check control remain reachable, including the existing narrow-screen Overview tab.
- **Search:** zero matches leave canonical slots and the denominator intact.
- **Keyboard:** Space selects a square without saving; the separately focused checkbox marks it. The checks run with reduced motion.
- **KH3:** the grouped overview opens canonical world boards and keeps Re Mind separate.
- **Reading:** short-landscape reflow leaves controls and numbered note continuations reachable. Marking and Undo preserve the current notes continuation page.
- **Offline:** after production service-worker installation, all seven games reopen and fully reload with networking disabled, retaining saved checks and selected IDs.

Persistence assertions read the appropriate actual saved profile: `ars-arcanum-player` for KH1 and `ars-arcanum-guides` for the other games. They never infer identity from a display index. Off-page note continuations are deliberately paginated and are not incorrectly treated as current-page clipping.

## Issues found and corrected during QA

The final passing run includes regression assertions for these fixes:

1. Legacy path-based entry → Grid links initially dropped the selected ID. Canonical links now retain it.
2. Mobile Notes links initially measured 40×44 px. They now reserve at least 44 px width.
3. Tiny portrait layouts initially clipped Re:CoM's preview and several games' save/Undo region. Compact chrome now reserves the complete control area; the marked state is explicitly tested.
4. KH0.2 and KH3 initially produced horizontal overflow at 320 px. The digital shell now uses a bounded grid column and wrapping header text.
5. Native shell focus and hash-navigation timing initially interfered with return-to-grid focus. Focus restoration is coordinated and does not steal intentional checkbox focus.
6. KH1's original non-rejecting `setCheck` path allowed a false collection-success message after a failed write. The grid now uses confirmed transactional writes with failure rejection and expected-value protection.
7. The compact KH0.2 filter panel initially placed its last controls below the viewport. Its position and bounded internal scrolling now keep all controls reachable.
8. Native BBS/DDD character controls initially bypassed board presentation memory. They now restore validated per-character IDs/worlds through the same identity-based route contract.

No unresolved failures remain in this focused suite.

## Reproduce

After a fresh successful production build:

```sh
ARS_TEST_CHROMIUM=/tmp/chromium ARS_TEST_OFFLINE=1 \
  npx playwright test tests/e2e/treasure-grids.spec.ts --reporter=line
```

The Playwright configuration starts/reuses the production preview on port 4173. `ARS_TEST_CHROMIUM` is an environment-specific executable override, not a product requirement. The offline test is intentionally gated by `ARS_TEST_OFFLINE=1`; development-server runs must not be presented as offline verification.

For development-only iteration, start Vite and Playwright in the same shell/process environment and omit the offline test. Do not rebuild `dist` during a production test run: changing the asset set invalidates that run.

## Verification boundary

- The final run covers **60/60 focused cases**, with zero skips or failures.
- `git diff --check` for the owned QA files passed.
- The full preexisting E2E suite is **tracked separately from this focused QA run**. Older treasure-list selectors may require deliberate migration; they were not silently changed to make this suite pass.
- Mapping, catalogue identity, backup-roundtrip and excluded/tutorial-record checks are covered separately by `tests/treasure-mapping.test.ts` and the implementation's domain tests.
- Responsive browser checks establish interaction and layout behavior; they do not certify unsupported native journal-slot order or exact native artwork. The per-game evidence limits remain in the checked-in crosswalk documents.
