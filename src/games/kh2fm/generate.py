"""Regenerate researched KH2FM catalogs; run from repository root."""
import re,json,pathlib,math
root=pathlib.Path('ai_docs/games/kh2fm'); entries=[]; recipes=[]
def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower().replace('+',' plus ')).strip('-')
def rows(file):
 for line in (root/file).read_text().splitlines():
  if line.startswith('| ') and not line.startswith('|---'): yield [c.strip() for c in line.strip('|').split('|')]
def clean(s):return re.sub(r'\[([^]]+)\]\([^)]+\)',r'\1',s).replace('**','')
def links(s):return re.findall(r'\]\((https[^)]+)\)',s)
def norm(w):return {'Hollow Bastion / Radiant Garden':'Radiant Garden','Hollow Bastion':'Radiant Garden','Olympus':'Olympus Coliseum','Twilight Town (Roxas)':'Twilight Town'}.get(w,w)
def add(cat,name,summary,**kw):
 e=dict(id='kh2fm.'+cat+'.'+slug(name),category=cat,name=name,summary=summary,**kw);entries.append(e);return e
for file,cat in [('treasure-candidates.md','treasures'),('puzzle-candidates.md','puzzles')]:
 world=''
 for line in (root/file).read_text().splitlines():
  if line.startswith('## '):world=norm(line[3:].split(' — ')[0])
  if not line.startswith('| kh2fm.'):continue
  c=[x.strip() for x in line.strip('|').split('|')]
  if cat=='treasures':
   e=dict(id=c[0],category=cat,name=f'#{c[1]} · {c[2]}',world=world,area=c[3],summary=f'{c[2]} — {c[3]}.',reward=c[2],character='Sora',order=int(c[1]),uncertainty='Area and contents are recorded; exact chest landmark is not yet documented.',sources=['https://www.khwiki.com/Game:'+world.replace(' ','_')])
   if c[2]=='Proof of Nonexistence':e.update(prerequisites='Defeat all thirteen Organization XIII Replica Data battles.',instructions='Return to the Garden of Assemblage and open the chest that appears. Winning the battles does not automatically collect this proof.')
  else:
   e=dict(id=c[0],category=cat,name=f'{c[1]} · Piece {c[2]}',world=world,area=c[3],summary=f'{c[1]} puzzle piece {c[2]} — {c[3]}.',character='Sora',order=int(c[2]),uncertainty='Exact approach not yet verified; movement notes describe a candidate route, not a required minimum.',sources=['https://www.khwiki.com/Puzzle'])
   if c[4]!='Not stated in legacy row':e['prerequisites']='Candidate route: '+c[4]+'. Growth ability levels refer to standard Sora.'
  if cat=='treasures':
   if c[2]=='Torn Pages': e['categories']=['pages']
   if c[2] in ['Ukulele Charm','Feather Charm']: e['categories']=['summons']
  entries.append(e)
