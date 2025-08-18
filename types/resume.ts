import { Certification, Education, Experience, PersonalInfo, Project, SkillCategory } from './common'

export interface ResumeData {
  personal: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: SkillCategory[]
  projects: Project[]
  certifications: Certification[]
  lastUpdated: string
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
}

export interface SiteConfig {
  siteName: string
  siteUrl: string
  author: string
  description: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  analytics?: {
    googleAnalytics?: string
  }
}
