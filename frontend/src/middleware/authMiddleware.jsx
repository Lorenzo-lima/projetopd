import { Navigate } from 'react-router-dom'

function AuthMiddleware({ children }) {
    function getToken() {
        const getLocalStorageToken = localStorage.getItem('token')
        if(getLocalStorageToken) {
            return getLocalStorageToken
        }

        const getSessionStorageToken = sessionStorage.getItem('token')
        if(getSessionStorageToken) {
            return getSessionStorageToken
        }

        return null
    }

    const token = getToken()
    if (!token) {
        return <Navigate to="/" replace/>
    }
    return children
}

export default AuthMiddleware