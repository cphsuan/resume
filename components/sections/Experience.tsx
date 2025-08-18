import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { resumeData } from '@/data/resume'
import { formatDateRange } from '@/lib/utils'

export default function Experience() {
  const { experience } = resumeData

  return (
    <section id="experience" className="bg-gray-50 py-20 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Work Experience</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            My professional journey building scalable applications and leading development teams.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-8 w-px transform bg-gray-300 md:left-1/2 md:-translate-x-px dark:bg-gray-600"></div>

          {experience.map((exp, index) => (
            <div key={exp.id} className="relative mb-12 last:mb-0">
              {/* Timeline Dot */}
              <div className="absolute left-8 z-10 mt-6 h-4 w-4 -translate-x-2 transform rounded-full bg-blue-600 md:left-1/2 md:-translate-x-2 dark:bg-blue-400"></div>

              <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-8' : 'md:ml-1/2 md:pl-8'}`}>
                <Card variant="elevated" padding="lg" className="relative">
                  {/* Date Badge */}
                  <div className={`absolute top-6 ${index % 2 === 0 ? 'md:-right-4' : 'md:-left-4'} left-4 md:left-auto`}>
                    <Badge variant="default" size="md" className="bg-blue-600 text-white">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </Badge>
                  </div>

                  <CardHeader>
                    <CardTitle as="h3" className="text-xl font-bold text-gray-900 dark:text-white">
                      {exp.position}
                    </CardTitle>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{exp.company}</h4>
                      <p className="flex items-center text-gray-600 dark:text-gray-400">
                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {exp.location}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h5 className="mb-3 font-semibold text-gray-900 dark:text-white">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-start">
                            <svg
                              className="mt-1 mr-2 h-4 w-4 flex-shrink-0 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="mb-3 font-semibold text-gray-900 dark:text-white">Technologies:</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
