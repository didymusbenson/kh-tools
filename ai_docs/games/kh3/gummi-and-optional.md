# KH3 Gummi, Battlegates and optional rewards

Research date: 2026-09-18. [Index](README.md).

## Battlegates and Secret Reports

There are 15 gate identities, numbered 0–14. Gate 0 is available during the Keyblade Graveyard visit; gates 1–14 open after the ending. Gates 1–13 grant the corresponding Secret Report. Gate 14 is Dark Inferno and awards Crystal Regalia. Gate 0 has no report. First-clear state, repeated farming and equipment/report acquisition must be modeled separately. [Battlegate](https://www.khwiki.com/Battlegate).

| Gate | World / area | First-clear equipment/material, besides report |
|---:|---|---|
| 0 | Keyblade Graveyard / Skein of Severance | No report |
| 1 | Olympus / Courtyard | Fire Cufflink |
| 2 | Olympus / Apex | Cosmic Belt+ |
| 3 | Twilight Town / Old Mansion | Evanescent Crystal |
| 4 | Toy Box / Kid Korral | Megalixir |
| 5 | Toy Box / Main Floor 1F | Thunder Cufflink |
| 6 | Corona / Wetlands | Illusory Crystal |
| 7 | Corona / Hills | Aero Cufflink |
| 8 | Monstropolis / Tank Yard | Illusory Crystal |
| 9 | Arendelle / Middle Tier | Evanescent Crystal |
| 10 | Caribbean / Huddled Isles | Water Cufflink |
| 11 | San Fransokyo / North District | Yin-Yang Cufflink |
| 12 | San Fransokyo / Central District | Blizzard Cufflink |
| 13 | Keyblade Graveyard / Badlands | Celestriad |
| 14 | Keyblade Graveyard / Badlands | Crystal Regalia |

Reward rows are also present in the corresponding [world gameplay sources](collectible-inventory.md). Reports are collectible rewards, not biography gates. A report index links to its gate requirement; do not count the gate and the report as two world chests. Gate-clear selfie rewards occur at 5, 10 and 14 distinct nonzero gates. [Battlegate](https://www.khwiki.com/Battlegate).

## Other world acquisition events

Five Golden Herc Figures: two at Overlook (bench opposite save point, giant statue’s shield), two at Gardens (storage-building bench, excavated hole), one at Alleyway (rear scaffolding near the temple). After Olympus, deliver the set to the child in Agora for Hero’s Belt. Count five figures and one derived reward event, not six figures. [Golden Herc Figure](https://www.khwiki.com/Golden_Herc_Figure).

Forest Clasp’s four Rapunzel activities are explicitly [tracked as a missable equipment route](collectible-inventory.md#acquisition-rules-that-change-the-route). Story reward acquisition links may be shown for weapons and abilities without turning the story into a completion checklist.

The Final World’s extra Sora-copy HP rewards, Olympus rescue rewards, Caribbean white-crab levels and special ship fleets remain acquisition-relevant research tasks. Their exact quantities, one-time triggers and replayability are not certified here. Do not silently omit them or put them into the base chest denominator.

## Gummi zone inventory structure

Each zone needs its own stable battle, treasure, sphere, constellation and blueprint-fragment records. Overworld asteroid resources are repeatable sources, not unique treasures. A battle may supply multiple rank-dependent rewards. The relevant zone tables enumerate **10 Starlight Way battles, 17 Misty Stream battles and 6 Eclipse battles**; these counts describe map battle entries, not the complete Gummi collectible total.

| Zone | Constellations and coarse location | Blueprint-fragment completion reward |
|---|---|---|
| Starlight Way | Cactuar: Corona side, lower right; Bomb: Olympus side; Moogle: upper left between Twilight Town/Toy Box | Vega |
| Misty Stream | Endymion: lower middle between San Fransokyo/Caribbean; Tonberry: upper right near Arendelle; Imp: upper left near Monstropolis | Sirius |
| The Eclipse | Bismarck: lower left; Ultros: upper middle near Keyblade Graveyard; Omega: lower right | Shooting Star |

Sources: [Starlight Way](https://www.khwiki.com/Starlight_Way), [Misty Stream](https://www.khwiki.com/Misty_Stream), [The Eclipse](https://www.khwiki.com/The_Eclipse), [Gummi Missions](https://www.khwiki.com/Gummi_Missions). The nine constellation photographs unlock their associated blueprints. Coarse map positions still need textual flight directions and camera alignment; missing production images do not excuse missing directions.

The global Gummi Missions table spans all zones. Its goal ladders include waypoints 3/6/9, discovered worlds 2/6/9, enemy defeats 500/1,500/3,000/5,000/9,999, distinct special weapons 3/5/7/10/13 and treasure spheres 1/3/5/7/9. All three zone fragment sets and nine constellation missions are separate. The final “Gummi Ship Completionist” row has an opaque description, so its exact predicate is unresolved. [Gummi Missions](https://www.khwiki.com/Gummi_Missions).

## Optional Gummi bosses

| Encounter | Access / meaningful requirement | Acquisition relationship |
|---|---|---|
| Schwarzgeist | Misty Stream; ship Speed at least 200 | Thermosphere achievement; A rank is separately relevant to an EZ merit |
| Omega Machina | Eclipse; clear the other five battles first | One of the seven Orichalcum+ events |

Sources: [Schwarzgeist](https://www.khwiki.com/Schwarzgeist), [Omega Machina](https://www.khwiki.com/Omega_Machina), [Orichalcum](https://www.khwiki.com/Orichalcum). Neither boss is a Re Mind purchase gate. Do not confuse the Omega constellation/blueprint with Omega Machina or Schwarzgeist with a similarly named blueprint.

Steam’s Salvager target is **20 unique Gummi treasures**. This is a trophy threshold, not evidence that only 20 Gummi treasures exist. Stargazer covers the constellation photographs. [Steam achievements](https://steamcommunity.com/stats/2552450/achievements/).

## Required extraction still open

- Full zone treasure/rank reward lists, nine sphere contents and precise sphere locations.
- Every blueprint fragment, normal/special blueprint, part, special weapon and acquisition alternative; deduplicate shared rewards.
- Complete Gummi mission list and exact final completion predicate.
- Gummi editor cost/level/ability constraints only where they support an acquisition route; calculator fixtures must be tested.
- Gate encounter routes, repeat-clear reward semantics and accessible farming directions; Dark Inferno strategy adequate for acquiring its reward.
- Caribbean ship progression/rewards as a separate module from Gummi.

No module above is deferred. These are required data/verification gaps before a release can claim self-contained acquisition guidance.
