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
    <section id="about" className="bg-white py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">About Me</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Passionate about building exceptional digital experiences through clean code and innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* About Content */}
          <div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">{personal.summary}</p>

              <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                I thrive on turning complex problems into simple, beautiful, and intuitive solutions. Whether I&apos;m working on
                a website, web application, or mobile app, I bring my commitment to design excellence and user-centered thinking
                to every project I work on.
              </p>

              <p className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
                When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or
                sharing knowledge with the developer community through blog posts and mentoring.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Contact</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href={`mailto:${personal.email}`} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                    {personal.email}
                  </a>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  <a href={`tel:${personal.phone}`} className="transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                    {personal.phone}
                  </a>
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">{personal.location}</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card key={index} variant="elevated" padding="md" className="text-center">
                  <CardContent>
                    <div className="mb-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{highlight.number}</div>
                    <div className="font-medium text-gray-600 dark:text-gray-400">{highlight.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skills Preview */}
            <Card variant="outlined" padding="md" className="mt-8">
              <CardContent>
                <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'AWS'].map(tech => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
