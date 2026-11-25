import { useState } from 'react'
import { submitContact } from '../services/api'
import { useScrollReveal } from '../hooks/useScrollReveal'
import type { ContactFormData } from '../types'
import './Contact.css'

type Status = 'idle' | 'loading' | 'success' | 'error'

const INITIAL: ContactFormData = {
  fullname: '',
  email:    '',
  reason:   '',
  subject:  '',
  message:  '',
}

export default function Contact() {
  const [form,   setForm]   = useState<ContactFormData>(INITIAL)
  const [status, setStatus] = useState<Status>('idle')
  const [errMsg, setErrMsg] = useState('')
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>

  const update = (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')
    try {
      await submitContact(form)
      setStatus('success')
      setForm(INITIAL)
    } catch (err: unknown) {
      setStatus('error')
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response
      ) {
        const data = (err.response as { data?: { detail?: string } }).data
        setErrMsg(data?.detail ?? 'Something went wrong. Please try again.')
      } else {
        setErrMsg('Could not reach the server. Please try again later.')
      }
    }
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef} aria-labelledby="contact-heading">
      <div className="container">
        <h2 className="section-title" id="contact-heading">Get In Touch</h2>
        <p className="section-subtitle">I would love to hear from you</p>

        <div className="contact__grid">
          {/* Contact info */}
          <div className="contact__info reveal">
            <h3>Contact Information</h3>
            <ul className="contact__list">
              {[
                { icon: '📧', label: 'Email',    value: 'bettynure1@gmail.com',   href: 'mailto:bettynure1@gmail.com' },
                { icon: '📍', label: 'Location', value: 'Addis Ababa, Ethiopia',  href: null },
                { icon: '🐙', label: 'GitHub',   value: 'github.com/Betty-1219', href: 'https://github.com/Betty-1219' },
                { icon: '💼', label: 'LinkedIn', value: 'betelhem-nurlachw-tech', href: 'https://www.linkedin.com/in/betelhem-nurlachw-tech' },
              ].map(c => (
                <li key={c.label} className="contact__item">
                  <span className="contact__item-icon" aria-hidden="true">{c.icon}</span>
                  <div>
                    <span className="contact__item-label">{c.label}</span>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="contact__item-value">
                        {c.value}
                      </a>
                    ) : (
                      <span className="contact__item-value">{c.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="contact__availability">
              <span className="contact__avail-dot" aria-hidden="true" />
              Available for internships from June 2027
            </div>
          </div>

          {/* Form */}
          <form
            className="contact__form card reveal"
            style={{ transitionDelay: '0.15s' }}
            onSubmit={handleSubmit}
            aria-label="Contact form"
            noValidate
          >
            {/* Your Details */}
            <fieldset className="contact__fieldset">
              <legend className="contact__legend">Your Details</legend>

              <div className="contact__field">
                <label htmlFor="fullname">Full name <span aria-hidden="true">*</span></label>
                <input
                  id="fullname"
                  type="text"
                  value={form.fullname}
                  onChange={update('fullname')}
                  required
                  minLength={2}
                  maxLength={200}
                  placeholder="Your full name"
                  aria-required="true"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  required
                  placeholder="your@email.com"
                  aria-required="true"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="reason">Reason for contacting</label>
                <select id="reason" value={form.reason} onChange={update('reason')}>
                  <option value="">— Select a reason —</option>
                  <option value="project">Project collaboration</option>
                  <option value="job">Job opportunity</option>
                  <option value="internship">Internship opportunity</option>
                  <option value="question">General question</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </fieldset>

            {/* Message */}
            <fieldset className="contact__fieldset">
              <legend className="contact__legend">Your Message</legend>

              <div className="contact__field">
                <label htmlFor="subject">Subject <span aria-hidden="true">*</span></label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={update('subject')}
                  required
                  minLength={2}
                  maxLength={300}
                  placeholder="What is this about?"
                  aria-required="true"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={update('message')}
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  placeholder="Write your message here…"
                  aria-required="true"
                />
                <span className="contact__char-count">
                  {form.message.length} / 5000
                </span>
              </div>
            </fieldset>

            {/* Status messages */}
            {status === 'success' && (
              <p className="contact__success" role="alert">
                ✅ Message sent! I will get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="contact__error" role="alert">
                ❌ {errMsg}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary contact__submit"
              disabled={status === 'loading'}
              aria-busy={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <span className="contact__spinner" aria-hidden="true" />
                  Sending…
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
