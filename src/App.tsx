// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Details } from './pages/Details'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<Details />} />
    </Routes>
  )
}
