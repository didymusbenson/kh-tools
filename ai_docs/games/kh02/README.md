# Kingdom Hearts 0.2 research pack

Audit date: 2026-09-18. [Dedicated specification](../kingdom-hearts-02.md) · [Readiness](../../readiness/kingdom-hearts-02.md) · [Shared compendium contract](../../content/collectible-compendium-and-linked-views.md).

The initial repo contained an embedded BBS-family scope and unaudited readiness stub, with no 0.2 acquisition dataset. This pack supplies a concrete sourced baseline. It does not claim play-tested routes or a working app.

| File | Concrete coverage | Remaining limits |
|---|---|---|
| [Collectibles](./collectibles.md) | 55 candidate physical records: 41 chests, 7 gems, 3 flowers, 4 memories; area counts and text routes | Some route-to-content joins, labels and replay rules need resolution |
| [Objectives and wardrobe](./objectives-and-wardrobe.md) | All 51 numbered objectives and their 51 cosmetic rewards; unlocks, thresholds, area groups | Lightning threshold, ice simultaneity and several predicate details conflict |
| [Replay, challenges and achievements](./replay-challenges-achievements.md) | Clear-data/NG+ distinctions, five Zodiac rounds, difficulty, 15 platform goals, 12 Data Jiminy evaluation cases | Platform mapping, exact carry rules and current-build validation incomplete |
| [Sources and gaps](./sources-and-gaps.md) | Actual legacy/repo absence evidence; primary/community manifest; 13 stable research issues | Open issues are explicit, with required resolution |

Area totals are Castle Town including Main Road **11**, World Within **21**, Forest **16**, Depths **7**. Main Road remains a separate subarea because the Castle Town objective counts nine town chests. The 12 Zodiac relics are contents of 12 of the 41 chests, not extra physical records.

Keep three visible progress systems distinct: area collectibles; objectives/challenges; wardrobe ownership. Achievements form an optional overlay within the required achievement module. Each compact collectible mark and detailed location row uses one stable record and saved state; full world percentages exclude objectives, story gates, wardrobe parents and duplicate Zodiac references.

All specified features remain MVP, including the local SLM/Coppermind, offline React PWA, backup/restore, text navigation and media support. Only unavailable production screenshot/map images are deferred. 2.8 remains collection metadata. A distinct 0.2 visual treatment has not yet been approved.

Accepted interaction decisions: fully spoilerific, no spoiler warnings/hiding/reveal controls, no Available Now/progress-gate tracking or filter. Prerequisites remain ordinary text. Crafting inventory is N/A for 0.2. The user's game platform is Steam; app acceptance starts with Apple browser/iPhone/iPad, then Android. [Validation](../../testing-and-content-validation.md) tests app behavior and checks documentary content without requiring manual gameplay.
