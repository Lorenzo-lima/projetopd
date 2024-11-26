import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../../../backend/services/api.js";
import ErrorDisplay from "../ErrorDisplay/index.jsx";

const DeleteReport = ({ reportId, onDeleteSuccess, isVisible, onClose }) => {
    const [error, setError] = useState(null);

    const handleDeleteReport = async () => {
        try {
            await api.delete(`/api/reports/${reportId}`);
            onDeleteSuccess(reportId); // Callback para atualizar a lista de relatórios no componente pai
            setError(null);
            onClose(); // Fecha o modal
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao excluir relatório");
        }
    };

    // Não renderiza o modal se não for visível
    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200/70 backdrop-blur-sm font-neue-machina-plain-regular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <ErrorDisplay errorMessage={error} />
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
                    Tem certeza que deseja excluir este relatório?
                </p>
                <div className="flex justify-around mx-auto">
                    <motion.button
                        onClick={handleDeleteReport}
                        className="bg-gray-100 mr-4 font-medium rounded-md border border-gray-400 hover:bg-customPurple hover:text-white hover:border-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="my-2 mx-9">Excluir</p>
                    </motion.button>
                    <motion.button
                        onClick={onClose}
                        className="bg-gray-100 font-medium rounded-md border border-gray-400 hover:bg-gray-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="my-2 mx-7">Cancelar</p>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DeleteReport;
