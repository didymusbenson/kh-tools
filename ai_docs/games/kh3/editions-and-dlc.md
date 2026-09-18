# KH3 editions, Re Mind, save scope and achievements

Research date: **2026-09-18**. [Index](README.md). A feature being announced is not evidence that a shipped build has been tested. Store/platform family, content entitlement, game build, language, difficulty and save lineage are independent fields.

## Shipped and announced editions

| Edition | Status at research date | Evidence / treatment |
|---|---|---|
| PS4 / Xbox One base game with updates | Shipped | Base content and free update features; paid Re Mind entitlement remains separate |
| PS4 Re Mind / Xbox One Re Mind | Shipped; released 2020-01-23 / 2020-02-25 | Official Japanese DLC page identifies both; base game is required |
| Epic PC KH3 + Re Mind | Shipped bundle | Current official collection page lists Epic as available; exact installed build not audited |
| Steam KH3 + Re Mind | Shipped, 2024-06-13 | Steam confirms bundled Re Mind, Dead of Night and 51 achievements |
| Switch Cloud KH3 + Re Mind | Shipped service, sales ended | Official notice: sales ended 2026-06-09 23:59 JST; play ends 2027-06-09 23:59 JST |
| Native Switch 2, PS5, Xbox Series X/S and Microsoft Store Windows KH3 + Re Mind | **Announced for 2026-10-08; unreleased** | Official Collection [I–III] page; gameplay/achievement differences unverified |

