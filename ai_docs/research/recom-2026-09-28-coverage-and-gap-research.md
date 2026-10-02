# Re:Chain of Memories coverage and factfinding — 2026-09-28

Historical chronological report. Its earlier missing-field/no-module statements describe their dated snapshots. The current October 1 disposition is [the full Re:CoM ledger](../games/recom/research-resolution-2026-10-01.md), including all resolved fields and exact remaining gaps.

The user identified an undocumented game and requested the depth already established for KH1, KH2 and BBS. This pass supplies a dedicated [specification](../games/kingdom-hearts-re-chain-of-memories.md), [research pack](../games/recom/README.md), [readiness workbook](../readiness/kingdom-hearts-re-chain-of-memories.md), [source manifest](../games/recom/source-manifest.json), and [journal reference workbook](../ui/references/recom/README.md).

## Benchmark inspected

| Existing research | Standard carried forward |
|---|---|
| [KH1 pack](../games/kh1fm/README.md) and specification | Concrete acquisition/system tables; finite denominators; recipe/mechanics validation; sources next to claims |
| [KH2 pack](../games/kh2fm/README.md) and [September 28 audit](../games/kh2fm/data-gap-audit-2026-09-28.md) | Edition selection, independent comparison, named contradictions, platform achievement partition and extraction limits |
| [BBS pack](../games/bbsfm/README.md), [coverage audit](bbsfm-2026-09-28-coverage-and-gap-research.md) and [category matrix](bbsfm-category-scope-matrix-2026-09-28.md) | Character-specific progress, shared definitions, machine-readable inventories and honest source/implementation status |
| [Shared readiness](../readiness/README.md), [game contract](../games/README.md), [KHTABLES audit](../sources/khtables-drive-audit.md) | Modern Steam context, collectible-only world progress, offline/persistent behavior and record-level provenance |

This comparison measures research structure and substance, not file length. CoM has different completion units and cannot inherit a KH1 chest/synthesis checklist.

## Starting state

Local searches found only incidental CoM mentions in existing documentation. There was no dedicated spec, readiness assessment or source catalog. The prior KHTABLES inventory had no dedicated CoM workbook; connected Drive was not re-audited in this pass.

The inspected `src/App.tsx` game list contains KH1FM, KH2FM, BBSFM, DDDHD, KH02 and KH3. `src/games/registry.ts` loads the five non-KH1 guides. There is no Re:CoM selector/module in that inspected state. Existing uncommitted BBS/decision-log work was left intact.

## Delivered factual foundation

| Domain | Actual research coverage |
|---|---|
| Release/edition | Modern English Re:CoM HD; four PS2 attack-card replacements excluded; Days and Riku-clear gates separated |
| World structure | 13 Sora visits / 12 Riku visits; configurable floor groups and 100 Acre Wood exception |
| Finite rewards | 24 Room of Rewards chest claims; 17 named Bounties; story and minigame acquisitions linked separately |
| Attack/basic cards | 23 HD attack identities with multipliers/elements/acquisitions; 31 magic/summon/item/friend/special records |
| Enemy cards | 56 Sora + 22 Riku records; seven CP disagreements explicitly quarantined |
| Farms | 30 Re:CoM-specific enemy world/rate candidates, including mushroom-room exceptions |
| Map cards | 29 identities; 20 Riku-applicable in the inspected source |
| Sleights | 83 ordinary Sora, 2 minigame-only and 13 Riku candidate names; twelve level milestones and acquisition sources |
| Riku presets | Twelve world decks, exact source card sequence/values, source-tab identity and retained-card boundary |
| Shops | Sixteen pack tier/type prices, floor bands and five-card pack size |
| Minigames | Five Pooh activities with first/second-clear rewards and separate Steam thresholds; Monstro Journal entry identified |
| Platform goals | All 47 Re:CoM Steam display names matched against the primary 197-goal compilation list; partition/hidden text from Exophase |
| UI/reference | Follow-up: 24 inspected HD references, native root/card-category structure, system menus and [design brief](../ui/recom-menu-design-research.md); targeted visual gaps retained |
| Sources | 78 inspected source records with sections, source class and access limits; additional leads kept separate |

These are research counts. They overlap through acquisitions, definitions and goals and must never be summed into a game-completion percentage. Neither 83 ordinary Sora sleights nor the card-family counts are claimed as independently verified native-menu denominators.

## Findings that prevent bad imports

1. **Darkball belongs only to Riku in Re:CoM.** Its original Sora row cannot migrate into HD collection goals.
2. **Four PS2 bonus weapons are replaced in HD.** Keeping both versions produces a fictitious card roster.
3. **Riku world decks differ from GBA.** Traverse Town has twelve Soul Eater cards in the remake table, rather than the five in the original tab; Wonderland has nine low-valued attack cards.
4. **CP costs conflict across sources.** Soldier, Powerwild, Wyvern, Defender, Tornado Step, Crescendo and Neoshadow have competing aggregate/individual-page values. Both are preserved; usable CP is null.
5. **The overview mislabels Hollow Bastion's bonus enemy card.** Detailed tables identify Xigbar there and Xaldin in Monstro.
6. **Not every Trinity Limit permutation carries forward.** Goofy + Donald + Attack is labeled GBA-only for Trinity Limit and becomes Wild Crush in Re:CoM. Candidate combination text excludes it from the remake Trinity rule.
7. **World completion, Card Index, current inventory and achievements are distinct.** Room regeneration, duplicate card values and selling stock cannot erase finite reward history or inflate its denominator.
8. **Steam goals have duplicate names across games.** Ace Pilot and Undefeated cannot be keyed by global display name; no native API IDs were invented.

Per-fact citations and both sides of the numerical disputes are in [edition/source notes](../games/recom/editions-sources-and-conflicts.md) and the JSON records.

## What remains genuinely unfinished

- Independently verify native Card Index/Sleight-menu membership and order, especially World/Gimmick/minigame cards and Gold/Platinum.
- Resolve CP discrepancies and add CP-by-value/Premium tables, detailed enemy effects, pack distributions and sale exceptions.
- Transcribe exact door predicates, Bounty priority/repeat rules, precise reward/farm routes and encounter-only footnotes.
- Verify minimum modern Days triggers, clear/system-save interactions, Riku corridor overrides, EXP/stat caps and full boss data.
- Resolve exact Steam run/counter predicates, native API mapping and Journal/character-entry requirements.
- Follow-up HD interface research captured both report roots, collection/index/detail/records and player-menu examples. Next capture partial/NEW states, Edit Deck, Moogle shop and English room predicates; no visual recreation has been implemented.

These are bounded research tasks in the [readiness workbook](../readiness/kingdom-hearts-re-chain-of-memories.md), not questions delegated back to the user or silent feature deferrals.

## Validation and limits

A one-time data audit checks JSON parsing, expected record counts, ID uniqueness, source presence, excluded PS2/GBA identities, Sora/Riku separation, reward-family totals, all twelve Riku deck sizes/value bounds, the seven null CP cases, rate multiplication, sleight scope counts/level milestones and Steam-name membership. Local Markdown links are checked for valid targets. See [validation record](../games/recom/validation.json).

No app build or browser test is claimed: this pass changes documentation and research candidates only. No game playthrough was run, no release build was certified, and no external media was copied into production. The next factual priorities are native roster reconciliation and the seven CP costs, followed by exact acquisition predicates.
