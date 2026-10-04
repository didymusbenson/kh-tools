# KH1, KH2 and KH3 treasure metadata crosswalk

Implementation date: 2026-10-04. Presentation metadata only. The canonical catalogues, reward/direction text and all saved IDs are unchanged.

## Files and reproducibility

- `src/games/treasure-data/kh1fm.json`: 306 included acquisitions.
- `src/games/treasure-data/kh2fm.json`: 301 Sora Journal slots plus 16 separate Roxas guide positions.
- `src/games/treasure-data/kh3.json`: 245 base slots plus 9 Re Mind slots.
- `tools/content/treasure-kh-maps.py`: deterministic build and `--check` validation. It reads the canonical catalogues and the checked-in 2026-10-04 mapping inventory. It never changes a catalogue or saved ID.

Run `python tools/content/treasure-kh-maps.py --check`. The checks enforce exact stable-ID coverage, unique IDs, valid evidence references, contiguous scoped Journal sequences, KH2 world/number/reward/area identity equality to all 301 candidate rows, the reviewed Roxas identities, the KH3 proposed pair set, alias exceptions and 245/9 boundary. `companionOrder` is contiguous per world/character/scope; KH1 grouping preserves these references instead of renumbering survivors.

## KH1: finite acquisition taxonomy

The 306 existing treasure-category entries comprise **190 source-supported chests, 19 other physical containers and 97 other rewards/acquisitions**. All are included. This is the physical subset of the existing treasure category, not an all-game chest census. There is no asserted native Journal sequence or column geometry. Every position is explicitly app-defined Guide order.

Classification uses the actual action and named location, not the old `countingUnit` alone:

- 16 Atlantica clams, the Ursula sea-urchin shell, Pooh's cabinet and the Atlantica World Terminus container are containers.
- All 12 timed Clock Tower door rewards are other acquisitions, retaining their existing hour-cycle, revisit and Phantom restrictions in canonical details.
- Tea Party chair rewards, the Bizarre Room plant/book interactions, direct Coliseum Green Trinity reward, vase reward, Jack's doorbell, Pooh's chimney/log interactions, five Rare Nuts and the Lift Stop switch bundle stay outside the chest count.
- Olympia is a chest despite its historical `one-time-reward` label. The Bizarre Room lamp's Defense Up and Green Room clock's Mythril appear in chests; their triggers alone must not misclassify them as direct gifts.
- Ordinary explicitly described chests remain distinct even when their rewards or rooms repeat. Nothing is joined by reward name alone.

| World | Chests | Containers | Other acquisitions | Total | Independent snapshot locations |
|---|---:|---:|---:|---:|---:|
| Destiny Islands | 1 | 0 | 3 | 4 | 1 |
| Traverse Town | 14 | 0 | 19 | 33 | 21 |
| Wonderland | 15 | 0 | 8 | 23 | 19 |
| Olympus Coliseum | 6 | 0 | 12 | 18 | 6 |
| Deep Jungle | 15 | 0 | 15 | 30 | 19 |
| Agrabah | 32 | 0 | 2 | 34 | 37 |
| Monstro | 16 | 0 | 0 | 16 | 21 |
| Atlantica | 7 | 17 | 1 | 25 | 0 |
| Halloween Town | 14 | 0 | 2 | 16 | 19 |
| Neverland | 7 | 0 | 14 | 21 | 11 |
| 100 Acre Wood | 5 | 1 | 17 | 23 | 4 |
| Hollow Bastion | 33 | 0 | 4 | 37 | 33 |
| End of the World | 25 | 1 | 0 | 26 | 25 |

### The independent 216-location snapshot

