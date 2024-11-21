import { User, DoorOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../../../backend/services/api.js";
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";
import LogOut from "../../../components/LogOut/index.jsx";

function Workspaces() {
    const [username, setUsername] = useState("");
    const [workspaces, setWorkspaces] = useState([]);
    const [error, setError] = useState(null);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false); // Estado para controle do modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await api.get("/api/user/me");
                setUsername(userResponse.data.name);

                const workspaceResponse = await api.get("/api/workspaces");
                setWorkspaces(workspaceResponse.data);

                setError(null);
            } catch (error) {
                setError(error.response?.data?.message);
                navigate("/");
            }
        };

        fetchUserData();
    }, []);

    const handleOpenLogoutModal = () => {
        setIsLogoutModalVisible(true); // Exibe o modal
    };

    const handleCloseLogoutModal = () => {
        setIsLogoutModalVisible(false); // Fecha o modal
    };

    return (
        <>
            <ErrorDisplay errorMessage={error} />
            <LogOut
                isVisible={isLogoutModalVisible}
                onClose={handleCloseLogoutModal}
            />
            <div className="flex flex-col bg-gray-100 w-[15%] min-h-screen shadow-md border-r border-gray-300 font-neue-machina-plain-regular">
                {/* Header */}
                <div className="flex items-center p-4 border-b border-gray-300">
                    <User size={26} className="mr-2 text-gray-600" />
                    <p className="text-gray-800 font-semibold text-lg mt-3">{username}</p>
                </div>

                {/* Workspaces */}
                <div className="flex flex-col px-6 mt-6">
                    <h1 className="text-lg font-neue-machina-plain-ultrabold mb-4 text-center">Workspaces</h1>
                    <ul className="space-y-3">
                        {workspaces.map((workspace) => (
                            <li
                                key={workspace._id}
                                onClick={() => navigate(`/workspace/${workspace._id}/students`)}
                                className="bg-gray-200 rounded-md py-3 px-4 text-gray-800 text-lg font-medium text-center cursor-pointer hover:bg-customPink hover:text-white transition duration-300"
                            >
                                {workspace.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="mt-auto flex justify-center p-4 border-t border-gray-300">
                    <button
                        type="button"
                        onClick={handleOpenLogoutModal} // Exibe o modal ao clicar
                        className="flex items-center justify-center bg-gray-100 border border-gray-400 rounded-md p-3 hover:bg-gray-200 transition"
                    >
                        <DoorOpen size={20} className="text-gray-600" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Workspaces;
