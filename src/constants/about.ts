// ==========================================
// About Section Data
// ==========================================

import { FaCode, FaMicrochip, FaLightbulb } from 'react-icons/fa';
import { Highlight, Stat } from '@/types';

export const highlights: Highlight[] = [
  { icon: FaCode, title: 'Web Dev', desc: 'Frontend & Backend' },
  { icon: FaMicrochip, title: 'IoT', desc: 'Hardware & Software' },
  { icon: FaLightbulb, title: 'Creative', desc: 'Problem Solving' },
];

export const stats: Stat[] = [
  { value: '10+', label: 'Projects' },
  { value: '2+', label: 'Years Exp' },
  { value: '3.8', label: 'GPA' },
];
