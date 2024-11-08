import api from '../../../../../backend/services/api.js';
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";
import { useEffect, useState } from "react";
import { User, LogOut, XCircle } from 'lucide-react'; // Ícones
import { useNavigate } from "react-router-dom";
import relatoriospng from "../../../assets/relatorios.png";

function Workspaces() {
    const [username, setUsername] = useState('');
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Mock de dados para workspaces e alunos
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        if (storedUsername) {
            setUsername(storedUsername);
        }

        const mockWorkspaces = [
            { _id: "1", name: "Lorenzo", students: ["João Almeida", "Maria Silva", "Pedro Santos", "Ana Costa", "Lucas Oliveira"] },
            { _id: "2", name: "Leandra", students: ["Beatriz Ferreira", "Felipe Lima", "Carolina Barbosa"] },
            { _id: "3", name: "Amatoshi", students: ["Rafael Mendes", "Gabriela Souza", "Bruno Rocha"] },
            { _id: "4", name: "Lucca", students: ["Larissa Pinto", "Camila Araújo", "Rodrigo Martins"] },
        ];

        // Simula uma chamada à API
        const fetchWorkspaces = async () => {
            try {
                setWorkspaces(mockWorkspaces);
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || "Erro ao carregar workspaces.");
            }
        };

        fetchWorkspaces();
    }, []);

    // Função de logout
    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    // Alternar workspace selecionado
    const handleWorkspaceClick = (workspace) => {
        setSelectedWorkspace((prev) => (prev?._id === workspace._id ? null : workspace));
    };

    // Excluir aluno
    const handleDeleteStudent = (studentName) => {
        if (selectedWorkspace) {
            const updatedWorkspaces = workspaces.map(workspace => {
                if (workspace._id === selectedWorkspace._id) {
                    return {
                        ...workspace,
                        students: workspace.students.filter(student => student !== studentName),
                    };
                }
                return workspace;
            });

            setWorkspaces(updatedWorkspaces);
            setSelectedWorkspace((prev) => ({
                ...prev,
                students: prev.students.filter(student => student !== studentName),
            }));
        }
    };

    // Adicionar aluno (simulação)
    const handleAddStudent = () => {
        console.log("Adicionar novo aluno");
    };

    return (
        <>
            <ErrorDisplay errorMessage={error} />
            <div
                className="flex h-screen relative"
                style={{
                    backgroundImage: `url(${relatoriospng})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Sidebar */}
                <div className="flex flex-col bg-customBg w-[15%] min-h-full z-10">
                    <div className="flex items-center justify-between px-5 py-5">
                        <User size={30} />
                        <p className="font-neue-machina-plain-ultrabold">{username}</p>
                        <button
                            type="button"
                            onClick={handleLogOut}
                            className="px-3 py-1 rounded-md"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                    <div className="flex-grow justify-center items-center mt-3">
                        <h1 className="text-2xl text-center font-neue-machina-plain-regular">Workspaces</h1>
                        <ul className="font-neue-machina-plain-light flex flex-col mt-4 justify-center items-center">
                            {workspaces.map(workspace => (
                                <li
                                    key={workspace._id}
                                    className={`text-center bg-customBgGrey w-4/5 rounded-md px-2 py-1 mt-2 text-white text-2xl cursor-pointer font-semibold transition duration-300 ${
                                        selectedWorkspace?._id === workspace._id ? 'bg-customPinkTwo' : 'hover:bg-customPink'
                                    }`}
                                    onClick={() => handleWorkspaceClick(workspace)}
                                >
                                    {workspace.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Lista de Alunos */}
                <div
                    className={`absolute top-0 left-[15%] h-full bg-gray-100 w-[20%] p-4 border-l border-gray-300 flex flex-col justify-between transform transition-transform duration-700 ease-in-out ${
                        selectedWorkspace ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    }`}
                >
                    {selectedWorkspace && (
                        <>
                            <div className='font-neue-machina-plain-regular'>
                                <h2 className="text-2xl font-bold mb-4">Lista de Alunos</h2>
                                <ul className="space-y-2">
                                    {selectedWorkspace.students.map((student, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between text-lg py-2 px-4 bg-gray-200 rounded shadow hover:scale-105 transform transition-transform duration-300"
                                        >
                                            <span>{student}</span>
                                            <XCircle
                                                size={20}
                                                className="text-black cursor-pointer hover:text-gray-500 transition duration-300"
                                                onClick={() => handleDeleteStudent(student)}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={handleAddStudent}
                                className="w-full py-2 bg-customPink text-white font-semibold rounded hover:bg-customPinkTwo hover:scale-105 transform transition-transform duration-300"
                            >
                                Adicionar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Workspaces;
