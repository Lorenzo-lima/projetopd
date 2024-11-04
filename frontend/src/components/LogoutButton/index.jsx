import {useNavigate} from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return (
        <>
            <button onClick={handleLogout}>
                Sair
            </button>
        </>
    )
}

export default LogoutButton