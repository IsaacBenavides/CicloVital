import React, { useState, useEffect } from "react";

// CREA Y EXPORTA EL CONTEXTO
export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("theme-dark");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};