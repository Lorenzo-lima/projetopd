import { Routes, Route } from "react-router-dom";
import Workspaces from "./Workspaces/index.jsx";
import Students from "./Students/index.jsx";

function Home() {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Main Content */}
            <Workspaces />
            <div
                className="flex-1 bg-[url('/src/assets/relatorios.png')] bg-cover bg-center bg-no-repeat"
            >
                <Routes>
                    <Route path="home/workspace/:workspaceId/students" element={<Students />} />
                </Routes>
            </div>
        </div>
    );
}

export default Home;
