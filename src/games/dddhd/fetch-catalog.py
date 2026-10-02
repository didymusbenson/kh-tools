"""Extract factual catalogs from complete source tables, with source bounds kept explicit."""
import json,re,pathlib,importlib.util,html,collections
folder=pathlib.Path(__file__).parent
spec=importlib.util.spec_from_file_location('source_utils',folder/'source-utils.py');u=importlib.util.module_from_spec(spec);spec.loader.exec_module(u)
def section(raw,title):
 m=re.search(r'^(={2,4})'+re.escape(title)+r'\1\s*$',raw,re.M)
 if not m:return ''
 rest=raw[m.end():];end=re.search(r'^={2,'+str(len(m[1]))+r'}[^=].*?=+\s*$',rest,re.M)
 return rest[:end.start()] if end else rest

def game_parts(raw):
 return re.findall(r"={3,4}''Kingdom Hearts (?:3D: Dream Drop Distance|Dream Drop Distance HD)''={3,4}(.*?)(?=\n={2,4}[^=]|\Z)",raw,re.S)
commands=[]
raw=u.fetch('Deck Command (KH3D)');kind=''
for block in raw.split('\n|-'):
 headers=re.findall(r'{{a\|([^}]+) commands}}',block)
 if headers:kind=headers[-1].title()
 m=re.search(r"\|{{nihongo\|'''(?:\[\[([^\]|]+)(?:\|([^\]]+))?\]\]|\{\{c\|([^|]+)\|([^}]+)\}\})'''",block)
 if not m:continue
 kind=re.findall(r'{{a\|([^}]+) commands}}',raw[:raw.index(m[0])])[-1].title()
 block=block.split('\n|}')[0]
 page=m[1] or m[3]+' ('+m[4]+')';name=m[2] or m[3] or m[1];lines=block.splitlines();content=[u.clean(l[1:]) for l in lines[1:] if l.startswith('|')];char='Both'
 flags=' '.join(l for l in lines if l.startswith('!') and ('S' in l or 'R' in l))
 flags=re.sub(r'style="[^"]*"\|','',flags)
 if 'S' in flags and 'R' not in flags:char='Sora'
 if 'R' in flags and 'S' not in flags:char='Riku'
 if re.search(r'!\s*\|\|R',flags):char='Riku'
 elif re.search(r'!S\|\|\s*$',flags):char='Sora'
 cr=u.fetch(page);learning=re.split(r'^==\s*Learning[^\n]*==\s*$',cr,flags=re.M)
 acquisitions=[]
 if len(learning)>1:
  for s in game_parts(learning[1]):
   for line in s.splitlines():
    if line.startswith('*') and re.search(r'(?<![A-Za-z])'+re.escape(name)+r'(?![A-Za-z])',u.clean(line)) and re.search(r'(Sora|Riku)',u.clean(line)) and not any(x in line for x in ['Streetpass','StreetPass','AR Card']):acquisitions.append(u.clean(line[1:]))
 # Select only the named player's DDD/HD technique, never another game's reload.
 mechanics_scope=section(cr,'Mechanics') or section(cr,'Mechanic')
 scoped=game_parts(mechanics_scope)
 if not scoped:
  scoped=re.findall(r"In ''(?:\[\[)?Kingdom Hearts (?:3D: Dream Drop Distance|Dream Drop Distance HD)(?:\]\])?'',(.*?)(?=\nIn ''(?:\[\[)?Kingdom Hearts|\n={2,4}|\Z)",mechanics_scope,re.S)
 reloads=set();evidence=[]
 for part in scoped:
  for line in part.splitlines():
   text=u.clean(line.lstrip('*'))
   # A shared Fire/Cure/etc. article supplies one explicitly named bullet per tier.
   if line.startswith('*') and not re.match(re.escape(name)+r'\b',text):continue
   if not re.search(r'(?<![A-Za-z])'+re.escape(name)+r'(?![A-Za-z])',text):continue
   match=re.search(r'reload (?:time|speed) of (\d+(?:\.\d+)?) seconds',text)
   if match:reloads.add(float(match[1]));evidence.append('DDD/HD Mechanics: '+name)
 for template_name in ['InfoAbility','InfoMagic']:
  info=u.params(u.template(cr,template_name))
  for key,value in info.items():
   matched=re.fullmatch(r'dddname(\d*)',key)
   if not matched or value!=name:continue
   reload_field='dddreload'+matched[1];value=info.get(reload_field,'')
   if re.fullmatch(r'\d+(?:\.\d+)?',value):
    reloads.add(float(value));evidence.append(template_name+'.'+reload_field+' for '+key+'='+name)
 reload_seconds=next(iter(reloads)) if len(reloads)==1 else None
 if reload_seconds is not None and reload_seconds.is_integer():reload_seconds=int(reload_seconds)
 mech=['Reload: '+str(reload_seconds)+' seconds'] if reload_seconds is not None else []
 commands.append({'name':name,'kind':kind,'character':char,'slotsOrUses':content[1] if kind in ['Attack','Magic','Item'] and content else None,'element':content[2] if kind in ['Attack','Magic'] and len(content)>2 else None,'mechanics':mech,'reloadSeconds':reload_seconds,'reloadEvidence':evidence,'reloadCandidates':sorted(reloads),'reloadApplicability':'deck command' if kind in ['Attack','Magic'] else 'not a recharging Attack/Magic deck command','acquisitions':acquisitions,'source':u.source(page)})
