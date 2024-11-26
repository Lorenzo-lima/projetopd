import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SquareX } from "lucide-react";
import api from "../../../../../backend/services/api.js";
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";
import AddStudent from "../../../components/AddStudent/index.jsx";
import UpdateStudent from "../../../components/UpdateStudent/index.jsx";

const Students = () => {
    const { workspaceId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState(null);
    const [additionalMessage, setAdditionalMessage] = useState(null);
    const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

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
                setIsLoaded(true);
            }
        };

        fetchStudents();
    }, [workspaceId]);

    useEffect(() => {
        const currentStudentId = location.pathname.split("/")[4];
        setSelectedStudent(currentStudentId);
    }, [location.pathname]);

    const handleStudentClick = (studentId) => {
        setSelectedStudent(studentId);
        navigate(`/workspace/${workspaceId}/students/${studentId}/reports`);
    };

    const handleOpenAddStudentModal = () => {
        setIsAddStudentModalVisible(true);
    };

    const handleCloseAddStudentModal = () => {
        setIsAddStudentModalVisible(false);
    };

    const handleOpenConfirmModal = (studentId) => {
        setStudentToDelete(studentId);
        setIsConfirmModalVisible(true);
    };

    const handleCloseConfirmModal = () => {
        setStudentToDelete(null);
        setIsConfirmModalVisible(false);
    };

    const handleDeleteStudent = async () => {
        try {
            await api.delete(`/api/students/${studentToDelete}`);
            setStudents((prevStudents) =>
                prevStudents.filter((student) => student._id !== studentToDelete)
            );
            setStudentToDelete(null);
            setIsConfirmModalVisible(false);
            setError(null);
            navigate(`/workspace/${workspaceId}/students`);
        } catch (error) {
            setError(error.response?.data?.message || "Erro ao excluir aluno");
        }
    };

    if (!isLoaded) return null;

    return (
        <>
            {error ? (
                <ErrorDisplay errorMessage={error} additionalMessage={additionalMessage} />
            ) : (
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full bg-gray-100 min-w-[20%] min-h-screen shadow-md border-r border-gray-300"
                >
                    <div className="flex-1 flex flex-col mt-6">
                        <h1 className="text-lg font-neue-machina-plain-ultrabold mb-4 mt-0.5 text-center">
                            Lista de Alunos
                        </h1>
                        <ul className="flex flex-col space-y-3 border-t mt-0.5 border-gray-300">
                            {students.map((student) => (
                                <motion.li
                                    key={student._id}
                                    onClick={() => handleStudentClick(student._id)}
                                    className={`flex justify-between items-center p-3 mt-4 mx-4 rounded-md shadow cursor-pointer transition ${
                                        selectedStudent === student._id
                                            ? "bg-customPink text-white"
                                            : "bg-gray-200 text-gray-800 hover:bg-customPink hover:text-white"
                                    }`}
                                >
                                    {student.name}
                                    <div className="flex space-x-2">
                                        <UpdateStudent
                                            student={student}
                                            onUpdateSuccess={(updatedStudent) => {
                                                setStudents((prevStudents) =>
                                                    prevStudents.map((s) =>
                                                        s._id === updatedStudent._id
                                                            ? updatedStudent
                                                            : s
                                                    )
                                                );
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleOpenConfirmModal(student._id);
                                            }}
                                            className="p-1 flex items-center justify-center rounded"
                                            title="Excluir aluno"
                                        >
                                            <SquareX size={16} />
                                        </button>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center justify-center p-4 border-t border-gray-300">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={handleOpenAddStudentModal}
                            className="flex items-center justify-center bg-gray-100 border border-gray-400 rounded-md p-3 hover:bg-customPink hover:text-white hover:border-white transition"
                        >
                            <p className="px-5">Adicionar</p>
                        </motion.button>
                    </div>

                    <AddStudent
                        workspaceId={workspaceId}
                        isVisible={isAddStudentModalVisible}
                        onClose={handleCloseAddStudentModal}
                    />
                </motion.div>
            )}

            {/* Modal de confirmação de exclusão */}
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
                            <motion.button
                                onClick={handleDeleteStudent}
                                className="bg-gray-100 mr-4 font-medium rounded-md border border-gray-400 hover:bg-customPurple hover:text-white"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="my-2 mx-9">Excluir</p>
                            </motion.button>
                            <motion.button
                                onClick={handleCloseConfirmModal}
                                className="bg-gray-100 ml-4 font-medium rounded-md border border-gray-400 hover:bg-gray-200"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <p className="my-2 mx-7">Cancelar</p>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default Students;
