// ==========================================
// Type Definitions untuk Portfolio
// ==========================================

// Social Link Types
export interface SocialLink {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
  label: string;
}

// Skill Types
export interface Skill {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  level: number;
  category: 'frontend' | 'backend' | 'iot' | 'tools';
}

// Experience Types
export type ExperienceType = 'work' | 'education' | 'achievement';

export interface Experience {
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
}

// Project Types
export type ProjectSize = 'small' | 'medium' | 'large';
export type ProjectCategory = 'Web' | 'IoT';

export interface Project {
  title: string;
  description: string;
  image?: string;
  category: ProjectCategory;
  tech: React.ComponentType<{ size?: number; className?: string }>[];
  github: string;
  demo: string;
  featured: boolean;
  size: ProjectSize;
}

// Highlight Types (About Section)
export interface Highlight {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
}

// Stat Types
export interface Stat {
  value: string;
  label: string;
}

// Contact Info Types
export interface ContactInfo {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
}

// Navigation Item Types
export interface NavItem {
  name: string;
  href: string;
}