assert len(commands)==124,len(commands)
raw=section(u.fetch('Moogle Shop'),"''Kingdom Hearts 3D: Dream Drop Distance''")
shop='Moogle Shop';stock=[]
for line in raw.splitlines():
 if '{{tab|Medal Shop}}' in line:shop='Medal Shop'
 if not line.startswith('| ') or '||' not in line:continue
 cells=line.strip('| ').split('||')
 if len(cells)!=3:continue
 name=u.clean(cells[0]);price=u.clean(cells[1]);level=u.clean(cells[2])
 if not price.isdigit():continue
 stock.append({'name':name,'kind':(re.search(r'Icon (.*?) KH3D',cells[0])[1] if re.search(r'Icon (.*?) KH3D',cells[0]) else None),'shop':shop,'price':int(price),'level':level,'bargainPrice':int(int(price)*.8) if shop=='Moogle Shop' else None,'source':u.source('Moogle Shop')})
recipes=[]
for line in section(u.fetch('Recipe'),"''Kingdom Hearts 3D: Dream Drop Distance''").splitlines():
 if not line.startswith('|{{nihongo') or '||' not in line:continue
 cells=line.split('||')
 if len(cells)!=5:continue
 name=u.clean(cells[1]).lstrip('|');routes=[u.clean(x) for x in re.split(r'<br\s*/?>',cells[4]) if 'Streetpass' not in x and 'StreetPass' not in x]
 recipes.append({'name':name+' Recipe','breed':name,'routes':routes,'source':u.source('Recipe'),'sourceQuestion': '{{?}}' in cells[4]})
assert len(recipes)==54,len(recipes)
links=[]
for heading,kind in [('Link Attack','Single attack'),('Link Style','Single style')]:
 sec=section(u.fetch('Link System'),heading);subkind=kind
 for block in sec.split('\n|-'):
  nextkind='Dual attack' if '===Dual Attack===' in block else ('Dual style' if '===Dual Style===' in block else subkind)
  m=re.search(r"\|{{nihongo\|'''(.*?)'''",block)
  if not m:continue
  lines=[x[1:] for x in block.splitlines() if x.startswith('|') and not x.startswith('|}')]
  if len(lines)<3:continue
  links.append({'name':u.clean(m[1]),'kind':subkind,'providersOrPairs':u.clean(lines[2]),'source':u.source('Link System')})
  subkind=nextkind
cups=[]
for name in ['Training Cup',"Beginner's Cup",'Rainbow Cup','Digital Cup','Tin Pin Cup','Speed Cup','Yummy Cup','Final Cup','Horror Cup','Secret Cup']:
 fields=u.params(u.template(u.fetch(name),'Flick'));matches=[]
 for i in range(1,int(fields['rounds'])+1):
  n=str(i);matches.append({'round':i,'team':fields.get('team'+n),'opponents':u.clean(fields.get('enem'+n,'')),'medals':fields.get('medals'+n) or (fields.get('reward') if fields['rounds']=='1' else None)})
 cups.append({'name':name,'unlock':u.clean(fields['unlock']),'matches':matches,'source':u.source(name)})
# Known parameter rows are structured as factual command bonuses, not guide prose.
bonuses=[];sec=section(u.fetch('Spirit'),'Creating Spirits').split('===Deck Command bonuses===')[1]
for block in sec.split('\n|-'):
 lines=[u.clean(l[1:]) for l in block.splitlines() if l.startswith('|') and not l.startswith('|}')]
 if len(lines)==12 and lines[0]:bonuses.append({'command':lines[0],'affinity':lines[1],**dict(zip(['hp','strength','magic','defense','fire','blizzard','thunder','water','dark','light'],lines[2:]))})
abilities=[]
for b in u.fetch('Abilities (KH3D)').split('\n|-'):
 m=re.search(r"\|{{nihongo\|'''(.*?)'''",b)
 if not m:continue
 v=next((l[1:] for l in b.splitlines() if re.fullmatch(r'\|\d+',l)),None)
 if v:abilities.append(dict(name=u.clean(m[1]),maximumStack=int(v),source=u.source('Abilities (KH3D)')))
assert len(abilities)==43
for l in links:
 raw=u.fetch(l['name']);params=u.params(u.template(raw,'InfoAbility'));l['detailSource']=u.source(l['name'])
 l['gaugeDrain']=u.clean(params.get('dddgauge','')) or None
 l['sourceControlTokens']=sorted(set(re.findall(r'{{button\|([^}]+)}}',raw)))
 l['explicitHDControls']=bool(re.search(r'HD[^\n]*{{button|{{button[^\n]*HD',raw))
materials=[]
material_names=sorted({n for spirit in json.loads((folder/'spirit-facts.json').read_text()) for f in spirit['formulas'] for n,q in f['ingredients']})
for name in material_names:
 raw=u.fetch(name.split()[0]);params=u.params(u.template(raw,'InfoItem'));other=[]
 for line in raw.splitlines():
  if not line.startswith("*'''"+name+"''':"):continue
  for clause in line.split(':',1)[1].split(';'):
   if not any(x in clause for x in ['{{KH3D}}','Streetpass','StreetPass','Treasure Goggles']) and re.search(r'(?i)(obtained|expired|tutorial)',clause):other.append(u.clean(clause))
 materials.append({'name':name,'otherMethods':other,'source':u.source(name.split()[0])})
result={'materials':materials,'abilities':abilities,'commands':commands,'recipeItems':recipes,'shopStock':stock,'links':links,'cups':cups,'commandCreationBonuses':bonuses}
folder.joinpath('catalog-facts.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print({k:len(v) for k,v in result.items()},'matches',sum(len(c['matches']) for c in cups),'command acquisition coverage',sum(bool(c['acquisitions']) for c in commands))
