# Re:Chain of Memories — sourced research pack

Research snapshot: **2026-09-28**. Baseline: English **Re:Chain of Memories in modern HD 1.5 + 2.5 ReMIX**, initially Steam. “Chain of Memories” is a search alias; GBA mechanics and original PS2 bonus rules are not the supported ruleset.

[Specification](../kingdom-hearts-re-chain-of-memories.md) · [Readiness](../../readiness/kingdom-hearts-re-chain-of-memories.md) · [Coverage audit](../../research/recom-2026-09-28-coverage-and-gap-research.md) · [Journal references](../../ui/references/recom/README.md)

This first pass follows the KH1/KH2/BBS research standard: actual inventories, acquisition rules, campaign boundaries, sources, and unresolved fields. It establishes a substantial research foundation; it does not certify an exhaustive guide or implement a seventh journal.

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

Every JSON file carries edition, date, scope notes and status. IDs are proposed stable app IDs, not native menu numbers or Steam API names.

| File | Actual records | Boundary |
|---|---:|---|
| [Attack cards](attack-cards.json) | 23 | Sora HD identities, multipliers, elements and first-acquisition routes; CP/value matrix pending |
| [Other cards](other-cards.json) | 31 | 7 magic, 7 summon, 7 item, 8 friend, 2 special; not a complete Card Index denominator |
| [Enemy cards](enemy-cards.json) | 78 | 56 Sora + 22 Riku; seven conflicted Sora CP values are null |
| [Enemy-card farms](enemy-card-farms.json) | 30 | Re:CoM enemy-page worlds and rate candidates; encounter routes not fully normalized |
| [Map cards](map-cards.json) | 29 | Includes 4 keycards and Random Joker; campaign applicability retained |
| [Sleights](sleights.json) | 98 | 83 ordinary Sora + 2 minigame-only + 13 Riku; source count, not certified achievement denominator |
| [Worlds](worlds.json) | 13 | World visits and floor groups; 100 Acre Wood is Sora-only |
| [World rewards](worlds-and-rewards.json) | 41 | 12 base reward chests + 12 Days chests + 17 Bounties; other acquisitions remain separate |
| [Riku decks](riku-decks.json) | 12 | Re:CoM world presets, values and source order; retained boss cards additional |
| [Moogle packs](moogle-packs.json) | 16 | Tier/type price and floor range |
| [Steam achievements](steam-achievements.json) | 47 | Primary names, secondary partition/hidden descriptions; no PlayStation platinum |
| [CP conflicts](source-conflicts.json) | 7 | Both source values retained; no unsupported resolution |
| [Source manifest](source-manifest.json) | See manifest | Exact inspected sections and access limitations |

These files overlap by design: a card definition, its chest reward and its achievement membership are not three collectible items. Do not add these row counts together to calculate “100%.” Follow the shared [collection contract](../../content/collectible-compendium-and-linked-views.md).

## Immediate research priorities

1. Independently reconcile Card Index and Sleight-menu membership/order, including special and minigame cards.
2. Resolve the seven CP disputes; transcribe per-value CP, Premium costs and shop probability tables.
3. Finish exact world door predicates, Bounty precedence, spawn routes and modern Days/system-save behavior.
4. Extend the [captured HD menu evidence](../../ui/references/recom/README.md) with partial/NEW states, Edit Deck and Moogle screens; verify modern hidden achievement predicates.

All are explicit remaining work, not release deferrals. Production images remain the existing shared exception. No user playthrough is required.
