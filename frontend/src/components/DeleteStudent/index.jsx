import React, { useState } from "react";
import { SquareX } from "lucide-react";
import api from "../../../../backend/services/api.js";
import ErrorDisplay from "../ErrorDisplay/index.jsx";

const DeleteStudent = ({ studentId, onDeleteSuccess }) => {
    const [error, setError] = useState(null);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

    const handleDeleteStudent = async () => {
        try {
            await api.delete(`/api/students/${studentId}`);
            onDeleteSuccess(studentId);
            setError(null);
            setIsConfirmModalVisible(false);
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao excluir aluno");
        }
    };

    const handleOpenConfirmModal = () => {
        setIsConfirmModalVisible(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalVisible(false);
    };

    return (
        <>
            <ErrorDisplay errorMessage={error} />

            <button
                onClick={handleOpenConfirmModal}
                className=""
                title="Excluir aluno"
            >
                <SquareX size={18} />
            </button>

            {isConfirmModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm text-black">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96 text-center">
                        <h2 className="text-lg text-gray-700 font-neue-machina-plain-ultrabold mb-4">Confirmar Exclusão</h2>
                        <p className="text-gray-700 mb-6">Tem certeza que deseja excluir este aluno?</p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleDeleteStudent}
                                className="bg-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                            >
                                <p className="my-2 mx-9">Excluir</p>
                            </button>
                            <button
                                onClick={handleCloseConfirmModal}
                                className="bg-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                            >
                                <p className="my-2 mx-7">Cancelar</p>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteStudent;
