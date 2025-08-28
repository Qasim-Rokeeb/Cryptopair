
"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Coins } from 'lucide-react';
import { GameBoard } from '@/components/game/GameBoard';
import { MatchDialog } from '@/components/game/MatchDialog';
import { LevelCompleteDialog } from '@/components/game/LevelCompleteDialog';
import { getLevelData, gameLevels } from '@/lib/game-data';
import { useGameProgress } from '@/hooks/use-game-progress';
import { Skeleton } from '@/components/ui/skeleton';
import { GameFooter } from '@/components/game/GameFooter';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { Confetti } from '@/components/game/Confetti';
import { EmptyState } from '@/components/game/EmptyState';
import { ParallaxStars } from '@/components/game/ParallaxStars';
import { Badge } from '@/components/ui/badge';

export type GameCardData = {
  id: string;
  content: string;
  type: 'term' | 'definition';
  matchId: number;
  isFlipped: boolean;
  isMatched: boolean;
  icon: string;
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Home() {
  const { level, setLevel, isLoaded, highestUnlockedLevel, unlockLevel } = useGameProgress();
  const [cards, setCards] = useState<GameCardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCardData[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [mismatchedCards, setMismatchedCards] = useState<string[]>([]);
  const [hasGameData, setHasGameData] = useState(true);

  const [dialogState, setDialogState] = useState<'none' | 'match' | 'level-complete'>('none');
  const [lastMatchedTerm, setLastMatchedTerm] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPairs = useMemo(() => getLevelData(level)?.length ?? 0, [level]);

  const initializeGame = useCallback((currentLevel: number) => {
    const levelData = getLevelData(currentLevel);
    if (!levelData) {
      if(currentLevel > 1) {
        setLevel(1);
      } else {
        setHasGameData(false);
      }
      return;
    }
    setHasGameData(true);

    const gameCards = levelData.flatMap((pair, index) => [
      { id: `term-${index}`, type: 'term' as const, content: pair.term, matchId: index, isFlipped: false, isMatched: false, icon: pair.icon },
      { id: `def-${index}`, type: 'definition' as const, content: pair.definition, matchId: index, isFlipped: false, isMatched: false, icon: pair.icon },
    ]);

    setCards(shuffleArray(gameCards));
    setSelectedCards([]);
    setMatchedPairs(0);
    setIsChecking(false);
    setDialogState('none');
    setMismatchedCards([]);
    setShowConfetti(false);
    setAnnouncement('');
  }, [setLevel]);

  useEffect(() => {
    if (isLoaded) {
      initializeGame(level);
    }
  }, [level, isLoaded, initializeGame]);
  
  const handleCardClick = (id: string) => {
    if (isChecking || selectedCards.length === 2) return;

    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    setMismatchedCards([]);
    const newCards = cards.map(c => (c.id === id ? { ...c, isFlipped: true } : c));
    setCards(newCards);
    setSelectedCards([...selectedCards, { ...clickedCard, isFlipped: true }]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setIsChecking(true);
      const [first, second] = selectedCards;

      if (first.matchId === second.matchId) {
        // It's a match
        const matchedTerm = first.type === 'term' ? first.content : second.content;
        setLastMatchedTerm(matchedTerm);
        setAnnouncement(`You found a match for: ${matchedTerm}.`);
        setShowConfetti(true);
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(c => (c.matchId === first.matchId ? { ...c, isMatched: true } : c))
          );
          setMatchedPairs(prev => prev + 1);
          setDialogState('match');
          setSelectedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // Not a match
        setAnnouncement('Not a match. Try again.');
        setMismatchedCards([first.id, second.id]);
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(c =>
              c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
          setMismatchedCards([]);
          setAnnouncement('');
        }, 1200);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (totalPairs > 0 && matchedPairs === totalPairs) {
        setTimeout(() => {
            const nextLevel = level + 1;
            if (nextLevel <= gameLevels.length) {
              unlockLevel(nextLevel);
            }
            setDialogState('level-complete');
            setAnnouncement(`Congratulations! You completed level ${level}.`);
        }, 800)
    }
  }, [matchedPairs, totalPairs, level, unlockLevel]);


  const handleNextLevel = () => {
    const nextLevel = level + 1;
    if (nextLevel <= gameLevels.length) {
      setLevel(nextLevel);
    }
    setDialogState('none');
  };

  const resetGame = () => {
    initializeGame(level);
  }

  const progress = totalPairs > 0 ? (matchedPairs / totalPairs) * 100 : 0;

  if (!isLoaded) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl">
                <Skeleton className="h-16 w-1/2 mx-auto mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full" />
                    ))}
                </div>
            </div>
        </div>
    )
  }
  
  const PageHeader = ({ isScrolled, matchedPairs, totalPairs }: { isScrolled: boolean, matchedPairs: number, totalPairs: number }) => (
    <header className={cn(
        "w-full sticky top-0 z-20 transition-all duration-300 ease-out",
        isScrolled ? 'py-2 bg-background/80 backdrop-blur-lg shadow-md border-b border-border' : 'py-8 sm:py-12'
    )}>
        <div className="max-w-5xl mx-auto px-4 flex justify-center items-center relative">
            <div className="text-center transition-all duration-300 ease-out">
                <div className="flex items-center justify-center gap-2 sm:gap-4 mb-2">
                    <Coins className={cn("text-primary text-glow-primary transition-all duration-300 ease-out", isScrolled ? 'w-8 h-8' : 'w-10 h-10')} />
                    <h1 className={cn("font-headline font-bold text-glow-primary transition-all duration-300 ease-out", isScrolled ? 'text-2xl' : 'text-4xl')}>
                        CryptoPair
                    </h1>
                    <Badge variant="secondary" className={cn("transition-all duration-300 ease-out", isScrolled ? "scale-100" : "scale-0")}>
                        {matchedPairs} / {totalPairs}
                    </Badge>
                </div>
                <p className={cn("text-muted-foreground transition-all duration-300 ease-out", isScrolled ? 'text-xs h-0 opacity-0 -translate-y-2' : 'text-base h-auto opacity-100 translate-y-0')}>
                    Match the crypto terms with their definitions.
                </p>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <ThemeToggle />
            </div>
        </div>
    </header>
  );

  return (
    <div className={cn("min-h-screen w-full bg-background bg-grid bg-gradient-radial-background", (dialogState !== 'none') && 'h-screen overflow-hidden')}>
      <ParallaxStars />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      <div
        aria-live="polite"
        className="sr-only"
      >
        {announcement}
      </div>

      <div className="min-h-screen">
        <PageHeader isScrolled={isScrolled} matchedPairs={matchedPairs} totalPairs={totalPairs} />

        <main id="main-content" className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pb-48">
          <div className="w-full max-w-5xl flex flex-col items-center">
            {!hasGameData ? (
                <EmptyState />
            ) : cards.length > 0 ? (
                <GameBoard cards={cards} onCardClick={handleCardClick} isDisabled={isChecking} mismatchedCards={mismatchedCards} />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} className="h-48 w-full" />
                    ))}
                </div>
            )}
          </div>
        </main>
      </div>

      {hasGameData && (
        <GameFooter 
          level={level}
          setLevel={setLevel}
          resetGame={resetGame}
          progress={progress}
          matchedPairs={matchedPairs}
          totalPairs={totalPairs}
          highestUnlockedLevel={highestUnlockedLevel}
        />
      )}

      <MatchDialog
        open={dialogState === 'match'}
        onOpenChange={(isOpen) => setDialogState(isOpen ? 'match' : 'none')}
        term={lastMatchedTerm}
      />
      
      <LevelCompleteDialog
        open={dialogState === 'level-complete'}
        onOpenChange={(isOpen) => setDialogState(isOpen ? 'level-complete' : 'none')}
        level={level}
        onNextLevel={handleNextLevel}
        isLastLevel={level >= gameLevels.length}
      />
    </div>
  );
}