# Base and upgraded synthesis outputs. Ultima uses mandatory Energy Crystal paid costs.
for c in rows('synthesis-recipes.md'):
 if ' → ' not in c[0] or c[0].startswith('Base'):continue
 base,upgrade=c[0].split(' → ')
 ingredients=[dict(id='kh2fm.materials.'+slug(n.strip()),quantity=int(q)) for n,q in re.findall(r'([A-Za-z+ ]+?) x\s*(\d+)',c[2])]
 for name,is_upgrade in [(base,False)]+([] if upgrade=='—' else [(upgrade,True)]):
  ing=[dict(i) for i in ingredients];note=f'Unlock: {c[3]}. Base rank / EXP: {c[1]}. Quantities are before optional Energy and Moogle discounts.'
  if is_upgrade:
   m=re.search(r'(Serenity \w+) x\s*(\d+)',c[4]);assert m
   ing.append(dict(id='kh2fm.materials.'+slug(m[1]),quantity=int(m[2])))
   note+=' Uses the base recipe ingredients again, plus '+m[1]+'. Serenity requires Moogle level 3; check Creations availability after first synthesis.'
  if base=='Ultima Weapon':
   ing=[dict(id=i['id'],quantity=math.ceil(i['quantity']/2)) for i in ing];ing.append(dict(id='kh2fm.materials.energy-crystal',quantity=1))
   note='Ultimate Recipe; Moogle level 2 or higher. Includes the mandatory Energy Crystal: displayed raw 13 Orichalcum+ becomes 7, and all other base ingredients are halved, rounding each up. Only seven Orichalcum+ acquisitions exist. No additional Moogle discount assumed.'
  if 'CONFLICT' in c[5]:note+=' Source conflict: '+('Tranquility Gem / Stone also reported as 3 / 1; this list uses item-page 1 / 3.' if base=='Shock Charm' else 'rank also reported as S; automatic rank discounts are not applied.')
  if 'legacy lead' in c[4]:note+=' Upgrade modifier remains a legacy lead.'
  recipes.append(dict(id='kh2fm.recipe.'+slug(name),name=name,group='Upgraded outputs' if is_upgrade else 'Base recipes',ingredients=ing,instructions=note))
families=['Blazing','Frost','Lightning','Lucid','Power','Dark','Dense','Twilight','Mythril','Bright','Energy','Serenity','Remembrance','Tranquility']
matrows={clean(c[0]):c for c in rows('materials-and-equipment.md') if c[0].startswith('[') and len(c)==5}
for fam in families:
 for tieridx,tier in enumerate(['Shard','Stone','Gem','Crystal']):
  n=fam+' '+tier;e=add('materials',n,'',collectible=False,checkable=False,sources=['https://www.khwiki.com/Synthesis_material'])
  if fam in matrows:
   raw=matrows[fam][tieridx+1];e['summary']=raw+' (base %).';e['instructions']='Base drop chances before bonuses. '+raw+'.';e['uncertainty']='Enemy areas have not yet been normalized; the source identifies enemies, not a verified farming room.'
   drops=[]
   for part in raw.split('; '):
    m=re.match(r'(.+?)(?::)?\s+(\d+)(?: each)?$',part)
    if m:
     for enemy in m[1].rstrip(':').split(', '):drops.append(dict(enemy=enemy,rate=m[2]+'%',location='Area not yet verified'))
   e['drops']=drops
  else:e.update(summary='Acquisition details below.',uncertainty='Complete Final Mix source table is not yet normalized.')
  if fam=='Mythril':e.update(summary='Treasure chests; synthesis.',instructions='Use the matching Mythril recipe for repeatable production. Treasure supplies are finite; search Treasures for this material.',uncertainty='')
  if fam=='Tranquility':e.update(summary='Mushroom XIII — Conditional.',drops=[dict(enemy='Mushroom XIII',rate='Conditional',location='See Mushroom XIII category',details=f'{tier} rewards begin at '+['E','D','C','B'][tieridx]+' rank; A/S awards two Crystals. Journal appeasement targets are separate from reward rank.')],instructions='Repeat Mushroom challenges for rank rewards. Rank thresholds vary by mushroom.',uncertainty='')
  if fam=='Serenity':e.update(summary='Bulky Vendor and Final Mix rewards — Conditional.',instructions='Original KHII Nobody drops are not valid Final Mix farming sources. Bulky Vendor uses reaction commands at different HP tiers; it is not a normal kill drop. Serenity Crystal also has a synthesis recipe.',uncertainty='Per-tier Final Mix reward/drop tables remain incomplete.')
