import "./Settings.css"; 
import { useContext } from "react";
import {IonPage, IonContent, IonButton,IonButtons } from "@ionic/react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Header from "../../components/Header";

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <IonPage>
      <Header />
      <IonContent className="settings-content">
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
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default Settings;