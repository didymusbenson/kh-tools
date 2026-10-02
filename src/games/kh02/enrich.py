"""Integrate version-specific mechanics and retain caveats on linked wardrobe goals."""
import json,pathlib

def enrich(entries,root):
 byid={e['id']:e for e in entries}
 for fact in json.loads((root/'mechanics-facts.json').read_text()):
  e=byid.get(fact['id'])
  if e:e.update(fact)
  else:entries.append(dict(category='reference',character='Aqua',collectible=False,checkable=False,**fact))
 # Propagate the relevant Steam combat controls to objective and reward answers.
 for n in [19,20,21,31,36]:
  e=byid['kh02:objective:'+str(n).zfill(2)]
  note='Steam/PC: Spellweaver Finish is available immediately on activation. PS4 guides requiring a second gauge fill describe that earlier version.'
  e['instructions']=(e.get('instructions','')+' '+note).strip()
  e['sources']=list(dict.fromkeys(e['sources']+['https://www.khwiki.com/Spellweaver']))
  wardrobe=next(x for x in entries if x['category']=='wardrobe' and x['order']==n)
  wardrobe['instructions']+=' '+note;wardrobe['sources']=list(e['sources'])
 # Search aliases remain discoverable on both sides of the objective/reward join.
 byid['kh02:objective:32']['instructions']='Older guide alias: Defeat the Darkness. The targets are the three path Darksides.'
 byid['kh02:wardrobe:diamond-blue']['instructions']+=' Older objective alias: Defeat the Darkness.'
 byid['kh02:wardrobe:astral-ornament']['instructions']+=' Older reward alias: Divine Back.'
