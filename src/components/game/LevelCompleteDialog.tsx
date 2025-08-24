"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

type LevelCompleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: number;
  onNextLevel: () => void;
  isLastLevel: boolean;
};

export function LevelCompleteDialog({ open, onOpenChange, level, onNextLevel, isLastLevel }: LevelCompleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-accent">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline text-2xl text-accent">
            <Award className="w-6 h-6" />
            Level {level} Complete!
          </DialogTitle>
          <DialogDescription>
            {isLastLevel
              ? "Congratulations! You've mastered all the terms."
              : "Great job! You're ready for the next challenge."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isLastLevel ? (
            <Button onClick={() => onOpenChange(false)}>Finish</Button>
          ) : (
            <Button onClick={onNextLevel}>
              Next Level
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
