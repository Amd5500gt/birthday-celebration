import React, { useEffect, useState } from "react";
import { FloatingHeart, SparkleItem, ConfettiParticle } from "../types";

interface ParticleSystemProps {
  confettiTriggers: number; // Increment to trigger a massive confetti burst
  heartTriggers: number; // Increment to trigger a heart burst
  isDarkMode: boolean;
}

export default function ParticleSystem({
  confettiTriggers,
  heartTriggers,
  isDarkMode,
}: ParticleSystemProps) {
  const [ambientHearts, setAmbientHearts] = useState<FloatingHeart[]>([]);
  const [ambientSparkles, setAmbientSparkles] = useState<SparkleItem[]>([]);
  const [burstConfetti, setBurstConfetti] = useState<ConfettiParticle[]>([]);
  const [burstHearts, setBurstHearts] = useState<FloatingHeart[]>([]);

  // Generate continuous ambient hearts
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientHearts((prev) => {
        const id = Date.now() + Math.random();
        const newHeart: FloatingHeart = {
          id,
          x: Math.random() * 100, // percentage of viewport width
          size: Math.random() * 16 + 10, // 10px to 26px
          color: getRandomRomanticColor(),
          speed: Math.random() * 6 + 6, // 6s to 12s
          delay: 0,
        };
        // Limit total hearts to avoid performance issues
        return [...prev.slice(-15), newHeart];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // Generate continuous ambient sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setAmbientSparkles((prev) => {
        const id = Date.now() + Math.random();
        const newSparkle: SparkleItem = {
          id,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 4,
          color: getRandomSparkleColor(),
          delay: Math.random() * 2,
        };
        return [...prev.slice(-20), newSparkle];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Trigger massive confetti explosion
  useEffect(() => {
    if (confettiTriggers === 0) return;

    const count = 80;
    const colors = ["#ff5ea8", "#e8b4b8", "#8b5cf6", "#ffd700", "#ff4081", "#ffffff"];
    const newConfetti: ConfettiParticle[] = [];

    for (let i = 0; i < count; i++) {
        const id = Date.now() + i + Math.random();
        newConfetti.push({
          id,
          x: 30 + Math.random() * 40, // Centered range 30% to 70%
          y: 60, // Sourced from item level
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * 360,
          velocity: Math.random() * 15 + 10,
          size: Math.random() * 8 + 6,
        });
    }

    setBurstConfetti((prev) => [...prev, ...newConfetti]);

    // Cleanup burst confetti after animation
    const timer = setTimeout(() => {
      setBurstConfetti((prev) => prev.filter((p) => p.id < Date.now() - 4000));
    }, 4100);

    return () => clearTimeout(timer);
  }, [confettiTriggers]);

  // Trigger romantic heart burst
  useEffect(() => {
    if (heartTriggers === 0) return;

    const count = 25;
    const newHearts: FloatingHeart[] = [];

    for (let i = 0; i < count; i++) {
      const id = Date.now() + i + Math.random();
      newHearts.push({
        id,
        x: 20 + Math.random() * 60, // Spanned middle width
        size: Math.random() * 20 + 12,
        color: getRandomRomanticColor(),
        speed: Math.random() * 3 + 2, // Quicker burst upward
        delay: Math.random() * 0.4,
      });
    }

    setBurstHearts((prev) => [...prev, ...newHearts]);

    const timer = setTimeout(() => {
      setBurstHearts((prev) => prev.filter((h) => h.id < Date.now() - 3000));
    }, 3100);

    return () => clearTimeout(timer);
  }, [heartTriggers]);

  // Get random delicate romantic color
  function getRandomRomanticColor() {
    const romanticColors = [
      "#ff5ea8", // Intense soft pink
      "#e8b4b8", // Rose gold
      "#f472b6", // Light pink
      "#db2777", // Deep rose
      "#ec4899", // Vivid pink
      "#c084fc", // Pastel purp
    ];
    return romanticColors[Math.floor(Math.random() * romanticColors.length)];
  }

  // Get random bright glowing sparkle shade
  function getRandomSparkleColor() {
    return Math.random() > 0.4 ? "#ffd700" : "#ffffff";
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Ambient Rising Hearts */}
      {ambientHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-0 text-romantic-pink opacity-0"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            color: heart.color,
            filter: "drop-shadow(0 0 6px rgba(255, 94, 168, 0.4))",
            animation: `riseUp ${heart.speed}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
          }}
        >
          ❤️
        </span>
      ))}

      {/* Ambient Pulsating Sparkles */}
      {ambientSparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="absolute opacity-0"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            fill: sparkle.color,
            filter: `drop-shadow(0 0 4px ${sparkle.color})`,
            animation: `sparkleFade 2.5s ease-in-out forwards`,
            animationDelay: `${sparkle.delay}s`,
          }}
          viewBox="0 0 24 24"
        >
          <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
        </svg>
      ))}

      {/* Burst Confetti Particles */}
      {burstConfetti.map((particle) => (
        <span
          key={particle.id}
          className="absolute rounded-full opacity-100"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 8px ${particle.color}`,
            transform: `translate3d(0,0,0)`,
            animation: `confettiFly ${1.5 + Math.random() * 2}s cubic-bezier(0.1, 1, 0.1, 1) forwards`,
            "--angle": `${particle.angle}deg`,
            "--velocity": `${particle.velocity}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Burst Rising Hearts (Action-based) */}
      {burstHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-1/4 text-center select-none"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            color: heart.color,
            filter: "drop-shadow(0 0 8px rgba(255, 94, 168, 0.6))",
            opacity: 0,
            animation: `riseUpFast ${heart.speed}s cubic-bezier(0.15, 0.85, 0.45, 1) forwards`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {Math.random() > 0.5 ? "💖" : "❤️"}
        </span>
      ))}

      {/* CSS Styles injection for exact and efficient animations */}
      <style>{`
        @keyframes riseUp {
          0% {
            transform: translateY(100px) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) scale(1.1) translateX(${Math.random() > 0.5 ? 40 : -40}px);
            opacity: 0;
          }
        }

        @keyframes riseUpFast {
          0% {
            transform: translateY(50px) scale(0.3) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-80vh) scale(1.3) rotate(${Math.random() > 0.5 ? 25 : -25}deg);
            opacity: 0;
          }
        }

        @keyframes sparkleFade {
          0% {
            opacity: 0;
            transform: scale(0.2) rotate(0deg);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.1) rotate(90deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.2) rotate(180deg);
          }
        }

        @keyframes confettiFly {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate3d(
              calc(cos(var(--angle)) * var(--velocity) * 12),
              calc(sin(var(--angle)) * var(--velocity) * 8 + 350px),
              0
            ) rotate(${Math.random() * 720}deg) scale(0.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
