import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App'

// Skip-link style (inlined here to avoid flash)
const skipStyle = document.createElement('style')
skipStyle.textContent = `
  .skip-link {
    position: absolute;
    top: -100px;
    left: 1rem;
    background: var(--accent);
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0 0 6px 6px;
    font-weight: 600;
    font-size: 0.9rem;
    z-index: 9999;
    transition: top 0.2s;
    text-decoration: none;
  }
  .skip-link:focus { top: 0; }
`
document.head.appendChild(skipStyle)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
