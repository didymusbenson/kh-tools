"""Build factual DDD records from checked-in research. No copied guide prose."""
import json,re,pathlib,unicodedata
root=pathlib.Path(__file__).resolve().parents[3]
p=root/'ai_docs/games/dddhd'; data=json.loads((p/'legacy-factual-candidates.json').read_text()); t=data['tables']
def slug(s): return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip('-')
def wiki(s):return 'https://www.khwiki.com/'+s.replace(' ','_').replace("'",'%27').replace('&','%26')
def plain(s):return re.sub(r'\[([^\]]+)\]\([^)]+\)',r'\1',s).replace('**','').strip()
def rows(file):
 for l in (p/file).read_text().splitlines():
  if l.startswith('|') and not l.startswith('|---'):yield [plain(c) for c in l.strip('|').split('|')]
e=[]; recipes=[]
def add(cat,name,summary,**kw):
 d={'id':'dddhd:'+cat+':'+slug(name),'category':cat,'name':name,'summary':summary,**kw};e.append(d);return d
aliases={'Jeggle Pup':'Juggle Pup','Magic Rabbit':'Majik Lapin','Duckey Goose':'Ducky Goose','Fishbone':'Fishboné','R&R Seal':'R & R Seal','Megaflare':'Mega Flare','Break time':'Break Time'}
def canonical(x):return aliases.get(x.strip(),x.strip())
spirits=sorted(set(canonical(r[1].strip()) for r in t['Spirit'][1:])|{'Sudo Neku','R & R Seal'})
for name in spirits:
 rewards=[]
 for r in t['spirit_unlocks'][1:]:
  if canonical(r[1])==name and r[2]:rewards.append(f'{r[2]} ({r[4] or "LP not recorded"})')
 d=add('spirits',name,'Shared Spirit breed; creation rank is fixed when created.',instructions='Ability Link reward reference: '+('; '.join(dict.fromkeys(rewards)) if rewards else 'HD board reward extraction pending.'),uncertainty='Legacy board rewards are a flat reference, not a complete path. Secret nodes, level/link gates and disposition requirements must be satisfied before purchases.',sources=[wiki(name),data['source']])
 if name=='Aura Lion':d['instructions']+=' Curaga at C-2 transforms to Faith after the red secret; deeper access also has a level-30 gate. Second Chance is F-5, 300 LP.';d['uncertainty']+=' Source disagrees on red-secret coordinate C-7 versus D-7.'
 if name=='Lord Kyroo':d['instructions']+=' Ars Arcanum replaces Blitz after the G-4 red secret (350 LP). Zantetsuken D-1 (400 LP) requires D-3 green secret and the level-25 gate.'
 if name=='Catanuki':d['instructions']='Spark Raid: E-4, 300 LP. Vanish: A-4, 300 LP. Green-secret and disposition branches govern access.'
 if name=='Beatalike':d['instructions']='Ars Arcanum: G-3, 400 LP. A-2 and G-2 require three Links. Board also contains level-20 and level-30 checkpoints.'
 if name=='Tubguin Ace':d['instructions']='Balloonra: D-4, 150 LP. Dark Firaga: D-1, 400 LP. Combo Plus: D-3, 200 LP. Hidden/disposition paths govern access.'
for r in t['Deck_Command'][1:]:
 name=canonical(r[1]);kind=r[6].title();kind='Reprisal' if kind=='Defense' else kind
 providers=sorted(set(f'{canonical(x[1])}: {x[4] or "LP not recorded"}' for x in t['spirit_unlocks'][1:] if canonical(x[2])==name))
 d=add('commands',name,kind+' command'+(' · '+r[2]+' slots' if kind!='Item' else ''),character=r[5],instructions='Ability Link providers: '+('; '.join(providers) if providers else 'No provider recorded in the imported inventory.'),uncertainty='Provider costs omit board access gates. Additional chest, shop and challenge routes may exist.',sources=[wiki('Deck Command (KH3D)'),data['source']])
 if name=='Balloonra':d['instructions']+=' Also: Sora Solar Sailer chest; Prankster’s Paradise A-rank Dive; Bargain Flurry shop LV5 for 720 munny; HD Tubguin Ace D-4 for 150 LP.'
 if name=='Faith':d['character']='Sora';d['instructions']+=' Aura Lion’s Curaga node transforms after its red-secret purchase and level-30 route. Acquisition is possible with either character; only Sora equips Faith.'
