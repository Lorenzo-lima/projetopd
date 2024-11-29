import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../../../backend/services/api";
import ErrorDisplay from "../ErrorDisplay";

function AddReport({ isVisible, onClose }) {
    const { studentId } = useParams(); // Obtém o ID do estudante dos parâmetros da URL
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        date: "", // Data do relatório
        presenceStatus: "Presente", // Status inicial padrão
        appointmentTime: "", // Horário do atendimento
        resume: "", // Resumo do atendimento
        strategies: "", // Estratégias (opcional)
        observations: "", // Observações (opcional)
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            // Envia os dados para o backend
            await api.post(`/api/reports/${studentId}`, formData);
            setFormData({
                date: "",
                presenceStatus: "Presente",
                appointmentTime: "",
                resume: "",
                strategies: "",
                observations: "",
            }); // Limpa o formulário
            setError(null); // Reseta o erro, se houver
            onClose(); // Fecha o modal após sucesso
        } catch (err) {
            // Trata o erro e exibe a mensagem
            setError(err.response?.data?.message || "Erro ao adicionar relatório");
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
        >
            {/* Exibição de erro */}
            <ErrorDisplay errorMessage={error} />

            <motion.div
                className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg m-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <h1 className="text-xl font-bold mb-4 text-center font-neue-machina-plain-ultrabold">
                    Adicionar Relatório
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Data */}
                    <div>
                        <label htmlFor="date" className="block text-gray-700 mb-1">
                            Data
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            required
                        />
                    </div>
                    {/* Status de Presença */}
                    <div>
                        <label htmlFor="presenceStatus" className="block text-gray-700 mb-1">
                            Status de Presença *
                        </label>
                        <select
                            id="presenceStatus"
                            name="presenceStatus"
                            value={formData.presenceStatus}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            required
                        >
                            <option value="Presente">Presente</option>
                            <option value="Ausente">Ausente</option>
                            <option value="Justificou">Justificou</option>
                        </select>
                    </div>
                    {/* Horário de Atendimento */}
                    <div>
                        <label htmlFor="appointmentTime" className="block text-gray-700 mb-1">
                            Horário de Atendimento *
                        </label>
                        <input
                            type="time"
                            id="appointmentTime"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            required
                        />
                    </div>
                    {/* Resumo */}
                    <div>
                        <label htmlFor="resume" className="block text-gray-700 mb-1">
                            Resumo *
                        </label>
                        <textarea
                            id="resume"
                            name="resume"
                            value={formData.resume}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            rows="3"
                            placeholder="Descreva brevemente o atendimento"
                            required
                        />
                    </div>
                    {/* Estratégias */}
                    <div>
                        <label htmlFor="strategies" className="block text-gray-700 mb-1">
                            Estratégias
                        </label>
                        <textarea
                            id="strategies"
                            name="strategies"
                            value={formData.strategies}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            rows="2"
                            placeholder="Descreva estratégias aplicadas"
                        />
                    </div>
                    {/* Observações */}
                    <div>
                        <label htmlFor="observations" className="block text-gray-700 mb-1">
                            Observações
                        </label>
                        <textarea
                            id="observations"
                            name="observations"
                            value={formData.observations}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink"
                            rows="2"
                            placeholder="Adicione observações, se necessário"
                        />
                    </div>
                    {/* Botões */}
                    <div className="flex justify-between pt-2">
                        <motion.button
                            type="button"
                            onClick={onClose} // Fecha o modal
                            className="bg-gray-100 font-medium rounded-md border border-gray-400 hover:bg-gray-200"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="my-2 mx-7">Cancelar</p>
                        </motion.button>
                        <motion.button
                            type="submit"
                            className="bg-gray-100 font-medium rounded-md border border-gray-400 hover:bg-customPurple hover:text-white"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <p className="my-2 mx-7">Adicionar</p>
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default AddReport;
