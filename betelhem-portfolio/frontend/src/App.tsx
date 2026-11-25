import { useEffect } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar       from './components/Navbar'
import Betty        from './components/Betty/Betty'
import Hero         from './sections/Hero'
import About        from './sections/About'
import Skills       from './sections/Skills'
import Projects     from './sections/Projects'
import Education    from './sections/Education'
import Certificates from './sections/Certificates'
import Contact      from './sections/Contact'
import Footer       from './sections/Footer'

export default function App() {
  const { theme, toggle } = useTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <a href="#hero" className="skip-link">Skip to main content</a>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      {/* Betty — floating AI assistant */}
      <Betty />
    </>
  )
}
