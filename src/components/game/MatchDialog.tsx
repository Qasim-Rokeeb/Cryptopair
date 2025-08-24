
"use client";

import { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Gem, LoaderCircle } from 'lucide-react';
import { generateExplanation } from '@/ai/flows/generate-explanation';
import { ScrollArea } from '@/components/ui/scroll-area';

type MatchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  term: string;
};

export function MatchDialog({ open, onOpenChange, term }: MatchDialogProps) {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLearnMore = async () => {
    setIsLoading(true);
    setError('');
    setExplanation('');
    try {
      const result = await generateExplanation({ term });
      setExplanation(result.explanation);
    } catch (err) {
      console.error(err);
      setError('Could not generate explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
        // Reset state after dialog closes
        setTimeout(() => {
            setExplanation('');
            setError('');
            setIsLoading(false);
        }, 300);
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="sm:max-w-none md:max-w-xl mx-auto bg-card border-green-500 card-glow-matched rounded-t-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-headline text-2xl text-green-400">
            <Gem className="w-6 h-6" />
            It's a Match!
          </SheetTitle>
          <SheetDescription>
            You successfully matched the term: <span className="font-bold text-primary">{term}</span>
          </SheetDescription>
        </SheetHeader>
        
        {isLoading && (
            <div className="flex items-center justify-center p-8">
                <LoaderCircle className="w-8 h-8 animate-spin text-primary" />
            </div>
        )}

        {error && <p className="text-destructive text-sm">{error}</p>}
        
        {explanation && (
            <ScrollArea className="max-h-[300px] my-4 p-4 border rounded-md bg-background/50">
                <p className="text-sm">{explanation}</p>
            </ScrollArea>
        )}

        <SheetFooter className="gap-2 sm:justify-start">
            {!explanation && !isLoading && (
                <Button onClick={handleLearnMore}>
                    <Gem className="mr-2 h-4 w-4" />
                    Learn More
                </Button>
            )}
          <Button type="button" variant="secondary" onClick={() => handleOpenChange(false)}>
            Continue
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
