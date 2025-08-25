
"use client";

import { cn } from '@/lib/utils';
import { Icon } from './Icon';

type GameCardProps = {
  card: {
    id: string;
    content: string;
    type: 'term' | 'definition';
    icon: string;
  };
  isFlipped: boolean;
  isMatched: boolean;
  isMismatched: boolean;
  onClick: (id: string) => void;
  isDisabled: boolean;
  index: number;
};

export function GameCard({ card, isFlipped, isMatched, isMismatched, onClick, isDisabled, index }: GameCardProps) {
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled) {
      onClick(card.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div 
      className={cn("p-1.5 animate-card-enter rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", isMismatched && "animate-shake")} 
      onClick={handleClick} 
      onKeyDown={handleKeyDown}
      tabIndex={isMatched || isDisabled ? -1 : 0}
      role="button"
      aria-label={`Card ${index + 1}. ${isFlipped ? card.content : 'Face down'}`}
      style={{ animationDelay: `${index * 40}ms` }}>
      <div
        className={cn(
          'relative w-full h-full min-h-[12rem] rounded-lg preserve-3d transition-transform duration-500 ease-in-out perspective',
          (isFlipped || isMatched) && 'rotate-y-180',
          !isMatched && 'cursor-pointer'
        )}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-lg bg-secondary/50 dark:bg-white/5 dark:backdrop-blur-lg border-2 border-primary/20 flex items-center justify-center p-4 hover:border-primary transition-colors">
          <Icon name={card.icon} className="w-16 h-16 text-primary/50 dark:text-primary" />
        </div>
        {/* Back of card */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center p-4 text-center',
            isMatched ? 'bg-success/10 border-2 border-success card-glow-matched' : 'bg-secondary border-2 border-border dark:bg-black/10 dark:backdrop-blur-lg',
            isMismatched && '!border-destructive',
            card.type === 'term' ? 'font-headline font-bold text-lg text-foreground' : 'text-sm text-muted-foreground'
          )}
        >
          {card.content}
        </div>
      </div>
    </div>
  );
}
