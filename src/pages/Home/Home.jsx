import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

function Home() {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="home-content ion-padding">
        {/* Puedes poner el logo aquí */}
        <img src="" alt="Logo CicloVital" className="home-logo" />
        <h1 className="home-title">Bienvenido a CicloVital</h1>
        <IonButton
          expand="block"
          color="primary"
          onClick={() => history.push('/chat')}
          className="home-btn"
        >
          Ir al Chat
        </IonButton>
        <IonButton
          expand="block"
          color="secondary"
          onClick={() => history.push('/settings')}
          className="home-btn"
        >
          Ir a Configuración
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Home;
