# Synthesis lab: dedicated design session needed

Status: design session pending with the user. Recorded 2026-10-06.

The synthesis lab is usable, but needs a deliberate design session before further enhancement. The current thread's targeted fixes do not settle its broader interaction design.

## Decisions for the session

- Material notes: compare the existing patterns across games; decide where direct drop rates, locations, conditional reward rules, related-source details, and generic farming advice belong.
- Crafting quantities: distinguish crafting history, desired outputs, owned stock, and material quantities still needed. Preserve unknown stock versus zero.
- Nested crafting: decide how craftable ingredients and recursive dependencies should be presented and inspected without losing the user's current plan.
- Remaining quantities: choose consistent labels and calculations for unknown, partial, sufficient, and surplus stock; avoid implying that recording a craft deducts inventory.
- Cross-game consistency: agree which interactions should be shared and which should retain game-specific rules and journal identity.

Bring phone portrait, short landscape, and desktop examples plus the deferred acceptance TODOs below to the session. Agree on representative user journeys and acceptance criteria before implementing a redesign.

## Bounded decision already made

Material families are more useful than a flat alphabetical list: people look for Frost shards, gems, and other related materials together. KH1's material index now keeps each family together under a heading; canonical names, IDs, acquisition information, filters, and stock semantics are unchanged.

Reference category filters remain a separate design question, tracked in the [Reference category backlog](reference-category-backlog.md). The user approved deferring its failing browser scenario on 2026-10-07; this does not settle the eventual category UI.

## Existing patterns to bring to the session

The shared farming plan already uses Owned / Target / Remaining rows and world-grouped source disclosures across KH1, KH2, BBS, DDD and KH3. Its source routes do not provide a recursive craftable-ingredient tree.

The reading views differ: KH1 uses compact material details plus related enemies (and recursive crafting options in material notes); KH2 exposes direct material source blocks; BBS combines character-scoped crystals, commands and ice-cream inputs; DDD uses Dream Piece / Spirit Creation notes with portal rewards and conditions; KH3 uses inline material cards with source summaries. Decide the shared information promise, including which facts must be visible immediately, before standardizing presentation. Preserve source types: a portal reward is not an ordinary enemy drop.

## Material family consistency audit

KH2 and DDD already sort through `src/games/presentation.ts`, grouping family names before material tiers; the shared guide also uses that order. KH1's retired generic view already used `src/domain/materialPresentation.ts`. This fix reconnects the native KH1 index to that established comparator (including Blaze / Blazing), adds family headings, and prevents a family being split between pages. It does not impose KH1's material tiers on BBS's mixed inventory or DDD's Dream Pieces, or redesign other games' presentation.

## Deferred acceptance TODOs

On 2026-10-07 the user approved removing three synthesis scenario definitions from the active browser suite (six desktop/phone executions). These are intentional design TODOs, not implemented features or passing coverage. No skip or expected-failure tests replace them. The separate Reference scenario brings the approved total to four definitions / eight executions.

- [ ] **SYN-01: Nested ingredient exploration in Farming Plan.** Decide the recursive crafting interaction, then restore coverage for Dark Matter → Mythril → Mythril Shard without leaving the plan or changing its single target. The removed `farming-plan.spec.ts` scenario also exercised the first-level Lucid Shard, Gale and Mythril prose; removal of the whole scenario means those checks are no longer separately covered there. Existing target arithmetic, stock persistence, source disclosures and target-removal tests remain.
- [ ] **SYN-02: Explicit remaining quantities in the recipe workspace.** Decide the owned / required / remaining presentation and restore workspace-specific coverage using Energy Bangle with eight Spirit Shards owned, two required and zero remaining. The removed `journal.spec.ts` scenario concerned the workspace; direct recipe-entry unknown/surplus/zero arithmetic and stock/catalog persistence tests remain active.
- [ ] **SYN-03: Direct material acquisition summaries.** Decide which rate/location facts appear before opening related-source details, then restore the corresponding `materials.spec.ts` scenario. Its former examples were Blaze Shard (Red Nocturne, 6%, Wonderland / Bizarre Room) and Blaze Gem (separate Bandit 4% and Fat Bandit 8% lines). Preserve the distinction between direct summaries and expanded source information. Material-family grouping, unknown-versus-zero stock and absence of generic Lucky Strike boilerplate remain covered.

Before closing any TODO, agree on acceptance criteria in the design session, implement the chosen behavior and add desktop/phone coverage. Deferral does not claim the removed behavior already works or authorize a broader redesign.
