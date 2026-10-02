# KH2 Final Mix gap investigation — October 2, 2026

Starting IDs: **KH2-003, KH2-006, KH2-019**. Target: shipped English Steam Final Mix. The initial scope checkpoint was `f687031`. This pass resolves one precise puzzle locator and adds script-derived explanations; it does **not** close any entire finding. Current ledger: **31 closed, 3 partial, 2 implementation, 1 provenance, 1 confidence, 1 platform, 1 excluded**. The six nonfactual limitations KH2-022/036/037/038/039/040 remain separate.

| ID | Actual progress | Exact residual |
|---|---|---|
| KH2-003 | Daylight 27 roof/pillar conflict resolved by inspected HD gameplay; three Mineshaft physical positions now observed | Sunset 32/36/40 per-ID bindings remain uncertified: footage labels final two together and does not show board slot IDs; first pickup was already collected in the author's save |
| KH2-006 | Public fixture history, OpenKH tree and executable-decomp shop source inspected | Original vanilla shop payload, event-ID meanings, room/shop-spawn predicates and Steam verification missing |
| KH2-019 | All14 numbered object scripts inventoried, including VI_SU; HP floors, XII Thunder write and XIII fall-down override traced | Full effective phase/control-flow model, external initialization, XIII base-sheet mapping and Steam asset parity missing |

## Actual puzzle imagery (not just chapter metadata)

