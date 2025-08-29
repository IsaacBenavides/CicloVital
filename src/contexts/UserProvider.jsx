// UserProvider.jsx
import { useState, useEffect } from "react";
import UserContext from "./UserContext";

const safeGet = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => safeGet("user", null));

  // Persiste user cuando cambie (login/logout)
  useEffect(() => {
    try {
      if (user === null) localStorage.removeItem("user");
      else localStorage.setItem("user", JSON.stringify(user));
    } catch {
      // No hacer nada
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
