import React, { useState } from "react";
import { motion } from "framer-motion";
import { SquarePen } from "lucide-react";
import api from "../../../../backend/services/api.js";
import ErrorDisplay from "../ErrorDisplay/index.jsx";

const UpdateStudent = ({ student, onUpdateSuccess }) => {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [updatedName, setUpdatedName] = useState(student.name);
    const [updatedEmail, setUpdatedEmail] = useState(student.email);
    const [updatedPdCode, setUpdatedPdCode] = useState(student.pdcode);
    const [error, setError] = useState(null);

    const handleUpdateStudent = async () => {
        try {
            const response = await api.patch(`/api/students/${student._id}`, {
                name: updatedName,
                email: updatedEmail,
                pdcode: updatedPdCode,
            });
            onUpdateSuccess(response.data);
            setError(null);
            setIsUpdateModalVisible(false);
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao atualizar aluno");
        }
    };

    const handleOpenUpdateModal = () => {
        setIsUpdateModalVisible(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalVisible(false);
        setUpdatedName(student.name);
        setUpdatedEmail(student.email);
        setUpdatedPdCode(student.pdcode);
    };

    return (
        <div>
            {/* Botão de edição */}
            <button
                onClick={handleOpenUpdateModal}
                className="p-1 flex items-center justify-center rounded"
                title="Atualizar aluno"
            >
                <SquarePen size={16} className="" />
            </button>

            {/* Modal de atualização com animação */}
            {isUpdateModalVisible && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200/70 backdrop-blur-sm font-neue-machina-plain-regular text-black"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ErrorDisplay errorMessage={error} />
                    <motion.div
                        className="bg-white p-6 rounded-md shadow-lg w-96 text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <h2 className="text-lg text-gray-700 font-neue-machina-plain-ultrabold mb-4">
                            Atualizar Aluno
                        </h2>

                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-left text-sm text-gray-600 mb-1"
                            >
                                Nome
                            </label>
                            <input
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                                className="border border-gray-400 rounded-md p-2 w-full"
                                placeholder="Digite o novo nome"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-left text-sm text-gray-600 mb-1"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={updatedEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                                className="border border-gray-400 rounded-md p-2 w-full"
                                placeholder="Digite o novo e-mail"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="pdcode"
                                className="block text-left text-sm text-gray-600 mb-1"
                            >
                                PD Code
                            </label>
                            <input
                                type="text"
                                value={updatedPdCode}
                                onChange={(e) => setUpdatedPdCode(e.target.value)}
                                className="border border-gray-400 rounded-md p-2 w-full"
                                placeholder="Digite o novo PD Code"
                            />
                        </div>

                        <div className="flex justify-around">
                        <motion.button
                                onClick={handleCloseUpdateModal}
                                className="bg-gray-100 font-medium rounded-md border border-gray-400 hover:bg-gray-200"
                            >
                                <p className="my-2 mx-7">Cancelar</p>
                            </motion.button>
                            <motion.button
                                onClick={handleUpdateStudent}
                                className="bg-gray-100 font-medium rounded-md border border-gray-400 hover:bg-customPurple hover:text-white"
                            >
                                <p className="my-2 mx-9">Salvar</p>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default UpdateStudent;
