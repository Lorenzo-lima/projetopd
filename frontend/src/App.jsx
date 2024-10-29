import './App.css'
import Login from './pages/auth/login/index.jsx'
import Register from './pages/auth/register/index.jsx'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
     </Routes>   
    </BrowserRouter>
  )
}

export default App
