import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  Globe,
  Palette,
} from "lucide-react";
import DesignArcSlider from "./DesignArcSlider";

export default function CurvedProjectsSlider({
  projects = [],
  designProjects = [],
  desktopDesignProjects = [],
  mobileDesignProjects = [],
  language = "id",
  isDarkMode = false,
  currentColors = {},
  t,
  visibleSections,
  onSelectProject,
}) {
  const [activeTab, setActiveTab] = useState("website"); // 'website' | 'design'
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, rotation: 0, hasStarted: false });
  const touchDirectionRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const navTimerRef = useRef(null);

  // Resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive dimensions for 3D Curve
  const config = useMemo(() => {
    if (windowWidth < 640) {
      // Mobile
      return {
        radius: 540,
        depth: 130,
        stepAngle: 36,
        cardWidth: 290,
        cardHeight: 185,
        perspective: 850,
        fadeLimit: 75,
      };
    } else if (windowWidth < 1024) {
      // Tablet
      return {
        radius: 780,
        depth: 190,
        stepAngle: 28,
        cardWidth: 350,
        cardHeight: 225,
        perspective: 1000,
        fadeLimit: 68,
      };
    } else {
      // Desktop: 16:10 Landscape Browser Mockup
      return {
        radius: 1000,
        depth: 250,
        stepAngle: 24,
        cardWidth: 420,
        cardHeight: 265,
        perspective: 1150,
        fadeLimit: 62,
      };
    }
  }, [windowWidth]);

  // Clean domain formatter
  const getCleanDomain = (url) => {
    if (!url) return "project.preview";
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace("www.", "");
    } catch {
      return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }
  };

  // Build items array: expand website projects into 6 landscape showcase slides for smooth continuous loop
  const slides = useMemo(() => {
    if (!projects || projects.length === 0) return [];

    const baseItems = projects.map((proj) => {
      const images = Array.isArray(proj.image) ? proj.image : [proj.image];
      return {
        id: proj.id,
        project: proj,
        title: proj.title[language] || proj.title.en,
        client: proj.client[language] || proj.client.en,
        image: images[0],
        tech: proj.tech,
        domain: getCleanDomain(proj.liveUrl),
      };
    });

    // Duplicate so the 3D cylinder has 6 continuous cards (2 cycles of 3 projects)
    const fullList = [
      ...baseItems.map((item) => ({ ...item, uniqueKey: `${item.id}-a` })),
      ...baseItems.map((item) => ({ ...item, uniqueKey: `${item.id}-b` })),
    ];
    return fullList;
  }, [projects, language]);

  const totalSlides = slides.length;
  const loopAngle = totalSlides * config.stepAngle;

  // Active slide calculation (stable & jitter-free)
  const activeSlideIndex = useMemo(() => {
    if (totalSlides === 0) return 0;
    const normalized = Math.round(-rotation / config.stepAngle) % totalSlides;
    return (normalized + totalSlides) % totalSlides;
  }, [rotation, config.stepAngle, totalSlides]);

  const activeSlide = slides[activeSlideIndex] || slides[0];

  // Gentle, jitter-free slow auto-drift
  useEffect(() => {
    let prevTime = performance.now();
    let animId;

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - prevTime) / 1000, 0.1);
      prevTime = currentTime;

      // Only drift when on website tab, not hovered, not dragging, and not mid-navigation
      if (
        activeTab === "website" &&
        !isHoveredRef.current &&
        !isDraggingRef.current &&
        !isNavigating
      ) {
        // Slow, serene speed: ~2.8 degrees per second (calm & cinematic)
        setRotation((r) => r - 2.8 * dt);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [activeTab, isNavigating]);

  // Mouse Drag Handlers (with move threshold to prevent accidental drags during clicks)
  const handleMouseDown = (e) => {
    isHoveredRef.current = true;
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
      } else {
        return;
      }
    }

    const sensitivity = windowWidth < 640 ? 0.16 : 0.11;
    setRotation(dragStartRef.current.rotation + dx * sensitivity);
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      // Smoothly snap to nearest slide
      setIsNavigating(true);
      const targetIdx = Math.round(-rotation / config.stepAngle);
      setRotation(-targetIdx * config.stepAngle);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
    }
    dragStartRef.current.hasStarted = false;
  };

  // Touch Swipe Handlers (Intelligent direction lock: allows natural vertical page scrolling)
  const handleTouchStart = (e) => {
    isHoveredRef.current = true;
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

    // Detect direction lock once user moves finger > 7px
    if (touchDirectionRef.current.isHorizontal === null) {
      if (Math.abs(dx) > 7 || Math.abs(dy) > 7) {
        touchDirectionRef.current.isHorizontal = Math.abs(dx) > Math.abs(dy);
      } else {
        return;
      }
    }

    // If gesture is vertical, DO NOT intercept — let the browser scroll the page naturally!
    if (touchDirectionRef.current.isHorizontal === false) {
      return;
    }

    // If gesture is horizontal, drag the carousel
    if (!isDraggingRef.current) {
      isDraggingRef.current = true;
      setIsDragging(true);
    }

    const sensitivity = windowWidth < 640 ? 0.15 : 0.1;
    setRotation(dragStartRef.current.rotation + dx * sensitivity);
  };

  const handleTouchEnd = () => {
    touchDirectionRef.current = null;
    isHoveredRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      // Snap cleanly to nearest slide
      setIsNavigating(true);
      const targetIdx = Math.round(-rotation / config.stepAngle);
      setRotation(-targetIdx * config.stepAngle);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
    }
  };

  // Step Navigation (Prev / Next buttons) with smooth animation
  const navigateStep = useCallback(
    (direction) => {
      setIsNavigating(true);
      const step = config.stepAngle;
      setRotation((prev) => {
        const target = Math.round(prev / step) * step + direction * step;
        return target;
      });
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
    },
    [config.stepAngle]
  );

  const jumpToSlide = useCallback(
    (index) => {
      setIsNavigating(true);
      const targetRot = -index * config.stepAngle;
      setRotation(targetRot);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
      navTimerRef.current = setTimeout(() => setIsNavigating(false), 750);
    },
    [config.stepAngle]
  );

  return (
    <section
      id="projects"
      className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 overflow-hidden ${
        visibleSections?.has?.("projects") ? "scroll-reveal visible" : "scroll-reveal"
      }`}
    >
      {/* Background Soft Glow (Clean & hidden on design tab to avoid blue halos) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] sm:w-[1000px] sm:h-[500px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-500 ${
          activeTab === "design" ? "opacity-0" : "opacity-25 dark:opacity-15"
        }`}
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(59, 130, 246, 0.2) 60%, transparent 80%)"
            : "radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, rgba(59, 130, 246, 0.12) 60%, transparent 80%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Clean Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: isDarkMode
                ? "rgba(59, 130, 246, 0.12)"
                : "rgba(37, 99, 235, 0.08)",
              color: currentColors.text.accent,
            }}
          >
            <Layers size={14} />
            <span>{t("projects.badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
            {language === "en" ? "Our Work" : "Karya & Proyek"}
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl mx-auto px-4 opacity-80 transition-all duration-300"
            style={{ color: currentColors.text.secondary }}
          >
            {activeTab === "website"
              ? language === "en"
                ? "A collection of web applications built with a focus on responsive, clean, and functional interfaces"
                : "Koleksi aplikasi web yang saya bangun dengan fokus pada antarmuka yang responsif, rapi, dan fungsional"
              : language === "en"
              ? "UI/UX design exploration, digital concepts, and product wireframes"
              : "Eksplorasi desain UI/UX, konsep digital, dan tata letak antarmuka produk"}
          </p>

          {/* Category Toggle: [ Website ] vs [ Desain ] with Smooth Sliding Indicator Pill */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <div
              className="relative inline-flex p-1 rounded-xl border backdrop-blur-md shadow-sm"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(30, 41, 59, 0.7)"
                  : "rgba(241, 245, 249, 0.9)",
                borderColor: isDarkMode
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.08)",
              }}
            >
              {/* Animated Sliding Background Pill */}
              <div
                className="absolute top-1 bottom-1 rounded-lg bg-blue-600 shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  left: activeTab === "website" ? "4px" : "calc(50% + 2px)",
                  width: "calc(50% - 6px)",
                }}
              />

              <button
                onClick={() => setActiveTab("website")}
                className={`relative z-10 flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  activeTab === "website"
                    ? "text-white"
                    : isDarkMode
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Globe size={14} />
                <span>Website</span>
              </button>

              <button
                onClick={() => setActiveTab("design")}
                className={`relative z-10 flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  activeTab === "design"
                    ? "text-white"
                    : isDarkMode
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Palette size={14} />
                <span>{language === "en" ? "Design" : "Desain"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: WEBSITE PROJECTS (3D Curved Landscape Slider)     */}
        {/* ======================================================== */}
        {activeTab === "website" && (
          <div className="relative w-full select-none animate-fade-in-soft">
            {/* The 3D Perspective Stage (Smooth, non-blocking touch pan-y) */}
            <div
              ref={containerRef}
              className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
              style={{
                height: `${config.cardHeight + 80}px`,
                perspective: `${config.perspective}px`,
                perspectiveOrigin: "50% 50%",
                touchAction: "pan-y",
              }}
              onMouseEnter={() => {
                isHoveredRef.current = true;
              }}
              onMouseLeave={() => {
                isHoveredRef.current = false;
                handleMouseUp();
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* 3D Track */}
              <div
                className="relative"
                style={{
                  width: 0,
                  height: 0,
                  transformStyle: "preserve-3d",
                }}
              >
                {slides.map((slide, idx) => {
                  let diff = (idx * config.stepAngle + rotation) % loopAngle;
                  const halfSpan = loopAngle / 2;
                  while (diff > halfSpan) diff -= loopAngle;
                  while (diff < -halfSpan) diff += loopAngle;

                  // Concave Cylinder trigonometry
                  const rad = (diff * Math.PI) / 180;
                  const x = Math.sin(rad) * config.radius;
                  const z = (1 - Math.cos(rad)) * config.depth; // Sides come forward (+Z)
                  const rotY = -diff; // Facing inward towards center
                  const isCenter = Math.abs(diff) < config.stepAngle * 0.55;

                  // Smooth opacity falloff for outer cards
                  const opacity = Math.max(
                    0,
                    1 - Math.pow(Math.abs(diff) / config.fadeLimit, 2.2)
                  );

                  if (opacity <= 0.02) return null;

                  return (
                    <div
                      key={slide.uniqueKey}
                      onClick={() => {
                        if (Math.abs(diff) > 4) {
                          jumpToSlide(idx);
                        } else {
                          onSelectProject(slide.project);
                        }
                      }}
                      className="absolute rounded-xl sm:rounded-2xl overflow-hidden group border flex flex-col will-change-transform cursor-pointer"
                      style={{
                        width: `${config.cardWidth}px`,
                        height: `${config.cardHeight}px`,
                        top: `-${config.cardHeight / 2}px`,
                        left: `-${config.cardWidth / 2}px`,
                        transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg)`,
                        opacity,
                        zIndex: Math.round(z + 500),
                        backgroundColor: isDarkMode ? "#0f172a" : "#ffffff",
                        borderColor: isDarkMode
                          ? isCenter
                            ? "rgba(99, 102, 241, 0.45)"
                            : "rgba(255, 255, 255, 0.1)"
                          : isCenter
                          ? "rgba(59, 130, 246, 0.4)"
                          : "rgba(0, 0, 0, 0.08)",
                        boxShadow: isDarkMode
                          ? isCenter
                            ? "0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.2)"
                            : "0 20px 45px -10px rgba(0, 0, 0, 0.6)"
                          : isCenter
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 0 25px rgba(59, 130, 246, 0.12)"
                          : "0 15px 35px -10px rgba(0, 0, 0, 0.08)",
                        // When auto-drifting or dragging, transform transition is none for zero jitter
                        // When snapping / clicking nav, smooth cubic-bezier transition is applied
                        transition: isNavigating
                          ? "transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease"
                          : "box-shadow 0.35s ease, border-color 0.35s ease, opacity 0.35s ease",
                      }}
                    >
                      {/* Clean Minimalist Browser Header (WITHOUT 3 colored dots!) */}
                      <div
                        className="h-6 sm:h-7 px-3 flex items-center justify-center border-b flex-shrink-0 select-none relative"
                        style={{
                          backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
                          borderColor: isDarkMode
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.06)",
                        }}
                      >
                        {/* Centered minimalist URL pill */}
                        <div
                          className="flex items-center gap-1.5 px-3 py-0.5 rounded-md text-[10px] sm:text-[11px] font-mono tracking-tight max-w-[220px] sm:max-w-[280px] truncate border"
                          style={{
                            backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.6)" : "#ffffff",
                            borderColor: isDarkMode
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.06)",
                            color: isDarkMode ? "#94a3b8" : "#64748b",
                          }}
                        >
                          <Globe size={11} className="opacity-60 flex-shrink-0 text-blue-500" />
                          <span className="truncate">{slide.domain}</span>
                        </div>
                      </div>

                      {/* Clean Website Screenshot (Full View & Bright) */}
                      <div className="relative flex-1 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          loading="lazy"
                        />

                        {/* Clean Subtle Action Pill on Hover */}
                        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2.5 pointer-events-auto">
                          {slide.project.liveUrl && (
                            <a
                              href={slide.project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 translate-y-2 group-hover:translate-y-0"
                            >
                              <ExternalLink size={12} />
                              <span>{t("projects.liveDemo")}</span>
                            </a>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(slide.project);
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/95 hover:bg-white text-slate-900 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 translate-y-2 group-hover:translate-y-0 delay-75"
                          >
                            <span>{t("projects.viewDetails")}</span>
                            <ArrowUpRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prev / Next Minimalist Arrow Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateStep(1);
                }}
                aria-label="Previous Project"
                className="absolute left-2 sm:left-4 z-30 p-2.5 sm:p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-90 shadow-lg group"
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
                <ChevronLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateStep(-1);
                }}
                aria-label="Next Project"
                className="absolute right-2 sm:right-4 z-30 p-2.5 sm:p-3 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-90 shadow-lg group"
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
                <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Slider Dots with Spring Morph */}
            <div className="flex items-center justify-center gap-2 mt-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => jumpToSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    i === activeSlideIndex
                      ? "w-8 bg-blue-600 shadow-md shadow-blue-500/40"
                      : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 hover:w-3"
                  }`}
                />
              ))}
            </div>

            {/* Clean Active Project Card with Smooth Crossfade */}
            {activeSlide && (
              <div
                key={activeSlide.id}
                className="mt-6 sm:mt-8 max-w-2xl mx-auto text-center px-4 animate-fade-in-slide"
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider mb-1.5 inline-block"
                  style={{ color: currentColors.text.accent }}
                >
                  {activeSlide.client}
                </span>

                <h3
                  onClick={() => onSelectProject(activeSlide.project)}
                  className="text-xl sm:text-2xl font-extrabold hover:text-blue-500 cursor-pointer transition-colors leading-tight mb-3"
                  style={{ color: currentColors.text.primary }}
                >
                  {activeSlide.title}
                </h3>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5">
                  {activeSlide.tech.map((t, idx) => (
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

                {/* Quick Actions */}
                <div className="flex items-center justify-center gap-3">
                  {activeSlide.project.liveUrl && (
                    <a
                      href={activeSlide.project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
                      style={{
                        background: currentColors.gradient.primary,
                        color: "white",
                      }}
                    >
                      <ExternalLink size={14} />
                      <span>{t("projects.liveDemo")}</span>
                    </a>
                  )}

                  <button
                    onClick={() => onSelectProject(activeSlide.project)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:scale-105"
                    style={{
                      borderColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.15)"
                        : "rgba(0, 0, 0, 0.15)",
                      color: currentColors.text.primary,
                    }}
                  >
                    <span>{t("projects.viewDetails")}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DESIGN PROJECTS (Pinterest Curved Arc Rainbow Slider) */}
        {/* Supporting 2 Models: Desktop (Landscape) & Mobile (Portrait) */}
        {/* ======================================================== */}
        {activeTab === "design" && (
          <div className="w-full animate-fade-in-soft">
            <DesignArcSlider
              desktopProjects={
                desktopDesignProjects && desktopDesignProjects.length > 0
                  ? desktopDesignProjects
                  : designProjects.filter((p) => p.model === "desktop" || p.ratio === "landscape")
              }
              mobileProjects={
                mobileDesignProjects && mobileDesignProjects.length > 0
                  ? mobileDesignProjects
                  : designProjects.filter((p) => p.model === "mobile" || p.ratio === "portrait")
              }
              language={language}
              isDarkMode={isDarkMode}
              currentColors={currentColors}
              t={t}
            />
          </div>
        )}
      </div>
    </section>
  );
}
