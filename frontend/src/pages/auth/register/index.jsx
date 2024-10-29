import './style.css'
import { Link } from 'react-router-dom'

function Register () {
    return (
        <>
         <form action="post">
            <input type="text" name="name" id="name" />
            <input type="email" name="email" id="email" />
            <input type="password" name="password" id="password" />
            <input type="password" name="confirm_password" id="confirm_password" />
            <button>Concluir</button>
        </form>
        <Link to="/">Já possui uma conta? Faça login!</Link>
        </>
    )
}

export default Register
