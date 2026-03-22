'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMicrochip } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface ProfileData {
  name: string;
  bio: string[];
  avatar: string;
}

interface StatData {
  value: string;
  label: string;
}

const defaultProfile: ProfileData = {
  name: 'Ahmad Faris',
  bio: [
    'Passionate about building web applications and IoT solutions that make a difference.',
    'Currently in my final semesters, sharpening my craft in full-stack development and embedded systems.',
  ],
  avatar: '/avatar.jpg',
};

const defaultStats: StatData[] = [
  { value: '10+', label: 'Projects' },
  { value: '2+', label: 'Years Coding' },
  { value: '5+', label: 'Technologies' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [stats, setStats] = useState<StatData[]>(defaultStats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: profileData } = await supabase
          .from('profile')
          .select('name, bio, avatar')
          .single();
        if (profileData) setProfile(profileData);

        const { data: statsData } = await supabase.from('stats').select('value, label');
        if (statsData && statsData.length > 0) setStats(statsData);
      } catch (e) {
        console.error('About fetch error:', e);
      }
    };
    fetchData();
  }, []);

  const inViewVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="section-label block mb-4">The Human Behind the Code</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none">
            About<br />
            <span className="text-neutral-600">Me</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* === Tile 1: Large — Profile photo + Bio === */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={inViewVariant}
            className="lg:col-span-7 bento-tile p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-[var(--border)] relative">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                )}
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--accent)] rounded-full border-2 border-[var(--bg)] flex items-center justify-center">
                <div className="w-2 h-2 bg-[var(--bg)] rounded-full" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[var(--accent)] text-xs font-mono">●</span>
                <span className="section-label">Available for opportunities</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">{profile.name}</h3>
              <div className="space-y-3">
                {profile.bio.map((para, i) => (
                  <p key={i} className="text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">{para}</p>
                ))}
              </div>

              {/* Highlight badges */}
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-white/3 text-sm text-neutral-300">
                  <FaCode className="text-[var(--accent)]" size={12} />
                  Web Development
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-white/3 text-sm text-neutral-300">
                  <FaMicrochip className="text-[var(--accent)]" size={12} />
                  IoT Engineering
                </div>
              </div>
            </div>
          </motion.div>

          {/* === Right column: Stats + Philosophy === */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Stats */}
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inViewVariant}
              className="bento-tile p-6 grid grid-cols-3 gap-4"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
                    className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="section-label text-neutral-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Philosophy / Quote tile */}
            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={inViewVariant}
              className="bento-tile p-8 flex-1 flex flex-col justify-between"
            >
              <span className="section-label mb-6 block">Philosophy</span>
              <blockquote className="text-2xl md:text-3xl font-black text-[var(--text-primary)] leading-tight">
                "Build things that{' '}
                <span className="text-[var(--accent)]">matter</span>,
                learn things that{' '}
                <span className="text-neutral-500">last</span>."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-8 h-px bg-white/20" />
                <span className="text-xs text-neutral-600 font-mono">Ahmad Faris</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
