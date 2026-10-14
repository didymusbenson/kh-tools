# KH1 pagination review: deferred design decision

Status: reference notes only. The user has not chosen a pagination or scrolling redesign. Preserve the existing UI until a direction is approved. The user prefers organized, visible detail and modest scrolling over extra reveal clicks; an accordion design is not requested.

## Baseline observed before the activity category split

Reviewed production commit `7a5015e` on 2026-10-14 in cloud Chrome at 1180 × 757. Responsive page counts below are a snapshot, not fixed requirements or post-split counts.

| Index | Entries | Pages |
| --- | ---: | ---: |
| All Reference | 1259 | 180 |
| Challenges & Gummi (old combined category) | 293 | 42 |
| Equipment | 196 | 28 |
| Materials | 34 | 10 |
| Trinity Marks | 46 | 10 |
| Achievements | 55 | 8 |
| Heartless | 44 | 7 |
| Dalmatians | 33 groups | 5 |
| Recipes | 33 | 5 |
| Magic | 21 | 4 |
| Reports | 13 entries, 10 checkable actions | 3 |

Gigas Shadow had six Notes pages against one overview. Three-row stat chunking can repeat “continued” headings on the same page. Nineteen material families can create unused space.

Possible direction for later consideration: scrollable lists and detail panels within the fixed book frame, with optional search or jump links. Keep the treasure grid and the Enemy Drops / Other Sources tabs. These are options for discussion, not approved implementation work.

## Separate category change

The approved priority is to replace the combined category with Coliseum (96 cup records, Ice Titan, Sephiroth, and both Phil’s Training tests: 100 total), Gummi (165 records), and Challenges (20 other mini-games plus 8 other boss records: 28 total). All 293 IDs and their recorded state remain intact. Existing focused links from Challenges to a cup or Gummi entry are routed to the new category, retaining world and collection filters. The Mini-Games shortcut remains available.

## Gummi Ship organization

The Gummi Ship chapter now opens a three-page directory: Parts (80 blocks and 7 tools, reference-only), Missions (30 checkable missions grouped by destination, plus 4 separately labelled build/strategy guides), and Blueprints (48 checkable records). Parts retain visible class headings with a Tools subsection. This is a category split using existing pagination, not a scrolling redesign. All original IDs and checks remain unchanged. Focused legacy Gummi and Challenges links open the matching subpage and preserve world/collection context; search and related links use canonical subpages.
