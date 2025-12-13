'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface CardContent {
  id: string;
  children: React.ReactNode;
}

interface StackedCardsProps {
  cards: CardContent[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
}

export default function StackedCards({
  cards,
  activeIndex = 0,
  onIndexChange,
}: StackedCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(activeIndex);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % cards.length;
    setCurrentIndex(nextIndex);
    onIndexChange?.(nextIndex);
  };

  return (
    <div className="relative w-full h-100 perspective-1000">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const offset = index - currentIndex;
          const isActive = index === currentIndex;

          // Calculate position for stacked effect
          const zIndex = cards.length - Math.abs(offset);
          let scale = 1 - Math.abs(offset) * 0.08;
          const y = Math.abs(offset) * 20;
          let opacity = 1 - Math.abs(offset) * 0.3;
          const rotateX = offset * 3;

          if (Math.abs(offset) > 2) {
            opacity = 0;
            scale = 0.8;
          }

          return (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{
                opacity,
                y: offset < 0 ? -y : y,
                scale,
                rotateX,
                zIndex,
              }}
              exit={{ opacity: 0, y: -100, scale: 0.8 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              onClick={isActive ? handleNext : undefined}
              className={`absolute inset-0 cursor-pointer ${
                isActive ? '' : 'pointer-events-none'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center bottom',
              }}
            >
              {card.children}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              onIndexChange?.(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