The signed storyboard URL discovered in the retrieved video HTML still failed in the web image reader. Unlike the earlier pass, the actual YouTube player worked in the browser. Paused gameplay frames from [Anti-Hero Gaming's HD 2.5 part1](https://www.youtube.com/watch?v=RtYZ9YOpJEU) were visually inspected:

- **01:04:** Sora passes the synthesis shop's frontage at ground level.
- **01:07:** the crown floats over its circular tan roof ledge immediately beside the tall gray central pillar and colored pipes. It is not on the pillar's high top.
- **01:09:** the same ledge/pillar remains visible with the Daylight acquisition banner. The video's overlay has already advanced to #3; this is not a third Daylight piece. The preceding #2 segment and acquisition banner identify the pickup.
- **06:28:** in the white-orb Glide section, the author marks the first pipe opening with an arrow and explicitly says this crown had already been collected. This is an author locator illustration, not an observed live pickup.
- **06:30:** another crown is visible inside a rectangular pipe opening. The overlay groups **#22 &23**.
- **06:32:** the acquisition banner appears over the far landing beside the doorway to Transport to Remembrance. The grouped overlay remains.

Thus the roof and central-pillar descriptions for Daylight 27 concern adjacent parts of the same structure. Its canonical/runtime route now names both precisely and removes the old disagreement. The three Mineshaft positions are more concrete than the former generic sweep, but they do not by themselves establish which board IDs 32/36 correspond to the last two positions. The current [KHWiki Puzzle table](https://www.khwiki.com/Puzzle) says Sunset40 is first, but the video does not independently show that board ID. This pass retains uncertainty instead of assigning slots by elimination.

The older [SuperCheats mirror of Thundaka](https://www.supercheats.com/playstation2/walkthroughs/kingdomheartsiifinalmix-walkthrough06.txt) uses different numbered puzzle lists (for example its Puzzle6 #32 is Twilight Town #9). Those numbers cannot be silently substituted for this app's board IDs. The previously suggested part3 video was retrieved in full HTML: its description covers Port Royal, Halloween Town, Space Paranoids, TWTNW and assembly; the Cavern footage is actually in **part1**, 06:21–06:33. TrueAchievements direct HTML returned a challenge page rather than its illustrations. No Steam playthrough or new Steam screenshot is claimed.

## Vanilla shop investigation

This pass downloaded and inspected the full recursive [OpenKH repository tree](https://api.github.com/repos/OpenKH/OpenKh/git/trees/master?recursive=1). It has the shop parser and dictionary, but no shop binary test fixture. The existing [format specification](https://openkh.dev/kh2/file/type/03system.html) describes **21 shop entries, 333 inventory entries, 404 products**, and separate menu-unlock flags, inventory event IDs and stock-sharing bitmasks. That is materially different from the previously decoded randomizer payload (21 shops, 38 inventory groups); its contents remain rejected as proof of vanilla progression.

The [randomizer file history](https://api.github.com/repos/tommadness/KH2Randomizer/commits?path=static/shop.bin&per_page=100) contains a single introduction, [`bc244b1`](https://github.com/tommadness/KH2Randomizer/commit/bc244b1a33ff3ce9667965cd3be88ff794af44c7), whose message includes “started shop rando.” There is no earlier vanilla revision of that path to recover from this history.

A fresh clone of [GovanifY/kh2 at `8b5bc47`](https://github.com/GovanifY/kh2/tree/8b5bc4790ac3fe951ffaf15b6933d186ebab7a43) was searched and inspected. Its README identifies the **PS2 Japanese Final Mix SLPM_666.75** target and executable SHA256 `d869ce4b8edd61cb978c4ff9ede595fe4d7d7b21cbb96a145275217120d8bc87`. However `src/tozawa/ishop_info.cpp` is only an include, its header declares `GetShopTbl`, `GetSpecialty` and `AddItemData`, and `src/common/shop.cpp`/`src/ovl_shop/shop.cpp` contain declarations, not implementations. Those files cannot resolve event or room predicates. This is a new inspected technical source, not an unsupported claim that decompiled shop logic was executed.

To close the exact residual requires the original `shop` entry from an identified vanilla `03system.bin`, its item/event mappings, the scripts/spawn conditions selecting each room's shop, and either Steam observations or proven byte/behavior parity. A shop table alone would not prove that a vendor is present in every story phase. No new shop rule was put into the app because none was established; existing first-vendor and Dark Anklet guidance remains.

## Complete available Mushroom callsite census

The fresh clone of [thundrio-kh/kh2-ai-decomp](https://github.com/thundrio-kh/kh2-ai-decomp/tree/b89a02966494aab1b5feeb80a75e503fd6d80e93) matches the earlier pinned commit. [Machine-readable audit](mushroom-script-audit-2026-10-02.json) records every numbered script's hash, line count and every sheet/HP getter, setter and sheet-selection callsite. Coverage is **I–XIII plus VI_SU, 14 files**, not the previous four samples. The unnumbered M_EX350 file is a failed-decode placeholder, explicitly listed by the repository README; it is not an extra fully inspected actor. The README does not identify the extracted asset build or hashes. The accompanying syscall C contains `hd25` source paths, so this is published HD-era disassembly evidence, not a Steam extraction.

The following were traced through their stack arguments and available syscall definitions:

| Scripts | Verified operation | Interpretation limit |
|---|---|---|
| I | `set_min_hp(max_hp,0)` at line 2146 | Base 1 HP is not a one-hit defeat promise |
| II/III/IV/VI/VI_SU/VIII/IX/XI/XII | `set_min_hp(1,0)` | Phase-local floor; not a universal challenge counter |
| I–XII | Element6 writes0 and100 exist in each object script | State changes require a control-flow model; not a single permanent vulnerability |
| XII | `move_warp` callback L7471 writes element 3 rate 0 at line 3790 | Thunder is disabled by this callback; do not claim permanent immunity |
| V | Recovery helper L495 checks motion 201, HP above minimum and local flag 112, resets timer to 2 and adds 3 HP | Timer uses `trap_frametime`; no unsupported modern frames-per-second conversion |
| X | Stores/restores HP, sets minimum to current HP, clears minimum to0 in a damage-reaction branch | One scalar does not capture the phase behavior |
| XIII | `fall_down` L4439 invokes L4469 and writes element 6 rate 0 at line 2230 | No HP setter/sheet-selection trap in this object script; external initialization still possible |

For XIII, the independently pinned [OpenKH object fixture](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/OpenKh.Tests/kh2/res/00objentry.bin) was decoded using its parser: offset 164264, object ID 2354, model `M_EX350_13`, NeoStatus 1059. **NeoStatus is not asserted to be an ENMP ID.** The ENMP enemy dictionary identifies I–XII but not XIII. No mapping between that object field and an XIII combat sheet was established; publishing guessed attributes would be false precision.

The app now explains the verified HP-floor examples and XII's callback-specific Thunder protection alongside the existing base-sheet values. It keeps XIII's unused attributes unspecified. Complete callsite enumeration is useful completed extraction, but is not equivalent to exhaustive branch tracing, all mission/external initialization, or actual Steam execution. Those remain the precise KH2-019 gap.

## Integration and checks

Canonical inputs and generated runtime were updated for the verified Daylight locator and Mushroom explanation. Stable IDs and all six nonfactual dispositions are preserved. Game-specific readiness is reconciled with previously closed VII/XII gates, cup cost and Dark Anklet findings; those outdated overview warnings no longer masquerade as active gaps.

- KH2 generator: 1,315 entries, 59 recipes.
- Focused content suite: 21 tests passed.
- Repeated generation produced identical SHA256 `8cd9dc40a1417d7fc2a6a86d44dcdf31e762668ecc12e0d560885b184bdde583`; all 1,644 ordered ID occurrences match the initial checkpoint. Census has 14 files; ledger counts match its 40 rows; `git diff --check` passed.
- No browser acceptance or legacy E2E repair is claimed. Cross-game tests/build and integration are the coordinator's responsibility.
