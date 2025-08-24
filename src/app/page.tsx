"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Coins, RefreshCw, Github, Twitter, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameBoard } from '@/components/game/GameBoard';
import { MatchDialog } from '@/components/game/MatchDialog';
import { LevelCompleteDialog } from '@/components/game/LevelCompleteDialog';
import { getLevelData, gameLevels } from '@/lib/game-data';
import { useGameProgress } from '@/hooks/use-game-progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';

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
    <>
      <main className="min-h-screen bg-background bg-grid flex flex-col items-center p-4 sm:p-8">
        <div className="w-full max-w-5xl flex flex-col">
          <header className="w-full mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              <Coins className="w-10 h-10 text-primary text-glow-primary" />
              <h1 className="text-4xl md:text-5xl font-headline font-bold text-glow-primary">
                CryptoPair
              </h1>
            </div>
            <p className="text-muted-foreground">Match the crypto terms with their definitions.</p>
          </header>

          <div className="w-full bg-secondary/30 backdrop-blur-sm border border-border rounded-xl p-4 md:p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-headline">Level: <span className="text-primary font-bold text-xl">{level}</span></div>
              <Button variant="outline" size="icon" onClick={resetGame}>
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Reset Game</span>
              </Button>
            </div>
            <div className="flex items-center gap-4">
                <Progress value={progress} className="w-full" />
                <div className="text-lg font-headline text-right min-w-[80px]">{matchedPairs} / {totalPairs}</div>
            </div>
          </div>

          <GameBoard cards={cards} onCardClick={handleCardClick} isDisabled={isChecking} />

          <footer className="w-full mt-12 border-t border-border/50 pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-muted-foreground text-sm">
                  © 2024 CryptoPair. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Website</span>
                  </a>
                </div>
              </div>
          </footer>
        </div>
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
