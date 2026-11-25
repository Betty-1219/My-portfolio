import { useScrollReveal } from '../hooks/useScrollReveal'
import './Education.css'

/* Complete academic record from the original HTML — verbatim */
const YEAR1_S1 = [
  { course: 'Anthropology',                       credits: 3, grade: 'A+' },
  { course: 'Psychology',                          credits: 3, grade: 'A+' },
  { course: 'English',                             credits: 3, grade: 'A-' },
  { course: 'Logic',                               credits: 3, grade: 'A'  },
  { course: 'General Mathematics',                 credits: 3, grade: 'A'  },
  { course: 'Entrepreneurship',                    credits: 3, grade: 'A+' },
  { course: 'Geography of Ethiopia and the Horn',  credits: 3, grade: 'A+' },
]
const YEAR1_S2 = [
  { course: 'Physics',                             credits: 3, grade: 'A-' },
  { course: 'Applied Mathematics I',               credits: 4, grade: 'A-' },
  { course: 'Inclusive Education',                 credits: 2, grade: 'B+' },
  { course: 'Civics',                              credits: 3, grade: 'A-' },
  { course: 'Introduction to Emerging Technology', credits: 3, grade: 'A-' },
]
const YEAR2_S1 = [
  { course: 'Introduction to Software Engineering and Computing', credits: 4, grade: 'A'  },
  { course: 'Fundamentals of Programming I',                      credits: 3, grade: 'B+' },
  { course: 'Discrete Mathematics for Software Engineering',      credits: 3, grade: 'B+' },
  { course: 'History of Ethiopia and the Horn',                   credits: 3, grade: 'A'  },
  { course: 'Probability and Statistics',                         credits: 3, grade: 'A-' },
  { course: 'Global Trends',                                      credits: 2, grade: 'B+' },
]
const YEAR2_S2 = [
  { course: 'Economics',                                     credits: 3, grade: 'A'  },
  { course: 'Fundamentals of Programming II',                credits: 3, grade: 'A'  },
  { course: 'Digital Logic Design',                          credits: 3, grade: 'A'  },
  { course: 'Data Communication and Computer Networks',      credits: 4, grade: 'B+' },
  { course: 'Database Systems',                              credits: 4, grade: 'B+' },
]

const TOTAL_CREDITS = [...YEAR1_S1, ...YEAR1_S2, ...YEAR2_S1, ...YEAR2_S2]
  .reduce((acc, r) => acc + r.credits, 0)

function gradeColor(g: string) {
  if (g.startsWith('A')) return 'var(--accent-light)'
  if (g.startsWith('B')) return '#7ec8a0'
  return 'var(--text-muted)'
}

type Row = { course: string; credits: number; grade: string }
function SemTable({ rows }: { rows: Row[] }) {
  return (
    <table className="edu__table">
      <thead>
        <tr>
          <th>Course</th>
          <th>Credits</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.course}>
            <td>{r.course}</td>
            <td>{r.credits}</td>
            <td style={{ color: gradeColor(r.grade), fontWeight: 600 }}>{r.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Education() {
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>

  return (
    <section id="education" className="section education" ref={sectionRef} aria-labelledby="edu-heading">
      <div className="container">
        <h2 className="section-title" id="edu-heading">Education</h2>
        <p className="section-subtitle">Academic background</p>

        {/* Degree card */}
        <div className="edu__degree card reveal">
          <div className="edu__degree-header">
            <span className="edu__degree-icon" aria-hidden="true">🎓</span>
            <div>
              <h3>Bachelor of Science in Software Engineering</h3>
              <p className="edu__degree-school">
                Addis Ababa Science and Technology University (<abbr title="Addis Ababa Science and Technology University">AASTU</abbr>)
              </p>
              <p className="edu__degree-meta">
                <time dateTime="2024-10">October 2024</time> – Present &nbsp;·&nbsp; Third-Year Student &nbsp;·&nbsp; Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="edu__progress-wrap">
            <label htmlFor="degree-prog" className="edu__progress-label">
              Degree progress (approximate)
            </label>
            <div className="edu__progress-track" id="degree-prog" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={100} aria-label="Degree progress: approximately 45%">
              <div className="edu__progress-fill" style={{ '--w': '45%' } as React.CSSProperties} />
            </div>
            <span className="edu__progress-pct">~45%</span>
          </div>
        </div>

        {/* Academic record */}
        <div className="edu__record reveal" style={{ transitionDelay: '0.15s' }}>
          <h3>Academic Record</h3>

          <div className="edu__years">
            <details className="edu__year" open>
              <summary>Year 1 — Semester I ({YEAR1_S1.length} courses)</summary>
              <SemTable rows={YEAR1_S1} />
            </details>
            <details className="edu__year">
              <summary>Year 1 — Semester II ({YEAR1_S2.length} courses)</summary>
              <SemTable rows={YEAR1_S2} />
            </details>
            <details className="edu__year">
              <summary>Year 2 — Semester I ({YEAR2_S1.length} courses)</summary>
              <SemTable rows={YEAR2_S1} />
            </details>
            <details className="edu__year">
              <summary>Year 2 — Semester II ({YEAR2_S2.length} courses)</summary>
              <SemTable rows={YEAR2_S2} />
            </details>
          </div>

          <p className="edu__total">
            Total completed credit hours: <strong>{TOTAL_CREDITS}</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
