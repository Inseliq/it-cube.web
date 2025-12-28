import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

const repoName = 'it-cube.web'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter
    basename={import.meta.env.PROD ? `/${repoName}` : '/'}
  >
    <App />
  </BrowserRouter>
)
