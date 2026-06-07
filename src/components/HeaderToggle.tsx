import React, { useState, useRef } from "react";
import { Sun, Moon, Volume2, VolumeX, Sparkles, Heart } from "lucide-react";

interface HeaderToggleProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
  isMusicPlaying: boolean;
  onMusicToggle: (playing: boolean) => void;
}

export default function HeaderToggle({
  isDarkMode,
  onThemeToggle,
  isMusicPlaying,
  onMusicToggle,
}: HeaderToggleProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Play a soft, pleasant bell tone
  const playBellNote = (ctx: AudioContext, freq: number, startTime: number, duration: number) => {
    try {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Sine wave for clean crystal bell tones
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      // Smooth volume attack and gorgeous exponential decay
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.08); // Attack
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration); // Long bell decay

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn("Audio Context note schedule failed", e);
    }
  };

  // Play a beautiful emotional arpeggiated loop
  const startRomanticSynthLoop = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    let bar = 0;
    
    // Luxury custom romantic chord progression notes (Frequencies in Hz)
    // C Major, G Major, A Minor, F Major crystal arpeggiations
    const loops = () => {
      const now = ctx.currentTime;
      let notes: number[] = [];

      if (bar % 4 === 0) {
        // C Major Add9 (Calming)
        notes = [261.63, 329.63, 392.00, 523.25, 587.33];
      } else if (bar % 4 === 1) {
        // G Major Sus4 -> G Major
        notes = [293.66, 392.00, 440.00, 587.33, 659.25];
      } else if (bar % 4 === 2) {
        // A Minor 7
        notes = [220.00, 329.63, 392.00, 440.00, 523.25];
      } else {
        // F Major Add9
        notes = [349.23, 440.00, 523.25, 587.33, 698.46];
      }

      // Schedule a cascading harp/bell arpeggio
      notes.forEach((freq, index) => {
        const triggerTime = now + index * 0.18; // Staggered harp stroke
        playBellNote(ctx, freq, triggerTime, 2.2); // Slower rings
      });

      // Also append a high-pitched twinkle note for magical texture
      const highPitches = [880.00, 987.77, 1046.50, 1174.66];
      const randomTwinkle = highPitches[Math.floor(Math.random() * highPitches.length)];
      playBellNote(ctx, randomTwinkle, now + 1.2, 1.8);

      bar++;
      // Repeat loop every 2.4 seconds
      synthTimerRef.current = window.setTimeout(loops, 2400);
    };

    loops();
    onMusicToggle(true);
  };

  const stopRomanticSynthLoop = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    onMusicToggle(false);
  };

  const handleMusicTrigger = () => {
    if (isMusicPlaying) {
      stopRomanticSynthLoop();
    } else {
      startRomanticSynthLoop();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-lg mx-auto">
      <div className={`mx-4 mt-3 px-4 py-3 rounded-2xl flex items-center justify-between border transition-all duration-300 ${
        isDarkMode
          ? "glassmorphism-dark bg-opacity-40 border-pink-950/40 shadow-lg text-white"
          : "glassmorphism-light bg-opacity-50 border-pink-100/60 shadow-md text-slate-800"
      }`}>
        
        {/* Branding Logo Heading */}
        <div className="flex items-center gap-1.5 select-none hover:scale-103 transition-transform">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white font-serif font-bold text-xs shadow-md">
            💓
          </div>
          <div>
            <h1 className="font-serif text-sm font-semibold tracking-tight text-pink-600 dark:text-pink-400 flex items-center gap-1">
              Dear Dilraj
              <Sparkles className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            </h1>
            <p className="text-[9px] text-slate-500 font-sans tracking-widest uppercase">
              Happy Birthday • Dilraj
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Web-Audio Romantic Bells Trigger Button */}
          <button
            id="audio-melody-toggle"
            onClick={handleMusicTrigger}
            className={`p-2 rounded-full cursor-pointer transition-all duration-300 relative ${
              isMusicPlaying
                ? "bg-pink-100 dark:bg-pink-950/50 text-pink-500"
                : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400"
            }`}
            title="Ambient Birthday Melodies"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-pink-500"></span>
                </span>
              </>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onThemeToggle}
            className="p-2 rounded-full text-pink-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            title={isDarkMode ? "Switch to Rose Gold Light" : "Switch to Deep Velvet Dark"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
