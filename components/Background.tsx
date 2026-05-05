"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-container">
      {/* SUBTLE BLOBS - Reduced opacity further for minimality */}
      <motion.div
        className="blob blob-1"
        style={{ opacity: 0.1 }}
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="blob blob-2"
        style={{ opacity: 0.08 }}
        animate={{
          x: [0, -30, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          delay: 2,
          ease: "linear",
        }}
      />

      {/* MINIMAL MOMENTS: SPARKLING PARTICLES */}
      <div className="particles-layer">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              x: Math.random() * 100 + "vw", 
              y: Math.random() * 100 + "vh",
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [Math.random() * 100 + "vw", (Math.random() * 100 - 20) + "vw"],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 30 + 30,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20
            }}
            style={{
              width: 2 + Math.random() * 3 + "px",
              height: 2 + Math.random() * 3 + "px",
              backgroundColor: i % 2 === 0 ? "var(--accent2)" : "var(--coral)",
              borderRadius: "50%",
              filter: "blur(1px)",
              position: "absolute",
            }}
          />
        ))}
      </div>

      {/* LIGHT STREAKS - Very subtle */}
      <motion.div 
        className="light-streak"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      <div className="bg-overlay" />
    </div>
  );
}
