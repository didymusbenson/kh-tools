import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const read = name => JSON.parse(readFileSync(new URL(`../../ai_docs/games/recom/${name}.json`, import.meta.url))).records;
const entries = [];
const worlds = read('worlds');
const doors = read('door-requirements');
const sources = r => [...new Set([...(r.sources || []), r.source, r.supportingSource].filter(Boolean))];
const add = (r, extra) => entries.push({ id: r.id, name: r.name, category: 'cards', campaign: r.campaign || 'sora', summary: '', checkable: true, collectible: false, sources: sources(r), ...extra });
const note = (title, text) => ({title,text});
const rates = values => {
 const groups=new Map();
 for(const [name,value] of Object.entries(values))if(value>0)groups.set(value,[...(groups.get(value)||[]),name]);
 return [...groups].map(([value,names])=>{
  const worldNames=worlds.map(w=>w.name);
  const allWorlds=names.length===worldNames.length&&worldNames.every(w=>names.includes(w));
  const battleWorlds=worldNames.filter(w=>w!=='100 Acre Wood');
  const allBattleWorlds=names.length===battleWorlds.length&&battleWorlds.every(w=>names.includes(w));
  return `${allWorlds?'All worlds':allBattleWorlds?'All battle worlds':names.join(', ')}: ${value}%`;
 }).join(' · ');
};
const cost = r => ({cpByValue:r.cpByValue, premiumCp:r.premiumCp});
const acquisitionNotes = r => [
 ...Object.entries(r.randomSources || {}).filter(([,v])=>Object.values(v).some(n=>n>0)).map(([method,values])=>note(method==='Bounty'?'Repeat bounty chests':'Breakable scenery',rates(values)+'. Bonus cards must be unlocked first. Rates describe the eligible random pool; individual drops are not guaranteed.')),
 ...(r.shopRates ? [note('Moogle packs',rates(r.shopRates)+'. Rates are for the matching pack type after the card is unlocked; Magic Packs include summons.')] : []),
 ...(r.premiumCp ? [note('Premium cards',`Any Premium value costs ${r.premiumCp} CP. A Premium card played alone or first in a stock is spent for the battle; in the second or third stock slot it reloads normally. Hi-Potion, Mega-Potion, Mega-Ether, Elixir and Megalixir restore the appropriate spent card types.`)] : []),
];
function floorNumbers(world,campaign='sora') {
 const text=worlds.find(w=>w.name===world)?.[`${campaign}Floors`] || '';
 const numbers=(text.match(/\d+/g)||[]).map(Number);
 return numbers.length===1?numbers:numbers.length===2?Array.from({length:Math.abs(numbers[1]-numbers[0])+1},(_,i)=>Math.min(...numbers)+i):[];
}
function requirement(predicates) {
 if (!predicates.length) return 'Key to Rewards only';
 return predicates.map(p=>p.comparison==='any'?`one ${p.color} card`:p.comparison==='sum-at-least'?`${p.color==='any'?'cards':`${p.color} cards`} totaling ${p.value} or more`:`one ${p.color==='any'?'':p.color+' '}card ${p.comparison==='exact'?'of':p.comparison==='at-least'?'at least':'at most'} ${p.value}`).join(' + ');
}
function rewardDoors(world) {
 return floorNumbers(world).map(f=>{const row=doors.find(d=>d.campaign==='sora'&&d.floor===f);return note(`${f}F door`,requirement(row.rewards)+(row.rewards.length?' + Key to Rewards.':'.'));});
}
for (const r of read('attack-cards')) add(r, { id:r.id.replace('recom-','recom-sora-'), family:'attack', summary:r.acquisition, instructions:r.acquisition, stats:[['Strike',`${r.strike}×`],['Thrust',`${r.thrust}×`],['Finish',`${r.finish}×`],['Element',r.element]], ...cost(r), notes:acquisitionNotes(r) });
for (const r of read('other-cards')) add(r, { id:r.id.replace('recom-','recom-sora-'), family:r.family, summary:r.acquisition, instructions:r.acquisition, ...cost(r), stats:r.cp?[['CP',String(r.cp)]]:undefined, notes:[...acquisitionNotes(r),...(r.notes||[]),...(!r.permanentDeckInventory?[note('In battle','Pick up this card during combat; it is not permanent deck stock.')]:[])] });
for (const r of read('enemy-cards')) {
 const farm=read('enemy-card-farms').find(f=>f.enemy===r.name);
 add(r,{family:'enemy',summary:r.effect,stats:[['Ability',r.ability],['Duration',r.duration||'One use'],...(r.campaign==='sora'?[['CP',String(r.cp)]]:[])],instructions:r.acquisition,drops:farm&&r.campaign==='sora'?[{enemy:r.name,rate:`${farm.basePercent}% base${farm.boostedPercent?` · ${farm.boostedPercent}% in ${farm.boostRooms.join(', ')}`:''}`,location:farm.specialRoom||farm.worldsSourceText.replace(/\[\s*\d+\s*\]/g,'')}]:undefined,notes:[note('Active effect','Only one enemy-card effect is active at a time. Playing another replaces it; resistances apply while the effect lasts. Used enemy cards do not reload.')],sources:[...sources(r),...(farm?[farm.source]:[])]});
}
for (const r of read('map-cards')) for (const campaign of r.campaigns) {
 const values=r.dropRates?.[campaign];
 add(r,{id:r.id.replace('recom-',`recom-${campaign}-`),campaign,family:'map',summary:r.effect,stats:[['Card group',r.family]],instructions:r.dropConditions,notes:[...(values&&Object.values(values).some(v=>v>0)?[note('Where to find',rates(values)+'. World names identify the room theme, not its floor number.')]:[]),...(r.difficultyRates?[note('Drop rate',rates(r.difficultyRates))]:[]),...(r.name==='Key to Rewards'?[note('Reward chests','Complete the Days movie and its unlocked journal entries to enable the second chest. If both chests are available, one visit can collect both. If you took the first chest earlier, return with another key after unlocking the bonus. Once both are claimed, that world’s reward room closes.')]:[]),note('Map inventory','Carry up to 99 regular map cards; story keys do not use those slots. You cannot discard cards while holding 20 or fewer.'),...(r.family!=='key'?[note('Opening rooms','Match the displayed color and number. Ordinary room arrows accept the displayed value or beyond in that direction; a zero can satisfy either arrow. Event-room requirements are fixed by floor and treat zero literally. Each Random Joker replaces one non-key requirement.')]:[])]});
}
for (const [name,summary] of [['Soul Eater','Riku’s attack card. Its power increases with AP; the deck supplies fixed card values.'],['The King','Pick up the King’s friend card during battle. It heals Riku, attacks nearby enemies and reloads his deck.']]) add({id:`recom-riku-card-${name.toLowerCase().replaceAll(' ','-')}`,name,campaign:'riku',source:name==='Soul Eater'?'https://www.khwiki.com/Soul_Eater':'https://www.khwiki.com/Friend_Card'},{family:'battle',summary});
for (const r of read('additional-cards')) add(r,{family:r.family,summary:r.acquisition,notes:r.family==='world'?[note('World selection','Cards offered together can be assigned to any floor in that group. The floor determines the layout and door costs; the World Card determines its inhabitants and rewards.')]:r.notes});
for (const r of read('sleights')) add(r,{category:'sleights',family:r.family,summary:r.combinationReference,instructions:r.combinationReference,prerequisites:r.acquisition,collectible:false,stats:[['Use',r.normalCombat===false?'Mini-game only':'Combat']]});
for (const r of read('worlds-and-rewards')) add(r,{name:r.reward,category:'rewards',family:r.method,world:r.world,summary:r.method==='room-of-rewards-base'?'Room of Rewards · first chest':r.method==='room-of-rewards-days'?'Room of Rewards · Days bonus chest':'Bounty reward',prerequisites:r.prerequisite,collectible:true,notes:r.method==='bounty'?[note('Bounty rooms','Create a Calm Bounty, Guarded Trove or False Bounty room and open its real treasure chest. These use ordinary room-door costs, not a Key to Rewards.'),...(r.bountyOrder?[note('Reward order',`This is bounty ${r.bountyOrder} in ${r.world}, after earlier eligible rewards.`)]:[])]:[note('Door requirements','Use the row for the floor where you placed this world. Pay each listed requirement separately; a Random Joker can replace one non-key requirement.'),...rewardDoors(r.world),note('Returning later','The Days bonus can be collected on the same visit if already unlocked. Otherwise, return with another Key to Rewards after unlocking it. Both chests are one-time rewards; once claimed, the reward room closes.')]});
for (const r of read('riku-decks')) add(r,{name:r.world,category:'decks',world:r.world,checkable:false,summary:`${r.cardsInSourceOrder.length} cards in this world preset.`,cards:r.cardsInSourceOrder,notes:[note('Boss cards','Previously earned boss enemy cards are added to this preset. Ordinary enemy cards are world-specific; Riku does not receive random enemy-card drops.'),note('Changing decks','Riku’s cards and their order are fixed. Entering a different world or a castle corridor can change his deck; set the shortcut again after a change. This list describes the named world’s base deck.')]});
for (const r of read('moogle-packs')) add(r,{name:`${r.tier} ${r.kind[0].toUpperCase()+r.kind.slice(1)} Pack`,category:'shop',checkable:false,summary:`${r.priceMooglePoints} Moogle Points · 5 random cards`,stats:[['Price',`${r.priceMooglePoints} MP`],['Floors',r.floorRange.join('–')],['Cards','5']],notes:[note('Shop stock',Object.entries(r.stockByFloor).map(([f,n])=>`${f}F: ${n} pack${n===1?'':'s'} of this type`).join(' · ')+'. Create a new Moogle Room to refresh sold-out stock.'),note('Free pack','Each newly created shop gives an Attack Pack: Grass on floors 1–6, Brown on floors 7–13. Leave space for five cards.'),...(r.cardRates?[note('Card selection',rates(r.cardRates)+'. These are the full unlocked pool’s selection rates. Locked cards cannot appear.')]:[]),note('Selling cards','Trade value is twice the CP cost divided by 3, with the division rounded down first. For Premium cards, use the value-1 CP cost and add 10 MP. Unique boss and Special Cards cannot be sold.')]});
for (const r of read('steam-achievements')) add(r, {category:'achievements',campaign:r.campaignScope==='run'?'shared':r.campaignScope,summary:r.requirement,instructions:r.requirement,uncertainty:r.campaignScope==='run'?'Shared run reference. Check manually against your in-game achievement; card or chest checks do not certify run restrictions.':undefined});
const mini=[['monstro-belly-brawl',"Monstro’s Belly Brawl",'Monstro','Complete the Shadow-clearing event.','',null,'Recorded in the Journal without a numeric score in the inspected HD screen.'],['balloon-glider','Balloon Glider','100 Acre Wood','500+ points','points',500,'First clear: Firaga Burst. Second clear: Stop 0. Preserve balloons and collect honey.'],['whirlwind-plunge','Whirlwind Plunge','100 Acre Wood','2,000+ points','points',2000,'First clear: Mega-Ether 5. Second clear: Gravity 9. Collect honey and recover Pooh after collisions.'],['bumble-rumble','Bumble-Rumble','100 Acre Wood','70 bees within 100 seconds','seconds',100,'First clear: Elixir 1. Second clear: Hi-Potion 7. Protect Pooh’s honey; the achievement has a separate 70-bee condition.'],['tiggers-jump-a-thon',"Tigger’s Jump-a-Thon",'100 Acre Wood','120+ points','points',120,'First clear: Idyll Romp. Second clear: Ether 9. Repeat the stump sequence.'],['veggie-panic','Veggie Panic','100 Acre Wood','150+ points','points',150,'First clear: Cross-slash+. Second clear: Fire 8. Sort cabbage left and pumpkins right.']];
for (const [slug,name,world,summary,unit,target,instructions] of mini) add({id:`recom-sora-minigame-${slug}`,name,sources:['https://www.khwiki.com/Game:100_Acre_Wood','https://steamcommunity.com/stats/2552430/achievements/']},{category:'minigames',world,summary,unit,target,instructions});
const result={entries,worlds,coverage:'HD Re:Chain of Memories: Sora’s 152-card collection and Riku’s 59-card collection; CP costs, acquisition routes, 41 world rewards with floor-based door requirements, sleights, six Mini-games, 12 Riku world presets, Moogle packs and Steam goals. Card discovery is tracked independently from chest rewards and achievement completion.'};
if(new Set(entries.map(e=>e.id)).size!==entries.length)throw new Error('Duplicate CoM IDs');
mkdirSync(new URL('../../src/games/recom/',import.meta.url),{recursive:true});
writeFileSync(new URL('../../src/games/recom/ui-data.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(`Re:CoM: ${entries.length} sourced guide entries.`);