The [pinned Archipelago location source](https://github.com/ArchipelagoMW/Archipelago/blob/1322ce866eddb1ccf0ca042db93ceef8789d6029/worlds/kh1/Locations.py), checked into `tools/content/import-collectibles.sources.json`, supplies named physical locations without a vanilla reward crosswalk. Its world counts above are deliberately a separate column. It includes locations represented by specialist categories or temporary story content and omits Atlantica's container set and some Final Mix material. Its count therefore cannot replace 306 or 190.

The generator includes 37 explicit source-row → physical-location-code corroborations for records whose canonical wording does not itself say “chest.” These assert world/landmark correspondence and physical kind only; the canonical record supplies the Final Mix reward. Ambiguous right/left or numbered-only randomizer associations are not asserted as exact location-code joins. Five further physical-kind decisions use world/area/reward guide corroboration. The remainder use the explicit canonical acquisition action. This is not a claim that all 216 snapshot rows have a complete saved-ID crosswalk. The legacy-value crosswalk was also inspected; it has no treasure-ID mappings and is not used as a chest roster.

New source check: [KHGuides treasure guide](https://www.khguides.com/kh/collectibles/treasures/) corroborates the clock/lamp/torch chest triggers and separates cabinet and incidental interactions. Canonical KHWiki source links remain attached to each world's evidence. Exact physical taxonomy is source-backed; no new gameplay inspection is claimed.

### Existing specialist identities and aliases

The map includes only the 306 treasure-category IDs. Puppy, postcard, torn-page, Trinity, magic and summon categories stay intact and accessible through their existing views. They are not cloned into additional treasure cells. In particular, the two Gizmo postcards retain their existing shared acquisition in the postcard system, and acquiring a chest is not automatically identical to activating a prerequisite Trinity.

The three treasure aliases copied from existing `facts.acquisitionId` are:

| Treasure ID | Existing acquisition group |
|---|---|
| `kh1fm-treasure-olympus-coliseum-coliseum-gates-mythril-04` | `kh1fm-trinity-green-04` |
| `kh1fm-treasure-traverse-town-reward-28-brave-warrior` | `kh1fm-magic-fire-guard-armor` |
| `kh1fm-treasure-neverland-reward-04-fairy-harp` | `kh1fm-summon-tinker-bell` |

No new implicit aliases were invented. All 306 IDs remain represented once in this map, including the three linked views. Existing progress normalization remains authoritative across categories.

### Reference pixels

`references/kh1fm/kh-hd-report-index.jpg` and `kh-hd-journal-detail.jpg` were re-inspected as pixels. They support the green frame, indigo index/help page, ruled cream leaves and central binding, but show no treasure grid. Accordingly, KH1 metadata has no native geometry.

## KH2: 301 Journal slots and separate 16-entry prologue

All 301 Sora records match the checked-in candidate tuple `(world, Journal number, reward, area)`. Route evidence exists for all 301. Two summon-charm instructions have deliberate appended summon information; Garden of Assemblage #46 has a later precise instruction emphasizing that opening the proof chest remains separate from winning all Data battles.

Evidence is retained at field level:

- 188 pairs independently matched the explicit left-to-right/top-to-bottom [KHGuides Journal-order table](https://www.khguides.com/kh2/collectibles/treasures/) in the prior checked-in audit.
- Disney Castle #7 remains **Mythril Shard, Courtyard**; its resolved Final Mix correction has separate evidence. The conflicting Blazing Shard string is not imported.
- The remaining 112 use the checked-in numbered workbook and reviewed world/area/reward tuple. These are source-supported, not newly pixel-certified.

| Sora world | Journal positions |
|---|---:|
| Twilight Town | 1–39 |
| Radiant Garden | 1–46 |
| Beast's Castle | 1–21 |
| Olympus Coliseum | 1–20 |
| Agrabah | 1–26 |
| The Land of Dragons | 1–21 |
| 100 Acre Wood | 1–20 |
| Pride Lands | 1–25 |
| Disney Castle | 1–8 |
| Timeless River | 1–7 |
| Halloween Town | 1–14 |
| Port Royal | 1–21 |
| Space Paranoids | 1–14 |
| The World That Never Was | 1–19 |

Radiant Garden #23–46 are the 24 Cavern of Remembrance slots within its 46. Atlantica adds no Sora chest board. Roxas's 16 prologue IDs, including two Dive to Heart chests, use scope `prologue`, character `Roxas`, app-defined order and **no `journalSlot`**. They do not occupy Sora's 39 Twilight Town positions.

A bounded public-reference search did not produce a newly inspectable KH2 native Treasures image. One result titled a KH2 Final Mix Journal transcript actually contains Re:CoM card/story content and was rejected. The previously supplied video remains an existing unresolved reference. KH2 deliberately has no geometry metadata; layout columns are a companion choice until native pixels establish them.

## KH3: all 254 source-supported pairs

The checked-in audit's full explicit pair set is materialized by stable ID and world; source number must also equal the canonical named chest number. Existing area, route and reward fields stay on their original acquisition record. No reward-name-only join is performed.

[Kalavinka's Gummiphone transcript, GP09](https://gamefaqs.gamespot.com/ps4/718920-kingdom-hearts-iii/faqs/78580) is the source-supported order authority (PS4 v1.10/DLC-inclusive). Its previous full comparison found 248 exact reward strings and six harmless aliases, all retained:

| ID | Canonical reward | Source normalization |
|---|---|---|
| `kh3.base.toy-box.chest.006` | Petit Ribbon | Petite Ribbon |
| `kh3.base.the-caribbean.chest.017` | Map:Isla de los Mástiles | Map: Isla de los Mástiles |
| `kh3.base.the-caribbean.chest.018` | Map:Ship's End | Map: Ship's End |
| `kh3.base.the-caribbean.chest.019` | Map:Sandbar Isle | Map: Sandbar Isle |
| `kh3.base.the-caribbean.chest.020` | Map:Huddled Isles | Map: Huddled Isles |
| `kh3.base.the-caribbean.chest.051` | Map:Port Royal Waters | Map: Port Royal Waters |

| Scope/world | Slots |
|---|---:|
| Main · Olympus | 1–32 |
| Main · Twilight Town | 1–10 |
| Main · Toy Box | 1–29 |
| Main · Kingdom of Corona | 1–28 |
| Main · Monstropolis | 1–22 |
| Main · Arendelle | 1–25 |
| Main · The Caribbean | 1–56 |
| Main · San Fransokyo | 1–36 |
| Main · Keyblade Graveyard | 1–6 |
| Main · The Final World | 1–1 |
| Re Mind · Scala ad Caelum | 1–9 |

The actual `references/kh3/Kingdom-Hearts-III04022021-124325-74189.jpg` pixels were re-inspected: eight columns, grouped worlds and a single collection scrollbar; Olympus row 2/column 1 is selected and displays Map: Mount Olympus, directly corroborating #9. Colored closed chests, gray silhouettes, cyan selection and world totals are visible. This observation supports **base eight-column geometry**, not a claim that every pair was pixel-certified.

Re Mind's nine Scala ad Caelum IDs remain separately scoped. Its exact episode navigation, native geometry and combined/base denominator behavior are not established by the base screenshot. An eight-column DLC layout is a companion convention, expressly qualified in geometry metadata. The base total remains 245.

## Verification and remaining limits

- Deterministic generation and `--check` pass for 306 + 317 + 254 records.
- Mapping identity and scoped contiguous-order assertions pass. No existing catalogue/progress IDs were added, renamed or removed.
- The shared mapping/backup suite was exercised during integration; KH1 guide numbering was corrected to unique per-world references after its first run caught duplicate subgroup numbers.
- No new native KH1/KH2 treasure geometry is asserted. KH3 Re Mind geometry remains explicitly unverified. The 216-location KH1 source is reconciled as a separate-scope inventory, not silently adopted as the application denominator.
- Production reference imagery is not added; screenshots remain research evidence. Runtime maps are local JSON and need no network request.
