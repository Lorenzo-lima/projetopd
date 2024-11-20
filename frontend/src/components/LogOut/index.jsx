import React from 'react';
import { useNavigate } from "react-router-dom";
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
                    <button
                        className="g-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        onClick={handleLogOut}
                    >
                        <p className="my-2 mx-12" >Sim</p>
                    </button>
                    <button
                        className="g-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        onClick={onClose}
                    >
                        <p className="my-2 mx-7">Cancelar</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogOut;
