# KH1FM remaining-gap investigation — 2026-10-02

**Subsequent integration:** [2026-10-02 practical research results](research-integration-2026-10-02.md) supersede the residual statuses below for 002, 014, 018 and 020. Earlier investigation text is preserved as history, not the active backlog.

> Subsequent user decision, 2026-10-02: KH1-001 is closed at +4 Defense. Current KH1 totals are 12 closed, 6 partial and 2 unresolved. The dated investigation below preserves prior evidence; see the current resolution ledger.

Scope: vanilla modern Steam KH1 Final Mix, app 2552430. Starting ledger: 10 closed, 6 partial, 4 unresolved. Reopened IDs: KH1-001, 002, 003, 004, 005, 010, 014, 015, 018, 020. Progress IDs remain stable; Data Jiminy stays empty.

This checkpoint records scope before research. The investigation will prioritize implementation documentation, original tables, localized footage and reproducible evidence over repeating guide consensus. Modified randomizer files cannot prove vanilla behavior. New results and precise residuals will be added below; no finding is closed at this checkpoint.

## Checkpoints

- Initial scope published on `research/finish-kh1fm-gaps-2026-10-01`; validation not yet run. Coordinator owns integration into master.

## KH1-004 — closed, direct visual source

The [Steam support post](https://steamcommunity.com/app/2552430/discussions/0/601893430931532381/) by Squid (13 January 2025) explicitly describes the author's swing problem and links their own [Squid Gaming footage](https://www.youtube.com/watch?v=MbRKk8JlsVw). Inspected the playing video through the browser, then paused/searched frames. At **0:03** the upper-left HUD reads **0 m**; at **0:38** it reads **7 m**. These are direct visible unit observations, not an inference from guide terminology. Canonical Cheer target is now **40 m**; the numeric threshold remains unchanged.

Platform provenance is the uploader's contemporaneous post in app 2552430's Steam discussion, bearing ownership of that app and explicitly linking their footage. The video itself does not expose a Steam executable build or depot identifier; neither posting date nor controller glyphs are used to infer a build. This closes the source-backed display-unit question at the same documentary standard as other current facts, not executable certification. The earlier yards prose loses to the observed HUD. No full video is redistributed.

## Fresh technical evidence inspected

Repositories were cloned read-only into scratch. No upstream code or game/mod executable was run.

| Source / pinned revision | Inspected surface | Result |
|---|---|---|
| [ethteck/kh1](https://github.com/ethteck/kh1/tree/0df3b6586d2d0b4dab39d1eb7e9859c464934e19) | README supported versions; `src/`, `include/`, `xbeginning.c`, `xapple.c` | Decompilation targets original Japanese and PS2 Japanese FM ELFs, not Steam. Sources contain many unnamed/nonmatching functions. No identified equipment-effect decoder, questionnaire selector, Bambi charge predicate, critical-HP rule or Phil persistence field was recovered. Do not equate `xbeginning`'s filename with the awakening questionnaire. |
| [OpenKH/OpenKh](https://github.com/OpenKH/OpenKh/tree/7a3b945c538d32c6a285128c98aefba093f52ceb) | `OpenKh.Kh1/`, `docs/kh1/`, inventory/model dictionaries, builds table | KH1 parsers cover archives, models and weapon geometry; inspected surface has no accessory-effect/stat or save-eligibility parser. Builds table stops at PS4 and does not supply a Steam executable hash. KH2 battle/item classes are not KH1 evidence. |
| [Denhonator/KHPCSpeedrunTools](https://github.com/Denhonator/KHPCSpeedrunTools/tree/0248adb3e7ffe9cb17b59a9d88eed974e79be885) | `LoadRemovers/KH1.asl` lines 75–148, 1480–1528, 1730 onward; `1FMMods` scripts | Explicit Steam Global/JP `1.0.0.2` address maps expose pause, menu, equipment inventory, scene, and load fields. `isLoading` controls LiveSplit's external timer: it does **not** specify Speedster's native clock. Equipment inventory is not an equipment-change eligibility flag. No inferred Steam achievement behavior was imported. |
| [Yokimitsuro/Kh1HexEditor](https://github.com/Yokimitsuro/Kh1HexEditor/tree/8506b7038d77722fdd37b9339046f21e1e81af95) | README and C#/data inventory | Text-sequence/translation editor, not a labeled accessory-stat or achievement/save decoder. It needs user-supplied binary files and a character table. |
| [gaithern/KH1FM-RANDOMIZER](https://github.com/gaithern/KH1FM-RANDOMIZER/tree/57e701fccc71fc2220d83a86eace198a08136ff9) | Newly inspected `Static Files/scripts/1fmRandoBambi.lua`, definitions and equipment script inventory | Bambi Lua locates its model and overwrites drop entries, not charge eligibility. Definitions label Three Stars but do not provide its Defense effect. This revision matches the prior pass; these additional files do not turn modified data into vanilla evidence. |

## Remaining finding dispositions

**One new closure; current total 11 closed, 6 partial, 3 unresolved.** All ten starting IDs were investigated. The nine remaining findings are not completed.

| ID | Outcome and new investigation | Exact missing evidence |
|---|---|---|
| KH1-001 | Unresolved. New decomp/OpenKH/hex-editor routes above failed to yield a labeled original effect. Image search returned synthesis menus, a translation list and modded stat charts, not a vanilla Three Stars equip-delta screenshot. [Thorf's original FM changes FAQ](https://gamefaqs.gamespot.com/ps2/516587-kingdom-hearts/faqs/21270) explicitly reports +3→+4, strengthening the PS2-FM side but not adjudicating modern +3 prose. | Vanilla modern PC equipment screen showing the Defense delta, or original effect bytes with a verified decoder/build. |
| KH1-002 | Unresolved. [PC player's completed-games report](https://www.reddit.com/r/KingdomHearts/comments/16a3a7k) specifically says first End of the World cutscene. It predates Steam and corroborates that route without disproving an earlier condition. Inspected speedtools scene fields and randomizer reward labels; neither is the Unknown spawn predicate. | Original room-event condition or an observed earliest-unlock comparison across sealing Hollow Bastion, first EotW scene and Final Rest. |
| KH1-003 | Partial. Newly pinned Steam address maps distinguish native scene/pause/menu state from LiveSplit's chosen timing policy; see technical table. New [PS3 equipment discussion](https://gamefaqs.gamespot.com/boards/684080-kingdom-hearts-hd-15-remix/68609915) warns against Tarzan changes but explicitly bases that on recollection of another post. This is not a Steam flag test. | Native restricted-run flags, guest/manual/scripted exceptions, native menu-by-menu clock rule and save/system persistence. |
| KH1-005 | Partial. Newly located [falconesque missable FAQ](https://gamefaqs.gamespot.com/ps2/516587-kingdom-hearts/faqs/60777) explicitly describes improving a time visible only during training. This is an original-PS2 guide, not proof of Steam saved persistence. Current no-further-reward guidance stays. | Steam replay result before/after a save reload, or identified saved best-time fields; no assumption that absence from Journal means absence from save. |
| KH1-010 | Partial. Newly inspected Bambi runtime Lua edits drops only. OpenKH model dictionary identifies `xa_ex_4030.mdls` but not its defeat eligibility. Wiki talk-page probe returned 404. No complete exclusion predicate was recovered. | Exhaustive vanilla qualifying-enemy predicate/list and all charge/drop modifiers; retain only documented Gigas exclusion. |
| KH1-014 | Partial, narrowed research lead. Recovered the complete indexed [ElectroSpecter Vine Jump section](https://gamefaqs.gamespot.com/ps4/200737-kingdom-hearts-hd-i5-plus-ii5-remix/faqs/19404), previously inaccessible. It explicitly gives a shared route and course differences. [HD walkthrough](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-15-25-ReMIX/walkthrough/9) corroborates the two-room route, not each vine/snake. Detailed legacy directions are recorded below for future comparison, not silently certified on Steam. | Modern FM four-course footage or geometry confirming the exact links, hazards and final manual jump. |
| KH1-015 | Unresolved. Decomp opening-code investigation did not identify the answer selector. [Additional legacy FAQ](https://www.neoseeker.com/kingdomhearts-final/faqs/94675-kingdom-hearts-i.html) only specifies all-same answers. No mixed-answer algorithm established. | A modern 27-case observed table or original answer-selector implementation with verified character/answer ordering. |
| KH1-018 | Partial. Fresh decomp/speedtools scans did not identify the MP recovery or critical-HP implementation. Direct MP Haste and Berserk wiki talk pages returned 404, so no editorial adjudication recovered. The prior +12 experiment remains one research lineage and cannot be promoted to independent corroboration. | Steam MP Haste constant/formula and the inclusive critical-HP boundary, especially max HP exactly 40. |
| KH1-020 | Partial. Finished the accessible remaining semantic comparison queue: 642 cells, 787 clause decisions with current entry IDs, values and source citations. See [semantic review](legacy-semantic-review-2026-10-02.md). Legacy errors were already corrected in current data, so no new runtime changes. | Three quarantined optional Trinity route qualifiers lack explicit corroboration; actual inspected Steam binary/depot/build provenance remains unavailable. |

### Recovered legacy Vine Jump lead (KH1-014)

The ElectroSpecter route crosses the first chain, turns left to another, continues straight to the next, then turns right to reach Vines 2. There, cross the initial chain and remount the last vine from the landing platform to continue toward the finish. It says all courses follow that route. Trap introduces slippery ropes; Acrobat has tight dismount windows and a final manual jump where the dismount command is unavailable; Expert tightens both transfer/dismount windows and uses slippery ropes throughout. This materially improves the research lead, but the FAQ is explicitly PS2 even when indexed under PS4. The new evidence does not yet justify claiming each modern layout was checked.

## Validation and publication

- KH1 reference importer passes: 788 reference entries, 33 recipes; content generator validates 1,259 total entries and 26 coverage groups.
- Stable ID set and inventory counts are unchanged. Only the existing swing record's target/source/uncertainty fields changed in canonical and generated runtime data.
- Content tests pass (3/3); canonical/runtime equality and stable-ID checks pass with exactly one changed existing record.
- `git diff --check` passes. Coordinator runs integrated whole-project checks and refreshes the deliberately empty Jiminy pack for the changed content hash.
- Initial scope: `1dfa184`; direct visual KH1-004 correction: `de468084801417c5ad8737c820410e050967103d`, verified present on origin. Further ledger/evidence checkpoint follows.

### Semantic-audit follow-up checkpoint

Completed all 154 prose/phase comparisons, 396 abbreviated/empty comparisons and exact location/reward mapping for all 46 Trinity groups. The companion records 787 clause decisions across 642 cells, with current IDs/fields and source catalog; three exact optional route qualifiers are quarantined. No supported missing runtime correction emerged: the wrong legacy stats, drops and FM routes/rewards are already corrected in canonical content. Both audit generators pass; semantic output is byte-idempotent, every evidence ID/source resolves, content tests pass 3/3, and diff whitespace checks pass. Runtime IDs/data and refreshed empty Jiminy artifacts remain unchanged. This checkpoint adds no newly closed finding; current totals remain 11 closed / 6 partial / 3 unresolved.
