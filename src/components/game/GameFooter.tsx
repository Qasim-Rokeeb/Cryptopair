
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { gameLevels } from "@/lib/game-data";
import { RefreshCw, Github, Twitter, Globe, ChevronUp, Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type GameFooterProps = {
    level: number;
    setLevel: (level: number) => void;
    resetGame: () => void;
    progress: number;
    matchedPairs: number;
    totalPairs: number;
    highestUnlockedLevel: number;
};

export function GameFooter({ level, setLevel, resetGame, progress, matchedPairs, totalPairs, highestUnlockedLevel }: GameFooterProps) {
    const isMobile = useIsMobile();
    const [isSheetOpen, setSheetOpen] = useState(false);
    const [newlyUnlockedLevel, setNewlyUnlockedLevel] = useState<number | null>(null);
    const prevHighestUnlockedLevel = useRef(highestUnlockedLevel);

    useEffect(() => {
        if (highestUnlockedLevel > prevHighestUnlockedLevel.current) {
            setNewlyUnlockedLevel(highestUnlockedLevel);
            const timer = setTimeout(() => {
                setNewlyUnlockedLevel(null);
            }, 1500); // Animation duration
            prevHighestUnlockedLevel.current = highestUnlockedLevel;
            return () => clearTimeout(timer);
        }
    }, [highestUnlockedLevel]);

    const handleLevelSelect = (newLevel: number) => {
        if (newLevel > highestUnlockedLevel) return;
        setLevel(newLevel);
        if (isMobile) {
            setSheetOpen(false);
        }
    }

    const LevelSelectorContent = () => (
        <div className="flex flex-wrap justify-center gap-2 p-4">
            {gameLevels.map((_, index) => {
              const levelNum = index + 1;
              const isLocked = levelNum > highestUnlockedLevel;
              return (
              <Button
                key={levelNum}
                variant={level === levelNum ? 'default' : 'outline'}
                size="lg"
                onClick={() => handleLevelSelect(levelNum)}
                disabled={isLocked}
                className={cn(
                  "font-headline h-12 w-12 text-lg relative",
                   level === levelNum && "card-glow-matched",
                   isLocked && "grayscale blur-[2px] pointer-events-none",
                   newlyUnlockedLevel === levelNum && "animate-sparkle"
                )}
              >
                {isLocked && <Lock className="absolute w-5 h-5 z-10" />}
                {levelNum}
              </Button>
            )})}
        </div>
    );

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-10 bg-secondary/30 backdrop-blur-sm border-t border-border">
            <div className="container mx-auto px-4 py-3">
                {/* Top section: Progress and Reset */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 w-full">
                        <h2 className="text-sm font-headline whitespace-nowrap hidden sm:block">Level {level}</h2>
                        <Progress value={progress} className="w-full" />
                        <div className="text-sm font-headline text-right min-w-[60px]">{matchedPairs} / {totalPairs}</div>
                    </div>
                    <Button variant="outline" size="icon" onClick={resetGame} className="ml-2 shrink-0">
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Reset Game</span>
                    </Button>
                </div>

                {/* Middle section: Level Switcher */}
                <div className="flex justify-center items-center gap-1.5 flex-wrap mb-3">
                    {isMobile ? (
                         <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full sm:w-auto font-headline">
                                    <ChevronUp className="mr-2 h-4 w-4" />
                                    Switch Level
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="bottom" className="rounded-t-lg">
                                <SheetHeader>
                                    <SheetTitle className="font-headline text-center">Select Level</SheetTitle>
                                </SheetHeader>
                                <LevelSelectorContent />
                            </SheetContent>
                        </Sheet>
                    ) : (
                        <div className="w-full max-w-xs mx-auto">
                            <Carousel opts={{
                                align: "start",
                                loop: false,
                            }} className="w-full">
                                <CarouselContent>
                                    {gameLevels.map((_, index) => {
                                        const levelNum = index + 1;
                                        const isLocked = levelNum > highestUnlockedLevel;
                                        return (
                                        <CarouselItem key={index} className="basis-1/5">
                                            <div className="p-1">
                                                <Button
                                                    variant={level === levelNum ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => handleLevelSelect(levelNum)}
                                                    disabled={isLocked}
                                                    className={cn(
                                                        "font-headline h-9 w-9 p-0 relative",
                                                        level === levelNum && "card-glow-matched",
                                                        isLocked && "grayscale blur-[2px] pointer-events-none",
                                                        newlyUnlockedLevel === levelNum && "animate-sparkle"
                                                    )}
                                                >
                                                    {isLocked && <Lock className="absolute w-4 h-4 z-10" />}
                                                    {levelNum}
                                                </Button>
                                            </div>
                                        </CarouselItem>
                                    )})}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    )}
                </div>

                {/* Bottom section: Copyright and Socials */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
                    <p className="text-center sm:text-left">
                        © 2024 CryptoPair. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        <a href="https://github.com/Qasim-Rokeeb" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <Twitter className="h-4 w-4" />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <Globe className="h-4 w-4" />
                            <span className="sr-only">Website</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
