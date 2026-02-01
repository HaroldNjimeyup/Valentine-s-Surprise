
import React, { useState, useCallback, useRef } from 'react';
import { Position } from '../types';

const FleeButton: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const moveButton = useCallback(() => {
    const btnWidth = 120;
    const btnHeight = 60;
    
    // Safety margin to keep it visible but far
    const margin = 40;
    const maxWidth = window.innerWidth - btnWidth - margin;
    const maxHeight = window.innerHeight - btnHeight - margin;

    // Generate random coordinates
    let newX = Math.random() * maxWidth + margin;
    let newY = Math.random() * maxHeight + margin;

    // Avoid the center where the "Yes" button is
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    if (Math.abs(newX - centerX) < 150 && Math.abs(newY - centerY) < 150) {
      newX = newX < centerX ? newX - 200 : newX + 200;
      newY = newY < centerY ? newY - 200 : newY + 200;
    }

    setPosition({ 
      x: Math.max(margin, Math.min(newX, maxWidth)), 
      y: Math.max(margin, Math.min(newY, maxHeight)) 
    });
  }, []);

  const style: React.CSSProperties = position ? {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    // Longer transition and softer easing for "soft" flee
    transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
    zIndex: 100,
  } : {
    position: 'relative',
    transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
  };

  return (
    <div className="w-32 h-12 flex items-center justify-center relative">
      <button
        ref={buttonRef}
        onMouseEnter={moveButton}
        onTouchStart={(e) => {
          e.preventDefault();
          moveButton();
        }}
        onClick={(e) => {
          e.preventDefault();
          moveButton();
        }}
        style={style}
        className="px-10 py-3 bg-[#f3f4f6] text-gray-500 font-semibold text-lg rounded-full shadow-sm hover:shadow-md transition-shadow select-none touch-none border border-gray-100"
      >
        Non
      </button>
    </div>
  );
};

export default FleeButton;
