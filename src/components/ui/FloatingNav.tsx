'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home');
  const [tooltip, setTooltip] = useState<string | null>(null);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    observersRef.current = observers;

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3">
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <div
            key={id}
            className="relative flex items-center justify-end gap-3"
            onMouseEnter={() => setTooltip(label)}
            onMouseLeave={() => setTooltip(null)}
          >
            {/* Tooltip */}
            {tooltip === label && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="absolute right-full mr-3 text-[10px] tracking-widest uppercase text-neutral-400 whitespace-nowrap pointer-events-none"
              >
                {label}
              </motion.span>
            )}

            {/* Dot */}
            <motion.button
              onClick={() => scrollTo(id)}
              animate={{
                height: isActive ? 28 : 6,
                backgroundColor: isActive ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                boxShadow: isActive ? '0 0 8px var(--accent)' : 'none',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              style={{ width: 6, borderRadius: 9999 }}
              aria-label={`Navigate to ${label}`}
            />
          </div>
        );
      })}
    </nav>
  );
}
