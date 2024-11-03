import { Link } from 'react-router-dom';
import api from '../../../../../backend/services/api.js';
import { useRef } from 'react';
import Header from '../../../components/Header/index.jsx';
import logo from '../../../assets/logo-login.png'

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await api.post('/api/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            });
            console.log("Usuário logado com sucesso!");
        } catch (error) {
            console.log("Erro ao fazer login!");
        }
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{fontFamily: ""}}>
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <img src={logo} alt="logo" className="w-20 mx-auto mb-6" />
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            placeholder="Digite seu email"
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-3 border border-gray-400 rounded-md text-gray-700"
                        />
                        <input
                            placeholder="Digite sua senha"
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            className="w-full p-3 border border-gray-400 rounded-md text-gray-700"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-customPink text-white rounded-md font-semibold hover:bg-pink-700 transition duration-300"
                        >
                            Entrar
                        </button>
                    </form>
                    <Link to="/register" className="text-customPink hover:underline mt-4 block text-center">
                        Não possui uma conta? Cadastre-se!
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
