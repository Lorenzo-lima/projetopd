import React, { useEffect, useState } from 'react';

function ErrorDisplay({ errorMessage }) {
    const [isVisible, setIsVisible] = useState(false);

    // Verifica mudanças no errorMessage para exibir o modal
    useEffect(() => {
        if (errorMessage) {
            setIsVisible(true);
        }
    }, [errorMessage]);

    if (!isVisible || !errorMessage) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                <div className="relative bg-red-600 text-white p-6 rounded-lg shadow-2xl max-w-md w-full mx-4 text-center animate-fadeIn">
                    <button
                        className="absolute top-2 right-2 text-white bg-red-800 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 focus:outline-none"
                        onClick={() => setIsVisible(false)}
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold mb-2">Acesso Negado</h2>
                    <p>{errorMessage}</p>
                    <button
                        className="mt-4 bg-white text-red-600 font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
}

export default ErrorDisplay;
