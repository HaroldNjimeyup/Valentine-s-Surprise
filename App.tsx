
import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import FleeButton from './components/FleeButton';
import Celebration from './components/Celebration';
import { GoogleGenAI } from '@google/genai';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ASKING);
  const [sweetMessage, setSweetMessage] = useState<string>("YAY! 🎉");

  const handleYesClick = () => {
    setAppState(AppState.CELEBRATING);
  };

  useEffect(() => {
    const fetchMessage = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY || ""; // Utilisation d'un fallback vide
      if (!apiKey) {
        setSweetMessage("YAY! 💖");
        return;
      }

      try {
        const ai = new GoogleGenAI(apiKey);
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); 
        const result = await model.generateContent("Donne moi juste une exclamation courte comme . Un seul mot.");
        const response = await result.response;
        setSweetMessage(response.text().trim());
      } catch (error) {
        console.error("AI Error:", error);
        setSweetMessage("ENFIN ! 😍");
      }
    };
    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {appState === AppState.ASKING ? (
        <div className="z-10 text-center space-y-8 bg-white p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-md w-full animate-in fade-in zoom-in duration-500 border border-gray-50">
          <div className="relative inline-block">
             {/* Character like the one in the video */}
            <div className="w-32 h-32 bg-[#f9d5bb] rounded-full mx-auto relative flex items-center justify-center overflow-visible shadow-inner">
              <span className="text-6xl">🐱</span>
              <div className="absolute -top-2 -right-2 text-4xl animate-bounce">❤️</div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 title-font tracking-tight">
            Barbara Steylla, veux-tu être ma Valentine ?
          </h1>

          <div className="flex flex-col items-center gap-6 mt-4">
            <div className="flex flex-row items-center justify-center gap-4 w-full h-16 relative">
              <button
                onClick={handleYesClick}
                className="px-10 py-3 bg-[#e91e63] hover:bg-[#d81b60] text-white font-bold text-xl rounded-full shadow-lg shadow-pink-200 transition-all hover:scale-105 active:scale-95 z-20 min-w-[120px]"
              >
                <span className="animate-gentle-pulse">Oui</span>
              </button>
              
              <FleeButton />
            </div>
            <p className="text-gray-400 text-sm italic transition-opacity duration-1000 select-none">
              "Non" semble un peu timide... 🙈
            </p>
          </div>
        </div>
      ) : (
        <Celebration message={sweetMessage} />
      )}
    </div>
  );
};

export default App;
