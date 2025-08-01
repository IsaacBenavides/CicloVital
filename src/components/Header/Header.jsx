import { IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon, IonRouterLink } from '@ionic/react'
import { home, person, settings } from 'ionicons/icons'
import { useHistory } from 'react-router-dom';
import './Header.css';

const Header = () => {

    const history = useHistory();

  return (
    <IonHeader >
        <IonToolbar>
            <IonTitle className='header-title' slot="start">
              <IonRouterLink color='light' routerLink='/home'>CicloVital</IonRouterLink>
            </IonTitle>

            <IonButtons slot="end">
              <IonButton onClick={() => history.push('/home')} >
                <IonIcon  icon={home}/>
                <span className="header-button-text">Inicio</span>
              </IonButton>

              <IonButton onClick={() => history.push('/settings')} >
                <IonIcon  icon={settings}/>
                <span className="header-button-text">Ajustes</span>
              </IonButton>

              <IonButton onClick={() => history.push('/chat')} >
                <IonIcon icon={person} />
                <span className="header-button-text">Perfil</span>
              </IonButton>
            </IonButtons>
        </IonToolbar>
    </IonHeader>

  )
}

export default Header