import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ArrowUpRight,
  Eye,
  X,
} from "lucide-react";

export default function DesignArcSlider({
  desktopProjects = [],
  mobileProjects = [],
  language = "id",
  isDarkMode = false,
  currentColors = {},
  t,
}) {
  // Determine initial model: desktop vs mobile
  const [model, setModel] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return "mobile";
    }
    return "desktop";
  });

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [selectedModalProject, setSelectedModalProject] = useState(null);

  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, rotation: 0, hasStarted: false });
  const touchDirectionRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastTimeRef = useRef(performance.now());
  const navTimerRef = useRef(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Active items based on chosen model
  const activeItems = useMemo(() => {
    return model === "desktop" ? desktopProjects : mobileProjects;
  }, [model, desktopProjects, mobileProjects]);

  const count = activeItems.length || 1;

  // Geometry configuration for Desktop (Landscape) vs Mobile (Portrait)
  const config = useMemo(() => {
    const isMobileScreen = windowWidth < 640;
    const isTabletScreen = windowWidth >= 640 && windowWidth < 1024;

    if (model === "desktop") {
      // Landscape 16:10 Cards
      if (isMobileScreen) {
        return {
          cardWidth: 260,
          cardHeight: 165,
          radius: 540,
          stepAngle: 28,
          stageHeight: 280,
          maxFadeAngle: 75,
        };
      } else if (isTabletScreen) {
        return {
          cardWidth: 320,
          cardHeight: 200,
          radius: 720,
          stepAngle: 24,
          stageHeight: 330,
          maxFadeAngle: 70,
        };
      } else {
        return {
          cardWidth: 390,
          cardHeight: 245,
          radius: 880,
          stepAngle: 22,
          stageHeight: 370,
          maxFadeAngle: 68,
        };
      }
    } else {
      // Portrait 9:16 Cards (Pinterest Reels style)
      if (isMobileScreen) {
        return {
          cardWidth: 160,
          cardHeight: 284,
          radius: 460,
          stepAngle: 22,
          stageHeight: 340,
          maxFadeAngle: 72,
        };
      } else if (isTabletScreen) {
        return {
          cardWidth: 185,
          cardHeight: 330,
          radius: 620,
          stepAngle: 19,
          stageHeight: 390,
          maxFadeAngle: 66,
        };
      } else {
        return {
          cardWidth: 215,
          cardHeight: 380,
          radius: 760,
          stepAngle: 17,
          stageHeight: 440,
          maxFadeAngle: 64,
        };
      }
    }
  }, [model, windowWidth]);

  // Virtual items expanded for seamless continuous circular loop
  const virtualSlides = useMemo(() => {
    if (!activeItems || activeItems.length === 0) return [];

    const repeats = Math.max(3, Math.ceil(360 / (count * config.stepAngle)));
    const slides = [];

    for (let r = 0; r < repeats; r++) {
      activeItems.forEach((item, index) => {
        const slotIndex = r * count + index;
        slides.push({
          ...item,
          virtualId: `${item.id}-v${r}`,
          baseIndex: index,
          slotAngle: slotIndex * config.stepAngle,
        });
      });
    }

    return slides;
  }, [activeItems, count, config.stepAngle]);

  const totalAngleSpan = virtualSlides.length * config.stepAngle;

  // Active slide index at center apex
  const activeSlideIndex = useMemo(() => {
    if (count === 0) return 0;
    const normalized = ((-rotation % (count * config.stepAngle)) + count * config.stepAngle) % (count * config.stepAngle);
    const rawIdx = Math.round(normalized / config.stepAngle) % count;
    return (rawIdx + count) % count;
  }, [rotation, count, config.stepAngle]);

  const currentActiveProject = activeItems[activeSlideIndex] || activeItems[0];

  // Smooth auto-drift matching the website slider (stops ONLY when hovering directly on cards or dragging)
  useEffect(() => {
    let animId;
    lastTimeRef.current = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      if (!isHoveredRef.current && !isDraggingRef.current && !isNavigating) {
        // Constant organic speed identical to website slider
        setRotation((r) => r - 2.6 * dt);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isNavigating, model]);

  // Reset rotation gracefully when switching models
  const handleModelChange = (newModel) => {
    if (newModel === model) return;
    setModel(newModel);
    setRotation(0);
    setIsNavigating(true);
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => setIsNavigating(false), 500);
  };

  // Navigate to slide index
  const snapToSlide = useCallback((targetIndex) => {
    setIsNavigating(true);
    if (navTimerRef.current) clearTimeout(navTimerRef.current);

    const currentNorm = ((-rotation % (count * config.stepAngle)) + count * config.stepAngle) % (count * config.stepAngle);
    const currentIdx = Math.round(currentNorm / config.stepAngle) % count;
    let diff = targetIndex - currentIdx;

    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    setRotation((prev) => prev - diff * config.stepAngle);
    navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
  }, [rotation, count, config.stepAngle]);

  const nextSlide = useCallback(() => {
    setIsNavigating(true);
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    setRotation((prev) => prev - config.stepAngle);
    navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
  }, [config.stepAngle]);

  const prevSlide = useCallback(() => {
    setIsNavigating(true);
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    setRotation((prev) => prev + config.stepAngle);
    navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
  }, [config.stepAngle]);

  // Mouse Drag Handlers with 5px threshold (NOT hyper-sensitive, matches website slider)
  const handleMouseDown = (e) => {
    dragStartRef.current = {
      x: e.clientX,
      rotation,
      hasStarted: false,
    };
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const dx = e.clientX - dragStartRef.current.x;

    if (!dragStartRef.current.hasStarted) {
      if (Math.abs(dx) > 5) {
        dragStartRef.current.hasStarted = true;
        isDraggingRef.current = true;
        setIsDragging(true);
        setIsNavigating(false);
        if (navTimerRef.current) clearTimeout(navTimerRef.current);
      } else {
        return;
      }
    }

    // Gentle sensitivity matching website slider
    const sensitivity = windowWidth < 640 ? 0.16 : 0.11;
    setRotation(dragStartRef.current.rotation + dx * sensitivity);
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);

      // Smoothly snap to nearest slide using cubic-bezier
      setIsNavigating(true);
      const nearestSlot = Math.round(rotation / config.stepAngle) * config.stepAngle;
      setRotation(nearestSlot);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
    }
    dragStartRef.current.hasStarted = false;
  };

  // Touch Swipe Handlers with intelligent direction lock (allows normal vertical page scrolls)
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchDirectionRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      isHorizontal: null,
    };
    dragStartRef.current = {
      x: touch.clientX,
      rotation,
      hasStarted: false,
    };
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const dx = touch.clientX - touchDirectionRef.current.startX;
    const dy = touch.clientY - touchDirectionRef.current.startY;

    if (touchDirectionRef.current.isHorizontal === null) {
      if (Math.abs(dx) > 7 || Math.abs(dy) > 7) {
        touchDirectionRef.current.isHorizontal = Math.abs(dx) > Math.abs(dy);
      } else {
        return;
      }
    }

    // If vertical scroll, do not interfere
    if (touchDirectionRef.current.isHorizontal === false) {
      return;
    }

    if (!isDraggingRef.current) {
      isDraggingRef.current = true;
      setIsDragging(true);
      setIsNavigating(false);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    }

    const sensitivity = windowWidth < 640 ? 0.15 : 0.1;
    setRotation(dragStartRef.current.rotation + dx * sensitivity);
  };

  const handleTouchEnd = () => {
    touchDirectionRef.current = null;

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      setIsNavigating(true);
      const nearestSlot = Math.round(rotation / config.stepAngle) * config.stepAngle;
      setRotation(nearestSlot);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
    }
    dragStartRef.current.hasStarted = false;
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* ======================================================== */}
      {/* MODEL SWITCHER: [ Desktop (Landscape) ] vs [ Mobile (Portrait) ] */}
      {/* Refined: Smaller than Website/Desain + Elegant Light Gray (Abu Muda) */}
      {/* ======================================================== */}
      <div className="flex items-center justify-center mb-5 sm:mb-6">
        <div
          className="relative inline-flex p-1 rounded-xl border backdrop-blur-md shadow-xs"
          style={{
            backgroundColor: isDarkMode
              ? "rgba(15, 23, 42, 0.6)"
              : "rgba(248, 250, 252, 0.9)",
            borderColor: isDarkMode
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(0, 0, 0, 0.06)",
          }}
        >
          {/* Animated Sliding Pill (Abu Muda / Light Gray Tone) */}
          <div
            className="absolute top-1 bottom-1 rounded-lg shadow-xs transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              backgroundColor: isDarkMode ? "rgba(51, 65, 85, 0.85)" : "#e2e8f0",
              left: model === "desktop" ? "4px" : "calc(50% + 2px)",
              width: "calc(50% - 6px)",
            }}
          />

          {/* Option 1: Desktop (Landscape) */}
          <button
            onClick={() => handleModelChange("desktop")}
            className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
              model === "desktop"
                ? isDarkMode
                  ? "text-white"
                  : "text-slate-800"
                : isDarkMode
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Monitor size={13} className={model === "desktop" ? "text-slate-700 dark:text-slate-200" : "opacity-70"} />
            <span>{language === "en" ? "Desktop (Landscape)" : "Desktop (Landscape)"}</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                model === "desktop"
                  ? isDarkMode
                    ? "bg-slate-600 text-slate-100"
                    : "bg-slate-300/90 text-slate-800"
                  : isDarkMode
                  ? "bg-white/5 text-slate-500"
                  : "bg-black/5 text-slate-400"
              }`}
            >
              5
            </span>
          </button>

          {/* Option 2: Mobile (Portrait) */}
          <button
            onClick={() => handleModelChange("mobile")}
            className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors duration-200 ${
              model === "mobile"
                ? isDarkMode
                  ? "text-white"
                  : "text-slate-800"
                : isDarkMode
                ? "text-slate-400 hover:text-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Smartphone size={13} className={model === "mobile" ? "text-slate-700 dark:text-slate-200" : "opacity-70"} />
            <span>{language === "en" ? "Mobile (Portrait)" : "Mobile (Portrait)"}</span>
            <span
              className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                model === "mobile"
                  ? isDarkMode
                    ? "bg-slate-600 text-slate-100"
                    : "bg-slate-300/90 text-slate-800"
                  : isDarkMode
                  ? "bg-white/5 text-slate-500"
                  : "bg-black/5 text-slate-400"
              }`}
            >
              6
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PINTEREST CURVED ARC STAGE (Convex Rainbow Circle Wheel) */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden flex items-start justify-center cursor-grab active:cursor-grabbing"
        style={{
          height: `${config.stageHeight}px`,
          perspective: "1200px",
          touchAction: "pan-y",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Center Guide / Apex Marker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          {/* Virtual Slides Curved along the Convex Arc */}
          {virtualSlides.map((slide) => {
            let deltaAngle = (slide.slotAngle + rotation) % totalAngleSpan;
            if (deltaAngle > totalAngleSpan / 2) deltaAngle -= totalAngleSpan;
            if (deltaAngle < -totalAngleSpan / 2) deltaAngle += totalAngleSpan;

            // Cull slides beyond visible threshold
            if (Math.abs(deltaAngle) > config.maxFadeAngle + 15) return null;

            // Convex Circle Arc Mathematics from Pinterest reference
            const alphaRad = (deltaAngle * Math.PI) / 180;
            const x = config.radius * Math.sin(alphaRad);
            const y = config.radius * (1 - Math.cos(alphaRad));

            const rotateZ = deltaAngle;
            const rotateY = -deltaAngle * 0.22;
            const scale = Math.max(0.74, 1 - Math.abs(deltaAngle) * 0.0055);
            const opacity = Math.max(0, 1 - Math.pow(Math.abs(deltaAngle) / config.maxFadeAngle, 1.8));
            const zIndex = Math.round(1000 - Math.abs(deltaAngle) * 15);
            const isCenter = Math.abs(deltaAngle) < config.stepAngle * 0.55;

            return (
              <div
                key={slide.virtualId}
                // Pause auto-drift ONLY when hovering directly on cards
                onMouseEnter={() => {
                  isHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                  isHoveredRef.current = false;
                  handleMouseUp();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isCenter) {
                    setSelectedModalProject(slide);
                  } else {
                    snapToSlide(slide.baseIndex);
                  }
                }}
                className={`absolute rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border will-change-transform cursor-pointer group pointer-events-auto ${
                  isCenter ? "ring-1 ring-black/10 dark:ring-white/20 ring-offset-2 dark:ring-offset-slate-900" : ""
                }`}
                style={{
                  width: `${config.cardWidth}px`,
                  height: `${config.cardHeight}px`,
                  top: "16px",
                  left: "50%",
                  marginLeft: `-${config.cardWidth / 2}px`,
                  transform: `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotateZ}deg) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
                  borderColor: isDarkMode
                    ? isCenter
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(255, 255, 255, 0.1)"
                    : isCenter
                    ? "rgba(0, 0, 0, 0.15)"
                    : "rgba(0, 0, 0, 0.08)",
                  boxShadow: isDarkMode
                    ? isCenter
                      ? "0 25px 55px -10px rgba(0, 0, 0, 0.85)"
                      : "0 15px 35px -8px rgba(0, 0, 0, 0.6)"
                    : isCenter
                    ? "0 25px 45px -12px rgba(0, 0, 0, 0.16)"
                    : "0 10px 22px -8px rgba(0, 0, 0, 0.06)",
                  // Smooth 0.75s cubic-bezier ease when snapping/navigating, zero transition during drift/drag for 60fps
                  transition: isNavigating
                    ? "transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease, box-shadow 0.45s ease"
                    : "box-shadow 0.3s ease, border-color 0.3s ease",
                }}
              >
                {/* Visual Content: Image / SVG Mockup */}
                <div className="relative w-full h-full overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title[language] || slide.title.en}
                    className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Glossy ambient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

                  {/* Badge Header for Model Type */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase backdrop-blur-md bg-black/60 text-white border border-white/20 shadow-sm pointer-events-none">
                    {model === "desktop" ? "Desktop UI" : "Mobile App"}
                  </div>

                  {/* Quick Zoom Preview Icon on Hover or Active Center */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModalProject(slide);
                    }}
                    className={`absolute bottom-3 right-3 p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 ${
                      isCenter ? "opacity-90 hover:opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    title={language === "en" ? "Zoom Preview" : "Perbesar Desain"}
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          {/* Floating Side Navigation Arrows (Matches Website Slider) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={isNavigating}
            aria-label="Previous Design"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-90 shadow-md group disabled:opacity-30 pointer-events-auto"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(15, 23, 42, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.1)",
              color: currentColors.text.primary,
            }}
          >
            <ChevronLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            disabled={isNavigating}
            aria-label="Next Design"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-90 shadow-md group disabled:opacity-30 pointer-events-auto"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(15, 23, 42, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(0, 0, 0, 0.1)",
              color: currentColors.text.primary,
            }}
          >
            <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SLIDER DOTS WITH SPRING MORPH (Matches Website Slider)   */}
      {/* ======================================================== */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
        {activeItems.map((_, i) => (
          <button
            key={i}
            onClick={() => snapToSlide(i)}
            aria-label={`Desain ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              i === activeSlideIndex
                ? "w-8 bg-blue-600 rounded-full"
                : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 hover:w-3"
            }`}
          />
        ))}
      </div>

      {/* ======================================================== */}
      {/* CLEAN ACTIVE DESIGN INFO (Matches Website Slider Layout) */}
      {/* ======================================================== */}
      {currentActiveProject && (
        <div
          key={currentActiveProject.id}
          className="mt-6 sm:mt-8 max-w-2xl mx-auto text-center px-4 animate-fade-in-slide"
        >
          <span
            className="text-xs font-bold uppercase tracking-wider mb-1.5 inline-block"
            style={{ color: currentColors.text.accent }}
          >
            {currentActiveProject.client?.[language] || currentActiveProject.category?.[language]}
          </span>

          <h3
            onClick={() => setSelectedModalProject(currentActiveProject)}
            className="text-xl sm:text-2xl font-extrabold hover:text-blue-500 cursor-pointer transition-colors leading-tight mb-3"
            style={{ color: currentColors.text.primary }}
          >
            {currentActiveProject.title[language] || currentActiveProject.title.id}
          </h3>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
            {currentActiveProject.tech?.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 text-[11px] sm:text-xs font-medium rounded-md border"
                style={{
                  backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.6)" : "rgba(241, 245, 249, 0.8)",
                  borderColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.08)",
                  color: currentColors.text.secondary,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Quick Actions (Two buttons matching website layout) */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setSelectedModalProject(currentActiveProject)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                background: currentColors.gradient.primary,
                color: "white",
              }}
            >
              <ZoomIn size={14} />
              <span>{language === "en" ? "View Mockup" : "Lihat Mockup"}</span>
            </button>

            <button
              onClick={() => setSelectedModalProject(currentActiveProject)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105"
              style={{
                borderColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(0, 0, 0, 0.15)",
                color: currentColors.text.primary,
              }}
            >
              <span>{language === "en" ? "Design Concept" : "Konsep Desain"}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* HIGH-RES LIGHTBOX MODAL FOR DESIGN PREVIEWS             */}
      {/* ======================================================== */}
      {selectedModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedModalProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border shadow-2xl flex flex-col animate-scale-up"
            style={{
              backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className="p-4 sm:p-5 border-b flex items-center justify-between"
              style={{
                borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: currentColors.text.accent }}
                >
                  {selectedModalProject.category?.[language] || selectedModalProject.category?.id}
                </span>
                <h4
                  className="text-base sm:text-xl font-extrabold mt-0.5"
                  style={{ color: currentColors.text.primary }}
                >
                  {selectedModalProject.title[language] || selectedModalProject.title.id}
                </h4>
              </div>

              <button
                onClick={() => setSelectedModalProject(null)}
                className="p-2 rounded-full border hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                style={{
                  borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                  color: currentColors.text.primary,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: High Resolution Preview with Scroll */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center bg-slate-950/20">
              <div
                className={`rounded-2xl overflow-hidden border shadow-xl bg-slate-900 ${
                  selectedModalProject.ratio === "portrait"
                    ? "w-full max-w-[340px] aspect-[9/16]"
                    : "w-full max-w-3xl aspect-[16/10]"
                }`}
                style={{
                  borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={selectedModalProject.image}
                  alt={selectedModalProject.title[language]}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Description & Tools in Modal */}
              <div className="w-full mt-6 text-left max-w-2xl">
                <p
                  className="text-xs sm:text-sm leading-relaxed mb-4"
                  style={{ color: currentColors.text.secondary }}
                >
                  {selectedModalProject.description[language] || selectedModalProject.description.id}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedModalProject.tech?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-semibold rounded-lg border"
                      style={{
                        backgroundColor: isDarkMode ? "rgba(30, 41, 59, 0.6)" : "rgba(241, 245, 249, 0.8)",
                        borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                        color: currentColors.text.primary,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
