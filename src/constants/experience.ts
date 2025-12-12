// ==========================================
// Experience Data
// ==========================================

import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    type: 'work',
    title: 'Web Developer Intern',
    organization: 'Tech Startup XYZ',
    period: '2024',
    description: 'Mengembangkan fitur frontend menggunakan React dan Next.js.',
    skills: ['React', 'Next.js', 'TypeScript'],
  },
  {
    type: 'education',
    title: 'S1 Ilmu Komputer',
    organization: 'Universitas Indonesia',
    period: '2022 - Now',
    description: 'Semester 5 dengan fokus pada Web Development dan IoT.',
    skills: ['Algoritma', 'Database', 'IoT'],
  },
  {
    type: 'achievement',
    title: 'Juara 2 Hackathon IoT',
    organization: 'National Competition',
    period: '2024',
    description: 'Smart farming system dengan ESP32 dan web dashboard.',
    skills: ['ESP32', 'React', 'Firebase'],
  },
  {
    type: 'work',
    title: 'Freelance Developer',
    organization: 'Self-Employed',
    period: '2023',
    description: 'Membangun website untuk berbagai klien UMKM.',
    skills: ['WordPress', 'JavaScript', 'SEO'],
  },
];
