# BBS Final Mix factual gap investigation — October 2, 2026

Scope: modern Steam HD Final Mix. Starting checkpoint has 17 partial and four researched-open factual families. Stable IDs and Data Jiminy exclusions are preserved.

Starting IDs: BBS-001, BBS-002, BBS-003, BBS-006, BBS-010, BBS-011, BBS-012, BBS-013, BBS-015, BBS-016, BBS-018, BBS-019, BBS-021, BBS-022, BBS-025, BBS-027, BBS-028, BBS-029, BBS-030, BBS-031, BBS-032.

This is an in-progress checkpoint. Investigations will prioritize new primary-data leads, exact threshold semantics, and actionable catalog corrections. A family remains open until its exact outstanding boundary is supported.

## Validation

Not yet run for this checkpoint.

## Shop correction checkpoint

All 108 shop rows now have currency, numeric price, character eligibility, explicit unlock alternatives, and instructions. Eight named-world Shop Level milestones replace the catalog’s misleading arbitrary worlds-cleared counts. Previously-obtained alternatives are included only when individual command acquisition evidence explicitly supports them. Fire Dash retains an explicit price/gate conflict (150 at Shop Level 4 in tables versus 450 after five worlds in prose), instead of silently choosing one. Historical acquisition wording is retained in canonical research.

Sources: [Moogle Shop](https://www.khwiki.com/Moogle_Shop#Kingdom_Hearts_Birth_by_Sleep), [Fire Dash](https://www.khwiki.com/Fire_Dash), individual catalog source URLs. The [Steam shop mod](https://github.com/d4hy/BBS-All-Commands-Shop) corroborates character filtering and 108 purchasable IDs but intentionally bypasses gates; its zero values cannot establish vanilla availability.

Both offline generators passed (1,653 entries, 492 recipes, 187 commands, 46 finish nodes). Initial focused tests passed 12/12; regression test added for milestone and uncertainty propagation. BBS-010 remains partial for acquisition completeness and unresolved first-acquisition alternatives.
