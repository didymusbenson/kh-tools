"""Rebuild the BBS guide from audited repository evidence; no network required."""
import csv, json, re
from pathlib import Path
from collections import defaultdict, Counter
ROOT=Path(__file__).resolve().parents[3]
DATA=ROOT/'ai_docs/games/bbsfm'
def readcsv(n): return list(csv.DictReader((DATA/n).open()))
def slug(s): return re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
def ident(c,kind,n): return f'bbsfm:{slug(c)}:{kind}:{slug(n)}'
chars=['Terra','Ventus','Aqua']; entries=[]; recipes=[]
acq=json.loads((DATA/'acquisition-tables.json').read_text()); meld=json.loads((DATA/'melding-reference.json').read_text())
enrichment=json.loads((DATA/'research-enrichment.json').read_text())
command_catalog=json.loads((DATA/'command-catalog.json').read_text())['commands']
research_ledger=json.loads((DATA/'research-dispositions-2026-10-01.json').read_text())
research_counts=Counter(f['researchDisposition'] for f in research_ledger['findings'])
research_summary=f"Critical player-goal re-audit: {research_counts['resolved']} resolved, {research_counts['deferred']} deferred optional-precision families, {research_counts['open']} open practical families and {research_counts['other-limitation']} separate limitations. See the current per-family ledger for exact unresolved records."
inv=readcsv('collectible-inventory.csv')
worlds=list(dict.fromkeys(r['world'] for r in inv))+['Mirage Arena','Destiny Islands']
for i,r in enumerate(inv):
 character=r['character'] if r['episode']=='main' else r['character']+' · Secret Episode'
 cat='stickers' if r['category']=='sticker' else 'treasures'
 entries.append(dict(id=r['id'],category=cat,name=r['name'],world=r['world'],area=r['area'],character=character,summary=f"{r['name']} — {r['area']}",instructions=f"{'Sticker pickup' if cat=='stickers' else 'Chest'} in {r['area']}.",uncertainty='Area verified in the research inventory; exact directions and earliest access are not yet documented.',sources=[r['source']],collectible=r['count_scope'] in ('world-collectibles','secret-episode-collectibles'),order=i))
# Known precise directions supersede only the evidenced rows.
for e in entries:
 if e['character']=='Terra' and e['world']=='Dwarf Woodlands' and e['name']=='Fission Firaga': e['instructions']='From the Courtyard arch, jump outward, Air Slide, then attack in midair to extend your reach.'
 if e['character']=='Ventus' and e['name']=='Balloon Sticker' and e['area']=='Mine Entrance': e['instructions']='Beside the stairs at the Mine Entrance.'
 if e['character']=='Aqua' and e['name']=='Dale Sticker' and e['world']=='Deep Space': e['instructions']='Southernmost cell on the eastern side of Turo Prison Block.';e['prerequisites']='High Jump and Air Slide; minimum levels not verified.'
for r in readcsv('keyblades.csv'):
 for c in r['character'].split(';'):
  entries.append(dict(id=ident(c,'keyblade',r['name']),category='keyblades',name=r['name'],character=c,summary=r['acquisition'],instructions=r['acquisition'],reward=f"Strength {r['strength']} · Magic {r['magic']} · Critical {r['critical_rate']} × {r['critical_multiplier'].lstrip('x')}",sources=[r['source']]))
for r in readcsv('ability-stacks.csv'):
 for c in chars:
  instruction=f"Attach {r['crystal']} to a type {r['recipe_types']} meld. Max the resulting command's level to learn the ability permanently." if r['crystal'] not in ('','N/A','—') else 'Not acquired by crystal melding.'
  entries.append(dict(id=ident(c,'ability',r['name']),category='abilities',name=r['name'],character=c,summary=f"{r['category']} · Maximum {r['maximum_stacks']} stacks",instructions=instruction,sources=[r['source']]))
for r in acq['finish_unlocks']['rows']:
 for c in r['characters']:
  entries.append(dict(id=ident(c,'finish',r['name']),category='finishers',name=r['name'],character=c,summary=f"Level {r['level']} · {r['metric'].replace('_',' ')}"+(f": {r['target']}" if r['target'] else ''),prerequisites=f"Equip {r['parent_equipped']}." if r['parent_equipped'] else 'Initial finish command.',instructions=(f"Required metric: {r['metric'].replace('_',' ')}; target {r['target']}." if r['target'] else 'Available initially.')+(f" Style: {r['style']}." if r['style'] else ''),sources=[acq['finish_unlocks']['source']]))
# Store every inventory item in the character's own namespace.
material_seen=set()
def material(c,name,summary,instructions,sources,world=None,drops=None):
 key=ident(c,'material',name)
 if key not in material_seen:
  material_seen.add(key);entries.append(dict(id=key,category='materials',name=name,character=c,summary=summary,instructions=instructions,sources=sources,**({'world':world} if world else {}),**({'drops':drops} if drops else {})))
 return key
for r in acq['flavors']['rows']:
 for c in r['characters']:
  routes=[route for route in enrichment['prize_pod_routes'] if c in route['characters'] and (route['world'] in r['world_or_event'] or route['area'] in r['world_or_event'])]
  assert routes,(r['name'],c)
  material(c,r['name'],'; '.join(route['world']+' — '+route['area'] for route in routes),' '.join(route['world']+' — '+route['area']+': '+route['instructions'] for route in routes)+' '+(enrichment['prize_pod_arena_reset'] if all(route['world']=='Mirage Arena' for route in routes) else enrichment['prize_pod_reset'])+' Used in '+r['used_in']+'.',[acq['flavors']['source'],'https://www.khwiki.com/Prize_Pod'],drops=[dict(enemy='Prize Pod',rate='Per hit',location=route['world']+' — '+route['area'],details=route['instructions']+' '+(enrichment['prize_pod_arena_reset'] if route['world']=='Mirage Arena' else enrichment['prize_pod_reset'])) for route in routes])
