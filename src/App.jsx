import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreatePage from './pages/CreatePage'
import PublicPage from './pages/PublicPage'
import CreateLink from './pages/CreateLink'
import EditPage from './pages/EditPage'
import EditLink from './pages/EditLink'
import Messages from './pages/Messages'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/create-page" element={<CreatePage />} />
        <Route path="/pages/:slug" element={<EditPage />} />
        <Route path="/create-link" element={<CreateLink />} />
        <Route path="/links/:slug" element={<EditLink />} />
        <Route path="/:slug" element={<PublicPage />} />
      </Routes>
    </Router>
  )
}

export default App
