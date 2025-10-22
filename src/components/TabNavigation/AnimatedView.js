"use client";
import React from "react";
import {
  motion,
  useTransform,
  useVelocity,
  useMotionTemplate,
} from "framer-motion";
import { useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const calculateViewX = (difference, containerWidth) => {
  return difference * (containerWidth * 0.75) * -1;
};

export function AnimatedView({
  children,
  containerWidth,
  viewIndex,
  activeIndex,
  contentRef,
}) {
  // Calculate the index difference between the active tab and the current tab
  const [difference, setDifference] = useState(activeIndex - viewIndex);
  const [isAnimationComplete, setIsAnimationComplete] = useState(
    viewIndex === activeIndex
  );

  const x = useSpring(calculateViewX(difference, containerWidth), {
    stiffness: 400,
    damping: 60,
  });

  const xVelocity = useVelocity(x);

  // The closer the view is to the center, the more opaque it is
  const opacity = useTransform(
    x,
    [-containerWidth * 0.6, 0, containerWidth * 0.6],
    [0, 1, 0]
  );

  // The more the view is moving, the more blurred it is
  const blur = useTransform(xVelocity, [-1000, 0, 1000], [4, 0, 4], {
    clamp: false,
  });

  const filter = useMotionTemplate`blur(${blur}px)`;

  useEffect(() => {
    const newDifference = activeIndex - viewIndex;
    setDifference(newDifference);
    const newX = calculateViewX(newDifference, containerWidth);
    x.set(newX);

    // Reset animation complete state when starting new animation
    if (newDifference !== 0) {
      setIsAnimationComplete(false);
    }
  }, [activeIndex, containerWidth, viewIndex, x]);

  // Listen for when spring animation completes
  useEffect(() => {
    if (viewIndex !== activeIndex) {
      return;
    }

    // Use a timeout as fallback since springs don't reliably fire animationComplete
    const timeout = setTimeout(() => {
      setIsAnimationComplete(true);
    }, 800); // Wait for spring animation (stiffness: 400, damping: 60)

    // Also try to listen for animation events
    const unsubscribe = x.on("animationComplete", () => {
      clearTimeout(timeout);
      if (viewIndex === activeIndex) {
        setIsAnimationComplete(true);
      }
    });

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [x, viewIndex, activeIndex]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        transformOrigin: "center",
        transform: "translate3d(0, 0, 0)",
        willChange: "transform, filter",
        isolation: "isolate",
        x,
        opacity,
        filter,
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children, {
              isActive: viewIndex === activeIndex,
              isAnimationComplete,
            })
          : children}
      </div>
    </motion.div>
  );
}

export const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
};