for r in acq['ice_cream']['recipes']:
 for c in r['characters']:
  recipes.append(dict(id=ident(c,'ice-cream',r['name']),name=r['name'],group='Ice cream',character=c,instructions=acq['ice_cream']['practical_completion_2026_10_03']['guidance']+' These quantities make one ice cream.',ingredients=[dict(id=ident(c,'material',x['name']),quantity=x['quantity']) for x in r['ingredients']]))
# Quarantine entire ambiguous input groups so no partial probability distribution is presented.
def pair(r): return tuple(sorted([(r['command_1'],r['command_1_level']),(r['command_2'],r['command_2_level'])]))
bad={pair(meld['recipes'][i]) for i in meld['audit']['conflict_rows_zero_based']}
groups=defaultdict(list)
for r in meld['recipes']:
 if pair(r) in bad: continue
 for c,rate in r['success_rate_percent_by_character'].items():
  if rate: groups[(c,pair(r))].append((r,rate))
shop={(c,r['name']):r for r in acq['command_shop']['rows'] for c in r['characters']}
for (c,p),outcomes in groups.items():
 assert sum(rate for _,rate in outcomes)==100,(c,p)
 requirements=[]
 for name,level in p:
  s=shop.get((c,name)); chest=[r for r in inv if r['character']==c and r['name']==name]
  routes=[]
  if s: routes.append(s['instructions'])
  routes += [f"Chest: {r['world']} — {r['area']}" for r in chest]
  material(c,name,'; '.join(routes) or 'Meld / command acquisition', '; '.join(routes) or 'An input command; exact acquisition route is not yet documented in this guide.',[acq['command_shop']['source'],meld['source']])
  requirements.append(f'{name} level {level}' if level is not None else f'{name} (source gives no level requirement)')
 counts=Counter(n for n,l in p)
 instructions=' + '.join(requirements)+'. One attempt consumes both inputs; keep an extra copy of movement/defense commands. '
 instructions+='Outcomes: '+ '; '.join(f"{r['result']} {rate}%" for r,rate in outcomes)+'. '
 for r,rate in outcomes:
  instructions+=f"{r['result']}: "+('type '+r['recipe_type']+'; '+', '.join(f'{k}: {v}' for k,v in r['possible_abilities_by_crystal'].items()) if r['abilities_attachable'] else 'Shotlock; no attached ability')+'. '
  instructions+=' '.join(meld['footnote_rules'].get(str(n),str(n)) for n in r['footnotes'])+' '
  instructions+=' '.join(r.get('notes',[]))+' ' if r.get('notes') else ''
 instructions+='An optional crystal is not included in these input targets. The menu Recipe item is not required. Recording a check does not simulate a successful outcome.'
 recipes.append(dict(id=ident(c,'meld','-'.join(f'{n}-{l}' for n,l in p)),name=' / '.join(dict.fromkeys(r['result'] for r,rate in outcomes)),character=c,group='Command melding',instructions=instructions,ingredients=[dict(id=ident(c,'material',n),quantity=q) for n,q in counts.items()]))
# All command-shop inventory, including inputs absent from the surviving meld set.
for (c,name),r in shop.items():
 entries.append(dict(id=ident(c,'command',name),category='commands',name=name,character=c,summary=f"Command Shop · {r['munny']} munny",instructions=r['instructions'],sources=[acq['command_shop']['source']]))
crystals=[('Shimmering',300,1,1,'Blobmob 12%; Archraven 2.4% at shop 1–4, 3% at 5–6.'),('Fleeting',350,1,1,'Chrono Twister 12%; Sonic Blaster 7.2% at shop 5–6, 11.4% at 7–8.'),('Pulsing',300,1,1,'Wild Bruiser 21.6%; other enemy rates vary by shop level.'),('Wellspring',300,1,1,'Scrapper 1.8% at shop 1–2, 3% at 3–8; Triple Wrecker 10.8%.'),('Soothing',400,1,1,'Flood 4% at shop 1–6, 3.96% at 7–8; Jellyshade 3.2%.'),('Hungry',350,1,1,'Bruiser 6% at shop 1–2, 7.2% at 3–5, 9.6% at 6–8; Hareraiser 3.2%.'),('Abounding',400,4,1,'Axe Flapper 14.4%; Mandrake 4.8% at shop 4–6, 7.6% at 7–8.'),('Chaos',500,5,10,'Archraven 0.3% at shop 7–8. Attaches a random ability.'),('Secret Gem',1500,8,15,'Flood 0.04% at shop 7–8. Random ability and maximizes result level.')]
crystal_sources=json.loads((ROOT/'src/games/bbsfm/crystal-sources.json').read_text())
spiderchest=next(r for r in crystal_sources if r['enemy']=='Spiderchest' and r['crystal']=='Fleeting Crystal')
for c in chars:
 for name,cost,shoplv,arena,detail in crystals:
  name=name if name=='Secret Gem' else name+' Crystal'
  extra_sources=[spiderchest['source']] if name==spiderchest['crystal'] else []
  extra_drops=[dict(enemy=spiderchest['enemy'],rate=spiderchest['rate'],location='Character-specific route not indexed',details=spiderchest['conditions'])] if extra_sources else []
  if extra_sources: detail+=f" Spiderchest {spiderchest['rate']}. {spiderchest['conditions']}"
  material(c,name,f'Mirage Arena · {cost} medals',f"Medal shop: shop level {shoplv}, Arena level {arena}. {detail} Rates refer to shop level, not enemy level. Documented farm routes and their remaining limitations are listed separately below.",list(dict.fromkeys(['https://www.khwiki.com/Game:Mirage_Arena']+[r['source'] for r in crystal_sources if r['crystal']==name])),world='Mirage Arena',drops=[dict(enemy='Medal shop',rate='Conditional',location='Mirage Arena',details=f'{cost} medals; shop level {shoplv}, Arena level {arena}.')]+extra_drops)
