import "./Settings.css"; 
import { useContext } from "react";
import {IonPage, IonContent, IonButton,IonButtons, IonTitle, IonLabel } from "@ionic/react";
import Header from "../../components/Header/Header";
import ThemeContext from "../../contexts/ThemeContext";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <IonPage>
      <Header />
      
      <IonContent className="settings-content">
        <br />
        <IonLabel fill='outline'>Ajustes de Tema</IonLabel>
        <IonButtons>
          <IonButton
            color={theme === "theme-dark" ? "primary" : "medium"}
            onClick={() => setTheme("theme-dark")}
            disabled={theme === "theme-dark"}
            className="settings-btn"
          >
            Oscuro
          </IonButton>
          <IonButton
            color={theme === "theme-light" ? "primary" : "medium"}
            onClick={() => setTheme("theme-light")}
            disabled={theme === "theme-light"}
            className="settings-btn"
          >
            Claro
          </IonButton>
          <IonButton
            color={theme === "theme-ocean" ? "primary" : "medium"}
            onClick={() => setTheme("theme-ocean")}
            disabled={theme === "theme-ocean"}
            className="settings-btn"
          >
            Oceánico
          </IonButton>
          <IonButton
            color={theme === "theme-sunset" ? "primary" : "medium"}
            onClick={() => setTheme("theme-sunset")}
            disabled={theme === "theme-sunset"}
            className="settings-btn"
          >
            Sunset
          </IonButton>
          <IonButton
            color={theme === "theme-berry" ? "primary" : "medium"}
            onClick={() => setTheme("theme-berry")}
            disabled={theme === "theme-berry"}
            className="settings-btn"
          >
            Berry
          </IonButton>
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default Settings;