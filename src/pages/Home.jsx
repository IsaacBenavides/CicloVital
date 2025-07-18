import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src='' />
        <h1>Bienvenido a CicloVital</h1>
        <IonButton expand="block" onClick={() => history.push('/chat')}>
          Ir al Chat
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Home;
