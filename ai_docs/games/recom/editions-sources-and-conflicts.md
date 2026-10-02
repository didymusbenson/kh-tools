# Editions, evidence and conflicts

Updated 2026-10-01. [Pack index](README.md).

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