# Report chest aliases retain the original check identity across both categories.
for e in entries:
 if e['category']!='materials':continue
 farms=[f for f in enrichment.get('crystal_farm_routes',[]) if f['crystal']==e['name'] and e.get('character') in f['characters']]
 for farm in farms:
  e['instructions']+=' Farm route: '+farm['world']+' — '+farm['area']+'. Enemies: '+farm['enemies']+'. '+farm['instructions']+' '+farm['repeat']+' '+farm['conditions']
  e['sources']=list(dict.fromkeys(e['sources']+farm['sources']))
 for gap in enrichment.get('crystal_farm_open_routes',[]):
  if gap['crystal']==e['name']:
   e['instructions']+=' '+gap['finding'];e['sources']=list(dict.fromkeys(e['sources']+gap['sources']))
report_rows=[('Letter','Ventus','Land of Departure','Leave Land of Departure'),('I','Ventus','Deep Space','Launch Deck chest'),('II','Terra','Radiant Garden','Defeat Braig'),('III','Aqua','Radiant Garden',"Merlin’s House chest"),('IV','Aqua','Mysterious Tower','Speak with Yen Sid'),('V','Terra','Mirage Arena','Clear Sinister Sentinel'),('VI','Aqua','Enchanted Dominion','Defeat Maleficent'),('VII','Aqua','Keyblade Graveyard','Defeat Ventus-Vanitas'),('VIII','Terra','Land of Departure','Defeat Eraqus'),('IX','Ventus','Destiny Islands','Leave Destiny Islands'),('X','Ventus','Keyblade Graveyard','Defeat Vanitas'),('XI','Terra','Keyblade Graveyard','Defeat Terra-Xehanort'),('XII','Ventus','Keyblade Graveyard','Seat of War chest')]
for num,c,w,how in report_rows:
 name='Xehanort’s Letter' if num=='Letter' else f'Xehanort’s Report {num}'
 match=next((e for e in entries if e.get('character')==c and e.get('world')==w and 'report' in e['name'].lower() and e['name'].split()[-1]==num),None)
 if match:
  match['categories']=['reports']
  match['instructions']+=' Required for Final Episode; Xehanort report acquisition.'
 else:
  entries.append(dict(id=ident(c,'report',num),category='reports',name=name,character=c,world=w,summary=how,instructions=how+'.',collectible=False,sources=['https://www.khwiki.com/Xehanort%27s_Report']))
# Authored reference records are deliberately separate from world collectible totals.
mission=[('Enchanted Dominion','Flame Box','Waterside','≥30','Firaga'),('Castle of Dreams','Lone Runner','Terra/Aqua: Ballroom; Ventus: Wardrobe Room','≥30 in 1:30','Illusion-L'),('Dwarf Woodlands','Vitality Vial','Terra/Aqua: Underground Waterway; Ventus: The Mine','Survive ≥2:00','Illusion-V'),('Radiant Garden','Belly Balloon','Terra/Ventus: Outer Gardens; Aqua: Central Square','<1:00','Illusion-B'),('Disney Town','Ringer','Raceway','≥40 in 2:00','Illusion-R'),('Deep Space','Gluttonous Goo','Launch Deck','≥90 orbs in 2:00','Terra/Ventus: Stun Block; Aqua: Confuse Barrier'),('Neverland','Element Cluster','Indian Camp','≥70 in 1:30','Voltage Stack'),('Olympus Coliseum','Jellyshade','Town Near Thebes','300 within 0:30','Stopga'),('Keyblade Graveyard','Floating Flora','Seat of War','≥350 in 1:30','Illusion-F')]
for c in chars:
 for w,n,a,target,reward in mission:
  entries.append(dict(id=ident(c,'mission',n),category='challenges',character=c,world=w,area=a,name=n+' — Unversed Mission',summary='Three stars: '+target,instructions='Three-star target: '+target+'.',prerequisites='Complete this world’s episode.',reward=reward,sources=['https://www.khwiki.com/Unversed_Mission']))
 for points,prizes in [(20,['Pulsing Crystal','Wellspring Crystal','Ignite']),(40,['Fireworks','Fireworks','Shimmering Crystal']),(70,['Limit Storm','Collision Magnet','Stop Barrier']),(110,['Sonic Blade','Salvation','Deep Freeze']),(140,['Rhythm Mixer']*3)]:
  entries.append(dict(id=ident(c,'album',str(points)),category='album',character=c,name=f'{points}-point album reward',summary=prizes[chars.index(c)],instructions='Arrange collected stickers in the album. Correct placement gives seven points per sticker; all 20 correctly placed give 140. Pickup checks and album rewards are separate.',reward=prizes[chars.index(c)],sources=['https://www.khwiki.com/Sticker_Album']))
