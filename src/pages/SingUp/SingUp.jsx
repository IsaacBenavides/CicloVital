import { IonPage, IonContent } from '@ionic/react';
import Header from '../../components/Header/Header';
import SingUpForm from '../../components/SingUpForm/SingUpForm';
import Footer from '../../components/Footer/Footer';
import './SingUp.css'

const SingUp = () => {
  return (
    <IonPage className='app-wrapper' >
        <Header />
        <IonContent className='main-content'>
            <SingUpForm />
        </IonContent>
    </IonPage>
  )
}

export default SingUp;