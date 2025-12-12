// ==========================================
// Projects Data
// ==========================================

import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiArduino,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiPython,
} from 'react-icons/si';
import { Project } from '@/types';

export const projects: Project[] = [
  {
    title: 'Smart Home Dashboard',
    description: 'Real-time monitoring untuk smart home system.',
    category: 'IoT',
    tech: [SiReact, SiNodedotjs, SiArduino, SiFirebase],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    size: 'large',
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce dengan payment gateway.',
    category: 'Web',
    tech: [SiNextdotjs, SiTypescript, SiMongodb, SiTailwindcss],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    size: 'medium',
  },
  {
    title: 'Weather Station',
    description: 'Sistem monitoring cuaca berbasis ESP32.',
    category: 'IoT',
    tech: [SiReact, SiArduino, SiFirebase],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
    size: 'small',
  },
  {
    title: 'Task Manager',
    description: 'Aplikasi manajemen tugas dengan drag-and-drop.',
    category: 'Web',
    tech: [SiReact, SiNodedotjs, SiMongodb],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
    size: 'small',
  },
  {
    title: 'Plant Watering System',
    description: 'Sistem penyiraman tanaman otomatis berbasis IoT.',
    category: 'IoT',
    tech: [SiArduino, SiPython, SiFirebase],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    size: 'medium',
  },
  {
    title: 'Portfolio Website',
    description: 'Website portfolio dengan animasi interaktif.',
    category: 'Web',
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: false,
    size: 'small',
  },
];

export const projectFilters = ['All', 'Web', 'IoT'] as const;
