
"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { gameLevels } from "@/lib/game-data";
import { RefreshCw, Github, Twitter, Globe } from "lucide-react";

type GameFooterProps = {
    level: number;
    setLevel: (level: number) => void;
    resetGame: () => void;
    progress: number;
    matchedPairs: number;
    totalPairs: number;
};

export function GameFooter({ level, setLevel, resetGame, progress, matchedPairs, totalPairs }: GameFooterProps) {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-10 bg-secondary/30 backdrop-blur-sm border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Top section: Progress and Reset */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4 w-full">
                        <h2 className="text-sm font-headline whitespace-nowrap">Level {level} Progress</h2>
                        <Progress value={progress} className="w-full" />
                        <div className="text-sm font-headline text-right min-w-[70px]">{matchedPairs} / {totalPairs}</div>
                    </div>
                    <Button variant="outline" size="icon" onClick={resetGame} className="ml-4">
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Reset Game</span>
                    </Button>
                </div>

                {/* Middle section: Level Switcher */}
                <div className="flex justify-center items-center gap-2 flex-wrap mb-4">
                    <p className="text-sm font-headline mr-2 hidden sm:block">Switch Level:</p>
                    {gameLevels.map((_, index) => (
                      <Button
                        key={index + 1}
                        variant={level === index + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setLevel(index + 1)}
                        className={cn(
                          "font-headline h-8 w-8 sm:h-auto sm:w-auto",
                           level === index + 1 && "card-glow-matched"
                        )}
                      >
                        <span className="hidden sm:inline">{index + 1}</span>
                         <span className="sm:hidden">{index + 1}</span>
                      </Button>
                    ))}
                </div>

                {/* Bottom section: Copyright and Socials */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
                    <p>
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
