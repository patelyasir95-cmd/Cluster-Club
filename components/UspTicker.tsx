"use client";

import { useState } from "react";

const baseItems = [
  "Belgian Chocolate",
  "Over 50% Nuts",
  "Source of Fibre",
  "Sustainable Packaging",
];

// Duplicate so translateX(-50%) creates a seamless loop
const items = [...baseItems, ...baseItems, ...baseItems, ...baseItems];

export default function UspTicker() {
  const [paused, setPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="bg-[#E8771A] py-5 overflow-hidden cursor-pointer select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setHoveredIndex(null); }}
    >
      <div className={`flex whitespace-nowrap animate-marquee ${paused ? "animate-marquee-paused" : ""}`}>
        {items.map((item, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-4 mx-10"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span
                className="font-black text-sm tracking-[0.2em] uppercase transition-all duration-200 inline-block"
                style={{ color: isHovered ? "#1C0A00" : "white", transform: isHovered ? "scale(1.08)" : "scale(1)" }}
              >
                {item}
              </span>
              <span
                className="text-xs transition-all duration-300 inline-block"
                style={{
                  color: isHovered ? "#1C0A00" : "rgba(255,255,255,0.4)",
                  transform: isHovered ? "rotate(45deg) scale(1.3)" : "rotate(0deg) scale(1)",
                }}
              >
                ✦
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
