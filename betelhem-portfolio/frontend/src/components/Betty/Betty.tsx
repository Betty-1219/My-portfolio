import { useEffect, useRef, useState } from 'react'
import { DEFAULT_RESPONSE, findAnswer, SUGGESTED_QUESTIONS } from './knowledge'
import './Betty.css'

// ── Types ──────────────────────────────────────────────────────────────────

type Role = 'betty' | 'user'

interface Message {
  id: number
  role: Role
  text: string
  timestamp: Date
}

// ── Markdown-ish renderer ─────────────────────────────────────────────────
// Handles **bold**, *italic*, [text](url), and \n newlines.
// Intentionally minimal — avoids pulling in a markdown library.

function renderText(raw: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  // Split on newlines first
  const lines = raw.split('\n')
  lines.forEach((line, li) => {
    if (li > 0) nodes.push(<br key={`br-${li}`} />)

    // Tokenise: **bold**, *italic*, [text](url)
    const tokens = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    tokens.forEach((tok, ti) => {
      const key = `${li}-${ti}`
      if (tok.startsWith('**') && tok.endsWith('**')) {
        nodes.push(<strong key={key}>{tok.slice(2, -2)}</strong>)
      } else if (tok.startsWith('*') && tok.endsWith('*')) {
        nodes.push(<em key={key}>{tok.slice(1, -1)}</em>)
      } else {
        const linkMatch = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (linkMatch) {
          nodes.push(
            <a key={key} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
              {linkMatch[1]}
            </a>
          )
        } else if (tok) {
          nodes.push(<span key={key}>{tok}</span>)
        }
      }
    })
  })
  return nodes
}

// ── Typing indicator ──────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="betty-typing" aria-label="Betty is typing">
      <span /><span /><span />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────

let msgId = 0
const nextId = () => ++msgId

const WELCOME: Message = {
  id: nextId(),
  role: 'betty',
  text: "Hi! I'm **Betty** 👋 — Betelhem's personal AI assistant.\n\nI can answer any questions you have about Betelhem's skills, projects, education, and how to contact her.\n\nWhat would you like to know?",
  timestamp: new Date(),
}

export default function Betty() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input,    setInput]    = useState('')
  const [typing,   setTyping]   = useState(false)
  const [unread,   setUnread]   = useState(0)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setUnread(0)
    }
  }, [open])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    // Add user message
    const userMsg: Message = { id: nextId(), role: 'user', text: trimmed, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    // Simulate a short thinking delay so it feels natural
    const delay = 500 + Math.random() * 600
    setTimeout(() => {
      const answer = findAnswer(trimmed) ?? DEFAULT_RESPONSE
      const bettyMsg: Message = { id: nextId(), role: 'betty', text: answer, timestamp: new Date() }
      setMessages(prev => [...prev, bettyMsg])
      setTyping(false)
      if (!open) setUnread(n => n + 1)
    }, delay)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestion = (q: string) => sendMessage(q)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* ── Floating toggle button ── */}
      <button
        className="betty-fab"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close Betty chat' : 'Open Betty chat assistant'}
        aria-expanded={open}
      >
        {open ? (
          // × close icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          // Chat bubble icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.07-1.36A9.95 9.95 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.66 0-3.21-.46-4.54-1.26l-.32-.19-3.01.81.82-2.97-.21-.33A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
            <circle cx="8.5"  cy="12" r="1.2"/>
            <circle cx="12"   cy="12" r="1.2"/>
            <circle cx="15.5" cy="12" r="1.2"/>
          </svg>
        )}
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="betty-fab__badge" aria-label={`${unread} unread messages`}>{unread}</span>
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className={`betty-panel ${open ? 'betty-panel--open' : ''}`}
        role="dialog"
        aria-label="Betty — Betelhem's AI assistant"
        aria-modal="false"
      >
        {/* Header */}
        <div className="betty-header">
          <div className="betty-header__avatar" aria-hidden="true">
            <span>B</span>
            <span className="betty-header__online" title="Online" />
          </div>
          <div className="betty-header__info">
            <span className="betty-header__name">Betty</span>
            <span className="betty-header__status">Betelhem's AI Assistant · Always online</span>
          </div>
          <button
            className="betty-header__close"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="betty-messages" aria-live="polite" aria-label="Chat messages">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`betty-msg betty-msg--${msg.role}`}
            >
              {msg.role === 'betty' && (
                <div className="betty-msg__avatar" aria-hidden="true">B</div>
              )}
              <div className="betty-msg__bubble">
                <div className="betty-msg__text">{renderText(msg.text)}</div>
                <span className="betty-msg__time">{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))}

          {typing && (
            <div className="betty-msg betty-msg--betty">
              <div className="betty-msg__avatar" aria-hidden="true">B</div>
              <div className="betty-msg__bubble">
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested questions — show only at start */}
        {messages.length <= 1 && (
          <div className="betty-suggestions" aria-label="Suggested questions">
            {SUGGESTED_QUESTIONS.map(q => (
              <button
                key={q}
                className="betty-suggestion"
                onClick={() => handleSuggestion(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="betty-input-row" onSubmit={handleSubmit} aria-label="Send a message">
          <input
            ref={inputRef}
            type="text"
            className="betty-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about Betelhem…"
            aria-label="Your message to Betty"
            maxLength={300}
            autoComplete="off"
          />
          <button
            type="submit"
            className="betty-send"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
