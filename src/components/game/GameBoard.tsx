
"use client";

import type { GameCardData } from '@/app/page';
import { GameCard } from './GameCard';

type GameBoardProps = {
  cards: GameCardData[];
  onCardClick: (id: string) => void;
  isDisabled: boolean;
  mismatchedCards: string[];
};

export function GameBoard({ cards, onCardClick, isDisabled, mismatchedCards }: GameBoardProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-2 w-full max-w-5xl mx-auto sm:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] sm:gap-2">
      {cards.map((card, index) => (
        <GameCard
          key={card.id}
          card={card}
          isFlipped={card.isFlipped}
          isMatched={card.isMatched}
          isMismatched={mismatchedCards.includes(card.id)}
          onClick={onCardClick}
          isDisabled={isDisabled}
          index={index}
        />
      ))}
    </div>
  );
}