for n,summary,detail in [
 ('Orichalcum','Bulky Vendor — Conditional.','Bulky Vendor reaction rewards and finite treasure/reward sources; source areas include Bazaar, Candy Cane Lane, Checkpoint, West Hall and Cave of the Dead: Entrance. Spawn behavior is not guaranteed.'),
 ('Orichalcum+','Seven finite acquisitions.','Chests: Twilight Town Sunset Terrace; Space Paranoids Central Computer Mesa; The World That Never Was Brink of Despair. Rewards: finish 100 Acre Wood; finish A New Day is Dawning; win Goddess of Fate Cup; claim the Moogle material collection reward. These cannot be farmed repeatedly.'),
 ('Lost Illusion','Organization XIII Replica Data — Conditional.','Repeat Vexen, Lexaeus, Zexion, Marluxia or Larxene in Garden of Assemblage. Each corresponding Absent Silhouette also awards a one-time Lost Illusion.'),
 ('Manifest Illusion','Lingering Will — Conditional; synthesis.','Lingering Will is accessed through Disney Castle Hall of the Cornerstone. Finite alternatives include Cavern chests, Frontier puzzle assembly and collector rewards. Synthesis uses the Serenity Crystal upgrade recipe.')]:add('materials',n,summary,instructions=detail,checkable=False,collectible=False,sources=['https://www.khwiki.com/'+('Orichalcum' if n.startswith('Orichalcum') else 'Illusion')],drops=[dict(enemy='Replica Data' if n=='Lost Illusion' else 'Lingering Will' if n=='Manifest Illusion' else 'Bulky Vendor' if n=='Orichalcum' else 'Finite rewards',rate='Conditional',location='Garden of Assemblage' if n=='Lost Illusion' else 'Hall of the Cornerstone' if n=='Manifest Illusion' else 'See expanded details')])
# Existing researched equipment / magic / forms tables.
keyworlds=['Twilight Town','Twilight Town','The Land of Dragons','Olympus Coliseum','Timeless River','Port Royal','Pride Lands','Twilight Town','Space Paranoids',"Beast's Castle",'Olympus Coliseum','Agrabah','Halloween Town','Radiant Garden','Radiant Garden','Atlantica','100 Acre Wood','Twilight Town','The World That Never Was','The World That Never Was','Olympus Coliseum','Radiant Garden','Radiant Garden','Synthesis']
k=0
for c in rows('materials-and-equipment.md'):
 if len(c)==3 and c[2].startswith('[Item]'):
  add('keyblades',c[0],c[1]+'.',world=keyworlds[k],sources=links(c[2]));k+=1
 if len(c)==4 and c[0].startswith('[') and 'Form)' in c[0]:
  add('forms',clean(c[0])+' Form',c[1]+'.',instructions='Form EXP: '+c[2]+'. Growth: '+c[3]+'. Standard Sora learns Growth levels 1/2/3 at form levels 3/5/7. MAX Growth belongs to the form itself.',sources=links(c[0]),collectible=False)
 if len(c)==2 and c[0].startswith('[') and clean(c[0]) in ['Fire','Blizzard','Thunder','Cure','Magnet','Reflect']:
  for i,event in enumerate(c[1].split('; ')):
   add('magic',clean(c[0])+' · '+event,event+'.',reward=clean(c[0])+' element upgrade',instructions='Each grant advances this element by one tier. The named spell tier depends on other grants already received.',sources=links(c[0]))
for c in rows('world-collectibles.md'):
 if len(c)==2 and c[0].isdigit():add('reports','Secret Ansem Report '+c[0],c[1]+'.',sources=['https://www.khwiki.com/Ansem%27s_Reports'])
 if len(c)==3 and c[0] in ['Awakening','Heart','Duality','Frontier','Daylight','Sunset']:add('assembly',c[0]+' assembly','Arrange all '+c[1]+' pieces in the Journal.',reward=c[2],instructions='Collecting pieces does not automatically complete assembly. Arrange and rotate pieces in the Journal, then claim the reward.',uncertainty='Exact placement/rotation solution not yet documented.',collectible=False,sources=['https://www.khwiki.com/Puzzle'])