arena=[('Day of Reckoning','Initial','Heals ≤5'),('Wheels of Misfortune','Aqua initially; other characters need Aqua clear data','≤6:00'),('Risky Riches','Arena level 8 / ticket','Collect ≥1,400 munny'),('Weaver Fever','Terra initially; other characters need Terra clear data','Styles + Shotlocks ≥8'),('Sinister Sentinel','Arena level 3 / ticket','Blocks ≥20'),('Dead Ringer','Arena level 5 / ticket','Heals ≤3'),('Combined Threat','Radiant Garden / clear-file / ticket conditions','≤5:30'),('Treasure Tussle','Arena level 15 / ticket','Collect ≥1,750 munny'),('Harsh Punishment','Arena level 10','Heals ≤3'),('A Time to Chill','Aqua Olympus progress / Aqua clear data / ticket conditions','Blocks ≥50'),('Copycat Crisis','Arena level 17','Styles + Shotlocks ≥15'),('Keepers of the Arena','Arena level 20','Heals ≤15'),('Monster of the Sea','Arena level 8','≤7:30'),("Villains’ Vendetta",'Arena level 25','Styles + Shotlocks ≥25'),("Light’s Lessons",'Arena level 28','Blocks ≥100'),('Peering into Darkness','Arena level 30','≤25:00')]
for c in chars:
 for n,gate,bonus in arena:
  reward=''
  if n=='Sinister Sentinel' and c=='Terra':reward='Xehanort’s Report V'
  if n=='Dead Ringer' and c=='Terra':reward='Darkgnaw'
  if n=='Keepers of the Arena':reward={'Terra':'Ultima Cannon','Ventus':'Multivortex','Aqua':'Lightbloom'}[c]
  if n=="Villains’ Vendetta":reward='Ultima Weapon'
  if n=='Peering into Darkness':reward='Royal Radiance'
  entries.append(dict(id=ident(c,'arena',n),category='arena',character=c,world='Mirage Arena',name=n,summary='HD bonus: '+bonus,prerequisites=gate,instructions='Solo HD match. Bonus objective: '+bonus+'. Group Cure/Cura/Curaga do not count toward heal limits.',reward=reward,uncertainty='Ticket and cross-character clear-file alternatives need exact AND/OR validation.' if '/' in gate or 'data' in gate else '',sources=['https://www.khwiki.com/Arena_Mode']))
 for n,t in [('Country Chase','2:30'),('Disney Drive','5:00'),('Grand Spree','5:00'),('Castle Circuit','5:30')]:
  entries.append(dict(id=ident(c,'racing',n),category='minigames',character=c,world='Disney Town',name=n,summary='Arena five-lap target: '+t,instructions='Arena five-lap time target: '+t+'. Race victory and Arena timing are separate requirements.',prerequisites='Grand Spree: top three in Country Chase and Disney Drive. Castle Circuit: win Grand Spree.',reward='Victory Line for first place in Castle Circuit.' if n=='Castle Circuit' else '',sources=['https://www.khwiki.com/Rumble_Racing']))
 for n,t,reward in [("It’s a Small World",2488,'Elixir'),('Blast Away! -Gummi Ship II-',3270,'Blizzara'),('Dessert Paradise',2500,'Frozen Fortune'),('Destiny Islands',2958,'Chaos Crystal'),('Hand in Hand',3260,'Blizzaga')]:
  entries.append(dict(id=ident(c,'ice-cream-beat',n),category='minigames',character=c,world='Disney Town',name=n+' — Ice Cream Beat',summary=f'Master Fantastic: {t:,}',instructions=f'Use the score column, not the height-added total. Reach {t:,} for Master Fantastic. First reward differs from repeat prizes.',prerequisites='Beginner Cool unlocks Master. Hand in Hand requires Cool on the other four Master songs.',reward=reward,sources=['https://www.khwiki.com/Ice_Cream_Beat']))
 for n in ['Bruisers','Chip & Dale','Pete']:
  entries.append(dict(id=ident(c,'fruitball',n),category='minigames',character=c,world='Disney Town',name='Fruitball — '+n,summary='Win the match',instructions='Win against '+n+'.',reward='Magnera' if n=='Chip & Dale' else 'Chaos Snake' if n=='Pete' else '',sources=['https://www.khwiki.com/Fruitball']))
 for n in ['Keyblade','Royal','Spaceship','Toon','Skull','Hunny Pot','Secret']:
  entries.append(dict(id=ident(c,'board',n),category='minigames',character=c,name=n+' Command Board',summary='Win the board',instructions='Win this board. Menu and Mirage Arena sessions have different command acquisition rules; this check records a board win, not acquisition of every panel.',prerequisites='Merlin’s book unlocks Hunny Pot; Secret requires winning each of the other six boards.',sources=['https://www.khwiki.com/Command_Board']))
