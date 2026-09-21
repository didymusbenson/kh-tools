import type { GameGuide } from './types';
import content from './dddhd/content.json';

const guide: GameGuide = {
  id: 'dddhd',
  name: 'Dream Drop Distance',
  edition: 'HD',
  accent: '#625087',
  craftingLabel: 'Spirit Creation',
  categories: [
    { id: 'treasures', label: 'Treasures', icon: 'chest' },
    { id: 'spirits', label: 'Spirits', icon: 'paw' },
    { id: 'commands', label: 'Commands', icon: 'wand' },
    { id: 'abilities', label: 'Abilities', icon: 'spark' },
    { id: 'portals', label: 'Link Portals', icon: 'world' },
    { id: 'keyblades', label: 'Keyblades', icon: 'sword' },
    { id: 'dives', label: 'Dives', icon: 'leaf' },
    { id: 'challenges', label: 'Flick Rush & Challenges', icon: 'cup' },
    { id: 'awards', label: 'In-game Trophies', icon: 'medal' },
    { id: 'achievements', label: 'Steam Achievements', icon: 'scroll' },
  ],
  worlds: [
    { name: 'Traverse Town', summary: 'Sora: 34 chests. Riku: 32. Flick Rush is in the Fourth District; Julius appears in Fountain Plaza after game clear. Chest and portal completion are character-specific.' },
    { name: 'La Cité des Cloches', summary: 'Sora: 49 chests. Riku: 34. Sora’s Tunnels chest 36 contains the HD Catanuki Recipe. The large Wheeflower near the Bridge blocks a Town chest until defeated.' },
    { name: 'The Grid', summary: 'Sora: 42 chests. Riku: 45. Routes include the Docks, Solar Sailer and multiple Rectifier floors. HD replaces Treasure Goggles with Candy Goggles.' },
    { name: "Prankster's Paradise", summary: 'Sora: 31 chests in the amusement park and underwater route. Riku: 22 chests inside Monstro; the inverted Belly layout affects access.' },
    { name: 'Country of the Musketeers', summary: 'Sora: 32 chests. Riku: 31. Revisit Sora’s Cell after rescuing Mickey. Riku’s Grand Lobby basement can also be reached through the Machine Room exit.' },
    { name: 'Symphony of Sorcery', summary: 'Sora: 22 chests. Riku: 21. Riku’s Special Portal 6 awards Brilliant Fantasy. Only Sora has a Secret Portal here.' },
    { name: 'The World That Never Was', summary: 'Sora: 15 chests. Riku: 28. Three Special Portals per character; no Secret Portals. Riku’s specials offer Brilliant Fantasy at 33%, 67% and 100%.' },
  ],
  entries: content.entries,
  recipes: content.recipes,
  coverage: '438 chest records; many have area-only directions. 54 Spirit breeds, 124 commands, 43 abilities, 37 Dream Pieces, 78 Special and 11 Secret Portals. 263 creation formulas cover all 54 breeds, with source probabilities and alternate outcomes preserved. All 37 materials have farming sources. Full board paths, precise chest/enemy approach routes and platform achievements remain incomplete; details identify gaps.',
};
export default guide;
