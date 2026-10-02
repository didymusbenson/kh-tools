"""Regenerate researched KH2FM catalogs; run from repository root."""
import re,json,pathlib,math
root=pathlib.Path('ai_docs/games/kh2fm'); entries=[]; recipes=[]
material_research=json.loads((root/'verified-material-sources.json').read_text())
gummi_research=json.loads((root/'verified-gummi-missions.json').read_text())
treasure_research=json.loads((root/'treasure-locations.json').read_text())['entries']
puzzle_research=json.loads((root/'verified-puzzle-locations.json').read_text())['entries']
def route_fields(record):
 return {key: value for key,value in record.items() if key in ('instructions','sources','prerequisites','uncertainty')}
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
   e=dict(id=c[0],category=cat,name=f'#{c[1]} · {c[2]}',world=world,area=c[3],summary=f'{c[2]} — {c[3]}.',reward=c[2],character='Sora',order=int(c[1]))
   e.update(route_fields(treasure_research[e['id']]))
   if c[2]=='Proof of Nonexistence':e.update(prerequisites='Defeat all thirteen Organization XIII Replica Data battles.',instructions='Return to the Garden of Assemblage and open the chest that appears. Winning the battles does not automatically collect this proof.')
  else:
   e=dict(id=c[0],category=cat,name=f'{c[1]} · Piece {c[2]}',world=world,area=c[3],summary=f'{c[1]} puzzle piece {c[2]} — {c[3]}.',character='Sora',order=int(c[2]),uncertainty='Exact approach not yet verified; movement notes describe a candidate route, not a required minimum.',sources=['https://www.khwiki.com/Puzzle'])
   if c[4]!='Not stated in legacy row':e['prerequisites']='Candidate route: '+c[4]+'. Growth ability levels refer to standard Sora.'
  if cat=='treasures':
   if c[2]=='Torn Pages': e['categories']=['pages']
   if c[2] in ['Ukulele Charm','Feather Charm']: e['categories']=['summons']
  if cat=='puzzles':
   e.pop('uncertainty',None);e.pop('prerequisites',None)
   e.update(route_fields(puzzle_research[e['id']]))
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
   note+=' Uses the base recipe ingredients again, plus '+m[1]+'. At Moogle level 3 or higher, first synthesize the base item, then select it in Creations and add Serenity to make the upgraded output.'
  if base=='Ultima Weapon':
   ing=[dict(id=i['id'],quantity=math.ceil(i['quantity']/2)) for i in ing];ing.append(dict(id='kh2fm.materials.energy-crystal',quantity=1))
   note='Ultimate Recipe; Moogle level 2 or higher. Includes the mandatory Energy Crystal: displayed raw 13 Orichalcum+ becomes 7, and all other base ingredients are halved, rounding each up. Only seven Orichalcum+ acquisitions exist. No additional Moogle discount assumed.'
  recipes.append(dict(id='kh2fm.recipe.'+slug(name),name=name,group='Upgraded outputs' if is_upgrade else 'Base recipes',ingredients=ing,instructions=note,sources=links(c[5])))
# Verified Final Mix drops and representative post-game rooms. Conditional prizes remain explicit.
for name, research in material_research['materials'].items():
 drops=[];sources=list(research['sources'])+[material_research['locationSource']]
 for d in research['drops']:
  drops.append(dict(enemy=d['enemy'],rate=d['rate'],location='; '.join(d['locations']),**({'details':d['details']} if d.get('details') else {})))
  sources.extend(d['sources'])
 note='Base drop chances before Lucky Lucky bonuses. Locations describe repeatable post-game encounters; story battles and Coliseum rounds are not farming routes.'
 if name.startswith('Serenity'):
  note+=' Bulky Vendor appears after the rare-Heartless message: interact with or break scenery to reveal it, then use the appropriate reaction command before it disappears. Original KHII Nobody Serenity drops do not apply in Final Mix.'
 if name=='Serenity Crystal':note+=' Also synthesized through Free Development at Moogle level 8: 1 Tranquility Crystal, 1 Remembrance Crystal and 9 Bright Crystals before discounts.'
 if name.split()[0] in ['Blazing','Frost','Lightning','Lucid','Power','Dark','Dense','Twilight'] and name.split()[-1] in ['Shard','Stone','Gem']:
  threshold={'Shard':30,'Stone':25,'Gem':20}[name.split()[-1]]
  note+=f' Depositing {threshold} of this material unlocks unlimited purchases at the Moogle shop.'
 add('materials',name,'; '.join(d['enemy']+' '+d['rate'] for d in drops)+'.',instructions=note,drops=drops,collectible=False,checkable=False,sources=list(dict.fromkeys(sources)))
