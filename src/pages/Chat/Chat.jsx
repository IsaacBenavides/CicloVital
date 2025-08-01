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
import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import ChatsList from "../../components/ChatsList/ChatsList";
import { person, settings } from 'ionicons/icons'
import './Chat.css'
import ChatContext from "../../contexts/ChatContext";
import MessageList from "../../components/MessageList/MessageList";


const Chat = () => {

  const {user} = useContext(UserContext);

  const {currentChat, setCurrentChat} = useContext(ChatContext);

  return (
    <IonApp>
      <IonSplitPane contentId="main-content">
        {/* Menú lateral */}
        <IonMenu contentId="main-content" type="overlay">
          <IonHeader>
            <IonToolbar color="dark">
              <IonTitle>Menú</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonLabel>Registro Diario</IonLabel>
            <IonItem>
              <IonButton expand="block" color="success">
                Ingresa tu registro
              </IonButton>
            </IonItem>
            <hr/>
            <IonLabel>Chat Nuevo</IonLabel>
            <IonItem>
              <IonButton expand="block" color="success" onClick={setCurrentChat(null)}>
                Nuevo chat
              </IonButton>
            </IonItem>
            <hr/>
            <IonLabel>Chats</IonLabel>
            <ChatsList user={user}/>
          </IonContent>
          <IonButtons>
            <IonButton>
              <IonIcon icon={settings}/>
            </IonButton>
            <IonButton>
              <IonIcon icon={person}/>
            </IonButton>
          </IonButtons>
          
        </IonMenu>

        {/* Contenido principal */}
        <IonPage id='main-content' className="page-chat-main-content">
          <IonHeader>
            <IonToolbar color="dark">
              <IonButtons slot="start">
                <IonMenuButton />
              </IonButtons>
              <IonTitle slot="end">CicloVital</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className="page-chat-ioncontent ion-padding" fullscreen>
            {currentChat === null && <IonTitle color='primary' className="page-chat-ioncontent-title ion-padding"> hola {user.nombre}</IonTitle>}
            <div className="page-chat-messages-container">
              {currentChat !== null && <MessageList/>}
            </div>            
          </IonContent>
          <div className="page-chat-input-container">
              <IonTextarea
                color='secundary'
                
                placeholder="Pregunta lo que quieras"
              />
              <IonButton color="primary">Enviar</IonButton>
          </div>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  );
};

export default Chat;