for name,char in [('Block','Sora'),('Wake-up Block','Sora'),('Link Block','Sora'),('Sliding Block','Sora'),('Dark Barrier','Riku')]:add('commands',name,'Defense command.',character=char,uncertainty='Acquisition route not yet verified.',sources=[wiki('Deck Command (KH3D)')])
for r in t['ability'][1:]:
 providers=sorted(set(f'{canonical(x[1])}: {x[4] or "LP not recorded"}' for x in t['spirit_unlocks'][1:] if x[2]==r[1]))
 add('abilities',r[1],f'{r[3].title()} ability · recorded maximum stack {r[2]}.',instructions='Ability Link providers: '+('; '.join(providers) if providers else 'No provider recorded.')+(' Stat abilities require their provider in the party.' if r[3]=='stat' else 'Learned Support and Spirit abilities are retained.'),uncertainty='Legacy stack/provider inventory; complete HD board routes still require verification.',sources=[wiki('Abilities (KH3D)'),data['source']])
materials=sorted((r[1] for r in t['synthesis_item'][1:]),key=lambda n:(n.split()[0],['Figment','Fancy','Fantasy'].index(n.split()[1])))
for name in materials:
 d=add('materials',name,'Dream Piece used for Spirit creation.',checkable=False,sources=[wiki(name.split()[0])],uncertainty='Full HD enemy, shop and portal source inventory has not yet been verified.')
 if name=='Brilliant Fantasy':d.update(summary='Riku Special Portal rewards.',drops=[{'enemy':'Special Portal 6','rate':'Conditional','location':'Riku · Symphony of Sorcery','details':'Guaranteed completion reward.'},{'enemy':'Special Portals 1 / 2 / 3','rate':'33% / 67% / 100%','location':'Riku · The World That Never Was'}],instructions='Clear Riku’s listed portals. Portal reward probabilities are separate from ordinary enemy drop rates. StreetPass rewards are not available in HD.')
 if name=='Savage Fantasy':d.update(summary='Skelterwild / Ryu Dragon: 3%; rare Tyranto Rex: 4%.',drops=[{'enemy':'Skelterwild / Ryu Dragon','rate':'3%','location':'Enemy encounter locations require verification'},{'enemy':'Rare Tyranto Rex','rate':'4%','location':'Rare encounter locations require verification'}],instructions='A finite alternative is Sora’s Avenue to Dreams chest in The World That Never Was. Ordinary Nightmare and rare Nightmare rates are distinct.')
for row in rows('spirits-and-commands.md'):
 if len(row)!=3 or '→' not in row[1]:continue
 name=row[0]
 for i,f in enumerate(row[1].split(';')):
  match=re.search(r'(\d+) ([A-Za-z ]+) \+ (\d+) ([A-Za-z ]+) → ([A-Z★])',f)
  if not match:continue
  a,m,b,n,rank=match.groups();recipes.append({'id':'dddhd:recipe:'+slug(name)+':'+str(i+1),'name':name+' — base rank '+rank,'group':name,'ingredients':[{'id':'dddhd:materials:'+slug(m),'quantity':int(a)},{'id':'dddhd:materials:'+slug(n),'quantity':int(b)}],'instructions':'HD formula. '+row[2]+'. Recipe-item ownership is not required to use a formula. Rank remains fixed after creation; extra ingredients and forecast can affect creation. Outcome probability is not established here; this is an ingredient target, not a guaranteed-rank calculator.'})
worlds=['Traverse Town','La Cité des Cloches','The Grid',"Prankster's Paradise",'Country of the Musketeers','Symphony of Sorcery','The World That Never Was']
short={'La Cité':worlds[1],'Musketeers':worlds[4],'Symphony':worlds[5]}
for r in rows('worlds-and-collectibles.md'):
 if len(r)!=5 or r[0] not in ['Sora','Riku']:continue
 w,num=r[1].split(' #');w=short.get(w,w);d=add('treasures',r[2]+' — #'+num,r[3],world=w,character=r[0],area=r[3].split(';')[0].split(',')[0],reward=r[2],collectible=True,order=int(num),sources=[wiki('Game:'+w)])
 d['id']='dddhd:treasure:'+r[0].lower()+':'+slug(w)+':'+num.zfill(3)
 d['uncertainty']=r[4]+'. Source-reported chest numbering; remaining chest records and precise routes are not yet imported.'