Primary sources: [Square Enix Re Mind](https://www.jp.square-enix.com/kingdom/kh3/dlc/index.html), [Steam product](https://store.steampowered.com/app/2552450/KINGDOM_HEARTS_III__Re_Mind_DLC/), [Square Enix Collection](https://www.jp.square-enix.com/kingdom/collection/), [Square Enix cloud notice](https://support.jp.square-enix.com/news.php?drt=1781017200&id=19066&la=0&n=2&tag=ab4073e28135a1345b861beefd8b6a2c459e1ed4).

The official future-release page advertises Long Night for Switch 2, Midnight Blue for PS5 and Phantom Green for Xbox Series/Windows. It also confirms cloud-to-digital save transfer availability; region/platform-specific transfer steps still need verification. Do not display those unreleased editions as tested. Native Switch support on that page applies to KH1.5+2.5, **not KH3**. [Square Enix Collection](https://www.jp.square-enix.com/kingdom/collection/).

Older platform bonuses (Midnight Blue, Phantom Green, Dawn Till Dusk, Elemental Encoder, Advent Red) need exact historical/current entitlement edges and storefront readback. Do not put every exclusive in a single universal Keyblade denominator. Steam’s Dead of Night is directly confirmed by its product page. Store availability is metadata, not a reason to delete an existing user’s acquired record.

## Free updates are distinct from Re Mind

Published community patch history identifies v1.04 Critical Mode/Proofs/Frozen Slider treasure display/synthesis checkmarks; v1.05 New Game+ carryover and 200-photo capacity; v1.07 Oathkeeper/Oblivion exchanges plus six post-clear abilities; v1.10 active Premium Menu code counters. These refer to the console patch numbering; do not assume PC version strings are identical. [KH3 patch history](https://www.khwiki.com/Kingdom_Hearts_III#Patch_update_data).

Proof of Promises requires 90 photographed emblems and a cleared game; Proof of Times Past requires a Critical clear. They exchange for Oathkeeper and Oblivion respectively. Proofs carry through New Game+. These are updated-base-game acquisitions, not a paid Re Mind unlock. [Proof](https://www.khwiki.com/Proof).

The secret-ending emblem thresholds differ by difficulty (90 Beginner, 60 Standard, 30 Proud, none Critical). They are an ending goal, not the 90-emblem collection denominator. [Lucky Emblem](https://www.khwiki.com/Lucky_Emblem).

## Re Mind content boundaries

The official DLC lists Re Mind scenario, Limitcut with 13 bosses, Secret Episode, playable-character changes, Data Greeting, Slideshow and Premium Menu. The orchestra edition adds a concert recording; that is not another set of world collectibles. [Square Enix Re Mind](https://www.jp.square-enix.com/kingdom/kh3/dlc/index.html).

Model separate progress scopes:

| Scope | What belongs here | Prerequisite / unresolved verification |
|---|---|---|
| Base save | 245 chests, 90 emblems, synthesis, normal records | Selected save identity, difficulty/build |
| Re Mind scenario | Nine Scala chests, DLC rewards | Base cleared-save start flow and return/replay behavior require platform test |
| Limitcut | Thirteen individual data victories and first-clear rewards | Re Mind-clear start flow needs menu/save test; XI→Xion/Master Xehanort lock is sourced |
| Secret Episode | Yozora attempt/victory, Crystal Regalia+ | All thirteen data victories unlock episode |
| Premium Menu | Mode chosen, enabled codes, merits, per-boss best PRO score | Per-save unlock/eligibility; do not merge across unrelated runs |
| Creative modes | Data Greeting/Slideshow unlock/access reference | No invented “all poses/photos” completion denominator |

The initial Limitcut set has eleven accessible fights; Xion and Master Xehanort open after those eleven. All thirteen wins unlock the Secret Episode; first-clear drops do not repeat. [Recreated Data](https://www.khwiki.com/Real_Organization_XIII%27s_Recreated_Data).

| Data opponent | First-clear reward |
|---|---|
| Ansem | Defense Boost |
| Xemnas | Power Weight |
| Xigbar | AP Boost |
| Luxord | Magic Weight |
| Larxene | Magic Boost |
| Marluxia | Magic Weight |
| Saïx | Power Weight |
| Terra-Xehanort | Strength Boost |
| Dark Riku | Power Weight |
| Vanitas | AP Boost |
| Young Xehanort | Magic Weight |
| Xion | Breakthrough |
| Master Xehanort | Master Belt |

Source: [Recreated Data](https://www.khwiki.com/Real_Organization_XIII%27s_Recreated_Data). Yozora awards Crystal Regalia+; it is separate from Dark Inferno’s Crystal Regalia. [The Final World, Re Mind rewards](https://www.khwiki.com/Game:The_Final_World).

Temporary playable Riku, Aqua, Roxas and Kairi are encounter character choices, not separate world collectible campaigns. Store `playable_character` where an encounter/ability depends on it; do not multiply the base chest inventory by those characters. Save lineage must distinguish a base source save, DLC continuation and New Game+ descendant. Base/DLC resume controls, transfer of later base gains, inaccessible post-episode chests and replay overwrite behavior are not certified by this audit; these require an explicit test matrix before player instructions are considered safe.

## Premium Menu requirements

Easy Adventure unlocks EZ Codes; Challenging Adventure unlocks PRO Codes; Usual Adventure initially locks the menu. Defeating Yozora unlocks both code menus on that save. Active EZ Battle Codes can prevent PRO merit points and affect trophies. Gummi Ship Meister permanently sets its affected inventory/level; toggling it is not reversible in that save. [Premium Menu](https://www.khwiki.com/Premium_Menu).

Nine EZ merits: Aerial, Rage Form, Link, Icebreaker, Gigas, Sky Walk, Schwarzgeist, Bowling and Survival. Store merits separately from toggled codes. Survival requires its specific active-code configuration. The inspected page lists 15 EZ codes and 13 PRO codes; exact per-code effects/achievement blocking and all nine predicates still need a canonical audited table.

The same source gives maximum PRO points 530,000 and A rank at **364,125**. It describes 1.25 per difficulty star, reaching 50× with all codes; the rank-B value is explicitly uncertain. Do not implement the rank ladder, repeated-boss aggregation or rounding from that uncertainty. Record per-boss best score and active-code configuration, then verify replacement/rounding rules. [Premium Menu](https://www.khwiki.com/Premium_Menu).

## Achievement overlays

Steam publishes 51 achievements for the bundled game. Inspected acquisition-relevant predicates include all Lucky Emblems, Treasures, ingredient types, Excellent cuisine types, all Classic Kingdom high scores, one fully powered Keyblade, Ultima synthesis, 20 unique Gummi treasures and all constellations. DLC predicates include Re Mind clear, data victories and Premium Menu merits. Hidden descriptions are blank on the public Steam page. [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/).

Keep `achievement_set_id` and platform-scoped predicates. PS trophies, Xbox achievements and Epic coverage were not fully read back; their counts must not be inferred from Steam’s 51. New native 2026 sets are announced/unverified. Story, level-99 and combat counters can remain achievement goals without being added to world collection percentages.

Required cases: 80/90 emblems satisfies the Orichalcum+ event but not Hidden Kings; one level-10 Keyblade may satisfy Blademaster while the all-Keyblade-upgrades goal remains incomplete; base chest completion remains 245/245 when nine Re Mind chests are missing; a Yozora loss/alternate ending is not victory or its equipment reward.
