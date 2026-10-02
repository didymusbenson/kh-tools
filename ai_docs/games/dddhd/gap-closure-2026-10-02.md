# DDD HD factual gap closure — 2026-10-02

Scope: modern unmodified Steam Dream Drop Distance HD. Starting ledger: 7 resolved, 17 partial, 1 blocked. Investigating DDD-001, 003, 004, 005, 006, 007, 009, 011, 013, 014, 015, 017, 018, 019, 020, 021, 022, 025. Historical 3DS evidence, HD evidence, and mods are kept distinct. Stable checklist IDs and Data Jiminy remain untouched.

Initial checkpoint: scope recorded before further research. Evidence, implementation results, exact residuals and validation will be appended as research proceeds. No additional finding is yet claimed resolved.

## Implemented checkpoint

- DDD-001: [Sora Grid](https://tamaki-game.com/kh3d-sora-grid) and [Riku Grid](https://tamaki-game.com/kh3d-riku-grid) full HD guide text inspected. Added access actions to 11 stable chest IDs: both characters' #21, #35, #37, #38 and Riku #43–45. The generator propagates those routes and citations to acquisition references. This narrows access gaps without claiming complete earliest-access/movement minima.
- DDD-020: [HD retrospective](https://marathonrecaps.wordpress.com/2022/05/29/kingdom-hearts-ddd-flick-and-pick/) full text gives current-character Sweet Dreams delivery and repeating Secret Cup for the other character. Added that practical route to the Keyblade and cup, separating star ranks from the Keyblade condition. Minimum final-round-only replay and Steam event details remain unverified.
- DDD-005: [PS4 player testing thread](https://gamefaqs.gamespot.com/boards/181154-kingdom-hearts-hd-28-final-chapter-prologue/74929561) indexed excerpt reports rubbing Tubguin Ace's face from Hot Springs to Whirlpool. Added as explicitly player-reported guidance; canonical missing cells remain unfilled because direct forum access is restricted and Steam corroboration is absent.
- Fresh source exclusion: [Steam AP Spirit implementation](https://github.com/LuxMake/KHDDD-AP/blob/aae4da6f2658154866f9e88dde14506c9a576de8/io_packages/KHDDD/Items/Spirits.lua) explicitly copies physical stats for Catanuki, Beatalike and Tubguin Ace from other breeds. These are mod substitutions, not recovered vanilla values. [Kyroo handler](https://github.com/LuxMake/KHDDD-AP/blob/aae4da6f2658154866f9e88dde14506c9a576de8/io_packages/KHDDD/Locations/LocationHandler.lua) force-writes encounter events for solo seeds; it does not certify vanilla save/reload HP behavior.

Focused generation and `validate-audit.py` pass: 1,283 entries, 263 formulas, 438 chests, 54 boards/1,144 nodes, 54 Steam achievements, stable IDs preserved. `git diff --check` passed. Research continues across remaining families; no whole family newly closed at this checkpoint.
