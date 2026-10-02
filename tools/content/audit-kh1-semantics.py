#!/usr/bin/env python3
"""Reviewed semantic disposition of the remaining KH1-020 comparison queue.
Not an importer: current source-backed records remain authoritative. Explicit
route correspondence and exception decisions below are explicitly reviewed inputs.
"""
import hashlib,json,re
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
cross=json.loads((ROOT/'ai_docs/games/kh1fm/legacy-value-crosswalk.json').read_text())
entries={e['id']:e for p in ['collectibles','reference'] for e in json.loads((ROOT/f'data/kh1fm/{p}.json').read_text())}
claims=[];covered=set();evidence={}
def norm(s):return re.sub('[^a-z0-9]','',str(s).lower())
def add(row,column,clause,status,reason,ids,field=None,current=None):
 key=f"{row['source']}:{column}";covered.add(key)
 for eid in ids:
  e=entries[eid]
  evidence[eid]={k:e[k] for k in ['name','world','area','instructions','reward','facts','sources'] if k in e}
 claims.append(dict(source=row['source'],column=column,clause=clause,disposition=status,reason=reason,canonicalIds=ids,canonicalField=field,current=current))
for row in cross['rows']:
 for c in row.get('fieldComparisons',[]):
  typ=c['comparison']; old=str(c['legacy']);new=str(c['current']);ids=row['canonicalIds']; field=c['canonicalField']; col=c['column']
  def emit(clause,status,reason,current=new):add(row,col,clause,status,reason,ids,field,current)
  if typ=='legacy-abbreviation-or-empty-not-equated':
   if not old:
    emit(old,'superseded','Empty legacy cell makes no positive claim and cannot mean no reward. The cited current field supplies the full reward, including shared gains.');continue
   expanded=old.replace('Hurrican Blast','Hurricane Blast').replace('Tech Plus','Tech Boost').replace('MP Up','Max MP')
   if norm(expanded) in norm(new):
    emit(old,'accept','Accept only the named stat/ability as a subset. '+('Normalize the historical spelling/name to '+expanded+'. ' if old!=expanded else '')+'Legacy abbreviation omits amount and/or shared gains; current field supplies those, not an assertion of complete equality.')
   else:emit(old,'reject','The legacy stat label disagrees with this level’s sourced shared gain; use '+new+'.')
  elif typ=='prose-or-phase-detail-not-equated':
   eid=ids[0]
   if field=='facts.Worlds':
    for world in old.replace('AtlanticaHalloween Town','Atlantica, Halloween Town').split(','):
     world=world.strip();target=world.removeprefix('The ')
     if target in [w.strip() for w in new.split(',')]:emit(world,'accept','Named world occurs in the current encounter-world list; this is a subset claim, not completeness or unconditional room availability.')
     elif eid.endswith('arch-behemoth'):emit(world,'superseded','Legacy generic Behemoth mixes variants; Hollow Bastion is not evidence for the Final Dimension Arch Behemoth record. Use the explicit modern variant and its world.')
     else:emit(world,'reject','World absent from the current Final Mix encounter list; reject this legacy location for the current entry.')
   elif field=='facts.Base rewards':
    if eid.endswith('rare-truffle'):
     for number,body in re.findall(r'Juggle (\d+) times: (.*?)(?= Juggle|$)',old):
      for item in body.split(', '):
       emit(f'Juggle {number} times: {item}','reject' if number=='10' and item=='Elixir' else 'accept','Ten juggles award only a Mystery Goo roll, not Elixir.' if number=='10' and item=='Elixir' else 'Item belongs to this exact juggle tier. Item availability is accepted; current field supplies probability, not guaranteed delivery of the whole list.')
    elif eid.endswith('white-mushroom'):
     emit('Different actions show the requested spell','accept','The sourced instructions enumerate the seven gesture/spell relationships and require three correct requests, not one.')
     for gesture,spell,items in re.findall(r'If (.*?): (\w+) \((.*?)\)',old):
      emit(f'If {gesture}: {spell}','accept','Matches the explicit gesture/spell instructions; room availability and stationary Pink Agaricus triggers remain separately qualified.',entries[eid]['instructions'])
      emit(f'{spell}: {items}','superseded','The parenthetical list must not imply all rewards on one cast. Mixed correct spells give the last-spell Shard and a Goo roll; three identical spells give Arts, a Gem roll and a Goo roll. Retain the current conditional fields.',{k:v for k,v in entries[eid]['facts'].items() if k in ['Mixed correct spells','Three identical correct spells']})
    else:
     for item in old.split(', '):
      if item=='Gale Stone':emit(item,'superseded','Historical item name is replaced by Stormy Stone for the seventh Neoshadow; do not create a distinct material or a drop from the first six.');continue
      present=re.search(r'(?<![A-Za-z])'+re.escape(item)+r'\s*\(',new) is not None
      if present:emit(item,'accept','Listed item appears in the cited reward table. Accept availability only: current defeat conditions, part/phase distinctions and probabilities control the award.')
      elif eid.endswith('arch-behemoth'):emit(item,'superseded','Generic Behemoth reward list cannot be imported into the Arch Behemoth variant. Its explicit Final Dimension reward table has Mythril Shard and Omega Arts, not this item.')
      else:emit(item,'reject','Item is absent from the sourced reward table for this enemy; legacy list is not a valid additional drop source.')
   elif field.endswith('multiplier'):
    if old=='Absorb':emit(old,'accept','Both records explicitly specify absorption, not a numeric damage multiplier.')
    elif 'damage' in new:
     emit(old,'reject','Legacy unitless 1 cannot express fixed damage. Current rule is '+new+' Do not treat fixed damage as x1.0.')
    else:
     m=re.match(r'x([0-9.]+)',new)
     if not m:raise ValueError(c)
     equal=float(old)==float(m[1])
     emit(old,'superseded' if equal else 'reject',('Matches the leading normal/pre-rescue value only; unconditional legacy multiplier is superseded by explicit phase or stationary-mushroom exception: ' if equal else 'Does not match the leading normal/pre-rescue value. A matching alternate phase, if present, does not make this an unconditional baseline: ')+new)
   elif field=='facts.Before Kairi rescue HP':emit(old,'accept','300 is the ship-body HP. Stern, cannons and mast have separate HP; the legacy scalar is not their HP.')
   elif field=='facts.Before Kairi rescue EXP':emit(old,'superseded','Zero ordinary defeat EXP omits encounter Tech Points. Retain explicit Tech award rules rather than showing a reward-free encounter: '+new)
   else:raise ValueError(c)
