# Kingdom Hearts Re:Chain of Memories specification

## Status and scope

**Research foundation established, 2026-09-28; HD journal implemented, with all 32 audit findings reassessed October 1 and exact residuals documented.** See the [working implementation report](../implementation/recom-hd-journal.md). The user requested the same depth of factfinding and documentation as KH1, KH2 and BBS. [Research pack](recom/README.md) · [Readiness](../readiness/kingdom-hearts-re-chain-of-memories.md) · [Audit](../research/recom-2026-09-28-coverage-and-gap-research.md).

Target modern **Re:Chain of Memories HD**, English international terminology, initially Steam within HD 1.5 + 2.5 ReMIX. GBA CoM, original PS2 bonus rules and PS3-only trophy behavior are comparison evidence, not compatibility targets. Both **Sora's Story** and **Reverse/Rebirth** are in scope. No executable build was inspected.

Apply the shared [collectible compendium](../content/collectible-compendium-and-linked-views.md), [persistent progress](../content/persistent-checklists-and-progress.md), [Data Jiminy](../data-jiminy.md) and [testing](../testing-and-content-validation.md) contracts. Facts are fully spoilerful. Acquisition prerequisites remain text; no Available Now or story/ability-input tracker is introduced. Production image acquisition is the existing exception; text directions and media support remain required.

## Product objective

Answer what a player is missing, where its **first copy or unlock** comes from, how to obtain further copies, how card rules affect its use, and which campaign/edition/completion goal it belongs to.

Re:CoM needs finite world-reward goals and card-type collection, plus separate deck inventories, room-card use, sleights, minigames and achievements. Repeating a generated chest is not another unique world collectible. Riku needs D-Report and preset-deck reference, not Sora's shopping interface with a different portrait.

## Content modules

| Module | Required facts and behavior | Research delivered |
|---|---|---|
| World rewards | World/floor-group identity, precise room/reward route, key costs, prerequisites, return/reopen behavior | 13 world visits; 24 reward-chest claims, 17 ordered Bounties and 25 floor-door predicate records; exact save/fallback semantics open |
| Card Index | Canonical identity, category, campaign, first acquisition, repeats, values, CP, Premium rules, collection membership | 152 Sora / 59 Riku card types; all 440 CP cells, 37 Premium costs, 29 basic-card effects; exact native order/trigger separate |
| Enemy farms | Eligible last enemy, world/encounter, drop rates, room boosts, reset route, special exceptions | 30 Re:CoM rate/world records; both footnotes and mushroom rules resolved; full routes and independent rate checks open |
| Room Synthesis | 29 types, campaign restrictions, exact door predicates, Joker/zero exceptions, key limits and room regeneration | 29 types, world/difficulty matrices, exact floor predicates and zero/Joker rules |
| Sleights | Ordered alternatives, generic slots, sums, same/different identities, learning event, form/character and recovery | 98 move effects, 92 structured stock recipes, six duel activations; native order and matching precedence open |
| Moogle shops | Pack types/tiers/prices, floor gates, random distributions, duplicates, sell rules | 16 prices/stock rows, eight identity pools, sale rules and resolved CP; remaining distributions open |
| Riku | Fixed per-world cards/values, world versus retained enemy cards, DP/AP, Dark Mode, duels, D-Report | 12 world presets, 12 retained boss acquisitions, 22 enemy-card records, 13 sleights and complete progression; corridor overrides open |
| Minigames | Start location, clear versus score/replay requirements, rewards, practical instructions | Six canonical start/objective routes including Monstro; five score goals and first/second rewards; later replay behavior open |
| Run goals | All Steam goals, difficulty stacking, counters, no-Continue/no-flee constraints, Journal dependencies | 47 names/requirements with platform provenance; hidden predicates/API IDs open |
| Journal identity | Sora's Journal versus Riku's D-Report; actual menus/order and completion marks | HD root/order and sampled card/record/system screens verified; partial/NEW/deck/shop states still open |

Detailed findings live in the research pack rather than being duplicated here. Numerical extraction counts are not certified in-game totals.

## Records and relationships

