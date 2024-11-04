import { Routes, Route } from "react-router-dom";
import Workspaces from "./Workspaces/index.jsx";

function Home() {
    return (
        <Routes>
            <Route path="/" element={<Workspaces />} />
        </Routes>
    )
}

export default Home