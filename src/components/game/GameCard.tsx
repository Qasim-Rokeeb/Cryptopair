"use client";

import { cn } from '@/lib/utils';
import { BrainCircuit } from 'lucide-react';

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
        <div className="absolute w-full h-full backface-hidden rounded-lg bg-card border-2 border-accent/50 flex items-center justify-center p-4 hover:border-accent transition-colors">
          <BrainCircuit className="w-16 h-16 text-accent/70" />
        </div>
        {/* Back of card */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center p-4 text-center text-card-foreground',
            isMatched ? 'bg-primary/20 border-2 border-primary card-glow-matched' : 'bg-card border-2 border-border',
            card.type === 'term' ? 'font-headline font-bold text-lg' : 'text-sm'
          )}
        >
          {card.content}
        </div>
      </div>
    </div>
  );
}
