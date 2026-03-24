"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
  justify?: "start" | "center" | "end";
}

export function RevealText({
  text = "NIMISH",
  textColor = "text-navy",
  overlayColor = "text-blue",
  fontSize = "text-[72px]",
  letterDelay = 0.08,
  overlayDelay = 0.05,
  overlayDuration = 0.4,
  springDuration = 600,
  letterImages = [],
  justify = "start",
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = lastLetterDelay * 1000 + springDuration;
    const timer = setTimeout(() => setShowOverlay(true), totalDelay);
    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  const justifyClass =
    justify === "center"
      ? "justify-center"
      : justify === "end"
      ? "justify-end"
      : "justify-start";

  return (
    <div className={`flex items-center ${justifyClass}`}>
      <div className="flex items-baseline leading-none">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`${fontSize} font-bold tracking-tight cursor-pointer relative overflow-hidden`}
            style={{
              fontFamily: "'Times New Roman', Times, Georgia, serif",
              lineHeight: 1,
              display: "inline-block",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 10,
              stiffness: 180,
              mass: 0.9,
            }}
          >
            {/* Base text */}
            <motion.span
              className={`absolute inset-0 ${textColor}`}
              style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
              animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
              transition={{ duration: 0.1 }}
            >
              {letter}
            </motion.span>

            {/* Image hover layer */}
            {letterImages.length > 0 && (
              <motion.span
                className="text-transparent bg-clip-text bg-cover bg-no-repeat"
                style={{
                  fontFamily: "'Times New Roman', Times, Georgia, serif",
                  backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundPosition: "center",
                }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.15 }}
              >
                {letter}
              </motion.span>
            )}

            {/* Overlay sweep */}
            {showOverlay && (
              <motion.span
                className={`absolute inset-0 ${overlayColor} pointer-events-none`}
                style={{ fontFamily: "'Times New Roman', Times, Georgia, serif" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
