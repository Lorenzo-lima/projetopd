import React from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from '../../../../backend/services/api.js';

function LogOut({ isVisible, onClose }) {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await api.post("/api/auth/logout");
            navigate("/"); // Redireciona para a página inicial após o logout
        } catch (error) {
            console.error(
                "Erro ao fazer logout:",
                error.response?.data?.message || error.message
            );
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/70 backdrop-blur-sm font-neue-machina-plain-regular">
            <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-center animate-scaleIn">
                <h2 className="text-2xl font-bold mb-4 font-neue-machina-plain-ultrabold">Deseja sair?</h2>
                <p className="mb-6 text-lg">
                    Você está prestes a sair da sua conta. Tem certeza que deseja continuar?
                </p>
                <div className="flex justify-center gap-4">
                    <motion.button
                        className="bg-gray-100 font-medium rounded-md border border-gray-400 hover:bg-gray-200"
                        onClick={onClose}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="my-2 mx-7">Cancelar</p>
                    </motion.button>
                    <motion.button
                        className="bg-gray-100 font-medium rounded-md border border-gray-400 hover:bg-customPurple hover:text-white"
                        onClick={handleLogOut}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="my-2 mx-12">Sim</p>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default LogOut;