for tier in ['Shard','Stone','Gem','Crystal']:
 add('materials','Mythril '+tier,'Treasure chests and synthesis.',instructions='Treasure supplies are finite. For repeatable production, use the Mythril '+tier+' recipe in the Workshop; Stone and Crystal are the Serenity upgrades of Shard and Gem respectively.',collectible=False,checkable=False,sources=['https://www.khwiki.com/Mythril'])
for tier,rank in [('Shard','E'),('Stone','D'),('Gem','C'),('Crystal','B')]:
 add('materials','Tranquility '+tier,'Mushroom XIII challenge rewards.',instructions='Repeat Mushrooms I–XII for material rewards. '+('B rank gives one Crystal; A or S gives two.' if tier=='Crystal' else 'Ranks '+rank+' through S give one '+tier+'.')+' These ranks are separate from the Journal appeasement target. Mushroom V in Agrabah’s Treasure Room is a repeatable timed-damage challenge: defeat it within 3 seconds for S rank and two Crystals plus one Gem, Stone and Shard. The Journal target is 10 seconds.',drops=[dict(enemy='Mushroom V',rate='Conditional',location='Agrabah · The Cave of Wonders: Treasure Room',details='A defeat within 3 seconds guarantees the S-rank material set. Its HP regenerates during the challenge.')],collectible=False,checkable=False,sources=['https://www.khwiki.com/Tranquility','https://www.khwiki.com/Mushroom_XIII#No._5'])
vendor_rooms='The Land of Dragons · Checkpoint; Beast’s Castle · The West Hall; Olympus Coliseum · Cave of the Dead: Entrance; Agrabah · Bazaar; Halloween Town · Candy Cane Lane'
add('materials','Orichalcum','Bulky Vendor reaction rewards; finite chests and collector rewards.',instructions='React with Capsule Prize at 75–100% HP (8% Orichalcum), Rare Capsule at 50–74% (10%), Limited Capsule at 25–49% (12%) or Prime Capsule at 1–24% (16%). Reveal the Vendor by interacting with scenery after the rare-Heartless message. Stay grounded to react before it vanishes. The matching Serenity material is guaranteed; Orichalcum is a separate chance. Collector rewards also grant Orichalcum for 55 material types and 1,000 materials deposited. The 45-type reward in Final Mix is AP Boost.',drops=[dict(enemy='Bulky Vendor',rate='Conditional',location=vendor_rooms,details='Orichalcum chance depends on the reaction command: 8%, 10%, 12% or 16%.')],checkable=False,collectible=False,sources=['https://www.khwiki.com/Bulky_Vendor','https://www.khwiki.com/Orichalcum','https://www.khwiki.com/Moogle_Shop','https://gamefaqs.gamespot.com/ps2/935702-kingdom-hearts-ii-final-mix-plus/faqs/48143'])
for n,summary,detail,enemy,location in [
 ('Orichalcum+','Seven finite acquisitions.','Chests: Twilight Town Sunset Terrace; Space Paranoids Central Computer Mesa; The World That Never Was Brink of Despair. Rewards: finish 100 Acre Wood; finish A New Day is Dawning; win Goddess of Fate Cup; deposit all 60 material types and claim the Moogle collection reward. These cannot be farmed repeatedly.','Finite rewards','Twilight Town; Space Paranoids; The World That Never Was; 100 Acre Wood; Atlantica; Olympus Coliseum; Moogle shop'),
 ('Lost Illusion','Absent Silhouettes and corresponding Replica Data rewards.','Each Absent Silhouette awards one on its first defeat. A Garden of Assemblage chest and the Moogle reward for all S-rank materials are additional finite sources. For repeatable rewards, defeat Replica Data Vexen, Lexaeus, Zexion, Marluxia or Larxene in the Garden of Assemblage.','Replica Data','Radiant Garden · Garden of Assemblage'),
 ('Manifest Illusion','Lingering Will rematches and synthesis; finite chests and rewards.','Defeat Lingering Will again after the first victory for repeatable Manifest Illusion rewards. Enter through the portal in Disney Castle’s Hall of the Cornerstone after completing every world’s story, including Atlantica and 100 Acre Wood, then defeating the final boss and saving the cleared game. Also obtained from Cavern of Remembrance chests, completing Frontier, and the Moogle collection reward for all A-rank materials. Synthesize it by adding a Serenity Gem to the Serenity Crystal recipe.','Lingering Will','Disney Castle · Hall of the Cornerstone')]:
 add('materials',n,summary,instructions=detail,checkable=False,collectible=False,sources=['https://www.khwiki.com/'+('Orichalcum' if n.startswith('Orichalcum') else 'Illusion')]+(['https://www.khwiki.com/Game:Lingering_Will','https://www.trueachievements.com/a293114/lingering-will-achievement'] if n=='Manifest Illusion' else []),drops=[dict(enemy=enemy,rate='Conditional',location=location)])
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
 if len(c)==3 and c[0] in ['Awakening','Heart','Duality','Frontier','Daylight','Sunset']:add('assembly',c[0]+' assembly','Arrange all '+c[1]+' pieces in the Journal.',reward=c[2],instructions='Open the Puzzles section of Jiminy’s Journal and select '+c[0]+'. The piece numbers in this guide follow the completed picture from left to right, row by row: put Piece 1 in the top-left slot, then continue across and down in number order. Match each tile’s picture to its neighbors and rotate it until the artwork is upright. Collecting the pieces alone does not claim the assembly reward.',collectible=False,sources=['https://www.khwiki.com/Puzzle'])
