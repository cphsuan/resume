import { apiClient } from '../client'
import { Education, Experience, PersonalInfo, Project, ResumeData, Skill } from '../types'

export class ResumeService {
  private static instance: ResumeService
  private cache: ResumeData | null = null
  private cacheTimestamp: number = 0
  private readonly CACHE_TTL = 300000 // 5 minutes

  public static getInstance(): ResumeService {
    if (!ResumeService.instance) {
      ResumeService.instance = new ResumeService()
    }
    return ResumeService.instance
  }

  private isCacheValid(): boolean {
    return this.cache !== null && Date.now() - this.cacheTimestamp < this.CACHE_TTL
  }

  private setCache(data: ResumeData): void {
    this.cache = data
    this.cacheTimestamp = Date.now()
  }

  public async getResumeData(forceRefresh = false): Promise<ResumeData> {
    if (!forceRefresh && this.isCacheValid()) {
      return this.cache!
    }

    try {
      const data = await apiClient.get<ResumeData>('/api/resume', {
        timeout: 10000,
      })

      this.setCache(data)
      return data
    } catch (error) {
      // Fallback to mock data in case API is not available
      return this.getMockResumeData()
    }
  }

  public async getPersonalInfo(): Promise<PersonalInfo> {
    const resumeData = await this.getResumeData()
    return resumeData.personalInfo
  }