| Entity | Key fields |
|---|---|
| Card definition | Stable ID; aliases; family; edition; campaign; CP-by-value; battle behavior; provenance/status |
| Card copy / optional inventory | Definition ID; value; Premium flag; quantity; current possession distinct from historical discovery |
| Acquisition | ID; output reference; campaign; world; room/method; prerequisites; exact directions; repeatability; sources |
| World visit | World ID; campaign; allowed floor set; user-assigned floor if later needed; never a prescribed order inferred from a sample walkthrough |
| Reward room | World; named key and predicate list; base reward claim; bonus reward claim; reopen condition |
| Sleight | Campaign/form; ordered alternative recipes; slot categories; value constraints; learning event; normal/minigame scope |
| Riku preset | World; ordered cards and values; included enemy/item cards; separate retained boss inventory |
| Achievement | Platform; stable app ID; native API ID when known; full predicate; goal membership; threshold and save/run scope |

The existing journal uses stable shipped IDs for these records. Optional inventory and solver entities remain proposals; existing IDs must remain migration-stable. Preserve `null`/conflicted values instead of treating them as zero.

## Completion and persistence

1. Keep game, campaign and run/profile scopes explicit. Sora checks must not complete Riku records.
2. Compact world view and expanded acquisition details share saved acquisition IDs. Card catalog completion references those outputs without double-counting.
3. Counts use fixed known category membership; search or Remaining filters do not shrink the denominator.
4. Random card copies, values and Premium variants belong to inventory/deck goals. Do not silently multiply the Card Index denominator by ten.
5. Journal/character/story achievements retain their genuine requirements in their own goal track; ordinary plot flags stay outside world collectible percentages.
6. Regenerating a room or selling a card does not erase discovery history. Checking an old reward does not automatically mint stock.
7. Partial source coverage cannot produce a “complete game” badge. Gold/Platinum, minigame-only cards and Riku-only cards need explicit goal membership.
8. Persist checks, optional inventory, campaign choice and last section offline; backup/import must preserve scope and handle conflicts atomically.

## Search, offline content and Data Jiminy

Search aliases include Chain of Memories, Re:CoM, ReCOM, Reverse/Rebirth, D Report/D-Report, Saix/Saïx, Bumble-Buster/Bumble-Rumble and Lethal Flame/Lethal Frame where source localization warrants it. Labels displayed to the user follow the supported edition.

Ship acquisition text, recipes, relevant stats, conflicts and citations in the offline package. A source link is provenance, not a replacement for an answer. Data Jiminy inherits the shared app-wide model with Re:CoM-scoped retrieval and campaign-aware answers. It must retain uncertainty for unproved mechanics, distinguish Days from Riku-clear gates, and avoid borrowing KH1 Gummi or synthesis content.

## Journal and tools

Use the game's actual Journal/D-Report compositions when supported by visual evidence. [Reference workbook](../ui/references/recom/README.md) records 24 inspected HD references, exact native root/category distinctions and remaining visual gaps. The [menu design brief](../ui/recom-menu-design-research.md) proposes campaign-specific composition and responsive adaptations. Sora's native root separates Card Collection from Card Index; Riku's D-Report has its own charcoal presentation and Battle Cards grouping. The design brief is research, not accepted implementation.

Room Synthesis, card acquisition and sleight lookup are first-class game systems. The shared [synthesis/inventory](../content/synthesis-and-inventory.md) policy applies only where its concepts fit: it does not invent material crafting. CP/value/Premium rules are supplied; an optional card/deck solver still requires complete overlap/third-card precedence.

## Acceptance before declaring comprehensive

- Card rosters are 152/59; independently reconcile native sleight order and exact achievement memberships without reopening closed identity counts.
- All finite acquisitions include edition-correct prerequisites and sufficient text directions; exact reward-door conditions and post-clear dependencies are checked.
- Preserve the seven resolved CP conflicts and complete matrices; validate recipe/precedence boundaries before a solver.
- Riku preset order, item values and corridor overrides independently checked; no GBA tables leak into HD content.
- Steam goals have unique native mappings or clearly local-only IDs; run predicates and Journal dependencies verified.
- Faithful journal references are sufficient to support the implemented composition; provenance for production assets documented.
- Persistent checks, campaign isolation, filtering counts, offline recovery and accessibility pass Apple browser/iPhone/iPad acceptance; Android follows shared policy.

The user subsequently authorized implementation and the October 1 full audit follow-up. Canonical data, builder/runtime references and targeted tests were updated. No deployment or new Data Jiminy integration is claimed; Jiminy memories remain empty.

## Current research disposition

See [all 32 findings](recom/research-resolution-2026-10-01.md): 14 closed (including one false gap), 12 partial, three open after investigation and three non-factual limitations. New reference catalogs contain 99 progression rows and 59 combat/form/body records with 379 floor rows and 43 explicit duel timers. The full frame/tactics/deck catalog remains incomplete; these records do not add collectible checks.
