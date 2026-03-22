'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiJavascript, SiHtml5, SiCss3, SiGit, SiMongodb,
  SiPostgresql, SiExpress, SiPrisma, SiSupabase, SiFirebase,
  SiMysql, SiDocker, SiVercel, SiLinux, SiArduino, SiRaspberrypi,
  SiFigma, SiGithub, SiPostman, SiPhp, SiLaravel,
} from 'react-icons/si';
import { FaCode, FaMicrochip, FaServer, FaCloud, FaDatabase, FaHome, FaAws, FaPython } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { supabase } from '@/lib/supabase';

interface SkillData {
  id: string;
  name: string;
  level: number;
  category: string;
  icon: string;
}

const defaultSkills: SkillData[] = [
  { id: '1', name: 'Next.js', level: 85, category: 'frontend', icon: 'SiNextdotjs' },
  { id: '2', name: 'React', level: 85, category: 'frontend', icon: 'SiReact' },
  { id: '3', name: 'TypeScript', level: 80, category: 'frontend', icon: 'SiTypescript' },
  { id: '4', name: 'Tailwind CSS', level: 90, category: 'frontend', icon: 'SiTailwindcss' },
  { id: '5', name: 'JavaScript', level: 85, category: 'frontend', icon: 'SiJavascript' },
  { id: '6', name: 'HTML5', level: 95, category: 'frontend', icon: 'SiHtml5' },
  { id: '7', name: 'Node.js', level: 75, category: 'backend', icon: 'SiNodedotjs' },
  { id: '8', name: 'Python', level: 80, category: 'backend', icon: 'SiPython' },
  { id: '9', name: 'Express', level: 70, category: 'backend', icon: 'SiExpress' },
  { id: '10', name: 'PHP', level: 75, category: 'backend', icon: 'SiPhp' },
  { id: '11', name: 'Laravel', level: 70, category: 'backend', icon: 'SiLaravel' },
  { id: '12', name: 'PostgreSQL', level: 70, category: 'database', icon: 'SiPostgresql' },
  { id: '13', name: 'MongoDB', level: 65, category: 'database', icon: 'SiMongodb' },
  { id: '14', name: 'Supabase', level: 75, category: 'database', icon: 'SiSupabase' },
  { id: '15', name: 'MySQL', level: 70, category: 'database', icon: 'SiMysql' },
  { id: '16', name: 'Arduino', level: 80, category: 'iot', icon: 'SiArduino' },
  { id: '17', name: 'ESP32', level: 75, category: 'iot', icon: 'FaMicrochip' },
  { id: '18', name: 'Raspberry Pi', level: 70, category: 'iot', icon: 'SiRaspberrypi' },
  { id: '19', name: 'Git', level: 85, category: 'tools', icon: 'SiGit' },
  { id: '20', name: 'Docker', level: 60, category: 'tools', icon: 'SiDocker' },
  { id: '21', name: 'Figma', level: 70, category: 'tools', icon: 'SiFigma' },
  { id: '22', name: 'VS Code', level: 90, category: 'tools', icon: 'VscCode' },
];

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiNodedotjs,
  SiPython, SiJavascript, SiHtml5, SiCss3, SiGit, SiMongodb,
  SiPostgresql, SiExpress, SiPrisma, SiSupabase, SiFirebase,
  SiMysql, SiDocker, SiVercel, SiLinux, SiArduino, SiRaspberrypi,
  SiFigma, SiGithub, SiPostman, SiPhp, SiLaravel,
  FaCode, FaMicrochip, FaServer, FaCloud, FaDatabase, FaHome, FaAws, FaPython,
  VscCode,
};

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#3178c6',
  backend: '#22c55e',
  database: '#f59e0b',
  iot: '#ec4899',
  tools: '#8b5cf6',
};

const categories = ['all', 'frontend', 'backend', 'database', 'iot', 'tools'];

export default function Skills() {
  const [skills, setSkills] = useState<SkillData[]>(defaultSkills);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeFilter === 'all'
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === activeFilter);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await supabase.from('skills').select('*').order('order_index');
        if (data && data.length > 0) setSkills(data);
      } catch (e) {
        console.error('Skills fetch error:', e);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-32 relative">
      <div className="absolute inset-0 bg-[var(--surface)] pointer-events-none" />
      <div className="section-line absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header + filter row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label block mb-4">What I Work With</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none">
              Skills &<br />
              <span className="text-[var(--text-muted)]">Technologies</span>
            </h2>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase rounded-full border transition-all duration-300 font-mono cursor-pointer"
                style={
                  activeFilter === cat
                    ? {
                        backgroundColor: cat === 'all' ? 'var(--accent)' : CATEGORY_COLORS[cat],
                        borderColor: cat === 'all' ? 'var(--accent)' : CATEGORY_COLORS[cat],
                        color: '#fff',
                        fontWeight: 700,
                      }
                    : {
                        color: '#6b7280',
                        borderColor: 'rgba(255,255,255,0.1)',
                      }
                }
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3"
          >
            {filteredSkills.map((skill, index) => {
              const Icon = iconMap[skill.icon] || FaCode;
              const isHovered = hoveredSkill === skill.id;
              const catColor = CATEGORY_COLORS[skill.category] || '#6b7280';

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className="relative flex flex-col items-center justify-center p-4 md:p-5 rounded-2xl border cursor-pointer group transition-all duration-200"
                  style={{
                    borderColor: isHovered ? `${catColor}40` : 'rgba(255,255,255,0.06)',
                    backgroundColor: isHovered ? `${catColor}08` : 'rgba(255,255,255,0.03)',
                    boxShadow: isHovered ? `0 0 20px ${catColor}10` : 'none',
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    animate={{ rotate: isHovered ? 360 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="text-2xl md:text-3xl mb-2"
                  >
                    <Icon
                      style={{ color: isHovered ? catColor : undefined }}
                      className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200"
                    />
                  </motion.div>

                  {/* Name */}
                  <span className="text-[10px] md:text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors text-center leading-tight">
                    {skill.name}
                  </span>

                  {/* Level bar on hover */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden"
                    style={{ originX: 0 }}
                  >
                    <div
                      className="h-full"
                      style={{ width: `${skill.level}%`, backgroundColor: catColor }}
                    />
                  </motion.div>

                  {/* Level tooltip */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-1 rounded bg-[var(--surface)] border border-[var(--border)] whitespace-nowrap z-10"
                      style={{ color: catColor }}
                    >
                      {skill.level}%
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Count indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-neutral-700 text-xs font-mono mt-8"
        >
          {filteredSkills.length} technologies
          {activeFilter !== 'all' && ` in ${activeFilter}`}
        </motion.p>
      </div>
    </section>
  );
}
