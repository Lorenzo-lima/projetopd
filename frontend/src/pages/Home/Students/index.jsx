import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../../../backend/services/api.js";
import ErrorDisplay from "../../../components/ErrorDisplay/index.jsx";

const Students = () => {
    const { workspaceId } = useParams();
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/api/students/${workspaceId}`)
            .then((response) => {
                setStudents(response.data);
                setError(null);
            })
            .catch((error) => {
                setError(error.response?.data?.message);
            });
    }, [workspaceId]);


    return (
        <>
            <ErrorDisplay errorMessage={error} />
            <div className="flex flex-col bg-gray-100 w-[15%] min-h-screen shadow-md border-r border-gray-300 font-neue-machina-plain-regular">
                {/* Workspaces */}
                <div className="flex flex-col px-6 mt-6">
                    <h1 className="text-lg font-neue-machina-plain-ultrabold mb-4 text-center">Lista de Alunos</h1>
                    <ul className="flex flex-col space-y-3">
                        {students.map((student) => (
                            <li
                                key={student.id}
                                className="flex justify-between items-center bg-gray-200 p-3 rounded-md shadow hover:bg-gray-300"
                            >
                                <Link
                                    to={`/workspaces/${workspaceId}/students/${student.id}/reports`}
                                    className="text-lg font-medium text-gray-800 hover:text-customPink"
                                >
                                    {student.name}
                                </Link>
                                <button className="text-red-500 hover:text-red-700">x</button>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Botão adicionar */}
                <div className="mt-auto flex justify-center p-4 border-gray-300">
                    <button
                        type="button"
                        className="flex items-center justify-center bg-gray-100 border border-gray-400 rounded-md p-3 hover:bg-gray-200 transition"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </>
    );
};

export default Students;
