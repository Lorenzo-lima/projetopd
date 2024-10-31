import './style.css'
import { Link } from 'react-router-dom'
import api from '../../../../../backend/services/api.js'
import { useRef } from 'react'

function Login() {

    const emailRef = useRef ()
    const passwordRef = useRef ()

    async function handleSubmit (event) {
        event.preventDefault()
        try {   
            await api.post('/api/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            console.log("Usuário logado com sucesso!")
        } catch(error) {
            console.log("Erro ao fazer login!")
        }
    }

    return (
      <>
      <div>
      <form onSubmit={handleSubmit}> 
            <input placeholder="Digite seu email" ref={emailRef} type="email" name="email" id="email" />
            <input placeholder="Digite sua senha" ref={passwordRef} type="password" name="password" id="password" />
            <button type="submit">Entrar</button>
        </form>
        <Link to="/register">Não possui uma conta? Cadastre-se!</Link>
      </div>
      </>
    )
  }
  
  export default Login
  