  public async getExperience(): Promise<Experience[]> {
    const resumeData = await this.getResumeData()
    return resumeData.experience.sort((a, b) => {
      // Sort by current first, then by start date (newest first)
      if (a.current && !b.current) return -1
      if (!a.current && b.current) return 1
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
  }

  public async getEducation(): Promise<Education[]> {
    const resumeData = await this.getResumeData()
    return resumeData.education.sort((a, b) => {
      // Sort by current first, then by start date (newest first)
      if (a.current && !b.current) return -1
      if (!a.current && b.current) return 1
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
  }

  public async getProjects(featured = false): Promise<Project[]> {
    const resumeData = await this.getResumeData()
    let projects = resumeData.projects

    if (featured) {
      projects = projects.filter(p => p.featured)
    }

    return projects.sort((a, b) => {
      // Sort by featured first, then by start date (newest first)
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    })
  }

  public async getSkills(category?: string): Promise<Skill[]> {
    const resumeData = await this.getResumeData()
    let skills = resumeData.skills

    if (category) {
      skills = skills.filter(s => s.category === category)
    }

    return skills.sort((a, b) => {
      // Sort by proficiency (highest first), then by years of experience
      if (a.proficiency !== b.proficiency) {
        return b.proficiency - a.proficiency
      }
      return b.yearsOfExperience - a.yearsOfExperience
    })
  }

  public async getSkillsByCategory(): Promise<Record<string, Skill[]>> {
    const skills = await this.getSkills()
    const categorized: Record<string, Skill[]> = {}

    skills.forEach(skill => {
      if (!categorized[skill.category]) {
        categorized[skill.category] = []
      }
      categorized[skill.category].push(skill)
    })

    return categorized
  }

  public async searchProjects(query: string): Promise<Project[]> {
    const projects = await this.getProjects()
    const lowerQuery = query.toLowerCase()

    return projects.filter(
      project =>
        project.name.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery) ||
        project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))
    )
  }

  public async getProjectsByTechnology(technology: string): Promise<Project[]> {
    const projects = await this.getProjects()
    return projects.filter(project => project.technologies.some(tech => tech.toLowerCase().includes(technology.toLowerCase())))
  }

  public clearCache(): void {
    this.cache = null
    this.cacheTimestamp = 0
  }

  // Mock data for development/demo
  public getMockResumeData(): ResumeData {
    return {
      personalInfo: {
        name: 'John Doe',
        title: 'Full Stack Developer',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        website: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        summary:
          'Passionate full-stack developer with 5+ years of experience building scalable web applications using modern technologies like React, Node.js, and TypeScript.',
        avatar: '/images/avatar.jpg',
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Tech Solutions Inc.',
          position: 'Senior Frontend Developer',
          startDate: '2022-01-01',
          current: true,
          description: 'Lead frontend development for multiple client projects using React, TypeScript, and Next.js.',
          technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Jest'],
          achievements: [
            'Improved application performance by 40% through code optimization',
            'Mentored 3 junior developers',
            'Led migration from JavaScript to TypeScript',
          ],
        },
        {
          id: 'exp-2',
          company: 'StartupXYZ',
          position: 'Full Stack Developer',
          startDate: '2020-06-01',
          endDate: '2021-12-31',
          current: false,
          description: 'Developed and maintained full-stack applications using React, Node.js, and PostgreSQL.',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Express', 'AWS'],
          achievements: [
            'Built MVP that acquired 10K+ users',
            'Implemented CI/CD pipeline reducing deployment time by 60%',
            'Designed and implemented REST API serving 1M+ requests daily',
          ],
        },
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-09-01',
          endDate: '2020-05-15',
          current: false,
          gpa: 3.7,
          honors: ['Magna Cum Laude', "Dean's List"],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce platform with React frontend and Node.js backend',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
          liveUrl: 'https://ecommerce.example.com',
          githubUrl: 'https://github.com/johndoe/ecommerce-platform',
          imageUrl: '/images/projects/ecommerce.jpg',
          featured: true,
          startDate: '2023-03-01',
          endDate: '2023-08-15',
        },
        {
          id: 'proj-2',
          name: 'Task Management App',
          description: 'Real-time task management application with team collaboration features',
          technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
          liveUrl: 'https://taskapp.example.com',
          githubUrl: 'https://github.com/johndoe/task-management',
          imageUrl: '/images/projects/taskapp.jpg',
          featured: true,
          startDate: '2022-09-01',
          endDate: '2023-01-30',
        },
      ],
      skills: [
        {
          id: 'skill-1',
          name: 'React',
          category: 'frontend',
          proficiency: 5,
          yearsOfExperience: 4,
        },
        {
          id: 'skill-2',
          name: 'TypeScript',
          category: 'frontend',
          proficiency: 5,
          yearsOfExperience: 3,
        },
        {
          id: 'skill-3',
          name: 'Node.js',
          category: 'backend',
          proficiency: 4,
          yearsOfExperience: 3,
        },
        {
          id: 'skill-4',
          name: 'PostgreSQL',
          category: 'database',
          proficiency: 4,
          yearsOfExperience: 3,
        },
        {
          id: 'skill-5',
          name: 'AWS',
          category: 'tools',
          proficiency: 3,
          yearsOfExperience: 2,
        },
      ],
      lastUpdated: new Date().toISOString(),
    }
  }

  // Export resume data as different formats
  public async exportToJSON(): Promise<string> {
    const data = await this.getResumeData()
    return JSON.stringify(data, null, 2)
  }

  public async getResumeStats(): Promise<{
    totalExperience: number
    totalProjects: number
    totalSkills: number
    topSkills: string[]
  }> {
    const resumeData = await this.getResumeData()

    // Calculate total years of experience
    const totalExperience = resumeData.experience.reduce((total, exp) => {
      const startDate = new Date(exp.startDate)
      const endDate = exp.current ? new Date() : new Date(exp.endDate!)
      const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      return total + years
    }, 0)

    // Get top skills (by proficiency and experience)
    const topSkills = resumeData.skills
      .sort((a, b) => {
        const scoreA = a.proficiency * a.yearsOfExperience
        const scoreB = b.proficiency * b.yearsOfExperience
        return scoreB - scoreA
      })
      .slice(0, 5)
      .map(skill => skill.name)

    return {
      totalExperience: Math.round(totalExperience * 10) / 10, // Round to 1 decimal
      totalProjects: resumeData.projects.length,
      totalSkills: resumeData.skills.length,
      topSkills,
    }
  }
}

export const resumeService = ResumeService.getInstance()
