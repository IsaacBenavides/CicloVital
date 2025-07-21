import { IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/react'
import { home, logInOutline, person } from 'ionicons/icons'
import { useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();

  return (
    <IonHeader >
        <IonToolbar>
            <IonTitle style={{ marginLeft: '1rem', textAlign: 'start' }} slot="start">CicloVital</IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={() => history.push('/home')} >
                <IonIcon  icon={home}/>
                Home
              </IonButton>

              <IonButton onClick={() => history.push('/settings')} >
                <IonIcon  icon={person}/>
                Settings
              </IonButton>

              <IonButton onClick={() => history.push('/chat')} >
                <IonIcon icon={logInOutline} />
                Login
              </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>

  )
}

export default Header