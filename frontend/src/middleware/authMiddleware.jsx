import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../../projetopd/backend/services/api.js'

function AuthMiddleware({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await api.get('/api/auth/validate'); // Endpoint para validar o token
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 700)
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center">
                {/* Spinner */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-customPink border-solid"></div>
                {/* Loading Text */}
            </div>
        </div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return children;
}

export default AuthMiddleware;

