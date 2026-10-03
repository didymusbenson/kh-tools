# BBS Final Mix — player-goal research review

**Superseded historical review.** Its 19-deferred / 2-open conclusion over-deferred missing practical actions. Use the [October 3 critical re-audit](critical-reaudit-2026-10-03.md) and current ledger. The original decisions remain below only as history.

Review date: October 2, 2026. Scope: Steam HD Final Mix, all three main characters and the separate Final/Secret Episodes. All 17 partial and four unresolved starting factual families were individually reviewed. The 12 prior closures and five provenance/implementation/visual/scope limitations are also accounted for below.

## Result

- **Practical dispositions:** 12 resolved, 19 deferred, 2 open, 5 other limitations.
- **Evidence status remains:** 12 closed, 17 partial, 4 researched-open, 2 provenance, 1 implementation, 1 visual, 1 excluded. A deferral does not verify the missing facts.
- **True practical exceptions still open:** mixed-difficulty/clear-file episode unlock behavior (BBS-031), and Steam save aggregation/Collector award failures (BBS-032). Ordinary completion routes are present; unsupported troubleshooting is not declared solved.
- No app acceptance gate was converted into optional research. Data Jiminy remains empty. Stable IDs and source-null semantics are preserved.

The decision test was: why does the player need this fact, and can current guidance already let them progress, acquire the item or earn the achievement? See [future improvements](future-improvements.md) for the complete deferred-detail/rationale list. This review does not claim all public sources are exhausted, or direct gameplay/retail executable verification.

## Integrated corrections and source review

- Reviewed all 187 persistent command records against their generated entries and character-scoped recipe routes. Filled 22 empty acquisition lists: seven meld-only commands, 14 ice creams and default Jump.
- Removed 13 inapplicable acquisition statements from active guidance while preserving each in `excluded_acquisitions`: six PSP memory-stick transfer bonuses, six original-game sticker thresholds and temporary Barrier use on the Keyblade Glider. The HD Final Mix thresholds remain.
- Qualified 236 board acquisition routes as menu Command Board routes. The separate Arena win/medal requirements remain; opponent purchases in menu play are not automatically Arena acquisitions.
- Re-rendered source-null ingredient levels as “source gives no level requirement”; null values and saved recipe IDs are unchanged.
- Added conservative completion advice for finish-tree progression, disputed mission score boundaries, command mastery, Unknown preparation and non-destructive episode/Collector troubleshooting. These avoid optional unknown transitions without declaring the underlying predicates verified.

