import api from '../../../../../backend/services/api.js';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import logo from '../../../assets/logo-login.png'
import { Eye, EyeClosed } from 'lucide-react'

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ isShow, setIsShow ] = useState( false );
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage('')
        try {
            const response = await api.post('/api/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })

            navigate('/home')
        } catch (error) {
            console.error('Erro ao fazer login:', error.response?.data || error.message)
            setErrorMessage(error.response?.data?.message || 'Erro ao fazer login!')
        }
    }

    const handlePassword = () => setIsShow(!isShow)

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{fontFamily: ""}}>
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <img src={logo} alt="logo" className="w-20 mx-auto mb-6 select-none" />
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            placeholder="Digite seu email"
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            className="select-none outline-none font-neue-machina-plain-light w-full min-h-[50px] text-sm p-3 border border-gray-400 rounded-md text-gray-700"
                        />
                        <label className="flex justify-between select-none font-neue-machina-plain-light w-full min-h-[50px] text-sm p-3 border border-gray-400 rounded-md text-gray-700">
                            <input
                                placeholder="Digite sua senha"
                                ref={passwordRef}
                                type={isShow ? 'text' : 'password'}
                                name="password"
                                id="password"
                                autoComplete="off"
                                className="outline-none"
                            />
                            <button
                                type="button"
                                onClick={handlePassword}
                                className="">
                                    {isShow && <Eye size={20}/>}
                                    {!isShow && <EyeClosed size={20}/>}
                            </button>
                        </label>
                        <button
                            type="submit"
                            className="select-none font-neue-machina-plain-regular w-full py-3 bg-customPink text-white rounded-md font-semibold hover:bg-customPinkTwo transition duration-300"
                        >
                            Entrar
                        </button>

                        {errorMessage &&
                            <p className="error-message font-neue-machina-plain-light text-sm mt-2 block text-center">{ errorMessage }</p> }

                    </form>
                    <Link to="/register" className="font-neue-machina-plain-light text-customPink text-base hover:underline mt-4 block text-center">
                        Não possui uma conta? Cadastre-se!
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
