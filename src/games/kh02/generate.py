"""Generate 0.2's guide data from its checked-in researched factual inventories."""
import re,json,pathlib,collections
root=pathlib.Path('ai_docs/games/kh02');entries=[]
def slug(s):return re.sub('[^a-z0-9]+','-',s.lower()).strip('-')
def rows(file):
 section=''
 for line in (root/file).read_text().splitlines():
  if line.startswith('## '):section=line[3:]
  if line.startswith('| ') and not line.startswith('|---'):yield section,[c.strip() for c in line.strip('|').split('|')]
worlds={'ct':'Castle Town','ww':'The World Within','ft':'Forest of Thorns','dd':'Depths of Darkness'}
chestsource='https://www.khwiki.com/Game:Realm_of_Darkness#Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-'
objectiveSource='https://www.khwiki.com/Wardrobe_(KH0.2)'
psu='https://www.psu.com/news/kingdom-hearts-0-2-objectives-guide-complete-all-challenges/'
def add(id,cat,name,summary,**kw):
 e=dict(id='kh02:'+id,category=cat,name=name,summary=summary,character='Aqua',**kw);entries.append(e);return e
for sec,c in rows('collectibles.md'):
 if sec.startswith('Ordinary chests') and c[0].startswith(('ct-','ww-','ft-','dd-')):
  e=add(c[0],'treasures',c[2]+' · '+c[1],c[3],world=worlds[c[0][:2]],area=c[1],reward=c[2],instructions='Open the chest.',sources=[chestsource])
  if 'pillar-' in c[0]:e['instructions']='The two routes are beside the first struck pillar after inversion and near the exit after the second inversion.';e['uncertainty']='The Potion/Hi-Potion contents-to-route pairing is unresolved. The two checklist entries represent two separate physical chests.'
  if 'pending' in c[3] or 'validation' in c[3]:e['uncertainty']='Contents-to-landmark identification needs further documentary verification.'
 if sec.startswith('Zodiac chests') and c[0].startswith(('ct-','ww-','ft-','dd-')):
  e=add(c[0],'treasures',c[1]+' Zodiac chest',c[3],categories=['zodiac'],world=worlds[c[0][:2]],area=c[2],reward=c[1]+' relic',instructions='Open the chest. The relic and chest share this one checklist record.',prerequisites='First clear, or New Game Plus seeded from clear data.',missability='Previously acquired Zodiac relics carry into NG+; their chests remain open.',sources=['https://www.khwiki.com/Zodiac_symbols'])
  if c[0]=='ww-pisces':e['uncertainty']='Sources disagree between initial staircase arrival and the end of the stairs. Check behind Aqua at arrival first; the exact staircase state is unresolved.'
 if sec=='Seven mine gems' and c[0].isdigit():
  add('ww-gem-'+c[0],'gems','Mine gem '+c[0],c[1],world=worlds['ww'],area='Mines',instructions='Collect the visible gem. All seven together satisfy objective 29, Gem Gatherer.',missability='Collect all seven before leaving the mines and retain a pre-sequence save. Re-entry and NG+ retention are not verified; permanent missability is not established.',sources=['https://www.psu.com/news/kingdom-hearts-0-2-how-to-complete-objective-29-gem-gatherer/'])
 if sec=='Three flowers' and c[0].isdigit():
  add('ft-flower-'+c[0],'flowers','Flower '+c[0],c[1],world=worlds['ft'],area='Uncertain Path' if c[0]=='01' else 'Rocky Path',instructions='Use Firaga to remove red ivy. All three flowers satisfy objective 34, Fairy Bouquet.',missability='The researched guide supports returning through save-point teleportation.',uncertainty='Route labels are editorial; colors are not assigned because the color-to-route mapping is not verified.',sources=['https://www.gameskinny.com/tips/kingdom-hearts-28-guide-how-to-find-the-3-flowers-for-objective-34/'])
 if sec=='Four Lingering Memories' and c[0].endswith('-memory'):
  e=add(c[0],'memories',c[2],c[3],world=worlds[c[0][:2]],instructions='Collect this memory for objective '+c[1]+'.',prerequisites='First clear or seeded New Game Plus.',sources=[psu,'https://guiding-key.tumblr.com/kh0.2-locations'])
  if c[0]=='ct-memory':e['uncertainty']='The exact rooftop/awning building is not verified.'
  if c[0]=='ft-memory':e['uncertainty']='The orange symbol is also described as a sewing machine by one source; visual object label remains uncertain.'