# Explicit one-to-one route identities: no automatic color/world-group equivalence.
trinity=['blue-01','blue-02','blue-03','blue-04','blue-05','blue-06','blue-07','blue-08','blue-10','blue-09','blue-11','blue-12','blue-14','blue-13','blue-15','blue-16','blue-17','green-01','green-02','green-03','green-04','green-05','green-06','green-07','green-08','green-09','red-01','red-03','red-02','red-04','red-05','red-06','white-01','white-02','white-03','white-04','white-05','white-06','white-07','white-08','white-09','white-10','yellow-01','yellow-02','yellow-03','yellow-04']
# Location decisions refer to the full legacy cell, then separate unsupported clauses below.
location_notes={
2:'Outdoor cafe in First District; current mark launches to the balcony chest.',3:'First District world entrance; same blue mark.',4:'Third District Lady and Tramp ramp; same mark.',5:'Merlin house interior is accepted; precise save-point landmark is not corroborated by the current main-entrance description.',6:'Small Lotus Forest alcove agrees.',7:'Lotus Forest hidden alcove and moving the boulder while large agree. Current route uses the yellow flower, lily pads and mushrooms; the claimed Queen-defeat prerequisite is not supported.',8:'Olympus is normalized to Olympus Coliseum; left statue agrees.',9:'Olympus is normalized to Olympus Coliseum; right statue agrees.',10:'Camp table agrees.',11:'Climbing Trees location agrees; reward differs in Final Mix.',12:'Bazaar location agrees.',13:'Cave waterways is a broad description of Silent Chamber; retain precise modern room.',14:'Chamber 5 agrees.',15:'Mouth debris agrees.',16:'Throat center agrees.',17:'Dungeon mark agrees. Detailed Grand Hall/Lift Stop/Waterway itinerary and Beast-wall alternative are not established by the current mark description.',18:'Castle-entrance platform wording is superseded by the precise Great Crest lower balcony reached by the lift.',19:'Accessory Shop ladder agrees; unlocks Item Workshop.',20:'Rabbit Hole agrees.',21:'Small Bizarre Room fireplace agrees.',22:'Coliseum Lobby cup-results boards agree.',23:'Treetop outside Tunnel agrees.',24:'Storage room agrees; reward differs.',25:'Mouth ship roof agrees.',26:'Reject Ship’s Hold: current green mark is Ship: Cabin and opens Captain’s Cabin access.',27:'Library room agrees; replace save-point landmark with second-floor table.',28:'First District alley boards agree.',29:'Alleyway water grate behind hotel agrees.',30:'Gizmo Shop roof agrees.',31:'Treasure Room agrees.',32:'Reject original Oogie entrance-room location for Final Mix: the mark is on the Manor Ruins arch.',33:'Reject Grand Hall: Entrance Hall upper statue reached from Library is the current mark.',34:'Secret Waterway agrees.',35:'Sideways Bizarre Room, light lamps and picture route agrees; destination mark is Lotus Forest.',36:'Coliseum Gates center agrees.',37:'Cavern of Hearts keyhole cave agrees.',38:'Cave of Wonders entrance agrees.',39:'Chamber 6 agrees.',40:'Triton’s Palace path agrees.',41:'Moonlight Hill agrees.',42:'Ship: Deck agrees.',43:'World-entrance area is Rising Falls; floating-land description is superseded by the shallow pool where Sora met Riku.',44:'Merlin exterior crates agree; reward differs.',45:'Lobby boulder agrees; mark reveals the Keyhole, which still needs sealing.',46:'Cave Hall above Dark Chamber agrees; opens Hidden Room access.',47:'Ship: Hold locked door agrees.'}
reject_reward={11:'Reject puppies 31–33: Final Mix gives Thundara-G; those puppies are in Waterfall Cavern.',12:'Accept Munny; reject Mega-Elixir: reward is Mega-Ether.',13:'Reject Thunder-G: current reward is Thundara-G.',24:'Reject Power Up: Final Mix reward is AP Up.',44:'Reject Power Up: Final Mix reward is AP Up.'}
for row in cross['rows']:
 if row['disposition']!='superseded-location-group':continue
 line=int(row['source'].split(':')[1]);eid='kh1fm-trinity-'+trinity[line-2];ids=[eid];e=entries[eid]
 status='reject' if line in [26,32,33] else 'superseded' if line in [5,7,17,18,27,43] else 'accept'
 add(row,3,row['cells'][2],status,location_notes[line],ids,'area / instructions',{'area':e.get('area'),'instructions':e.get('instructions')})
 if line in [5,7,17]:
  unresolved={5:'Near the Save Point',7:'after defeating the Queen',17:'Grand Hall → Lift Stop → blue crystal → Waterway lift; alternative Beast-breakable wall route'}[line]
  add(row,3,unresolved,'unverifiable','Current cited route establishes the mark and room, but not this additional landmark/prerequisite/itinerary. Do not import it; a room traversal or explicit source passage is missing.',ids,'instructions',e.get('instructions'))
 add(row,4,row['cells'][3],'reject' if line in reject_reward else 'accept',reject_reward.get(line,'Reward identity agrees with the current record. Normalize spelling Myhtril/Ifirit and Mega-Elixir to Mythril/Ifrit/Megalixir; broad HP/MP/Munny labels assert availability, not quantities. Entrance rewards mean access, not automatic collection or sealing.'),ids,'reward',e.get('reward'))
