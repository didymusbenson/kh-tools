# DDD HD critical sufficiency re-audit — 2026-10-02

The user challenged the large number of deferrals. That criticism exposed two problems in the first review: a workaround for a different Spirit was being treated as an answer about the existing Spirit’s board, and broad catalog counts were being treated as evidence that every required player action was explained.

**Corrected research disposition: 8 resolved, 14 deferred, 3 open.** Evidence accounting remains 8 resolved, 16 partial, 1 blocked. DDD-003 is resolved after correcting the adapter; DDD-004 and DDD-006 are reopened alongside DDD-025. This is a count of families, not a claim that all remaining details within a family have the same importance.

## Re-examined practical questions

### DDD-003: resolved source-backed adapter defect

The raw source explicitly declares `B-3 Left → A-3`. Our extractor only emits a connection when both adjacent background graphics declare reciprocal directions. Because A-3 lacks its Right declaration, the adapter omitted the edge and left nine nodes disconnected in its own graph: B-3, B-6, B-7, C-3, C-4, C-5, C-6, D-5, D-6.

That is **not proof of an in-game locked or unreachable branch**. A-3 Magic Boost is already reachable through A-2, so the earlier alternative-Magic-Boost rationale targeted the wrong problem. Runtime now exposes the one-sided source connector separately, with its qualification. The raw discrepancy remains preserved. A source-reported union graph reaches every Jestabocky node; tests distinguish that graph from the reciprocal-only graph.

