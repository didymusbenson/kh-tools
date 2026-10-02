# Kingdom Hearts 0.2 readiness

2026-10-02: Steam native achievement mapping is complete (15/15); current ledger is 11 resolved, 6 partial, 1 blocked. [Closure evidence and exact residuals](../games/kh02/gap-closure-2026-10-02.md).

2026-10-01 current state: 177 generated entries retain 55 physical finds, 51 objectives, 51 wardrobe rewards and 15 achievements; corrected routes, predicates and Steam mechanics are integrated. Data Jiminy remains empty. See [all current per-ID dispositions](../games/kh02/audit-dispositions.md).

Updated 2026-10-01: **Generated runtime integrated; bounded documentary gaps remain.** The current ledger has 11 resolved, 6 partial and 1 blocked finding. Shared application acceptance remains root-owned.

Specification: [Kingdom Hearts 0.2](../games/kingdom-hearts-02.md) · [Research pack](../games/kh02/README.md). Apply the [shared readiness method and edition policy](./README.md) and [collectible compendium/linked views contract](../content/collectible-compendium-and-linked-views.md). All specified content and features remain MVP.

## Confirmed direction

- Independent Aqua-only game/objective/progress namespace, grouped under BBS; 2.8 is collection membership only.
- Compendium for locating/acquiring things, with compact per-area marks and detailed location rows sharing one saved record. Story/biography flags do not count toward world collectibles.
- Separate objective, wardrobe, optional-challenge and platform-achievement tracks; complete text guidance, persistent offline progress and direct Data Jiminy answers.
- React offline PWA, bundled local SLM plus versioned 0.2 Coppermind, backup/restore and update-safe progress remain MVP.
- Only unavailable production screenshot/map image assets are deferred. Text guidance, media support and tests remain required.
- Fully spoilerific, with no warnings, hidden entries or reveal controls. No Available Now/progress-gate filter or tracking; retain written prerequisites.
- User platform: Steam. Initial app acceptance targets Apple browser/iPhone/iPad; Android follows. [App testing/content validation](../testing-and-content-validation.md) requires functional tests and documentary checks, not a manual game playthrough.
- Optional [crafting inventory](../content/synthesis-and-inventory.md) is N/A for 0.2; do not import BBS melding or invent synthesis.

## Evidence and actual coverage

The historical September 18 source inventory had no 0.2 dataset. The current canonical Markdown/JSON inputs generate 177 runtime entries. The parallel BBS researcher read the actual BBS workbook ranges and confirmed they contain BBS recipes/crystals/commands, not 0.2. This absence is bounded to inspected sources, not all private files. See the [coverage manifest](../games/kh02/sources-and-gaps.md) for exact ranges, blobs and delegation attribution.

| Category | Candidate expected / documented | Status and next evidence |
|---|---|---|
| Ordinary chests | 29 / 29 | Missing/partial: all 29 rows reviewed; staircase Ether route resolved; only save-point Ether/Mega-Ether and northern Potion/northwest Hi-Potion joins remain disputed |
| Zodiac chests | 12 / 12 | Missing/partial: full relic inventory, clear/NG+ rule; Pisces initial-entry approach resolved |
| Gems | 7 / 7 | Missing/partial: all text routes; recovery/retention not verified |
| Flowers | 3 / 3 | Missing/partial: all text routes; Green/Blue/Red and subareas integrated |
| Lingering Memories | 4 / 4 | Missing/partial: one per area; town building and Forest spindle label resolved |
| Objectives | 51 / 51 | Missing/partial: every objective/unlock/reward, with threshold/predicate discrepancies |
| Earned wardrobe | 51 / 51 | Integrated: 12 Head + 9 Arms + 9 Back + 21 Pattern; aliases and objective-to-reward joins validated; disputed objective predicates remain explicit |
| Zodiac Mirror | 5 rounds / 5 | Missing/partial: encounter roster and unlock route; strategy/build checks remain |
| Platform goals | 15 / 15 | Missing/partial: all 15 goals and 14 observed Steam API key mappings; Into the Depths of Darkness key remains unassigned; other-platform native IDs/tiers unverified |
| Combat/mechanics references | No certified exhaustive denominator | Missing/partial: required mechanics identified, gear timing, defensive defaults, Critical survival/healing exceptions and Steam Finish behavior integrated; numeric boss stats remain incomplete |

The physical collectible baseline is **55**, with area grouping **11/21/16/7**. It is an explicit app metric, not official Journal 100%. Chest objectives use **9/13/12/6**, with the Main Road chest separate; total chests **41**. Numbers reconcile arithmetically but do not prove in-game validation. UI must not present an uncertain inventory as certified complete.

## Readiness gates

