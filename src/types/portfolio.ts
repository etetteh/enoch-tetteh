
import type { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string; // Full description
  carouselDescription: string; // Short description for carousel
  keyAchievement?: string; // Optional: A concise sentence highlighting the main impact/achievement
  imageUrl: string;
  imageHint?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  // Optional: icon specific to skill if needed
}

export interface SkillCategory {
  name: string;
  icon: LucideIcon;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  icon: LucideIcon;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description?: string[];
  icon: LucideIcon;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  conference: string;
  githubUrl?: string;
  paperUrl?: string;
  icon: LucideIcon;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  dateObtained?: string; // Optional
  credentialUrl: string; // Link to verification page
  icon?: LucideIcon; // Optional: an icon representing the issuer or cert type
}
