import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, DoorOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../../../backend/services/api.js";
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";
import LogOut from "../../../components/LogOut/index.jsx";

function Workspaces() {
    const [username, setUsername] = useState("");
    const [workspaces, setWorkspaces] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [error, setError] = useState(null);
    const [additionalMessage, setAdditionalMessage] = useState(null);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await api.get("/api/user/me");
                setUsername(userResponse.data.name);

                const workspaceResponse = await api.get("/api/workspaces");
                setWorkspaces(workspaceResponse.data);

                setError(null);
                setAdditionalMessage(null);
            } catch (error) {
                setError(error.response?.data?.message);
                setAdditionalMessage(error.response?.data?.additionalMessage);
                navigate("/");
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const currentWorkspaceId = location.pathname.split("/")[2];
        setSelectedWorkspace(currentWorkspaceId);
    }, [location.pathname]);

    const handleWorkspaceClick = (workspaceId) => {
        setSelectedWorkspace(workspaceId);
        navigate(`/workspace/${workspaceId}/students`);
    };

    const handleOpenLogoutModal = () => {
        setIsLogoutModalVisible(true);
    };

    const handleCloseLogoutModal = () => {
        setIsLogoutModalVisible(false);
    };

    return (
        <>
            <ErrorDisplay errorMessage={error} additionalMessage={additionalMessage} />
            <LogOut isVisible={isLogoutModalVisible} onClose={handleCloseLogoutModal} />

            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col h-full bg-gray-100 w-[15%] min-h-screen shadow-md border-r border-gray-300 font-neue-machina-plain-regular"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-300 mr-1">
                    <User size={26} className="text-gray-600" />
                    <p className="text-gray-800 font-neue-machina-plain-ultrabold text-lg mt-3 mr-20">{username}</p>
                </div>

                <div className="flex-1 flex flex-col px-6 mt-6 overflow-x-auto custom-scrollbar h-screen">
                    <h1 className="text-lg font-neue-machina-plain-ultrabold mb-4 text-center">
                        Workspaces
                    </h1>
                    <ul className="space-y-3">
                        {workspaces.map((workspace) => (
                            <motion.li
                                key={workspace._id}
                                onClick={() => handleWorkspaceClick(workspace._id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-md py-3 px-4 text-lg font-medium text-center cursor-pointer transition duration-300 ${
                                    selectedWorkspace === workspace._id
                                        ? "bg-customPink text-white"
                                        : "bg-gray-200 text-gray-800 hover:bg-customPink hover:text-white"
                                }`}
                            >
                                {workspace.name}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center justify-center p-4 border-t border-gray-300">
                    <motion.button
                        type="button"
                        onClick={handleOpenLogoutModal}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center bg-gray-100 border border-gray-400 rounded-md p-3 hover:bg-gray-200 transition"
                    >
                        <DoorOpen size={20} className="text-gray-600 my-0.5" />
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
}

export default Workspaces;
