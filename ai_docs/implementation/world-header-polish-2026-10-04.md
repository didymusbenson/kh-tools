# World headers and companion navigation polish

## What changed

- KH1 long world names wrap inside the same native header, rather than being cut off.
- KH2 phone world plaques give the active world a full-width line above Select World / Collection; redundant world-hub ribbons are removed only where they compete for space.
- DDD world ribbons keep the native magenta treatment with readable titles; the Reports shortcut moves to the utility row only in compact layouts where it would otherwise be covered.
- BBS world breadcrumbs have larger, properly separated targets and room for long names.
- Shared Games / Search / Save controls reserve their own row, with 44px normal-height targets. Tight landscape and farming inserts keep their established compact geometry.
- The remaining KH3/KH0.2 companion directory has a clear back/title/summary hierarchy, explicit count labels, and honest View guide labels for reference-only destinations.
- Search, backups and game switching are now near the top of the companion navigation. The mobile drawer has keyboard containment, Escape/backdrop close, focus restoration and correct tablet-to-desktop behavior.
- Digital treasure views now have a working skip link and no overlapping KH0.2 utility/header row.
- Port Royal preview artwork keeps its native aspect ratio instead of forced stretching/cropping.

## Scope and limits

Journal leaves, content, save identities, existing native artwork, farming layouts and title-screen composition are preserved. The generic KH3/KH0.2 routes are not claimed to be a completed native Gummiphone redesign.

All seven games were inspected at 320×640, 390×844, 768×1024, 1440×1000, 844×390 and a 640×500 zoom-equivalent viewport. Missing-image, keyboard, history, repeated navigation and menu-resize checks passed. This is Chromium desktop/mobile emulation, not physical-device/Safari/VoiceOver certification.

Re:CoM world lists overflow the 390px-high landscape stage, and BBS keeps a 520px minimum in that orientation. Both were reproduced unchanged on the pre-polish baseline; no unrelated journal paging rewrite is included.

## Validation

- 261 application tests passed; 7 pack tests and 2 seed tests passed.
- Production content build, Coppermind check, TypeScript and Vite/PWA build passed.
- 184 affected browser checks passed, including farming, all seven treasure grids, persistence, undo, and offline reopening.
- Final dedicated header/navigation suite: 24/24 passed after final compact-link and long-title fixes.
- The repository has a known broad-suite legacy failure baseline (50 stable failures plus an intermittent Re:CoM check/Remaining race). Compare the final full-suite and exact-head CI results against that baseline; focused passes are not a claim that the legacy suite is green. GitHub Actions retains the exact published commit’s validation result.
