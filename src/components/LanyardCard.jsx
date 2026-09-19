import React, { useState, useRef, useEffect, useCallback } from "react";

export default function LanyardCard({ photo, name = "Aji Mukti Laksono", title = "Frontend Engineer", isDarkMode = true }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const physics = useRef({ angle: 0, velocity: 0 });
  const [swing, setSwing] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startAngle: 0 });

  // Start with a small swing
  useEffect(() => { physics.current.angle = 8; }, []);

  // Physics loop for pendulum swing
  useEffect(() => {
    const p = physics.current;
    const tick = () => {
      if (!isDragging) {
        // Gravity pulls towards center
        const acc = -0.3 * Math.sin((p.angle * Math.PI) / 180);
        p.velocity += acc;
        p.velocity *= 0.985; // Damping
        p.angle += p.velocity;
        
        if (Math.abs(p.velocity) < 0.0001 && Math.abs(p.angle) < 0.001) { 
          p.angle = 0; 
          p.velocity = 0; 
        }
      }
      setSwing(p.angle);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isDragging]);

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startAngle: physics.current.angle };
    const onMove = (ev) => {
      const dx = (ev.clientX - dragRef.current.startX) * 0.15;
      physics.current.angle = dragRef.current.startAngle + dx;
      physics.current.velocity = dx * 0.02;
    };
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging || !containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    // Calculate tilt based on mouse position relative to card center
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    // Limits for tilt
    const rx = ((y / r.height) - 0.5) * 15; // max 7.5 deg
    const ry = ((x / r.width) - 0.5) * -20; // max 10 deg
    
    setTilt({ rx, ry });
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => { 
    if (!isDragging) setTilt({ rx: 0, ry: 0 }); 
  }, [isDragging]);

  // Dimensions
  const W = 320;
  const ropeLen = 100;
  const ax = W / 2; 
  const ay = 10; // anchor y
  const rad = (swing * Math.PI) / 180;
  // Card attachment point
  const cx = ax + Math.sin(rad) * ropeLen;
  const cy = ay + Math.cos(rad) * ropeLen;

  // Colors based on App.jsx palette
  const accent = isDarkMode ? "#FCA311" : "#D97706";
  const bgCard = isDarkMode 
    ? "linear-gradient(145deg, rgba(20, 33, 61, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%)" 
    : "linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 249, 245, 0.95) 100%)";
  const borderColor = isDarkMode ? "rgba(252, 163, 17, 0.3)" : "rgba(217, 119, 6, 0.25)";
  const textPrimary = isDarkMode ? "#FFFFFF" : "#14213D";
  const textSecondary = isDarkMode ? "#E5E5E5" : "#475569";
  const textMuted = isDarkMode ? "rgba(255, 255, 255, 0.4)" : "rgba(20, 33, 61, 0.4)";
  const shimmerColor = isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.8)";
  
  // Calculate reflection position based on tilt
  const reflectionX = tilt.ry * -2 + 50;
  const reflectionY = tilt.rx * -2 + 50;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        width: "100%", 
        height: "560px", 
        position: "relative", 
        perspective: "1200px", 
        overflow: "hidden", 
        userSelect: "none", 
        touchAction: "none" 
      }}
      className="group"
    >
      {/* Dynamic SVG Rope */}
      <svg viewBox={`0 0 ${W} 560`} width="100%" height={560}
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", zIndex: 2 }}>
        <defs>
          <linearGradient id="ropeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
            <stop offset="100%" stopColor={isDarkMode ? "#222" : "#555"} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="clipGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3"/>
          </filter>
        </defs>

        {/* Anchor point */}
        <circle cx={ax} cy={ay - 20} r="30" fill="transparent" /> 

        {/* Left Rope Strand */}
        <path d={`M ${ax - 10} ${-10} Q ${ax - 15 + swing * 0.3} ${ay + ropeLen * 0.4}, ${cx - 5} ${cy - 8}`}
          stroke="url(#ropeGrad)" strokeWidth="5" fill="none" strokeLinecap="round" style={{ filter: "url(#shadow)" }} />
        {/* Right Rope Strand */}
        <path d={`M ${ax + 10} ${-10} Q ${ax + 15 + swing * 0.3} ${ay + ropeLen * 0.4}, ${cx + 5} ${cy - 8}`}
          stroke="url(#ropeGrad)" strokeWidth="5" fill="none" strokeLinecap="round" style={{ filter: "url(#shadow)" }} />
        
        {/* Lanyard Metal Clip */}
        <g transform={`translate(${cx}, ${cy - 12}) rotate(${swing})`}>
          {/* Swivel base */}
          <rect x="-8" y="-4" width="16" height="8" rx="2" fill="url(#clipGrad)" stroke="#334155" strokeWidth="1" />
          {/* Ring */}
          <path d="M -5 4 L -5 10 C -5 14, 5 14, 5 10 L 5 4" fill="none" stroke="url(#clipGrad)" strokeWidth="3" />
          {/* Clasp body */}
          <rect x="-4" y="10" width="8" height="14" rx="2" fill="url(#clipGrad)" stroke="#475569" strokeWidth="0.5" />
          {/* Hook */}
          <path d="M -3 22 C -6 25, -6 31, 0 33 C 6 31, 6 25, 3 22" fill="none" stroke="url(#clipGrad)" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>

      {/* The ID Card */}
      <div
        onPointerDown={handlePointerDown}
        style={{
          position: "absolute",
          width: "240px",
          left: "50%",
          top: `${cy + 18}px`,
          marginLeft: "-120px", // Half width
          transformOrigin: "top center",
          transform: `translateX(${Math.sin(rad) * ropeLen * 0.1}px) rotate(${swing * 0.9}deg) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          zIndex: 3,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        className="group/card"
      >
        <div style={{
          borderRadius: "20px",
          backdropFilter: "blur(16px)",
          background: bgCard,
          border: `1px solid ${borderColor}`,
          boxShadow: isDarkMode
            ? "0 30px 60px -12px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.1)"
            : "0 30px 60px -12px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.9)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Card Slot Punch Hole */}
          <div style={{
            position: "absolute",
            top: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "50px",
            height: "8px",
            borderRadius: "4px",
            background: isDarkMode ? "#000" : "#f1f5f9",
            boxShadow: isDarkMode ? "inset 0 2px 4px rgba(0,0,0,0.8)" : "inset 0 2px 4px rgba(0,0,0,0.1)",
            zIndex: 10
          }} />

          {/* Dynamic Glare/Glossy Effect */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
            background: `radial-gradient(circle at ${reflectionX}% ${reflectionY}%, ${shimmerColor} 0%, transparent 70%)`,
            opacity: 0.6,
            transition: "all 0.1s ease",
          }} />

          {/* Shimmer Sweep Animation */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.2) 35%, transparent 40%)",
            backgroundSize: "200% 100%", 
            animation: "shimmerSweep 6s ease-in-out infinite",
          }} />

          {/* Card Header Strip */}
          <div style={{ 
            height: "46px", 
            background: isDarkMode 
              ? "linear-gradient(90deg, #14213D 0%, #000 100%)" 
              : "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: "6px",
          }}>
            <span style={{ fontSize: "11px", fontWeight: "900", color: "#fff", letterSpacing: "3px", textTransform: "uppercase" }}>
              VIP ACCESS
            </span>
          </div>

          <div style={{ padding: "24px 20px 24px" }}>
            {/* Profile Photo */}
            <div style={{
              width: "100px", height: "100px", borderRadius: "50%",
              margin: "0 auto 20px", overflow: "hidden",
              border: `3px solid ${accent}`,
              boxShadow: `0 10px 30px rgba(217, 119, 6, 0.3)`,
              position: "relative",
              background: isDarkMode ? "#14213D" : "#FFF"
            }}>
              <img src={photo} alt={name} draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Name & Title */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <h3 style={{
                fontSize: "20px", fontWeight: 800, color: textPrimary,
                marginBottom: "6px", lineHeight: 1.2, letterSpacing: "-0.5px",
              }}>
                {name}
              </h3>
              <p style={{ 
                fontSize: "11px", fontWeight: 700, color: accent, 
                letterSpacing: "1.5px", textTransform: "uppercase",
                background: isDarkMode ? "rgba(252, 163, 17, 0.1)" : "rgba(217, 119, 6, 0.1)",
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: "12px",
              }}>
                {title}
              </p>
            </div>

            {/* Verification Badge */}
            <div style={{ 
              display: "flex", justifyContent: "center", alignItems: "center", gap: "8px",
              marginBottom: "20px", padding: "10px", 
              background: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              borderRadius: "10px", border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span style={{ fontSize: "11px", fontWeight: 700, color: textSecondary }}>
                Verified Professional
              </span>
            </div>

            {/* Decorative Barcode */}
            <div style={{ 
              display: "flex", alignItems: "center", justifyContent: "center", 
              flexDirection: "column", gap: "10px", marginTop: "10px"
            }}>
              <div style={{ display: "flex", gap: "2.5px", alignItems: "center", height: "30px" }}>
                {[30, 20, 30, 15, 30, 22, 10, 30, 14, 30, 26, 18, 30, 10, 30, 18, 30].map((h, i) => (
                  <div key={i} style={{ width: i%3===0 ? "3px" : "1.5px", height: `${h}px`, background: textPrimary, opacity: 0.8, borderRadius: "1px" }} />
                ))}
              </div>
              <span style={{ fontSize: "10px", fontWeight: 800, fontFamily: "monospace", color: textMuted, letterSpacing: "3px" }}>
                ID-2026-AML
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Drag hint */}
      <div style={{
        position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)",
        fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase",
        color: textMuted, pointerEvents: "none", zIndex: 4,
        display: "flex", alignItems: "center", gap: "8px"
      }}
      className="opacity-50 group-hover:opacity-100 transition-opacity"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 9l-3 3 3 3M9 5l3-3 3 3M19 9l3 3-3 3M9 19l3 3 3-3M2 12h20M12 2v20"/></svg>
        DRAG TO INTERACT
      </div>

      <style>{`
        @keyframes shimmerSweep { 
          0% { background-position: 200% 0; } 
          100% { background-position: -200% 0; } 
        }
      `}</style>
    </div>
  );
}