entries.extend([dict(id='bbsfm:final-episode:unlock',category='episodes',character='Aqua · Final Episode',name='Final Episode',summary='Clear all three stories and collect every Xehanort Report',instructions='Keep all three clear files. Collect the Letter and Reports I–XII. Final Episode derives from Aqua’s completed save; Radiant Garden becomes the boss entry and Land of Departure is unavailable.',sources=['https://www.khwiki.com/Final_Episode']),dict(id='bbsfm:secret-episode:unlock',category='episodes',character='Aqua · Secret Episode',name='Secret Episode',summary='Clear Final Episode; additional requirements depend on difficulty',instructions='Final Mix: Beginner requires all three 140-point albums plus Keyslinger, In the Munny and Power Walker. Standard requires all albums plus Keyslinger. Proud requires all albums. Critical lists no extra requirement after Final Episode. In-game Trinity trophies: Keyslinger = 9,999 Unversed; In the Munny = 33,333 munny; Power Walker = 99,999 steps. This is BBS’s Secret Episode, not the standalone 0.2 game.',uncertainty='Mixed-difficulty and already-cleared-save aggregation remain unverified.',sources=['https://www.khwiki.com/Blank_Points','https://www.khwiki.com/A_Fragmentary_Passage'])])

# Actual public Steam goals, checked against the official collection list 2026-09-20.
# The list is intentionally partial: hidden descriptions and ambiguous shared names are omitted.
steam_goals=[
 ('The Journey Begins','Land of Departure prologue complete',None),
 ('Pursuit of Truth','Mysterious Tower complete','Terra'),('Defying Darkness','Disney Town complete','Terra'),('Entrusting Power','Destiny Islands complete','Terra'),
 ('Encounters','Badlands complete','Ventus'),('A Moment of Rest','Disney Town complete','Ventus'),('A Friend in Need','Mysterious Tower complete','Ventus'),
 ('Drifting Apart','Radiant Garden complete','Aqua'),('Hopeful Hearts','Destiny Islands complete','Aqua'),
 ('Musclehead','Use Break Time','Terra'),('B-Boy','Use Break Time','Ventus'),('Majorette','Use Break Time','Aqua'),
 ('Perfect Shot','50 Shotlock uses',None),('Collector','Collect every sticker',None),('Fantasista','Beat every Fruitball opponent',None),
 ('Rapid Racer','Win every Rumble Racing course',None),('Command Board Conqueror','Win every playable board',None),
 ('Pawn of the Arena','Clear every one-star Arena mission',None),('Knight of the Arena','Clear every two-star Arena mission',None),
 ('Queen of the Arena','Clear every three-star Arena mission',None),('King of the Arena','Clear every four-star Arena mission',None),
 ('Keepers of the Arena','Clear the named Arena battle',None),("Villains' Vendetta",'Clear the named Arena battle',None),
 ('D.J.','20 Rhythm Mixer activations',None),('Justice & Dark','10 Pete D-Link uses',None),
 ('Pâtissier','Make every ice-cream flavor',None),('Maestro','Master Fantastic on every Ice Cream Beat song',None),('Savage Slayer','Highest rank in every Unversed mission',None),
 ('The Warrior: Terra','Learn every Finish Command','Terra'),('The Warrior: Ventus','Learn every Finish Command','Ventus'),('The Warrior: Aqua','Learn every Finish Command','Aqua'),
 ('The Adventurer: Terra','Complete Reports','Terra'),('The Adventurer: Ventus','Complete Reports','Ventus'),('The Adventurer: Aqua','Complete Reports','Aqua')]
for name,goal,c in steam_goals:
 e=dict(id='bbsfm:achievement:'+slug(name),category='achievements',name=name,summary=goal+'.',collectible=False,sources=['https://steamcommunity.com/stats/2552430/achievements/'])
 if c:e['character']=c
 if name.startswith('The Adventurer:'):e['instructions']='The platform goal covers the full in-game Reports, including narrative and character categories. The guide’s world collectible checks alone do not establish this achievement.'
 if name in ['Collector','Savage Slayer','Pâtissier','Maestro','Command Board Conqueror']:e['uncertainty']='Exact one-character versus combined-save aggregation is not certified by the public description. Track the platform award independently.'
 entries.append(e)
# Bestiary source index: preserve conditional Shop Level ranges instead of flattening rates.
enemy_drops=defaultdict(list)
for line in (DATA/'materials-and-equipment.md').read_text().splitlines():
 if not line.startswith('| ') or 'Crystal |' not in line and not line.startswith('| Secret Gem |'):continue
 cols=[v.strip() for v in line.strip('|').split('|')]
 if len(cols)!=4:continue
 material_name,_,drop_text,source=cols
 for part in drop_text.split('; '):
  m=re.match(r'([A-Za-z ]+?) (\d[\s\S]*)',part)
  if m:
   enemy_drops[m[1]].append((material_name,m[2],('https://www.khwiki.com/Spiderchest' if m[1]=='Spiderchest' else 'https://www.khwiki.com/Archraven' if m[1]=='Archraven' else re.search(r'\((https[^)]+)\)',source).group(1))))
for enemy,drops in sorted(enemy_drops.items()):
 entries.append(dict(id='bbsfm:bestiary:'+slug(enemy),category='bestiary',name=enemy,summary='; '.join(n+': '+rate for n,rate,_ in drops)+'.',instructions='Rate bands are Shop Levels, not enemy or character levels. This is a material-source reference, not a complete enemy catalog.',uncertainty='Exact spawn rooms are not yet documented.',checkable=False,collectible=False,sources=list(dict.fromkeys(source for _,_,source in drops))))

