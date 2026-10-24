import React from "react";

interface PointerGlowProps {
  color?: string;
  className?: string;
}

export function PointerGlow({
  color = "37, 99, 235",
  className = "",
}: PointerGlowProps) {
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const glow = glowRef.current;
    const surface = glow?.parentElement;
    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!surface || !precisePointer.matches || reducedMotion.matches) {
      return;
    }

    const updateGlowPosition = (event: PointerEvent) => {
      const bounds = surface.getBoundingClientRect();
      surface.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
      surface.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
    };

    surface.addEventListener("pointermove", updateGlowPosition);
    return () => surface.removeEventListener("pointermove", updateGlowPosition);
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className={`pointer-glow ${className}`}
      style={{ "--glow-color": color } as React.CSSProperties}
    />
  );
}
