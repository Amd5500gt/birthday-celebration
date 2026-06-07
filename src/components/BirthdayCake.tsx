import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Flame, CheckCircle, Gift } from "lucide-react";

interface BirthdayCakeProps {
  onConfettiBurst: () => void;
  onHeartBurst: () => void;
  isDarkMode: boolean;
}

export default function BirthdayCake({
  onConfettiBurst,
  onHeartBurst,
  isDarkMode,
}: BirthdayCakeProps) {
  const [candlesLit, setCandlesLit] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [activeFrosting, setActiveFrosting] = useState<number | null>(null);

  const handleLightCandles = () => {
    setCandlesLit(true);
    setCandlesBlown(false);
    onHeartBurst(); // Rising heart flare on ignition!
  };

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setCandlesBlown(true);
    
    // Trigger massive celebratory bursts
    onConfettiBurst();
    setTimeout(() => {
      onHeartBurst();
    }, 300);
    setTimeout(() => {
      onConfettiBurst();
    }, 700);
  };

  const handleResetCake = () => {
    setCandlesLit(false);
    setCandlesBlown(false);
  };

  return (
    <div className={`w-full p-6 rounded-3xl ${
      isDarkMode ? "glassmorphism-dark" : "glassmorphism-light"
    } border border-pink-100 dark:border-pink-900/30 shadow-xl flex flex-col items-center justify-center select-none`}>
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-[10px] text-pink-500 font-bold uppercase tracking-wider block mb-1">
          Interactive Wish
        </span>
        <h4 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1.5">
          🎂 Light & Make a Wish
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xs mx-auto">
          Tap the buttons below to interact with your romantic cake
        </p>
      </div>

      {/* Interactive Birthday Cake Area */}
      <div className="relative h-[17rem] w-full flex flex-col items-center justify-end pb-4 pt-10">
        
        {/* CANDLES ROW */}
        <div className="flex gap-4 justify-center items-end h-[3.5rem] relative-z-10 mb-[-4px]">
          {[1, 2, 3].map((candleIndex) => (
            <div key={candleIndex} className="flex flex-col items-center relative">
              
              {/* FLAME EFFECT */}
              <AnimatePresence>
                {candlesLit && !candlesBlown && (
                  <motion.div
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: [1, 1.2, 1], y: 0 }}
                    exit={{ scale: 0, y: -10 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.6 + candleIndex * 0.1,
                    }}
                    className="absolute bottom-9 w-4 h-6 rounded-t-full bg-gradient-to-t from-orange-500 via-yellow-400 to-amber-200 flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] cursor-pointer"
                    onClick={handleBlowCandles}
                  >
                    {/* Tiny kernel flame */}
                    <div className="w-1.5 h-3 bg-white rounded-t-full mt-2" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SMOKE PUFF WHEN BLOWN OUT */}
              <AnimatePresence>
                {candlesBlown && !candlesLit && (
                  <motion.div
                    initial={{ opacity: 1, scale: 0.3, y: -5 }}
                    animate={{ opacity: 0, scale: 1.5, y: -35 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute bottom-10 text-[10px] text-slate-500 font-bold tracking-widest pointer-events-none"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CANDLE BODY */}
              <div
                className={`w-2.5 h-10 rounded-t-xs bg-gradient-to-t ${
                  candleIndex === 1
                    ? "from-pink-400 via-rose-300 to-pink-200"
                    : candleIndex === 2
                    ? "from-purple-400 via-fuchsia-300 to-purple-200"
                    : "from-pink-500 via-rose-400 to-rose-200"
                } border-t border-white border-opacity-40 shadow-md relative`}
              >
                {/* Spiral stripes on candle */}
                <div className="absolute inset-0 bg-transparent overflow-hidden rounded-t-xs">
                  <div className="w-[150%] h-[3px] bg-white opacity-40 rotate-[25deg] absolute top-1.5 left-[-4px]" />
                  <div className="w-[150%] h-[3px] bg-white opacity-40 rotate-[25deg] absolute top-5 left-[-4px]" />
                </div>
                {/* Wick */}
                <div className="absolute -top-1 left-[4px] w-[2px] h-1.5 bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>

        {/* CAKE TIER 3 (TOP - Smallest) */}
        <div className="w-[8rem] h-[2.5rem] rounded-t-xl bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 dark:from-pink-900/60 dark:to-pink-900/60 border-t border-x border-pink-300/40 shadow-md relative z-10 flex items-center justify-around px-2">
          {/* Strawberry topping */}
          <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border border-white border-opacity-30 flex items-center justify-center animate-bounce" style={{ animationDelay: "0.2s" }} />
          <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border border-white border-opacity-30 flex items-center justify-center animate-bounce" style={{ animationDelay: "0.4s" }} />
          <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border border-white border-opacity-30 flex items-center justify-center animate-bounce" style={{ animationDelay: "0.6s" }} />
          
          {/* Frosting dripping down */}
          <div className="absolute bottom-[-6px] left-3 w-4 h-2.5 rounded-b-full bg-pink-200 dark:bg-pink-900/60" />
          <div className="absolute bottom-[-6px] right-4 w-5 h-3 rounded-b-full bg-pink-200 dark:bg-pink-900/60" />
        </div>

        {/* CAKE TIER 2 (MIDDLE - Medium) */}
        <div className="w-[12rem] h-[3.2rem] rounded-t-xl bg-gradient-to-r from-rose-200 via-rose-300/60 to-rose-200 dark:from-pink-950 dark:to-pink-950 border-t border-x border-rose-300/40 shadow-lg relative z-8 flex items-center justify-around px-4">
          
          {/* Little cream decoration stars or dots */}
          {[1, 2, 4, 5, 6].map((i) => (
            <span
              key={i}
              onClick={() => setActiveFrosting(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                activeFrosting === i ? "bg-purple-500 scale-125" : "bg-white"
              } bg-opacity-75 relative cursor-pointer hover:scale-110 transition-transform`}
            >
              {activeFrosting === i && (
                <span className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-75" />
              )}
            </span>
          ))}

          {/* Drips of chocolate frosting */}
          <div className="absolute bottom-[-8px] left-6 w-5 h-4 rounded-b-full bg-rose-300 dark:bg-pink-950" />
          <div className="absolute bottom-[-8px] right-8 w-6 h-3 rounded-b-full bg-rose-300 dark:bg-pink-950" />
        </div>

        {/* CAKE TIER 1 (BASE - Largest) */}
        <div className="w-[15.5rem] h-[4rem] rounded-t-xl bg-gradient-to-r from-pink-300/45 via-rose-400/35 to-pink-300/45 dark:from-purple-950/50 dark:via-pink-950/60 dark:to-purple-950/50 border-t border-x border-pink-400/20 shadow-xl relative z-6 flex items-center justify-around px-6">
          
          {/* Sprinkles scatter */}
          <div className="flex gap-2.5 flex-wrap justify-center w-full px-2 opacity-80">
            <span className="w-1.5 h-3 rounded-full bg-yellow-300 rotate-15" />
            <span className="w-1.5 h-3 rounded-full bg-pink-500 -rotate-30" />
            <span className="w-1.5 h-3 rounded-full bg-purple-400 rotate-45" />
            <span className="w-1.5 h-3 rounded-full bg-amber-400 -rotate-12" />
            <span className="w-1.5 h-3 rounded-full bg-white rotate-12" />
            <span className="w-1.5 h-3 rounded-full bg-rose-500 -rotate-45" />
          </div>

          {/* Ribbon on the cake base */}
          <div className="absolute bottom-1.5 inset-x-0 h-2 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 opacity-80" />
        </div>

        {/* CAKE STAND Plate */}
        <div className="w-[17.5rem] h-[0.7rem] rounded-full bg-gradient-to-r from-slate-200 via-white to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.15)] relative z-5 border-b border-slate-300/30" />
        
        {/* Stand foot pedestal */}
        <div className="w-[4.5rem] h-[0.8rem] rounded-b-md bg-slate-300 dark:bg-slate-800 shadow-md" />
      </div>

      {/* INTERACTIONS & ACTIONS PANELS */}
      <div className="w-full mt-4 flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {!candlesLit && !candlesBlown ? (
            /* PHASE 1: UNLIT. Offer Light action */
            <motion.button
              key="btn-light"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleLightCandles}
              className="w-full py-3.5 rounded-full font-serif font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 text-white shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5 active:scale-98 transition-transform cursor-pointer"
            >
              <Flame className="w-4.5 h-4.5 animate-bounce text-yellow-200" />
              🔥 Light Birthday Candles
            </motion.button>
          ) : candlesLit && !candlesBlown ? (
            /* PHASE 2: LIT. Offer Blow action */
            <motion.button
              key="btn-blow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleBlowCandles}
              className="w-full py-3.5 rounded-full font-serif font-bold text-sm bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-500 text-white shadow-lg flex items-center justify-center gap-1.5 active:scale-98 transition-transform cursor-pointer animate-pulse"
            >
              <span>🌬️</span>
              Blow Out Candles & Make a Wish
            </motion.button>
          ) : (
            /* PHASE 3: BLOWN / Reset. Celebrate & Reset option */
            <motion.div
              key="success-box"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center flex flex-col gap-2.5 items-center w-full"
            >
              <div className="flex items-center gap-1.5 text-emerald-500 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-4.5 h-4.5" />
                Wish has been sent to the stars! 🌠
              </div>
              <p className="text-pink-500 text-xs font-semibold font-serif animate-bounce">
                🎉 May all your beautiful dreams come true! 💞
              </p>
              
              <button
                onClick={handleResetCake}
                className="px-6 py-2 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 border border-pink-200 dark:border-pink-900 bg-white/5 cursor-pointer active:scale-95 transition-all"
              >
                🎂 Re-light Cake
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
