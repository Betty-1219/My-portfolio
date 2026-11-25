// ---------------------------------------------------------------------------
// Shared TypeScript types — mirrors backend Pydantic schemas
// ---------------------------------------------------------------------------

export interface Project {
  id: number
  title: string
  description: string
  tech_stack: string[]
  github_url: string
  live_url: string
  image: string
  featured: boolean
  order: number
}

export interface Skill {
  id: number
  name: string
  level: number
  order: number
}

export interface SkillCategory {
  id: number
  name: string
  order: number
  skills: Skill[]
}

export interface ContactFormData {
  fullname: string
  email: string
  reason: string
  subject: string
  message: string
}

export interface ContactResponse {
  id: number
  fullname: string
  email: string
  subject: string
  created_at: string
}

export type Theme = 'dark' | 'light'
