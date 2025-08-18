import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { resumeData } from '@/data/resume'

export default function Skills() {
  const { skills } = resumeData

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Advanced':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Beginner':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  const getSkillProgress = (level: string) => {
    switch (level) {
      case 'Expert':
        return 90
      case 'Advanced':
        return 75
      case 'Intermediate':
        return 60
      case 'Beginner':
        return 35
      default:
        return 35
    }
  }

  return (
    <section id="skills" className="bg-white py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">Skills & Technologies</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.map(category => (
            <Card key={category.id} variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle as="h3" className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    {category.category === 'Frontend Development' && (
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    )}
                    {category.category === 'Backend Development' && (
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {category.category === 'Tools & Technologies' && (
                      <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  {category.category}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge size="sm" className={getSkillColor(skill.level)}>
                            {skill.level}
                          </Badge>
                          {skill.yearsOfExperience && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">{skill.yearsOfExperience}y</span>
                          )}
                        </div>
                      </div>

                      {/* Skill Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-2 rounded-full bg-blue-600 transition-all duration-500 dark:bg-blue-400"
                          style={{ width: `${getSkillProgress(skill.level)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-16">
          <Card variant="outlined" padding="lg">
            <CardHeader>
              <CardTitle as="h3" className="text-center">
                Additional Competencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Agile/Scrum',
                  'Team Leadership',
                  'Code Review',
                  'Mentoring',
                  'Performance Optimization',
                  'Responsive Design',
                  'Testing Strategies',
                  'DevOps',
                  'API Design',
                  'Database Design',
                  'Security Best Practices',
                  'Technical Writing',
                ].map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    size="md"
                    className="transition-colors hover:bg-blue-50 dark:hover:bg-blue-900"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
