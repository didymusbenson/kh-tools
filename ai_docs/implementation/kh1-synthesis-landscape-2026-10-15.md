# KH1 synthesis: short-landscape reading space

## Problem

An iPhone landscape capture showed only one recipe per index page and an Ingredients heading without ingredient rows on the first note page. Native browser controls leave a shorter content viewport than the nominal phone screen. The outer native frame already fit, but workshop labels, filters, action spacing, and an empty notice consumed most of the inner paper.

## Scope

- Compact synthesis furniture only at widths 651–1000px and heights up to 500px, or short portrait viewports up to 650×600px.
- Remove the repeated workshop caption at that breakpoint and keep the recipe set caption compact; preserve tabs, recipe title, filters, craft status, stock guidance, and actions.
- Share the index count and pager on one compact footer line, preserving their normal presentation at other sizes.
- Reclaim empty status spacing and excess margins; reserve the existing status element for announcements.
- Let the index's existing measurement use the actual compact 28px recipe row floor. Normal desktop/portrait rows are still measured at their existing rendered heights.
- Keep the ingredient heading, stock key, and first ingredient together through existing CSS column-break rules.
- Preserve the existing book, note/index pagination, recipe data, and farming calculations. No craft-quantity or material-note redesign.

## Validation

Local application tests: 323 passed. Production build and committed pack verification passed.
Browser acceptance uses the GitHub Actions runner because local Chromium process startup is restricted in this executor. The dedicated synthesis regression spec captures realistic 844×350 and 844×390 content viewports plus portrait/desktop references, checks actual readable content rather than frame fit alone, and exercises ingredient pagination and persisted craft/plan actions. CI retains `kh1-synthesis-*.png` alongside the frame captures.

## Cross-workspace mobile consistency

The follow-up review compares Recipes, Materials, and Farming Plan at identical 320×568, 390×844, 390×650, and 844×350 viewports, including both portrait leaves. Legacy plan-only header, paper margin, inner padding, binding-ring, tab, search-label, count, and pager overrides made the third workspace look like a different notebook. Those exceptions are removed; the native workshop framing now applies to all three. Notes and Route controls share mobile dimensions, and material names use the same compact landscape size as recipe names.

Recipe completion/set controls, material families and stock, and the farming quantity ledger/source tabs remain specific to their jobs. The plan's contextual help now describes editing stock targets and choosing gathering sources. No data calculations or navigation model are changed.

The full suite exposed insufficient room for the mandatory first 53px stock row at 320×568 after removing the plan-only frame. The shared compact workshop rules also apply to short portrait screens; ledger inputs retain their 44px targets. Comparison tests check actual ledger-row and control containment, plus the first recipe ingredient, at this smallest viewport.
