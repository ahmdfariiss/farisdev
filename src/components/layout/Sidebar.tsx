'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import {
  HiHome, HiUser, HiAcademicCap, HiCode, HiBriefcase,
  HiChartBar, HiMail, HiMenuAlt3, HiX, HiLightningBolt
} from 'react-icons/hi';
import { useSupabaseProfile } from '@/hooks/useSupabase';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import TiltCard from '@/components/ui/TiltCard';

const NAV_ITEMS = [
  { label: 'Home', href: '/', icon: HiHome },
  { label: 'About', href: '/about', icon: HiUser },
  { label: 'Skills', href: '/skills', icon: HiLightningBolt },
  { label: 'Certificates', href: '/achievements', icon: HiAcademicCap },
  { label: 'Projects', href: '/projects', icon: HiCode },
  { label: 'Experience', href: '/experience', icon: HiBriefcase },
  { label: 'Dashboard', href: '/dashboard', icon: HiChartBar },
  { label: 'Contact', href: '/contact', icon: HiMail },
];

const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/ahmdfariiss', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { profile } = useSupabaseProfile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Profile */}
      <div className="p-6 pb-4">
        <div className="flex flex-col items-center text-center">
          {/* Avatar with Tilt */}
          <TiltCard className="w-20 h-20 mb-3 block">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[var(--border)] group">
              <div className="absolute inset-0 bg-[var(--surface-2)] opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={profile.name || 'Avatar'}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[var(--surface-2)] flex items-center justify-center text-2xl">
                  👤
                </div>
              )}
            </div>
          </TiltCard>

          {/* Name & username */}
          <h2 className="text-sm font-bold text-[var(--text-primary)]">{profile?.name || 'Ahmad Faris'}</h2>
          <span className="text-xs text-[var(--text-muted)] font-mono mt-0.5">@ahmdfariiss</span>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
            <span className="text-[10px] text-[var(--text-secondary)]">Available</span>
          </div>
        </div>

        {/* Social row */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-transparent hover:border-[var(--border)] hover:bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all text-sm"
              title={s.label}
            >
              <s.icon size={14} />
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-[var(--border)]" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 group ${
                active
                  ? 'text-black font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="absolute inset-0 bg-[var(--accent)] rounded-xl"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <item.icon size={18} className={`relative z-10 ${active ? 'text-black' : 'text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors'}`} />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Copyright */}
        <div className="p-4 text-center border-t border-[var(--border)] mt-2">
          <p className="text-[10px] text-[var(--text-muted)] font-mono">
            COPYRIGHT © {new Date().getFullYear()}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] font-mono">
            Ahmad Faris. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[240px] bg-[var(--bg)] border-r border-[var(--border)] z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--border)]">
            {profile?.avatar ? (
              <Image src={profile.avatar} alt="" width={32} height={32} className="object-cover" />
            ) : (
              <div className="w-full h-full bg-[var(--surface-2)] flex items-center justify-center text-xs">👤</div>
            )}
          </div>
          <span className="text-sm font-bold text-[var(--text-primary)]">{profile?.name || 'Ahmad Faris'}</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          {mobileOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[240px] bg-[var(--bg)] border-r border-[var(--border)] z-50"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