for c in rows('challenges-records-and-gummi.md'):
 if len(c)==4 and c[0].isdigit():
  world,area=c[1].split(' / ');add('mushrooms','Mushroom XIII · '+c[0],c[2]+' · '+c[3],world=norm(world),area=area,collectible=False,instructions='This is the Journal target; farming reward ranks have separate thresholds.' if c[0]!='13' else 'After Xemnas and appeasing Mushrooms 1–12, use Look Up, then Ready, Go! to receive Winner’s Proof and Proof of Peace.',sources=['https://www.khwiki.com/Mushroom_XIII'])
 if len(c)==4 and c[0] in ['Zexion','Larxene','Lexaeus','Vexen','Marluxia']:add('challenges','Absent Silhouette · '+c[0],c[1],reward=c[2]+'; '+c[3],collectible=False,sources=['https://www.khwiki.com/Absent_Silhouette'])
 if len(c)==2 and c[0] in ['Lost Illusion','Power Boost','Defense Boost','Magic Boost','AP Boost']:
  for n in c[1].split(', '):add('challenges','Replica Data · '+n,'Defeat '+n+' in the Garden of Assemblage.',world='Radiant Garden',area='Garden of Assemblage',reward=c[0],prerequisites='Defeat the original member or Absent Silhouette. A game clear is required for the full set.',instructions='Repeatable reward. After clearing all thirteen, separately open the Proof of Nonexistence chest.',collectible=False,sources=['https://www.khwiki.com/Organization_XIII_Replica_Data'])
 if len(c)==4 and ('Cup]' in c[0] or 'Paradox' in c[0] or clean(c[0]) in ['Pain and Panic','Cerberus','Titan','Goddess of Fate']):add('cups',clean(c[0]),'Journal score: '+c[2]+'.',world='Olympus Coliseum',prerequisites=c[1],reward=c[3],instructions='Regular cups: Pain and Panic. Paradox cups: Hades. Check this record when the listed score target is met.',collectible=False,sources=links(c[0])+['https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/kingdom-hearts-ii-final-mix/olympus-coliseum/paradox-cups','https://www.khwiki.com/Olympus_Coliseum'])
 if len(c)==2 and ' / ' in c[0] and c[0]!='World / record':
  w,n=c[0].split(' / ',1);e=add('minigames',n,'Target: '+c[1]+'.',world=norm(w),collectible=False,sources=['https://www.khwiki.com/Mini-games'])
  if n=='SB Sand Slider':e['id']='kh2fm.minigames.sb-sand-glider' # Preserve existing saves after correcting the display name.
 if len(c)==2 and c[0] in ['Highwind α','PuPu','Tonberry','Moogle','Mandragora','Chocobo','Cactuar','Cait Sith','Fenrir','Mushroom','Kingdom','Secret']:add('gummi',c[0]+' blueprint',c[1]+'.',collectible=False,sources=['https://www.khwiki.com/Blueprint'])
