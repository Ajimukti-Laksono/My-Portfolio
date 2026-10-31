import React, { useRef, useEffect, useCallback } from "react";
import { ArrowDown, Check, Send } from "lucide-react";

export default function ConfettiSubmitButton({
  status = null, // null | 'sending' | 'sent' | 'error'
  language = "id",
  disabled = false,
  className = "",
  currentColors = {},
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const prevStatusRef = useRef(status);

  // Trigger celebratory confetti burst when status transitions to 'sent'
  const fireConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const particles = [];
    const colors = [
      "#6366f1", // Indigo
      "#3b82f6", // Blue
      "#8b5cf6", // Purple
      "#a855f7", // Violet
      "#06b6d4", // Cyan
      "#10b981", // Emerald
      "#f59e0b", // Amber / Gold
      "#ec4899", // Pink
    ];

    const originX = canvas.width / 2;
    const originY = canvas.height - 20;

    // Generate 65 confetti particles bursting upward in a celebratory arc
    for (let i = 0; i < 65; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
      const speed = Math.random() * 11 + 4;
      particles.push({
        x: originX + (Math.random() - 0.5) * 60,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: Math.random() * 6 + 5,
        h: Math.random() * 8 + 6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.28,
        drag: 0.98,
        opacity: 1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.009;

        if (p.opacity > 0 && p.y < canvas.height + 40) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    // When status changes to 'sent', launch confetti!
    if (status === "sent" && prevStatusRef.current !== "sent") {
      fireConfetti();
    }
    prevStatusRef.current = status;
  }, [status, fireConfetti]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="relative w-full flex items-center justify-center pt-2">
      {/* Confetti Canvas Overlay (Shoots up around the button) */}
      <canvas
        ref={canvasRef}
        className="absolute -top-32 inset-x-0 w-full h-56 pointer-events-none z-30"
      />

      <button
        type="submit"
        disabled={disabled || status === "sending"}
        className={`relative z-20 w-full sm:w-auto min-w-[220px] px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-white shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 disabled:opacity-75 select-none ${className}`}
        style={{
          backgroundColor: "#181926",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            status === "sent"
              ? "0 12px 30px -5px rgba(16, 185, 129, 0.45)"
              : "0 12px 28px -6px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* State 1: Sending / Loading (3 animated blue dots) */}
        {status === "sending" && (
          <div className="flex items-center gap-1.5 py-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
          </div>
        )}

        {/* State 2: Success (Green Checkmark + Text) */}
        {status === "sent" && (
          <div className="flex items-center gap-2 text-emerald-400 animate-scale-in">
            <Check size={18} strokeWidth={3} className="text-emerald-400" />
            <span className="text-white font-bold tracking-wide">
              {language === "en" ? "Success" : "Pesan Terkirim"}
            </span>
          </div>
        )}

        {/* State 3: Default Idle State (Blue Arrow + Text) */}
        {status !== "sending" && status !== "sent" && (
          <>
            <span className="flex items-center justify-center text-blue-400 transition-transform duration-300 group-hover:translate-y-0.5">
              <ArrowDown size={17} strokeWidth={2.8} />
            </span>
            <span className="tracking-wide">
              {language === "en" ? "Submit" : "Kirim Pesan"}
            </span>
          </>
        )}
      </button>
    </div>
  );
}

