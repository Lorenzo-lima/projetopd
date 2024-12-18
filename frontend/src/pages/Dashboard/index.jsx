import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    const config = {
        headers: {
            "Api-Key": import.meta.env.VITE_API_KEY,
        },
    };

    // Função para buscar os alunos da API
    const fetchEnrolledStudents = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/enrolled`,
                config
            );

            console.log("Resposta completa da API:", response.data);

            if (response.data) {
                setStudents(response.data);
            } else {
                setError("Nenhum dado encontrado.");
            }
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setError("Não foi possível buscar os dados dos alunos.");
        }
    };

    // UseEffect para carregar os dados na montagem do componente
    useEffect(() => {
        fetchEnrolledStudents();
    }, []);

    // Contadores de status
    const activeCount = students.filter(student => student.status === "Ativo").length;
    const attentionCount = students.filter(student => student.status === "Atencao").length;
    const suspendedCount = students.filter(student => student.status === "Suspenso").length;
    const inactiveCount = students.filter(student => student.status === "Inativo").length;
    const recoveryCount = students.filter(student => student.status === "EmRecuperacao").length;

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Dados Gerais
                </h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="grid grid-cols-5 gap-4">

                    {/* Alunos Ativos */}

                    <div className="bg-green-100 border border-green-300 rounded-lg shadow p-4 flex items-center">
                        <div className="text-green-500 text-4xl mr-4">✔️</div>
                        <div>
                            <p className="text-gray-700 font-semibold">Alunos Ativos</p>
                            <p className="text-gray-800 text-xl font-bold">{activeCount + recoveryCount}</p>
                        </div>
                    </div>

                    {/* Alunos em Atenção */}

                    <div className="bg-orange-100 border border-orange-300 rounded-lg shadow p-4 flex items-center">
                        <div className="text-orange-500 text-4xl mr-4">⚠️</div>
                        <div>
                            <p className="text-gray-700 font-semibold">Alunos em Atenção</p>
                            <p className="text-gray-800 text-xl font-bold">{attentionCount}</p>
                        </div>
                    </div>

                    {/* Alunos em Recuperação */}

                    <div className="bg-blue-100 border border-blue-300 rounded-lg shadow p-4 flex items-center">
                        <div className="text-blue-500 text-4xl mr-4">🔄</div>
                        <div>
                            <p className="text-gray-700 font-semibold">Alunos em Recuperação</p>
                            <p className="text-gray-800 text-xl font-bold">{recoveryCount}</p>
                        </div>
                    </div>

                    {/* Alunos Suspensos */}

                    <div className="bg-pink-100 border border-pink-300 rounded-lg shadow p-4 flex items-center">
                        <div className="text-pink-500 text-4xl mr-4">👥</div>
                        <div>
                            <p className="text-gray-700 font-semibold">Alunos Suspensos</p>
                            <p className="text-gray-800 text-xl font-bold">{suspendedCount}</p>
                        </div>
                    </div>


                    {/* Alunos Inativos */}

                    <div className="bg-gray-100 border border-gray-300 rounded-lg shadow p-4 flex items-center">
                        <div className="text-gray-500 text-4xl mr-4">❌</div>
                        <div>
                            <p className="text-gray-700 font-semibold">Alunos Inativos</p>
                            <p className="text-gray-800 text-xl font-bold">{inactiveCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
