"""Refresh all 54 HD breeds, preserving board topology, gates, form worlds and recipe markers."""
import concurrent.futures,re,json,pathlib,importlib.util,hashlib
folder=pathlib.Path(__file__).parent
spec=importlib.util.spec_from_file_location('source_utils',folder/'source-utils.py');u=importlib.util.module_from_spec(spec);spec.loader.exec_module(u)
names=[x['name'] for x in json.loads((folder/'spirit-facts.json').read_text())]
def fetch(name):
 raw=u.fetch(name); all_formulas=list(re.finditer(r'{{SynthKH3D\s*\n(.*?)\n}}',raw,re.S))
 selected=[]
 for match in all_formulas:
  headings=re.findall(r'^===([^\n]+)===$',raw[:match.start()],re.M)
  if headings and 'Dream Drop Distance HD' in headings[-1]:selected.append(match)
 if not selected:
  assert len(all_formulas)==1, (name,'Multiple unqualified formula tables')
  selected=all_formulas
 assert len(selected)==1,name
 formula=selected[0];selection='Explicit HD section' if len(all_formulas)>1 else 'Shared DDD/DHD source table'
 fields=dict(re.findall(r'\|([A-Za-z]+\d*)=([^|\n]+)',formula[1]));out=[]
 for i in range(1,10):
  n=str(i)
  if 'rank'+n not in fields:continue
  out.append({'rank':fields['rank'+n],'ingredients':[[fields['mat'+n+'1'],int(fields['qty'+n+'1'])],[fields['mat'+n+'2'],int(fields['qty'+n+'2'])]],'probability':fields.get('success'+n),'alternate':fields.get('chance'+n),'recipeItemFormula':fields.get('recipe'+n)=='*'})
 basic=u.params(u.template(raw,'Character'));board=u.params(u.template(raw,'AbilityLink'))
 refs={}
 for attrs,text in re.findall(r'<ref\b([^>\n]*?)(?<!/)>((?:(?!<ref).)*?)</ref>',raw,re.S):
  key=re.search(r'name=["\']?([^\s"\'>/]+)',attrs)
  if key:refs[key[1]]=u.clean(text)
 nodes=[]
 for coord in dict.fromkeys(re.findall(r'\|([A-H]\d+)(?:name|background|image)=',u.template(raw,'AbilityLink'))):
  text=board.get(coord+'name','');image=board.get(coord+'image','');bg=board.get(coord+'background','');conditions=[]
  for ref in re.findall(r'<ref\b[^>]*?(?<!/)>(.*?)</ref>',text,re.S):conditions.append(u.clean(ref))
  for ref in re.findall(r'<ref\b[^>]*name=["\']?([^\s"\'>/]+)["\']?[^>]*/>',text):
   if ref in refs:conditions.append(refs[ref])
  m=re.search(r'\(([^)]+)\)',bg.replace('_',' '));directions=m[1].split('+') if m else []
  # The source Base SVG is a four-way cross (File:Ability_Link_(Base).svg).
  if directions==['Base']:directions=['Up','Down','Left','Right']
  nodes.append({'coordinate':coord[0]+'-'+coord[1:],'name':u.clean(text) or ('Start' if 'Start' in image else 'Path'),'kind':u.clean(board.get(coord+'type','')) or ('start' if 'Start' in image else 'path'),'cost':u.clean(board.get(coord+'lp','')),'conditions':list(dict.fromkeys(conditions)),'directions':[d for d in directions if d in ['Up','Down','Left','Right']]})
 edges,mismatch=u.ability_edges(nodes)
 dispositions=[]
 for i,a in enumerate('abcd',1):
  interactions=[]
  for j,b in enumerate('abcd',1):
   if a==b:continue
   body=basic.get('DDDdisp'+a+b,'')
   interactions.append({'to':basic.get('DDDdisp'+str(j),''),'action':'rub' if j in [2,4] else 'poke','bodyPart':u.clean(body) or None})
  dispositions.append({'name':basic.get('DDDdisp'+str(i),''),'interactions':interactions})
 return {'name':name,'source':u.source(name),'sourceSha256':hashlib.sha256(raw.encode()).hexdigest(),'formulaSelection':selection,'formulas':out,'normalDrops':basic.get('DDDNrewards',''),'rareDrops':basic.get('DDDRrewards',''),'worlds':basic.get('DDDNworlds',''),'rareWorlds':basic.get('DDDRworlds',''),'nightmareForm':'DDDNrewards' in basic,'rareNightmareForm':'DDDRrewards' in basic,'link':basic.get('DDDlink',''),'attribute':basic.get('DDDatt',''),'style':basic.get('DDDstyle',''),'baseStats':{k:basic.get('DDDS'+v) for k,v in [('hp','HP'),('strength','STR'),('magic','MAG'),('defense','DEF'),('expModifier','EXP')]},'dispositions':dispositions,'board':{'nodes':nodes,'edges':edges,'unmatchedSourceDirections':mismatch}}
results=list(concurrent.futures.ThreadPoolExecutor(max_workers=6).map(fetch,names))
assert len(results)==54 and all(r['formulas'] and r['board']['nodes'] for r in results)
(folder/'spirit-facts.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print(len(results),'breeds;',sum(len(r['formulas']) for r in results),'formulas;',sum(len(r['board']['nodes']) for r in results),'board nodes;',sum(len(r['board']['unmatchedSourceDirections']) for r in results),'unmatched source paths')
