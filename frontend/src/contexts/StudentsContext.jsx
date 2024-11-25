import React, { createContext, useState, useContext } from "react";

// Contexto para compartilhar o estado de Students
const StudentsContext = createContext();

export const useStudents = () => {
    return useContext(StudentsContext);
};

export const StudentsProvider = ({ children }) => {
    const [students, setStudents] = useState([]); // Alunos carregados
    const [isLoaded, setIsLoaded] = useState(false); // Controle de carregamento

    return (
        <StudentsContext.Provider value={{ students, setStudents, isLoaded, setIsLoaded }}>
            {children}
        </StudentsContext.Provider>
    );
};
