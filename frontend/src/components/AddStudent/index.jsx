import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../../../backend/services/api";
import ErrorDisplay from "../ErrorDisplay";

function AddStudent({ isVisible, onClose }) {
    const { workspaceId } = useParams(); // Obtém o ID da workspace dos parâmetros da URL
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        pdcode: "", // Corrigido para corresponder ao backend (minúsculo)
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            // Certifica-se de enviar os dados corretos para o backend
            await api.post(`/api/students/${workspaceId}`, formData);
            setFormData({ name: "", email: "", pdcode: "" }); // Limpa o formulário
            setError(null); // Reseta o erro, se houver
            onClose(); // Fecha o modal após sucesso
        } catch (err) {
            // Trata o erro e exibe a mensagem
            setError(err.response?.data?.message || "Erro ao adicionar aluno");
        }
    };

    if (!isVisible) return null; // Não renderiza o modal se não for visível

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200/70 backdrop-blur-sm font-neue-machina-plain-regular">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md font-neue-machina-plain-regular"
            >
                {/* Exibição de erro */}
                <ErrorDisplay errorMessage={error} />

                <h1 className="text-xl font-bold mb-6 text-center font-neue-machina-plain-ultrabold">
                    Adicionar Aluno
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nome */}
                    <div>
                        <label htmlFor="name" className="block text-gray-700 mb-1">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            placeholder="Digite o nome"
                            required
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            placeholder="Digite o e-mail"
                            required
                        />
                    </div>
                    {/* PDCode */}
                    <div>
                        <label htmlFor="pdcode" className="block text-gray-700 mb-1">
                            Número de Matrícula
                        </label>
                        <input
                            type="text"
                            id="pdcode"
                            name="pdcode"
                            value={formData.pdcode}
                            onChange={handleInputChange}
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            placeholder="Digite o número de matrícula"
                            required
                        />
                    </div>
                    {/* Botões */}
                    <div className="flex justify-between pt-3">
                        <button
                            type="submit"
                            className="bg-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        >
                            <p className="my-2 mx-7">Adicionar</p>
                        </button>
                        <button
                            type="button"
                            onClick={onClose} // Fecha o modal
                            className="bg-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        >
                            <p className="my-2 mx-7">Cancelar</p>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default AddStudent;