Freshly inspected sources: [Jump](https://www.khwiki.com/Jump), [Magic Hour](https://www.khwiki.com/Magic_Hour), [Faith](https://www.khwiki.com/Faith), [Mega Flare](https://www.khwiki.com/Mega_Flare), [Fire Glide](https://www.khwiki.com/Fire_Glide), [Renewal Block](https://www.khwiki.com/Renewal_Block), [Renewal Barrier](https://www.khwiki.com/Renewal_Barrier), [Poison Block](https://www.khwiki.com/Poison_Block_(KHBBS)), [Ice Cream](https://www.khwiki.com/Ice_cream), [Sticker Album](https://www.khwiki.com/Sticker_Album), [Command Board](https://www.khwiki.com/Command_Board). Existing canonical recipe quantities, levels and character eligibility were reused; this is not a new retail binary certification.

Additional fresh inspections: [Final Episode](https://www.khwiki.com/Final_Episode), [Secret Episode prerequisites](https://www.khwiki.com/A_Fragmentary_Passage), [finish commands](https://kouryakutsushin.com/khbbs/finish-command.htm), [Unknown](https://www.khwiki.com/Game:Young_Xehanort), [Vanitas Remnant](https://www.khwiki.com/Vanitas_Remnant), [Dimension Link](https://www.khwiki.com/Dimension_Link), [Rumble Rave](https://www.khwiki.com/Rumble_Rave), [A Time to Chill](https://www.khwiki.com/A_Time_to_Chill), [Trophies](https://www.khwiki.com/Trophies), [Steam Standard unlock discussion](https://steamcommunity.com/app/2552430/discussions/0/7073555028226446724/), and [the first-person August 2024 Collector report](https://steamcommunity.com/app/2552430/discussions/0/4514381183278271486/). Existing October 1/2 evidence and canonical record joins were reviewed for the remaining families; they were not represented as newly fetched primary evidence.

Source correction: the [February 2025 BBS Master thread](https://steamcommunity.com/app/2552430/discussions/0/732500746974528477/) is about a PlayStation platinum absent on Steam. Earlier continuation language that used it for mixed-difficulty aggregation is not supported by that thread. Its save deletion attempt is not an endorsed fix. The 45-goal Steam roster already excludes that platinum. The public Steam achievements page failed to retrieve during this pass; its earlier inspected metadata is retained, not claimed newly fetched.

## Family-by-family decisions

### BBS-001

**Precise collectible directions — evidence: partial; practical disposition: deferred.**

**Player goal:** Find the remaining chest or sticker and complete the character collection.

**Current guidance:** All 374 main chests have source room/approach or landmark joins; eight Secret Episode routes and 60 sticker pickup/placement notes are integrated. Three mismatched chest locations/items were reconciled. Use character, world, room and reward together.

**Deferred precision:** Uniform save-point-to-pickup paths and additional turn-by-turn directions for every simple room.

**Decision and reason:** An additional complete walkthrough repeats usable room/landmark guidance without changing the pickup action. No specific unlocatable pickup was established in this review; that is not certification of every route.

**Reopen/next evidence:** A player cannot locate a specific existing record, or an approved map feature needs its approach.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Locations.py](https://github.com/gaithernOrg/ArchipelagoKHBBS/blob/HEAD/worlds/khbbs/Locations.py), [Rules.py](https://github.com/gaithernOrg/ArchipelagoKHBBS/blob/HEAD/worlds/khbbs/Rules.py).

### BBS-002

**Official Reports order and inventory completeness — evidence: researched-open; practical disposition: deferred.**

**Player goal:** Match a missing in-game treasure to a collectible without losing saved checks.

**Current guidance:** The guide keeps 374 main chests, eight Secret Episode chests and 60 stickers separate from the tutorial, with stable character/world/room/reward identities. Source positions are explicitly not official Reports slots.

**Deferred precision:** A 374-record reconciliation against exact Steam Reports slot numbers and retail ITB report bytes.

**Decision and reason:** Players can collect by location and reward without an exact Reports-slot lookup. The current feature does not promise that lookup; binary extraction would add optional indexing rather than a missing acquisition.

**Reopen/next evidence:** An in-game Reports-slot lookup is approved or a concrete duplicate/missing chest cannot be disambiguated by current location evidence.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [itb.html](https://openkh.dev/bbs/file/type/itb.html).

### BBS-003

**Access timing, movement requirements and returnability — evidence: partial; practical disposition: deferred.**

**Player goal:** Reach collectibles and avoid mistakenly abandoning late cleanup.

**Current guidance:** Known movement prerequisites, post-Mad-Treant return timing and HD main-save Land of Departure revisit are documented. Aqua Final Episode remains distinct. Cleanup can wait until the character has learned and leveled the indicated movement commands.

**Deferred precision:** Globally earliest visits, exact minimum movement levels and every shortcut/alternate jump.

**Decision and reason:** Completion does not require collecting each item at its earliest possible moment. Higher-level movement and later main-save cleanup provide the documented route; minimum-level routing is optional optimization.

**Reopen/next evidence:** A named collectible remains unreachable with the described commands, or a restricted/earliest-visit route is requested.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Rules.py](https://github.com/gaithernOrg/ArchipelagoKHBBS/blob/HEAD/worlds/khbbs/Rules.py).

### BBS-004

**Sticker placement text and optimal album completion — evidence: closed; practical disposition: resolved.**

**Player goal:** Place all stickers for 140 points and album rewards.

**Current guidance:** All 60 album placement regions are integrated. Visually inspected all three completed KHRealm album images and authored the missing 28 placement landmarks, including all 20 Ventus. Placement is independent from pickup; seven-point feedback verifies the chosen spot.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [テラ](https://wikiwiki.jp/kh_bbsfm/ステッカーアルバム/テラ), [ヴェントゥス](https://wikiwiki.jp/kh_bbsfm/ステッカーアルバム/ヴェントゥス), [アクア](https://wikiwiki.jp/kh_bbsfm/ステッカーアルバム/アクア).

### BBS-005

**Secret Episode Secret Gem area conflict — evidence: closed; practical disposition: resolved.**

**Player goal:** Find Secret Episode’s Secret Gem in the correct area.

**Current guidance:** Secret Gem is in Lower Zone: climb the raised pillars before proceeding to Upper Zone. Corrected generated instructions and retained separate Secret Episode context.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Game:Realm_of_Darkness](https://www.khwiki.com/Game:Realm_of_Darkness), [Secret_Gem](https://www.khwiki.com/Secret_Gem), [secret-episode](https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/birth-by-sleep-final-mix/aquas-story/secret-episode).

### BBS-006

**Mine Square recipe correction and collateral exclusion — evidence: partial; practical disposition: deferred.**

**Player goal:** Meld Mine Square and obtain its attached ability without using the wrong recipe.

**Current guidance:** Aerora Lv3 + Ignite Lv3 is an integrated working recipe with valid outcome/ability mappings. The disputed Lv1–2 eligibility is explicitly not promised.

**Deferred precision:** The lowest Ignite input level, 1 versus 3, in the retail Steam command-charge data.

**Decision and reason:** Using the supported Lv3 input accomplishes the same command/ability goal. Proving that a lower-level shortcut also works would save leveling time but does not unblock the meld.

**Reopen/next evidence:** The supported Lv3 recipe fails, or a precise minimum-level melding optimization is needed.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [commandcharge-magic.htm](https://kouryakutsushin.com/khbbs/commandcharge-magic.htm), [CmdCharge.html](https://openkh.dev/bbs/file/type/CmdCharge.html).

### BBS-007

**Magnet Spiral 20% correction — evidence: closed; practical disposition: resolved.**

**Player goal:** Meld Magnet Spiral with correct chances and abilities.

**Current guidance:** Magnet Spiral 20% / Collision Magnet 80%, Stun Edge Lv3 + Magnera Lv3, all characters and crystal mappings integrated.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Magnet_Spiral](https://www.khwiki.com/Magnet_Spiral), [](https://www.destinyislands.com/bbs-fm/melding/attack-commands/).

### BBS-008

**Confusing Strike / Confusion Strike identity split — evidence: closed; practical disposition: resolved.**

**Player goal:** Find Confusion Strike consistently by its BBS name.

**Current guidance:** Confusion Strike is the BBS identity; historical Confusing Strike spelling remains correction provenance only.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Confusion_Strike](https://www.khwiki.com/Confusion_Strike), [](https://www.destinyislands.com/bbs-fm/melding/attack-commands/).

### BBS-009

**Complete modern command identity, type and character eligibility catalog — evidence: closed; practical disposition: resolved.**

**Player goal:** Know which persistent commands each HD character can obtain.

**Current guidance:** Canonical persistent HD catalog now has 187 identities with independently table-backed types and character eligibility: 40 Attack, 57 Magic, 23 Item, 15 Friendship, 17 Movement, 10 Defense, 8 Reprisal, 17 Shotlock. Exclusion records distinguish temporary, multiplayer and HD-removed commands.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Deck_Command_(KHBBS)](https://www.khwiki.com/Deck_Command_(KHBBS)), [Shotlock](https://www.khwiki.com/Shotlock), [Kingdom_Hearts_HD_2.5_ReMIX](https://www.khwiki.com/Kingdom_Hearts_HD_2.5_ReMIX).

### BBS-010

**Complete command acquisition and purchase gates — evidence: partial; practical disposition: deferred.**

**Player goal:** Obtain every persistent command needed for a build or Reports completion.

**Current guidance:** All 187 command identities now have acquisition text; 22 empty lists are filled from sourced default/meld/ice-cream routes. Character-specific recipes and 108 shops remain available. Thirteen PSP/original/temporary acquisition claims were removed from active guidance, and 236 board routes explicitly use menu play.

**Deferred precision:** Every alternative non-shop route, 13 unspecified prior-acquisition shop alternatives, and the Fire Dash 150-versus-450 price/story-gate conflict.

**Decision and reason:** A known chest, menu-board, reward, recipe or documented normal shop route supplies the command without knowing every alternative. Fire Dash also has a Disney Drive top-three reward and melding path, so its disputed shop shortcut is not an acquisition blocker.

**Reopen/next evidence:** A particular character has no usable first-acquisition route, or a shop-only/earliest-route feature depends on one of the disputed alternatives.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Moogle_Shop](https://www.khwiki.com/Moogle_Shop), [shop.htm](https://kouryakutsushin.com/khbbs/shop.htm), [BBS-All-Commands-Shop](https://github.com/d4hy/BBS-All-Commands-Shop), [cmdShop.html](https://openkh.dev/bbs/file/type/cmdShop.html).

### BBS-011

**Command enemy drops and encounter conditions — evidence: partial; practical disposition: deferred.**

**Player goal:** Get a desired command without relying on an unidentified enemy farm.

**Current guidance:** Thirty-eight command drop records retain enemy/rate/shop-band evidence, while command acquisition and character-scoped melding offer non-drop routes. The source distinguishes world drops from acquisition guarantees.

**Deferred precision:** Every enemy-room-character drop join, reset loop and nested retail drop-table value.

**Decision and reason:** Command ownership goals already have acquisition routes that do not need random world drops. An exhaustive drop atlas would optimize optional farming, rather than supply a missing command.

**Reopen/next evidence:** A command is shown to lack a practical non-drop path, or a requested farming tool needs a specific missing encounter.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [epd.html](https://openkh.dev/bbs/file/type/epd.html), [PRIZEBOXDATA.html](https://openkh.dev/bbs/file/type/PRIZEBOXDATA.html), [Birth-by-Sleep-Randomizer](https://github.com/Truthkey/Birth-by-Sleep-Randomizer).

### BBS-012

**CP/mastery curves and command/ability rule completeness — evidence: partial; practical disposition: deferred.**

**Player goal:** Level commands, master abilities and satisfy melding level requirements.

**Current guidance:** Published maximum levels and 152 CP curves are available; conflicted/incomplete curves are flagged. Players can equip a command, gain CP until its in-game maximum, and use the displayed level for the recipe without knowing its exact remaining CP total.

**Deferred precision:** Missing retail CP rows/curves for Collision Magnet, Homing Slide, High Jump, Barrier and five Illusions, plus unresolved curve exceptions.

**Decision and reason:** Exact CP scheduling is not required to master the command or check a recipe level. Do not invent numbers or treat a partial curve as a different maximum.

**Reopen/next evidence:** A quantitative CP planner is approved, or an observed mastery/recipe boundary contradicts the current maximum.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [attack-command.htm](https://kouryakutsushin.com/khbbs/attack-command.htm), [action-command.htm](https://kouryakutsushin.com/khbbs/action-command.htm), [illusion-command.htm](https://kouryakutsushin.com/khbbs/illusion-command.htm), [CommandParam.html](https://openkh.dev/bbs/executable/CommandParam.html).

### BBS-013

**Chaos Crystal and Secret Gem random ability distribution — evidence: researched-open; practical disposition: deferred.**

**Player goal:** Learn a specific permanent ability reliably.

**Current guidance:** The 112 standard crystal/type relationships and character-specific recipes let players target the ability directly. No-crystal attachment chance is separate; Chaos/Secret Gem outcomes remain described as random without invented weights.

**Deferred precision:** Ability-identity probability weights and selection logic for no-crystal, Chaos Crystal and Secret Gem outcomes.

**Decision and reason:** Random-ability optimization is unnecessary when the standard crystal route can produce the desired ability. Uniform distributions and expected-attempt calculators would be unsupported.

**Reopen/next evidence:** A random-outcome probability feature is requested or an ability cannot be obtained with the current deterministic mappings.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [mixitem.htm](https://kouryakutsushin.com/khbbs/mixitem.htm), [AbiPattern.html](https://openkh.dev/bbs/file/type/AbiPattern.html).

### BBS-014

**Ability effects and non-meld acquisition details — evidence: closed; practical disposition: resolved.**

**Player goal:** See each ability’s effect, acquisition and enabled stack cap.

**Current guidance:** All 30 ability effects, stack references and permanent-learning rules are integrated. Scan and Critical-only Zero EXP starting-command acquisition is visible even without meld recipes; modern Zero EXP CP/damage note is sourced.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Abilities_(KHBBS)](https://www.khwiki.com/Abilities_(KHBBS)), [Scan](https://www.khwiki.com/Scan), [Zero_EXP](https://www.khwiki.com/Zero_EXP).

### BBS-015

**Complete crystal farms and bestiary encounter variants — evidence: partial; practical disposition: deferred.**

**Player goal:** Collect crystals for ability melding.

**Current guidance:** All nine materials have a Medal Shop cost plus Shop/Arena gates; seven standard crystals have deterministic ability mappings. Conditional enemy examples are labeled incomplete, and flavor farming has its separate 22 concrete routes.

**Deferred precision:** An exhaustive enemy-room-character crystal atlas, respawn proofs, timed yields and fastest-route rankings.

**Decision and reason:** The repeatable Medal Shop is a complete purchase route at the documented gates. Optional enemy optimization does not prevent ability crafting; a world-only drop example is not mislabeled as a room route.

**Reopen/next evidence:** A specified crystal cannot be bought at its documented gate, or a requested early-game/fastest-farm route needs measurements.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [mixitem.htm](https://kouryakutsushin.com/khbbs/mixitem.htm), [epd.html](https://openkh.dev/bbs/file/type/epd.html), [PRIZEBOXDATA.html](https://openkh.dev/bbs/file/type/PRIZEBOXDATA.html).

### BBS-016

**Lucky Strike adjusted drop formula — evidence: partial; practical disposition: deferred.**

**Player goal:** Improve useful drop odds while farming.

**Current guidance:** Lucky Strike has a five-stack cap and a labeled community formula. Enabled stacks are separate from learned copies; Prize Pod flavor hits are not modeled as ordinary prize-box rolls.

**Deferred precision:** Independent Steam proof of the exact per-stack transformation, caps/rounding and nested drop application.

**Decision and reason:** Players can enable available Lucky Strike stacks without calculating an exact expected yield. The current app makes no certified time-to-drop or fastest-farm claim.

**Reopen/next evidence:** A probability/expected-time calculator is approved, or observed behavior exposes a practical drop advice error.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [epd.html](https://openkh.dev/bbs/file/type/epd.html), [PRIZEBOXDATA.html](https://openkh.dev/bbs/file/type/PRIZEBOXDATA.html).

### BBS-017

**Spiderchest Fleeting discrepancy — evidence: closed; practical disposition: resolved.**

**Player goal:** Use the correct Fleeting Crystal enemy/shop-level relationship.

**Current guidance:** Spiderchest Fleeting Crystal is 3.6% at Shop 1–2 only; source relationship is integrated in both generators and detail views.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Spiderchest](https://www.khwiki.com/Spiderchest).

### BBS-018

**Keyblade reach/passives and modern roster validation — evidence: partial; practical disposition: deferred.**

**Player goal:** Choose and collect character-appropriate Keyblades.

**Current guidance:** The 24 weapon forms, 48 character/episode records, acquisition conditions, Strength/Magic values, reach evidence and Royal Radiance passive are available. Brightcrest and Master’s Defender retain episode scope.

**Deferred precision:** The Pixie Petal critical multiplier dispute (1.35 versus 1.5) and independent retail reach/stat certification.

**Decision and reason:** These values do not change where the weapon is obtained or whether it completes a collection goal. Exact damage optimization is optional; the disagreement is retained rather than selected arbitrarily.

**Reopen/next evidence:** A damage optimizer is approved, or a weapon recommendation demonstrably changes because of the disputed value.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Weapon.html](https://openkh.dev/bbs/executable/Weapon.html), [bbsAPKeybladeStats.lua](https://github.com/gaithern/KH-BBS-AP-LUA/blob/HEAD/bbsAPKeybladeStats.lua).

### BBS-019

**Ice cream recipe certification and obtain-versus-make alternatives — evidence: partial; practical disposition: deferred.**

**Player goal:** Make ice cream, unlock Sweetstack and satisfy manufacture goals.

**Current guidance:** All 14 recipes have independent PSP-FM quantity corroboration, with eight eligible recipes per character and the 42 flavors joined to 22 character/event routes. Making the eight eligible kinds at the Disney Town shop is the documented route.

**Deferred precision:** Whether every purchased/story-awarded substitute also satisfies every current Steam completion predicate.

**Decision and reason:** Making a missing recipe supplies a supported completion route; proving substitutes would only avoid possible duplicate manufacture. The app must not certify substitute credit or demand remaking an already-manufactured kind.

**Reopen/next evidence:** A player cannot receive Sweetstack after making all eight, or a save-aware ingredient planner needs confirmed substitute credit.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [ice-shop.htm](https://kouryakutsushin.com/khbbs/ice-shop.htm), [iceShop.html](https://openkh.dev/bbs/file/type/iceShop.html).

### BBS-020

**Flavor/Prize Pod exact farming routes — evidence: closed; practical disposition: resolved.**

**Player goal:** Farm the required ice-cream flavors in the correct character/event.

**Current guidance:** All 42 flavor records now join character-scoped room/event routes across 22 Prize Pod route records. Spawn-wave/interaction notes and world reset guidance are integrated; Arena replay reset is kept separate.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Prize_Pod](https://www.khwiki.com/Prize_Pod), [Flavors](https://www.khwiki.com/Flavors), [Ice_cream](https://www.khwiki.com/Ice_cream).

### BBS-021

**Mirage Arena unlock AND/OR logic — evidence: partial; practical disposition: deferred.**

**Player goal:** Unlock Mirage Arena battles and their rewards.

**Current guidance:** Twenty-nine level conditions, six priced tickets and normal entry rules are integrated. Combined Threat uses Arena 7 plus Radiant Garden. For A Time to Chill, the conservative completion route meets Arena 13 and retains Aqua clear data before trying entry.

**Deferred precision:** Character-specific early Time to Chill exceptions and whether tickets bypass story/other-character clear-data requirements.

**Decision and reason:** Meeting the documented level and story/clear-data conditions avoids relying on an unverified early-entry shortcut. Ticket bypass of story gates must not be promised.

**Reopen/next evidence:** A battle remains locked after its documented normal conditions, or an early Arena route specifically depends on the ticket exception.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [arenamode.htm](https://kouryakutsushin.com/khbbs/arenamode.htm), [ArenaData.html](https://openkh.dev/bbs/file/type/ArenaData.html), [bbsMaxLevelArena.lua](https://github.com/gaithern/KH-BBS-AP-LUA/blob/HEAD/bbsMaxLevelArena.lua).

### BBS-022

**Arena HP/reward source conflict and omitted bonuses — evidence: partial; practical disposition: deferred.**

**Player goal:** Clear the correct battle to obtain its reward and Arena progress.

**Current guidance:** Character reward identities, important Shotlocks/Keyblades, Mini, HP bonuses and Sky Climber are documented; the two disputed HP amounts remain visible.

**Deferred precision:** Exact modern HP increases for A Time to Chill (+5/+10) and Light’s Lessons (+10/+15).

**Decision and reason:** Both disputed amounts point to the same battle and positive HP reward. Collection and Arena-clear goals do not require an exact HP budget; preserve uncertainty rather than choose a number.

**Reopen/next evidence:** A precise HP progression planner is approved or a battle reward observation resolves the conflicting value.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [arenamode.htm](https://kouryakutsushin.com/khbbs/arenamode.htm), [mission.html](https://openkh.dev/bbs/file/type/mission.html).

### BBS-023

**Ringer Ticket purchase price — evidence: closed; practical disposition: resolved.**

**Player goal:** Buy the correct Arena ticket at its actual documented cost/gates.

**Current guidance:** Ringer Ticket costs 250 medals; Shop Level 1 AND Arena Level 5, one Dead Ringer entry. All six tickets are structured and displayed.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Battle_Ticket](https://www.khwiki.com/Battle_Ticket), [Game:Mirage_Arena](https://www.khwiki.com/Game:Mirage_Arena), [Moogle_Shop](https://www.khwiki.com/Moogle_Shop).

### BBS-024

**Arena level-up predicates are documented but not represented fully — evidence: closed; practical disposition: resolved.**

**Player goal:** Understand the normalized Arena level and completion conditions.

**Current guidance:** All 29 FM Arena level predicates are structured: six cumulative-medal thresholds, 15 battle clears, four five-lap course times and four board-win counts. Existing battles/races plus 30 scoped medal/board check records cover the predicates.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Game:Mirage_Arena](https://www.khwiki.com/Game:Mirage_Arena), [Arena_Mode](https://www.khwiki.com/Arena_Mode).

### BBS-025

**Unversed Mission exact rank boundaries — evidence: partial; practical disposition: deferred.**

**Player goal:** Earn three stars and collect each Unversed Mission reward.

**Current guidance:** All nine complete rank tables and 27 character tactics are present. Conservative scoring guidance aims beyond the disputed boundary and uses the game’s awarded star rank to confirm success.

**Deferred precision:** Exact Steam equality comparators for five published score/survival thresholds.

**Decision and reason:** A score above the disputed lower limit meets either interpretation. It avoids turning a one-point/one-second boundary into an unnecessary binary investigation.

**Reopen/next evidence:** The conservative target fails, or a score-tracking feature must distinguish an exact-boundary result.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [battlemisssion.htm](https://kouryakutsushin.com/khbbs/battlemisssion.htm), [exb.html](https://openkh.dev/bbs/file/type/exb.html).

### BBS-026

**Minigame full rewards, conditions and strategies — evidence: closed; practical disposition: resolved.**

**Player goal:** Meet minigame rewards and score/time conditions.

**Current guidance:** Integrated all five Final Mix Ice Cream Beat songs with Beginner/Master Good/Cool/Fantastic scores, first/repeat prizes and controls; Fruitball opponent first/repeat rewards and tactics; all four race rewards/route guides. Original Japanese Special mode and three/nine-lap targets are explicitly excluded from HD rules.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Ice_Cream_Beat](https://www.khwiki.com/Ice_Cream_Beat), [Fruitball](https://www.khwiki.com/Fruitball), [Rumble_Racing](https://www.khwiki.com/Rumble_Racing).

### BBS-027

**Command Board panels, ownership and mode exceptions — evidence: partial; practical disposition: deferred.**

**Player goal:** Acquire board-exclusive commands, unlock Pete and earn Arena board wins.

**Current guidance:** All seven boards, 45 bonus panels and 17 opponent inventories (288 command-level rows) are indexed. Menu command purchases are explicit; finish a menu game to retain purchases even without winning. Arena wins and medals are separate goals.

**Deferred precision:** Thirty-nine Skull inventory quantities, exhaustive mode-specific deck differences, AI purchase behavior and card draw probabilities.

**Decision and reason:** Known command names/panels and menu-mode instructions tell the player where to acquire the item; exact AI inventory multiplicity is not a guaranteed draw probability or a prerequisite for a win.

**Reopen/next evidence:** A named acquisition is absent in the advised mode, or an approved board simulator needs quantities/AI logic.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [Keyblade_Board](https://www.khwiki.com/Keyblade_Board), [Royal_Board](https://www.khwiki.com/Royal_Board), [Toon_Board](https://www.khwiki.com/Toon_Board), [Spaceship_Board](https://www.khwiki.com/Spaceship_Board), [Skull_Board](https://www.khwiki.com/Skull_Board), [Hunny_Pot_Board](https://www.khwiki.com/Hunny_Pot_Board), [Secret_Board](https://www.khwiki.com/Secret_Board).

### BBS-028

**Finish Command partial counter persistence — evidence: researched-open; practical disposition: deferred.**

**Player goal:** Unlock every branch of the finish-command tree without wasting progress.

**Current guidance:** The 46 nodes identify eligible equipped parent, metric, target and style. Practical guidance now says to keep an eligible parent equipped until the desired child unlocks.

**Deferred precision:** Whether switching away and back pauses or resets partial finisher progress.

**Decision and reason:** Staying on the eligible parent avoids the unknown transition entirely. A save-counter reverse-engineering project would answer an optional switching question without changing the safe unlock route.

**Reopen/next evidence:** A player needs to recover progress after switching, or a save-inspection/progress-migration feature is approved.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [finish-command.htm](https://kouryakutsushin.com/khbbs/finish-command.htm), [Finisher.cs](https://github.com/Xeeynamo/KingdomSaveEditor/blob/master/KHSave.LibBbs/Models/Finisher.cs), [SaveKhBbs.FinalMix.cs](https://github.com/Xeeynamo/KingdomSaveEditor/blob/master/KHSave.LibBbs/SaveKhBbs.FinalMix.cs).

### BBS-029

**Complete D-Link, Style and Shotlock families — evidence: partial; practical disposition: deferred.**

**Player goal:** Unlock and use styles, D-Links and Shotlocks, including usage achievements.

**Current guidance:** Fifteen styles, thirteen persistent D-Links and seventeen Shotlocks have unlock context; D-Links include 39 decks/finish lists, known emblem conditions and 22 action summaries. Achievement usage does not require calculating Pete’s emblem probability or finisher damage.

**Deferred precision:** Pete’s exact emblem/gauge values, generic Finish and Rumble Rave detailed timings/power, every damage/frame value and exhaustive exceptions.

**Decision and reason:** Unlock conditions, ordinary link use, enemy/emblem progression and on-screen action prompts support the collection/use goal. Detailed damage simulation is beyond the current feature.

**Reopen/next evidence:** A specific link/action cannot be performed from existing guidance, or a timing/damage simulator needs the missing values.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [D-Link](https://www.khwiki.com/D-Link), [Rumble_Rave](https://www.khwiki.com/Rumble_Rave), [Finish](https://www.khwiki.com/Finish).

### BBS-030

**Optional boss access, mechanics and recovery guidance — evidence: partial; practical disposition: deferred.**

**Player goal:** Defeat the optional bosses and finish the Secret Episode.

**Current guidance:** Six encounter overviews give access, reward, defensive openings, healing cautions and FM/HD distinctions. Unknown now explicitly recommends Second Chance/Once More, mobile healing windows and character-specific evasions; Vanitas Remnant retains the Cure-heals-boss warning.

**Deferred precision:** Exhaustive per-character attack/recovery tables, exact frame/damage/stat fields and all challenge-run exceptions.

**Decision and reason:** Ordinary completion has usable tactics and preparation without a frame-perfect strategy encyclopedia. No guarantee that a build wins every attempt is claimed.

**Reopen/next evidence:** A concrete attack repeatedly blocks a player using the current advice, or an approved challenge-run/damage feature needs precise mechanics.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [arenamode.htm](https://kouryakutsushin.com/khbbs/arenamode.htm), [BBSUM_Mod](https://github.com/Truthkey/BBSUM_Mod), [epd.html](https://openkh.dev/bbs/file/type/epd.html).

### BBS-031

**Episode and Trinity mixed-save aggregation — evidence: researched-open; practical disposition: open.**

**Player goal:** Unlock Final/Secret Episode after the main stories, especially with mixed-difficulty saves.

**Current guidance:** Letter plus Reports I–XII, all three clear files, distinct Aqua episode saves and the difficulty table support ordinary progression. Keep original main clear saves; check required in-game Trinity trophies. Existing guidance does not settle failed or mixed-difficulty unlocks.

**Decision and reason:** Not deferred: a wrong save-selection/aggregation rule can block story content or cause unnecessary replay. Keep this practical exception open.

**Still open:** Need current Steam save-selection/aggregation code or controlled mixed-difficulty clear-file matrix; no replay/deletion workaround is certified.

**Reopen/next evidence:** An applicable Steam save-selection implementation or reproducible current-build mixed-difficulty/clear-file matrix establishes the rule.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [SaveKhBbs.FinalMix.cs](https://github.com/Xeeynamo/KingdomSaveEditor/blob/master/KHSave.LibBbs/SaveKhBbs.FinalMix.cs), [Birth-by-Sleep-Randomizer](https://github.com/Truthkey/Birth-by-Sleep-Randomizer).

### BBS-032

**Steam achievement roster, hidden IDs/predicates and build issues — evidence: partial; practical disposition: open.**

**Player goal:** Earn and correctly diagnose the 45 Steam achievements.

**Current guidance:** All 45 BBS API IDs/goals are mapped; no PlayStation platinum is added. Manual award checks remain distinct from item/album completion. The 2024 Steam Collector anecdote confirms a reported failure, not its cause or a safe remedy.

**Deferred precision:** Raw hidden-flag booleans and purely presentational metadata beyond the 45 named goals.

**Decision and reason:** Hidden booleans do not change how the player earns a visible named goal, so that subfield is deferred. Save aggregation and current-build Collector failure diagnosis remain open because they can prevent an award.

**Still open:** Raw API hidden booleans, precise mixed-save aggregation and current-build Collector behavior remain uncertified. One Steam report does not establish prevalence, cause or a reliable replay workaround.

**Reopen/next evidence:** Current-build reproducible save/award evidence or official guidance identifies a non-destructive Collector/aggregation remedy.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), [?l=english](https://steamcommunity.com/stats/2552430/achievements/?l=english), [](https://steamcommunity.com/app/2552430/discussions/0/4514381183278271486/).

### BBS-033

**Edition and source provenance limits — evidence: provenance; practical disposition: other-limitation.**

**Player goal:** Understand the edition and confidence of the guide.

**Current guidance:** Sources, dates, edition distinctions and community-versus-retail provenance are explicit. Fresh page inspections are not gameplay/build certification.

**Deferred precision:** An exact executable/depot provenance stamp for otherwise usable guidance.

**Decision and reason:** Binary provenance alone would not improve a known player action. It remains an evidence limitation, with targeted build checks required if a version-dependent problem appears.

**Reopen/next evidence:** A concrete version-dependent discrepancy requires the original retail values.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), `source-manifest.json`, `command-catalog.json`, `research-enrichment.json`.

### BBS-034

**Original workbook/tool behavior recovery — evidence: provenance; practical disposition: other-limitation.**

**Player goal:** Use a functioning melding reference with traceable input data.

**Current guidance:** The 296-outcome source, historical workbook ranges, blank acquisition cells and repository tool lineage are preserved; current generators and solver behavior can be tested independently.

**Deferred precision:** Reconstructing an absent historical workbook/application UI or behavior.

**Decision and reason:** Recovering an unavailable predecessor does not change the current player-facing recipe/ability routes. This is a provenance limitation, not an unknown game rule.

**Reopen/next evidence:** The original artifact is supplied, or a concrete legacy behavior must be recovered.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), `source-manifest.json`, `../../sources/khtables-drive-audit.md`, `../../../bbsmelding/seed_objects.js`.

### BBS-035

**Implementation and app acceptance backlog — evidence: implementation; practical disposition: other-limitation.**

**Player goal:** Trust persistent progress, inventory changes and offline/mobile use.

**Current guidance:** Existing implementation and tests are documented; atomic consume/undo and full mobile/offline acceptance remain engineering work. Data Jiminy stays empty.

**Decision and reason:** Not deferred as game research and not marked complete: software acceptance requires its own implementation/QA work.

**Reopen/next evidence:** The separately tracked engineering acceptance work is undertaken.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), `../../implementation/bbsfm-review-checklist.md`, `../../readiness/birth-by-sleep-final-mix.md`, `../../../tests/bbs-model.test.ts`.

### BBS-036

**Visual fidelity, art and isolated 3D prototype — evidence: visual; practical disposition: other-limitation.**

**Player goal:** Use a faithful, readable BBS journal interface.

**Current guidance:** Reference assets and prototype context exist; production art, animation/weapon integration and device fidelity remain visual/engineering acceptance.

**Decision and reason:** Not converted into a gameplay research requirement or silently removed from app scope.

**Reopen/next evidence:** The separately tracked visual/device acceptance work is undertaken.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), `../../ui/references/bbsfm/README.md`, `../../implementation/bbsfm-3d-prototype.md`.

### BBS-037

**Historical/resolved caveats and explicit exclusions — evidence: excluded; practical disposition: other-limitation.**

**Player goal:** Follow Steam HD acquisition rules without PSP or KH0.2 requirements.

**Current guidance:** PSP multiplayer/transfer, standalone KH0.2 and tutorial Reports counting stay excluded. Thirteen legacy/temporary acquisition statements are now explicitly excluded from active command guidance.

**Decision and reason:** Settled scope exclusions are not unanswered mechanics; broader Reports achievements retain their separate requirements.

**Reopen/next evidence:** The user explicitly changes supported edition/game scope.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), `README.md`, `command-catalog.json`, `research_audit.md`.

### BBS-038

**No-crystal chance table and known rule presentation — evidence: closed; practical disposition: resolved.**

**Player goal:** Use no-crystal attachment chances without invalid-level calculator errors.

**Current guidance:** Calculator displays no-crystal ability chances 10/20/30/40/50% by combined levels, keeps Shotlocks ability-free, and rejects invalid/fractional input levels.

**Reopen/next evidence:** A concrete contrary observation changes the supported guidance.

**Evidence trail:** [full per-ID source ledger](research-dispositions-2026-10-01.json), `melding-reference.json`, [Command_Meld](https://www.khwiki.com/Command_Meld).

## Validation

- Both BBS generators pass: 1,653 entries, 492 recipes (468 melding groups and 24 character ice-cream recipes), 187 persistent commands, 46 finish nodes.
- All original entry and recipe ID sets exactly match the starting snapshot; 442 world-counted collectibles remain. Canonical JSON parses and `git diff --check` pass.
- Full `npm test`: 15 files, 144 tests passed. The dedicated practical-review suite contains 5 tests alongside the existing 14 BBS-model tests.
- `npm run build` passes content generation, empty Data Jiminy pack validation, TypeScript, Vite and PWA generation. Only the existing large-chunk advisory is emitted; this is not physical-device/offline acceptance.
- Data Jiminy remains `knowledgeState: empty`, 0 thoughts, 0 entries; no cross-game/shared test sources changed.
- First local checkpoint: `c82c8b0` on `research/bbs-practical-closure-2026-10-02`. Shell push was permitted after authorization evidence but failed because shell GitHub authentication is unavailable. The coordinator owns connected Git-data publication, remote tree/hash verification and integration; no remote push is claimed here before that verification.

This report does not certify release/device acceptance. The two open practical exceptions need applicable game/save evidence; an unavailable retail executable is a boundary, not an instruction that the user must play through the game.
