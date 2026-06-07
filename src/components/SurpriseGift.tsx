import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lock, Unlock, Mail, Sparkles, Heart } from "lucide-react";

interface SurpriseGiftProps {
  onConfettiBurst: () => void;
  onHeartBurst: () => void;
  isDarkMode: boolean;
}

export default function SurpriseGift({
  onConfettiBurst,
  onHeartBurst,
  isDarkMode,
}: SurpriseGiftProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);

  const handleUnlockAndPulse = () => {
    setIsUnlocked(true);
    onHeartBurst(); // Cute floating heart burst on unlocking
  };

  const handleOpenBox = () => {
    if (!isUnlocked) {
      // Auto-unlock first if clicked directly
      setIsUnlocked(true);
      return;
    }
    setIsOpen(true);
    onConfettiBurst(); // Massive immediate confetti highlight!
    
    // Staggered triggers
    setTimeout(() => {
      setLetterRevealed(true);
      onHeartBurst();
    }, 600);
    setTimeout(() => {
      onConfettiBurst();
    }, 1200);
  };

  const handleCloseBox = () => {
    setIsOpen(false);
    setLetterRevealed(false);
    setIsUnlocked(false);
  };

  return (
    <div className={`w-full p-6 rounded-3xl ${
      isDarkMode ? "glassmorphism-dark" : "glassmorphism-light"
    } border border-pink-100 dark:border-pink-900/30 shadow-xl flex flex-col items-center justify-center select-none overflow-hidden relative`}>
      
      {/* Title */}
      <div className="text-center mb-6 z-10 w-full">
        <span className="text-[10px] text-pink-500 font-bold uppercase tracking-wider block mb-1">
          Dilraj's Surprise Gift
        </span>
        <h4 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1.5">
          🎁 Luxury Birthday Box
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xs mx-auto">
          A secret token crafted with pure infinite adoration for Dilraj
        </p>
      </div>

      {/* Gift presentation area */}
      <div className="relative h-[20rem] w-full flex items-center justify-center pt-8 pb-4">
        
        {/* LIGHTBOX FOR REVEALED LETTER */}
        <AnimatePresence>
          {letterRevealed && (
            <motion.div
              initial={{ scale: 0.1, y: 150, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.1, y: 150, opacity: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="absolute inset-0 z-30 flex items-center justify-center p-2"
            >
              {/* Outer Parchment styling */}
              <div className="w-full h-full bg-orange-50 dark:bg-slate-950 p-5 rounded-2xl shadow-2xl border-2 border-amber-200/50 flex flex-col justify-between overflow-y-auto custom-scrollbar relative">
                
                {/* Vintage stamp watermark decoration */}
                <div className="absolute top-4 right-4 text-pink-200 dark:text-pink-950 font-cursive text-5xl rotate-12 opacity-80 pointer-events-none select-none">
                  Love
                </div>
                
                {/* Content */}
                <div>
                  <div className="flex justify-between items-center mb-2.5 pb-2 border-b border-pink-100 dark:border-pink-950/30">
                    <span className="font-serif text-xs font-semibold text-pink-500 flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-pink-500 text-pink-500 animate-pulse" />
                      For My Absolute Everything
                    </span>
                    <span className="text-[9px] uppercase font-mono text-slate-500">
                      June 7, 2026
                    </span>
                  </div>

                  {/* Elegant cursive love-letter context text */}
                  <div className="font-serif text-slate-800 dark:text-slate-200 text-xs leading-relaxed space-y-3 pt-1 text-left italic">
                    <p className="font-handwritten text-xl font-medium text-pink-600 dark:text-pink-400 not-italic">
                      My Dearest Dilraj,
                    </p>
                    <p>
                      Happy Birthday, Dilraj! Writing this still leaves me searching for words that are grand enough 
                      to measure the space you occupy in my life. You entered my world and swept the 
                      greyness away, painting every single day in brilliant shades of rose gold, soft pink, and starlight.
                    </p>
                    <p>
                      From our sweet 1st month hello to the complete circle of 12 beautiful months, every second 
                      spent hearing you laugh has been my life's most precious luxury. You are my home, my anchor, and my favorite adventure.
                    </p>
                    <p>
                      As you celebrate today, I wish you endless warmth, endless smiles, and the fulfillment of every 
                      silent dream. Know that you are adored beyond measure, and I'll keep holding your hand through all 
                      the chapters that lie ahead.
                    </p>
                    <p className="font-handwritten text-xl text-pink-600 dark:text-pink-400 text-right not-italic pt-1">
                      Love Always & Forever, ❤️
                    </p>
                  </div>
                </div>

                {/* Reset or fold back button */}
                <button
                  id="close-gift-letter-btn"
                  onClick={handleCloseBox}
                  className="w-full mt-4 py-2 rounded-xl bg-pink-100 text-pink-600 text-xs font-semibold cursor-pointer text-center hover:bg-pink-200 transition-colors"
                >
                  💝 Wrap Letter Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PHYSICAL 3D-LIKE GIFT CONTAINER */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="relative flex flex-col items-center cursor-pointer"
              onClick={isOpen ? undefined : handleOpenBox}
              whileTap={{ scale: 0.96 }}
            >
              {/* LOCK OVERLAY STATUS BADGE */}
              <div className="absolute -top-6 z-20 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {!isUnlocked ? (
                    <motion.div
                      key="locked"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlockAndPulse();
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-serif font-bold text-[10px] flex items-center gap-1.5 shadow-md border border-white/20 animate-pulse cursor-pointer"
                    >
                      <Lock className="w-3 h-3 text-yellow-300" />
                      Locked • Tap to Unlock
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unlocked"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-serif font-bold text-[10px] flex items-center gap-1.5 shadow-md border border-white/20"
                    >
                      <Unlock className="w-3 h-3 text-white" />
                      Unlocked • Click Box to Open
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LID (Gears to open upward/away) */}
              <motion.div
                animate={
                  isUnlocked
                    ? {
                        y: [0, -3, 0],
                        rotate: [0, 1, -1, 0],
                        transition: { repeat: Infinity, duration: 2.2 },
                      }
                    : {}
                }
                className="w-[10rem] h-[2.5rem] rounded-md bg-gradient-to-r from-pink-500 via-pink-400 to-purple-600 border border-t border-glass shadow-md relative z-10 flex items-center justify-center select-none"
              >
                {/* Gold Bow on lid top center */}
                <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  <div className="flex gap-1">
                    {/* Left Bow Loop */}
                    <div className="w-6 h-5 rounded-full border-[3px] border-amber-300 bg-amber-400 rotate-[-15deg] shadow-sm transform origin-right" />
                    {/* Right Bow Loop */}
                    <div className="w-6 h-5 rounded-full border-[3px] border-amber-300 bg-amber-400 rotate-[15deg] shadow-sm transform origin-left" />
                  </div>
                  {/* Bow knot center */}
                  <div className="w-4 h-4 rounded-full bg-amber-500 border border-white/30 absolute top-[8px]" />
                </div>

                {/* Ribbon Band horizontal cross */}
                <div className="w-full h-4 bg-amber-300 absolute inset-y-0 opacity-90" />
                {/* Ribbon Band vertical cross */}
                <div className="w-4 h-full bg-amber-300 absolute inset-x-0 mx-auto opacity-90" />
              </motion.div>

              {/* BOX BOTTOM COMPONENT */}
              <div className="w-[9.2rem] h-[8.5rem] bg-gradient-to-b from-purple-700 via-pink-600 to-rose-500 rounded-b-xl border-x border-b border-deep-pink shadow-2xl relative overflow-hidden flex items-center justify-center">
                {/* Highlight lines */}
                <div className="absolute inset-0 bg-transparent opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-transparent" />
                
                {/* Ribbon Band crossing center */}
                <div className="w-4 h-full bg-amber-300 absolute" />
                <div className="w-full h-4 bg-amber-300 absolute" />

                {/* Sparkling hearts pattern */}
                <span className="absolute bottom-2.5 left-2 text-rose-300 text-xs opacity-60">💖</span>
                <span className="absolute top-2.5 right-2 text-rose-300 text-xs opacity-60">✨</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="w-full mt-2 select-none">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <button
              id="unlock-gift-box-btn"
              onClick={handleUnlockAndPulse}
              className="w-full py-3 rounded-full font-serif font-bold text-xs border border-pink-400/40 text-pink-500 flex items-center justify-center gap-1.5 hover:bg-pink-500/10 active:scale-98 transition-all cursor-pointer"
            >
              🔐 Tap to Unlock Premium Gift
            </button>
          ) : !isOpen ? (
            <button
              id="open-gift-box-btn"
              onClick={handleOpenBox}
              className="w-full py-3 rounded-full font-serif font-bold text-xs bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 text-white flex items-center justify-center gap-1.5 animate-slow-pulse cursor-pointer"
            >
              🎁 Click to Unwrap Ribbon
            </button>
          ) : (
            <div className="text-center font-serif text-xs text-pink-500 font-bold flex items-center justify-center gap-1">
              💌 Read with romantic love... ❤️
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
