'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import Ticker from '@/components/ui/Ticker';
import { useSupabaseProfile } from '@/hooks/useSupabase';

const socialIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  twitter: FaTwitter,
};

// Floating 3D orb
function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    meshRef.current.rotation.y += 0.003;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#b8ff00"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.8}
        opacity={0.12}
        transparent
        wireframe
      />
    </mesh>
  );
}

// Outer ring
function OuterRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
    ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <mesh ref={ringRef} scale={2.4}>
      <torusGeometry args={[1, 0.008, 16, 100]} />
      <meshBasicMaterial color="#b8ff00" opacity={0.06} transparent />
    </mesh>
  );
}

export default function Hero() {
  const { profile } = useSupabaseProfile();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const displayProfile = profile || {
    name: 'Ahmad Faris',
    role: ['Web Developer', 'IoT Enthusiast', 'Creative Builder'],
    year: '2026',
    semester: 'Semester 7',
    social: {
      github: 'https://github.com/ahmdfariiss',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  };

  const roleSequence = displayProfile.role.flatMap((role: string) => [role, 2000]);

  const socialLinks = Object.entries(displayProfile.social || {})
    .filter(([, url]) => url && url !== '')
    .map(([key, url]) => ({
      key,
      url: url as string,
      icon: socialIconMap[key],
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }))
    .filter((l) => l.icon);

  // GSAP reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current || !contentRef.current) return;

      const tl = gsap.timeline({ delay: 0.2 });

      // Split name into chars for stagger
      const nameEl = titleRef.current;
      const text = nameEl.textContent || '';
      nameEl.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? '<span class="inline-block">&nbsp;</span>'
            : `<span class="inline-block overflow-hidden"><span class="char-inner inline-block">${char}</span></span>`
        )
        .join('');

      tl.from('.char-inner', {
        yPercent: 120,
        duration: 0.9,
        stagger: 0.04,
        ease: 'expo.out',
      });

      tl.from(
        contentRef.current.children,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Three.js Canvas – centred orb */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#b8ff00" />
          <FloatingOrb />
          <OuterRing />
        </Canvas>
      </div>

      {/* Gradient spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--accent)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-500 opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Year label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          <span className="section-label">
            Portfolio ✦ {displayProfile.year}
          </span>
        </motion.div>

        {/* Name - GSAP animated */}
        <h1
          ref={titleRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[var(--text-primary)] mb-6 tracking-tight leading-none"
        >
          {displayProfile.name}
        </h1>

        {/* Sub content */}
        <div ref={contentRef}>
          {/* Role animation */}
          <div className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 h-8 flex items-center justify-center gap-3">
            <span className="text-[var(--accent)]">◈</span>
            <TypeAnimation
              sequence={roleSequence}
              repeat={Infinity}
              cursor
              className="text-[var(--text-secondary)]"
            />
          </div>

          {/* Separator */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="w-20 h-px bg-white/10" />
            <span className="section-label text-[var(--text-muted)]">{displayProfile.semester}</span>
            <div className="w-20 h-px bg-white/10" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <MagneticButton
              className="group px-8 py-4 bg-[var(--accent)] text-black text-sm font-bold flex items-center gap-3 rounded-sm hover:bg-[#c5ff30] transition-colors cursor-pointer"
              onClick={() => scrollToSection('#projects')}
            >
              View Projects
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </MagneticButton>

            <MagneticButton
              className="px-8 py-4 border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--border-hover)] hover:bg-[var(--surface-2)] transition-all rounded-sm cursor-pointer"
              onClick={() => scrollToSection('#contact')}
            >
              Get in Touch
            </MagneticButton>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-8">
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.key}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 1.5 }}
                whileHover={{ y: -3, color: 'var(--accent)' }}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                title={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-10 bg-gradient-to-b from-[var(--accent)]/50 to-transparent"
        />
        <span className="section-label">scroll</span>
      </motion.div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 right-0">
        <Ticker />
      </div>
    </section>
  );
}
