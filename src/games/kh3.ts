import type { GameGuide, CollectionEntry } from './types';
import content from './kh3/content.json';

const worlds = [
  ['Olympus','Return with the Gummiphone for Lucky Emblems. Five Golden Herc Figures exchange for Hero’s Belt in Agora.'],
  ['Twilight Town','Tram Common contains the Bistrot, Moogle workshop and Classic Kingdom posters.'],
  ['Toy Box','Galaxy Toys spans several floors and departments; use area names to distinguish repeated rooms.'],
  ['Kingdom of Corona','Complete Rapunzel’s four Forest Clasp activities before reaching the Shore; sources disagree on the later cutoff.'],
  ['Monstropolis','Return after the story for elevator/vault treasures and the Vault Passage emblem.'],
  ['Arendelle','Frozen Slider’s ten prizes are separate from the 25 world chests. The score achievement needs 600,000, above the 500,000 A rank.'],
  ['The Caribbean','Island treasures, underwater passages and Port Royal are separate areas. Ship combat is distinct from Gummi combat.'],
  ['San Fransokyo','Choose day or night at the save point; Lucky Emblem 3 requires night.'],
  ['100 Acre Wood','Three Lucky Emblems; no numbered base-game chests.'],
  ['Keyblade Graveyard','Battlegate 0 differs from the post-clear gates. Dark Inferno awards Crystal Regalia.'],
  ['The Final World','Return for the Orichalcum+ chest.'],
  ['Scala ad Caelum','The nine listed chests belong to Re Mind and do not count toward the base 245.'],
  ['Starlight Way','Gummi zone containing Olympus, Twilight Town, Toy Box and Corona routes.'],
  ['Misty Stream','Schwarzgeist requires a ship with at least 200 Speed.'],
  ['The Eclipse','Clear the five other battles to unlock Omega Machina and its Orichalcum+.'],
  ['Limitcut','Clear the eleven initial data battles to unlock Xion and Master Xehanort.'],
  ['Secret Episode','All thirteen data wins unlock Yozora. Victory rewards Crystal Regalia+.'],
];
const guide: GameGuide = {
  id:'kh3', name:'Kingdom Hearts III', edition:'Re Mind · Steam', accent:'#536bba',
  craftingLabel:'Synthesis & Cooking',
  worlds:worlds.map(([name,summary])=>({name,summary})),
  categories:[
    {id:'treasures',label:'Treasures',icon:'chest'},
    {id:'emblems',label:'Lucky Emblems',icon:'heart'},
    {id:'photos',label:'Photo Missions',icon:'search'},
    {id:'keyblades',label:'Keyblades & Equipment',icon:'sword'},
    {id:'ingredients',label:'Ingredients',icon:'leaf'},
    {id:'cuisine',label:'Excellent Cuisine',icon:'cup'},
    {id:'classic-kingdom',label:'Classic Kingdom',icon:'book'},
    {id:'classic-records',label:'Classic Kingdom Scores',icon:'medal'},
    {id:'challenges',label:'Challenges & Minigames',icon:'spark'},
    {id:'herc',label:'Golden Herc Figures',icon:'world'},
    {id:'battlegates',label:'Battlegates',icon:'monster'},
    {id:'reports',label:'Secret Reports',icon:'scroll'},
    {id:'gummi',label:'Gummi Routes',icon:'world'},
    {id:'remind-treasures',label:'Re Mind Treasures',icon:'chest'},
    {id:'remind',label:'Limitcut & Secret Episode',icon:'sword'},
    {id:'achievements',label:'Steam Achievements',icon:'medal'},
    {id:'material',label:'Materials',icon:'flask'},
  ],
  entries:content.entries as CollectionEntry[], recipes:content.recipes,
  coverage:'Base inventory: 245 chests and 90 Lucky Emblems. Re Mind: nine separate chests. Includes 23 Classic Kingdom acquisitions and separate high scores, 20 Photo Missions, 15 Battlegates, 28 Excellent cuisine records and recipes, 59 ingredients, 51 Steam achievements, selected synthesis/forge, Keyblades, Flan, Gummi and DLC encounters. Chest/emblem routes currently identify areas, not every exact landmark. Full synthesis, equipment, bestiary, Gummi treasures, Frozen Slider prize routes and Premium Menu predicates remain incomplete. Counts refer to represented records only; Data Jiminy is excluded.',
};
export default guide;
