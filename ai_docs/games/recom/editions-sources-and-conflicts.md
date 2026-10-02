# Editions, evidence and conflicts

Updated 2026-10-02. [Pack index](README.md).

## Release baseline

The publisher's [Steam listing](https://store.steampowered.com/app/2552430/KINGDOM_HEARTS_HD_15_25_ReMIX/) includes Re:Chain of Memories in HD 1.5 + 2.5 ReMIX and dates the Steam release to 2024-06-13. Its Japanese and international packages have incompatible save data. This research uses English HD terminology; no installed game build was executed or hash-pinned. Other modern platforms need their own achievement/save checks.

GBA Chain of Memories and original PS2 Re:CoM remain historical comparison sources only. Many wiki tables put both versions in a single row, while world pages put Riku's original and remake decks in separate tabs. Importing all rows or the first tab produces incorrect data.

## HD substitutions

These are replacements, not eight separate HD collectible cards:

| Original PS2 bonus attack card | HD identity | HD first acquisition |
|---|---|---|
| Hidden Dragon | Maverick Flare | Traverse Town Bounty |
| Monochrome | Total Eclipse | Olympus Coliseum bonus reward chest |
| Follow the Wind | Midnight Roar | Neverland bonus reward chest |
| Photon Debugger | Two Become One | Destiny Islands bonus reward chest |

