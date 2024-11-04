import './App.css'
import Login from './pages/Auth/Login/index.jsx'
import Register from './pages/auth/register/index.jsx'
import Home from "./pages/Home/Home.jsx"
import AuthMiddleware from './middleware/authMiddleware.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/home/*" element={
          <AuthMiddleware>
            <Home />
          </AuthMiddleware>
      }
      />
     </Routes>
    </BrowserRouter>
  )
}

export default App
