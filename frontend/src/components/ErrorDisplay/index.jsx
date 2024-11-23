import React from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorDisplay({ errorMessage }) {
    const navigate = useNavigate();

    if (!errorMessage) return null;

    const handleCloseError = () => {
        navigate('/home');
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-60 bg-gray-500/70 backdrop-blur-sm font-neue-machina-plain-regular">
                <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-center">
                    <h2 className="text-2xl font-bold mb-4 font-neue-machina-plain-ultrabold">{errorMessage}</h2>
                    <p className="mb-6 text-lg">
                        Você não tem permissão para acessar esta workspace!
                    </p>
                    <button
                        className="bg-gray-100 font-medium py-2 px-6 rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        onClick={handleCloseError}
                    >
                        Fechar
                    </button>
                </div>
            </div>
            <style jsx>{`
                .backdrop-blur-sm {
                    backdrop-filter: blur(5px);
                }
            `}</style>
        </>
    );
}

export default ErrorDisplay;
