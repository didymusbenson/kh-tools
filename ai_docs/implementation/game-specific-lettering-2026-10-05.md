# Scoped game display lettering — 2026-10-05

## Decision and evidence

Adopt Televo's KHGummi webfont only for reference-matched display labels:

- KH1: MENU, matching `ai_docs/ui/references/kh1fm/kh-hd-report-index.jpg`.
- Birth by Sleep: REPORTS and command-melding MENU, matching `ai_docs/ui/references/bbsfm/terra-reports-root.png`, the other character Reports roots, and `command-melding-menu.png`.
- Dream Drop Distance: REPORTS, matching the saved `ai_docs/ui/references/dddhd/` Reports screenshots.

Actual reference pixels and font specimens were compared; a second visual review agreed. This is a faithful fan recreation, not an assertion that we extracted the original game font. Source, author, unmodified font hash and upstream public-use terms are recorded in `public/assets/journal-fonts/README.md`. The 17 KB WOFF2 is self-hosted and included in existing service-worker precaching.

The font draws its own slanted, heavy glyphs. The selected labels therefore use normal style/400 weight without synthesized italic/bold. DDD's former extra wordmark skew and synthetic stroke are removed; its separate trailing bar is retained.

## Deliberately unchanged

Shared menu aliases, reading copy, layout, iconography, game data, completion state and native Saved footers are unchanged. BBS's SELECT A CHARACTER, FINAL CHAPTER and serif character names keep their existing faces. Re:CoM's current RE:CHAIN OF MEMORIES wordmark is not the saved MENU label; 0.2's generic companion panels are not its evidenced STORY banner. No font substitution is justified for those components in this pass. KH3's upright small headings and KH2's insufficient preserved source evidence also remain unchanged. Wider KHMenu and other candidates were not applied indiscriminately.

## Validation

Executed: all 261 unit tests pass; production build (including TypeScript/content/pack/PWA) passes; 7 Python pack tests and 2 seed tests pass with the existing Chroma test environment. The 66 typography/full-viewport browser checks pass on desktop and mobile Chromium projects, covering six viewport sizes, computed font selection and synthesis, text bounds, excluded headings/body faces, offline reload, all seven games, tools/navigation and saved progress. Stronger loaded-face assertions pass separately (16 tests), and simulated font-download failure/navigation passes (2 tests). Independent final code and screenshot review found no material issue.

The broader legacy suite is not claimed green: the preceding release had 298 browser passes, 50 known legacy failures and 2 skips. Feature CI and the aggregate rerun must be reviewed separately for new failures; existing unrelated failures are outside this narrow typography task. Physical-device Safari remains untested.
