import { IonPage, IonContent } from '@ionic/react';
import Header from '../../components/Header/Header';
import SingUpForm from '../../components/SingUpForm/SingUpForm';
import Footer from '../../components/Footer/Footer';

const SingUp = () => {
  return (
    <IonPage className='app-wrapper' >
        <Header />
        <IonContent className='main-content'>
            <SingUpForm />
            <Footer />
        </IonContent>
    </IonPage>
  )
}

export default SingUp;