for route,research in gummi_research['routes'].items():
 for mission,data in research['missions'].items():
  unit={'1':'medal level','2':'enemy defeats','3':'points'}[mission]
  for mode in ['Normal','EX S']:
   ex=mode=='EX S';target=data['exSRank'] if ex else data['sRank']
   goal=f'Reach medal level {target}.' if mission=='1' else f'S rank: {target:,} {unit}.'
   add('gummi',f'{route} · Mission {mission} · {mode}',goal,area=route,prerequisites=('Earn S rank in this normal mission to unlock EX. '+data['exRequirement']) if ex else 'Complete the route to open missions 1 and 2; clear both to open mission 3.',instructions=('Meet the listed ship constraint, then reach the score target in the EX mission.' if ex else 'Use Mission '+mission+' from the Gummi route menu. Check this record when you earn S rank.')+' Targets are for Final Mix.',reward=data['exReward'] if ex else data['reward'],collectible=False,sources=[research['source']])
add('summons','Baseball Charm','Receive from Merlin when he explains Pooh’s damaged book.',world='Radiant Garden',reward='Chicken Little summon',sources=['https://www.khwiki.com/Summon_Charms'])
add('summons','Lamp Charm','Complete the first Agrabah visit.',world='Agrabah',reward='Genie summon',sources=['https://www.khwiki.com/Summon_Charms'])
# Material and weapon reward ranks have different score bands; neither replaces the Journal target.
mushroom_research=json.loads((root/'verified-mushroom-ranks.json').read_text())
for e in entries:
 if e['category']!='mushrooms':continue
 number=e['name'].split(' · ')[-1]
 if number not in mushroom_research['mushrooms']:continue
 data=mushroom_research['mushrooms'][number]
 bands=[]
 for key,label in [('materials','Material ranks'),('weapons','Weapon ranks')]:
  bands.append(label+' ('+data['unit']+'): '+ '; '.join(r['rank']+': '+r[key] for r in data['ranks'] if r[key]!='—')+'.')
 odd=int(number)%2==1
 weapon=['Plain Mushroom','Plain Mushroom+','Precious Mushroom','Precious Mushroom+','Premium Mushroom'] if odd else ['Joyous Mushroom','Joyous Mushroom+','Majestic Mushroom','Majestic Mushroom+','Ultimate Mushroom']
 e['instructions']='The checklist tracks the Journal target above. Material and weapon prizes use separate score bands. '+('Mushroom IV has no A or S reward rank.' if number=='4' else '')+'\n\n'+'\n\n'.join(bands)+'\n\nMaterial prizes: E gives one Tranquility Shard; D adds one Stone; C adds one Gem; B adds one Crystal; A and S give two Crystals instead. Higher ranks retain the lower materials.'+'\n\nWeapon prizes: E has a 55% chance of '+weapon[0]+'. D gives '+weapon[0]+' (65%) or '+weapon[1]+' (35%). C gives '+weapon[1]+' (75%) or '+weapon[2]+' (25%). B gives '+weapon[2]+' (85%) or '+weapon[3]+' (15%).'+('' if number=='4' else ' A gives '+weapon[3]+' (90%) or '+weapon[4]+' (10%). S guarantees '+weapon[4]+'.')
 e['sources']=[mushroom_research['source'],mushroom_research['corroboration']]
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
  data=enemies.setdefault(d['enemy'],dict(items=[],locations=[],sources=[]))
  data['items'].append(e['name']+' '+d['rate'])
  data['locations'].extend(d['location'].split('; '));data['sources'].extend(e['sources'])
for enemy,data in sorted(enemies.items()):
 add('bestiary',enemy,'; '.join(data['items'])+'.',area='; '.join(dict.fromkeys(data['locations'])),instructions='Farm these rooms after completing the story. Room encounters can alternate; leave and re-enter to find the listed enemy. Rates are base material-drop chances before Lucky Lucky. These material-source relations remain attached to the combat reference.',checkable=False,collectible=False,sources=list(dict.fromkeys(data['sources'])))
# Steam names shared across games remain scoped by the stable kh2fm prefix.
for research in json.loads((root/'verified-steam-achievements.json').read_text())['entries']:
 data=dict(research);name=data.pop('name');summary=data.pop('summary')
 add('achievements',name,summary,collectible=False,**data)
