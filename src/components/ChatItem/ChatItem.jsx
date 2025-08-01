import React, { useContext } from 'react';
import {
  IonItemSliding,
  IonItem,
  IonItemOptions,
  IonItemOption,
  IonLabel
} from '@ionic/react';
import ChatContext from '../../contexts/ChatContext';

const ChatItem = ({ title, chatId, onDelete }) => {

  const {setCurrentChat} = useContext(ChatContext);

  return (
    <IonItemSliding>
      {/* Chat visible */}
      <IonItem onClick={setCurrentChat(chatId)}>
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
