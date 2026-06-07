import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, Heart, Sparkles, X, Layers } from "lucide-react";
import { MemoryItem } from "../types";

const asset = (file: string) => new URL(`../images/${file}`, import.meta.url).href;

const MEMORIES: MemoryItem[] = [
  {
    id: 1,
    monthTitle: "1st Month Together",
    dateStr: "The First Hello • July",
    caption: "Where it all began. That first nervous smile, the warmth of your hand, and a spark that started our beautiful journey. Every moment since has been filled with your grace.",
    localPath: asset("1.jpg"),
  },
  {
    id: 3,
    monthTitle: "3rd Month Together",
    dateStr: "Endless Laughter • September",
    caption: "Late-night coffee dates and shared secrets. Getting to know every detail of your beautiful, glowing soul. Your laughter rapidly became my absolute favorite melody.",
    localPath: asset("3.jpg"),
  },
  {
    id: 5,
    monthTitle: "5th Month Together",
    dateStr: "Golden Sunsets • November",
    caption: "Our first mini-getaway. Watching the sunset paint the sky in shades of gold and rose, realizing my world is infinitely brighter and softer because you are in it.",
    localPath: asset("5.jpg"),
  },
  {
    id: 6,
    monthTitle: "6th Month Together",
    dateStr: "Half a Year of Magic • December",
    caption: "Half a year of sweet memories, comforting hugs, inside jokes, and discovering that my favorite place in the entire world is safely wrapped inside your embrace.",
    localPath: asset("6.jpg"),
  },
  {
    id: 7,
    monthTitle: "7th Month Together",
    dateStr: "Dancing in the Rain • January",
    caption: "Underneath the warm neon streetlights, laughing and holding each other close. Turning a simple walk in the cold rain into a cinematic romantic dream we'll never forget.",
    localPath: asset("7.jpg"),
  },
  {
    id: 8,
    monthTitle: "8th Month Together",
    dateStr: "Underneath the Stars • February",
    caption: "A cozy evening of cooking together, whispering under the stars, sharing warm wishes and realizing how incredibly blessed I am to have discovered my soulmate.",
    localPath: asset("8.jpg"),
  },
  {
    id: 10,
    monthTitle: "10th Month Together",
    dateStr: "Autumn Warmth • April",
    caption: "Strolling hand-in-hand through falling leaves, wrapping fingers inside warm coat pockets, feeling a love deeper and more secure than anything I've ever known.",
    localPath: asset("10.jpg"),
  },
  {
    id: 12,
    monthTitle: "12th Month Together",
    dateStr: "One Year & Beyond • June",
    caption: "One complete, beautiful trip around the sun with Dilraj. 365 days of loving you, and I still fall deeper for you each day. Happy Birthday, my absolute world, my everything!",
    localPath: asset("12.jpg"),
  }
];

// Reusable Image Loader for local gallery images
function SafeImage({
  localPath,
  alt,
  className,
}: {
  localPath: string;
  alt: string;
  className: string;
}) {
  return (
    <img
      src={localPath}
      alt={alt}
      className={`${className} object-cover`}
      referrerPolicy="no-referrer"
    />
  );
}

