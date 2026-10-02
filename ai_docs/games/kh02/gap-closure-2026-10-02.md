# KH0.2 gap closure — 2026-10-02

Target: shipped Steam HD, collection 2552440. Starting: **10 resolved, 7 partial, 1 blocked**. Ending: **11 resolved, 6 partial, 1 blocked**. One finding genuinely closed (KH02-016); seven retain exact residuals. Initial scope checkpoint `4f974b6`; substantive Steam checkpoint `c003e33` pushed and remote-verified. No user playthrough, hidden predicate, numerical threshold, platform equivalence or screenshot item label has been invented.

## Evidence and per-finding outcome

### KH02-001 — blocked

Inspected original Soraalam1 PS4 footage and English automatic transcript at 5:27–5:37: narrator specifies 30 lightning final blows. Video description explicitly targets PSN Ambitious; it is not Steam evidence. Frames at 5:27/5:31 show combat and editorial objective title, not a threshold counter.

Residual: Steam-labelled objective-menu/counter or event threshold still absent; the 30/50 conflict remains on objective 13 and Mystic Pauldron.

Sources: [1](https://www.youtube.com/watch?v=RzbFkFwQyAk).

### KH02-005 — partial

Directly inspected Destiny Islands Forest 3/12 image: chest in an alcove, no acquisition popup, HUD, build or locale. Table identifies Ether, but filename/table are editorial labels. Video 20:49–21:53 supplies all Forest landmarks without item names in narration; no justified resolution of item identity. Samurai Gamers 2017 map table adds Ether at marker 5 but lacks modern edition provenance.

Residual: Two source joins remain: save-point Ether/Mega-Ether and northern Potion/northwest-thicket Hi-Potion. Do not treat a cropped chest image as item-name proof.

Sources: [1](https://www.destinyislands.com/kh-02-bbs/collectables/treasure-chests/); [2](https://www.destinyislands.com/images/games/kh-02-bbs/collectables/treasure-chests/forest-of-thorns-3-12-ether.png); [3](https://www.youtube.com/watch?v=RzbFkFwQyAk); [4](https://samurai-gamers.com/kingdom-hearts-3/dark-side-chapter-3-walkthrough/).

### KH02-010 — partial

Retrieved Xbox walkthrough pages 18/19/24 text, including explicit ordinary-chest refill and Objective-progress transfer claims. This improves on the previous isolated page-18 excerpt, but does not specify individual gem/memory flags. Generic GitHub kh02 repository search returned unrelated projects, not a game-state implementation.

Residual: Partial gem/memory transfer and Steam ordinary-chest reset semantics remain unverified. Xbox chest-refill baseline is labelled separately in canonical replay documentation.

Sources: [1](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-28-Final-Chapter-Prologue/walkthrough/18); [2](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-28-Final-Chapter-Prologue/walkthrough/19); [3](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-28-Final-Chapter-Prologue/walkthrough/24).

### KH02-011 — partial

Original PS4 guide transcript 11:00–11:26 identifies third story Phantom for objective 31; 26:39–27:39 demonstrates a conservative Finish route for 50. GameFAQs mini-guide page 2 independently says 31 does not need simultaneous Finish. None demonstrates Zodiac substitution or Steam pre-unlock counter events.

Residual: 31 Zodiac substitution, 50 strict event predicate, and pre-unlock partial-counter behavior for objectives 18/26/31/36/41/47/50 remain. Conservative story/Finish guidance retained.

Sources: [1](https://www.youtube.com/watch?v=RzbFkFwQyAk); [2](https://gamefaqs.gamespot.com/boards/181154-kingdom-hearts-hd-28-final-chapter-prologue/74858364?page=2).

### KH02-012 — partial

PS4 trophy guide explicitly prescribes all chests in one playthrough; Xbox general-info guide describes refilled chests and a complete NG+ collection route. Added safe same-cleared-save collection advice to canonical generator/runtime.

Residual: Steam achievement evaluation when Zodiac persists across NG+ remains unknown. Guide route is not code-level proof of current-run versus lineage/global union.

Sources: [1](https://www.playstationtrophies.org/game/kingdom-hearts-0-2-birth-by-sleep-a-fragmentary-passage/guide/); [2](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-28-Final-Chapter-Prologue/walkthrough/19).

### KH02-013 — partial

Xbox general-info guide describes magic Situation Commands and achievement but supplies no save-transfer evidence; its extra Spellweaver wording is not imported into the three-magic set. Direct SteamDB ACH_12 row confirms only the displayed goal, not partial-set storage.

Residual: No documented Steam per-command bits or NG+ copy/reset/evaluation code. Cross-save partial-set accumulation remains unverified.

Sources: [1](https://www.trueachievements.com/game/KINGDOM-HEARTS-HD-28-Final-Chapter-Prologue/walkthrough/19); [2](https://steamdb.info/app/2552440/stats/).

### KH02-015 — partial

Extracted actual wiki numeric table rather than treating its cleanup banner as an empty table: first/second story HP 500, third 1500, Zodiac 4000; strength/defense 51/28 for story and 65/36 Zodiac. These are source claims without Steam build/difficulty attribution.

Residual: No certified Steam parameter dump or difficulty-scaled damage table. Numeric values remain research-only, not silently promoted to production stats.

Sources: [1](https://www.khwiki.com/Game:Phantom_Aqua).

### KH02-016 — resolved

All 15 Steam associations observed directly in rendered SteamDB achievement containers. achievement-ACH_05 contains Into the Depths of Darkness and its story-clear requirement; achievement-ACH_23 separately contains Deft Diver. Canonical provenance and validator now require 15/15 unique keys, exact ACH_05 pairing and same-container evidence.

Residual: Shipped Steam scope closed. PSN/Xbox/Epic native schemas and future editions are separate, unverified scope; this does not claim their completion.

Sources: [1](https://steamdb.info/app/2552440/stats/).

## Inspection boundaries

Rendered browser inspection recovered the complete SteamDB schema where web extraction returned a loading shell. All 15 pairs were independently present in their own containers. SteamDB remains a third-party mirror; official Steam achievement text was separately fetched but does not expose API keys. The YouTube transcript is automatically generated and was checked against selected visible footage; it is a PS4-era firsthand guide, not a modern Steam test. Only paraphrased factual notes are retained. The Destiny Islands image was inspected directly; no production media was copied. Fresh searches of magic-save transfer, Zodiac substitution, gem transfer and Phantom numeric data did not expose the missing Steam implementation. Broad GitHub repository search did not produce a relevant implementation and is not evidence of absence.

## Validation

Targeted generator and validator passed: 177 entries, 55 physical finds (41 chests + 7 gems + 3 flowers + 4 memories), 51 objectives, 51 wardrobe rewards, 15 achievements. Stable IDs and objective-to-wardrobe source propagation remain checked. Native mapping validator now enforces 15 unique associations and the exact story-clear key. Scoped whitespace checks passed. Whole-app build/integration belongs to the coordinator; Data Jiminy remains unchanged and empty.

Coordinator integration: all 15 verified native keys and SteamDB source links are propagated into runtime achievement metadata (`steamApiName`); existing saved-progress IDs remain unchanged. The audit checks canonical/runtime association equality.
