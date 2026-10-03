# Re:Chain of Memories — sourced research pack

Research snapshot: **2026-09-28**, fully reassessed **2026-10-01**. Baseline: English **Re:Chain of Memories in modern HD 1.5 + 2.5 ReMIX**, initially Steam. “Chain of Memories” is a search alias; GBA mechanics and original PS2 bonus rules are not the supported ruleset.

[Specification](../kingdom-hearts-re-chain-of-memories.md) · [Readiness](../../readiness/kingdom-hearts-re-chain-of-memories.md) · [Coverage audit](../../research/recom-2026-09-28-coverage-and-gap-research.md) · [Journal references](../../ui/references/recom/README.md)

The journal now uses this pack for 431 guide entries, including all 152 Sora and 59 Riku card types. See the [data closure audit](data-gap-audit-2026-09-28.md) for delivered fields, evidence decisions and remaining narrow gaps. Source reconciliation is distinct from native-game verification.

October 1 follow-up: [all 32 dispositions](research-resolution-2026-10-01.md) — 19 closed, 10 partial, zero open after investigation, three non-factual limitations. All 98 sleight and 29 basic-card effects, structured recipes, full progression, 59 combat records, six minigame routes and friend/mushroom conditions are now integrated.

All residuals were challenged in the [continuation report](research-continuation-2026-10-01.md), including 47 explicitly matched Steam API keys and additional summon/stock/encounter guidance.

## Readable references

| Document | Coverage |
|---|---|
| [Editions, sources and conflicts](editions-sources-and-conflicts.md) | HD substitutions; Days and clear-save gates; inspected-source quality; seven CP conflicts |
| [Worlds, rooms and rewards](worlds-rooms-and-rewards.md) | All 13 Sora / 12 Riku world visits; 24 reward chests; 17 Bounty rewards; room costs and counting rules |
| [Cards, farming and Moogle shops](cards-farming-and-shops.md) | Card families, first copy versus duplicates, 30 farms, Premium behavior, 16 pack prices |
| [Sleights and progression](sleights-and-progression.md) | Twelve level milestones; acquisition families; card combinations; movement and Riku mechanics |
| [Reverse/Rebirth](reverse-rebirth.md) | All 12 fixed world decks, 22 enemy-card records, campaign-specific completion |
| [Minigames and achievements](minigames-and-achievements.md) | First-clear/replay rewards, five score targets, all 47 Steam goal candidates, run restrictions |

## Machine-readable research

Every JSON file carries edition, date, scope notes and status. IDs are stable shipped app IDs, not native menu numbers or Steam API names.

| File | Actual records | Boundary |
|---|---:|---|
| [Attack cards](attack-cards.json) | 23 | HD identities, multipliers, acquisition, ten-value CP/Premium costs and world pools |
| [Other cards](other-cards.json) | 31 | 7 magic, 7 summon, 7 item, 8 friend, 2 special; costs, pools and unlocks |
| [Enemy cards](enemy-cards.json) | 78 | 56 Sora + 22 Riku; effects, routes and reconciled Sora CP |
| [Enemy-card farms](enemy-card-farms.json) | 30 | All 30 practical routes and published remake rates corroborated; Steam probabilities not measured |
| [Map cards](map-cards.json) | 29 | Effects, world/difficulty drop rates, campaign applicability and inventory rules |
| [Sleights](sleights.json) | 98 | 83 ordinary Sora + 2 minigame-only + 13 Riku; source count, not certified achievement denominator |
| [Worlds](worlds.json) | 13 | World visits and floor groups; 100 Acre Wood is Sora-only |
| [World rewards](worlds-and-rewards.json) | 41 | 12 base reward chests + 12 Days chests + 17 Bounties; other acquisitions remain separate |
| [Riku decks](riku-decks.json) | 12 | Re:CoM world presets, values and source order; retained boss cards additional |
| [Moogle packs](moogle-packs.json) | 16 | Corrected prices, floor stock, twelve identity pools, value/Premium odds, assorted selection and sale rules |
| [Steam achievements](steam-achievements.json) | 47 | Primary names, secondary partition/hidden descriptions; no PlayStation platinum |
| [CP conflicts](source-conflicts.json) | 7 | Reconciled remake costs with contrary source values retained |
| [Additional native cards](additional-cards.json) | 28 | World/Gimmick cards and Riku items; completes both campaign rosters |
| [Event doors](door-requirements.json) | 25 | Floor-specific story/reward predicates; zero is literal |
| [Progression](progression.json) | 99 | Complete level/EXP rows, stat caps and deferred choices |
| [Combat reference](combat-reference.json) | 59 | 379 floor rows, 24 boss deck tables, resistances and 43 explicit duel timers; full encounter/frame catalog incomplete |
| [Minigames](minigames.json) | 6 | Start routes/objectives and first/second rewards; third-and-later replay behavior unknown |
| [Source manifest](source-manifest.json) | See manifest | Exact inspected sections and access limitations |

These files overlap by design: a card definition, its chest reward and its achievement membership are not three collectible items. Do not add these row counts together to calculate “100%.” Follow the shared [collection contract](../../content/collectible-compendium-and-linked-views.md).

## Remaining research

Inspected primary reference: [Final Mix+ Ultimania, with inspected Re:CoM sample pages](editions-sources-and-conflicts.md#october-2-official-reference-candidate-inspected-sample). For platform questions, use [direct Steam evidence](editions-sources-and-conflicts.md#october-2-direct-steam-evidence-route); a KH-specific guide is not required.

See the [current per-ID ledger](research-resolution-2026-10-01.md) and [historical baseline audit](research_audit.md). COM-001–005 are closed within their documented scopes. Remaining sleight questions concern Steam-native confirmation, achievement predicates and arbitrary extra-card matching; save-state/Steam triggers, Report registration and duration questions remain bounded in the ledger. Existing CP/card membership/doors remain closed.

Source URLs, classifications and research tasks belong in this pack. Journal entries provide acquisition directions, costs and effects without sources/reference panels or research TODOs.

October 2 follow-up: [remaining-gap outcomes](gap-closure-2026-10-02.md) records new Steam farm/Days guidance, bounded stock priority, Riku Report/duel observations and edition-qualified replay evidence. The overall register remains 19 closed, 10 partial, zero open and three non-factual limitations.

October 2 targeted COM-001–003 pass: [research results](research-com-001-003-2026-10-02.md). Shop and Riku player needs are met; remaining internal mechanics are optional research by user scope decision. COM-003 now supplies practical routes and fallbacks for all 30 targets. The Soldier Neverland summon footnote is disputed, not a confirmed farm.

Current COM-001–003 status: [practical coverage and scope closure](farm-coverage-closure-2026-10-02.md). No guaranteed drops or independent Steam gameplay test is claimed.

October 2 primary-reference follow-up: [COM-005–007 evidence and remaining boundaries](research-com-005-007-2026-10-02.md).

A lead found during that pass also supplied [published approximate duration guidance](research-com-017-duration-lead-2026-10-02.md), now integrated. Bambi uses three hops plus a final landing; Mushu tiers increase shot allowance, and Splash Lv3 does not outlast Lv2. COM-017 retains only the documented timing-precision limits.
