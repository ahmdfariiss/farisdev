'use client';

import { motion } from 'framer-motion';
import { useSupabaseProfile } from '@/hooks/useSupabase';
import { FaMapMarkerAlt, FaCode, FaMicrochip, FaArrowRight } from 'react-icons/fa';
import { HiCode, HiUser, HiViewGrid } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiJavascript, SiHtml5, SiGit, SiMongodb,
  SiPostgresql, SiSupabase, SiArduino, SiDocker, SiFigma,
} from 'react-icons/si';
import { FaNodeJs, FaPython } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

const SKILL_ICONS = [
  { icon: SiNextdotjs, label: 'Next.js', color: '#ffffff' },
  { icon: SiReact, label: 'React', color: '#61dafb' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178c6' },
  { icon: SiJavascript, label: 'JavaScript', color: '#f1e05a' },
  { icon: SiTailwindcss, label: 'Tailwind', color: '#06b6d4' },
  { icon: SiHtml5, label: 'HTML5', color: '#e34c26' },
  { icon: FaNodeJs, label: 'Node.js', color: '#339933' },
  { icon: FaPython, label: 'Python', color: '#3572A5' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#336791' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47a248' },
  { icon: SiSupabase, label: 'Supabase', color: '#3ecf8e' },
  { icon: SiArduino, label: 'Arduino', color: '#00979d' },
  { icon: SiGit, label: 'Git', color: '#f05032' },
  { icon: SiDocker, label: 'Docker', color: '#2496ed' },
  { icon: SiFigma, label: 'Figma', color: '#f24e1e' },
  { icon: VscCode, label: 'VS Code', color: '#007acc' },
];

const JOURNEY_CARDS = [
  {
    icon: HiCode,
    title: 'Projects Showcase',
    desc: 'A selection of my best apps.',
    href: '/projects',
    color: '#3178c6',
  },
  {
    icon: HiUser,
    title: 'About Me',
    desc: "Who I am and what I do.",
    href: '/about',
    color: '#22c55e',
  },
  {
    icon: HiViewGrid,
    title: 'Skills & Tools',
    desc: 'Complete tech stack & proficiency.',
    href: '/skills',
    color: '#f59e0b',
  },
];

export default function HomePage() {
  const { profile } = useSupabaseProfile();
  const name = profile?.name || 'Ahmad Faris';

  return (
    <div className="space-y-12">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2">
          Hi, I&apos;m {name}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt size={12} className="text-[var(--text-muted)]" />
            Based in {profile?.location || 'Indonesia'} 🇮🇩
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full" />
            Available
          </span>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="max-w-2xl"
      >
        {profile?.bio ? (
          profile.bio.map((para: string, i: number) => (
            <p key={i} className="text-[var(--text-secondary)] leading-relaxed mb-3">
              {para}
            </p>
          ))
        ) : (
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Passionate about building web applications and IoT solutions that make a difference.
            Currently in my final semesters, sharpening my craft in full-stack development and embedded systems.
          </p>
        )}
      </motion.div>

      {/* Focus areas */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-3"
      >
        <span className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-white/3 text-sm text-neutral-300">
          <FaCode className="text-[var(--accent)]" size={14} />
          Web Development
        </span>
        <span className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-white/3 text-sm text-neutral-300">
          <FaMicrochip className="text-[var(--accent)]" size={14} />
          IoT Engineering
        </span>
      </motion.div>

      {/* Skills Preview */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
          <span className="text-[var(--accent)]">⟨/⟩</span> Skills
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">My professional skills.</p>

        <div className="flex flex-wrap gap-3">
          {SKILL_ICONS.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.02 * i + 0.25, duration: 0.3 }}
              whileHover={{ y: -4, scale: 1.15 }}
              className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-colors group relative"
              style={{ backgroundColor: `${skill.color}15`, border: `1px solid ${skill.color}20` }}
              title={skill.label}
            >
              <skill.icon size={20} style={{ color: skill.color }} />
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded text-[var(--text-primary)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {skill.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* My Creative Journey */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
          <span className="text-[var(--accent)]">◈</span> My Creative Journey
        </h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          A curated overview of what I build, how I think, and where I add value.
        </p>

        <div className="grid sm:grid-cols-3 gap-3">
          {JOURNEY_CARDS.map((card, i) => (
            <Link key={card.href + i} href={card.href}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ y: -4, borderColor: `${card.color}40` }}
                className="p-5 rounded-2xl border border-white/8 bg-white/3 cursor-pointer group transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{card.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-[10px] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                  <span>View</span>
                  <FaArrowRight size={8} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
