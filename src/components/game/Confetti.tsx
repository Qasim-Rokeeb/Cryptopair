
"use client";

import { useEffect, useState } from 'react';

const CONFETTI_COUNT = 50;

type ConfettiProps = {
  active: boolean;
  onComplete: () => void;
};

export function Confetti({ active, onComplete }: ConfettiProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 2000); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
        <div
          key={i}
          className="confetti-particle"
          style={{
            '--x': `${Math.random() * 100}vw`,
            '--y': `${Math.random() * -100 - 100}vh`,
            '--angle': `${Math.random() * 360}deg`,
            '--delay': `${Math.random() * 2}s`,
            '--duration': `${Math.random() * 3 + 2}s`,
            '--color': `hsl(${Math.random() * 360}, 90%, 60%)`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
