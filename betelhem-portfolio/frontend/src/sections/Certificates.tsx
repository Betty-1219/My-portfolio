import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Certificates.css'

// ── Certificate data ───────────────────────────────────────────────────────
// All details read verbatim from the certificate images and links provided.

interface Certificate {
  id: number
  title: string
  issuer: string
  issuerType: 'aws' | 'sololearn' | 'udacity' | 'other'
  date: string
  driveUrl: string | null   // null = no separate link (image was provided directly)
  description: string
  color: string             // accent colour for the issuer
}

const CERTIFICATES: Certificate[] = [
  {
    id: 1,
    title: 'Certificate of Appreciation — AWS Volunteer',
    issuer: 'AWS Student Builders Group at AASTU',
    issuerType: 'aws',
    date: 'November 13, 2026',
    driveUrl: 'https://drive.google.com/file/d/1RLuX0BUf7DB1Zh_prDdBIUanABJ7Owfz/view?usp=drive_link',
    description:
      'Awarded in recognition of valuable service and dedication as a Volunteer of the AWS Student Builders Group at AASTU.',
    color: '#FF9900',
  },
  {
    id: 2,
    title: 'Machine Learning for Beginners',
    issuer: 'Sololearn',
    issuerType: 'sololearn',
    date: 'November 6, 2026',
    driveUrl: 'https://drive.google.com/file/d/1_psv_0J7_Ya2YMXSs0FedteYy5zHCNC1/view?usp=sharing',
    description:
      'Course certificate (CC-OQ5CI1YK) demonstrating theoretical and practical understanding of Machine Learning for Beginners.',
    color: '#5B6CF9',
  },
  {
    id: 3,
    title: 'Introduction to Python',
    issuer: 'Sololearn',
    issuerType: 'sololearn',
    date: 'November 22, 2026',
    driveUrl: 'https://drive.google.com/file/d/1f-_AY36et8LD516ghKsmqI9G8hV5hSeM/view?usp=drive_link',
    description:
      'Course certificate (CC-SKEXYMWU) demonstrating theoretical and practical understanding of Introduction to Python.',
    color: '#5B6CF9',
  },
  {
    id: 4,
    title: 'Android Developer Fundamentals',
    issuer: 'Udacity',
    issuerType: 'udacity',
    date: 'December 20, 2024',
    driveUrl: 'https://drive.google.com/file/d/1DwWkvV4YJa53cKSUlG4C3UGMYB6A8J40/view?usp=drive_link',
    description:
      'Completed the Android Developer Fundamentals course, covering core Android development concepts and best practices.',
    color: '#02B3E4',
  },
  {
    id: 5,
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'Udacity',
    issuerType: 'udacity',
    date: 'December 20, 2024',
    driveUrl: 'https://drive.google.com/file/d/1vtmaDAUQLvneOR5xet32kZZeJ3ns_lXF/view?usp=drive_link',
    description:
      'Completed the Artificial Intelligence Fundamentals course, covering core AI concepts, algorithms, and applications.',
    color: '#02B3E4',
  },
  {
    id: 6,
    title: 'Data Analysis Fundamentals',
    issuer: 'Udacity',
    issuerType: 'udacity',
    date: 'December 20, 2024',
    driveUrl: 'https://drive.google.com/file/d/1DwWkvV4YJa53cKSUlG4C3UGMYB6A8J40/view?usp=drive_link',
    description:
      'Completed the Data Analysis Fundamentals course, covering data wrangling, statistical analysis, and visualisation.',
    color: '#02B3E4',
  },
  {
    id: 7,
    title: 'Programming Fundamentals',
    issuer: 'Udacity',
    issuerType: 'udacity',
    date: 'December 20, 2024',
    driveUrl: 'https://drive.google.com/file/d/1vtmaDAUQLvneOR5xet32kZZeJ3ns_lXF/view?usp=drive_link',
    description:
      'Completed the Programming Fundamentals course, covering foundational programming concepts across multiple languages.',
    color: '#02B3E4',
  },
]

// ── Issuer logos (inline SVG icons) ────────────────────────────────────────

