import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Navigation, ChevronDown, Award } from "lucide-react";
import ParticleSystem from "./components/ParticleSystem";
import TimelineGallery from "./components/TimelineGallery";
import BirthdayCake from "./components/BirthdayCake";
import SurpriseGift from "./components/SurpriseGift";
import HeaderToggle from "./components/HeaderToggle";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [confettiTriggers, setConfettiTriggers] = useState(0);
  const [heartTriggers, setHeartTriggers] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Typewriter Subheaders Sequence
  const TYPEWRITER_PHRASES = [
    "to Dilraj, the most beautiful soul in my universe...",
    "the keeper of my sweetest secrets, Dilraj...",
    "the melody that makes my heartbeat dance...",
    "Dilraj, my absolute world, today and forever...",
  ];
  const [typewriterText, setTypewriterText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: number;
    const currentFullPhrase = TYPEWRITER_PHRASES[phraseIndex];
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setTypewriterText(currentFullPhrase.slice(0, typewriterText.length + 1));
        if (typewriterText === currentFullPhrase) {
          // Pause at end
          timer = window.setTimeout(() => setIsDeleting(true), 2500);
        } else {
          timer = window.setTimeout(handleType, 70);
        }
      } else {
        // Deleting
        setTypewriterText(currentFullPhrase.slice(0, typewriterText.length - 1));
        if (typewriterText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
          timer = window.setTimeout(handleType, 200);
        } else {
          timer = window.setTimeout(handleType, 40);
        }
      }
    };

    timer = window.setTimeout(handleType, isDeleting ? 40 : 100);
    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, phraseIndex]);

  // Handle trigger multipliers
  const triggerConfettiBurst = () => {
    setConfettiTriggers((prev) => prev + 1);
  };

  const triggerHeartBurst = () => {
    setHeartTriggers((prev) => prev + 1);
  };

  const handleScrollToTimeline = () => {
    const el = document.getElementById("story-timeline-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    triggerHeartBurst();
  };

  return (
    <div className="min-h-screen w-full transition-colors duration-500 overflow-x-hidden bg-gradient-to-br from-[#ff5ea8] via-[#8b5cf6] to-[#e8b4b8] relative">
      
      {/* Floating Decorative Elements from Design HTML */}
      <div className="absolute top-12 left-12 text-3xl opacity-45 pointer-events-none animate-float hidden md:block">❤️</div>
      <div className="absolute top-48 right-16 text-2xl opacity-35 pointer-events-none animate-pulse hidden md:block">✨</div>
      <div className="absolute bottom-24 left-1/4 text-4xl opacity-25 pointer-events-none animate-bounce hidden md:block">💖</div>
      <div className="absolute top-1/2 left-8 text-xl opacity-55 pointer-events-none animate-pulse hidden md:block">✨</div>
      <div className="absolute bottom-12 right-12 text-3xl opacity-45 pointer-events-none animate-float hidden md:block" style={{ animationDelay: "1.5s" }}>❤️</div>

      {/* WEB DESKTOP CENTERED WRAPPER (Device simulator feel for responsive focus) */}
      <div className={`w-full max-w-md mx-auto relative z-10 flex flex-col min-h-screen shadow-[0_0_80px_rgba(0,0,0,0.3)] transition-all duration-500 ${
        isDarkMode 
          ? "bg-[#0b0714]/90 border-x border-white/10 text-slate-50" 
          : "bg-white/88 border-x border-white/30 text-slate-900"
      }`}>
        
        {/* Particle System Engine */}
        <ParticleSystem
          confettiTriggers={confettiTriggers}
          heartTriggers={heartTriggers}
          isDarkMode={isDarkMode}
        />

        {/* Persistent Sticky Luxury Header */}
        <HeaderToggle
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          isMusicPlaying={isMusicPlaying}
          onMusicToggle={setIsMusicPlaying}
        />

        {/* MAIN BODY AREA */}
        <main className="flex-1 flex flex-col px-4 pb-20 relative">

          {/* SECTION 1: 🎉 HERO SECTION (HAPPY BIRTHDAY) */}
          <section className="relative min-h-[92vh] flex flex-col justify-between pt-16 pb-12 text-center select-none">
            
            {/* Top delicate sign */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex justify-center items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-pink-500"
            >
              <Sparkles className="w-4 h-4 fill-pink-500 text-pink-500" />
              <span>A Celebration for Dilraj</span>
              <Sparkles className="w-4 h-4 fill-pink-500 text-pink-500" />
            </motion.div>

            {/* Glowing Big Title Card */}
            <div className="flex-1 flex flex-col justify-center items-center relative">
              
              {/* Core glow behind heading */}
              <div className="absolute w-44 h-44 rounded-full bg-pink-500/10 dark:bg-pink-500/20 blur-3xl animate-slow-pulse" />
              
              {/* "Happy Birthday" main text */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="font-serif text-4xl xs:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 dark:from-pink-400 dark:via-fuchsia-300 dark:to-purple-400 hover:scale-102 transition-transform duration-500 cursor-pointer"
                onClick={triggerHeartBurst}
              >
                Happy Birthday,
                <br />
                Dilraj
                <span className="inline-block animate-bounce ml-1">❤️</span>
              </motion.h2>

              {/* Typewriter Subheading text */}
              <div className="h-10 mt-6 flex items-center justify-center">
                <p className="text-sm font-sans font-light italic leading-relaxed text-slate-700 dark:text-slate-300">
                  {typewriterText}
                  <span className="inline-block w-[1.5px] h-4 bg-pink-500 ml-1 animate-pulse" />
                </p>
              </div>

              {/* Magical interactive decorative heart key */}
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  triggerHeartBurst();
                  triggerConfettiBurst();
                }}
                className="mt-6 p-4 rounded-full glassmorphism-light dark:glassmorphism-dark border-pink-200/40 cursor-pointer shadow-lg hover:rotate-12 transition-transform duration-500"
              >
                <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
              </motion.div>
            </div>

            {/* Bottom glowing celebration button & scroll cue */}
            <div className="flex flex-col items-center gap-4">
              <motion.button
                id="enter-celebration-hero-btn"
                whileTap={{ scale: 0.96 }}
                onClick={handleScrollToTimeline}
                className="w-full py-4 rounded-full font-serif font-bold text-sm bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 text-white shadow-xl shadow-pink-500/10 flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer border border-white border-opacity-15"
              >
                💝 Let's Begin the Celebration
              </motion.button>

              <motion.button
                onClick={handleScrollToTimeline}
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="text-pink-500 dark:text-pink-400 p-2 flex items-center justify-center outline-none cursor-pointer"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </div>
          </section>

          {/* SECTION 2: 📸 PHOTO GALLERY & MEMORY TIMELINE */}
          <section id="story-timeline-section" className="py-12 border-t border-pink-100/10">
            <TimelineGallery isDarkMode={isDarkMode} />
          </section>

          {/* SECTION 3: 💌 BIRTHDAY MESSAGE SECTION */}
          <section className="py-12 border-t border-pink-100/10 relative">
            
            {/* Ambient luxury watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500/[0.03] text-[9rem] font-cursive select-none pointer-events-none">
              Adore
            </div>

            <div className="text-center mb-8">
              <span className="text-[10px] text-pink-500 font-bold uppercase tracking-widest block mb-1">
                Elegantly Written Message
              </span>
              <h3 className="font-serif text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center gap-1.5">
                My Heart to Yours 💌
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8 }}
              className={`p-6 rounded-3xl relative text-center border ${
                isDarkMode 
                  ? "glassmorphism-dark border-pink-900/30 shadow-xl" 
                  : "glassmorphism-light border-pink-100/50 shadow-lg"
              }`}
            >
              {/* Exquisite cursive header from Google Fonts */}
              <h4 className="font-cursive text-3.5xl text-pink-600 dark:text-pink-400 mb-4 animate-float select-none">
                Happy Birthday, Dilraj 🌟
              </h4>

              {/* Glowing decorative sparkles */}
              <div className="absolute top-4 right-4 text-pink-400 opacity-60 animate-spin" style={{ animationDuration: "12s" }}>
                ✨
              </div>
              <div className="absolute bottom-4 left-4 text-pink-400 opacity-60 animate-bounce">
                ✨
              </div>

              {/* Emotional letter body, line by line layout */}
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-light italic text-center space-y-4 pt-1 selection:bg-pink-100">
                <p>
                  "If I could bundle up every sunset we watched hand-in-hand and every soft laugh shared 
                  in the quiet hours of midnight, it still wouldn't come close to matching the sheer, glowing magic you bring to my heart."
                </p>
                <p>
                  "You make the ordinary cinematic. You treat my dreams with such infinite grace. Thank you for existing, 
                  for being my home, my anchor, and my brightest sunrise. Today, the world celebrates the day it became complete."
                </p>
                <p className="font-serif text-[10px] uppercase tracking-widest text-pink-500 font-bold not-italic pt-4 border-t border-pink-100/10 flex items-center justify-center gap-1 select-none">
                  <Heart className="w-3 h-3 fill-pink-500 text-pink-500" />
                  Your Devoted Soulmate
                </p>
              </div>
            </motion.div>
          </section>

          {/* SECTION 4: 🎂 INTERACTIVE BIRTHDAY CAKE */}
          <section className="py-12 border-t border-pink-100/10">
            <BirthdayCake
              onConfettiBurst={triggerConfettiBurst}
              onHeartBurst={triggerHeartBurst}
              isDarkMode={isDarkMode}
            />
          </section>

          {/* SECTION 5: 🎁 SURPRISE GIFT */}
          <section className="py-12 border-t border-[#ff5ea8]/10">
            <SurpriseGift
              onConfettiBurst={triggerConfettiBurst}
              onHeartBurst={triggerHeartBurst}
              isDarkMode={isDarkMode}
            />
          </section>

          {/* Premium Bottom footer sign label (Hiding path/file information, humble branding) */}
          <footer className="mt-12 text-center text-[10px] text-slate-500 select-none pb-4 relative z-10 font-sans tracking-widest uppercase">
            <span className="flex items-center justify-center gap-1.5 border-t border-pink-100/10 pt-6">
              Made with pure adoration for Dilraj 💖 June 2026
            </span>
          </footer>

        </main>
      </div>
    </div>
  );
}
