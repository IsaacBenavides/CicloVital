import React, { useEffect, useRef, useState, useContext } from 'react';
import { IonContent } from '@ionic/react';
import { useMessage } from '../../hooks/useMessage';
import ChatContext from '../../contexts/ChatContext';
import Message from '../Message/Message'
import './MessageList.css';

const MessageList = () => {
  const { currentChat } = useContext(ChatContext);
  const { getChatMessages } = useMessage();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      if (!currentChat) return;

      const data = await getChatMessages(currentChat);

      if (isMounted) {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Error cargando mensajes:", data);
        }
      }
    };

    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, [currentChat, getChatMessages]);


  return (
    <IonContent color='secondary' className="message-list-container">
      {messages.map((msg) => (
        <Message key={msg.id} mensaje={msg} />
      ))}
      <div ref={messagesEndRef} />
    </IonContent>
  );
};

export default MessageList;
