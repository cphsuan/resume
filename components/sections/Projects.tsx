'use client'

import Image from 'next/image'

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { resumeData } from '@/data/resume'
import { formatDateRange } from '@/lib/utils'

export default function Projects() {
  const { projects } = resumeData
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

  return (
    <section id="projects" className="bg-gray-50 py-20 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Featured Projects</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            A showcase of my recent work and personal projects demonstrating technical expertise and problem-solving skills.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map(project => (
              <Card key={project.id} variant="elevated" padding="none" className="overflow-hidden">
                {/* Project Image */}
                {project.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image src={project.imageUrl} alt={`${project.title} screenshot`} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <Badge variant="default" className="absolute top-4 right-4 bg-green-600 text-white">
                      {project.status}
                    </Badge>
                  </div>
                )}

                <div className="p-6">
                  <CardHeader className="p-0 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle as="h3" className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDateRange(project.startDate, project.endDate)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
                      {project.longDescription || project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex flex-wrap gap-3">
                      {project.liveUrl && (
                        <Button variant="primary" size="sm" onClick={() => window.open(project.liveUrl, '_blank')}>
                          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" onClick={() => window.open(project.githubUrl, '_blank')}>
                          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          View Code
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">Other Projects</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map(project => (
                <Card key={project.id} variant="outlined" padding="lg">
                  <CardHeader>
                    <div className="mb-2 flex items-start justify-between">
                      <CardTitle as="h4" className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </CardTitle>
                      <Badge variant={project.status === 'Completed' ? 'success' : 'warning'} size="sm">
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateRange(project.startDate, project.endDate)}
                    </p>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{project.description}</p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="secondary" size="sm" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" size="sm" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="flex gap-2">
                      {project.liveUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                          className="h-8 w-8 p-2"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="h-8 w-8 p-2"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
