import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './About.css'

export default function About() {
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>

  return (
    <section id="about" className="section about" ref={sectionRef} aria-labelledby="about-heading">
      <div className="container">
        <h2 className="section-title" id="about-heading">About Me</h2>
        <p className="section-subtitle">Get to know me</p>

        <div className="about__grid">
          {/* Bio */}
          <div className="about__text reveal">
            <p>
              I am a 3<sup>rd</sup>-year <strong>Software Engineering</strong> student at{' '}
              <abbr title="Addis Ababa Science and Technology University">AASTU</abbr>.
              I enjoy building websites and solving problems with code, and my goal is to{' '}
              <mark className="about__mark">become a full-stack web developer</mark>.
            </p>

            <p>
              <strong>Technologies &amp; Tools:</strong>{' '}
              <abbr title="HyperText Markup Language">HTML</abbr>,{' '}
              <abbr title="Cascading Style Sheets">CSS</abbr>,
              JavaScript, Python, C++, Dart, Flutter,
              MySQL, SQLite, MongoDB, Figma, Git, GitHub,
              VS Code, Supabase, Google Colab, and Vercel.
            </p>

            <p>Fun fact: I love learning new technologies and turning my ideas into real projects!</p>

            <blockquote className="about__quote">
              "Great things are done by a series of small things brought together."
            </blockquote>

            <p>
              A book I have read: <cite>Atomic Habits</cite> by James Clear — continuous
              learning is the key to growth.
            </p>
          </div>

          {/* Programming Journey */}
          <div className="about__journey reveal" style={{ transitionDelay: '0.15s' }}>
            <h3>My Programming Journey</h3>
            <p>
              My programming journey began with learning Python fundamentals,
              starting with displaying messages using{' '}
              <code>print("Hello, World!")</code>.
              Since then, I have continued developing my skills by practising loops,
              understanding problem-solving techniques, and writing programmes.
            </p>

            <pre><code>{`for i in range(3):\n    print("Hello", i)`}</code></pre>

            <h3 style={{ marginTop: '1.5rem' }}>Learning Roadmap</h3>
            <ol className="about__roadmap">
              <li>HTML structure and content ✅</li>
              <li>CSS layout and design ✅</li>
              <li>JavaScript and the DOM ✅</li>
              <li>React and TypeScript 🔄</li>
              <li>Backend with Python / FastAPI 🔄</li>
              <li>Deploy portfolio online 🎯</li>
            </ol>
          </div>

          {/* Quick facts */}
          <div className="about__facts reveal" style={{ transitionDelay: '0.3s' }}>
            {[
              { icon: '🎓', label: 'University',  value: 'AASTU, Addis Ababa' },
              { icon: '📚', label: 'Degree',      value: 'BSc Software Engineering' },
              { icon: '📅', label: 'Year',        value: 'Third Year (2024 – present)' },
              { icon: '🌍', label: 'Location',    value: 'Addis Ababa, Ethiopia' },
              { icon: '📧', label: 'Email',       value: 'bettynure1@gmail.com' },
              { icon: '💼', label: 'Available',   value: 'Internships from June 2027' },
            ].map(f => (
              <div key={f.label} className="about__fact">
                <span className="about__fact-icon" aria-hidden="true">{f.icon}</span>
                <div>
                  <span className="about__fact-label">{f.label}</span>
                  <span className="about__fact-value">{f.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
