"use client";

import { usePointerPosition } from "motion-plus/react";
import { motion, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

function Filing({ isHovered, isActive, isAnimationComplete }) {
  const pointer = usePointerPosition();
  const filingRef = useRef(null);
  const [centerX, setCenterX] = useState(null);
  const [centerY, setCenterY] = useState(null);

  // Measure the filing's position only after animation completes
  useEffect(() => {
    if (isActive && isAnimationComplete && filingRef.current) {
      const rect = filingRef.current.getBoundingClientRect();
      setCenterX(rect.left + rect.width / 2);
      setCenterY(rect.top + rect.height / 2);
    }
  }, [isActive, isAnimationComplete]);

  // Calculate angle from filing position to cursor position
  const rotate = useTransform(() => {
    if (!isHovered) return { rotate: 0 };
    if (centerX === null || centerY === null) return 0;

    const pointerX = pointer.x.get();
    const pointerY = pointer.y.get();

    const deltaX = pointerX - centerX;
    const deltaY = pointerY - centerY;

    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  });

  return <motion.div ref={filingRef} className="filing" style={{ rotate }} />;
}

export default function MagneticFillings({
  size = 16,
  isActive,
  isAnimationComplete,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="container"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <div
        className="square"
        style={{
          "--grid-size": size,
          "--grid-cols": size,
          "--grid-rows": size,
        }}
      >
        {Array.from({ length: size * size }).map((_, index) => (
          <Filing
            key={index}
            isHovered={isHovered}
            isActive={isActive}
            isAnimationComplete={isAnimationComplete}
          />
        ))}
      </div>

      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
        body {
            overflow: hidden;
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .square {
          position: relative;
          width: 400px;
          height: 300px;
          background-color: #0b1011;
          border-radius: 8px;
          padding: 20px;
          display: grid;
          grid-template-columns: repeat(var(--grid-cols), 1fr);
          grid-template-rows: repeat(var(--grid-rows), 1fr);
          gap: 1px;
        }

        @media (max-width: 499px) {
          .square {
            width: 300px;
            height: 300px;
            padding: 15px;
          }
        }

        .filing {
          width: 70%;
          height: 2px;
          background: #f5f5f5;
          border-radius: 1px;
          transform-origin: center 50%;
          justify-self: center;
          align-self: center;
          will-change: transform;
        }

        @media (max-width: 499px) {
          .filing {
            border-radius: 0.5px;
          }
        }
      `}
    </style>
  );
}