The parser now normalizes a connector explicitly drawn at either end as an undirected adjacency, matching the [documented board model](https://www.khwiki.com/Spirit). All 54 source-reported boards are connected. The missing reciprocal graphic is retained as provenance; no endpoint or absent source line is invented. This resolves DDD-003. It does not need binary proof or a new Steam screenshot. The HD guide’s 1,080-LP total also agrees with the nodes, but the resolution comes from the explicit source connector and corrected adapter, not the LP total. The source-board page and generic mechanics were inspected; the HD guide’s browser image was blocked and is not claimed inspected. [Source board](https://www.khwiki.com/Jestabocky).

### DDD-004: a Faith workaround does not settle Aura Lion

Flowbermeow’s 480-LP route remains useful for global command collection. It does not settle the existing Aura Lion board’s Red Secret C-7 versus D-7 footnote conflict. The table’s 250-LP secret and separate level-30 checkpoint remain visible. Research the exact transformation action rather than treating another provider as closure. [Aura Lion source](https://www.khwiki.com/Aura_Lion).

### DDD-006: recipe mode is part of the action

The first review relied on 54 marked recipe entries as a universal guaranteed-breed fallback. Structural review found three colliding ingredient events:

| Inputs | Published outcomes |
|---|---|
| Noble Fancy ×3 + Grim Figment ×4 | Cyber Yog and Sir Kyroo, both marked |
| Epic Fantasy ×1 + Intrepid Fantasy ×3 | Tyranto Rex and Ursa Circus, both marked |
| Rampant Figment ×4 + Vibrant Fancy ×3 | Jestabocky marked; Meow Wow unmarked |

Runtime previously applied 100% text to marked entries while saying recipe-item ownership was unnecessary. This failed to explain the selection action.

The [HD creation guide](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-28-Final-Chapter-Prologue/walkthrough/16) documents separate Recipes and custom-creation tabs; the Recipes tab lists recipes the player has found. The [Spirit mechanics source](https://www.khwiki.com/Spirit) describes the named recipe guarantee and visible custom odds. Runtime now directs the player to obtain and select the named recipe, and never applies that guarantee unconditionally to a raw custom ingredient pair. Source probability nulls remain null.

Custom selection/outcome semantics for those three colliding events remain open. Exact odds for141 unrelated unmarked alternatives can remain optional depth; this does not excuse contradictory behavior in the formulas actually offered.

## Useful questions researched rather than deferred

### DDD-007: a concrete Golden Egg recipe

The achievement entry previously repeated only the ★-rank requirement. The [PS4 HD guide’s Golden Egg section](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497) supplies a custom-creation route: 10 Intrepid Figments + 8 Vibrant Figments, producing either Tama Sheep or Pricklemane at ★. The [Spirit rank rules](https://www.khwiki.com/Spirit) and both canonical breed formulas corroborate why: 5 + 4 pieces starts either outcome at B; doubling each grants +2 ranks, B → A → ★. The source’s S denotes ★, not another rank between A and ★.

Runtime now explains the mode, quantities, material routes and preview check. The guaranteed result is the rank of either outcome, not a selected breed; neither Risky Winds, command donation nor a named recipe item is needed. The useful achievement question is answered while weather-odds arithmetic and malformed initial-level cells remain deferred. This recipe does not resolve the separate three custom-input selection conflicts in DDD-006.

### DDD-009/014: repeatable scarce-material supply

The marked Lord Kyroo, Ryu Dragon and Skelterwild formulas need five Brilliant Fantasies together. Four portal identities alone do not tell a player how to gather that supply. The revised material entries provide an actual loop: unlock Riku’s TWTNW Special 3, wait at Delusive Beginning for its Tyranto Rex forecast, clear the active Special, Drop away and back, and repeat. Sora’s Avenue to Dreams Special 3 supplies Wild Fantasy; its marked Skelterwild/Sudo Neku targets total three.

The [PS4 Q&A](https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/answers/454624-where-can-i-find-brilliant-malleable-and-wild-fantasys) gives the parked-character farming method and target portals. The [2017 HD thread](https://gamefaqs.gamespot.com/boards/181154-kingdom-hearts-hd-28-final-chapter-prologue/74933773) reports repeated clears and respawning after dropping away/back, including a pre-postgame report. Earlier all-Specials-first wording conflicts with these reports and is not imposed as an all 39 prerequisite. Exact earliest replay limits and every unrelated payout state remain unverified, but the needed repeat-farm action is integrated.

The 22 HD landmarks and expanded-map method remain useful. An exhaustive route atlas is optional; a specific required portal with an unusable approach must reopen immediately.

### DDD-015: seven places, not just seven objective names

Brave Challengers now has a concrete Special Portal example for each type: Sora Traverse Town 1/2/3/4; Sora La Cité 3/4; Sora The Grid 1. Each includes the actual area, forecast and unlock condition from canonical world rows. This gives players places to attempt the bonuses without requiring a landmark atlas for all 257 optional built-in identities. [Exact examples and source URLs](practical-reaudit-evidence-2026-10-02.json).

### DDD-021: high scores settle Daring Diver’s useful question

The [HD Reports guide](https://www.trueachievements.com/game/kingdom-hearts-hd-28-final-chapter-prologue/walkthrough/15) explicitly says Daring Diver sums the recorded High Scores for both characters/world courses. Runtime no longer hedges between course bests and repeated-run accumulation. Dream Pleaser now explicitly states 54 breeds and affinity 9. Retaining future trained instances is a precaution; it does not certify recovery of previously released/NG+ credit. That narrower persistence question remains unverified, with a concrete recovery issue as its reopening trigger.

### DDD-022 and aggregate achievements: rows are not instructions

Record Keeper and Command Collector previously had only their platform one-line requirements. Runtime now includes practical steps for Record Keeper, Star Combatant, Storyteller, Item Collector and Command Collector, grounded in the [HD Record Keeper guide](https://www.playstationtrophies.org/game/kingdom-hearts-dream-drop-distance/trophy/165866-record-keeper.html), [collection guide](https://www.playstationtrophies.org/forum/topic/284269-comprehensive-reports-and-collection-guide/) and [HD command guide](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-28-Final-Chapter-Prologue/walkthrough/17). Future platform IDs and hidden implementation details remain optional; needed player actions do not.

## Boundary of the remaining 14 deferrals

The [updated future-improvements list](future-improvements.md) preserves each goal, usable current guidance, exact optional detail and reopening trigger. It is not a claim that every imaginable player state is covered. In particular, retained-instance advice does not solve past loss, full-cup replay does not certify the minimum replay, and UI prompts do not verify fixed Steam bindings. No source conflict is converted to a game fact.

## Validation

- Focused DDD and multi-game tests: 18/18 passed.
- Full unit suite: 149/149 tests in 15/15 files passed.
- Production build, TypeScript, content checks and empty-Coppermind validation passed. Existing large-bundle advisory remains nonfatal.
- DDD offline validator passes all 54 normalized board connectivity checks and verifies that no missing target node is fabricated.
- All 1,285 entry IDs and 263 recipe IDs, including ordering, remain unchanged from the prior checkpoint. Generation is byte-deterministic.
- New tests cover the three custom-input collisions, named-recipe ownership/action distinction, source-reported versus reciprocal-only graph, five-Brilliant material budget, repeat-farming steps, seven objective examples and aggregate-achievement instructions.
- Current report links resolve; `git diff --check` passes. No shared test, other-game content or tracked build output changed.

Publication is coordinated by the parent through the authenticated connector and is currently awaiting its existing approval; this report does not claim a remote push. No manual game playthrough, binary inspection or uninspected board screenshot is claimed. Existing collectible IDs, recipe IDs and empty Data Jiminy remain unchanged.
