import React from "react";

interface LogoProps {
  onlyIcon?: boolean;
  className?: string;
  theme?: "light" | "dark" | "brand";
  iconSize?: number;
}

export default function Logo({
  onlyIcon = false,
  className = "",
  theme = "brand",
  iconSize = 34
}: LogoProps) {
  // Theme text coloring matching the exact deep teal-blue signature of the logo image
  const textColor =
    theme === "dark"
      ? "text-white"
      : theme === "light"
      ? "text-slate-700 hover:text-[#0b7c9e]"
      : "text-[#0b7c9e]"; // 'brand' matching the logo's deep cyan-blue

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Icon portion (Atomic dynamic network orbits) representing security, connectivity, and digital integration */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          {/* High-fidelity color gradients matched to the shades of blue, teal, and cyan in the logo */}
          <linearGradient id="gradient-orbit-1" x1="10" y1="10" x2="90" y2="90">
            <stop offset="0%" stopColor="#0b7c9e" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="gradient-orbit-2" x1="10" y1="90" x2="90" y2="10">
            <stop offset="0%" stopColor="#006c9e" />
            <stop offset="60%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="gradient-orbit-3" x1="0" y1="50" x2="100" y2="50">
            <stop offset="0%" stopColor="#0a1b33" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <radialGradient id="node-glow-1" cx="50" cy="50" r="50">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="70%" stopColor="#006c9e" />
            <stop offset="100%" stopColor="#0a1b33" />
          </radialGradient>
          <radialGradient id="node-glow-2" cx="50" cy="50" r="50">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="60%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </radialGradient>
          <radialGradient id="node-glow-3" cx="50" cy="50" r="50">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="70%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#155e75" />
          </radialGradient>
        </defs>

        {/* Orbit Arc 1 (Tilted around 45 degrees, wrapping left to right) */}
        <ellipse
          cx="50"
          cy="50"
          rx="32"
          ry="13"
          stroke="url(#gradient-orbit-1)"
          strokeWidth="2.2"
          fill="none"
          transform="rotate(45 50 50)"
          strokeLinecap="round"
        />

        {/* Orbit Arc 2 (Tilted around -45 degrees, crossing symmetrically) */}
        <ellipse
          cx="50"
          cy="50"
          rx="32"
          ry="13"
          stroke="url(#gradient-orbit-2)"
          strokeWidth="2.2"
          fill="none"
          transform="rotate(-45 50 50)"
          strokeLinecap="round"
        />

        {/* Orbit Arc 3 (Low horizontal tilt around 15 degrees, wrapping middle) */}
        <ellipse
          cx="50"
          cy="50"
          rx="35"
          ry="11"
          stroke="url(#gradient-orbit-3)"
          strokeWidth="1.8"
          fill="none"
          transform="rotate(15 50 50)"
          strokeLinecap="round"
        />

        {/* Optional decorative dashed back-orbit for modern high-tech layout depth */}
        <circle
          cx="50"
          cy="50"
          r="24"
          stroke="#0ea5e9"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.35"
        />

        {/* Spheroid Nodes sitting perfectly aligned on path orbits */}
        {/* Node 1: Upper Right Center (matching the top-right highlight node in custom logo image) */}
        <circle
          cx="64"
          cy="34"
          r="4.2"
          fill="url(#node-glow-1)"
          stroke="#ffffff"
          strokeWidth="0.8"
        />

        {/* Node 2: Far Right Node (matching the outside right bubble) */}
        <circle
          cx="79"
          cy="46"
          r="3.5"
          fill="url(#node-glow-2)"
          stroke="#ffffff"
          strokeWidth="0.6"
        />

        {/* Node 3: Mid Left Node (matching the wide left bubble) */}
        <circle
          cx="23"
          cy="59"
          r="5"
          fill="url(#node-glow-3)"
          stroke="#ffffff"
          strokeWidth="1"
        />
      </svg>

      {/* Corporate Label matching the italic corporate typography of the logo image */}
      {!onlyIcon && (
        <span
          className={`font-display font-semibold italic text-[16px] md:text-[17.5px] tracking-[0.01em] transition-colors duration-300 ${textColor}`}
          style={{
            fontFamily: "'Lora', 'Playfair Display', Georgia, serif"
          }}
        >
          The Shield Corporation
        </span>
      )}
    </div>
  );
}
