import React, { useContext, useState, useEffect } from 'react';
import ChatItem from '../ChatItem/ChatItem';
import { useChat } from '../../hooks/useChat';
import UserContext from '../../contexts/UserContext';

const ChatsList = () => {
  const { user } = useContext(UserContext);

  const { chatsList, deleteChat } = useChat();

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const result = await chatsList(user);
      if (Array.isArray(result)) {
        setChats(result);
      } else {
        console.error('Error al obtener los chats:', result);
      }
    };

    fetchChats();
  }, [user, chatsList]);

  const handleDeleteChat = async (id) => {
    const result = await deleteChat(id);
    if (result === 'Chat eliminado') {
      setChats(prev => prev.filter(chat => chat.id !== id));
    } else {
      console.error('Error al eliminar:', result);
    }
  };

  return (
    <>
      {chats.length > 0 ? 
        chats.map(chat => (
          <ChatItem
            key={chat.id}
            title={chat.titulo}
            chatId={chat.id}
            onDelete={handleDeleteChat}
          />
        ))
        :
        <p color='primary'>No se encuentran chats registrados</p>
        }
    </>
  );
};

export default ChatsList;
