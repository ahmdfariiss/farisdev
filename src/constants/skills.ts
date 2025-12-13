// ==========================================
// Skills Data
// ==========================================

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiArduino,
  SiPython,
  SiGit,
  SiFirebase,
  SiFigma,
} from 'react-icons/si';
import { Skill } from '@/types';

export const skills: Skill[] = [
  { name: 'React', icon: SiReact, level: 90, category: 'frontend' },
  { name: 'Next.js', icon: SiNextdotjs, level: 85, category: 'frontend' },
  { name: 'TypeScript', icon: SiTypescript, level: 80, category: 'frontend' },
  { name: 'JavaScript', icon: SiJavascript, level: 95, category: 'frontend' },
  { name: 'Tailwind', icon: SiTailwindcss, level: 90, category: 'frontend' },
  { name: 'Node.js', icon: SiNodedotjs, level: 75, category: 'backend' },
  { name: 'MongoDB', icon: SiMongodb, level: 70, category: 'backend' },
  { name: 'Firebase', icon: SiFirebase, level: 80, category: 'backend' },
  { name: 'Arduino', icon: SiArduino, level: 85, category: 'iot' },
  { name: 'Python', icon: SiPython, level: 75, category: 'iot' },
  { name: 'Git', icon: SiGit, level: 85, category: 'tools' },
  { name: 'Figma', icon: SiFigma, level: 70, category: 'tools' },
];

export const skillCategories = [
  'All',
  'Frontend',
  'Backend',
  'IoT',
  'Tools',
] as const;
