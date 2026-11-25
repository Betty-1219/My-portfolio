import { useEffect, useState } from 'react'
import { fetchProjects } from '../services/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProjectCard from '../components/ProjectCard'
import type { Project } from '../types'
import './Projects.css'

/* Fallback data so the section renders even if the backend is offline */
const FALLBACK: Project[] = [
  {
    id: 1,
    title: 'DishDecide – Ethiopian Meal Picker',
    description:
      'A web application that helps users choose Ethiopian meals based on fasting or non-fasting preferences, meal categories, budget tracking, and personal preferences. It automatically deducts meal costs, saves favourite meals, and allows users to customise their avatars.',
    tech_stack: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    github_url: '',
    live_url: 'https://dish-decide-application.vercel.app/',
    image: '',
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Fikr Sign',
    description:
      'A mobile application designed to support communication between deaf and hearing people through Ethiopian Sign Language. Contributions include UI/UX design, API integration, and AWS deployment setup.',
    tech_stack: ['Flutter', 'Dart', 'Python', 'FastAPI', 'AWS'],
    github_url: 'https://github.com/fikir300/FikirSign',
    live_url: '',
    image: '',
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Adaptive Traffic Signal Management System',
    description:
      'A C++ project designed to manage traffic signals based on real-time traffic conditions and to prioritise emergency vehicles, improving overall traffic flow through intersections.',
    tech_stack: ['C++', 'SQLite', 'Git'],
    github_url: '',
    live_url: '',
    image: '',
    featured: true,
    order: 3,
  },
]

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(false)
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>

  useEffect(() => {
    fetchProjects()
      .then(data => {
        if (data.length) setProjects(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <section id="projects" className="section projects" ref={sectionRef} aria-labelledby="projects-heading">
      <div className="container">
        <h2 className="section-title" id="projects-heading">Projects</h2>
        <p className="section-subtitle">Things I have built</p>

        {loading && (
          <div className="projects__loading" aria-live="polite">
            <span className="projects__spinner" aria-hidden="true" />
            Loading projects…
          </div>
        )}

        {error && (
          <p className="projects__error" role="alert">
            Could not reach the API — showing local project data.
          </p>
        )}

        <div className="projects__grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
