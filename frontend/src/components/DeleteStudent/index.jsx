import React, { useState } from "react";
import { motion } from "framer-motion";
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

            {isConfirmModalVisible && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200/70 backdrop-blur-sm font-neue-machina-plain-regular text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <motion.div
                        className="flex flex-col bg-white border-2 items-center shadow-xl rounded-lg p-8 w-full max-w-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <h2 className="text-lg text-gray-700 font-neue-machina-plain-ultrabold mb-4">
                            Confirmar Exclusão
                        </h2>
                        <p className="text-gray-700 mb-6">
                            Tem certeza que deseja excluir este aluno?
                        </p>
                        <div className="flex justify-around mx-auto">
                            <button
                                onClick={handleDeleteStudent}
                                className="bg-gray-100 mr-4 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                            >
                                <p className="my-2 mx-9">Excluir</p>
                            </button>
                            <button
                                onClick={handleCloseConfirmModal}
                                className="bg-gray-100 ml-4 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                            >
                                <p className="my-2 mx-7">Cancelar</p>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default DeleteStudent;
