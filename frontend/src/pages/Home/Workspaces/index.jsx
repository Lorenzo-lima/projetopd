import api from '../../../../../backend/services/api.js'
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx"
import { useEffect, useState } from "react"
import { User, LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom"

function Workspaces(){
    const [ username, setUsername ] = useState('')
    const [ workspaces, setWorkspaces ] = useState([])
    const [ error, setError ] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const storedUsername = localStorage.getItem("username")
        const token = localStorage.getItem("token")

        if(storedUsername){
            setUsername(storedUsername)
        }

        const fetchWorkspaces = async () => {
            try {
                const response = await api.get('/api/workspaces', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setWorkspaces(response.data)
                setError(null)
            } catch (error) {
                setError(error.response?.data?.message)
            }
        }

        fetchWorkspaces()
    },[])

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate('/')
    }

    return (
        <> <ErrorDisplay errorMessage={error} />
            <div className="flex flex-col bg-customBg w-[15%] min-h-screen">
                <div className="flex items-center justify-between px-5 py-5">
                    <User size={30}/>
                    <p className="font-neue-machina-plain-ultrabold">{username}</p>
                    <button
                        type="button"
                        onClick={handleLogOut}
                        className="px-3 py-1 rounded-md">
                        <LogOut size={20}/>
                    </button>
                </div>
                <div className="flex-grow justify-center items-center mt-3">
                    <h1 className="text-2xl text-center font-neue-machina-plain-regular">Workspaces</h1>
                    <ul className="font-neue-machina-plain-light flex flex-col mt-4 justify-center items-center">
                        { workspaces.map(workspace => (
                            <li
                                key={workspace._id}
                                className="text-center bg-customBgGrey w-4/5 rounded-md px-2 py-1 mt-2 text-white text-2xl cursor-pointer font-semibold hover:bg-pink-700 transition duration-300"
                            >
                                { workspace.name }
                            </li>
                        )) }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Workspaces