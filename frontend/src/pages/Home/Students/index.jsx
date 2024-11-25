import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../../../backend/services/api.js";
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";
import AddStudent from "../../../components/AddStudent/index.jsx";
import DeleteStudent from "../../../components/DeleteStudent/index.jsx";
import UpdateStudent from "../../../components/UpdateStudent/index.jsx";

const Students = () => {
    const { workspaceId } = useParams();
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);
    const [additionalMessage, setAdditionalMessage] = useState(null);
    const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar carregamento

    // Fetch students from the API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get(`/api/students/${workspaceId}`);
                setStudents(response.data);
                setError(null);
                setAdditionalMessage(null);
            } catch (error) {
                setError(error.response?.data?.message || "Erro ao carregar alunos.");
                setAdditionalMessage(error.response?.data?.additionalMessage);
            } finally {
                setIsLoaded(true); // Marca como carregado
            }
        };

        fetchStudents();
    }, [workspaceId]);

    const handleOpenAddStudentModal = () => {
        setIsAddStudentModalVisible(true);
    };

    const handleCloseAddStudentModal = () => {
        setIsAddStudentModalVisible(false);
    };

    const handleDeleteSuccess = (deletedStudentId) => {
        setStudents((prevStudents) =>
            prevStudents.filter((student) => student._id !== deletedStudentId)
        );
    };

    // Evita renderizar o conteúdo antes de estar carregado
    if (!isLoaded) return null;

    return (
        <>
            {/* Exibe apenas o modal de erro se houver erro */}
            {error ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-md p-6 text-center shadow-lg">
                        <ErrorDisplay errorMessage={error} additionalMessage={additionalMessage} />
                        <button
                            onClick={() => setError(null)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col bg-gray-100 w-[20%] min-h-screen shadow-md border-r border-gray-300 font-neue-machina-plain-regular">
                    <div className="flex flex-col px-6 mt-6">
                        <h1 className="text-lg font-neue-machina-plain-ultrabold mb-4 text-center">
                            Lista de Alunos
                        </h1>
                        <ul className="flex flex-col space-y-3">
                            {students.map((student) => (
                                <Link
                                    to={`/workspace/${workspaceId}/students/${student._id}/reports`}
                                    key={student._id}
                                    className="text-sm hover:text-white"
                                >
                                    <li
                                        className="flex justify-between items-center p-3 rounded-md shadow hover:bg-customPink hover:text-white bg-gray-200 cursor-pointer"
                                    >
                                        {student.name}
                                        <div className="flex space-x-2">
                                            <UpdateStudent
                                                student={student}
                                                onUpdateSuccess={(updatedStudent) => {
                                                    setStudents((prevStudents) =>
                                                        prevStudents.map((s) =>
                                                            s._id === updatedStudent._id ? updatedStudent : s
                                                        )
                                                    );
                                                }}
                                            />
                                            <DeleteStudent
                                                studentId={student._id}
                                                onDeleteSuccess={handleDeleteSuccess}
                                            />
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>

                    {/* Add student button */}
                    <div className="mt-auto flex justify-center p-4 border-gray-300">
                        <button
                            type="button"
                            onClick={handleOpenAddStudentModal}
                            className="flex items-center justify-center bg-gray-100 border border-gray-400 rounded-md p-3 hover:bg-customPink hover:text-white hover:border-white transition"
                        >
                            <p className="px-5"> Adicionar </p>
                        </button>
                    </div>

                    {/* Add student modal */}
                    <AddStudent
                        workspaceId={workspaceId}
                        isVisible={isAddStudentModalVisible}
                        onClose={handleCloseAddStudentModal}
                    />
                </div>
            )}
        </>
    );
};

export default Students;