# Integrate individually sourced research without changing existing check identities.
for e in entries:
 if e['category']=='finishers' and e.get('prerequisites')!='Initial finish command.':
  e['instructions']+=' '+enrichment['practical_guidance']['finish_progress']
  e['sources'].append(enrichment['practical_guidance']['finish_source'])
 patch=enrichment['collectible_overrides'].get(e['id'])
 if patch:
  e['sources']=list(dict.fromkeys(e.get('sources',[])+patch.get('sources',[])))
  e.update({k:v for k,v in patch.items() if k!='sources'})
  if patch.get('album_placement'):e['instructions']+=' Album placement: '+patch['album_placement']+'. Confirm the seven-point feedback; source regions do not define pixel boundaries.'
 if e['category']=='challenges':
  mission_name=e['name'].split(' — ')[0]
  info=enrichment.get('unversed_missions',{}).get(mission_name)
  if info:
   e['rankBands']=info['ranks']
   e['instructions']='Published rank bands: '+ '; '.join(k+' star: '+v for k,v in info['ranks'].items())+'. '+info['strategy']+' '+info['characters'][e['character']]
   if info.get('boundary_note'):e['uncertainty']=info['boundary_note']
   e['instructions']+=' '+enrichment['practical_guidance']['mission_targets'].get(mission_name,'')
 if e['category']=='minigames' and ' — Ice Cream Beat' in e['name']:
  song=next(r for r in enrichment['ice_cream_beat']['songs'] if r['name']==e['name'].split(' — ')[0])
  e['rankRewards']=song
  e['instructions']=enrichment['ice_cream_beat']['score_rule']+' Beginner ranks (Good/Cool/Fantastic): '+ '/'.join(str(song['beginner'][r]) for r in ['good','cool','fantastic'])+'. Master: '+ '/'.join(str(song['master'][r]) for r in ['good','cool','fantastic'])+'.'
  e['reward']='Master first Fantastic: '+song['master_first_fantastic']+'; repeat Fantastic: '+song['master_repeat_fantastic']+'.'+(' Beginner first Fantastic: '+song['beginner_first_fantastic']+'.' if song['beginner_first_fantastic'] else '')
 if e['category']=='minigames' and e['name'].startswith('Fruitball — '):
  match=e['name'].split(' — ')[1];info=enrichment['fruitball']['matches'].get(match)
  if info:
   e['instructions']=enrichment['fruitball']['rules']+' '+info['strategy'];e['reward']='First win: '+info['first']+'; repeat: '+info['repeat']+'.'
 if e['category']=='minigames' and e['name'] in enrichment['racing_followup']['courses']:
  info=enrichment['racing_followup']['courses'][e['name']]
  e['instructions']+=' '+enrichment['racing_followup']['rules']+' '+info['route'];e['reward']=info['place']+' finish: '+info['first']+' first time; '+info['repeat']+' subsequently.'
 if e['category']=='keyblades':
  w=next((w for w in enrichment['weapon_reach'] if w['name'].replace(chr(39),'’')==e['name'].replace(chr(39),'’') and w['character']==e['character'].split(' · ')[0]),None)
  if w:e['instructions']+=' Reach: '+w['length']+'. '+w['passive'];e['sources'].append(w['source'])
 if e['category']=='minigames' and e['name'].endswith(' Command Board'):
  board=next((b for b in enrichment['command_boards']['boards'] if e['name']==b['name'].replace(' Board',' Command Board')),None)
  if board:
   e['instructions']+=' '+enrichment['command_boards']['rules']+' Bonus panels (map key: normal; limited; Arena): '+'; '.join(str(p['key'])+': '+p['normal']+'; '+p['limited']+'; '+p['arena'] for p in board['panels'])+'.'
   e['instructions']+=' Opponent decks (command level × quantity; ? = unspecified): '+'; '.join(deck['opponent']+(' (opponent for '+ '/'.join(deck['characters'])+')' if deck.get('characters') else '')+': '+', '.join(card['command']+' Lv '+str(card['level'])+' × '+(str(card['quantity']) if card['quantity'] is not None else '?')+(' ['+card['scope_note']+']' if card.get('scope_note') else '') for card in deck['cards']) for deck in board.get('opponent_decks',[]))+'. '+enrichment['command_boards']['opponent_deck_evidence']
   e['sources'].append(board['source'])
   e['uncertainty']=enrichment['command_boards']['remaining']
 if e['category']=='abilities':
  detail=enrichment['abilities'][e['name']]
  e['instructions']=detail['effect']+'. '+detail.get('acquisition',e['instructions'])+' '+detail.get('modern_note','')+' An attached ability is active while its command is equipped; mastering it makes it permanent. Enabled stacks are separate from acquired copies.'
  e['sources']=list(dict.fromkeys(e['sources']+[detail['source']]))
 if e['category']=='arena':
  rule=enrichment['arena_entry_rules'].get(e['name'])
  if rule:e['prerequisites']=rule.get(e['character'],rule.get('all'));e['uncertainty']='';e['sources']+=['https://www.khwiki.com/Game:Mirage_Arena','https://www.khwiki.com/Battle_Ticket']+enrichment.get('arena_entry_rules_sources',[])
  bonus=enrichment['arena_bonuses'].get(e['character'],{}).get(e['name'])
  if bonus:e['reward']='; '.join(filter(None,[e.get('reward'),bonus]))
  if e['name']=='Light’s Lessons':e['uncertainty']='HP reward: existing HD sources report +15; an independent guide combining HD and PSP columns reports +10 without separating the reward by edition.';e['sources'].append('https://kouryakutsushin.com/khbbs/arenamode.htm')
  if e['name']=='Monster of the Sea':e['reward']='Mini'
  if e['name']=='A Time to Chill' and e['character'] in ['Ventus','Aqua']:
   e['uncertainty']+=' HP reward conflicts: individual battle page +5; world Bonus Levels table and HD Gamer Guides +10.'
   e['sources'].append('https://www.gamerguides.com/kingdom-hearts-hd-25-remix/guide/birth-by-sleep-final-mix/mirage-arena/time-to-chill')
