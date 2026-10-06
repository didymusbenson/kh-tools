# Synthesis lab: dedicated design session needed

Status: design session pending with the user. Recorded 2026-10-06.

The synthesis lab is usable, but needs a deliberate design session before further enhancement. The current thread's targeted fixes do not settle its broader interaction design.

## Decisions for the session

- Material notes: compare the existing patterns across games; decide where direct drop rates, locations, conditional reward rules, related-source details, and generic farming advice belong.
- Crafting quantities: distinguish crafting history, desired outputs, owned stock, and material quantities still needed. Preserve unknown stock versus zero.
- Nested crafting: decide how craftable ingredients and recursive dependencies should be presented and inspected without losing the user's current plan.
- Remaining quantities: choose consistent labels and calculations for unknown, partial, sufficient, and surplus stock; avoid implying that recording a craft deducts inventory.
- Cross-game consistency: agree which interactions should be shared and which should retain game-specific rules and journal identity.

Bring phone portrait, short landscape, and desktop examples plus current failing behavioral contracts to the session. Agree on representative user journeys and acceptance criteria before implementing a redesign.

## Bounded decision already made

Material families are more useful than a flat alphabetical list: people look for Frost shards, gems, and other related materials together. KH1's material index now keeps each family together under a heading; canonical names, IDs, acquisition information, filters, and stock semantics are unchanged.

Reference category filters are a separate unresolved question. Do not infer a decision to restore or remove them from this synthesis discussion. Keep the behavior contract until that decision is explicit.

## Existing patterns to bring to the session

The shared farming plan already uses Owned / Target / Remaining rows and world-grouped source disclosures across KH1, KH2, BBS, DDD and KH3. Its source routes do not provide a recursive craftable-ingredient tree.

The reading views differ: KH1 uses compact material details plus related enemies (and recursive crafting options in material notes); KH2 exposes direct material source blocks; BBS combines character-scoped crystals, commands and ice-cream inputs; DDD uses Dream Piece / Spirit Creation notes with portal rewards and conditions; KH3 uses inline material cards with source summaries. Decide the shared information promise, including which facts must be visible immediately, before standardizing presentation. Preserve source types: a portal reward is not an ordinary enemy drop.

## Material family consistency audit

KH2 and DDD already sort through `src/games/presentation.ts`, grouping family names before material tiers; the shared guide also uses that order. KH1's retired generic view already used `src/domain/materialPresentation.ts`. This fix reconnects the native KH1 index to that established comparator (including Blaze / Blazing), adds family headings, and prevents a family being split between pages. It does not impose KH1's material tiers on BBS's mixed inventory or DDD's Dream Pieces, or redesign other games' presentation.