export default function TimelineGallery() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryMode, setGalleryMode] = useState<"swipe" | "list">("swipe");

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % MEMORIES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
  };

  const handleLightboxNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % MEMORIES.length);
    }
  };

  const handleLightboxPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + MEMORIES.length) % MEMORIES.length);
    }
  };

  return (
    <div className="w-full">
      {/* Gallery Header with Modern Toggle */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <h3 className="font-serif text-xl font-medium tracking-tight text-pink-600 flex items-center gap-2">
            📸 Memory Album
          </h3>
          <p className="text-xs text-slate-600">
            A beautiful catalog of our golden year together
          </p>
        </div>

        {/* Swipe or List switcher */}
        <button
          id="gallery-view-switch"
          onClick={() => setGalleryMode((prev) => (prev === "swipe" ? "list" : "swipe"))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium glassmorphism-light transition-all duration-300 hover:scale-105 select-none text-slate-800 border border-pink-100"
        >
          <Layers className="w-3.5 h-3.5 text-pink-500" />
          {galleryMode === "swipe" ? "Vertical Timeline" : "Interactive Cards"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {galleryMode === "swipe" ? (
          /* CARD DECK VIEW (Highly Interactive glassmorphism Swipe/Click Cards) */
          <motion.div
            key="swipe-deck"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="relative w-full overflow-hidden"
          >
            {/* Carousel Core */}
            <div className="relative h-[25rem] w-full flex items-center justify-center">
              {MEMORIES.map((memory, index) => {
                // Calculate card offsets for stacked stack effect
                let offset = index - activeSlide;
                if (offset < 0) offset += MEMORIES.length;
                if (offset > MEMORIES.length - 1) offset -= MEMORIES.length;

                // Only render active, next, and previous for cleanliness
                const isCurrent = offset === 0;
                const isNext = offset === 1;
                const isPrev = offset === MEMORIES.length - 1;

                if (!isCurrent && !isNext && !isPrev) return null;

                const zIndex = isCurrent ? 30 : isNext ? 20 : 10;
                const scale = isCurrent ? 1 : isNext ? 0.9 : 0.8;
                const translateX = isCurrent ? 0 : isNext ? 120 : -120;
                const rotate = isCurrent ? 0 : isNext ? 8 : -8;
                const opacity = isCurrent ? 1 : isNext ? 0.45 : 0.15;

                return (
                  <motion.div
                    key={memory.id}
                    style={{ zIndex }}
                    animate={{
                      scale,
                      x: translateX,
                      rotate,
                      opacity,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 18,
                    }}
                    onClick={() => {
                      if (isCurrent) {
                        setLightboxIndex(index);
                      } else if (isNext) {
                        nextSlide();
                      } else if (isPrev) {
                        prevSlide();
                      }
                    }}
                    onTouchStart={() => {}} // simple tap responsive hook
                    className="absolute w-[18rem] xs:w-[20rem] h-[22rem] rounded-3xl cursor-pointer select-none overflow-hidden glassmorphism-light bg-opacity-25 backdrop-blur-md p-4 flex flex-col justify-between shadow-2xl border border-white border-opacity-30"
                  >
                    {/* Rose Gold / Pink Glowing Card Border */}
                    <div className="absolute inset-0 border border-pink-400 border-opacity-10 rounded-3xl pointer-events-none" />

                    {/* Image Area */}
                    <div className="relative w-full h-[12.5rem] bg-pink-100 rounded-2xl overflow-hidden shadow-inner group">
                      <SafeImage
                        localPath={memory.localPath}
                        alt={memory.monthTitle}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Sparkler sparkles decor */}
                      <span className="absolute top-2.5 right-2.5 bg-white bg-opacity-70 p-1.5 rounded-full text-pink-500 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                      </span>

                      {/* Hover / Tap to zoom indicator */}
                      <div className="absolute inset-x-0 bottom-0 py-1.5 bg-black bg-opacity-40 backdrop-blur-xs flex items-center justify-center text-white text-[10px] font-medium gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3" /> Tap to Full View
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 mt-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-serif text-md font-semibold text-pink-600">
                            {memory.monthTitle}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                            {memory.dateStr.split(" • ")[1]}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-3 mt-1.5 font-sans leading-relaxed italic">
                          "{memory.caption.slice(0, 100)}..."
                        </p>
                      </div>

                      {/* Card Footer with Heart Icon */}
                      <div className="flex items-center justify-between text-[11px] text-pink-400">
                        <span className="flex items-center gap-1 font-semibold">
                          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                          Forever
                        </span>
                        <span className="text-slate-500">
                          {index + 1} of {MEMORIES.length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Slighters */}
            <div className="flex justify-center items-center gap-6 mt-1 mb-4 select-none">
              <button
                id="gallery-prev-btn"
                onClick={prevSlide}
                className="p-2 py-2 rounded-full glassmorphism-light text-pink-500 shadow-md transition-all active:scale-95 hover:bg-pink-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5">
                {MEMORIES.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === i ? "w-5 bg-pink-500" : "w-1.5 bg-pink-200"
                    }`}
                  />
                ))}
              </div>

              <button
                id="gallery-next-btn"
                onClick={nextSlide}
                className="p-2 py-2 rounded-full glassmorphism-light text-pink-500 shadow-md transition-all active:scale-95 hover:bg-pink-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction helper */}
            <p className="text-center text-[10px] text-slate-500 tracking-wide pb-2 italic">
              ✨ Swipe or tap side cards to flick through memories ✨
            </p>
          </motion.div>
        ) : (
          /* VERTICAL DETAILED SCROLL-REVEAL TIMELINE */
          <motion.div
            key="list-timeline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col relative pl-4 pr-1 mt-2"
          >
            {/* Soft pink alignment vertical line */}
            <div className="absolute top-1 bottom-6 left-6.5 w-[2px] bg-gradient-to-b from-pink-300 via-rose-300 to-purple-400 rounded-full" />

            {MEMORIES.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => setLightboxIndex(index)}
                className="relative mb-8 pl-10 cursor-pointer group"
              >
                {/* Heart Thread Node Indicator */}
                <div className="absolute left-4.5 top-1.5 w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center border-2 border-pink-400 shadow-md group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 group-hover:fill-white group-hover:text-white transition-all animate-pulse" />
                </div>

                {/* Glassmorphism Timeline Content Card */}
                <div className="p-4 rounded-3xl glassmorphism-light bg-opacity-40 border border-pink-100 shadow-lg group-hover:border-pink-300 transition-all duration-300"
                >
                  {/* Photo area */}
                  <div className="relative w-full h-[12.5rem] rounded-xl overflow-hidden mb-3 bg-pink-50">
                    <SafeImage
                      localPath={memory.localPath}
                      alt={memory.monthTitle}
                      className="w-full h-80 object-cover group-hover:scale-103 transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <span className="text-[9px] bg-pink-500 text-white rounded-full px-2 py-0.5 font-bold flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-2.5 h-2.5 fill-white" />
                        {memory.dateStr.split(" • ")[1]}
                      </span>
                    </div>
                  </div>

                  {/* Text labels */}
                  <span className="text-[10px] text-pink-500 font-bold uppercase tracking-widest block mb-1">
                    {memory.monthTitle}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-slate-800 mb-2">
                    {memory.dateStr}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans italic">
                    "{memory.caption}"
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN PREMIUM LIGHTBOX PREVIEW */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            id="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4"
          >
            {/* Header / Close button inside Lightbox */}
            <div className="flex justify-between items-center text-white pt-2 select-none">
              <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold font-sans flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                Memory {lightboxIndex + 1} of {MEMORIES.length}
              </span>
              <button
                id="lightbox-close-btn"
                onClick={() => setLightboxIndex(null)}
                className="p-2 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Image Container with Swipes / Arrow Keys */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Left Arrow Button */}
              <button
                id="lightbox-prev-btn"
                onClick={handleLightboxPrev}
                className="absolute left-2 z-60 p-2.5 py-2.5 bg-black/50 text-pink-400 rounded-full hover:bg-white/10 border border-white/15 transition-all outline-none"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="max-w-full max-h-[75vh]"
              >
                <SafeImage
                  localPath={MEMORIES[lightboxIndex].localPath}
                  alt={MEMORIES[lightboxIndex].monthTitle}
                  className="rounded-2xl max-w-full max-h-[60vh] object-contain shadow-[0_0_50px_rgba(255,94,168,0.3)] select-none border border-white/20"
                />
              </motion.div>

              {/* Right Arrow Button */}
              <button
                id="lightbox-next-btn"
                onClick={handleLightboxNext}
                className="absolute right-2 z-60 p-2.5 py-2.5 bg-black/50 text-pink-400 rounded-full hover:bg-white/10 border border-white/15 transition-all outline-none"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption Section inside Lightbox */}
            <div className="text-center px-4 pb-8 select-none max-w-lg mx-auto">
              <h4 className="font-serif text-lg font-bold text-pink-400 mb-1 leading-snug">
                ❤️ {MEMORIES[lightboxIndex].monthTitle}
              </h4>
              <p className="text-[11px] font-semibold text-pink-300 tracking-wider uppercase mb-2">
                {MEMORIES[lightboxIndex].dateStr}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto select-none italic font-sans font-light">
                "{MEMORIES[lightboxIndex].caption}"
              </p>

              <span className="inline-block mt-4 text-[10px] text-pink-500/80 uppercase tracking-widest font-semibold border-t border-pink-500/20 pt-2.5">
                💖 Our Beautiful Legacy 💖
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
