import { kh1GummiPage } from './kh1Gummi';
import type { GuideEntry } from './types';

/** Player-facing activity sections; retain the source category and saved check ID. */
export function kh1ActivitySection(entry: GuideEntry): 'coliseum' | 'gummi' | 'challenges' | undefined {
  if (entry.game !== 'kh1fm') return undefined;
  if (entry.category === 'gummi' || kh1GummiPage(entry)) return 'gummi';
  if (entry.category === 'cup' || (entry.world === 'Olympus Coliseum' && ['boss', 'minigame'].includes(entry.category))) return 'coliseum';
  if (['boss', 'minigame'].includes(entry.category)) return 'challenges';
}
