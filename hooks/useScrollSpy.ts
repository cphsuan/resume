import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      let currentSection = ''

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId.replace('#', ''))
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollY

          if (scrollY + offset >= elementTop) {
            currentSection = sectionId
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    handleScroll() // Call once to set initial state
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds, offset, activeSection])

  return activeSection
}
