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

## Follow-up: supplied KH2 captures and fuller Re:CoM review

The user supplied three in-game KH2 screenshots after the initial pass. They are preserved byte-for-byte with capture caveats, hashes and component findings in `ai_docs/ui/references/kh2fm/typography-review-2026-10-05.md`. These now support KHGummi on `.kh2-watermark`. The green world-cover Summary panel also clearly uses upright UI text, so only `.kh2-cover .kh2-world-summary .kh1-note-flow` reuses the existing KH2Menu substitute. Cream paper and other menu/body aliases remain unchanged.

The closer Re:CoM review corrects the initial overly narrow banner assessment: `sora-journal-root-0010.png` shows JOURNAL and `riku-root-0002.png` shows D REPORT in the same slanted display role. The current companion wordmark can therefore adopt KHGummi while retaining its own existing wording. Its much longer wording needs a narrowly scoped size adjustment (`clamp(10px, 1.25vw, 15px)`) to keep the original grid and adjacent controls usable. The font is already heavy/slanted, so no synthetic bold/italic is applied. The decorative wordmark remains aria-hidden.

Actual Re:CoM font comparisons are recorded in `ai_docs/ui/references/recom/font-comparison-2026-10-05.png`. Upright root navigation and red ribbons retain Chakra: KHMenu is wider/heavier and its italic variants are unsupported; Aldrich widens Card Collection about 15% without a sufficiently clear accuracy gain. Coda/Titillium lose the distinctive squared forms. Paper text remains separate. KH3/0.2 remain unchanged because no corresponding evidenced component justifies an additional substitution here.

Follow-up validation: all 261 application tests and the production/TypeScript/content/pack/PWA build pass. The expanded font suite passed 34 desktop/mobile cases, including KH2's preserved paper face, its corrected Summary role and seven CoM widths. The first checkpoint's full CI completed with 315 browser passes, the exact 50 existing baseline failures, one previously identified unchanged Re:CoM remaining-filter check-and-hide race, and two skips. That is not a full-green CI claim. No unrelated behavior or legacy test was repaired as part of this typography work.

An independent tablet review found that KH2's wider watermark could overlap long Synthesis breadcrumbs just above the 650px stacked-phone breakpoint. The correction changes only the watermark's font size above that breakpoint (`clamp(14px, calc(2.5vw - 11px), 24px)`), retaining the existing phone size and desktop maximum. Explicit breadcrumb-overlap tests now cover bestiary, maps and synthesis recipe/material headings at 320, 650, 651, 768, 1000 and 1440px. The separate all-game frame/CoM/world-chrome regression pass completed with 96 passes; the known unrelated CoM check-and-hide race was explicitly excluded from that focused pass.

The watermark remains approximately its former width through 1000px and grows only on wider desktop screens. Long Gummi/Prologue breadcrumbs also receive non-regression coverage: their pre-existing 651px overlap is not expanded into previously clear widths. No breadcrumb geometry or wording is changed.
