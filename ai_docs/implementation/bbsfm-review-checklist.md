# Birth by Sleep — review and approval checklist

Created September 28, 2026 for the working BBS implementation. **Structure is accepted; visual fidelity, final artwork and complete content coverage are not yet approved.**

Use this as your review queue. Check an item when it meets the stated expectation; record needed changes using its ID in the notes table below. An unchecked item means pending review, not necessarily broken. Approving a screen's appearance does not certify its data.

## Start here

- [Open BBS home](http://127.0.0.1:4173/#/bbsfm/home)
- [Open Command Melding](http://127.0.0.1:4173/#/bbsfm/melding?character=Aqua)
- [Open Aqua's Reports](http://127.0.0.1:4173/#/bbsfm/contents?character=Aqua)
- [Open Final Chapter](http://127.0.0.1:4173/#/bbsfm/final)
- [Original screenshots and sampled video frames](../ui/references/bbsfm/README.md)
- [Accepted specification and implementation status](../games/birth-by-sleep-final-mix.md)

The preview links work while the local preview server is running. If they stop working, ask Codex to reopen the BBS review build. For a short first session, start with V01–V05, M01–M04 and F01–F02.

## Visual approval — your judgment

- [ ] **V01 — Home composition.** Compare against the native character-selection screenshots: angular character rows, selected highlight/glove, title treatment and right-hand character visual should feel faithful to BBS. Record specific differences in proportions, spacing or framing.
- [ ] **V02 — Home navigation.** Final Chapter sits directly beneath Aqua. Command Melding is first among the shared options and has the same visual weight as its peers. Bestiary, Mirage Arena and Unversed Missions are easy to find.
- [ ] **V03 — Character Reports.** Review all three covers: Terra orange, Ventus green, Aqua blue; portrait/name, dark book, rings and violet menu should match the supplied references closely enough to approve.
- [ ] **V04 — Interior book pages.** Review treasures and finishers against the video samples: pale paper, ruled content, section tabs, title bands, selection cursor and footer. Check typography and content density against the KH1FM/KH2FM standard.
- [ ] **V05 — Melding menu.** Compare with the supplied player-menu screenshot. Approve the blue/cyan framing, red tabs, rounded list rows, green crystal rows and yellow calculator result panel within the requested rearranged layout.
- [ ] **V06 — Character artwork.** Choose/provide better Terra, Ventus and Aqua portraits/stage art when available, then review their crops and clarity in the app. Current screenshot crops remain approved stand-ins only.
- [ ] **V07 — Selection states.** Character pills, catalog tabs, selected commands and collected records are unmistakable. Text and symbols make the state understandable without relying only on color.
- [ ] **V08 — Phone/tablet presentation.** Review on your actual devices: text size, tap targets, scrolling, Index/Details switching and modal readability. Note any view that loses the game's character or becomes awkward to use.

### Character model candidates for V06

Located September 28 on The Models Resource, in the PSP Birth by Sleep listing. The standard Terra/Ventus pages list OBJ and SMD models with PNG textures, matching the formats of the Aqua asset supplied by the user. The directory also lists these high-poly variants. The September 28 isolated prototype inspected archives/rigging and measured converted assets. Production suitability and artwork approval remain open; see [prototype findings](bbsfm-3d-prototype.md).

| Character | Standard model | High-poly alternative |
|---|---|---|
| Aqua | [User-supplied Aqua](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283465/) | [Aqua (High-Poly)](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283381/) |
| Terra | [Terra](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283464/) | [Terra (High-Poly)](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283384/) |
| Ventus | [Ventus](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283463/) | [Ventus (High-Poly)](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/283379/) |

**Rotating selection scene candidate:** [Wayfinder Station / Character Select](https://models.spriters-resource.com/psp/kingdomheartsbirthbysleep/asset/359417/) was located September 28. Its page lists a 1.74 MB ZIP with OBJ/MTL/PNG files; the three standard character archives total roughly 0.73 MB. About 2.5 MB of source archives is encouraging, but is not a measured web payload or GPU-memory budget. The completed prototype report supersedes these preliminary archive estimates and records model/texture/pose inspection. A possible treatment is all three characters on the station, with hover/focus rotating the camera or scene to bring the selected character forward. This is a feasibility proposal, not a completed feature or approved motion design.

- [ ] **V09 — Evaluate a 3D home prototype.** Inspect geometry, texture dimensions and usable poses; convert only needed assets to a web format; measure final asset/renderer download size and phone performance. Review character-selection rotation, reduced-motion stills and static fallback. Load the renderer only for Home and stop rendering when the scene is hidden. Approve this treatment only after comparing it with the native selection reference.

Specialist agent dispatched September 28 at the user's request to inspect these assets and build an isolated working prototype. Deliverables: usable poses, selection rotation, measured asset/rendering costs, fallback behavior and a concrete preview. The existing BBS home remains available for comparison; prototype findings are available in [the report](bbsfm-3d-prototype.md); final integration and visual approval remain pending.

## Command Melding — walk through the tool

- [ ] **M01 — Catalog and character filters.** Commands are grouped by type with right-aligned availability markers. Switching character pills changes eligible commands/recipes; an Aqua session does not present Terra-only routes as Aqua's options.
- [ ] **M02 — Three-column layout.** On desktop, the scrollable catalog is left, recipes/abilities are middle, acquisition information is right. Each area remains readable while browsing a command with many recipes.
- [ ] **M03 — Forward and reverse recipes.** Select a command, inspect Recipes, then Used in. Both views show the relevant ingredients, minimum levels, outcomes and probabilities. Ingredient/result links lead to the appropriate command.
- [ ] **M04 — Ability-first lookup.** Open Abilities → Second Chance. Recipes identify the required crystal for the matching outcome. Switch characters and confirm the answer remains scoped to the selected playthrough.
- [ ] **M05 — Crystal lookup.** Select Fleeting Crystal. Its popup shows enemies, locations and known drop conditions. Enemy links open the bestiary. Missing exact rooms or character-specific routes are clearly described as incomplete information.
- [ ] **M06 — Acquisition details.** Inspect a command with a Moogle price, a documented medal purchase and a command with treasure sources. Prices identify the currency and availability conditions; enemy and chest routes are distinguishable.
- [ ] **M07 — Shared chest checks.** For Aqua's Fira, check a chest in the acquisition panel, open that chest's journal entry, then uncheck it there. Return to melding: both views must reflect the same record. Terra/Ventus checks must remain separate.
- [ ] **M08 — Calculator and stock.** Try Fire + Fire: insufficient levels should not produce a valid result; eligible levels should show the documented output and crystal ability. Check a rare-Shotlock ownership exception. Planning ingredients or recording a past meld must not consume stock.
- [ ] **M09 — Inventory and farming plan.** Enable counts, enter a quantity, wait for Saved, and reload. Hide/re-enable counts without losing them. Add ingredients to a plan, switch characters and return; stock and targets must stay with their character.

## Character journals, shared guides and episodes

- [ ] **J01 — Character preview and entry.** Hover or keyboard-focus Terra/Ventus/Aqua on Home. Artwork swaps without navigating; activating a row opens the correct character's Reports.
- [ ] **J02 — Personal collections.** Spot-check treasures, stickers, Keyblades, commands and reports under each character. Locations, counts and completion checks should belong to that playthrough.
- [ ] **J03 — Shared access, separate progress.** Open Mirage Arena and Unversed Missions from Home. Their guides are easy to access, but completion remains character-specific and known route/reward exceptions are visible. Bestiary reference rows should not inflate collectible totals.
- [ ] **J04 — Final Chapter.** Review the Final Episode/Secret Episode chooser and naming. Their collections stay separate from Aqua's main story; inspect Brightcrest, Master's Defender and the eight Secret Episode chest records.
- [ ] **J05 — Finding records.** Use world/category navigation, search, completion filters and pagination. Filtering the visible list must not imply that the full collection denominator has changed. Back/Home should return somewhere sensible.

## Finish Commands

- [ ] **F01 — Journal details.** Finishers appear as named collectibles for the selected character. Details state prerequisite finishers first, then the unlock condition, including alternative parents and the equipped-parent requirement where applicable.
- [ ] **F02 — Chart presentation.** View chart opens a readable fly-in diagram built from code. Review branch routing, labels, selected/acquired states and horizontal navigation. Selecting a node opens its details; closing returns focus to the trigger.
- [ ] **F03 — Shared state, separate characters.** Mark a finisher acquired and confirm the chart reflects it. The same-named finisher for another character remains independent. No unsupported automatic gameplay-counter tracking/reset behavior is implied.

## Save and device confidence

- [ ] **S01 — Return later.** Make a few recognizable checks/count edits, reload and reopen the app. Confirm they remain in the correct character and episode.
- [ ] **S02 — Backup round trip.** With a disposable test profile, export a backup and verify that restoring it preserves checks, quantities and plans. Record anything the backup does not restore as expected.
- [ ] **S03 — Offline and updates.** After opening the app online, reopen it offline and visit the main BBS screens. Confirm expected records/artwork load and existing progress survives loading an available app update.
- [ ] **S04 — Keyboard and accessibility.** Navigate without a mouse, open/close dialogs with the keyboard and check visible focus. Review reduced-motion behavior and device text sizing if you use them. Actual Safari/iOS behavior still deserves a device check.

## Research/implementation follow-ups to hand back to Codex

These are tracked work items for the researcher/developer, not a request for you to replay the game or personally audit every row. Flag priorities or examples during review; source reconciliation remains our work.

- [x] **D01 — Apply corroborated meld corrections.** Corrected and regenerated October 1: 468 complete groups, restored output identities and attached abilities. The exact minimum Ignite level remains a separate narrow question; see [resolution log](../games/bbsfm/research-resolution-2026-10-01.md).
- [ ] **D02 — Complete command acquisitions.** Finish the catalog/eligibility audit, both shop channels, enemy drops, chest routes and other rewards. “Not documented” must not be interpreted as “impossible to obtain.”
- [ ] **D03 — Complete drop and location evidence.** Expand the bestiary and exact encounter rooms; verify character and world-versus-Arena exceptions. Finish save-point paths where published landmarks are insufficient and independently certify Reports ordering. All 374 main chest source rows and all 60 sticker pickup/album placement notes are integrated. Secret Gem is resolved to Lower Zone.
- [ ] **D04 — Reconcile progression predicates.** Resolve Arena gates/rewards, mission thresholds, episode unlock conditions, achievement aggregation and any remaining finisher-counter uncertainties. Keep shared definitions separate from character-owned progress. See the [scope matrix](../research/bbsfm-category-scope-matrix-2026-09-28.md).
- [ ] **D05 — Reconcile the original crafting tool.** Compare the working app against the original Drive workbook/tool's useful behavior. The latest research located the workbook but did not freshly inspect/execute its formulas or bound scripts; do not treat functional parity as certified.
- [ ] **D06 — Close broader acceptance gaps.** Audit the [full specification](../games/birth-by-sleep-final-mix.md#current-blockers-and-acceptance) against this review build, including any required atomic consume/undo workflow. The current calculator previews results; historical checks and plans do not perform inventory transactions.

## Review notes and decisions

Add rows as needed. Use **Approved**, **Needs changes**, **Question**, or **Retest**. Include character, screen and device when reporting an issue; attach a reference or screenshot if useful.

| Item ID | Date | Result | Notes / requested change | Follow-up |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |

## Approval record

Already accepted: the overall navigation/interaction structure, character-first organization, Final Chapter beneath Aqua, equal-weight shared menu with Command Melding first, character pills, three melding tabs/columns, and journal finisher details with a coded popup chart. No need to re-decide these unless review reveals a concrete problem.

- [ ] **A01 — Visual presentation approved**, with any remaining asset exceptions recorded above.
- [ ] **A02 — Interaction review complete**, with required corrections retested.
- [ ] **A03 — Content gaps reconciled and release readiness reviewed**, with remaining limitations explicitly recorded. This is separate from visual approval and does not authorize deployment by itself.

Implementation baseline reported September 28: production build, 99 unit tests and 10 BBS desktop/mobile browser checks passed, including offline reopening and saved-state isolation. This is automated regression evidence, not final visual approval, exhaustive content certification or an actual Safari/iOS device test.
