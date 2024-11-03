import api from '../../../../../backend/services/api.js'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

function Register () {

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [ errorMessage, setErrorMessage ] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        setErrorMessage('')
        try {
            await api.post('/api/auth/register', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                confirm_password: confirmPasswordRef.current.value
            })
            navigate('/')

        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Erro ao cadastrar usuário')
        }
    }

    return (
        <>
         <form onSubmit={handleSubmit}>
            <input placeholder="Digite seu nome" ref={nameRef} type="text" name="name" id="name" />
            <input placeholder="Digite seu email" ref={emailRef} type="email" name="email" id="email" />
            <input placeholder="Digite sua senha" ref={passwordRef} type="password" name="password" id="password" />
            <input placeholder="Confirme sua senha" ref={confirmPasswordRef} type="password" name="confirm_password" id="confirm_password" />
            <button type="submit">Criar conta</button>
        </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/">Já possui uma conta? Faça login!</Link>
        </>
    )
}

export default Register