Star Seeker and Bond of Flame remain additional bonus attack cards. Seven extra enemy cards are Xemnas, Xigbar, Xaldin, Saïx, Demyx, Luxord and Roxas. Together these make **13 Days-linked card identities**, with Maverick Flare in a Bounty and the other twelve in bonus reward chests. [Attack Card](https://www.khwiki.com/Attack_Card), [World Cards and edition footnotes](https://www.khwiki.com/World_Cards).

## Two separate unlock dependencies

**Days flag:** HD bonus cards depend on the compilation's 358/2 Days completion data. A [Steam-specific community guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3268206940) instructs completing the movie and opening all diary/secret-diary/character entries. A [modern PlayStation walkthrough](https://www.truetrophies.com/game/KINGDOM-HEARTS-ReChain-of-Memories/walkthrough/2) similarly includes the text sections. Treat this as an actionable community route, not proof of the minimum Steam trigger. Whether skipping individual scenes, restarting Re:CoM, or moving system saves changes the trigger remains unverified. Do not tell a Steam player to claim a PS3 theme.

**Reverse/Rebirth clear data:** Ansem (Twilight Town), Zexion (Destiny Islands), and Lexaeus/Ultima Weapon (Castle Oblivion) are Bounty rewards gated by Riku clear data and the first Marluxia battle. They are separate from Days unlocks. The [World Cards footnotes](https://www.khwiki.com/World_Cards) record this distinction; [falconesque's walkthrough](https://gamefaqs.gamespot.com/ps2/954016-kingdom-hearts-rechain-of-memories/faqs/56913) supports the historical clear-save sequence but its original-English bonus rules must not replace the HD Days rule. Only indexed passages of GameFAQs were inspected.

## Observed source conflicts

| Field | Aggregate source | More specific source | Treatment |
|---|---:|---:|---|
| Soldier CP | 15 | 20 | Use aggregate; two independent remake guides agree |
| Powerwild CP | 30 | 40 | Use aggregate; two independent remake guides agree |
| Wyvern CP | 20 | 25 | Use aggregate; two independent remake guides agree |
| Defender CP | 30 | 25 | Use aggregate; two independent remake guides agree |
| Tornado Step CP | 30 | 25 | Use aggregate; two independent remake guides agree |
| Crescendo CP | 30 | 20 | Use aggregate; two independent remake guides agree |
| Neoshadow CP | 30 | 25 | Use aggregate; two independent remake guides agree |

The aggregate is [Enemy Card](https://www.khwiki.com/Enemy_Card). The competing values come from the explicitly Re:CoM infobox on each named enemy's page. [Conflict records](source-conflicts.json) link both. This may be edition contamination, but that explanation is an inference. The two independent remake guides now resolve these costs in favor of the aggregate; the contrary values remain recorded. See the [closure audit](data-gap-audit-2026-09-28.md). Some infobox sale values also appear inconsistent with their CP values, reinforcing the need for review.

Other corrections and boundaries:

- The [remake overview](https://www.khwiki.com/Kingdom_Hearts_Re:Chain_of_Memories) incorrectly repeats Xaldin under Hollow Bastion. The detailed World/Map reward tables and Steam bonus guide assign **Xaldin to Monstro, Xigbar to Hollow Bastion**. The candidates follow the detailed tables; independent in-game evidence remains desirable.
- Darkball is unavailable to **Sora** in Re:CoM, but is in **Riku's Atlantica** preset and enables Duel Trigger. Never import its GBA Sora entry. [Enemy Card](https://www.khwiki.com/Enemy_Card).
- The [PS3 Journal walkthrough](https://www.truetrophies.com/game/KINGDOM-HEARTS-ReChain-of-Memories-PS3/walkthrough/5) lists some world-card grants as “Complete 7F.” That conflicts with the late-world group being playable on 7F after the 6F Larxene event. Use world floor ranges and the World Cards story section; do not import that event label.
- The platform's Bee Buster description says **Bumble-Buster**; the minigame reference calls it **Bumble-Rumble**. Keep both aliases. Initial-clear bee counts and the 70-bee achievement target are different conditions.
- Gold becomes available after the other 150 Sora card types; Platinum follows in another new eligible Bounty chest, after earlier world rewards. No “13F only” restriction is adopted. The 152-type roster is resolved; exact Steam Card Master trigger code remains separate.

## Evidence standard

Primary Steam evidence supports product contents and public achievement names/descriptions. KHWiki, GameFAQs, TrueTrophies and Steam user guides are community sources. Several pages within one wiki are **not independent corroboration**, and a Steam user guide is not publisher documentation.

The prior [KHTABLES audit](../../sources/khtables-drive-audit.md) lists no dedicated CoM workbook. The initial September 28 local search predated this dedicated spec/readiness/catalog and is historical. This pass did **not** re-query connected Drive; it does not claim that no private source exists.

Facts and numeric tables are recorded with provenance; guide prose is newly written. External images were not acquired for production. The official PS3 manual was discovered, but its web fetch failed, so it is a lead rather than inspected primary mechanics evidence. See [manifest](source-manifest.json) for accessible sections and blocked/partial sources.

## October 1 source conflicts and provenance

The [Level](https://www.khwiki.com/Level) and [Sleight](https://www.khwiki.com/Sleight) remake tables select Zantetsuken at 22/Sonic Blade at 27; the individual Zantetsuken page and Destiny Islands Sora table contain contrary 27/GBA landmarks and were not adopted. Ursula’s source B11F body/tentacle row conflicts with Riku’s Atlantica placement: the combat catalog preserves the conflict and leaves that Riku floor null. Replica’s two duel timer alternatives lack an encounter mapping; they are not emitted as one unconditional timer.

All 51 baseline manifest omissions have fresh access attempts (47 direct successes/four failures, with FAQ 55459 additionally recovered through web retrieval), with 269 direct URL attempts, plus separately listed web inspections in this pass. The old inspection dates/hashes remain historical; a new successful retrieval does not reconstruct September 28 inspection or independently certify all earlier claims. See the [full disposition ledger](research-resolution-2026-10-01.md).

## October 1 continuation: Steam Days observations

In a [Steam-specific community thread](https://www.reddit.com/r/KingdomHearts/comments/1dl9sjt/about_unlocking_the_rechain_of_memories_room_of/), the questioner reports that opening the character files completed the unlock, and another participant reports successfully skipping chapters through chapter select. These are firsthand community observations, not a minimal system-save specification. A later reply claims both campaign clears are necessary; this conflicts with the selected HD Days route and is not promoted to a new prerequisite. Restart/transfer semantics remain unknown.

October 2 follow-up: [remaining-gap outcomes](gap-closure-2026-10-02.md) records new Steam farm/Days guidance, bounded stock priority, Riku Report/duel observations and edition-qualified replay evidence. The overall register remains 15 closed, 11 partial, three open and three non-factual limitations.

## October 2: official reference candidate, inspected sample

**Recommended primary reference for original remake mechanics: _Kingdom Hearts II Final Mix+ Ultimania_**, ISBN 9784757520134. Despite the KHII title, it includes a distinct Re:Chain of Memories section. [Square Enix's publisher record](https://magazine.jp.square-enix.com/gamebooks/books/10264) identifies Square Enix supervision/publication, Studio BentStuff authorship, 512 pages and May 2, 2007 publication. It covers the Japanese PS2 release, not the later HD/Steam release.

The [legitimate BOOKWALKER edition](https://bookwalker.jp/de4911115e-c049-4f13-b0fd-e127b87aa2d6/) offers a [free browser sample](https://viewer-trial.bookwalker.jp/03/21/viewer.html?cid=4911115e-c049-4f13-b0fd-e127b87aa2d6&cty=1). The listing explicitly identifies this as a digitization of the 2007 book. No purchase or full-book inspection occurred.

Visually inspected printed pages (sample numbering differs):

| Printed page | Verified coverage |
|---|---|
| 362 | Attack-card acquisition, damage multipliers, CP and sale values by number. |
| 391 | Sora sleight recipes, level-up conditions and damage multipliers. |
| 422 | Guard Armor stats by Sora/Riku floor, attack details and card-number ranges. |
| 423 | Guard Armor's Riku duel explicitly specifies **five cards and six seconds**. |

This directly establishes the book's suitability for numeric combat questions in COM-014; the Guard Armor example is evidence of coverage, not a resolution of the still-missing second Replica timer. The remaining boss pages are the next place to inspect for Replica, Ursula, Marluxia's Bit and tutorial Ansem. Card/sleight chapters are promising for COM-001/002/005/006/007/017, but the sample does **not** establish that they contain every missing probability, ordered deck, duration or registration rule. Do not mark those questions resolved from a contents listing.

Use an inspected, applicable official table to settle a disputed original-remake fact; retain the page and edition with the result. Modern Days flags, Steam achievement predicates and save behavior still require modern evidence. No game catalog, runtime value or audit disposition changes in this source-finding pass.

The already-consulted [falconesque GameFAQs guide](https://gamefaqs.gamespot.com/ps2/954016-kingdom-hearts-rechain-of-memories/faqs/56913) remains a useful free English companion. Its original-game evidence is North American PS2; finding it again is not new independent corroboration or proof of a Steam-only condition.

## October 2: direct Steam evidence route

**A KH guide is not required for Steam facts.** Use Valve's platform documentation for platform behavior, the game's published Steam records for app-specific metadata, and publisher updates or reproducible observations for game behavior. The Ultimania remains a promising original-remake reference; platform research proceeds independently.

Sources inspected in this follow-up:

| Primary source | What it establishes | Application to our gaps |
|---|---|---|
| [Valve: Stats and Achievements](https://partner.steamgames.com/doc/features/achievements) — Overview, achievement properties, usage and Offline mode | Steam stats/achievements are account-associated. Offline changes are cached for later synchronization. Achievements can be awarded explicitly or through configured progress-stat thresholds. | COM-011: platform ownership/synchronization is documented. Do not infer which Re:CoM events increment a counter, whether counters span campaigns, or which unlock mechanism this app uses. |
| [Valve: Steam Cloud](https://partner.steamgames.com/doc/features/cloud) — Overview | Steam synchronizes files selected through a game's Cloud configuration/API; ordinary synchronization includes upload after exit and download before launch on another computer. | COM-008/009: supplies transport behavior. Next inspect this app's selected files and save contents to establish whether Days/clear flags travel with them. Generic Cloud support alone does not identify those flags. |
| [Steam's published app achievements](https://steamcommunity.com/stats/2552430/achievements/) | Directly confirms public requirements, including Sora's sleights and Riku's D Report card collection. | COM-006/011/012: primary requirement wording, already partly represented in our catalog. The page does not enumerate the hidden membership checks behind those requirements. |
| [Valve: ISteamUserStats Web API](https://partner.steamgames.com/doc/webapi/ISteamUserStats) — GetSchemaForGame, GetPlayerAchievements, GetUserStatsForGame | Documents ways to retrieve a game's stats/achievement list and accessible player records. These documented calls require a Web API key. | Next research route for COM-011/012: inspect the actual app schema and exposed stats. Documentation was read; no authenticated schema or player-data response was retrieved in this follow-up. |

Research order: official public metadata and publisher patch notes; available app schema/cloud configuration; then controlled save or achievement observations for remaining game-specific questions. Inspect exposed progress thresholds where available before assuming an executable investigation is necessary. A schema's display text does not by itself reveal every game-side condition.

This resolves the source-selection question and records the platform baseline. The full game-specific audit families remain partial/open; no runtime behavior or family counts changed. “Steam-specific evidence needed” must not be interpreted as “find a Steam-specific KH walkthrough.”


## October 2: actual Steam Cloud configuration recovered

The previous source-route section is now supplemented by a successful **direct anonymous Steam PICS product-information response** for app 2552430. The [retained exact excerpt](steam-cloud-evidence-2026-10-02.json) records access time, change number **39403443**, client method/version and public build **15194255**. This is Valve-served app metadata, not a KH guide or a SteamDB inference.

The collection selects the following folder under Windows Documents:

`My Games/KINGDOM HEARTS HD 1.5+2.5 ReMIX/Steam/{64BitSteamID}`

Its pattern is `*` with recursion enabled; quota is **100 MiB / 50 files**. Thus the configured unit is every matching file in that account-specific collection folder and its subfolders, rather than one Re:CoM in-game slot. For the same Steam account with Cloud enabled, let the game close and synchronization finish before continuing on another machine. [Valve documents the file synchronization behavior](https://partner.steamgames.com/doc/features/cloud).

For a manual backup, preserve the complete account folder. This recommendation follows from the verified selection scope; it does not claim that the location or byte offsets of every Days flag have been decoded. No two-machine transfer was executed. Cloud configuration also does not establish cross-store Epic/Steam compatibility or automatically awarding achievements from an imported completion save.

[KingdomSaveEditor's PC Re:CoM archive implementation](https://github.com/BFlorry/KingdomSaveEditor/blob/e5eec7403f939d7a94a62d996130d84f59887dda/KHSave.Archives/Factories/PcKhRecomFactory.cs) and [firsthand Steam save recovery](https://steamcommunity.com/sharedfiles/filedetails/?id=3280835800) support distinguishing the multi-slot save container from an individual Sora/Riku slot. The editor's legacy `Kh2Cleared` flag name is not evidence that it represents Steam's Days completion flag.

The [Steam answer table](minigames-and-achievements.md#october-2-answers-from-steam-observations) records actual campaign, deck-edit, input and existing-save answers. Minimum Days predicates, exact restart/flag-read timing, and all 47 game-side achievement conditions remain narrower research questions. The official Ultimania candidate remains documented above; its unseen pages have not been treated as evidence.
