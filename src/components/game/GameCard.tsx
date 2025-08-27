
"use client";

import { cn } from '@/lib/utils';
import { Icon } from './Icon';

const pairColors = [
  'hsl(var(--success))',
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(200, 80%, 50%)',
  'hsl(300, 70%, 50%)',
  'hsl(45, 90%, 50%)',
  'hsl(175, 70%, 40%)',
  'hsl(330, 80%, 60%)',
  'hsl(250, 80%, 60%)',
  'hsl(10, 80%, 55%)',
  'hsl(120, 50%, 50%)',
  'hsl(220, 80%, 70%)',
];

type GameCardProps = {
  card: {
    id: string;
    content: string;
    type: 'term' | 'definition';
    icon: string;
    matchId: number;
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

  const matchedColor = pairColors[card.matchId % pairColors.length];

  const matchedStyle = isMatched
    ? {
        '--matched-color': matchedColor,
        '--matched-color-glow': matchedColor.replace(')', ', 0.63)').replace('hsl(','hsla('),
        '--matched-color-glow-inset': matchedColor.replace(')', ', 0.45)').replace('hsl(','hsla(')
      } as React.CSSProperties
    : {};

  return (
    <div 
      className={cn("p-1.5 animate-card-enter rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background", isMismatched && "animate-shake")} 
      onClick={handleClick} 
      onKeyDown={handleKeyDown}
      tabIndex={isMatched || isDisabled ? -1 : 0}
      role="button"
      aria-label={`Card ${index + 1}. ${isFlipped ? card.content : 'Face down'}`}
      style={{ animationDelay: `${index * 40}ms`, ...matchedStyle }}>
      <div
        className={cn(
          'relative w-full h-full min-h-[12rem] rounded-lg preserve-3d transition-transform duration-500 ease-in-out perspective',
          (isFlipped || isMatched) && 'rotate-y-180',
          !isMatched && 'cursor-pointer'
        )}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden rounded-lg bg-secondary/50 dark:bg-white/5 dark:backdrop-blur-lg border-2 border-primary/20 flex items-center justify-center p-4 hover:border-primary transition-colors">
          <Icon name={card.icon} className="w-16 h-16 text-primary dark:opacity-100" />
        </div>
        {/* Back of card */}
        <div
          className={cn(
            'absolute w-full h-full backface-hidden rotate-y-180 rounded-lg flex items-center justify-center p-4 text-center',
            isMatched ? 'bg-[color:var(--matched-color-glow-inset)] border-2 border-[color:var(--matched-color)] shadow-[inset_0_0_10px_var(--matched-color-glow-inset),0_0_12px_var(--matched-color-glow),0_0_24px_var(--matched-color-glow-inset)]' : 'bg-secondary border-2 border-border dark:bg-black/10 dark:backdrop-blur-lg',
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
