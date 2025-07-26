import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const Login = () => {
  return (
    <IonPage className='app-wrapper'>
        <IonContent className='main-content'>
            <Header/>

            <Footer />
        </IonContent>
    </IonPage>
  )
}

export default Login