for c in chars:
 for r in command_catalog:
  if c not in r['characters']:continue
  key=ident(c,'command',r['name']);e=next((e for e in entries if e['id']==key),None)
  if e is None:
   e=dict(id=key,category='commands',name=r['name'],character=c,summary=r['type']+' command',instructions='',sources=[]);entries.append(e)
  routes=[]
  for route in r.get('acquisitions',[]):
   subject=route.split(':',1)[0] if ':' in route else route.split(' can ')[0].split(' has ')[0]
   mentioned=[ch for ch in chars if ch in subject]
   if not mentioned or c in mentioned:routes.append(route)
  curve=r.get('cp_steps')
  facts=[]
  if r.get('max_level'):facts.append('Catalog maximum level '+str(r['max_level'])+'.')
  if curve and any(p['level']>1 for p in curve):facts.append('CP required per level step: '+', '.join(str(p['level'])+': '+str(p['cp']) for p in curve if p['level']>1)+'.')
  if r.get('cp_evidence_status'):facts.append(r['cp_evidence_status'])
  if r['type']!='Item' and (r.get('max_level') or 0)>1 and (not curve or r.get('cp_evidence_status')):facts.append(enrichment['practical_guidance']['command_mastery'])
  if r['type']=='Shotlock':facts.append(enrichment['practical_guidance']['reports_hit_counts'])
  if routes:e['instructions']=' '.join(routes)
  e['instructions']+=' '+' '.join(facts)
  if r.get('enemy_drops'):e['instructions']+=' World drops: '+'; '.join(r['enemy_drops'])+'. Exact character rooms/reset routes remain unverified.'
  e['sources']=list(dict.fromkeys(e['sources']+[r['source'],r['roster_source']]+r.get('acquisition_sources',[])))
  if r['type']=='Shotlock':e['sources']=list(dict.fromkeys(e['sources']+enrichment['practical_guidance']['reports_hit_count_sources']))
  material_entry=next((m for m in entries if m['id']==ident(c,'material',r['name'])),None)
  if material_entry and 'exact acquisition route is not yet documented' in material_entry['instructions']:
   if routes:material_entry['instructions']=' '.join(routes);material_entry['summary']='Sourced command acquisition'
   else:
    producing=[recipe for recipe in recipes if recipe.get('character')==c and r['name'] in recipe['name'].split(' / ')]
    if producing:material_entry['instructions']='Command melding: '+ '; '.join(recipe['instructions'].split('. One attempt')[0] for recipe in producing)+'. See producing recipes for probabilities and attached abilities.';material_entry['summary']='Command melding'
 for mission in enrichment['arena_level_missions']:
  if mission['metric']=='battle-clear':continue # canonical battle check already represents this predicate
  if mission['metric']=='five-lap-time':continue # canonical race check already records this target
  metric=mission['metric'];n=mission['target']
  name=f'{n:,} cumulative medals' if metric=='cumulative-medals-earned' else f'{n} Command Board wins'
  entries.append(dict(id=ident(c,'arena-level',metric+'-'+str(n)),category='arena',character=c,world='Mirage Arena',name=name,summary='Arena level condition',instructions=('Earn '+f'{n:,}'+' medals cumulatively. Spending medals does not reduce this total.' if metric=='cumulative-medals-earned' else 'Win '+str(n)+' Command Board games in Mirage Arena. This counts wins, not distinct boards.')+' One of the 29 Final Mix level-up conditions.',sources=['https://www.khwiki.com/Game:Mirage_Arena']))
 for ticket in enrichment['tickets']:
  if c not in ticket['characters']:continue
  entries.append(dict(id=ident(c,'ticket',ticket['name']),category='arena',character=c,world='Mirage Arena',name=ticket['name'],summary=str(ticket['cost'])+' medals',instructions=f"Medal Shop: Shop Level {ticket['shop_level']} AND Arena Level {ticket['arena_level']}; {ticket['cost']} medals. One entry to {ticket['battle']}, bypassing that battle’s Arena Level restriction. Story/clear-file requirements are not claimed to be bypassed.",checkable=False,collectible=False,sources=[ticket['source']]))
entries.append(dict(id=ident('Aqua','fruitball','story-shoegazers'),category='minigames',character='Aqua',world='Disney Town',name='Fruitball — story Shoegazers',summary='Story match',instructions='Aqua’s story match is separate from the three repeatable Fruitball opponents. '+enrichment['fruitball']['rules']+' '+enrichment['fruitball']['matches']['Shoegazers']['strategy'],reward='Balloon Letter',sources=['https://www.khwiki.com/Fruitball']))
for r in enrichment['additional_steam_goals']:
 e=dict(id='bbsfm:achievement:'+slug(r['name']),category='achievements',name=r['name'],summary=r['goal'],instructions=r['goal'],collectible=False,sources=[r['source'],'https://truesteamachievements.com/game/KINGDOM-HEARTS-HD-1525-ReMIX/achievements'])
 if r['character']:e['character']=r['character']
 entries.append(e)
