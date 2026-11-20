"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Carrega o react-confetti em um chunk separado, fora do bundle inicial.
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function Confetti() {
  const [size, setSize] = useState(null);

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    updateSize();
    window.addEventListener("resize", updateSize, { passive: true });
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!size) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      recycle={false}
      numberOfPieces={400}
      style={{ position: "fixed", inset: 0, pointerEvents: "none" }}
    />
  );
}
