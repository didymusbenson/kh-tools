# KH2 Final Mix research continuation — October 1, 2026

This focused pass starts at recovery checkpoint `2fd2927` and investigates all five remaining partial findings. The other completed catalogs, treasure routes, summons and puzzle-assembly work were not reopened. Current totals: **31 closed, 3 partial, 2 implementation, 1 provenance, 1 confidence, 1 platform, 1 excluded**. The [current JSON ledger](research-dispositions-2026-10-01.json) is authoritative for counts; [follow-up evidence](research-continuation-evidence-2026-10-01.json) records each investigation.

The target remains English modern Final Mix. Japanese 2007 FM and modern HD guides, modding repository fixtures and decompiled scripts are source evidence. This pass did not run or extract a retail Steam build. Source-backed computations are identified below, and modified inputs are not treated as vanilla data.

| Finding | Outcome | Integrated result | Remaining question |
|---|---|---|---|
| KH2-003 | partial | Supported tram approach and white-orb Glide sweep retained | Daylight 27 roof/pillar naming; distinct pipe/order for Sunset 32/36/40 |
| KH2-006 | partial | Dark Anklet missability/cutoff and conversation-based stock preservation resolved | Exact retail stage/room predicates across all shop items |
| KH2-013 | closed | VII/XII earliest event-level gates and XII temporary unavailability | No executable flag-address claim |
| KH2-015 | closed | 25 MP party Limits in normal and Paradox Pain/Panic; Rapid Thruster tactic names round 8 | No outstanding cup-cost conflict for the selected FM edition |
| KH2-019 | partial | I–XII base HP/STR/DEF/EXP and IV’s HP phases | Full effective script overrides and XIII unused/internal combat attributes |

## KH2-003: puzzle locator follow-up

