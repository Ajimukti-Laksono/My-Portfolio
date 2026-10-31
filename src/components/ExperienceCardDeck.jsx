import React, { useState, useRef, useCallback } from "react";
import { Camera, ZoomIn, RefreshCw, ChevronRight, ChevronLeft, Sparkles, Layers } from "lucide-react";

export default function ExperienceCardDeck({
  photos = [],
  language = "id",
  isDarkMode = false,
  currentColors = {},
  onSelectPhoto,
}) {
  const [deck, setDeck] = useState(() => photos.map((p, idx) => ({ ...p, originalIndex: idx })));
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeState, setSwipeState] = useState(null); // 'swiping-out' | null
  const [isHovered, setIsHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });

  // Update deck if photos prop changes
  React.useEffect(() => {
    setDeck(photos.map((p, idx) => ({ ...p, originalIndex: idx })));
  }, [photos]);

  const activePhoto = deck[0] || photos[0];

  // The Pinterest card stack shuffle animation
  const nextCard = useCallback(() => {
    if (isAnimating || deck.length <= 1) return;
    setIsAnimating(true);
    setSwipeState("swiping-out");

    // Phase 1: Top card swipes to bottom-left
    setTimeout(() => {
      setSwipeState("reordering");
      // Cycle: move first item to the end
      setDeck((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });

      // Phase 2: Slide into the rear position
      setTimeout(() => {
        setSwipeState(null);
        setIsAnimating(false);
      }, 350);
    }, 280);
  }, [isAnimating, deck.length]);

  const prevCard = useCallback(() => {
    if (isAnimating || deck.length <= 1) return;
    setIsAnimating(true);
    setDeck((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
    setTimeout(() => setIsAnimating(false), 350);
  }, [isAnimating, deck.length]);

  // Touch / Mouse Drag handlers for tactile swipe
  const handleMouseDown = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset.x < -45 || dragOffset.y > 45) {
      nextCard();
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset.x < -40 || dragOffset.y > 40) {
      nextCard();
    }
    setDragOffset({ x: 0, y: 0 });
  };

  if (!photos || photos.length === 0) return null;

  // Deck geometry configurations (Landscape Oriented Fan-out)
  const getCardTransform = (index) => {
    // If card is currently swiping out of the deck
    if (index === 0 && swipeState === "swiping-out") {
      return "translate3d(-240px, 60px, 0) rotate(-22deg) scale(0.95)";
    }

    // Interactive Drag offset on front card
    if (index === 0 && isDragging) {
      const dragRot = -8 + dragOffset.x * 0.05;
      return `translate3d(${dragOffset.x - 20}px, ${dragOffset.y}px, 0) rotate(${dragRot}deg)`;
    }

    // Resting stacked positions with subtle fan out (landscape oriented)
    const fanMultiplier = isHovered ? 1.25 : 1;
    switch (index) {
      case 0:
        return `translate3d(${-20 * fanMultiplier}px, 0px, 0) rotate(${-8 * fanMultiplier}deg) scale(1)`;
      case 1:
        return `translate3d(${6 * fanMultiplier}px, 4px, 0) rotate(${-1 * fanMultiplier}deg) scale(0.98)`;
      case 2:
        return `translate3d(${32 * fanMultiplier}px, 9px, 0) rotate(${6 * fanMultiplier}deg) scale(0.96)`;
      case 3:
      default:
        return `translate3d(${58 * fanMultiplier}px, 15px, 0) rotate(${13 * fanMultiplier}deg) scale(0.94)`;
    }
  };

  const getCardZIndex = (index) => {
    if (index === 0 && swipeState === "swiping-out") return 50;
    if (index === 0 && swipeState === "reordering") return 5;
    return 40 - index * 10;
  };

  return (
    <div className="w-full flex flex-col items-center select-none pt-1 pb-1">
      {/* Landscape Deck Stage Container */}
      <div
        className="relative w-full max-w-[420px] h-[230px] sm:h-[260px] flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUp();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // If clicked without dragging, shuffle card
          if (Math.abs(dragOffset.x) < 5 && Math.abs(dragOffset.y) < 5) {
            nextCard();
          }
        }}
      >
        {/* Render stacked cards from back to front */}
        {deck.slice(0, 4).map((item, index) => {
          const transform = getCardTransform(index);
          const zIndex = getCardZIndex(index);
          const isTop = index === 0;

          return (
            <div
              key={item.id || item.originalIndex}
              className="absolute w-[260px] sm:w-[310px] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border transition-all will-change-transform group/card"
              style={{
                transform,
                zIndex,
                transition: isDragging && isTop
                  ? "none"
                  : isAnimating
                  ? "transform 0.38s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease"
                  : "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
                borderColor: isDarkMode
                  ? isTop
                    ? "rgba(99, 102, 241, 0.45)"
                    : "rgba(255, 255, 255, 0.15)"
                  : isTop
                  ? "rgba(59, 130, 246, 0.45)"
                  : "rgba(0, 0, 0, 0.12)",
                boxShadow: isDarkMode
                  ? isTop
                    ? "0 20px 40px -8px rgba(0, 0, 0, 0.8), 0 0 25px rgba(99, 102, 241, 0.2)"
                    : "0 12px 24px -6px rgba(0, 0, 0, 0.6)"
                  : isTop
                  ? "0 20px 40px -10px rgba(0, 0, 0, 0.2), 0 0 25px rgba(59, 130, 246, 0.12)"
                  : "0 10px 20px -6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Photo Image */}
              <img
                src={item.url}
                alt={item.caption?.[language] || `Dokumentasi ${item.originalIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                loading="lazy"
              />

              {/* Glossy ambient reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-white/15 pointer-events-none" />

              {/* Card Badge Top Right */}
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-black/60 text-white border border-white/20 shadow-sm pointer-events-none">
                #{item.originalIndex + 1}
              </div>

              {/* Hover Fullscreen Zoom Button on Top Card */}
              {isTop && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectPhoto) onSelectPhoto(item);
                  }}
                  className="absolute top-3 left-3 p-2 rounded-full bg-black/60 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-md opacity-0 group-hover/card:opacity-100"
                  title={language === "en" ? "Fullscreen View" : "Perbesar Foto"}
                >
                  <ZoomIn size={14} />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Minimalist Caption & Navigation Controls */}
      <div className="w-full max-w-md mx-auto mt-3 flex flex-col items-center gap-2.5">
        {/* Caption of Current Front Card */}
        <div className="text-center px-4 min-h-[32px] flex items-center justify-center">
          <p
            className="text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 line-clamp-2"
            style={{ color: currentColors.text.primary }}
          >
            {activePhoto.caption?.[language] || activePhoto.caption?.id || activePhoto.caption}
          </p>
        </div>

        {/* Clean Circular Controls & Dots */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevCard();
            }}
            disabled={isAnimating}
            className="p-2 sm:p-2.5 rounded-full border backdrop-blur-md transition-all hover:scale-110 active:scale-90 shadow-sm disabled:opacity-40"
            style={{
              backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.9)",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
              color: currentColors.text.primary,
            }}
            title={language === "en" ? "Previous Photo" : "Foto Sebelumnya"}
          >
            <ChevronLeft size={15} />
          </button>

          {/* Minimalist Dots Indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border backdrop-blur-md"
            style={{
              backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.6)" : "rgba(241, 245, 249, 0.8)",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)",
            }}
          >
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  if (i !== activePhoto.originalIndex) nextCard();
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activePhoto.originalIndex
                    ? "w-5 bg-blue-600 shadow-sm"
                    : "w-1.5 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
                title={`Foto ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextCard();
            }}
            disabled={isAnimating}
            className="p-2 sm:p-2.5 rounded-full border backdrop-blur-md transition-all hover:scale-110 active:scale-90 shadow-sm disabled:opacity-40"
            style={{
              backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.9)",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
              color: currentColors.text.primary,
            }}
            title={language === "en" ? "Next Photo" : "Foto Selanjutnya"}
          >
            <ChevronRight size={15} />
          </button>

          {onSelectPhoto && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectPhoto(activePhoto);
              }}
              className="p-2 sm:p-2.5 rounded-full border backdrop-blur-md transition-all hover:scale-110 active:scale-90 shadow-sm text-blue-500 hover:bg-blue-500/10"
              style={{
                backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.8)" : "rgba(241, 245, 249, 0.9)",
                borderColor: isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
              }}
              title={language === "en" ? "Zoom Fullscreen" : "Perbesar Layar Penuh"}
            >
              <ZoomIn size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

