# Native journal integration — 2026-10-07

## Included work

The release integrates only the completed typography (`88ab0ea`), book geometry (`09244e5`), and native-test/phone/material-family (`b6d33bc`, including `992498d`) branches on published master `6264302`. Existing branches remain preserved. The single append conflict in KH1 CSS retains both the geometry rules and collection/family rules.

- Reference-matched KHGummi display labels remain scoped to KH1/BBS/DDD, KH2 watermark and Re:CoM wordmark. KH2 cover Summary retains its upright menu face; other body/reading faces are unchanged.
- Closed wide-screen covers occupy half of the book stage; two-page spreads have equal leaves; single pages retain outside-left bindings. Phone layouts retain their one-leaf fallback.
- KH1 Postcard access and collection counts remain visible on phones, material families remain complete on a page or internally scrollable, and CoM's disappearing-checkbox test waits on retained behavior rather than a detached control.
- Visual integration review caught a pre-existing BBS short-landscape cover overflow. A narrow `min-width:601px` / `max-height:500px` adjustment constrains its portrait and grid row, retaining the character name and every internally scrollable menu item above the footer. Other cover sizes were pixel-identical in before/after captures.

## Intentional design deferrals

Exactly four scenario definitions / eight desktop-and-phone executions were retired at the user's direction. No skip or expected-failure annotations replace them. Three items remain [synthesis design TODOs](../design/synthesis-lab-design-session.md#deferred-acceptance-todos), and Reference category selection/retention remains in its [separate backlog](../design/reference-category-backlog.md). No deferred capability was implemented.

The [migration record](native-journal-test-migration-2026-10-06.md#approved-deferrals-2026-10-07) identifies the exact removed tests and preserved independent contracts. Its older result counts describe historical checkpoints, not the integrated release.

## Verification and release gates

- Application unit suite: 261 tests across 25 files passed.
- Python Coppermind pack and seed suites: 7 + 2 tests passed using the pinned Chroma requirements.
- Production content, pack, TypeScript, Vite and service-worker build passed.
- Typography and geometry together passed the original 74 focused browser cases. Four additional BBS viewport scenarios add eight desktop/phone executions; the final focused rerun passed all 82 typography/geometry cases.
- Independent visual review inspected 55 screens across 1440×900, 768×1024, 390×844, 320×568 and 844×390, with extra BBS checks at 640×360, 1101×390 and 1440×390. It covered the native covers/bindings, title fit, Postcard count persistence and complete Frost family scrolling.
- Test inventory is 454 executions: prior phone branch 380, typography/geometry 74, approved deferrals −8, and BBS landscape regression +8. The two pre-existing heavy-model opt-in skips remain; no new skips were introduced.
- Keyboard test initialization waits for saved-state readiness and the journal’s initial reading-region focus before moving focus to a record and pressing Enter. Controlled delayed-frame reproduction confirmed that the initial route effect could otherwise reclaim focus between those two actions. The keyboard navigation, return-focus, acquired-state and reload assertions remain intact; production behavior is unchanged. The stabilized scenario passed 30 repeated runs (15 desktop and 15 phone).
- An initial local aggregate run was interrupted after a concurrent build temporarily removed served assets (trace-confirmed HTTP404s). Those infrastructure failures were not used to justify test changes. The final aggregate runs use a stable build and isolated result directories.

Publication requires the full browser CI for the exact integration commit, followed by the default-branch Pages workflow and live asset/update verification. [Validation history](https://github.com/didymusbenson/kh-tools/actions/workflows/ci.yml) and [Pages deployment history](https://github.com/didymusbenson/kh-tools/actions/workflows/pages.yml) are the authoritative per-commit outcomes. Focused passes alone do not establish a full-suite pass or deployment. Physical iOS/Safari acceptance is not claimed.
