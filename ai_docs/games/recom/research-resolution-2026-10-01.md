# Re:CoM research resolution — October 1, 2026

Follow-up to [the research audit](research_audit.md). Original appendix occurrences remain anchored to `f933ab1`; resolved questions should not be inferred from those historical lines.

| Finding | Resolution | Remaining scope |
|---|---|---|
| COM-018 | **Closed: false gap.** Ansem's player card correctly provides only elemental resistances in Re:CoM. Its name does not imply a missing concealment benefit. | Enemy Ansem's use is a separate mechanic; do not import it into the player-card entry. |
| COM-019 | **Closed: integrated.** All 13 Riku sleights now retain unlock context and form requirements; six duel entries also retain the eight-reloadable-card initiation rule. | Enemy-specific duel timers remain COM-014; executable recipe precedence remains COM-007. |
| COM-032 | **Partly resolved.** Removed the copied mushroom research task from 28 ordinary enemy entries and replaced the obsolete door-cost warning with a pointer to the existing floor-based costs. | White Mushroom/Black Fungus success questions and the Shadow/Soldier encounter-footnote loss remain open. |
| COM-020 | **Still open for the September 28 provenance backlog.** This pass's five inspections are recorded separately in the manifest. | Do not mistake newly added follow-up entries for reconstruction of the older missing inspection records. |

## Evidence and integration

[Sleightblind](https://www.khwiki.com/Sleightblind) explicitly distinguishes original CoM Link Mode concealment from Re:CoM's resistance-only player effect. The [Enemy Card table](https://www.khwiki.com/Enemy_Card) independently separates its CoM and Re:CoM descriptions on the same community reference site. These are two pages, not independent publications. `enemy-cards.json` now states the edition clearly, preserves the supporting URL and records why the audit's initial assumption was incorrect. Existing 40 CP and ten-sleight duration are unchanged.

The [Sleight reference](https://www.khwiki.com/Sleight) supplies Riku's early-story unlock context, Dark attack restrictions, normal/Dark duel variants and duel initiation rule. [Holy Burst](https://www.khwiki.com/Holy_Burst) explicitly describes its replacement by Inverse Burst in Dark Mode. [MM Miracle](https://www.khwiki.com/MM_Miracle) has no form restriction. These agree with the existing `reverse-rebirth.md` rules; they are now carried into all affected generated entries instead of remaining only in prose.

The builder keeps ordered recipe text and adds form requirements to both detail prerequisites and the Mode stat. Card rosters, record IDs, floor-door data and progress denominators are unchanged. The generated journal remains **431 entries**, including **152 Sora** and **59 Riku** card types.

Source inspection dates/access methods are recorded under `source-manifest.json.followUpInspections`; earlier snapshot hashes retain their original meaning. Regression coverage verifies form-sensitive pairs and the resistance-only Ansem entry. Validation results are recorded in the shared [resolution pass](../../research/research-resolution-2026-10-01.md).
