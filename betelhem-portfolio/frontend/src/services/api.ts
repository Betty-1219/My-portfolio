/**
 * API service — all calls to the FastAPI backend.
 * During development, Vite proxies /api to http://127.0.0.1:8000.
 * In production set VITE_API_BASE_URL to your deployed backend URL.
 */
import axios from 'axios'
import type { ContactFormData, ContactResponse, Project, SkillCategory } from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL ?? ''

const client = axios.create({
  baseURL: BASE,
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
})

export async function fetchProjects(): Promise<Project[]> {
  const { data } = await client.get<Project[]>('/api/projects')
  return data
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  const { data } = await client.get<SkillCategory[]>('/api/skills')
  return data
}

export async function submitContact(
  form: ContactFormData
): Promise<ContactResponse> {
  const { data } = await client.post<ContactResponse>('/api/contact', form)
  return data
}

export async function checkHealth(): Promise<boolean> {
  try {
    await client.get('/api/health')
    return true
  } catch {
    return false
  }
}
