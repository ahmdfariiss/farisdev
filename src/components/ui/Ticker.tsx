'use client';

interface TickerProps {
  items?: string[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  className?: string;
}

const defaultItems = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js',
  'Python', 'Arduino', 'ESP32', 'Supabase', 'PostgreSQL',
  'Framer Motion', 'Three.js', 'Docker', 'Git', 'Figma', 'IoT',
];

export default function Ticker({
  items = defaultItems,
  direction = 'left',
  className = '',
}: TickerProps) {
  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      className={`overflow-hidden py-3 border-y border-white/5 ${className}`}
      style={{ WebkitMaskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}
    >
      <div
        className={`flex gap-8 whitespace-nowrap ${
          direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-[10px] tracking-[0.35em] uppercase text-neutral-600 font-mono shrink-0"
          >
            {item}
            <span className="text-[var(--accent)] opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
