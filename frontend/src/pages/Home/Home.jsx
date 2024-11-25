import { Routes, Route } from "react-router-dom";
import Workspaces from "./Workspaces/index.jsx";
import Students from "./Students/index.jsx";
import Reports from "./Reports/index.jsx";

function Home() {
    return (
        <div className="flex bg-gray-50 min-h-screen relative">
            {/* Sidebar com Workspaces */}
            <Workspaces />

            {/* Conteúdo Dinâmico */}
            <div className="flex-1 bg-[url('/src/assets/relatorios.png')] bg-cover bg-center bg-no-repeat relative backdrop-blur-sm">
                <Routes>
                    {/* Rota para listar estudantes */}
                    <Route
                        path="/workspace/:workspaceId/students"
                        element={
                            <div className="flex">
                                <Students />
                            </div>
                        }
                    />

                    {/* Rota para relatórios do estudante */}
                    <Route
                        path="/workspace/:workspaceId/students/:studentId/reports"
                        element={
                            <div className="flex">
                                {/* Componente de Students reutilizado sem re-renderização */}
                                <Students isStatic />

                                {/* Relatórios */}
                                <div className="flex w-[80%]">
                                    <Reports />
                                </div>
                            </div>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default Home;