The [Guiding Key puzzle table](https://guiding-key.tumblr.com/kh2-puzzles) repeats a synthesis-shop roof for Daylight 27, and only the white-orb area for all three Sunset pieces. This is more textual corroboration, not an independent image resolution.

The actual page for [HD puzzle gameplay, part 1](https://www.youtube.com/watch?v=RtYZ9YOpJEU) was retrieved. Its chapter metadata locates the Tram Common central pillar at **01:01**, followed by the northernmost rooftop at **01:11**. That adds a precise candidate capture, but no relevant frame was successfully inspected: the storyboard/thumbnail endpoints returned an unavailable page, 403 or 404. [Part 3](https://www.youtube.com/watch?v=mURDganqsU4) was also located as a follow-up lead, not claimed as viewed footage.

[Thundaka’s HD puzzle guide](https://gamefaqs.gamespot.com/ps3/735143-kingdom-hearts-hd-25-remix/faqs/55322), [TrueAchievements’ illustrated checklist](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-15-25-ReMIX/walkthrough/62) and [PST’s Journal guide](https://www.playstationtrophies.org/forum/topic/263463-kingdom-hearts-ii-final-mix-hd-jiminys-journal-completion-guide/) were queried. Indexed extracts were available, but direct page/image follow-up failed. None supplied newly inspected per-piece visual proof. All four existing precision residuals therefore remain; no arbitrary pipe numbering was added.

## KH2-006: shop predicates and Dark Anklet

[AppMedia’s FM missables guide](https://appmedia.jp/kh2fm/27258790) explicitly states that speaking once to the Disney Castle Moogle is sufficient to retain the stock at Twilight Town/Hollow Bastion armor shops. [Game Tankyuki’s FM missables guide](https://akizakki.com/kh2fm-torikaesi) independently gives the Library shop and Lingering Will availability cutoff. These corroborate the specific [Moogle Shop](https://www.khwiki.com/Moogle_Shop) statement. The general Armor overview’s “only Champion Belt” shorthand is incomplete for this conditional case.

Canonical and runtime guidance now says: **talk to Mogjiro in Disney Castle’s Library before the Badlands portal appears**. Purchasing the anklet then is unnecessary. If the shop disappears before any conversation, Dark Anklet can no longer be bought on that save. The room’s Japanese name is 書斎; the catalog uses its English room name, Library.

The pinned [OpenKH shop parser](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/OpenKh.Kh2/SystemData/Shop.cs) exposes menu and inventory unlock fields, and the [shop dictionary](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/docs/kh2/dictionary/shops.md) maps world shops. The [randomizer shop input](https://github.com/tommadness/KH2Randomizer/blob/ac28071c1e7eff7393df54c91196fe4f43c727e9/static/shop.bin) was decoded: 21 shops, 38 inventory groups, and world shops sharing the same 34 groups including the ten purchasable staff/shield items. This visibly modified baseline cannot prove vanilla retail shop progression. It was rejected for that purpose. Remaining all-vendor stage/room predicates are still partial.

## KH2-013: VII/XII event gates

The [2007 FM Wazap guide](https://wazap.com/cheat/%EF%BC%91%EF%BC%93%E6%A9%9F%E9%96%A2%E3%82%AD%E3%83%8E%E3%82%B3%E3%81%AE%E5%87%BA%E3%82%8B%E6%9D%A1%E4%BB%B6%E3%80%81%E5%A0%B4%E6%89%80%E3%80%81%E6%BA%80%E8%B6%B3%E3%81%AE%E3%81%95%E3%81%9B%E6%96%B9/354211/?WAZAP_LAYOUT=1) gives explicit individual gates: VII after Twilight Town Episode 2; XII after Episode 1, except while Episode 2 is active. The [indexed KingdomGarden XII entry](https://kingdomgarden.nobody.jp/kh2fm/kh2fm_xiii_12.html) corroborates XII’s predicate, though the URL now returns 404 to direct retrieval.

Japanese episode numbering requires translation into events. [AppMedia’s Episode 1 chart](https://appmedia.jp/kh2fm/75132744) ends with Oathkeeper and Limit Form. [Episode 2](https://appmedia.jp/kh2fm/75132771) ends after Axel’s fight in Betwixt and Between and arrival in The World That Never Was. Its separate prologue is not Episode 1. Runtime prerequisites use these named events, avoiding the ambiguous phrase “second visit.” This closes event-level access research without claiming to have traced retail flag addresses.

## KH2-015: Pain/Panic MP cost

[KHGuides’ FM walkthrough](https://www.khguides.com/kh2/olympus-coliseum/) specifies 25 MP. [AppMedia’s FM cup rule table](https://appmedia.jp/kh2fm/75148215) explicitly groups normal and Paradox Pain/Panic and gives the same value. The [Final Fantasy Kingdom half-cost statement](https://www.finalfantasykingdom.net/kh2coliseum.php) does not supply matching FM-specific evidence. The two edition-specific sources support selecting **25 MP**, rather than preserving a numerical conflict indefinitely.

Both cup runtime records now contain that number. Their existing Rapid Thruster advice also named round 9 despite the integrated roster placing the 128 enemies in round 8; that adjacent inconsistency is corrected. No other cup roster was reopened.

## KH2-019: source-derived Mushroom parameters

The main Mushroom infobox remains sparse, but blank cells are no longer the end of the investigation. This pass decoded the pinned [OpenKH ENMP test fixture](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/OpenKh.Tests/kh2/res/enmp.bin) using its [parser](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/OpenKh.Kh2/Battle/Enmp.cs) and [enemy ID dictionary](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/docs/kh2/dictionary/enemy.md). The fixture includes FM-only enemies and is corroborated by its [Data Roxas parser test](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/OpenKh.Tests/kh2/BattleTests.cs). Its provenance is a public repository test fixture, not a newly extracted retail file.

ENMP health is a parameter, not directly final HP. The [documented LVPM formula](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/docs/kh2/file/type/00battle.md) and [LVPM parser](https://github.com/OpenKH/OpenKh/blob/7a3b945c538d32c6a285128c98aefba093f52ceb/OpenKh.Kh2/Battle/Lvpm.cs) use integer `(healthParameter × levelHP + 99) / 100`. The [Ultimania-attributed level table](https://www.khwiki.com/Forum:Notes_53_(KHII,_mechanics_%2B_backups_from_Pastebin)_-_Ultima_Spark) supplies levels 1, 34 and 50. For example, 1351 × 74 rounds up to **1000 HP** after division by 100. Strength and Defense come from the fixed level, not from ENMP’s damage-cap/minimum-damage fields.

| Mushrooms | Fixed level | Base HP | STR | DEF | EXP |
|---|---:|---:|---:|---:|---:|
| I, II, III, VI, VIII, IX, XI, XII | 1 | 1 | 5 | 2 | 0 |
| IV, initial clone | 50 | 1 | 45 | 26 | 0 |
| V, VII, X | 34 | 1000 | 32 | 18 | 0 |

The [IV disassembly](https://github.com/thundrio-kh/kh2-ai-decomp/blob/b89a02966494aab1b5feeb80a75e503fd6d80e93/bdscript/obj/M_EX350_04/m_ex.bdscript) selects ENMP sheets 251/247/248/249, whose HP parameters are 1/2/5/16 at level 50. [Ultimania-attributed Mushroom notes](https://www.khwiki.com/Talk:Mushroom_XIII) corroborate HP1000 for V/VII/X and IV’s increases after 10, 50 and 75 defeats. The zero EXP values are explicit decoded multipliers, not replacements for blanks.

These are **base enemy-sheet attributes**, not trial goals or promises of one-hit kills. [VI](https://github.com/thundrio-kh/kh2-ai-decomp/blob/b89a02966494aab1b5feeb80a75e503fd6d80e93/bdscript/obj/M_EX350_06/m_ex.bdscript) and [XII](https://github.com/thundrio-kh/kh2-ai-decomp/blob/b89a02966494aab1b5feeb80a75e503fd6d80e93/bdscript/obj/M_EX350_12/m_ex.bdscript), among others, manipulate minimum HP and challenge behavior. The [XIII script](https://github.com/thundrio-kh/kh2-ai-decomp/blob/b89a02966494aab1b5feeb80a75e503fd6d80e93/bdscript/obj/M_EX350_13/m_ex.bdscript) was inspected as a follow-up; a complete mapping of unused internal stats was not established. XIII remains the reward ceremony with no normal defeat goal. Full effective script tracing is therefore still partial, while useful base values now reach the bestiary.

## Integration and verification

Canonical updates are limited to equipment, audit-expansion patches and the Mushroom bestiary record. The generator appends a selected prose field; raw parameter evidence and research metadata do not leak into typed runtime objects. Puzzle canonical routes remain unchanged because the follow-up did not settle their precision limits. All stable IDs, including the historical SB Sand Glider ID behind the Sand Slider display name, remain unchanged.

The KH2 generator still emits **1,315 entries and 59 recipes**. `npx vitest run tests/kh2-content.test.ts` passed all **21 tests**. A repeated generation produced an identical catalog hash; all 1,644 ordered ID occurrences match the checkpoint catalog. Checks also confirmed the SB Sand Glider stable ID with Sand Slider display name, both 25 MP cup rules, the Mushroom VII base attributes, ledger/count agreement, and exclusion of research metadata keys from the runtime catalog. `git diff --check` passed for the KH2-owned paths. Global builds, cross-game readiness and Data Jiminy are handled separately by the root integration pass.
