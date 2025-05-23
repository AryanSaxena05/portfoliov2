import React, { useRef, useEffect } from "react";

interface ParallaxGradientBackgroundProps {
  children: React.ReactNode;
}

const ParallaxGradientBackground: React.FC<ParallaxGradientBackgroundProps> = ({ children }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth;
      const y = e.clientY / innerHeight;
      // Calculate gradient position based on mouse - using retro arcade colors
      bgRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, #0D1B2A 0%, #020617 100%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          transition: "background 0.3s cubic-bezier(.4,0,.2,1)",
          pointerEvents: "none",
        }}
        ref={bgRef}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default ParallaxGradientBackground; 