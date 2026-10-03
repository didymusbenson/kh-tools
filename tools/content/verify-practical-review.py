"""Validate practical-review accounting separately from game factual truth.

Run after updating the shared review register from per-game ledgers. This checks
complete scope, honest decision fields and excluded game identity preservation.
It does not prove that a route is sufficient or a source claim is correct.
"""
import argparse,collections,json,subprocess,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
REGISTER=ROOT/'ai_docs/research/non-com-practical-review-2026-10-02.json'
GAMES={'kh2fm':40,'bbsfm':38,'dddhd':25,'kh02':18,'kh3':35}
register=json.loads(REGISTER.read_text())
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('output',nargs='?')
parser.add_argument('--excluded-baseline',default=register['baselineCommit'],help='Commit containing the independently authorized KH1/CoM state to preserve; defaults to the original non-CoM baseline.')
args=parser.parse_args()
records=register['records'];assert len(records)==156
assert len({r['id'] for r in records})==156
assert sum(r['baselineEvidenceStatus'] in ['partial','unresolved/conflicted'] for r in records)==65
errors=[];ledger_rows={}
for game,total in GAMES.items():
 p=next((ROOT/'ai_docs/games'/game).glob('*dispositions*.json'))
 rows=json.loads(p.read_text())['findings'];assert len(rows)==total
 ledger_rows.update({r['id']:r for r in rows})
for row in records:
 current=ledger_rows[row['id']];decision=current.get('researchDisposition')
 if row['decision']!=decision:errors.append(f"{row['id']}: shared/per-game practical decision differs")
 if decision not in ['resolved','deferred','open','other-limitation']:errors.append(f"{row['id']}: unknown practical decision")
 if decision in ['deferred','open']:
  for field in ['playerGoal','sufficientGuidance','deferralReason','reopenWhen']:
   if not current.get(field):errors.append(f"{row['id']}: missing {field}")
 if decision=='deferred' and not current.get('deferredDetails'):errors.append(f"{row['id']}: no exact deferred precision")
 report=current.get('practicalReviewReport','').split('#')[0]
 if not report or not (ROOT/'ai_docs/games'/row['game']/report).exists():errors.append(f"{row['id']}: missing report")
counts=dict(collections.Counter(r['decision'] for r in records))
if register.get('practicalCounts')!=counts:errors.append('shared counts mismatch')
# These scoped games/artifacts may not be changed by this non-CoM pass.
excluded=['src/games/kh1fm','ai_docs/games/kh1fm','ai_docs/games/recom','src/games/recom','data/kh1fm','public/data/kh1fm.json','artifacts/copperminds']
changed=subprocess.check_output(['git','diff','--name-only',args.excluded_baseline,'--',*excluded],cwd=ROOT,text=True).splitlines()
if changed:errors.append('excluded paths changed: '+', '.join(changed))
workstream_path='ai_docs/research/research-workstreams-2026-10-02.json'
base_workstreams=json.loads(subprocess.check_output(['git','show',args.excluded_baseline+':'+workstream_path],cwd=ROOT,text=True))
current_workstreams=json.loads((ROOT/workstream_path).read_text())
for game in ['kh1fm','recom']:
 if [r for r in base_workstreams['records'] if r['game']==game]!=[r for r in current_workstreams['records'] if r['game']==game]:errors.append(game+': excluded shared-register records changed')
report={'scope':'156 families; 65 starting residuals; practical disposition consistency only','counts':counts,'errors':errors,'passed':not errors}
if args.output:Path(args.output).write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2));sys.exit(bool(errors))