for c in rows('challenges-records-and-gummi.md'):
 if len(c)==4 and c[0].isdigit():
  world,area=c[1].split(' / ');add('mushrooms','Mushroom XIII · '+c[0],c[2]+' · '+c[3],world=norm(world),area=area,collectible=False,instructions='This is the Journal target; farming reward ranks have separate thresholds.' if c[0]!='13' else 'After Xemnas and appeasing Mushrooms 1–12, use Look Up, then Ready, Go! to receive Winner’s Proof and Proof of Peace.',sources=['https://www.khwiki.com/Mushroom_XIII'])
 if len(c)==4 and c[0] in ['Zexion','Larxene','Lexaeus','Vexen','Marluxia']:add('challenges','Absent Silhouette · '+c[0],c[1],reward=c[2]+'; '+c[3],collectible=False,sources=['https://www.khwiki.com/Absent_Silhouette'])
 if len(c)==2 and c[0] in ['Lost Illusion','Power Boost','Defense Boost','Magic Boost','AP Boost']:
  for n in c[1].split(', '):add('challenges','Replica Data · '+n,'Defeat '+n+' in the Garden of Assemblage.',world='Radiant Garden',area='Garden of Assemblage',reward=c[0],prerequisites='Defeat the original member or Absent Silhouette. A game clear is required for the full set.',instructions='Repeatable reward. After clearing all thirteen, separately open the Proof of Nonexistence chest.',collectible=False,sources=['https://www.khwiki.com/Organization_XIII_Replica_Data'])
 if len(c)==4 and ('Cup]' in c[0] or 'Paradox' in c[0] or clean(c[0]) in ['Pain and Panic','Cerberus','Titan','Goddess of Fate']):add('cups',clean(c[0]),'Journal score: '+c[2]+'.',world='Olympus Coliseum',prerequisites=c[1],reward=c[3],instructions='Regular cups: Pain and Panic. Paradox cups: Hades. Check this record when the listed score target is met.',collectible=False,sources=links(c[0]))
 if len(c)==2 and ' / ' in c[0] and c[0]!='World / record':
  w,n=c[0].split(' / ',1);add('minigames',n,'Target: '+c[1]+'.',world=norm(w),collectible=False,sources=['https://www.khwiki.com/Minigames'])
 if len(c)==2 and c[0] in ['Highwind α','PuPu','Tonberry','Moogle','Mandragora','Chocobo','Cactuar','Cait Sith','Fenrir','Mushroom','Kingdom','Secret']:add('gummi',c[0]+' blueprint',c[1]+'.',collectible=False,sources=['https://www.khwiki.com/Blueprint'])
for route in ['Asteroid Sweep','Stardust Sweep','Phantom Storm','Splash Island','Floating Island','Ancient Highway','Broken Highway','Sunlight Storm','Assault of the Dreadnought']:
 for mission in range(1,4):
  for mode in ['Normal','EX S']:
   add('gummi',f'{route} · Mission {mission} · {mode}',f'Mission {mission} scores '+['medals','enemy kills','points'][mission-1]+'.',area=route,prerequisites='Clear missions 1 and 2 to unlock mission 3. Earn S rank in a normal mission to unlock its EX S variant.',uncertainty='Exact rank thresholds and EX build constraints are not yet documented.',collectible=False,sources=['https://www.khwiki.com/Gummi_Missions'])
add('summons','Baseball Charm','Receive from Merlin when he explains Pooh’s damaged book.',world='Radiant Garden',reward='Chicken Little summon',sources=['https://www.khwiki.com/Summon_Charms'])
add('summons','Lamp Charm','Complete the first Agrabah visit.',world='Agrabah',reward='Genie summon',sources=['https://www.khwiki.com/Summon_Charms'])
# Assign world scopes to normalized reward events without introducing duplicate acquisitions.
magic_worlds = [
 'Radiant Garden','Pride Lands','Agrabah','Radiant Garden','Radiant Garden','Atlantica',
 'Olympus Coliseum','The Land of Dragons','Pride Lands',"Beast's Castle",'Radiant Garden','100 Acre Wood',
 'Halloween Town','Port Royal','The World That Never Was','Timeless River',"Beast's Castle",'Space Paranoids']
