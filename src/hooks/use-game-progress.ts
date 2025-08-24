"use client";

import { useState, useEffect, useCallback } from 'react';

const CURRENT_LEVEL_KEY = 'cryptopair-game-level';
const HIGHEST_UNLOCKED_LEVEL_KEY = 'cryptopair-highest-unlocked-level';

export function useGameProgress() {
  const [level, setLevel] = useState(1);
  const [highestUnlockedLevel, setHighestUnlockedLevel] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedLevel = localStorage.getItem(CURRENT_LEVEL_KEY);
      if (savedLevel) {
        setLevel(parseInt(savedLevel, 10));
      }
      const savedHighestLevel = localStorage.getItem(HIGHEST_UNLOCKED_LEVEL_KEY);
      if (savedHighestLevel) {
        setHighestUnlockedLevel(parseInt(savedHighestLevel, 10));
      }
    } catch (error) {
      console.error("Could not access local storage to load game progress.", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveLevel = useCallback((newLevel: number) => {
    try {
      if (newLevel > highestUnlockedLevel) {
        return; // Prevent jumping to a locked level
      }
      localStorage.setItem(CURRENT_LEVEL_KEY, newLevel.toString());
      setLevel(newLevel);
    } catch (error) {
      console.error("Could not save game progress to local storage.", error);
    }
  }, [highestUnlockedLevel]);

  const unlockLevel = useCallback((levelToUnlock: number) => {
    setHighestUnlockedLevel(currentHighest => {
      const newHighest = Math.max(currentHighest, levelToUnlock);
      if (newHighest > currentHighest) {
        try {
          localStorage.setItem(HIGHEST_UNLOCKED_LEVEL_KEY, newHighest.toString());
        } catch (error) {
          console.error("Could not save highest unlocked level to local storage.", error);
        }
        return newHighest;
      }
      return currentHighest;
    });
  }, []);

  return { level, setLevel: saveLevel, isLoaded, highestUnlockedLevel, unlockLevel };
}
