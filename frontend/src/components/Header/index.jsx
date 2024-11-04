import logo from '../../assets/logo-header.png'
import { MessageCircleQuestion } from 'lucide-react'

function Header() {
    return (
        <header className="w-full bg-white py-4 px-5 shadow-lg fixed top-0 left-0 flex items-center z-50">
            <img src={logo} alt="Projeto Desenvolve" className="w-44 h-auto select-none" />
            <MessageCircleQuestion className="ml-auto text-gray-500 cursor-pointer" />
        </header>
    );
}

export default Header

