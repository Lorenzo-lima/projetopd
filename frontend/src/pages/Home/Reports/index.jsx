import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../../backend/services/api.js";
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";
import AddReport from "../../../components/AddReport/index.jsx";
import { SquarePen, SquarePlus, SquareX } from "lucide-react";
import UpdateReport from "../../../components/UpdateReport/index.jsx";
import DeleteReport from "../../../components/DeleteReport/index.jsx";

const Reports = () => {
    const { studentId } = useParams(); // Pega o ID do estudante da URL
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const [isReportModalVisible, setIsReportModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [reportToUpdate, setReportToUpdate] = useState(null);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false); // Controle de carregamento

    // Fetch reports for the specific student
    useEffect(() => {
        const fetchReportsByStudent = async () => {
            try {
                const response = await api.get(`/api/reports/${studentId}`);
                setReports(response.data);
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || "Erro ao carregar relatórios.");
            } finally {
                setIsLoaded(true); // Marca o carregamento como concluído
            }
        };

        if (studentId) {
            setReports([]);
            setError(null);
            setIsLoaded(false); // Reinicia o estado de carregamento antes da nova busca
            fetchReportsByStudent();
        }
    }, [studentId]);

    const handleOpenReportModal = () => {
        setIsReportModalVisible(true);
    };

    const handleCloseReportModal = () => {
        setIsReportModalVisible(false);
    };

    const handleOpenUpdateModal = (report) => {
        setReportToUpdate(report);
        setIsUpdateModalVisible(true);
    };

    const handleCloseUpdateModal = () => {
        setReportToUpdate(null);
        setIsUpdateModalVisible(false);
    };

    const handleUpdateSuccess = (updatedReport) => {
        setReports((prevReports) =>
            prevReports.map((r) => (r._id === updatedReport._id ? updatedReport : r))
        );
        handleCloseUpdateModal();
    };

    const handleOpenDeleteModal = (reportId) => {
        setReportToDelete(reportId);
        setIsDeleteModalVisible(true);
    };

    const handleCloseDeleteModal = () => {
        setReportToDelete(null);
        setIsDeleteModalVisible(false);
    };

    const handleDeleteSuccess = (deletedReportId) => {
        setReports((prevReports) => prevReports.filter((r) => r._id !== deletedReportId));
        handleCloseDeleteModal();
    };

    // Evita renderizar o conteúdo enquanto o carregamento não está completo
    if (!isLoaded) return null;

    return (
        <div className="flex flex-col items-center bg-white w-full h-screen font-neue-machina-plain-light">
            <div className="flex flex-col w-full h-full overflow-y-auto p-4 custom-scrollbar">
                <ErrorDisplay errorMessage={error} />

                <AddReport
                    studentId={studentId}
                    isVisible={isReportModalVisible}
                    onClose={handleCloseReportModal}
                />

                {isUpdateModalVisible && (
                    <UpdateReport
                        report={reportToUpdate}
                        onUpdateSuccess={handleUpdateSuccess}
                        isVisible={isUpdateModalVisible}
                        onClose={handleCloseUpdateModal}
                    />
                )}

                {reports.length > 0 ? (
                    <ul className="space-y-4">
                        <h1 className="text-3xl font-semibold mb-4 text-center font-neue-machina-plain-ultrabold">
                            Relatórios
                        </h1>
                        {reports.map((report) => (
                            <li
                                key={report._id}
                                className="border rounded-lg border-black border-solid bg-gray-100"
                            >
                                <div className="flex justify-center items-center p-2 relative">
                                    <p className="flex text-center justify-center text-lg font-neue-machina-plain-ultrabold">
                                        {new Date(report.date).toLocaleDateString()}
                                    </p>
                                    <div className="flex absolute right-0 mr-3 space-x-2">
                                        <button
                                            onClick={() => handleOpenUpdateModal(report)}
                                            className=""
                                            title="Atualizar relatório"
                                        >
                                            <SquarePen size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleOpenDeleteModal(report._id)}
                                            className=""
                                            title="Excluir relatório"
                                        >
                                            <SquareX size={18} />
                                        </button>
                                    </div>
                                </div>

                                <hr className="border-t-1 border-black w-full" />

                                <div className="mt-4">
                                    {report.presenceStatus && (
                                        <p className="p-2">
                                            <strong className="font-neue-machina-plain-ultrabold">
                                                Status de Presença:
                                            </strong>{" "}
                                            {report.presenceStatus}
                                        </p>
                                    )}
                                    {report.appointmentTime && (
                                        <p className="p-2">
                                            <strong className="font-neue-machina-plain-ultrabold">
                                                Horário de Atendimento:
                                            </strong>{" "}
                                            {report.appointmentTime}
                                        </p>
                                    )}
                                    {report.resume && (
                                        <p className="p-2">
                                            <strong className="font-neue-machina-plain-ultrabold">
                                                Resumo:
                                            </strong>{" "}
                                            {report.resume}
                                        </p>
                                    )}
                                    {report.strategies && (
                                        <p className="p-2">
                                            <strong className="font-neue-machina-plain-ultrabold">
                                                Estratégias:
                                            </strong>{" "}
                                            {report.strategies}
                                        </p>
                                    )}
                                    {report.observations && (
                                        <p className="p-2">
                                            <strong className="font-neue-machina-plain-ultrabold">
                                                Observações:
                                            </strong>{" "}
                                            {report.observations}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                        <button
                            type="button"
                            onClick={handleOpenReportModal}
                            className="flex mx-auto items-center bg-gray-100 border border-gray-400 rounded-md p-3 mt-4 hover:bg-customPink hover:text-white hover:border-white transition"
                        >
                            <p className="px-5">Adicionar</p>
                        </button>
                    </ul>
                ) : (
                    <div className="flex flex-col h-full justify-center items-center">
                        <h1 className="text-3xl font-semibold mb-4 text-center font-neue-machina-plain-ultrabold">
                            Relatórios
                        </h1>
                        <p className="text-gray-500 text-center">
                            Nenhum relatório encontrado para este aluno.
                        </p>
                        <button
                            type="button"
                            onClick={handleOpenReportModal}
                            className="flex items-center bg-gray-100 border border-gray-400 rounded-md p-3 mt-4 hover:bg-customPink hover:text-white hover:border-white transition"
                        >
                            <p className="flex px-2 items-center justify-center">Adicionar</p>
                        </button>
                    </div>
                )}

                {isDeleteModalVisible && (
                    <DeleteReport
                        reportId={reportToDelete}
                        onDeleteSuccess={handleDeleteSuccess}
                        isVisible={isDeleteModalVisible}
                        onClose={handleCloseDeleteModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Reports;