# Prologue chests are separate from Sora's 301 Journal treasures and world totals.
for research in json.loads((root/'verified-prologue-chests.json').read_text())['entries']:
 entries.append(dict(category='prologue',world='Twilight Town',character='Roxas',collectible=False,**research))
# October audit: normalized acquisition indexes and source-backed field patches.
audit_expansion=json.loads((root/'verified-audit-expansion.json').read_text())
entries.extend(audit_expansion['entries'])
entries.extend(r['entry'] for r in json.loads((root/'verified-abilities.json').read_text())['records'])
entry_by_id={e['id']:e for e in entries}
for record in json.loads((root/'verified-equipment.json').read_text())['records']:
 if record.get('entry'):
  entries.append(record['entry']);entry_by_id[record['entry']['id']]=record['entry']
 else:
  e=next(e for e in entries if e['category']=='keyblades' and e['name']==record['name'])
  patch=record['patch'];e['summary']=patch['summary']
  e['instructions']=e.get('instructions','')+'\n\n'+patch['appendInstructions']
  e['sources']=list(dict.fromkeys(e.get('sources',[])+patch['appendSources']))
for id,categories in audit_expansion['aliases'].items():
 e=entry_by_id[id];e['categories']=list(dict.fromkeys(e.get('categories',[])+categories))
for id,patch in audit_expansion['patches'].items():
 assert id in entry_by_id,id
 e=entry_by_id[id];patch=dict(patch)
 append=patch.pop('appendInstructions',None)
 if append:e['instructions']=e.get('instructions','')+'\n\n'+append
 sources=patch.pop('appendSources',[])+patch.pop('sources',[])
 if sources:e['sources']=list(dict.fromkeys(e.get('sources',[])+sources))
 e.update(patch)
# Reward-event areas and visually checked puzzle assembly instructions.
for id,patch in json.loads((root/'verified-reward-areas.json').read_text())['patches'].items():
 e=entry_by_id[id];patch=dict(patch)
 e['sources']=list(dict.fromkeys(e.get('sources',[])+patch.pop('appendSources',[])))
 e.update(patch)
for puzzle in json.loads((root/'verified-assembly.json').read_text())['records']:
 e=entry_by_id[puzzle['id']]
 e['instructions']='Open '+puzzle['name']+' in the Puzzles section of Jiminy’s Journal. The board has '+str(puzzle['columns'])+' columns and '+str(puzzle['rows'])+' rows. This guide numbers the solved picture left to right, row by row, starting with Piece 1 at the top left. '+('Move and rotate tiles until their artwork is upright.' if puzzle['rotation'] else 'Move tiles into place; this puzzle does not require rotation.')+' Reference: '+puzzle['reference']+' Assemble the full picture to claim the reward; collecting its pieces alone does not claim it.'
 e['sources']=list(dict.fromkeys(e.get('sources',[])+puzzle['sources']))
for name,levels in audit_expansion['formProgression'].items():
 e=entry_by_id['kh2fm.forms.'+slug(name)]
 e['instructions']+='\n\nFinal Mix cumulative EXP for levels 1–7: '+', '.join(str(r['totalExp']) for r in levels)+'. The Form level cap is 3/4/5/6/7 with 1/2/3/4/5 Forms obtained. Unlock Final Form to reach level 7.'
for id,data in audit_expansion['cupRounds'].items():
 e=entry_by_id[id];e['instructions']+='\n\nRounds: '+ '; '.join(str(r['round'])+': '+r['enemies'] for r in data['rounds'])+'.'
 e['sources']=list(dict.fromkeys(e['sources']+[data['source']]))
# Complete normal rank ladders and enemy treasures, with separate blueprint ownership.
gummi_details=json.loads((root/'verified-gummi-details.json').read_text())
for route,data in gummi_details['routes'].items():
 for mission,detail in data['missions'].items():
  e=entry_by_id['kh2fm.gummi.'+slug(f'{route} · Mission {mission} · Normal')]
  e['instructions']+='\n\nNormal ranks: '+'; '.join(r['rank']+': '+r['target']+' → '+r['reward'] for r in detail['ranks'] if r['mode']=='Normal')+'.'
  e['instructions']+='\n\nEnemy treasures (enemy — screen — reward): '+'; '.join(r['enemy']+' — '+r['screen']+' — '+r['reward'] for r in detail['treasures'])+'.'
