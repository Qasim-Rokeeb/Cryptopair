"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { BrainCircuit, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameBoard } from '@/components/game/GameBoard';
import { MatchDialog } from '@/components/game/MatchDialog';
import { LevelCompleteDialog } from '@/components/game/LevelCompleteDialog';
import { getLevelData, gameLevels } from '@/lib/game-data';
import { useGameProgress } from '@/hooks/use-game-progress';
import { Skeleton } from '@/components/ui/skeleton';

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
  const { level, setLevel, isLoaded } = useGameProgress();
  const [cards, setCards] = useState<GameCardData[]>([]);
  const [selectedCards, setSelectedCards] = useState<GameCardData[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const [dialogState, setDialogState] = useState<'none' | 'match' | 'level-complete'>('none');
  const [lastMatchedTerm, setLastMatchedTerm] = useState('');

  const totalPairs = useMemo(() => getLevelData(level)?.length ?? 0, [level]);

  const initializeGame = useCallback((currentLevel: number) => {
    const levelData = getLevelData(currentLevel);
    if (!levelData) {
      // Handle case where level data doesn't exist (e.g., max level reached)
      // Maybe reset to level 1 or show a completion message.
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
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(c =>
              c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 1200);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    if (totalPairs > 0 && matchedPairs === totalPairs) {
        setTimeout(() => {
            setDialogState('level-complete');
        }, 800)
    }
  }, [matchedPairs, totalPairs]);


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
    <>
      <main className="min-h-screen bg-background flex flex-col items-center p-4 sm:p-8">
        <header className="w-full max-w-5xl mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-2">
            <BrainCircuit className="w-10 h-10 text-primary text-glow-primary" />
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-glow-primary">
              CryptoPair
            </h1>
          </div>
          <p className="text-muted-foreground">Match the crypto terms with their definitions.</p>
        </header>

        <div className="w-full max-w-5xl flex justify-between items-center mb-4">
            <div className="text-xl font-headline">Level: <span className="text-primary font-bold">{level}</span></div>
            <div className="text-xl font-headline">Matched: <span className="text-primary font-bold">{matchedPairs}</span> / {totalPairs}</div>
            <Button variant="outline" size="icon" onClick={resetGame}>
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Reset Game</span>
            </Button>
        </div>

        <GameBoard cards={cards} onCardClick={handleCardClick} isDisabled={isChecking} />

        <footer className="mt-8 text-muted-foreground text-sm">
            Created for learning and fun.
        </footer>
      </main>

      <MatchDialog
        open={dialogState === 'match'}
        onOpenChange={() => setDialogState('none')}
        term={lastMatchedTerm}
      />
      
      <LevelCompleteDialog
        open={dialogState === 'level-complete'}
        onOpenChange={() => setDialogState('none')}
        level={level}
        onNextLevel={handleNextLevel}
        isLastLevel={level >= gameLevels.length}
      />
    </>
  );
}
