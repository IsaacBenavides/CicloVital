import { IonPage, IonContent } from '@ionic/react';
import Header from '../components/Header';

function Chat() {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <Header />
        <p>Aquí irá el componente de chat en el futuro.</p>
      </IonContent>
    </IonPage>
  );
}

export default Chat;
