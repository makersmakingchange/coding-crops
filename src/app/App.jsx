import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, About } from '../minigames'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App