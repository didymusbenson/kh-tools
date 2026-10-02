# Re:Chain of Memories — sourced research pack

Research snapshot: **2026-09-28**, fully reassessed **2026-10-01**. Baseline: English **Re:Chain of Memories in modern HD 1.5 + 2.5 ReMIX**, initially Steam. “Chain of Memories” is a search alias; GBA mechanics and original PS2 bonus rules are not the supported ruleset.

[Specification](../kingdom-hearts-re-chain-of-memories.md) · [Readiness](../../readiness/kingdom-hearts-re-chain-of-memories.md) · [Coverage audit](../../research/recom-2026-09-28-coverage-and-gap-research.md) · [Journal references](../../ui/references/recom/README.md)

The journal now uses this pack for 431 guide entries, including all 152 Sora and 59 Riku card types. See the [data closure audit](data-gap-audit-2026-09-28.md) for delivered fields, evidence decisions and remaining narrow gaps. Source reconciliation is distinct from native-game verification.

October 1 follow-up: [all 32 dispositions](research-resolution-2026-10-01.md) — 15 closed, 11 partial, three open after investigation, three non-factual limitations. All 98 sleight and 29 basic-card effects, structured recipes, full progression, 59 combat records, six minigame routes and friend/mushroom conditions are now integrated.

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
| [Enemy-card farms](enemy-card-farms.json) | 30 | Re:CoM enemy-page worlds and rate candidates; encounter routes not fully normalized |
| [Map cards](map-cards.json) | 29 | Effects, world/difficulty drop rates, campaign applicability and inventory rules |
| [Sleights](sleights.json) | 98 | 83 ordinary Sora + 2 minigame-only + 13 Riku; source count, not certified achievement denominator |
| [Worlds](worlds.json) | 13 | World visits and floor groups; 100 Acre Wood is Sora-only |
| [World rewards](worlds-and-rewards.json) | 41 | 12 base reward chests + 12 Days chests + 17 Bounties; other acquisitions remain separate |
| [Riku decks](riku-decks.json) | 12 | Re:CoM world presets, values and source order; retained boss cards additional |
| [Moogle packs](moogle-packs.json) | 16 | Corrected prices, floor stock, eight magic/item pack pools and sale rules |
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

See the [current per-ID ledger](research-resolution-2026-10-01.md) and [historical baseline audit](research_audit.md). Exact pack distributions, Riku overrides, full farm routes, native sleight order, recipe precedence, save-state/Steam trigger predicates, Report registration and two basic-card durations remain precisely bounded; existing CP/card membership/doors remain closed.

Source URLs, classifications and research tasks belong in this pack. Journal entries provide acquisition directions, costs and effects without sources/reference panels or research TODOs.
