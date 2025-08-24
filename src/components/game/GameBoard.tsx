"use client";

import type { GameCardData } from '@/app/page';
import { GameCard } from './GameCard';

type GameBoardProps = {
  cards: GameCardData[];
  onCardClick: (id: string) => void;
  isDisabled: boolean;
};

export function GameBoard({ cards, onCardClick, isDisabled }: GameBoardProps) {
  const gridCols = cards.length > 8 ? 'grid-cols-4 md:grid-cols-6' : 'grid-cols-2 md:grid-cols-4';

  return (
    <div className={`grid ${gridCols} gap-4 w-full max-w-5xl mx-auto`}>
      {cards.map((card) => (
        <GameCard
          key={card.id}
          card={card}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          onClick={onCardClick}
          isDisabled={isDisabled}
        />
      ))}
    </div>
  );
}
