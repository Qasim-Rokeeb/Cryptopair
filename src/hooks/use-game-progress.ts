"use client";

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'cryptopair-game-level';

export function useGameProgress() {
  const [level, setLevel] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedLevel = localStorage.getItem(STORAGE_KEY);
      if (savedLevel) {
        setLevel(parseInt(savedLevel, 10));
      }
    } catch (error) {
      console.error("Could not access local storage to load game progress.", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveLevel = useCallback((newLevel: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, newLevel.toString());
      setLevel(newLevel);
    } catch (error) {
      console.error("Could not save game progress to local storage.", error);
    }
  }, []);

  return { level, setLevel: saveLevel, isLoaded };
}
