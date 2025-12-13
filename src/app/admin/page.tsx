'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  HiCollection,
  HiBriefcase,
  HiLightningBolt,
  HiPencil,
  HiExternalLink,
  HiPlus,
  HiAcademicCap,
} from 'react-icons/hi';
import { useCMSStore } from '@/store/cms-store';

export default function AdminDashboard() {
  const { profile, projects, experiences, education, skills } = useCMSStore();

  const stats = [
    {
      label: 'Projects',
      value: projects.length,
      icon: HiCollection,
      href: '/admin/projects',
      color: 'bg-blue-500',
    },
    {
      label: 'Experiences',
      value: experiences.length,
      icon: HiBriefcase,
      href: '/admin/experiences',
      color: 'bg-green-500',
    },
    {
      label: 'Education',
      value: education.length,
      icon: HiAcademicCap,
      href: '/admin/education',
      color: 'bg-yellow-500',
    },
    {
      label: 'Skills',
      value: skills.length,
      icon: HiLightningBolt,
      href: '/admin/skills',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-neutral-500 mt-1">
            Selamat datang di CMS Portfolio
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors"
        >
          Lihat Website
          <HiExternalLink size={18} />
        </Link>
      </div>

      {/* Profile Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 bg-neutral-800 rounded-2xl flex items-center justify-center text-3xl font-bold text-white">
            {profile.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
            <p className="text-neutral-400">{profile.role[0]}</p>
            <p className="text-neutral-500 text-sm mt-1">
              {profile.university} • Semester {profile.semester}
            </p>
          </div>
          <Link
            href="/admin/profile"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            <HiPencil size={18} />
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-colors">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-neutral-500">{stat.label}</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Recent Projects
            </h3>
            <Link
              href="/admin/projects"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-3 p-3 bg-black rounded-xl"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <HiCollection size={18} className="text-neutral-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    {project.title}
                  </p>
                  <p className="text-sm text-neutral-500">{project.category}</p>
                </div>
                {project.featured && (
                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Experiences */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Recent Experiences
            </h3>
            <Link
              href="/admin/experiences"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {experiences.slice(0, 3).map((exp) => (
              <div
                key={exp.id}
                className="flex items-center gap-3 p-3 bg-black rounded-xl"
              >
                <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                  <HiBriefcase size={18} className="text-neutral-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{exp.title}</p>
                  <p className="text-sm text-neutral-500">{exp.organization}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Link
            href="/admin/projects"
            className="flex flex-col items-center gap-2 p-4 bg-black rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <HiPlus size={24} className="text-blue-400" />
            <span className="text-sm text-white">Add Project</span>
          </Link>
          <Link
            href="/admin/experiences"
            className="flex flex-col items-center gap-2 p-4 bg-black rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <HiPlus size={24} className="text-green-400" />
            <span className="text-sm text-white">Add Experience</span>
          </Link>
          <Link
            href="/admin/education"
            className="flex flex-col items-center gap-2 p-4 bg-black rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <HiPlus size={24} className="text-yellow-400" />
            <span className="text-sm text-white">Add Education</span>
          </Link>
          <Link
            href="/admin/skills"
            className="flex flex-col items-center gap-2 p-4 bg-black rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <HiPlus size={24} className="text-purple-400" />
            <span className="text-sm text-white">Add Skill</span>
          </Link>
          <Link
            href="/admin/profile"
            className="flex flex-col items-center gap-2 p-4 bg-black rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <HiPencil size={24} className="text-orange-400" />
            <span className="text-sm text-white">Edit Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