expected={f"{r['source']}:{c['column']}" for r in cross['rows'] for c in r.get('fieldComparisons',[]) if c['comparison'] in ['prose-or-phase-detail-not-equated','legacy-abbreviation-or-empty-not-equated']}
expected|={f"{r['source']}:{col}" for r in cross['rows'] if r['disposition']=='superseded-location-group' for col in [3,4]}
assert covered==expected,(expected-covered,covered-expected)
result={'checkedAt':'2026-10-02','scope':'Exhaustive semantic disposition of all 154 remaining bestiary prose/phase cells, all 396 abbreviated/empty level cells, and both route/reward cells of all 46 previously group-only Trinity rows. Each claim is assessed against the cited current canonical record; not a fresh Steam binary verification or a claim to validate unrelated historical prose. Accept is explicitly scoped to the clause, never whole-row equivalence. Superseded preserves context without importing ambiguous legacy claims. Unverifiable means an exact unsupported clause is quarantined, not a pending blanket comparison.','inputHashes':{p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in ['ai_docs/games/kh1fm/legacy-value-crosswalk.json','data/kh1fm/collectibles.json','data/kh1fm/reference.json']},'coveredCells':len(covered),'claimCount':len(claims),'dispositions':dict(Counter(c['disposition'] for c in claims)),'evidence':evidence,'claims':claims}
(ROOT/'ai_docs/games/kh1fm/legacy-semantic-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({k:result[k] for k in ['coveredCells','claimCount','dispositions']}))