for b in gummi_details['blueprints']:
 if b['type']=='Sample':
  add('gummi',b['name']+' sample blueprint',b['acquisition']+'.',instructions='Required block totals: '+', '.join(str(r['quantity'])+' '+r['name'] for r in b['requiredBlocks'])+'. Material/G shapes share one inventory stock; the listed quantity is the ownership requirement. Teeny blueprints unlocked with this main blueprint: '+(', '.join(b['teenyShips']) or 'none')+'.',collectible=False,sources=[b['source'],'https://www.khwiki.com/Blueprint',gummi_details['materialStockRule']['source']])
 else:
  e=entry_by_id['kh2fm.gummi.'+slug(b['name']+' blueprint')]
  e['instructions']='Special blueprint. Acquisition: '+b['acquisition']+'. Teeny blueprints unlocked together: '+(', '.join(b['teenyShips']) or 'none')+'.'
for t in gummi_details['teenyShips']:
 add('gummi',t['name']+' Teeny blueprint','Unlock with an associated main-ship blueprint.',instructions='Associated main blueprints: '+', '.join(t['parents'])+'.',collectible=False,sources=['https://www.khwiki.com/Blueprint'])
# Edition-filtered enemy and boss attributes keep separate encounter contexts.
enemy_research=json.loads((root/'verified-enemies.json').read_text())
for record in enemy_research['records']:
 e=next((e for e in entries if e['category']=='bestiary' and e['name']==record['name']),None)
 if e is None:
  e=add('bestiary',record['name'],'Combat reference'+(' · '+', '.join(record['types']) if record['types'] else '')+'.',checkable=False,collectible=False,sources=record['sources'])
 else:e['sources']=list(dict.fromkeys(e['sources']+record['sources']))
 sections=[]
 for context in record['contexts']:
  lines=[];headers=[]
  for row in context['rows']:
   if row[0] in ['Location','Cup','Physical','Thunder','Rewards','World(s)','HP','Level','Status']:
    headers=row;continue
   if len(headers)>len(row) and re.match(r'^[0-9—×x]',row[0]):
    lines.append('; '.join(h+': '+v for h,v in zip(headers[-len(row):],row)))
   elif len(headers)==len(row):
    lines.append('; '.join(h+': '+v for h,v in zip(headers,row)))
   else:lines.append(' / '.join(row))
  sections.append(context['name']+' — '+' | '.join(lines)+(' Notes: '+'; '.join(context['notes']) if context['notes'] else ''))
 e['instructions']=e.get('instructions','')+'\n\nCombat data by encounter (HP, STR, DEF and EXP are source attributes; damage multipliers describe incoming damage):\n'+'\n\n'.join(sections)
 if record['name']=='Mushroom XIII':e['instructions']+='\n\nIndividual challenge goals, material/weapon prizes and tactics are in Mushroom XIII. The inspected combat table supplies shared resistance factors but no individual HP/STR/DEF/EXP values.'
for label,id in [('Heartless','heartless-highbrow'),('Nobodies','nobody-know-it-all')]:
 e=entry_by_id['kh2fm.achievements.'+id]
 e['instructions']=e.get('instructions','')+'\n\nJournal roster: '+', '.join(r['name'] for r in enemy_research['journalRoster'][label])+'.'
 e['sources']=list(dict.fromkeys(e.get('sources',[])+['https://www.khwiki.com/Journal']+enemy_research['censusSources']))
# Acquisitions are linked by stable IDs rather than duplicated checked rewards.
for r in recipes:
 r['sources']=list(dict.fromkeys(r.get('sources',[])+['https://www.khwiki.com/Synthesis']))
assert len([e for e in entries if e['category']=='treasures'])==301
assert len([e for e in entries if e['category']=='puzzles'])==144
assert len(recipes)==59
assert len({e['id'] for e in entries})==len(entries)
assert all(i['id'] in {e['id'] for e in entries} for r in recipes for i in r['ingredients'])
pathlib.Path('src/games/kh2fm/catalog.ts').write_text('// Generated from checked-in research by generate.py. Do not edit directly.\nimport type {CollectionEntry, CollectionRecipe} from "../types";\nexport const entries: CollectionEntry[] = '+json.dumps(entries,ensure_ascii=False,indent=2)+';\nexport const recipes: CollectionRecipe[] = '+json.dumps(recipes,ensure_ascii=False,indent=2)+';\n')
from collections import Counter
print(Counter(e['category'] for e in entries),len(recipes))
