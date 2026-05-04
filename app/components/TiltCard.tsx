"use client";

import { useRef } from "react";

export default function TiltCard({ children }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: any) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 10;
    const rotateY = (x / rect.width - 0.5) * 10;

    ref.current!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const reset = () => {
    ref.current!.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="transition-transform duration-200"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}