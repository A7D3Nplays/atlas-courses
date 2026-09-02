import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

// GitHub Pages can't do SPA rewrites — use hash routing when deployed to a subpath.
const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename={import.meta.env.BASE_URL}>
      <App />
    </Router>
  </StrictMode>,
)
