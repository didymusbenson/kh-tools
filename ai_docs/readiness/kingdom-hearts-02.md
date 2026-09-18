# Kingdom Hearts 0.2 readiness

Status: **Missing/partial — substantive research complete for a candidate baseline; not ready to ship.** Audit date: 2026-09-18.

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

The supplied KHTABLES inventory has no 0.2 source; the full repo tree and existing BBS placeholder contain no 0.2 data/implementation. The parallel BBS researcher read the actual BBS workbook ranges and confirmed they contain BBS recipes/crystals/commands, not 0.2. This absence is bounded to inspected sources, not all private files. See the [coverage manifest](../games/kh02/sources-and-gaps.md) for exact ranges, blobs and delegation attribution.

| Category | Candidate expected / documented | Status and next evidence |
|---|---|---|
| Ordinary chests | 29 / 29 | Missing/partial: full inventory, several contents-to-route joins unresolved |
| Zodiac chests | 12 / 12 | Missing/partial: full relic inventory, clear/NG+ rule; Pisces approach wording unresolved |
| Gems | 7 / 7 | Missing/partial: all text routes; recovery/retention not verified |
| Flowers | 3 / 3 | Missing/partial: all text routes; color and exact subarea cross-check needed |
| Lingering Memories | 4 / 4 | Missing/partial: one per area; precise town building and Forest object label need validation |
| Objectives | 51 / 51 | Missing/partial: every objective/unlock/reward, with threshold/predicate discrepancies |
| Earned wardrobe | 51 / 51 | Missing/partial: 12 Head + 9 Arms + 9 Back + 21 Pattern; localized alias and runtime unlock joins need validation |
| Zodiac Mirror | 5 rounds / 5 | Missing/partial: encounter roster and unlock route; strategy/build checks remain |
| Platform goals | 15 / 15 | Missing/partial: Steam names/visible text primary; hidden text/scores community, other platform IDs/tiers absent |
| Combat/mechanics references | No certified exhaustive denominator | Missing/partial: required mechanics identified, exact acquisition timing/strategy fixtures incomplete |

The physical collectible baseline is **55**, with area grouping **11/21/16/7**. It is an explicit app metric, not official Journal 100%. Chest objectives use **9/13/12/6**, with the Main Road chest separate; total chests **41**. Numbers reconcile arithmetically but do not prove in-game validation. UI must not present an uncertain inventory as certified complete.

## Readiness gates

| Gate | Status | Evidence / required next work |
|---|---|---|
| Modern editions and differences | Missing/partial | Official Steam/Epic/Nintendo listings and 2026 announcement inspected. Native 2026 editions unreleased at audit; validate after shipment. |
| Inventory/counting contract | Missing/partial | Full candidate collectible/objective/wardrobe sets; exact route identity and replay checks still required. |
| Legacy extraction | Verified, bounded absence only | Supplied inventory + complete repo tree + delegated BBS workbook ranges contain no 0.2 data. This does not verify new gameplay facts. |
| Locations/prerequisites/provenance | Missing/partial | Text rows and manifest exist; resolve KH02-R01–R13 before certifying affected records. |
| Game-specific tools | Missing/partial | Objective/reward join, area filters, replay scopes and challenge predicates specified; no implementation. |
| Offline progress, backup and updates | Missing/partial | Shared contract mapped to IDs/run state; no 0.2 persistence integration or tests. |
| Coppermind and Data Jiminy | Missing/partial | Sources and 12 grounded evaluation cases documented; no bundled pack/SLM integration/evaluation run. |
| Mobile UI/accessibility | Missing/partial | Linked-view behavior specified; 0.2 visual inspiration pending, no implemented/audited UI. |
| App acceptance and content checks | Not audited | No app walkthrough/test run performed; require functional tests and documentary route/condition reconciliation, without a mandatory game playthrough. |

**Ready to start implementation:** schema/UI scaffolding and research reconciliation can proceed using these contracts. Ambiguous IDs/conditions cannot be silently frozen as verified content. **Ready to ship:** no; documentary content gaps, production content integration and offline/SLM/UI acceptance remain.

## Research and engineering queue

- [ ] Resolve source disputes: objective 13 30/50 lightning kills, objective 15 simultaneity, mirror reflection correction, localized aliases and exact boss predicates.
- [ ] Validate World Within paired chest contents, Forest contents/landmarks, Pisces staircase state, memory positions and flower colors.
- [ ] Verify cleared-save travel, gem recovery, counter retroactivity and per-record NG+ carry/reset; preserve distinct run and permanent ownership state.
- [ ] Complete 0.2 combat/acquisition references and platform mappings; verify announced native editions only after availability.
- [ ] Convert researched definitions into validated structured content with provenance, IDs, aliases, area order and explicit unknowns.
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
