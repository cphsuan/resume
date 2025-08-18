import { SiteConfig } from '@/types'

export const SITE_CONFIG: SiteConfig = {
  siteName: 'Your Name - Portfolio',
  siteUrl: 'https://yourname.com',
  author: 'Your Name',
  description: 'Personal portfolio and resume of Your Name - Software Engineer',
  social: {
    twitter: 'https://twitter.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    github: 'https://github.com/yourusername',
  },
  analytics: {
    googleAnalytics: 'GA_MEASUREMENT_ID',
  },
}

export const NAVIGATION_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export const CONTACT_EMAIL = 'your.email@example.com'
export const RESUME_PDF_URL = '/documents/your-name-resume.pdf'
