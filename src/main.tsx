import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

window.addEventListener('keydown', (e: KeyboardEvent) => {
  console.log(e.key, e.code)
  if ((e.key === 'i' && e.metaKey && e.shiftKey) || e.key === 'F12') {
    e.preventDefault()
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
