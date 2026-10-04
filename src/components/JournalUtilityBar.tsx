import type { ReactNode } from 'react';
import './journal-chrome.css';

/** Companion controls stay outside each game's native journal frame. */
export function JournalUtilityBar({ className, game, children, tools }: {
  className: string;
  game: string;
  children?: ReactNode;
  tools?: ReactNode;
}) {
  return <div className={`journal-utility-bar ${className} ${children ? 'has-scope' : ''} ${tools ? 'has-tools' : ''}`}>
    <a className="journal-games-link" href="#/">‹ Games</a>
    <span className="journal-game-label">{game}</span>
    {children}
    {tools}
  </div>;
}
