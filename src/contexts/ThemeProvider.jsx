// ThemeProvider.jsx
import React, { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

const safeGet = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => safeGet("theme", "theme-dark"));

  // Aplica el tema al <body>
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Persiste el tema
  useEffect(() => {
    try { localStorage.setItem("theme", JSON.stringify(theme)); } catch {// No hacer nada
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
