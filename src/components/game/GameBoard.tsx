"use client";

import type { GameCardData } from '@/app/page';
import { GameCard } from './GameCard';

type GameBoardProps = {
  cards: GameCardData[];
  onCardClick: (id: string) => void;
  isDisabled: boolean;
};

export function GameBoard({ cards, onCardClick, isDisabled }: GameBoardProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4 w-full max-w-5xl mx-auto sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">
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
