"""Integrate the complete researched catalogs without changing existing checklist identities."""
import collections,hashlib,json,pathlib,re,unicodedata

def slug(s):return re.sub('[^a-z0-9]+','-',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()).strip('-')
def enrich(entries,recipes,root):
 folder=root/'src/games/dddhd';facts=json.loads((folder/'catalog-facts.json').read_text());spirits=json.loads((folder/'spirit-facts.json').read_text());worlds=json.loads((folder/'world-facts.json').read_text())
 index={e['id']:e for e in entries};wiki=lambda s:'https://www.khwiki.com/'+s.replace(' ','_')
 corrections=json.loads((root/'ai_docs/games/dddhd/continuation-facts.json').read_text())['commandAcquisitionCorrections']
 def command_routes(f):
  routes=list(f['acquisitions'])
  for correction in corrections:
   if correction['name']!=f['name']:continue
   assert correction['sourceAcquisition'] in routes, 'Re-review changed source before applying acquisition correction'
   routes[routes.index(correction['sourceAcquisition'])]=correction['replacement']
  return routes
 def add(cat,name,summary,**kw):
  e={'id':'dddhd:'+cat+':'+slug(name),'category':cat,'name':name,'summary':summary,**kw};entries.append(e);index[e['id']]=e;return e
 def record(cat,name):return index['dddhd:'+cat+':'+slug(name)]
 def append(e,text):e['instructions']=(e.get('instructions','')+' '+text).strip()
 def sources(e,*urls):e['sources']=list(dict.fromkeys(e.get('sources',[])+list(urls)))
 followup=json.loads((root/'ai_docs/games/dddhd/continuation-facts.json').read_text())['gapFollowup']
 for s in spirits:
  e=record('spirits',s['name']);nodes=s['board']['nodes'];bits=[]
  for n in nodes:
   bits.append(n['coordinate']+': '+n['name']+(' ('+n['cost']+')' if n['cost'] else '')+(' ['+'; '.join(n['conditions'])+']' if n['conditions'] else ''))
  e['instructions']='Ability Link nodes: '+'. '.join(bits)+'. Connections: '+', '.join(a+' ↔ '+b for a,b in s['board']['edges'])+'. Purchase an adjacent accessible node to continue; node conditions apply in addition to the connected route.'
  e['uncertainty']='Source board topology and gates are extracted; disposition-dependent nodes remain conditional.'
  if s['name']=='Aura Lion':e['uncertainty']='Source conflict: the grid/table places Red Secret at C-7 (250 LP) and the level-30 checkpoint at D-7, but the Curaga→Faith footnote names D-7. Do not substitute the level gate for the secret purchase.'
  if s['board']['unmatchedSourceDirections']:e['uncertainty']+=' The source draws a leftward path from B-3 toward the existing A-3 Magic Boost node, but A-3 lacks the reciprocal Right direction. That connection is not confirmed; no node is missing.'
  stats='; '.join(k+' '+str(v) for k,v in s['baseStats'].items() if v and v!='???')
  if stats:append(e,'Base values: '+stats+'.')
  disp=[]
  for d in s['dispositions']:
   transitions=[i['action']+' '+i['bodyPart']+' → '+i['to'] for i in d['interactions'] if i['bodyPart']]
   disp.append(d['name']+': '+'; '.join(transitions))
  append(e,'Disposition changes: '+'. '.join(disp)+'.')
  if not s['nightmareForm']:append(e,'Spirit-only breed: no Nightmare enemy form or enemy-drop route.')
  if any(v in [None,'???'] for v in s['baseStats'].values()):e['uncertainty']+=' Source base-stat values are incomplete.'
  if any(i['bodyPart'] is None for d in s['dispositions'] for i in d['interactions']):e['uncertainty']+=' Source omits some disposition body-part instructions.'
  interaction=followup['reportedInteraction']
  if s['name']==interaction['breed']:
   append(e,'HD player-reported interaction: from '+interaction['from']+', '+interaction['action']+' the '+interaction['bodyPart']+' to reach '+interaction['to']+'.')
   sources(e,interaction['source']);e['uncertainty']+=' This additional interaction is a PS4 player report, not independently verified on Steam.'
 # Every command and ability gets providers from all 54 live boards, including state gates.
 for e in [x for x in entries if x['category'] in ['commands','abilities']]:
  providers=[];urls=[]
  for s in spirits:
   for n in s['board']['nodes']:
    if e['name'] in n['name'].split('; '):
     providers.append(s['name']+' '+n['coordinate']+' ('+n['cost']+')'+(' — '+'; '.join(n['conditions']) if n['conditions'] else ''));urls.append(s['source'])
  e['instructions']='Ability Link: '+('; '.join(providers)+'.' if providers else 'No board purchase; use acquisition/default routes below.')
  sources(e,*urls)
  e['uncertainty']='Board access requires preceding nodes and the listed level, Link, disposition or secret gates.' if providers else ''
  if e['category']=='abilities':append(e,'Stat abilities require the provider in the party.' if 'stat ability' in e['summary'].lower() else 'Support and Spirit abilities remain learned after changing the party.')
 for a in facts['abilities']:
  e=record('abilities',a['name']);e['summary']=e['summary'].split(' · ')[0]+' · maximum useful stack '+str(a['maximumStack'])+'.';sources(e,a['source'])
 for f in facts['commands']:
  e=record('commands',f['name']);e['character']=f['character'];e['summary']=f['kind']+' command'
  if f.get('slotsOrUses'):e['summary']+=' · '+f['slotsOrUses']+(' uses' if f['kind']=='Item' else ' slots')
  if f.get('element'):e['summary']+=' · '+f['element']
  routes=command_routes(f);append(e,' '.join(routes));sources(e,f['source'])
  for correction in corrections:
   if correction['name']==f['name']:sources(e,*correction['sources'])
  for mechanic in f['mechanics']:append(e,mechanic+'.')
  if len(f['reloadCandidates'])>1:e['uncertainty']=e.get('uncertainty','')+' Reload source conflict: '+', '.join(str(int(x)) if float(x).is_integer() else str(x) for x in f['reloadCandidates'])+' seconds are reported in the same DDD page; no value is certified.'
 for name in ['Faith','Curaga','Second Chance']:
  e=record('abilities' if name=='Second Chance' else 'commands',name)
  e['uncertainty']=e.get('uncertainty','')+' Aura Lion source conflict: the red secret is C-7 in its grid/table, D-7 in its transformation footnote; D-7 is also the level-30 checkpoint.'
 for bonus in facts['commandCreationBonuses']:
  key='dddhd:commands:'+slug(bonus['command'])
  if key in index:append(index[key],'Creation donation bonuses: '+', '.join(k+' '+v for k,v in bonus.items() if k!='command' and v and v not in ['—','-','0'])+'. Donating consumes the command.')
 # Explicit defaults; these are not missing board rewards.
 for name,instruction in [('Scan','Available and equipped by default for both characters.'),('EXP Zero','Available by default on Proud and Critical only; enable it in Abilities. Unavailable on Beginner and Standard.')]:
  e=record('abilities',name);e['instructions']=instruction;e.pop('uncertainty',None);sources(e,wiki('Abilities_(KH3D)'))
 record('commands','Jump')['instructions']='Default movement command for both characters.'
 # Join every pickup landmark to its stable HD identity; preserve longer authored approaches.
 chest_routes={r['id']:r for r in json.loads((root/'ai_docs/games/dddhd/chest-route-enrichment.json').read_text())['rows']}
 assert len(chest_routes)==438
 def chest_id(t):return 'dddhd:treasure:'+t['character'].lower()+':'+slug(t['world'])+':'+str(t['number']).zfill(3)
 for t in worlds['treasures']:
  e=index[chest_id(t)];route=chest_routes[e['id']]
  assert route['character']==t['character'] and route['world']==t['world'] and route['area']==t['area']
  if t['note']:append(e,'Location/access: '+t['note']+'.')
  append(e,route['directions']+' Compass directions follow the map, not the camera.');sources(e,*route['sources'])
  if route.get('prerequisites'):e['prerequisites']=(e.get('prerequisites','')+' '+route['prerequisites']).strip()
  e['uncertainty']='Pickup landmark is sourced; earliest access, minimum movement abilities and returnability are not comprehensively established.'
  if route.get('reportsOrderEvidence'):append(e,'HD Reports order: #'+str(route['currentNumber'])+'.')
  elif route['sourceNumber']!=route['currentNumber']:e['uncertainty']+=' Location guide labels this pickup #'+str(route['sourceNumber'])+'; the current HD table labels it #'+str(route['currentNumber'])+'. Item and area agree; independent in-game Reports ordering remains unverified.'
 # Join complete chest routes to command/material/recipe/toy destinations, with world provenance.
 byreward=collections.defaultdict(list)
 for t in worlds['treasures']:byreward[t['item']].append(t)
 def acquisition_joins(e,name):
  for t in byreward.get(name,[]):
   if name=='Balloon' and ((e['category']=='commands') != (t.get('itemKind')=='Magic')):continue
   route=chest_routes[chest_id(t)]
   append(e,'Chest: '+t['character']+' · '+t['world']+' · '+t['area']+' #'+str(t['number'])+(' ('+t['note']+')' if t['note'] else '')+'. '+route['directions']);sources(e,t['source'],*route['sources'])
  for stock in facts['shopStock']:
   if slug(stock['name'])!=slug(name):continue
   if name=='Balloon' and ((e['category']=='commands') != (stock.get('kind')=='Magic')):continue
   append(e,stock['shop']+': '+str(stock['price'])+(' munny; Bargain Flurry '+str(stock['bargainPrice']) if stock['shop']=='Moogle Shop' else ' medals')+'; '+('Bargain Flurry only; ' if '(B)' in stock['level'] else '')+'stock level '+stock['level'].replace(' (B)','')+'.');sources(e,stock['source'])
 for e in [x for x in entries if x['category'] in ['commands','materials']]:
  acquisition_joins(e,e['name'])
  if e['category']=='commands':
   f=next(x for x in facts['commands'] if x['name']==e['name'])
   for route in command_routes(f):
    match=re.search(r'(?:[Ss]hop|Moogle Shop) for (\d+) munny',route)
    if not match:continue
    bargain=route[match.end():].startswith(' during Bargain Flurry')
    stocks=[x for x in facts['shopStock'] if x['shop']=='Moogle Shop' and x['name']==e['name'] and (e['name']!='Balloon' or x['kind']=='Magic')]
    prices={x['bargainPrice' if bargain else 'price'] for x in stocks}
    if prices and int(match[1]) not in prices:e['uncertainty']=e.get('uncertainty','')+' Source price conflict: individual command page '+match[1]+' munny; shop table '+', '.join(map(str,sorted(prices)))+' munny. Neither is certified for Steam.'
 # Rare drop locations never inherit normal-form worlds.
 for e in [x for x in entries if x['category']=='materials']:
  e['drops']=[d for d in e.get('drops',[]) if '(Rare Nightmare)' not in d['enemy']]
  for s in spirits:
   m=re.search(re.escape(e['name'])+r' \((\d+)%\)',s['rareDrops'])
   if m:
    e['drops'].append({'enemy':s['name']+' (Rare Nightmare)','rate':m[1]+'%','location':re.sub(r'<br\s*/?>',', ',s['rareWorlds']) if s['rareWorlds'] else 'Rare-form location absent in source','details':'Rare-form source field; Special Portal forecast controls availability. Normal-form worlds are not substituted.'})
  sources(e,*[p['source'] for p in worlds['portals'] if e['name'] in p['reward']])
  e['uncertainty']='Finite chests, extracted shop stock and distinct normal/rare/portal routes are included. Exact ordinary encounter rooms and expiration yields are absent in the consulted tables.'
 for m in facts['materials']:
  e=record('materials',m['name']);sources(e,m['source'])
  for method in m['otherMethods']:append(e,'Other source: '+method+'.')
  e['uncertainty']='Finite chests, extracted shop stock, distinct normal/rare/portal drops and reported expiration sources are included. Exact ordinary encounter rooms and expiration quantities are not fully specified.'
 # Recipe items are independent ownership goals; formulas are not ownership.
 hdprices={'Frootz Cat':(7,500),'Kab Kannon':(7,500),'R & R Seal':(2,200),'Beatalike':(8,1000),'Tubguin Ace':(2,200)}
 for f in facts['recipeItems']:
  e=add('recipe-items',f['name'],'Recipe-item ownership for '+f['breed']+'.',instructions=' '.join(f['routes'])+'. The formula can be used without owning this item.',sources=[f['source']]);acquisition_joins(e,f['name'])
  if f['breed'] in hdprices:
   level,price=hdprices[f['breed']];append(e,'HD Moogle Shop: LV '+str(level)+', '+str(price)+' munny ('+str(int(price*.8))+' during Bargain Flurry).');sources(e,wiki('Talk:Recipe'),'https://www.playstationtrophies.org/forum/topic/284269-comprehensive-reports-and-collection-guide/')
 # Preserve special IDs, and collapse repeated built-in configurations to a single physical portal identity.
 def portaltext(p):return 'Forecast configuration '+str(p['number'])+': '+p['forecast']+'. Unlock: '+p['unlock']+'.'+(' Bonus: '+p['objective']+' Reward: '+p['objectiveReward']+'.' if p['objective'] else '')
 for p in worlds['portals']:
  e=record('portals',p['character']+' — '+p['world']+' Special Portal '+str(p['number']));e['instructions']=portaltext(p)+' Rare enemies: '+p['nightmare']+'. Only one Special Portal per world is active each Drop. Clear all 39 for this character to earn End of Pain.';e['prerequisites']=p['unlock'];e['uncertainty']='Area is sourced; exact approach landmarks and first-clear versus repeat item delivery are not fully specified.'
 groups=collections.defaultdict(list)
 for p in worlds['builtInPortalConfigurations']:groups[(p['world'],p['character'],p['type'],p['sourceNumber'])].append(p)
 for (world,char,typ,num),ps in groups.items():
  p=ps[0];add('portals',char+' — '+world+' '+typ+' Portal '+num,p['area'],character=char,world=world,area=p['area'],reward=p['reward'] or 'Temporary borrowed Spirits' if typ=='Friend' else p['reward'],instructions=' '.join(portaltext(p) for p in ps),uncertainty='Source built-in portal number; exact approach landmark is not specified.',sources=[p['source']])
 objectives=sorted({p['objective'] for p in worlds['portals']+worlds['builtInPortalConfigurations'] if p['objective']})
 # Time-limit variants belong to one bonus type, not separate achievement requirements.
 record('achievements','Brave Challengers')['instructions']='Complete these seven bonus types: timed victory; victory without deck commands; three Flowmotion attacks; three blocks; three counters; ten attacks while linked; no more than two hits taken. Thresholds for the timed type vary by portal.'
 # Formula probabilities are only filled for the 54 marked recipe-item combinations, per the explicit mechanics rule.
 events=collections.defaultdict(list)
 for s in spirits:
  for i,f in enumerate(s['formulas']):events[tuple(sorted((n,q) for n,q in f['ingredients']))].append((s['name'],f))
 for r in recipes:
  s=next(x for x in spirits if x['name']==r['group']);key=tuple(sorted((i['id'].removeprefix('dddhd:materials:'),i['quantity']) for i in r['ingredients']))
  f=next(f for f in s['formulas'] if tuple(sorted((slug(n),q) for n,q in f['ingredients']))==key)
  if f['recipeItemFormula']:r['instructions']=r['instructions'].replace('Success probability is not explicitly recorded.','Success: 100% for the marked recipe-item formula (Spirit mechanics rule).')
  peers=events[tuple(sorted((n,q) for n,q in f['ingredients']))]
  if len(peers)>1:r['instructions']+=' Shared ingredient event: '+', '.join(n+' base '+f2['rank']+(' '+f2['probability'] if f2['probability'] else ' probability unreported') for n,f2 in peers)+'.'
  r['sources']=[s['source'],wiki('Spirit'),wiki('Template:SynthKH3D')]
 for name,text in [('Ribbit Reaper','Defeating either the roaming boss or an ordinary Lord Kyroo enemy qualifies.'),('Keyblade Conqueror','Obtain every eligible Keyblade on both characters, including both copies of shared types.'),('Dream Pleaser','Raise every available Spirit breed to maximum affinity. Sources do not establish whether released or NG+ instances retain every partial award flag.'),('Daring Diver','Exceed 7,500,000 total Dive points. The source description does not specify whether repeat-run totals or retained course bests supply the counter.')]:
  record('awards',name)['instructions']=text
 # Full manifest: 69 collection entries minus the independently matched 15 0.2 goals.
 for a in json.loads((folder/'platform-facts.json').read_text())['achievements']:
  ident='dddhd:achievements:'+slug(a['name'])
  e=index.get(ident) or add('achievements',a['name'],a['requirement'],sources=[a['source']])
  e['summary']=a['requirement'];sources(e,a['source']);e.pop('uncertainty',None)
 # Apply achievement semantics after the manifest refresh.
 e=record('achievements','Ability Ace');e['instructions']='Proud or Critical: unlock every useful stack of Support and Spirit abilities, enable all of them including EXP Zero, then leave the menu. Stat abilities are excluded.';sources(e,'https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497','https://www.playstationtrophies.org/game/kingdom-hearts-dream-drop-distance/trophy/165903-ability-ace.html')
 for e in [x for x in entries if x['category']=='dives']:
  if e['world']=='The Grid':e['reward']='Candy Goggles';sources(e,wiki('Game:The_Grid'))
  e['instructions']+=' The world A-rank prize is awarded once, when either character first earns A. Divewing still requires all seven A ranks separately for each character.';e.pop('uncertainty',None)
 for cup in facts['cups']:
  e=next(x for x in entries if x['category']=='challenges' and slug(x['name']).replace('beginners','beginner')==slug(cup['name']).replace('beginners','beginner'))
  append(e,'Match roster: '+'; '.join(str(m['round'])+' '+str(m['team'])+': '+m['opponents'] for m in cup['matches'])+'. Defend with a higher card total to evolve the first card; evolved value doubles. Switch Spirits to let the reserve reload.');sources(e,cup['source']);e['uncertainty']='All match lineups are extracted. Per-round medal cells are blank for some cups; exact HD input bindings are not specified by the 3DS-oriented mechanics source.'
 # Keep the fully published scoring tables separate from unreported Medal payouts.
 scoring=followup['flickRushScoring']
 for cup in facts['cups']:
  e=next(x for x in entries if x['category']=='challenges' and slug(x['name']).replace('beginners','beginner')==slug(cup['name']).replace('beginners','beginner'))
  group=next((g for g in scoring['timeGroups'] if cup['name'] in g['cups']),None)
  def mmss(seconds):return str(seconds//60)+':'+str(seconds%60).zfill(2)
  if group:
   lower=0;times=[]
   for points,upper in group['maximumSecondsByPoints']:
    times.append(mmss(lower)+'–'+mmss(upper)+' = '+str(points));lower=upper+1
   times.append(mmss(group['onePointFromSeconds'])+' or longer = 1; defeat = 0')
   append(e,'Published match-time scoring: '+', '.join(times)+'.')
  else:append(e,'The published time-score table does not assign Speed Cup to a time group.')
  for label,key in [('Remaining HP','remainingHpMinimumPercentByPoints'),('Successful attacks','successfulAttackMinimumPercentByPoints')]:
   append(e,label+' scoring (use the highest matching threshold): '+', '.join(str(percent)+'% or more = '+str(points) for points,percent in scoring[key])+'.')
  append(e,'Blocks score one point each, capped at 5. Add time, HP, successful attacks and blocks: S at 30+, A at 23–29, B at 16–22, C at 15 or below.')
  prizes=scoring['cupPrizeThresholdsByRounds'][str(len(cup['matches']))]
  append(e,'Cup prize scoring: S = 4, A = 3, B = 2, C = 1 point per round; sum the round points. Bronze '+str(prizes['bronze'])+'+, Silver '+str(prizes['silver'])+'+, Gold '+str(prizes['gold'])+'+. These points are not spendable Medals.')
  sources(e,scoring['source']);e['uncertainty']+=' '+scoring['editionBoundary']
 e=record('achievements','Flick Rush Fever')
 append(e,'Published Rush LV progression: start at 1; gain one level for the first win of each of the ten cups, lifetime medal totals of 300, 700, 3000 and 5000, totals of 5 and 10 Silver/Gold prizes, and totals of 3, 5 and 10 Gold prizes. These 19 milestones reach LV20. Current medal wallet and lifetime earnings are different values.')
 sources(e,scoring['source']);e['uncertainty']='Exact HD progression thresholds are not independently verified; published Rush LV and prize rules are provided as a mechanics reference.'
 for correction in followup['cupAccessCorrections']:
  e=record('challenges',correction['name']);e['prerequisites']=correction['replacement'];sources(e,*correction['sources'])
 for e in [record('keyblades','Sweet Dreams'),record('challenges','Secret Cup')]:
  reward=followup['sweetDreams'];append(e,reward['instructions']);sources(e,*reward['sources'])
  e['uncertainty']=(e.get('uncertainty','')+' '+reward['uncertainty']).strip()
 # Full Link pair reference, including wildcard precedence. Nightmare Clash is a story-only link.
 for link in facts['links']:add('links',link['name'],link['kind'],instructions='Providers / pair rules: '+link['providersOrPairs']+'. '+('Story-only Armored Ventus Nightmare encounter; this is not an ordinary Spirit-pair result.' if link['name']=='Nightmare Clash' else 'Link Gauge must be full for each participating active Spirit.'),checkable=False,collectible=False,sources=[link['source']],uncertainty='Pair facts are sourced; duration and HD controller inputs are not fully documented.')
 for link in facts['links']:
  e=record('links',link['name']);sources(e,link['detailSource'])
  if link['gaugeDrain']:append(e,'Link Gauge drain: '+link['gaugeDrain']+'.')
 # Fifteen researched stat rows are authoritative generator inputs.
 for line in (root/'ai_docs/games/dddhd/rewards-and-achievements.md').read_text().splitlines():
  cells=[c.strip() for c in line.strip('|').split('|')]
  if len(cells)==6 and cells[1].isdigit():append(record('keyblades',cells[0]),'Strength '+cells[1]+'; Magic '+cells[2]+'; length '+cells[3]+'; critical '+cells[4]+'; Reality Shift '+cells[5]+'.')
 record('challenges','Lord Kyroo')['instructions']='Challenge Riku’s Nave, then Sora’s Promontory, then Riku’s Moonlight Wood; the sequence loops. After 70 seconds he escapes and retains remaining HP. Leaving the room mid-battle resets that attempt. Skipping Nave allows Riku to meet him at Moonlight Wood. The character delivering the final blow alone receives the HP bonus.'
 record('challenges','Lord Kyroo')['uncertainty']='Source documents timeout and room-exit behavior; persistence across save reloads is not separately documented.'
 for name in ['Julius — Sora','Julius — Riku']:
  append(record('challenges',name),'Enter Fountain Plaza after loading clear data to trigger the fight. Use Balloon spells and Curaga; Sora can use Superglide and Riku Dark Roll to evade. Defeat him separately for each character’s Ultima Weapon.')
 record('awards','Stat Builder')['instructions']='Activate HP Boost ×5, Attack Boost ×3, Magic Boost ×3 and Defense Boost ×3 together using the equipped Spirit party, then leave and reopen the menu. Other Stat abilities are not part of this award.'
 sources(record('awards','Stat Builder'),'https://gamefaqs.gamespot.com/ps4/181154-kingdom-hearts-hd-28-final-chapter-prologue/faqs/77497')
 # Shop toys are reference acquisitions, not invented completion counters.
 toy_names={s['name'] for s in facts['shopStock'] if any(t in s['name'] for t in ['Candy','Cookie','Chocolate','Cone','Cake','Paint Gun']) or s['name'] in ['Balloon','Water Barrel']}
 for name in sorted(toy_names-{'Dream Candy'}):
  e=add('training',name,'Training item acquisition.',checkable=False,collectible=False,sources=[wiki('Moogle_Shop'),wiki('Training_Toy')]);acquisition_joins(e,name)
 e=add('training','Candy Goggles','HD training toy; replaces Treasure Goggles.',instructions='Awards affinity and LP. Obtain from HD treasure chests, Nightmare drops and portal bonus rewards; it is not sold in the Moogle Shop.',checkable=False,collectible=False,sources=[wiki('Candy_Goggles')]);acquisition_joins(e,'Candy Goggles')
 for fact in json.loads((folder/'mechanics-facts.json').read_text()):
  e=add('reference',fact['name'],fact['summary'],instructions=fact['instructions'],sources=fact['sources'],checkable=False,collectible=False)
  if fact.get('uncertainty'):e['uncertainty']=fact['uncertainty']
 for r in recipes:append(r,'Extra-material rank thresholds and command donation rules are described in the Spirit creation reference.')
 # Player-goal review: retain unresolved facts, but expose usable alternatives.
 practical=json.loads((root/'ai_docs/games/dddhd/practical-facts-2026-10-02.json').read_text())
 for fact in practical['newReferences']:
  add('reference',fact['name'],fact['summary'],instructions=fact['instructions'],sources=fact['sources'],checkable=False,collectible=False)
 for route in practical['portalLandmarks']:
  e=index[route['id']]
  assert (e['character'],e['world'],e['area'])==(route['character'],route['world'],route['expectedArea']), 'Reconcile portal identity before applying landmark'
  append(e,'HD guide landmark: '+route['landmark']+'. Use the expanded mini-map to find the active portal.');sources(e,route['source'])
  e['uncertainty']='Area and HD guide landmark are sourced; exhaustive walking routes and every first-clear versus repeat item transition are not established.'
  for material in [x for x in entries if x['category']=='materials']:
   for drop in material.get('drops',[]):
    if drop['enemy']==route['character']+' Special Portal '+str(route['number']) and drop['location'].startswith(route['world']+' · '):
     drop['details']+=' HD guide landmark: '+route['landmark']+'.';sources(material,route['source'])
 for patch in practical['entryPatches']:
  assert patch['id'] in index, patch['id']
  append(index[patch['id']],patch['appendInstructions']);sources(index[patch['id']],*patch['sources'])
 for e in [x for x in entries if x['category']=='links']:
  append(e,'Use the configured on-screen action prompts on Steam; the gauge shows the remaining Link time. The listed pair and gauge requirements do not depend on a fixed keyboard binding.')
 for e in entries:
  if e.get('uncertainty')=='':e.pop('uncertainty',None)
 return entries,recipes