for r in rows('portals-and-challenges.md'):
 if len(r)==5 and r[0] in worlds:
  for char,area in [('Sora',r[3]),('Riku',r[4])]:
   if area=='None':continue
   add('portals',char+' — '+r[0]+' Secret Portal','Boss rematch after game clear.',world=r[0],area=area,character=char,prerequisites='Clear the game.',reward='+10 maximum HP on first clear; all of this character’s Secret Portals award Unbound.',instructions='Find the Secret Portal in '+area+'. Record completion for this character independently.',uncertainty='Precise approach landmark is not verified.',sources=[wiki('Game:'+r[0]),wiki('Portal')])
 if len(r)==4 and r[0] in worlds and r[1].isdigit():
  for char,score in [('Sora',r[1]),('Riku',r[2])]:add('dives',char+' — '+r[0]+' Dive','A rank: '+f'{int(score):,}'+' points.',world=r[0],character=char,reward=r[3],instructions='Earn A rank on all seven of this character’s ordinary world Dives to obtain Divewing.',uncertainty='Listed world reward may be shared across character courses; reward ownership is not auto-propagated. Grid toy replacement needs HD confirmation.' if r[0]=='The Grid' else 'First-award behavior between the two characters remains unverified.',sources=[wiki('Dive Mode')])
 if len(r)==3 and r[1].isdigit():add('challenges',r[0]+' Cup',r[1]+' rounds.',world=worlds[0],area='Fourth District',prerequisites=r[2],instructions='Enter Flick Rush at the tournament moogle. HD uses local tournament play; 3DS wireless play does not apply.',reward='Sweet Dreams for clearing Secret Cup match 5 (Orion).' if r[0]=='Secret' else None,sources=[wiki('Flick Rush')])
for r in rows('rewards-and-achievements.md'):
 if len(r)==3 and r[1] in ['Sora','Riku','Both','Both, character-specific requirement']:
  name,char,req=r
  add('keyblades',name,req,character=char.split(',')[0],instructions=req+'.',sources=[wiki(name)])
 if len(r)==2 and r[0] in ['In the Clear','Badge of Pride','Stop Drop Roller','King of Rush','Keyslinger','In the Munny','Dream Pleaser','Portal Champ','Daring Diver','Motion Slickness','Treasure Seeker','Spirit Guide','Critical Praise','Reality Shifter','Pro Linker','Stat Builder','Ribbit Reaper','Keyblade Conqueror']:
  add('awards',r[0],r[1],instructions='HD in-game trophy; independent of platform achievements.',sources=[wiki('Trophies')])
add('challenges','Julius — Sora','Defeat Julius for Ultima Weapon.',world=worlds[0],area='Fountain Plaza',character='Sora',prerequisites='Clear the game.',sources=[wiki('Julius')])
add('challenges','Julius — Riku','Defeat Julius for Ultima Weapon.',world=worlds[0],area='Fountain Plaza',character='Riku',prerequisites='Clear the game.',sources=[wiki('Julius')])
add('challenges','Lord Kyroo','Shared timed encounter chain; damage persists as he escapes.',instructions='Follow Riku’s Nave → Sora’s Promontory → Riku’s Moonlight Wood. Continue the chain until defeated; do not count each appearance as a separate boss.',prerequisites='Nave encounter is unavailable during the Square fire before Wargoyle.',reward='Lord Kyroo Recipe, Link Accelerator, and HP bonus to the character who finishes the encounter.',sources=[wiki('Lord Kyroo')])
for name,req in [('Balloon Master','Score at least 200 in Balloon.'),('Water Barrel Master','Score at least 400 in Water Barrel.'),('Candy Goggles Master','Score at least 800 in Candy Goggles.'),('Super Cyclist','Score at least 1000 in Light Cycle.'),('Medal Master','Earn at least 3000 Flick Rush medals.'),('Flick Rush Fever','Reach Rush level 20.'),('Brave Challengers','Complete all seven types of Link Portal bonus objectives.'),('Golden Egg','Create a ★ rank Spirit.'),('Strongest Link','Complete one Spirit’s Ability Link board.'),('Kindred Spirits','Reach maximum affinity with one Spirit.'),('Ability Ace','Max out and install Support and Spirit abilities.'),('Command Collector','Collect every command.'),('Dream Piece Collector','Collect every Dream Piece.'),('Recipe Collector','Collect every recipe item.'),('Record Keeper','Reach 100% in Combat, Story, Items and Game Records.')]:add('achievements',name,req,sources=['https://steamcommunity.com/stats/2552440/achievements'],uncertainty='Selected DDD objectives only; this list is not the full platform achievement manifest.')
# Complete the factual chest census, preserving authored instructions where available.
world_facts=json.loads((root/'src/games/dddhd/world-facts.json').read_text())
for material in [x for x in e if x['category']=='materials']: material.pop('drops',None)
existing={x['id']:x for x in e}
for r in world_facts['treasures']:
 ident='dddhd:treasure:'+r['character'].lower()+':'+slug(r['world'])+':'+str(r['number']).zfill(3)
 if ident in existing:continue
 d=add('treasures',r['item']+' — #'+str(r['number']),r['area'],world=r['world'],character=r['character'],area=r['area'],reward=r['item'],collectible=True,order=r['number'],sources=[r['source']],uncertainty='Area and contents are sourced; precise approach directions and prerequisites are not yet verified.')
 d['id']=ident
