# Full-viewport journals — 2026-10-05

Requested for all seven games: Ars Arcanum is the game interface, without a detached website frame consuming journal space. Baseline: `8ed575c7caf6eac13577e09d22264a63ef6a1758`.

## Implementation

- Native KH1/KH2/Re:CoM/BBS/DDD volumes fill the dynamic viewport. Book leaf ratios, bindings, original navigation, and adaptive page capacity remain unchanged. There is no CSS scaling/transform of the book or artwork.
- Companion controls live in an in-footer **Tools** disclosure. **Ars Arcanum home** returns to the game picker. Search/settings remain available, including existing KH1 header tools. DDD character filtering and CoM companion links remain available inside Tools, including narrow treasure pages.
- Save status is a compact live region inside the existing native footer, with no separate reserved row. Treasure boards keep their own confirmed-save/Undo region instead of a duplicate global status line.
- Update/error notices share a bounded, scrollable in-interface overlay. They do not add unexpected flex/grid rows or reduce book height.
- KH3/0.2 treasure interfaces integrate utilities into the footer. Other guide pages use internal sticky paper toolbar/side navigation, without exterior padding/header. The sidebar's old header-height cap is removed.
- Safe-area insets are owned by the active interface. Short BBS home/contents screens scroll within the reading stage, keeping lower links reachable without expanding the overall screen.
- Tools supports keyboard traversal, Escape with focus restoration, outside-click dismissal and route-link dismissal. No menu role or focus trap is imposed on an ordinary disclosure.
- Player storage schemas, canonical data, route IDs, offline content, and game-specific visual themes are unchanged.

## Measured space reclaimed

Same routes, default font rendering, fresh browser contexts at 1440×900. Values are the reading panel's CSS pixel height, not screenshot scaling:

| Game / route | Before | After | Gain |
| --- | ---: | ---: | ---: |
| KH1 Ansem reports | 608 | 726 | 118 |
| KH2 contents | 598 | 708 | 110 |
| Re:CoM contents | 578 | 720 | 142 |
| BBS contents stage | 648 | 740 | 92 |
| DDD contents | 647 | 713 | 66 |
| KH3 treasures | 744 | 780 | 36 |
| KH0.2 treasures | 744 | 780 | 36 |

At 390×844, the same seven panels gained 102, 87, 128, 74, 109, 36 and 36 pixels respectively. Larger source artwork is contained, not stretched. Full-width native backgrounds replace the old dark side gutters; native book insets and leaf ratios remain authoritative.

## Verification

- `npm test`: 261 tests passed, 25 files.
- `npm run build`: canonical content generation/validation, Coppermind check, TypeScript, Vite and PWA build passed.
- Python Coppermind pack tests: 7 passed. Seed isolation/idempotence tests: 2 passed using the pinned Chroma dependency.
- Before/after browser captures: all seven games, KH3/0.2 generic-guide paths, desktop1440×900, tablet768×1024, phone390×844 and landscape844×390. No document horizontal overflow in the 36-screen matrix.
- New `full-viewport.spec.ts`: 48/48 production tests passed, including initial DDD route focus and editor-focus preservation during resize. Covers six viewport sizes including320×568 and640×360, fullscreen geometry, internal controls, keyboard/home/history, saved treasure reload, stacked notices, narrow CoM tools, and BBS lower-link reachability.
- Existing header chrome expectations are updated to the new internal disclosure; relocated DDD filter and Home tests open Tools first.
- Independent source/browser review completed with no remaining blocker after fixing narrow CoM companion links, BBS short-height reachability, the sidebar height cap and DDD farming focus. The final six DDD/character/persistence regression cases passed in both browser projects. The initial broader 152-case farming/treasure/header run passed136, skipped2, and failed14. Six failures exposed relocated-control expectations or the DDD focus issue and were corrected/rechecked; all eight remaining failures were reproduced on the untouched baseline and are unchanged legacy `farming-plan.spec.ts` selectors. The final release viewport/header run passed72/72 (48 new full-viewport tests and24 header/navigation tests).

Before/after screenshots are delivered separately through Library rather than adding screenshot binaries to the application source. Testing uses cloud Chromium desktop/mobile emulation; physical iOS safe-area/browser-chrome acceptance is not claimed. The repository has known pre-existing full-browser-suite failures; focused passing coverage is not a claim that its entire legacy suite is green.

## Follow-up correction: save feedback shares navigation

The screenshot following the first deployment showed that the save message still appeared on a separate light strip below Back. Moving that strip inside the volume was insufficient. The correction moves routine feedback into the actual existing native footer and removes its layout track entirely. KH1 Undo is available in Tools; activation closes the disclosure and restores keyboard focus. Urgent notices remain in the bounded overlay. Full status text is announced and available as a tooltip; routine success reads “Saved” visually.

All seven games were audited. KH3/0.2 already kept routine status in their digital footer or guide sidebar, so no extra status row existed there. The five native journals regain another28px of desktop book height; at390×844 KH1/KH2 regain24/23px after ensuring the complete Tools target fits, and CoM/BBS/DDD regain28px. Desktop measurements above include this correction.

Regressions explicitly require status to be a footer child, forbid a standalone status sibling below navigation, require the footer to reach the viewport edge, and check the complete Tools target plus keyboard Undo focus. DDD’s one-book geometry again matches across ordinary and treasure pages. Four CoM test expectations were updated to open the relocated Tools disclosure.

First deployment `fa00e0807d64` had a successful Pages pipeline; its separate full CI run reported290 passed,56 failed,2 skipped. Six failures were the DDD status-row geometry and old CoM utility-location expectations addressed here, beyond the50 known legacy failures. The correction's combined116-case production run passed115; the sole failure was the previously recorded intermittent Re:CoM checkbox-removal race (`check()` waits after the remaining-filter row disappears). All74 viewport/header cases and all six change-related CI failures passed. Unit tests again passed261/261, and the complete production build passed. No claim is made that the whole legacy browser suite is green.
