# KH1 synthesis: short-landscape reading space

## Problem

An iPhone landscape capture showed only one recipe per index page and an Ingredients heading without ingredient rows on the first note page. Native browser controls leave a shorter content viewport than the nominal phone screen. The outer native frame already fit, but workshop labels, filters, action spacing, and an empty notice consumed most of the inner paper.

## Scope

- Compact synthesis furniture only at widths 651–1000px and heights up to 500px.
- Remove repeated workshop/category captions at that breakpoint; keep tabs, recipe title, filters, craft status, stock guidance, and actions.
- Reclaim empty status spacing and excess margins; reserve the existing status element for announcements.
- Let the index's existing measurement use the actual compact 28px recipe row floor. Normal desktop/portrait rows are still measured at their existing rendered heights.
- Keep the ingredient heading, stock key, and first ingredient together through existing CSS column-break rules.
- Preserve the existing book, note/index pagination, recipe data, and farming calculations. No craft-quantity or material-note redesign.

## Validation

Local application tests: 323 passed. Production build and committed pack verification passed.
Browser acceptance uses the GitHub Actions runner because local Chromium process startup is restricted in this executor. The dedicated synthesis regression spec captures realistic 844×350 and 844×390 content viewports plus portrait/desktop references, checks actual readable content rather than frame fit alone, and exercises ingredient pagination and persisted craft/plan actions. CI retains `kh1-synthesis-*.png` alongside the frame captures.