for r in world_facts['portals']:
 name=r['character']+' — '+r['world']+' Special Portal '+str(r['number'])
 add('portals',name,r['area']+' · '+r['nightmare'],world=r['world'],character=r['character'],area=r['area'],reward=r['reward'],instructions='Forecast: '+r['forecast']+'. Look for '+r['nightmare']+'. Portal selection changes when you Drop; completing an inactive portal remains recorded. All 39 Special Portals for this character award End of Pain.',uncertainty='Source rotation numbering is retained. Bonus-objective details and exact approach landmarks are not yet imported.',sources=[r['source']])
 for material in [x for x in e if x['category']=='materials']:
  match=re.search(re.escape(material['name'])+r' \((\d+)%\)',r['reward'])
  if match:
   material.setdefault('drops',[]).append({'enemy':r['character']+' Special Portal '+str(r['number']),'rate':match[1]+'%','location':r['world']+' · '+r['area'],'details':'Forecast: '+r['forecast']+'. Portal reward probability; not a Nightmare drop rate.'})
# Source pages contain explicit HD replacement tables for changed breeds.
spirit_facts=json.loads((root/'src/games/dddhd/spirit-facts.json').read_text())
known={(r['group'],tuple((i['id'],i['quantity']) for i in r['ingredients'])):r for r in recipes}
recipes=[]
for spirit in spirit_facts:
 for ix,formula in enumerate(spirit['formulas']):
  ingredients=[{'id':'dddhd:materials:'+slug(n),'quantity':q} for n,q in formula['ingredients']]
  old=known.get((spirit['name'],tuple((i['id'],i['quantity']) for i in ingredients)))
  probability='Success: '+formula['probability']+'. ' if formula['probability'] else 'Success probability is not explicitly recorded. '
  alternate='Alternate outcome: '+formula['alternate']+'. ' if formula['alternate'] else ''
  rank='★' if formula['rank']=='S' else formula['rank']
  recipes.append({'id':old['id'] if old else 'dddhd:recipe:'+slug(spirit['name'])+':source-'+str(ix+1),'name':spirit['name']+' — base rank '+rank,'group':spirit['name'],'ingredients':ingredients,'instructions':probability+alternate+'These are the direct ingredients for one creation attempt. Owning a recipe item is not required. Rank is fixed after creation. Extra materials and Risky Winds can change creation rank; Risky Winds is unavailable on Beginner and in Traverse Town. No optimization or guaranteed-result claim is made.'+(' Recipe item: '+old['instructions'].split('HD formula. ')[-1].split('. Recipe-item ownership')[0]+'.' if old else '')+' Source: '+spirit['source']})
 record=next(x for x in e if x['category']=='spirits' and x['name']==spirit['name'])
 if spirit.get('link'):record['summary']='Sora Link: '+spirit['link']+' · Attribute: '+spirit['attribute']+' · Riku style: '+spirit['style']+'.'
 for material in [x for x in e if x['category']=='materials']:
  for field,form in [('normalDrops','Nightmare'),('rareDrops','Rare Nightmare')]:
   match=re.search(re.escape(material['name'])+r' \((\d+)%\)',spirit.get(field,''))
   if match and spirit.get('worlds'):
    material.setdefault('drops',[]).append({'enemy':spirit['name']+' ('+form+')','rate':match[1]+'%','location':re.sub(r',?\s*<br\s*/?>', ', ', spirit['worlds']).strip(),'details':'Base drop rate. Exact encounter rooms and rare spawn requirements are not yet verified.'})
    if spirit['source'] not in material['sources']:material['sources'].append(spirit['source'])
for material in [x for x in e if x['category']=='materials']:
 if material.get('drops'):
  material['summary']=' · '.join(dict.fromkeys(d['enemy']+': '+d['rate'] for d in material['drops'][:3]))
  material['uncertainty']='Source-derived Nightmare and portal routes; precise encounter rooms, shop stock, finite treasure alternatives and additional sources are not exhaustive.'

# Remove null optionals; preserve one stable identity per represented goal.
e=[{k:v for k,v in x.items() if v is not None} for x in e]
assert len({x['id'] for x in e})==len(e)
assert len({x['id'] for x in recipes})==len(recipes)
assert sum(x['category']=='treasures' for x in e)==438
assert '<br' not in json.dumps(e) and '{{' not in json.dumps(e)
assert all(i['id'] in {x['id'] for x in e} for r in recipes for i in r['ingredients'])
(root/'src/games/dddhd/content.json').write_text(json.dumps({'entries':e,'recipes':recipes},ensure_ascii=False,indent=2)+'\n')
print('Entries',len(e),'recipes',len(recipes));from collections import Counter;print(Counter(x['category'] for x in e))
