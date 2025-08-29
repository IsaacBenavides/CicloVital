import React, { useContext } from 'react';
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonLabel
} from '@ionic/react';
import ChatContext from '../../contexts/ChatContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const ChatItem = ({ title, chatId, onDelete }) => {

  const [, setChat] = useLocalStorage("chat", null);

  const {currentChat, setCurrentChat} = useContext(ChatContext);

  return (
    <IonItemSliding>
      {/* Chat visible */}
      <IonItem 
        color={currentChat === chatId ? 'primary': ''} 
        onClick={() => {
            if (currentChat !== chatId) {
              setCurrentChat(chatId);
              setChat(chatId);
            }
          }
        }>
        <IonLabel>{title}</IonLabel>
      </IonItem>

      {/* Opciones al deslizar */}
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(chatId)}>
          Eliminar
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default ChatItem;
