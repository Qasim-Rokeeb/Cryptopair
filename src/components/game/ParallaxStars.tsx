
"use client";

import { useEffect, useState } from 'react';

export function ParallaxStars() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="parallax-bg" aria-hidden="true">
      <div id="stars1" className="stars" style={{ transform: `translateY(${offsetY * 0.3}px)` }} />
      <div id="stars2" className="stars" style={{ transform: `translateY(${offsetY * 0.2}px)` }} />
      <div id="stars3" className="stars" style={{ transform: `translateY(${offsetY * 0.1}px)` }} />
    </div>
  );
}
