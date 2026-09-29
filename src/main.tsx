import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ContentProvider } from './lib/content.tsx'
import { NavProvider } from './lib/nav.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NavProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </NavProvider>
  </StrictMode>,
)
