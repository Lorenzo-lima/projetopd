import api from '../../../../../backend/services/api.js'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import Header from "../../../components/Header/index.jsx";
import logo from "../../../assets/logo-login.png";

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
            <div>
                <Header />
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{fontFamily: ""}}>
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <img src={logo} alt="logo" className="w-20 mx-auto mb-6 select-none"/>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            placeholder="Digite seu nome"
                            ref={nameRef}
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            className="select-none font-neue-machina-plain-light w-full min-h-[50px] text-sm p-3 border border-gray-400 rounded-md text-gray-700"
                        />
                        <input
                            placeholder="Digite seu email"
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            className="select-none font-neue-machina-plain-light w-full min-h-[50px] text-sm p-3 border border-gray-400 rounded-md text-gray-700"
                        />
                        <input
                            placeholder="Digite sua senha"
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="off"
                            className="select-none font-neue-machina-plain-light w-full min-h-[50px] text-sm p-3 border border-gray-400 rounded-md text-gray-700"
                        />
                        <input
                            placeholder="Confirme sua senha"
                            ref={confirmPasswordRef}
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            autoComplete="off"
                            className="select-none font-neue-machina-plain-light w-full min-h-[50px] text-sm p-3 border border-gray-400 rounded-md text-gray-700"
                        />
                        <button
                            type="submit"
                            className="select-none font-neue-machina-plain-regular w-full py-3 bg-customPink text-white rounded-md font-semibold hover:bg-pink-700 transition duration-300"
                        >
                            Criar conta
                        </button>
                    </form>
                    {errorMessage && <p className="error-message font-neue-machina-plain-light text-sm mt-2 block text-center">{errorMessage}</p>}
                    <Link to="/" className="font-neue-machina-plain-light text-customPink text-base hover:underline mt-4 block text-center">
                        Já possui uma conta? Faça login!
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Register
