import React, { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext";


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