def objectiveworld(n):
 if n in [23,24,25,36,37,38]:return worlds['ct']
 if n in list(range(26,32))+list(range(39,44)):return worlds['ww']
 if n in [32,33,34,44,45,46,47]:return worlds['ft']
 if n in [35,48,49,50]:return worlds['dd']
 if n==51:return 'Homecoming'
 return None
extra={
18:'Prism Rain needs 28 locks for bonus prompts. Six consecutive Excellent ratings span attacks; they need not be exactly two perfect attacks. Each complete attack offers three prompts.',
24:'After restoring the floating platforms with all five gears, use Doubleflight and Air Slide. From the north of the hub, climb the broken arch and rising left ledges to the highest floating structure.',
25:'Reach the town summit by the north-side broken arch and rising ledges, then look upward at the meteor shower; wait briefly if necessary.',
27:'Extinguish all four candelabra in the dark mirror room, then defeat the enemies.',
28:'Inspect the outside mirror and select the chest whose reflection is closed. Open its matching chest inside. This is the World Within Mega-Ether treasure, not a second physical acquisition.',
29:'Track all seven individual mine gems on the Gems page. Objective completion and wardrobe ownership are separate manual checks.',
30:'Stop the moving mine platforms when their markings align into a star.',
34:'Track the three flowers on the Flowers page. Burn red ivy with Firaga.',
36:'Use Spellweaver Finish for the final blow against Castle Town’s Demon Tower. The Depths fight does not satisfy this objective.',
41:'Take no damage in the third story Phantom Aqua fight. The enhanced Zodiac Phantom does not substitute for this encounter.',
42:'Collect all twelve Zodiac relics, return to the central Zodiac circle in The World Within, and enter the mirror. Round 1: Darkside, Flutterings, Shadows, Neoshadows. Round 2: Flame, Earth and Water Cores. Round 3: Shadows, Neoshadows, Flutterings. Round 4: Demon Tower and Shadows. Round 5: enhanced Phantom Aqua. Leaving restarts round one. No mandatory no-damage condition applies here. Evade enhanced Phantom’s red-aura attacks and use openings after attack strings.',
43:'The twelve Zodiac relics are the contents of twelve treasure chests; the Zodiac page and Treasures page share their checklist state.',
47:'The target is the story Darkside supporting the orb. Preserve a save before the encounter for another attempt.',
50:'Win the Depths Demon Tower fight with Wayfinder active. The researched guide does not require its Finish command; do not substitute Castle Town’s Spellweaver objective.',
51:'Defeat the final Demon Tide on Critical, unlocked after a first clear. Proud satisfies the difficulty achievement but does not satisfy this objective.'}
for _,c in rows('objectives-and-wardrobe.md'):
 if len(c)!=5 or not c[0].isdigit():continue
 n=int(c[0]);slot,reward=c[4].split(': ',1);slot='Arms' if slot=='Arm' else slot
 kw=dict(reward=slot+': '+reward,prerequisites=c[3],collectible=False,order=n,sources=[objectiveSource,psu]);w=objectiveworld(n)
 if w:kw['world']=w
 e=add('objective:'+c[0],'objectives',c[0]+' · '+c[1],c[2]+'.',**kw)
 if n in extra:e['instructions']=extra[n]
 if n in [36,41,47,50,51]:e['missability']='A live story encounter may require NG+. Preserve a pre-encounter save; Zodiac rematches do not replace the specified story fight.'
 if n in [13,14,15]:e['uncertainty']={13:'Sources conflict between 30 and 50 Lightning final blows. Neither threshold is certified.',14:'Exact hidden travel distance is unknown; no numeric target is invented.',15:'Freeze five enemies and shatter five; whether all five must shatter simultaneously is unresolved. Grouping enemies is a practical strategy.'}[n]
 if n==8:e['instructions']='Astral Ornament is also called Divine Back in an older guide; these are the same reward, not two cosmetics.'
 if n==42:e['categories']=['challenges']
 # Cosmetic ownership is distinct from objective completion and has a stable cosmetic identity.
 wardrobe=add('wardrobe:'+slug(reward),'wardrobe',reward,slot+' · Objective '+c[0]+': '+c[1]+'.',area=slot,instructions='Complete objective '+c[0]+': '+c[2]+'. Mark ownership here when the reward is received; the objective completion check remains separate.',prerequisites=c[3],collectible=False,order=n,sources=[objectiveSource])
 if w:wardrobe['world']=w
 if n in [13,14,15]:wardrobe['uncertainty']=e['uncertainty']
