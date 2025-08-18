import { Metadata } from 'next'

import { SITE_CONFIG } from '@/data/constants'
import { resumeData } from '@/data/resume'

export function generateSEOMetadata(pageConfig?: { title?: string; description?: string; path?: string }): Metadata {
  const { personal } = resumeData

  const title = pageConfig?.title ? `${pageConfig.title} | ${personal.name}` : `${personal.name} - ${personal.title}`

  const description = pageConfig?.description || personal.summary
  const url = pageConfig?.path ? `${SITE_CONFIG.siteUrl}${pageConfig.path}` : SITE_CONFIG.siteUrl

  return {
    title,
    description,
    keywords: [
      personal.title.toLowerCase(),
      'software engineer',
      'web developer',
      'frontend developer',
      'react developer',
      'typescript developer',
      'portfolio',
      'resume',
      personal.location.toLowerCase(),
    ],
    authors: [{ name: personal.name, url: SITE_CONFIG.siteUrl }],
    creator: personal.name,
    publisher: personal.name,

    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: SITE_CONFIG.siteName,
      images: [
        {
          url: `${SITE_CONFIG.siteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${personal.name} - ${personal.title}`,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_CONFIG.siteUrl}/images/og-image.jpg`],
      creator: SITE_CONFIG.social.twitter?.split('/').pop(),
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },

    manifest: '/site.webmanifest',
  }
}

export function generateStructuredData() {
  const { personal, experience, education, skills } = resumeData

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.title,
    email: personal.email,
    telephone: personal.phone,
    url: personal.website,
    image: `${SITE_CONFIG.siteUrl}${personal.avatar}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personal.location,
    },
    sameAs: [personal.linkedin, personal.github, personal.website].filter(Boolean),
    worksFor: experience.map(exp => ({
      '@type': 'Organization',
      name: exp.company,
      address: {
        '@type': 'PostalAddress',
        addressLocality: exp.location,
      },
    })),
  }

  const resumeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: personal.name,
      jobTitle: personal.title,
      description: personal.summary,
      hasOccupation: experience.map(exp => ({
        '@type': 'Occupation',
        name: exp.position,
        occupationLocation: {
          '@type': 'Place',
          name: exp.location,
        },
        estimatedSalary: {
          '@type': 'MonetaryAmountDistribution',
          currency: 'USD',
        },
      })),
      hasCredential: education.map(edu => ({
        '@type': 'EducationalOccupationalCredential',
        name: `${edu.degree} in ${edu.field}`,
        educationalLevel: edu.degree,
        credentialCategory: edu.field,
        recognizedBy: {
          '@type': 'Organization',
          name: edu.institution,
        },
      })),
      knowsAbout: skills.flatMap(category => category.skills.map(skill => skill.name)),
    },
  }

  return {
    person: personSchema,
    resume: resumeSchema,
  }
}
