'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import ProgressBar from '@/components/ui/ProgressBar';
import TiltCard from '@/components/ui/TiltCard';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  github?: string;
  demo?: string;
  tech?: string[];
}

const defaultProjects: ProjectData[] = [
  {
    id: 'proj1',
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion with a unique editorial design.',
    image: '',
    category: 'Web',
    featured: true,
    github: 'https://github.com/ahmdfariiss',
    demo: 'https://example.com',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion', 'Supabase'],
  },
  {
    id: 'proj2',
    title: 'IoT Smart Home',
    description: 'Smart home automation system using ESP32 and MQTT protocol for remote monitoring and control.',
    image: '',
    category: 'IoT',
    featured: false,
    github: 'https://github.com/ahmdfariiss',
    tech: ['Arduino', 'ESP32', 'MQTT', 'Python'],
  },
  {
    id: 'proj3',
    title: 'Full-Stack App',
    description: 'A complete web application with authentication, real-time data, and a clean user experience.',
    image: '',
    category: 'Web',
    featured: false,
    github: 'https://github.com/ahmdfariiss',
    demo: 'https://example.com',
    tech: ['React', 'Node.js', 'PostgreSQL'],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Web: '#3178c6',
  IoT: '#ec4899',
  Mobile: '#f59e0b',
  ML: '#8b5cf6',
};

export default function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>(defaultProjects);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data } = await supabase.from('projects').select('*').order('order_index');
        if (data && data.length > 0) setProjects(data);
      } catch (e) {
        console.error('Projects fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <ProgressBar loading={loading} estimated={2000} />
      <section id="projects" className="py-32 relative">
        <div className="section-line absolute top-0 left-0 right-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label block mb-4">Selected Work</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none">
                Projects<br />
                <span className="text-[var(--text-muted)]">Showcase</span>
              </h2>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 flex-wrap"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 text-[10px] tracking-[0.2em] uppercase rounded-full border transition-all duration-300 font-mono cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-white text-black border-white font-bold'
                      : 'text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Masonry-style grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
            >
              {filtered.map((project, index) => {
                const isFeatured = project.featured && index === 0;
                const isHovered = hoveredProject === project.id;
                const catColor = CATEGORY_COLORS[project.category] || '#6b7280';

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    className={`group relative ${isFeatured ? 'md:col-span-2' : ''}`}
                  >
                    <Link href={project.id ? `/project/${project.id}` : '#'}>
                      <TiltCard>
                        <div
                          className="h-full rounded-2xl border overflow-hidden transition-all duration-400 cursor-pointer bg-[var(--surface)]"
                        style={{
                          background: 'var(--surface)',
                          borderColor: isHovered ? `${catColor}30` : 'var(--border)',
                          boxShadow: isHovered ? `0 20px 60px ${catColor}0f` : 'none',
                        }}
                      >
                        {/* Image area */}
                        <div className={`relative w-full overflow-hidden bg-[var(--surface)] ${isFeatured ? 'aspect-video' : 'aspect-video'}`}>
                          {project.image ? (
                            <>
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-70" />
                            </>
                          ) : (
                            // Placeholder with category color
                            <div
                              className="absolute inset-0 flex items-center justify-center"
                              style={{ background: `linear-gradient(135deg, #111 0%, ${catColor}15 100%)` }}
                            >
                              <div className="flex flex-col items-center gap-3 opacity-30">
                                <div className="w-16 h-16 rounded-2xl border border-[var(--border)] flex items-center justify-center">
                                  <span className="text-2xl">📁</span>
                                </div>
                                <span className="text-xs font-mono text-[var(--text-muted)]">{project.category}</span>
                              </div>
                            </div>
                          )}

                          {/* Category badge */}
                          <div className="absolute top-4 left-4">
                            <span
                              className="text-[10px] px-3 py-1.5 rounded-full font-mono tracking-wider"
                              style={{
                                backgroundColor: `${catColor}20`,
                                color: catColor,
                                border: `1px solid ${catColor}30`,
                              }}
                            >
                              {project.category}
                            </span>
                          </div>

                          {project.featured && (
                            <div className="absolute top-4 right-4">
                              <span className="text-[10px] px-3 py-1.5 rounded-full font-mono bg-[var(--accent)] text-black font-bold">
                                Featured
                              </span>
                            </div>
                          )}

                          {/* Hover overlay */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 flex items-center justify-center gap-4"
                            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                          >
                            {project.github && (
                              <span
                                onClick={(e) => { e.preventDefault(); window.open(project.github, '_blank'); }}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-[var(--accent)] transition-colors"
                              >
                                <FaGithub size={12} /> Code
                              </span>
                            )}
                            {project.demo && (
                              <span
                                onClick={(e) => { e.preventDefault(); window.open(project.demo, '_blank'); }}
                                className="flex items-center gap-2 px-4 py-2 border border-[var(--border-hover)] text-[var(--text-primary)] text-xs font-bold rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                              >
                                <FaExternalLinkAlt size={11} /> Demo
                              </span>
                            )}
                          </motion.div>
                        </div>

                        {/* Info */}
                        <div className="p-5 md:p-6">
                          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4 line-clamp-2">
                            {project.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {project.tech?.slice(0, 3).map((t) => (
                                <span key={t} className="text-[10px] px-2 py-1 rounded bg-[var(--surface-2)] text-[var(--text-muted)] font-mono">
                                  {t}
                                </span>
                              ))}
                              {project.tech && project.tech.length > 3 && (
                                <span className="text-[10px] text-neutral-700 font-mono">+{project.tech.length - 3}</span>
                              )}
                            </div>
                            <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                              Details →
                            </span>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* View more */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/ahmdfariiss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] text-sm transition-colors font-mono"
            >
              <FaGithub size={14} />
              View all projects on GitHub →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