for e,w in zip([e for e in entries if e['category']=='magic'],magic_worlds):e['world']=w
report_worlds=['Radiant Garden','Twilight Town','The World That Never Was',"Beast's Castle",'Olympus Coliseum','Port Royal','Radiant Garden','The World That Never Was','The World That Never Was','Twilight Town','The World That Never Was','The World That Never Was','The World That Never Was']
for e,w in zip([e for e in entries if e['category']=='reports'],report_worlds):e['world']=w
# Bestiary is a material-source index derived from researched drop relations.
enemies={}
for e in list(entries):
 if e['category']!='materials':continue
 for d in e.get('drops',[]):
  if d['rate']=='Conditional':continue
  enemies.setdefault(d['enemy'],[]).append(e['name']+' '+d['rate'])
for enemy,items in sorted(enemies.items()):
 add('bestiary',enemy,'; '.join(items)+'.',instructions='These are base material drops before party bonuses. This index covers enemies in the researched material tables, not every Heartless or Nobody.',uncertainty='Spawn rooms and combat tactics are not yet normalized.',checkable=False,collectible=False,sources=['https://www.khwiki.com/Synthesis_material'])
# Non-hidden, uniquely KHII-scoped goals verified in Steam’s public collection list on 2026-09-20.
steam_goals=[
 ('A Timeless World','Timeless River complete'),('Above Honor','Land of Dragons episodes complete'),
 ('A Budding Romance',"Beast’s Castle episodes complete"),('Lifting the Curse','Port Royal episodes complete'),
 ('What Friends Are For','Agrabah episodes complete'),('The Gift of Love','Halloween Town episodes complete'),
 ('Hail the Hero','Olympus episodes complete'),('A Taste of the Past','Twilight Town episodes complete'),
 ('Return of the King','Pride Lands episodes complete'),('Electric Spark','Space Paranoids episodes complete'),
 ('Always Together','100 Acre Wood complete'),('Kindred Spirits','Atlantica episodes complete'),
 ('Rookie','Pain and Panic Cup victory'),('Novice Hero','Cerberus Cup victory'),
 ('Artisan Hero','Titan Cup victory'),('True Hero','Goddess of Fate Cup victory'),
 ('Struggle Champion','Take every opponent orb'),('Nobody Know-It-All','Complete Nobody Journal entries'),
 ('Navigator','Collect all maps'),('Puzzler','Assemble every puzzle'),
 ('Level Master','Sora reaches level99'),('Veteran Pilot','Earn a Gummi S rank'),
 ('Gummi Ship Collector','Acquire at least30 blueprints')]
for name,goal in steam_goals:
 add('achievements',name,goal+'.',collectible=False,sources=['https://steamcommunity.com/stats/2552430/achievements/'])
assert len([e for e in entries if e['category']=='treasures'])==301
assert len([e for e in entries if e['category']=='puzzles'])==144
assert len(recipes)==59
assert len({e['id'] for e in entries})==len(entries)
assert all(i['id'] in {e['id'] for e in entries} for r in recipes for i in r['ingredients'])
pathlib.Path('src/games/kh2fm/catalog.ts').write_text('// Generated from checked-in research by generate.py. Do not edit directly.\nimport type {CollectionEntry, CollectionRecipe} from "../types";\nexport const entries: CollectionEntry[] = '+json.dumps(entries,ensure_ascii=False,indent=2)+';\nexport const recipes: CollectionRecipe[] = '+json.dumps(recipes,ensure_ascii=False,indent=2)+';\n')
from collections import Counter
print(Counter(e['category'] for e in entries),len(recipes))
