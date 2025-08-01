import { createContext } from "react";

const ChatContext = createContext({
  currentChat: null,
  setCurrentChat: () => {},
});

export default ChatContext;