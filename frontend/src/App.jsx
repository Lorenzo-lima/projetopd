
import Login from './pages/Auth/Login/index.jsx'
import Register from './pages/Auth/Register/index.jsx'
import Home from "./pages/Home/Home.jsx"
import AuthMiddleware from './middleware/authMiddleware.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard/index.jsx'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="Dashboard" element={<Dashboard/>}/>
      <Route path="/*" element={
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
