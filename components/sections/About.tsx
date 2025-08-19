import { Card, CardContent } from '@/components/ui'
import { resumeData } from '@/data/resume'

export default function About() {
  const { personal } = resumeData

  const highlights = [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '10+', label: 'Technologies Mastered' },
    { number: '100K+', label: 'Users Impacted' },
  ]

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 lg:py-32 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-24 right-0 h-64 w-64 rounded-full bg-blue-100/20 blur-3xl dark:bg-blue-900/10" />
        <div className="absolute bottom-24 left-0 h-64 w-64 rounded-full bg-purple-100/20 blur-3xl dark:bg-purple-900/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center lg:mb-20">
          <h2 className="fluid-text-3xl animate-fade-in-up sm:fluid-text-4xl lg:fluid-text-5xl mb-6 font-bold text-gray-900 dark:text-white">
            <span className="relative">
              About Me
              <span className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" />
            </span>
          </h2>
          <p className="fluid-text-lg animate-fade-in-up animate-delay-100 sm:fluid-text-xl lg:fluid-text-2xl mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
            Passionate about building exceptional digital experiences through clean code and innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* About Content */}
          <div className="animate-fade-in-left animate-delay-200 space-y-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <p className="fluid-text-lg sm:fluid-text-xl leading-relaxed">{personal.summary}</p>

                <p className="leading-relaxed">
                  I thrive on turning complex problems into simple, beautiful, and intuitive solutions. Whether I&apos;m working
                  on a website, web application, or mobile app, I bring my commitment to design excellence and user-centered
                  thinking to every project I work on.
                </p>

                <p className="leading-relaxed">
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or
                  sharing knowledge with the developer community through blog posts and mentoring.
                </p>
              </div>
            </div>

            {/* Enhanced Contact Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="hover-lift rounded-lg bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70">
                <h4 className="mb-4 flex items-center font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact
                </h4>
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-400">
                    <a
                      href={`mailto:${personal.email}`}
                      className="flex items-center transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <span className="font-medium">{personal.email}</span>
                    </a>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a
                      href={`tel:${personal.phone}`}
                      className="flex items-center transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <span className="font-medium">{personal.phone}</span>
                    </a>
                  </p>
                </div>
              </div>
              <div className="hover-lift rounded-lg bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/70 dark:bg-gray-800/50 dark:hover:bg-gray-800/70">
                <h4 className="mb-4 flex items-center font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h4>
                <p className="font-medium text-gray-600 dark:text-gray-400">{personal.location}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Statistics and Skills */}
          <div className="animate-fade-in-right animate-delay-300 space-y-8">
            {/* Statistics with improved animations */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((highlight, index) => (
                <Card
                  key={index}
                  variant="elevated"
                  padding="md"
                  className="group relative overflow-hidden text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <CardContent className="relative">
                    <div className="fluid-text-2xl sm:fluid-text-3xl lg:fluid-text-4xl mb-2 font-bold text-blue-600 transition-all duration-300 group-hover:scale-110 dark:text-blue-400">
                      {highlight.number}
                    </div>
                    <div className="text-sm font-medium text-gray-600 sm:text-base dark:text-gray-400">{highlight.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced Skills Preview */}
            <Card
              variant="outlined"
              padding="lg"
              className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardContent className="relative">
                <h4 className="mb-6 flex items-center font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-3">
                  {['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'AWS'].map((tech, index) => (
                    <span
                      key={tech}
                      className="group/tech relative overflow-hidden rounded-full bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 text-sm font-medium text-blue-800 transition-all duration-300 hover:scale-105 hover:from-blue-200 hover:to-blue-100 hover:shadow-md dark:from-blue-900/50 dark:to-blue-800/50 dark:text-blue-200 dark:hover:from-blue-800/60 dark:hover:to-blue-700/60"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="relative z-10">{tech}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 transition-opacity duration-300 group-hover/tech:opacity-100" />
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional highlight card */}
            <Card
              variant="elevated"
              padding="lg"
              className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 transition-all duration-300 hover:shadow-xl dark:from-blue-900/20 dark:to-purple-900/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <CardContent className="relative text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Always Learning</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Continuously exploring new technologies and best practices to stay at the forefront of web development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
