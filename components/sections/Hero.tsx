'use client'

import Image from 'next/image'

import { Button } from '@/components/ui'
import { RESUME_PDF_URL } from '@/data/constants'
import { resumeData } from '@/data/resume'

export default function Hero() {
  const { personal } = resumeData

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = RESUME_PDF_URL
    link.download = `${personal.name.replace(/\s+/g, '-').toLowerCase()}-resume.pdf`
    link.click()
  }

  const handleContactClick = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl dark:from-blue-600/20 dark:to-purple-600/20" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-3xl dark:from-purple-600/20 dark:to-pink-600/20" />
        <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-2xl dark:from-cyan-600/10 dark:to-blue-600/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Profile Image with enhanced animations */}
          <div className="animate-fade-in-up mb-8 flex justify-center">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-75 blur-sm transition-all duration-1000 group-hover:opacity-100 group-hover:blur-md" />
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-2xl transition-all duration-500 group-hover:scale-105 sm:h-40 sm:w-40 lg:h-48 lg:w-48 dark:border-gray-700">
                <Image
                  src={personal.avatar}
                  alt={`${personal.name} profile picture`}
                  width={192}
                  height={192}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>
              {/* Status indicator */}
              <div className="animate-pulse-glow absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 ring-4 ring-white dark:ring-gray-800">
                <div className="h-3 w-3 rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Name and Title with staggered animations */}
          <div className="mb-8 space-y-4">
            <h1 className="fluid-text-4xl animate-fade-in-up animate-delay-100 sm:fluid-text-5xl lg:fluid-text-6xl font-bold text-gray-900 dark:text-white">
              <span className="gradient-text">{personal.name}</span>
            </h1>
            <h2 className="fluid-text-xl animate-fade-in-up animate-delay-200 sm:fluid-text-2xl lg:fluid-text-3xl font-medium text-blue-600 dark:text-blue-400">
              <span className="relative">
                {personal.title}
                <span className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" />
              </span>
            </h2>
            <p className="fluid-text-lg animate-fade-in-up animate-delay-300 mx-auto max-w-3xl leading-relaxed text-gray-600 dark:text-gray-300">
              {personal.summary}
            </p>
          </div>

          {/* Enhanced Contact Info */}
          <div className="animate-fade-in-up animate-delay-400 mb-8 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">{personal.location}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${personal.email}`}
                className="font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {personal.email}
              </a>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="animate-fade-in-up animate-delay-500 mb-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={handleContactClick}
              className="group relative min-w-[180px] overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="relative z-10 flex items-center">
                <svg
                  className="mr-2 h-5 w-5 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Get In Touch
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownloadResume}
              className="group min-w-[180px] border-2 border-gray-300 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800/80 dark:hover:border-blue-400 dark:hover:bg-gray-700"
            >
              <svg
                className="mr-2 h-5 w-5 transition-transform group-hover:translate-y-0.5 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </Button>
          </div>

          {/* Enhanced Social Links */}
          <div className="animate-fade-in-up animate-delay-600 flex justify-center space-x-8">
            {[
              {
                href: personal.linkedin,
                label: 'LinkedIn',
                icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
              },
              {
                href: personal.github,
                label: 'GitHub',
                icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
              },
              {
                href: personal.website,
                label: 'Website',
                icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
                stroke: true,
              },
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-blue-600 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                aria-label={`${social.label} profile`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {social.stroke ? (
                  <svg
                    className="h-6 w-6 transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                )}
                <span className="sr-only">{social.label} profile</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => {
            const aboutSection = document.querySelector('#about')
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Scroll to about section"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  )
}
