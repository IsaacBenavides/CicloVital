import { useState } from 'react';
import ChatContext from './ChatContext';

const ChatProvider = ({ children }) => {

    const [currentChat, setCurrentChat] = useState(null);

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat }}> 
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider;