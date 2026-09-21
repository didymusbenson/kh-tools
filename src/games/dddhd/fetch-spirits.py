"""Extract factual formula/drop fields from breed pages; retain no guide prose."""
import concurrent.futures,urllib.request,urllib.parse,re,json,pathlib
folder=pathlib.Path(__file__).parent
names=[x['name'] for x in json.loads((folder/'content.json').read_text())['entries'] if x['category']=='spirits']
def fetch(name):
 url='https://www.khwiki.com/'+urllib.parse.quote(name.replace(' ','_'),safe='')
 raw=urllib.request.urlopen(url+'?action=raw').read().decode()
 formulas=re.findall(r'{{SynthKH3D\s*\n(.*?)\n}}',raw,re.S)
 if not formulas:return {'name':name,'source':url,'formulas':[]}
 fields=dict(re.findall(r'\|([A-Za-z]+\d*)=([^|\n]+)',formulas[-1]))
 out=[]
 for i in range(1,10):
  if 'rank'+str(i) not in fields:continue
  n=str(i);out.append({'rank':fields['rank'+n], 'ingredients':[[fields['mat'+n+'1'],int(fields['qty'+n+'1'])],[fields['mat'+n+'2'],int(fields['qty'+n+'2'])]],'probability':fields.get('success'+n),'alternate':fields.get('chance'+n)})
 basic=dict(re.findall(r'\|\s*(DDD[A-Za-z0-9]+)=([^\n]+)',raw))
 return {'name':name,'source':url,'formulas':out,'normalDrops':basic.get('DDDNrewards',''),'rareDrops':basic.get('DDDRrewards',''),'worlds':basic.get('DDDNworlds',''),'link':basic.get('DDDlink',''),'attribute':basic.get('DDDatt',''),'style':basic.get('DDDstyle','')}
results=list(concurrent.futures.ThreadPoolExecutor(max_workers=6).map(fetch,names))
assert all(r['formulas'] for r in results),[r['name'] for r in results if not r['formulas']]
(folder/'spirit-facts.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print(len(results),'breeds;',sum(len(r['formulas']) for r in results),'formulas')
