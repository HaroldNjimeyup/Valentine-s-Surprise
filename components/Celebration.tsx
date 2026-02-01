
import React, { useEffect } from 'react';
import canvasConfetti from 'https://cdn.skypack.dev/canvas-confetti';

interface CelebrationProps {
  message: string;
}

const Celebration: React.FC<CelebrationProps> = ({ message }) => {
  useEffect(() => {
    // Initial big explosion
    const end = Date.now() + 5000;
    const colors = ['#e91e63', '#ff69b4', '#ffffff', '#ff0000'];

    const frame = () => {
      canvasConfetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle']
      });
      canvasConfetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ['circle']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    // Heart explosion using shapes
    const scalar = 2;
    const heart = canvasConfetti.shapeFromText({ text: '❤️', scalar });

    canvasConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      shapes: [heart, 'circle'],
      colors: colors
    });

    frame();
  }, []);

  return (
    <div className="z-50 flex flex-col items-center justify-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 w-full max-w-2xl px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-[#e91e63] title-font drop-shadow-sm">
          {message}
        </h1>
        <p className="text-xl text-gray-600 font-medium italic">Tu as fait de moi l'homme le plus heureux ! ❤️</p>
      </div>

      {/* Gif Container with specific dimensions: 500x226px */}
      <div 
        className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white ring-1 ring-pink-100 bg-white flex items-center justify-center"
        style={{ width: 'min(100%, 500px)', height: '226px' }}
      >
        <img
          src="https://usagif.com/wp-content/uploads/funny-celebrate-56.gif"
          alt="Celebration GIF"
          className="w-full h-full object-cover"
          style={{ width: '500px', height: '226px' }}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-3 text-3xl animate-bounce">
          <span>💖</span><span>🌸</span><span>✨</span><span>🍭</span>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-2 bg-pink-100 text-pink-600 rounded-full font-bold hover:bg-pink-200 transition-all hover:scale-105 active:scale-95 text-sm shadow-sm"
        >
          Revoir mon amour ❤️
        </button>
      </div>
    </div>
  );
};

export default Celebration;
