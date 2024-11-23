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
    const [isAddStudentModalVisible, setIsAddStudentModalVisible] = useState(false);

    // Fetch students from the API
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get(`/api/students/${workspaceId}`);
                setStudents(response.data);
                setError(null);
            } catch (error) {
                setError(error.response?.data?.message || "Erro ao carregar alunos.");
            }
        };

        fetchStudents();
    }, [workspaceId]);

    const handleOpenAddStudentModal = () => {
        setIsAddStudentModalVisible(true); // Open modal
    };

    const handleCloseAddStudentModal = () => {
        setIsAddStudentModalVisible(false); // Close modal
    };

    const handleDeleteSuccess = (deletedStudentId) => {
        // Update the students list locally after a successful delete
        setStudents((prevStudents) =>
            prevStudents.filter((student) => student._id !== deletedStudentId)
        );
    };

    return (
        <>
            {/* Error display */}
            <ErrorDisplay errorMessage={error} />

            {/* Add student modal */}
            <AddStudent
                workspaceId={workspaceId}
                isVisible={isAddStudentModalVisible}
                onClose={handleCloseAddStudentModal}
            />

            {/* Students list */}
            <div className="flex flex-col bg-gray-100 w-[20%] min-h-screen shadow-md border-r border-gray-300 font-neue-machina-plain-regular">
                <div className="flex flex-col px-6 mt-6">
                    <h1 className="text-lg font-neue-machina-plain-ultrabold mb-4 text-center">
                        Lista de Alunos
                    </h1>
                    <ul className="flex flex-col space-y-3">
                        {students.map((student) => (
                            <li
                                key={student._id}
                                className="flex justify-between items-center p-3 rounded-md shadow hover:bg-customPink hover:text-white bg-gray-200 cursor-pointer"
                            >
                                <Link
                                    to={`/home/workspaces/${workspaceId}/students/${student._id}/reports`}
                                    className="text-lg text-sm hover:text-white"
                                >
                                    {student.name}
                                </Link>
                                <div className="flex space-x-2">
                                    <UpdateStudent
                                        student={student}
                                        onUpdateSuccess={(updatedStudent) => {
                                            // Atualiza a lista no componente pai
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
            </div>
        </>
    );
};

export default Students;
