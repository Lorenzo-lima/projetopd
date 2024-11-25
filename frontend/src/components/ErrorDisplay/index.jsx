import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function ErrorDisplay({ errorMessage, additionalMessage }) {
    const navigate = useNavigate();

    if (!errorMessage || !additionalMessage) return null;

    const handleCloseError = () => {
        navigate("/home");
    };

    return (
        <AnimatePresence>
            <motion.div
                key="error-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 flex items-center justify-center z-50 bg-gray-200/70 backdrop-blur-sm font-neue-machina-plain-regular text-black"
                style={{ overflow: "hidden" }}
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 text-center"
                >
                    <h2 className="text-2xl font-bold mb-4 font-neue-machina-plain-ultrabold">
                        {errorMessage}
                    </h2>
                    <p className="mb-6 text-lg">{additionalMessage}</p>
                    <button
                        className="bg-gray-100 font-medium py-2 px-6 rounded-md hover:bg-customPink border border-gray-400 hover:text-white hover:border-white"
                        onClick={handleCloseError}
                    >
                        Fechar
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ErrorDisplay;
