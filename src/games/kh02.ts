import type { GameGuide } from './types';
import { entries } from './kh02/catalog';

const guide: GameGuide = {
  id: 'kh02', name: 'Kingdom Hearts 0.2', edition: 'Birth by Sleep — A fragmentary passage', accent: '#675c87',
  coverage: '55 physical finds, 51 objectives, 51 wardrobe rewards and 15 Steam goals. Zodiac chests count once across both categories. Some chest-route pairings, objective thresholds and replay rules remain uncertain and are marked in their details. Progress is a manual guide checklist, not a game-save reader.',
  categories: [
    {id:'treasures',label:'Treasures',icon:'chest'},
    {id:'zodiac',label:'Zodiac Relics',icon:'spark'},
    {id:'gems',label:'Mine Gems',icon:'trinity'},
    {id:'flowers',label:'Flowers',icon:'leaf'},
    {id:'memories',label:'Lingering Memories',icon:'heart'},
    {id:'objectives',label:'Objectives',icon:'scroll'},
    {id:'wardrobe',label:'Wardrobe',icon:'paw'},
    {id:'challenges',label:'Zodiac Mirror',icon:'sword'},
    {id:'achievements',label:'Steam Achievements',icon:'medal'},
    {id:'reference',label:'Combat & Replay',icon:'book'},
  ],
  worlds: [
    {name:'Castle Town',summary:'The area’s eleven physical finds include the Main Road approach chest. Objective 37 counts nine town chests, excluding Main Road. Four Zodiac chests and the blue-slipper memory appear after a first clear. Restore the five gears to reach the summit platforms.'},
    {name:'The World Within',summary:'Thirteen chests, seven mine gems and one memory. The thirteen chests include five post-clear Zodiac relics. Finish the seven-gem search before leaving the mines because re-entry is not verified. All twelve Zodiac relics open the central challenge mirror.'},
    {name:'Forest of Thorns',summary:'Twelve chests, three flowers and one memory. Preserve the Uncertain Path and Rocky Path landmarks when following routes. Firaga burns red ivy. Flowers can be revisited through save-point travel; story boss conditions may need a new run.'},
    {name:'Depths of Darkness',summary:'Six chests and one memory. The Demon Tower objective requires Wayfinder active at victory; Castle Town’s different Demon Tower objective needs a Spellweaver Finish final blow.'},
    {name:'Homecoming',summary:'Objective 51 targets the final Demon Tide on Critical. No physical collectible records are assigned to this finale. Clearing on Proud can satisfy the difficulty achievement, but not Critical Conquest.'},
  ],
  entries,
};
export default guide;
