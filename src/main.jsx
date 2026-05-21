import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProjectDetail from './ProjectDetail.jsx'
import TeamContributionDetail from './TeamContributionDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/team-contribution" element={<TeamContributionDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
