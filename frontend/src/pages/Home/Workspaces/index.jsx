import api from '../../../../../backend/services/api.js'
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx"
import { useEffect, useState } from "react"
import { User, DoorOpen } from 'lucide-react'
import { useNavigate } from "react-router-dom"

function Workspaces(){
    const [ username, setUsername ] = useState('')
    const [ workspaces, setWorkspaces ] = useState([])
    const [ error, setError ] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const fetchUserData = async () => {
            try {
                const userResponse = await api.get('/api/user/me')
                setUsername(userResponse.data.name)

                const workspaceResponse = await api.get('/api/workspaces')
                setWorkspaces(workspaceResponse.data)

                setError(null)
            } catch (error) {
                setError(error.response?.data?.message)
                navigate('/')
            }
        }

        fetchUserData()
    },[])

    const handleLogOut = async () => {
        try {
            // Requisição para limpar cookies no backend
            await api.post('/api/auth/logout');
            setUsername('')
            navigate('/')
        } catch (error) {
            console.error('Erro ao fazer logout:', error.response?.data?.message || error.message)
        }
    }

    return (
        <> <ErrorDisplay errorMessage={error} />
            <div className="flex flex-col items-center bg-customBg w-[15%] min-h-screen px-1 py-1">
                <div className="flex justify-between px-5 py-5">
                    <User size={30}/>
                    <p className="font-neue-machina-plain-ultrabold">{username}</p>
                </div>
                <div className="flex-grow justify-center items-center mt-3 w-full">
                    <h1 className="text-2xl text-center font-neue-machina-plain-regular">Workspaces</h1>
                    <ul className="font-neue-machina-plain-light flex flex-col mt-4 justify-center items-center">
                        {workspaces.map(workspace => (
                            <li
                                key={workspace._id}
                                className="text-center bg-customBgGrey w-4/5 rounded-md py-1 mt-2 text-white text-2xl cursor-pointer font-semibold hover:bg-pink-700 transition duration-300"
                            >
                                {workspace.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center border-solid border-2 border-black w-16 rounded-md">
                    <button
                        type="button"
                        onClick={handleLogOut}
                        className="px-3 py-1">
                        <DoorOpen size={20}/>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Workspaces