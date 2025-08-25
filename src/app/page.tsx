
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

export type GameCardData = {
  id: string;
  content: string;
  type: 'term' | 'definition';
  matchId: number;
  isFlipped: boolean;
  isMatched: boolean;
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

  const [dialogState, setDialogState] = useState<'none' | 'match' | 'level-complete'>('none');
  const [lastMatchedTerm, setLastMatchedTerm] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const totalPairs = useMemo(() => getLevelData(level)?.length ?? 0, [level]);

  const initializeGame = useCallback((currentLevel: number) => {
    const levelData = getLevelData(currentLevel);
    if (!levelData) {
      setLevel(1);
      return;
    }

    const gameCards = levelData.flatMap((pair, index) => [
      { id: `term-${index}`, type: 'term' as const, content: pair.term, matchId: index, isFlipped: false, isMatched: false },
      { id: `def-${index}`, type: 'definition' as const, content: pair.definition, matchId: index, isFlipped: false, isMatched: false },
    ]);

    setCards(shuffleArray(gameCards));
    setSelectedCards([]);
    setMatchedPairs(0);
    setIsChecking(false);
    setDialogState('none');
    setMismatchedCards([]);
    setShowConfetti(false);
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
        setShowConfetti(true);
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(c => (c.matchId === first.matchId ? { ...c, isMatched: true } : c))
          );
          setMatchedPairs(prev => prev + 1);
          setLastMatchedTerm(first.type === 'term' ? first.content : second.content);
          setDialogState('match');
          setSelectedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // Not a match
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

  return (
    <div className={cn("min-h-screen w-full bg-background bg-grid bg-gradient-radial-background", (dialogState !== 'none') && 'h-screen overflow-hidden')}>
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      <div className="min-h-screen">
        <header className="w-full pt-8 sm:pt-12">
          <div className="max-w-5xl mx-auto px-4 flex justify-center items-center relative">
            <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <Coins className="w-10 h-10 text-primary text-glow-primary" />
                    <h1 className="text-4xl md:text-5xl font-headline font-bold text-glow-primary">
                        CryptoPair
                    </h1>
                </div>
                <p className="text-muted-foreground">Match the crypto terms with their definitions.</p>
            </div>
            <div className="absolute top-0 right-4">
                <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pb-48">
          <div className="w-full max-w-5xl flex flex-col items-center">
            <GameBoard cards={cards} onCardClick={handleCardClick} isDisabled={isChecking} mismatchedCards={mismatchedCards} />
          </div>
        </main>
      </div>

      <GameFooter 
        level={level}
        setLevel={setLevel}
        resetGame={resetGame}
        progress={progress}
        matchedPairs={matchedPairs}
        totalPairs={totalPairs}
        highestUnlockedLevel={highestUnlockedLevel}
      />

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
