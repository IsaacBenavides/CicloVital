// ChatProvider.jsx
import { useState, useEffect } from "react";
import ChatContext from "./ChatContext";

const safeGet = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};

const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState(() => safeGet("chat", null));

  // Persiste el chat seleccionado
  useEffect(() => {
    try {
      if (currentChat === null) localStorage.removeItem("chat");
      else localStorage.setItem("chat", JSON.stringify(currentChat));
    } catch {
      // No hacer nada
    }
  }, [currentChat]);

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
