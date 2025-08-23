import { IonAlert, IonButton, IonTextarea } from '@ionic/react';
import './MessageInput.css';
import { useChat } from '../../hooks/useChat';
import { useContext } from 'react';
import ChatContext from '../../contexts/ChatContext';
import UserContext from '../../contexts/UserContext';
import { useAuth } from '../../hooks/useAuth';

const MessageInput = ({ inputRef, handleSend, isResponding }) => {
  const { showAlert, alertMessage, alertHeader, handleAlert } = useAuth();
  const { newChat } = useChat();
  const { user } = useContext(UserContext);
  const { currentChat, setCurrentChat } = useContext(ChatContext);

  // Nuevo handle para el botón de enviar
  const handleSendClick = async () => {
    if (!inputRef.current.value.trim()) return;

    if (!currentChat) {
      const title = `${new Date().toLocaleDateString()} - ${inputRef.current.value.trim().slice(0, 50)} `;
      const chat = { 
        titulo: title,
        usuario: {
          id: user.id,
          nombre: user.nombre,
          edad: user.edad,
          correo: user.correo
        }
      }
      try {
        const createdChat = await newChat(chat);
        setCurrentChat(createdChat.id);
        // Llama a handleSend con el id del chat recién creado
        setTimeout(() => {
          handleSend(createdChat.id);
        }, 0);
        return;
      } catch (e) {
        handleAlert(true, 'Error al crear el chat', e.message);
        return;
      }
    }
    handleSend();
  };

  return (
    <div className="page-chat-input-container">
      <div className="input-field-wrapper">
        <IonTextarea
          className="page-chat-input-ionTextArea"
          color="primary"
          placeholder="Pregunta lo que quieras"
          rows={1}
          autoGrow={true}
          ref={inputRef}
        ></IonTextarea>
      </div>
      <IonButton
        className="page-chat-input-ionButton"
        color="primary"
        onClick={handleSendClick}
        disabled={isResponding}
      >
        {isResponding ? "..." : "Enviar"}
      </IonButton>
      <IonAlert
        color="primary"
        isOpen={showAlert}
        onDidDismiss={() => handleAlert(false, '', '')}
        header={alertHeader}
        message={alertMessage}
        buttons={["Ok"]}
      />
    </div>
  );
};

export default MessageInput;