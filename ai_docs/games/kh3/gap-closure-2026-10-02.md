# KH3 / Re Mind gap closure — 2026-10-02

## Scope checkpoint

Target: currently shipped Steam KHIII + Re Mind. Preserve stable IDs, separate historical console entitlements, and leave Data Jiminy empty. No future release or mod behavior establishes current Steam behavior.

Starting ledger: 14 partial (KH3-001, 002, 004, 010, 011, 013, 014, 015, 020, 022, 024, 027, 029, 032), 3 conflicted (KH3-005, 018, 030), 18 resolved. This pass investigates all 17 residual findings, prioritizing obtainable source tables and firsthand evidence. Unverified edge conditions remain explicit; guide agreement alone cannot resolve tested-boundary disputes.

Research and validation are in progress. This checkpoint establishes scope, not closure.

## Integration checkpoint 1

Added all 28 obtainable medal variants (7 Junior, 12 Master, 9 Star) from the complete individual KHWiki stat/activity/rank tables. Unused code-only medal variants are excluded. Five minigame entries now enumerate the alternative A/B reward pools; probabilities remain unknown. Added built-in map-marker flight directions to all nine spheres using Game8's illustrated instructions, and 12 exact sphere/material/quantity associations. Recovered omitted structured enemy drops from existing source clauses, retained full Gigas names, and replaced Gummi-region-as-enemy parser artifacts with asteroid source labels. Focused KH3 tests: 4/4 pass. All existing IDs retained; canonical count 1954 entries, 286 actions.

Sources inspected: https://www.khwiki.com/Junior_Medal, https://www.khwiki.com/Master_Medal, https://www.khwiki.com/Star_Medal, https://game8.jp/kh3/255107. Game8 describes marking the sphere before embarkation, then following the yellow flag and shooting the sphere. Its Japanese console button is not substituted for a Steam glyph. Independent Japanese firsthand https://blog.rebosoku.com/archives/kh3gummi_record3.html also explicitly describes sphere rewards as once only. No numerical coordinates inferred.
