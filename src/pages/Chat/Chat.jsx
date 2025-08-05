import {
  IonApp,
  IonPage,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonItem,
  IonButton,
  IonLabel,
  IonIcon,
  IonTextarea,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";
import ChatsList from "../../components/ChatsList/ChatsList";
import { person, settings } from 'ionicons/icons';
import './Chat.css';
import ChatContext from "../../contexts/ChatContext";
import MessageList from "../../components/MessageList/MessageList";
import Calendar from "../../components/Calendar/Calendar";
import { useMessage } from "../../hooks/useMessage";

const Chat = () => {
  const { user } = useContext(UserContext);
  const { currentChat, setCurrentChat } = useContext(ChatContext);
  const { sendMessage } = useMessage();

  const [showCalendar, setShowCalendar] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const inputRef = useRef(null);

  const handleSend = async () => {
    const mensaje = inputRef.current?.value;

    if (!mensaje || !mensaje.trim() || currentChat === null) return;

    try {
      setIsResponding(true);
      await sendMessage(currentChat, mensaje.trim());
      inputRef.current.value = '';
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    } finally {
      setIsResponding(false);
    }
  };


  return (
    <IonApp>
      {/* Calendario */}
      {showCalendar && (
        <Calendar user={user} onClose={() => setShowCalendar(false)} />
      )}

      <IonSplitPane contentId="main-content">
        {/* Menú lateral */}
        <IonMenu size="small" contentId="main-content" type="reveal">
          <IonHeader>
            <IonToolbar color="dark">
              <IonTitle>Menú</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <br />
            <IonLabel>Registro Diario</IonLabel>
            <IonItem>
              <IonButton expand="block" color="primary">
                Nuevo Registro
              </IonButton>
              <IonButton
                expand="block"
                color="primary"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                Calendario
              </IonButton>
            </IonItem>
            <br />
            <IonLabel>Chat Nuevo</IonLabel>
            <IonItem>
              <IonButton
                expand="block"
                color="primary"
                onClick={() => setCurrentChat(null)}
              >
                Nuevo chat
              </IonButton>
            </IonItem>
            <br />
            <IonLabel>Chats</IonLabel>
            <ChatsList user={user} />
          </IonContent>
          <IonButtons>
            <IonButton>
              <IonIcon icon={settings} />
            </IonButton>
            <IonButton>
              <IonIcon icon={person} />
            </IonButton>
          </IonButtons>
        </IonMenu>

        {/* Contenido principal */}
        <IonPage id="main-content" className="page-chat-main-content">
          <IonHeader>
            <IonToolbar color="dark">
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle slot="end">CicloVital</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent
            color="secondary"
            className="page-chat-ioncontent"
            fullscreen
          >
            {currentChat === null && (
              <IonTitle color="primary" className="page-chat-ioncontent-title">
                Hola {user.nombre}
              </IonTitle>
            )}

            <div className="page-chat-messages-container">
              <div className="page-chat-messages-container">
                {currentChat !== null && (
                  <>
                    <MessageList />
                    {isResponding && (
                      <div className="page-chat-ia-typing-indicator">
                        <p>La IA está escribiendo...</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

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
                onClick={handleSend}
                disabled={isResponding}
              >
                {isResponding ? "..." : "Enviar"}
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};

export default Chat;