function IssuerBadge({ type, color }: { type: Certificate['issuerType']; color: string }) {
  const style: React.CSSProperties = { color }

  if (type === 'aws') {
    return (
      <span className="cert-card__issuer-icon" style={style} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
          <path d="M14.6 27.6c-.4.4-.4 1 0 1.3l2 2c.4.4 1 .4 1.3 0l9.4-9.4 9.4 9.4c.4.4 1 .4 1.3 0l2-2c.4-.4.4-1 0-1.3L27.3 14.9a1 1 0 00-1.3 0L14.6 27.6z" fill="#FF9900"/>
          <rect x="6" y="34" width="36" height="4" rx="2" fill="#FF9900"/>
        </svg>
      </span>
    )
  }
  if (type === 'sololearn') {
    return (
      <span className="cert-card__issuer-icon" style={style} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" fill="#5B6CF9" opacity="0.15"/>
          <circle cx="24" cy="24" r="10" fill="#5B6CF9"/>
          <circle cx="24" cy="24" r="5" fill="white"/>
        </svg>
      </span>
    )
  }
  if (type === 'udacity') {
    return (
      <span className="cert-card__issuer-icon" style={style} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
          <path d="M24 4L44 36H4L24 4Z" fill="#02B3E4" opacity="0.9"/>
          <circle cx="24" cy="36" r="8" fill="#02B3E4"/>
        </svg>
      </span>
    )
  }
  return (
    <span className="cert-card__issuer-icon" aria-hidden="true">🏆</span>
  )
}

// ── Certificate card ────────────────────────────────────────────────────────

function CertCard({ cert, index }: { cert: Certificate; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`cert-card reveal ${flipped ? 'cert-card--flipped' : ''}`}
      style={{
        transitionDelay: `${index * 0.07}s`,
        '--issuer-color': cert.color,
      } as React.CSSProperties}
      onMouseEnter={() => setFlipped(false)}
    >
      {/* Top colour strip */}
      <div className="cert-card__strip" style={{ background: cert.color }} aria-hidden="true" />

      {/* Body */}
      <div className="cert-card__body">
        {/* Issuer icon + name */}
        <div className="cert-card__issuer-row">
          <IssuerBadge type={cert.issuerType} color={cert.color} />
          <span className="cert-card__issuer-name">{cert.issuer}</span>
        </div>

        {/* Title */}
        <h3 className="cert-card__title">{cert.title}</h3>

        {/* Description */}
        <p className="cert-card__desc">{cert.description}</p>

        {/* Date */}
        <div className="cert-card__date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <time>{cert.date}</time>
        </div>
      </div>

      {/* Footer */}
      <div className="cert-card__footer">
        {cert.driveUrl && (
          <a
            href={cert.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cert-card__view-btn"
            aria-label={`View certificate: ${cert.title}`}
            onClick={e => e.stopPropagation()}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            View Certificate
          </a>
        )}
        <span
          className="cert-card__badge"
          style={{ background: `${cert.color}22`, color: cert.color, borderColor: `${cert.color}44` }}
        >
          Verified ✓
        </span>
      </div>
    </div>
  )
}

// ── Section ─────────────────────────────────────────────────────────────────

export default function Certificates() {
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>

  const udacityCount  = CERTIFICATES.filter(c => c.issuerType === 'udacity').length
  const sololearnCount = CERTIFICATES.filter(c => c.issuerType === 'sololearn').length

  return (
    <section
      id="certificates"
      className="section certificates"
      ref={sectionRef}
      aria-labelledby="certs-heading"
    >
      <div className="container">
        <h2 className="section-title" id="certs-heading">Certificates</h2>
        <p className="section-subtitle">Courses, workshops, and recognitions</p>

        {/* Stats bar */}
        <div className="certs-stats reveal">
          <div className="certs-stat">
            <span className="certs-stat__num">{CERTIFICATES.length}</span>
            <span className="certs-stat__label">Total Certificates</span>
          </div>
          <div className="certs-stat">
            <span className="certs-stat__num">{udacityCount}</span>
            <span className="certs-stat__label">Udacity Courses</span>
          </div>
          <div className="certs-stat">
            <span className="certs-stat__num">{sololearnCount}</span>
            <span className="certs-stat__label">Sololearn Courses</span>
          </div>
          <div className="certs-stat">
            <span className="certs-stat__num">1</span>
            <span className="certs-stat__label">AWS Recognition</span>
          </div>
        </div>

        {/* Grid */}
        <div className="certs-grid">
          {CERTIFICATES.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
