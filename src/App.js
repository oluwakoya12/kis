import React, {useState} from 'react'
import Login from './components/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import Sidebar from './components/Sidebar'
import NotFound from './components/NotFound'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route  path="/login" element={<Login setLogin={setLoggedIn}/>} />
      <Route  path="/signup" element={<Signup/>} />
      <Route
        element={
          loggedIn ? (
            <Sidebar />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route  path="/dashboard" element={<Dashboard />} />
        
      </Route>

      <Route  path="*" element={<NotFound />} />

      
    </Routes>
  )
}

export default App
