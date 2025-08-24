"use client";

import { cn } from '@/lib/utils';
import { Coins } from 'lucide-react';

type GameCardProps = {
  card: {
    id: string;
    content: string;
    type: 'term' | 'definition';
  };
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (id: string) => void;
  isDisabled: boolean;
};

export function GameCard({ card, isFlipped, isMatched, onClick, isDisabled }: GameCardProps) {
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled) {
      onClick(card.id);
    }
  };

  return (
    <div className="perspective" onClick={handleClick}>
      <div
        className={cn(
          'relative w-full h-full min-h-[12rem] rounded-lg preserve-3d transition-transform duration-500 ease-in-out',
          (isFlipped || isMatched) && 'rotate-y-180',
          !isMatched && 'cursor-pointer'
        )}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-lg bg-secondary/50 border-2 border-primary/20 flex items-center justify-center p-4 hover:border-primary transition-colors">
          <Coins className="w-16 h-16 text-primary/50" />
        </div>
        {/* Back of card */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center p-4 text-center',
            isMatched ? 'bg-green-500/10 border-2 border-green-500 card-glow-matched' : 'bg-secondary border-2 border-border',
            card.type === 'term' ? 'font-headline font-bold text-lg text-primary-foreground' : 'text-sm text-muted-foreground'
          )}
        >
          {card.content}
        </div>
      </div>
    </div>
  );
}
