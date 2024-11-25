import React, { useEffect, useState } from "react";
import api from "../../../../backend/services/api.js";
import ErrorDisplay from "../ErrorDisplay/index.jsx";

const UpdateReport = ({ report, onUpdateSuccess, isVisible, onClose }) => {
    const [formData, setFormData] = useState({
        date: "",
        presenceStatus: "Presente",
        appointmentTime: "",
        resume: "",
        strategies: "",
        observations: "",
    });
    const [error, setError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    // Atualiza o estado do formulário quando o `report` muda
    useEffect(() => {
        if (report) {
            setFormData({
                date: report.date ? new Date(report.date).toISOString().slice(0, 10) : "",
                presenceStatus: report.presenceStatus || "Presente",
                appointmentTime: report.appointmentTime || "",
                resume: report.resume || "",
                strategies: report.strategies || "",
                observations: report.observations || "",
            });
        }
    }, [report]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateReport = async () => {
        try {
            // Verifica campos obrigatórios
            const requiredFields = ["presenceStatus", "appointmentTime", "resume"];
            const errors = {};

            requiredFields.forEach((field) => {
                if (!formData[field] || formData[field].trim() === "") {
                    errors[field] = "Este campo é obrigatório.";
                }
            });

            if (Object.keys(errors).length > 0) {
                setFieldErrors(errors);
                return;
            }

            // Filtra os campos vazios
            const filteredData = Object.fromEntries(
                Object.entries(formData).filter(([_, value]) => value && value.trim() !== "")
            );

            const response = await api.patch(`/api/reports/${report._id}`, filteredData);
            onUpdateSuccess(response.data);
            setError(null);
            setFieldErrors({});
            onClose();
        } catch (err) {
            console.error("Erro na atualização:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Erro ao atualizar relatório");
        }
    };

    // Não renderiza o modal se não for visível
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200/70 backdrop-blur-sm font-neue-machina-plain-regular">
            <ErrorDisplay errorMessage={error} />
            <div className="bg-white p-6 rounded-md shadow-lg min-w-[40%] text-center">
                <h2 className="text-lg text-gray-700 font-neue-machina-plain-ultrabold mb-4">
                    Atualizar Relatório
                </h2>

                <form className="space-y-4">
                    {/* Data */}
                    <div>
                        <label htmlFor="date" className="block text-left text-sm text-gray-600 mb-1">
                            Data
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-customPink ${
                                fieldErrors.date ? "border-red-500" : "border-gray-400"
                            }`}
                        />
                        {fieldErrors.date && <p className="text-red-500 text-sm mt-1">{fieldErrors.date}</p>}
                    </div>

                    {/* Status de Presença */}
                    <div>
                        <label
                            htmlFor="presenceStatus"
                            className="block text-left text-sm text-gray-600 mb-1"
                        >
                            Status de Presença <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="presenceStatus"
                            name="presenceStatus"
                            value={formData.presenceStatus}
                            onChange={handleInputChange}
                            className={`border rounded-md p-2 w-full ${
                                fieldErrors.presenceStatus ? "border-red-500" : "border-gray-400"
                            }`}
                        >
                            <option value="Presente">Presente</option>
                            <option value="Ausente">Ausente</option>
                            <option value="Justificou">Justificou</option>
                        </select>
                        {fieldErrors.presenceStatus && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.presenceStatus}</p>
                        )}
                    </div>

                    {/* Horário de Atendimento */}
                    <div>
                        <label
                            htmlFor="appointmentTime"
                            className="block text-left text-sm text-gray-600 mb-1"
                        >
                            Horário de Atendimento <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="time"
                            id="appointmentTime"
                            name="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleInputChange}
                            className={`border rounded-md p-2 w-full ${
                                fieldErrors.appointmentTime ? "border-red-500" : "border-gray-400"
                            }`}
                        />
                        {fieldErrors.appointmentTime && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.appointmentTime}</p>
                        )}
                    </div>

                    {/* Resumo */}
                    <div>
                        <label htmlFor="resume" className="block text-left text-sm text-gray-600 mb-1">
                            Resumo <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="resume"
                            name="resume"
                            value={formData.resume}
                            onChange={handleInputChange}
                            className={`border rounded-md p-2 w-full ${
                                fieldErrors.resume ? "border-red-500" : "border-gray-400"
                            }`}
                            rows="3"
                            placeholder="Resumo do atendimento"
                        />
                        {fieldErrors.resume && (
                            <p className="text-red-500 text-sm mt-1">{fieldErrors.resume}</p>
                        )}
                    </div>

                    {/* Estratégias */}
                    <div>
                        <label htmlFor="strategies" className="block text-left text-sm text-gray-600 mb-1">
                            Estratégias
                        </label>
                        <textarea
                            id="strategies"
                            name="strategies"
                            value={formData.strategies}
                            onChange={handleInputChange}
                            className="border rounded-md p-2 w-full"
                            rows="2"
                            placeholder="Estratégias aplicadas"
                        />
                    </div>

                    {/* Observações */}
                    <div>
                        <label htmlFor="observations" className="block text-left text-sm text-gray-600 mb-1">
                            Observações
                        </label>
                        <textarea
                            id="observations"
                            name="observations"
                            value={formData.observations}
                            onChange={handleInputChange}
                            className="border rounded-md p-2 w-full"
                            rows="2"
                            placeholder="Observações adicionais"
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex justify-around">
                        <button
                            type="button"
                            onClick={handleUpdateReport}
                            className="bg-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        >
                            <p className="my-2 mx-9">Salvar</p>
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-100 font-medium rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        >
                            <p className="my-2 mx-7">Cancelar</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateReport;
