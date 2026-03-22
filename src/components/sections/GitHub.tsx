'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaCode } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiPython, SiHtml5, SiCss3 } from 'react-icons/si';
import GitHubHeatmap from '@/components/ui/GitHubHeatmap';
import Image from 'next/image';

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value]);

  return <>{count}</>;
}

interface GitHubData {
  profile: {
    login: string;
    name: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    publicRepos: number;
    url: string;
  };
  totalStars: number;
  topRepos: {
    name: string;
    description: string;
    url: string;
    stars: number;
    forks: number;
    language: string;
    topics: string[];
  }[];
  languages: {
    name: string;
    count: number;
    percent: number;
  }[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  'C++': '#f34b7d',
  C: '#888888',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
};

const LANG_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  HTML: SiHtml5,
  CSS: SiCss3,
};

export default function GitHub() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/github');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('GitHub data error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = data
    ? [
        { label: 'Repositories', value: data.profile.publicRepos, suffix: '+' },
        { label: 'Total Stars', value: data.totalStars, suffix: '' },
        { label: 'Followers', value: data.profile.followers, suffix: '' },
      ]
    : null;

  return (
    <section id="github" className="py-32 relative">
      {/* Section line top */}
      <div className="section-line mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label block mb-4">Open Source Activity</span>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-primary)] leading-none">
              GitHub<br />
              <span className="text-[var(--text-muted)]">Dashboard</span>
            </h2>
            {data?.profile && (
              <a
                href={data.profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-secondary)] text-sm transition-all rounded-sm group"
              >
                <FaGithub size={16} />
                <span>@{data.profile.login}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Stats Row */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-tile p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-1">
                  <Counter value={stat.value as number} />{stat.suffix}
                </div>
                <div className="section-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bento-tile p-6 md:p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="section-label">Contribution Activity</span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">Last 52 weeks</span>
          </div>
          <GitHubHeatmap />
        </motion.div>

        {/* Top repos + Languages */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Top repos (3 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <span className="section-label block mb-4">Recent Repositories</span>
            <div className="space-y-3">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bento-tile p-5 animate-pulse h-24" />
                  ))
                : data?.topRepos.slice(0, 5).map((repo, i) => (
                    <motion.a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      whileHover={{ x: 4 }}
                      className="bento-tile p-5 flex items-start justify-between gap-4 block hover:border-[var(--accent)]/30"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCode size={12} className="text-[var(--accent)] shrink-0" />
                          <span className="text-[var(--text-primary)] font-medium text-sm truncate">{repo.name}</span>
                          {repo.language && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded font-mono shrink-0"
                              style={{
                                backgroundColor: `${LANG_COLORS[repo.language] || '#6b7280'}20`,
                                color: LANG_COLORS[repo.language] || '#6b7280',
                              }}
                            >
                              {repo.language}
                            </span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="text-[var(--text-muted)] text-xs leading-relaxed line-clamp-2">
                            {repo.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[var(--text-muted)] text-xs shrink-0">
                        <span className="flex items-center gap-1">
                          <FaStar size={10} />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCodeBranch size={10} />
                          {repo.forks}
                        </span>
                      </div>
                    </motion.a>
                  ))}
            </div>
          </motion.div>

          {/* Languages (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <span className="section-label block mb-4">Top Languages</span>
            <div className="bento-tile p-6 h-full">
              {/* Donut-style list */}
              <div className="space-y-4">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="animate-pulse h-8 bg-[var(--surface-2)] rounded" />
                    ))
                  : data?.languages.map((lang, i) => {
                      const Icon = LANG_ICONS[lang.name];
                      return (
                        <motion.div
                          key={lang.name}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i + 0.4 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {Icon && (
                                <Icon
                                  className="text-sm shrink-0"
                                  style={{ color: LANG_COLORS[lang.name] || '#6b7280' }}
                                />
                              )}
                              <span className="text-sm text-neutral-300">{lang.name}</span>
                            </div>
                            <span className="text-xs font-mono text-[var(--text-muted)]">{lang.percent}%</span>
                          </div>
                          <div className="h-1 bg-[var(--surface-2)] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.1 * i + 0.5, ease: 'easeOut' }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: LANG_COLORS[lang.name] || '#6b7280' }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
              </div>

              {/* Profile card at bottom */}
              {data?.profile && (
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
                  <Image
                    src={data.profile.avatar}
                    alt={data.profile.name}
                    width={36}
                    height={36}
                    className="rounded-full border border-[var(--border)]"
                  />
                  <div>
                    <div className="text-sm text-[var(--text-primary)] font-medium">{data.profile.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{data.profile.following} following · {data.profile.followers} followers</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
