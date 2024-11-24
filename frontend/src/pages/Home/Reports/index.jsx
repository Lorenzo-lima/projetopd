import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../../backend/services/api.js";
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";

const Reports = () => {
    const { studentId } = useParams(); // Pega o ID do estudante da URL
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    // Fetch reports for the specific student
    useEffect(() => {
        const fetchReportsByStudent = async () => {
            try {
                const response = await api.get(`/api/reports/${studentId}`);
                setReports(response.data);
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || "Erro ao carregar relatórios.");
            }
        };

        if (studentId) {
            fetchReportsByStudent();
        }
    }, [studentId]);

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-xl w-full h-full font-neue-machina-plain-regular">
            <div className="w-full max-h-screen overflow-y-auto p-4 custom-scrollbar">
                <h1 className="text-3xl font-semibold mb-4 text-center font-neue-machina-plain-ultrabold">Relatórios</h1>

                {/* Exibição de Erros
                <ErrorDisplay errorMessage={error} />
                */}
                {/* Lista de Relatórios */}
                {reports.length > 0 ? (
                    <ul className="space-y-4 ">
                        {reports.map((report) => (
                            <li key={report._id} className="border rounded-lg border-black border-solid bg-gray-100">
                                <p className="flex text-center justify-center text-xl p-2">
                                    {new Date(report.date).toLocaleDateString()}
                                </p>
                                <hr className="border-t-1 border-black w-full" />
                                <div className="mt-4">
                                    <p className="p-2"><strong className="font-neue-machina-plain-ultrabold">Status de Presença:</strong> {report.presenceStatus}</p>
                                    <p className="p-2"><strong className="font-neue-machina-plain-ultrabold">Horário de Atendimento:</strong> {report.appointmentTime}</p>
                                    <p className="p-2"><strong className="font-neue-machina-plain-ultrabold">Resumo:</strong> {report.resume}</p>
                                    {report.strategies && (
                                        <p className="p-2"><strong className="font-neue-machina-plain-ultrabold">Estratégias:</strong> {report.strategies}</p>
                                    )}
                                    {report.observations && (
                                        <p className="p-2"><strong className="font-neue-machina-plain-ultrabold">Observações:</strong> {report.observations}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center">Nenhum relatório encontrado para este aluno.</p>
                )}
            </div>
        </div>
    );
};

export default Reports;