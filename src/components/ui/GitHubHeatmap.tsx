'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubHeatmapProps {
  username?: string;
}

const LEVEL_COLORS = [
  '#161616', // 0 - empty
  '#2d4a00', // 1 - low
  '#4a7a00', // 2 - medium-low
  '#7bc500', // 3 - medium-high
  '#b8ff00', // 4 - highest (accent)
];

function groupByWeek(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  days.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return weeks;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export default function GitHubHeatmap({ username }: GitHubHeatmapProps) {
  const [grid, setGrid] = useState<ContributionDay[]>([]);
  const [stats, setStats] = useState({ totalCommits: 0, activeDays: 0 });
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/github/contributions');
        const data = await res.json();
        if (data.grid) {
          setGrid(data.grid);
          setStats({ totalCommits: data.totalCommits, activeDays: data.activeDays });
        }
      } catch (e) {
        console.error('Heatmap fetch error:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  const weeks = groupByWeek(grid);

  // Get month labels by finding first day of each month in the grid
  const monthPositions: { label: string; col: number }[] = [];
  weeks.forEach((week, weekIdx) => {
    week.forEach((day) => {
      const d = new Date(day.date + 'T00:00:00');
      if (d.getDate() <= 7) {
        const existing = monthPositions.find((m) => m.label === MONTH_LABELS[d.getMonth()]);
        if (!existing) {
          monthPositions.push({ label: MONTH_LABELS[d.getMonth()], col: weekIdx });
        }
      }
    });
  });

  if (loading) {
    return (
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-1 animate-pulse">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              {Array.from({ length: 7 }).map((__, j) => (
                <div key={j} className="w-3 h-3 rounded-sm bg-white/5" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <div className="overflow-x-auto no-scrollbar pb-4">
        <div className="min-w-max relative">
          {/* Month labels */}
          <div className="flex gap-[3px] ml-8 mb-1">
            {weeks.map((_, weekIdx) => {
              const monthPos = monthPositions.find((m) => m.col === weekIdx);
              return (
                <div key={weekIdx} className="w-3 flex-shrink-0">
                  {monthPos && (
                    <span className="text-[9px] text-neutral-600 font-mono whitespace-nowrap">
                      {monthPos.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-1">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="w-6 h-3 flex items-center justify-end">
                  <span className="text-[9px] text-neutral-700 font-mono">{label}</span>
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <motion.div
                    key={day.date}
                    className="heatmap-cell w-3 h-3 cursor-pointer"
                    style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                    whileHover={{ scale: 1.5 }}
                    onMouseEnter={(e) => {
                      const rect = (e.target as HTMLElement).getBoundingClientRect();
                      setTooltip({
                        date: day.date,
                        count: day.count,
                        x: rect.left + window.scrollX,
                        y: rect.top + window.scrollY,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-neutral-900 border border-white/10 px-3 py-2 rounded-lg text-[11px] font-mono text-white pointer-events-none shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y - 40 }}
        >
          <span className="text-neutral-400">{tooltip.date}</span>
          {' — '}
          <span style={{ color: tooltip.count > 0 ? 'var(--accent)' : 'inherit' }}>
            {tooltip.count} commit{tooltip.count !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] text-neutral-600 font-mono">Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
        ))}
        <span className="text-[10px] text-neutral-600 font-mono">More</span>
        <span className="ml-4 text-[10px] text-neutral-500 font-mono">
          {stats.totalCommits} commits · {stats.activeDays} active days
        </span>
      </div>
    </div>
  );
}
