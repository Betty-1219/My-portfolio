import { useEffect, useState } from 'react'
import { fetchSkills } from '../services/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import type { SkillCategory } from '../types'
import './Skills.css'

/* Fallback data — matches the original <meter> values exactly */
const FALLBACK: SkillCategory[] = [
  { id: 1, name: 'Web Development', order: 1, skills: [
    { id: 1, name: 'HTML',       level: 85, order: 1 },
    { id: 2, name: 'CSS',        level: 80, order: 2 },
    { id: 3, name: 'JavaScript', level: 60, order: 3 },
    { id: 4, name: 'TypeScript', level: 30, order: 4 },
  ]},
  { id: 2, name: 'Programming Languages', order: 2, skills: [
    { id: 5, name: 'Python', level: 55, order: 1 },
    { id: 6, name: 'C++',    level: 45, order: 2 },
    { id: 7, name: 'Java',   level: 40, order: 3 },
    { id: 8, name: 'Dart',   level: 35, order: 4 },
  ]},
  { id: 3, name: 'Mobile Development', order: 3, skills: [
    { id: 9,  name: 'Flutter',      level: 40, order: 1 },
    { id: 10, name: 'Mobile UI/UX', level: 50, order: 2 },
  ]},
  { id: 4, name: 'Databases', order: 4, skills: [
    { id: 11, name: 'MySQL',    level: 50, order: 1 },
    { id: 12, name: 'SQLite',   level: 55, order: 2 },
    { id: 13, name: 'MongoDB',  level: 30, order: 3 },
    { id: 14, name: 'Supabase', level: 25, order: 4 },
  ]},
  { id: 5, name: 'AI & Machine Learning', order: 5, skills: [
    { id: 15, name: 'AI / ML fundamentals', level: 25, order: 1 },
    { id: 16, name: 'NumPy / Pandas',       level: 35, order: 2 },
    { id: 17, name: 'Semantic Search',      level: 30, order: 3 },
    { id: 18, name: 'OpenCV / MediaPipe',   level: 25, order: 4 },
  ]},
  { id: 6, name: 'Tools & Platforms', order: 6, skills: [
    { id: 19, name: 'Git & GitHub', level: 65, order: 1 },
    { id: 20, name: 'Figma',        level: 55, order: 2 },
    { id: 21, name: 'VS Code',      level: 80, order: 3 },
    { id: 22, name: 'Google Colab', level: 45, order: 4 },
    { id: 23, name: 'Vercel',       level: 50, order: 5 },
  ]},
]

function levelLabel(n: number): string {
  if (n >= 75) return 'Advanced'
  if (n >= 50) return 'Intermediate'
  if (n >= 30) return 'Familiar'
  return 'Learning'
}

export default function Skills() {
  const [categories, setCategories] = useState<SkillCategory[]>(FALLBACK)
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>

  useEffect(() => {
    fetchSkills()
      .then(data => { if (data.length) setCategories(data) })
      .catch(() => { /* use fallback */ })
  }, [])

  return (
    <section id="skills" className="section skills" ref={sectionRef} aria-labelledby="skills-heading">
      <div className="container">
        <h2 className="section-title" id="skills-heading">Technical Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div className="skills__grid">
          {categories.map((cat, ci) => (
            <div
              key={cat.id}
              className="skills__category reveal card"
              style={{ transitionDelay: `${ci * 0.08}s` }}
            >
              <h3 className="skills__category-name">{cat.name}</h3>
              <ul className="skills__list">
                {cat.skills.map(skill => (
                  <li key={skill.id} className="skills__item">
                    <div className="skills__item-header">
                      <span className="skills__item-name">{skill.name}</span>
                      <span className="skills__item-label">{levelLabel(skill.level)}</span>
                    </div>
                    <div
                      className="skills__bar-track"
                      role="meter"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${skill.name}: ${skill.level}%`}
                    >
                      <div
                        className="skills__bar-fill"
                        style={{ '--target': `${skill.level}%` } as React.CSSProperties}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="skills__note reveal">
          Skill levels are honest self-assessments based on academic coursework and personal projects.
        </p>
      </div>
    </section>
  )
}
