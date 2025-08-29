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
  IonAlert,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";
import ChatsList from "../../components/ChatsList/ChatsList";
import { settings } from 'ionicons/icons';
import './Chat.css';
import ChatContext from "../../contexts/ChatContext";
import MessageList from "../../components/MessageList/MessageList";
import Calendar from "../../components/Calendar/Calendar";
import MessageInput from "../../components/MessageInput/MessageInput";
import { useMessage } from "../../hooks/useMessage";
import ModalDailyRecord from "../../components/ModalDailyRecord/ModalDailyRecord";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Chat = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { currentChat, setCurrentChat } = useContext(ChatContext);
  const { sendMessage } = useMessage();
  const { handleAlert, showAlert, alertHeader, alertMessage } = useAuth();


  const [showCalendar, setShowCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const inputRef = useRef(null);

  const handleSend = async (chatIdParam) => {
    const mensaje = inputRef.current?.value;
    const chatIdToUse = chatIdParam ?? currentChat;

    if (!mensaje || !mensaje.trim() || chatIdToUse === null) return;

    try {
      setIsResponding(true);
      await sendMessage(chatIdToUse, mensaje.trim(), user.id);
      inputRef.current.value = '';
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    } finally {
      setIsResponding(false);
    }
  };


  return (
    <IonApp >
      {/* Calendario */}
      {showCalendar && (
        <Calendar user={user} onClose={() => setShowCalendar(false)} />
      )}

      {showModal && (
        <ModalDailyRecord
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          user={user}
          handleAlert={handleAlert}
        />
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
              <IonButton expand="block" color="primary" onClick={() => setShowModal(true)}>
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
            <IonButton onClick={() => history.push("/settings")}>
              <IonIcon icon={settings} />
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
            <MessageInput
              inputRef={inputRef}
              handleSend={handleSend}
              isResponding={isResponding}
            />
          </IonContent>
        </IonPage>
      </IonSplitPane>
      
      <IonAlert
        color="primary"
        isOpen={showAlert}
        onDidDismiss={() => handleAlert(false, "", "")}
        header={alertHeader}
        message={alertMessage}
        buttons={["Ok"]}
      />
    </IonApp>
  );
};

export default Chat;