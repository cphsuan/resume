import { render, screen } from '@testing-library/react'

import Home from '@/app/page'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { priority, fill, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} />
  },
}))

describe('Home Page', () => {
  it('renders the header with navigation', () => {
    render(<Home />)

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('renders the hero section with name and title', () => {
    render(<Home />)

    const heroSection = screen.getByRole('heading', { level: 1, name: 'Your Name' })
    expect(heroSection).toBeInTheDocument()

    // Check that the title text exists somewhere on the page
    expect(screen.getAllByText('Senior Software Engineer').length).toBeGreaterThan(0)
  })

  it('renders all main sections', () => {
    render(<Home />)

    const aboutSection = screen.getByText('About Me')
    const experienceSection = screen.getByText('Work Experience')
    const skillsSection = screen.getByText('Skills & Technologies')
    const projectsSection = screen.getByText('Featured Projects')
    const contactSection = screen.getByText("Let's Work Together")

    expect(aboutSection).toBeInTheDocument()
    expect(experienceSection).toBeInTheDocument()
    expect(skillsSection).toBeInTheDocument()
    expect(projectsSection).toBeInTheDocument()
    expect(contactSection).toBeInTheDocument()
  })

  it('renders the footer', () => {
    render(<Home />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('renders contact buttons in hero section', () => {
    render(<Home />)

    const getInTouchButton = screen.getByRole('button', { name: /get in touch/i })
    const downloadResumeButton = screen.getByRole('button', { name: /download resume/i })

    expect(getInTouchButton).toBeInTheDocument()
    expect(downloadResumeButton).toBeInTheDocument()
  })
})