| Gate | Status | Evidence / required next work |
|---|---|---|
| Modern editions and differences | Missing/partial | Official Steam/Epic/Nintendo listings and 2026 announcement inspected. Native 2026 editions unreleased at audit; validate after shipment. |
| Inventory/counting contract | Missing/partial | Full candidate collectible/objective/wardrobe sets; exact route identity and replay checks still required. |
| Legacy extraction | Verified, bounded absence only | Supplied inventory + complete repo tree + delegated BBS workbook ranges contain no 0.2 data. This does not verify new gameplay facts. |
| Locations/prerequisites/provenance | Missing/partial | Text rows and manifest are integrated; the current KH02-001–018 disposition ledger supersedes historical KH02-R01–R13. Resolve the two remaining Forest joins and documented replay/predicate gaps. |
| Game-specific tools | Missing/partial | Generated objective/reward joins and guide integration exist; root-owned application acceptance remains separate. |
| Offline progress, backup and updates | Missing/partial | Stable IDs and run-state requirements are documented; root owns shared persistence integration and functional test results. |
| Coppermind and Data Jiminy | Missing/partial | Sources and 12 grounded evaluation cases documented; Data Jiminy remains empty by the current task instruction. |
| Mobile UI/accessibility | Missing/partial | Guide integration exists; 0.2 visual inspiration is pending and root owns mobile/accessibility acceptance. |
| App acceptance and content checks | Not audited | Targeted generation, stable-ID/count validators and route/predicate checks pass; root owns combined application acceptance. No mandatory game playthrough. |

**Implementation exists:** current generated catalog and guide integration are in place. Ambiguous IDs/conditions cannot be silently frozen as verified content. **Ready to ship:** no; documentary content gaps and root-owned functional acceptance remain. Data Jiminy stays empty in this task.

## Research and engineering queue

- [ ] Resolve source disputes: objective13 30/50 lightning kills and exact31/50 replay/boss predicates. Ice Breaker, mirror reflection and aliases are resolved.
- [ ] Resolve the two remaining Forest content joins: save-point Ether/Mega-Ether and northern Potion/northwest Hi-Potion. The staircase Ether route, pillar pairing, Pisces, memory positions and flower colors are resolved.
- [ ] Verify cleared-save travel, gem recovery, counter retroactivity and per-record NG+ carry/reset; preserve distinct run and permanent ownership state.
- [ ] Resolve uncertified Phantom Aqua numeric stats; other-platform native mappings are separate scope. Defensive defaults and all 15 Steam key mappings are integrated. Verify announced native editions only after availability.
- [x] Generate researched definitions with provenance, stable IDs, aliases, area order and explicit unknowns.
- [ ] Implement synchronized compact/detail/search/Data Jiminy state, offline persistence, import/export, undo, rollback/retry and safe migrations.
- [ ] Build/evaluate the bundled Coppermind and local SLM answers; source disagreements must produce qualified answers.
- [ ] Verify mobile accessibility and text navigation without images, then add available media without changing identities.

No exhaustive plot walkthrough or biography update manifest is a blocker. The full gap register distinguishes research tasks from user decisions.

## User decisions and answer log

The original stub contained no question IDs or readiness answers. Confirmed scope above comes from the accepted shared direction, not newly invented answers.

| ID | Question / proposed default | Impact | Answer / status |
|---|---|---|---|
| KH02-U01 | What visual references should shape the distinct 0.2 treatment? Keep the approved BBS-family placement and shared layout contract while awaiting inspiration. | Visual skin only; does not block content research or authorize an unapproved theme. | Awaiting inspiration; do not repeatedly ask during research. |

Gameplay thresholds, replay rules and platform lists are research questions for the team, not decisions to offload to the user.

## Acceptance evidence required

1. Toggle one chest through compact index, detail, search and Data Jiminy; each view and saved state agrees after offline relaunch.
2. Zodiac/category/reward links refer to the same physical acquisitions; objective or story-state changes cannot inflate world percentages.
3. Remaining/area filters retain full denominators; Main Road and post-clear items remain accounted for.
4. Reorder/rename/update definitions and import a backup without losing progress; keep BBS, 0.2, run and platform scopes distinct.
5. Check text-route completeness with images absent; reconcile documented route/condition conflicts using sources. Manual gameplay is not an acceptance gate.
6. Demonstrate all 51 objective definitions and 51 reward joins, including Critical #51 and specific story-boss restrictions.
7. Pass the grounded Data Jiminy cases with source/version context and honest answers for unresolved facts.

These are required future validations, not claimed completed tests.

## UI reference follow-up — October 2, 2026

**KH02-UI-REF-01 — Open, owner: user.** [Three supplied UI Database screenshots](../ui/references/kh02/README.md) cover Objectives and two Story views. The user regards this as weak coverage and will provide additional screenshots later (no date set). Keep this reference-coverage gap open; receipt of these files does not complete custom styling or visual acceptance.
