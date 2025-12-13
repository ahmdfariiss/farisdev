'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  baseOpacity?: number;
  enableBlur?: boolean;
  rotateX?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  baseOpacity = 0.1,
  enableBlur = true,
  rotateX = false,
  className = '',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.25'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [baseOpacity, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], [enableBlur ? 8 : 0, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [rotateX ? 10 : 0, 0]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        opacity,
        y,
        rotateX: rotate,
        filter: enableBlur
          ? blur.get() > 0
            ? `blur(${blur.get()}px)`
            : 'none'
          : 'none',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
