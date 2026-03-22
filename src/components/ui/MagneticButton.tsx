'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  strength = 0.3,
  as: Tag = 'button',
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionProps: any = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: position,
    transition: { type: 'spring', stiffness: 200, damping: 20, mass: 0.5 } as any,
    className: `magnetic-wrap ${className}`,
    onClick,
  };

  if (Tag === 'a') {
    return (
      <motion.a {...motionProps} href={href} target={target} rel={rel}>
        {children}
      </motion.a>
    );
  }

  return <motion.button {...motionProps}>{children}</motion.button>;
}
