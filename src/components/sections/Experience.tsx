'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { experiences } from '@/constants';

const iconMap = {
  work: FaBriefcase,
  education: FaGraduationCap,
  achievement: FaTrophy,
};

const colorMap = {
  work: 'border-white/30',
  education: 'border-white/20',
  achievement: 'border-white/40',
};

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      {/* LAYOUT: Horizontal Scroll Cards with Sticky Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref}>
          {/* Header - Left Side Sticky on Desktop */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column - Sticky Title */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xs tracking-[0.3em] text-neutral-500 uppercase block mb-4">
                  My Journey
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Experience
                </h2>
                <p className="text-neutral-500 mb-8 leading-relaxed">
                  Timeline perjalanan saya dalam dunia teknologi dan pendidikan.
                </p>
                
                {/* Legend */}
                <div className="flex flex-wrap gap-4">
                  {Object.entries(iconMap).map(([type, Icon]) => (
                    <div key={type} className="flex items-center gap-2 text-xs text-neutral-500">
                      <Icon size={12} />
                      <span className="capitalize">{type}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Cards */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {experiences.map((exp, index) => {
                  const Icon = iconMap[exp.type as keyof typeof iconMap];
                  const borderColor = colorMap[exp.type as keyof typeof colorMap];
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
                    >
                      <motion.div
                        whileHover={{ x: 8, borderColor: 'rgba(255,255,255,0.4)' }}
                        className={`group p-6 md:p-8 bg-neutral-900/30 border-l-2 ${borderColor} rounded-r-2xl hover:bg-neutral-900/50 transition-all duration-300`}
                      >
                        {/* Top Row */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                              <Icon className="text-white/60" size={16} />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-white">{exp.title}</h3>
                              <p className="text-sm text-neutral-500">{exp.organization}</p>
                            </div>
                          </div>
                          <span className="text-xs text-neutral-600 font-mono bg-white/5 px-3 py-1 rounded-full">
                            {exp.period}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-neutral-400 text-sm leading-relaxed mb-4 ml-14">
                          {exp.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 ml-14">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs bg-white/5 rounded-full text-neutral-400 group-hover:bg-white/10 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-white/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