for sec,c in rows('replay-challenges-achievements.md'):
 if sec.startswith('Achievement overlay') and len(c)==4 and c[2].isdigit():
  e=add('achievement:'+slug(c[0]),'achievements',c[0],c[1]+'.',collectible=False,sources=['https://steamcommunity.com/stats/2552440/achievements/','https://www.khwiki.com/Trophies#Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-'])
  detail={'Treasure Hunter':'The researched set contains all 41 chests, including twelve post-clear Zodiac chests and the Main Road chest. Exact runtime trigger remains unverified.','Ambitious':'Complete all 51 objectives. Area collectible completion alone does not satisfy this goal.','Shotlock Star':'One Excellent rating is enough; objective 18 requires six consecutive ratings.','Fashionista':'Fill all four wardrobe slots. Unlike objective 21, no Spellweaver finisher is required.','Ice Queen':'Use Spellweaver Finish five times; objective 20 needs only one.','Proud Player/Critical Competitor':'Proud or Critical qualifies. Objective 51 requires Critical specifically.','Undefeated':'Track this as a run goal. Avoid death-related Retry/Continue; do not assume ordinary checklist completion proves the run condition.','A Magical Finale':'The exact magic Situation Command set and cross-run counting rules are not yet normalized.','Dark Explorer':'No numeric movement distance is established by the inspected sources.'}
  if c[0] in detail:e['instructions']=detail[c[0]]
add('reference:replay','reference','Replay and New Game Plus','First clear unlocks Critical, Zodiac chests, Lingering Memories and late objectives.',instructions='Complete post-clear exploration and optional fights, then seed a Critical run from that clear data. Complete encounter-specific objectives while their story fights are live. Zodiac relics remain acquired in NG+; their chests stay open. Objective/wardrobe completion is reported to carry, while levels do not. Ordinary chest, gem and memory carry/re-entry rules are not exhaustively verified. The guide’s saved checks record your manual progress; they do not read or alter game saves.',checkable=False,collectible=False,sources=[objectiveSource,psu])
add('reference:wardrobe','reference','Wardrobe slots','Head, Arms, Back and Pattern.',instructions='There are 51 earned cosmetic rewards. Plain is the default Pattern, not a 52nd unlock. Color controls are customization settings, not collectibles. Objective completion and cosmetic ownership are separate checks; mark the reward after you receive it.',checkable=False,collectible=False,sources=[objectiveSource])
add('reference:combat','reference','Combat tools','Aqua uses the Command Menu, Prism Rain, Spellweaver and Wayfinder.',instructions='This game has no BBS Command Deck melding or synthesis. Doubleflight and Air Slide support elevated routes. Firaga burns red ivy. Prism Rain’s bonus prompts require 28 locks. Spellweaver Finish conditions and Wayfinder-active victories are different objective predicates; use the specific objective text.',checkable=False,collectible=False,sources=[psu,'https://www.khwiki.com/Kingdom_Hearts_0.2_Birth_by_Sleep_-A_fragmentary_passage-'])
counts=collections.Counter(e['category'] for e in entries)
assert counts['treasures']==41 and counts['gems']==7 and counts['flowers']==3 and counts['memories']==4
assert counts['objectives']==counts['wardrobe']==51 and counts['achievements']==15
assert len({e['id'] for e in entries})==len(entries)
physical=[e for e in entries if e.get('collectible',True)]
assert len(physical)==55
assert collections.Counter(e['world'] for e in physical)==dict(zip(worlds.values(),[11,21,16,7]))
pathlib.Path('src/games/kh02/catalog.ts').write_text('// Generated from checked-in research by generate.py.\nimport type {CollectionEntry} from "../types";\nexport const entries: CollectionEntry[] = '+json.dumps(entries,ensure_ascii=False,indent=2)+';\n')
print(dict(counts),'physical',len(physical))