steam_metadata={r['name']:r for r in json.loads((DATA/'steam-achievements.json').read_text())['achievements']}
for e in entries:
 if e['category']!='achievements':continue
 r=steam_metadata[e['name']]
 e['sources'].append(r['source'])
 if e['name']=='Collector':
  e['instructions']=enrichment['practical_guidance']['collector']
  e['sources'].append(enrichment['practical_guidance']['collector_source'])
 if e['name'].startswith('The Adventurer:'):
  e['instructions']+=' '+enrichment['practical_guidance']['reports_hit_counts']
  e['sources']+=enrichment['practical_guidance']['reports_hit_count_sources']
for e in entries:
 if e['id']=='bbsfm:secret-episode:unlock':
  e['instructions']+=' '+enrichment['practical_guidance']['secret_episode']
  e['sources']=list(dict.fromkeys(e['sources']+enrichment['practical_guidance']['secret_sources']))
families=json.loads((DATA/'command-families.json').read_text())
for kind in ['styles','dlinks']:
 for r in families[kind]:
  for c in r['characters']:
   detail=('Trigger: '+r['triggers']+'. '+('A level-two style requires an active first-tier style.' if r['level']=='LV 2' else '')) if kind=='styles' else families['dlink_progression']+' First emblem: '+r['first_emblem']+'. Second emblem: '+r['second_emblem']+'.'
   sources=[r['source']]+r.get('additional_sources',[])
   if kind=='dlinks':
    detail+=' '+ ' '.join(a['name']+': '+a['instructions'] for a in r.get('finisher_actions',[]))
    sources += [a['source'] for a in r.get('finisher_actions',[])]
    sources += [s for a in r.get('finisher_actions',[]) for s in a.get('supporting_sources',[])]
    decks=[[cmd for cmd in deck if not (r['name']=='Stitch' and c!='Aqua' and cmd=='Thundaga Shot')] for deck in r['deck_by_emblems']]
    detail+=' '+families['usage']+' Linked decks by 0/1/2 emblems: '+' / '.join(', '.join(deck) for deck in decks)+'. Finishers by 0/1/2 emblems: '+' / '.join(', '.join(deck) for deck in r['finish_by_emblems'])+'. Emblem drop chances by current 0/1/2 emblems: '+' / '.join('unknown' if p is None else str(p)+'%' for p in r['emblem_chance_percent'])+'. Attack gauge multiplier: '+r['gauge_attack_multiplier']+'. Gauge bonus: '+r['gauge_bonus']['condition']+' '+r['gauge_bonus']['amount']+'.'
    sources.append(r['mechanics_source'])
    detail+=' '+enrichment['practical_guidance']['reports_hit_counts']
    sources+=enrichment['practical_guidance']['reports_hit_count_sources']
   entries.append(dict(id=ident(c,kind,r['name']),category=kind,character=c,name=r['name'],summary='Command Style' if kind=='styles' else 'D-Link',instructions=r['acquisition']+'. '+detail,sources=sources))
# Keep generated content reviewable and reproducible.
for boss in enrichment['boss_encounters']:
 for c in boss['characters']:
  entries.append(dict(id=ident(c,'boss-reference',boss['name']),category='bestiary',character=c,world=boss['world'],area=boss['area'],name=boss['name'],summary='Encounter reference',prerequisites=boss['access'],instructions=boss['instructions'],reward=boss['reward'],uncertainty='Sourced encounter overview; complete per-character attack/stat/recovery coverage remains unverified.',checkable=False,collectible=False,sources=[boss['source']]))
guide=dict(id='bbsfm',name='Birth by Sleep',edition='Final Mix',accent='blue',craftingLabel='Melding & Ice Cream',categories=[dict(id=i,label=l,icon=k) for i,l,k in [('bestiary','Bestiary','monster'),('treasures','Treasures','chest'),('stickers','Stickers','spark'),('reports','Xehanort Reports','scroll'),('keyblades','Keyblades','sword'),('commands','Command Shop','wand'),('styles','Command Styles','spark'),('dlinks','D-Links','heart'),('abilities','Abilities','leaf'),('finishers','Finish Commands','heart'),('album','Sticker Album Rewards','book'),('challenges','Unversed Missions','medal'),('arena','Mirage Arena','cup'),('minigames','Minigames','trinity'),('episodes','Episodes','torn-page'),('achievements','Steam Achievements','medal')]],worlds=[dict(name=w,summary=('Aqua’s Secret Episode; separate from the standalone 0.2 game.' if w=='Realm of Darkness' else 'Solo Arena battles, medal shop and character-specific rewards.' if w=='Mirage Arena' else 'Character-specific treasure and sticker records; use collection links to filter this world.')) for w in worlds],entries=entries,recipes=recipes,coverage='Research-backed catalog: 374 main-story chest candidates, 8 Secret Episode chests, 60 stickers and the separate tutorial chest. Character inventories stay separate. Within-room pickup locators and practical farming loops are supplied with explicit evidence limits. Meld probabilities describe attempts, not guaranteed results; Mine Square’s lower Ignite level limit remains unresolved. The Steam overlay includes 45 BBS goals; all 45 API IDs are mapped; exact save aggregation, raw hidden flags and build-specific glitch behavior remain incomplete. Bestiary is a partial crystal-drop reference; all 187 persistent HD commands have acquisition guidance with edition exclusions. Deferral does not verify missing CP, drop, timing or Reports-order evidence. '+research_summary)
(ROOT/'src/games/bbsfm/content.json').write_text(json.dumps(guide,ensure_ascii=False,indent=2)+'\n')
print('entries',len(entries),'recipes',len(recipes),'meld groups',len(groups))
