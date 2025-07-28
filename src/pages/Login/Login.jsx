import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login = () => {
  return (
    <IonPage className='app-wrapper'>
        <IonContent className='main-content'>
            <Header/>
              <LoginForm/>
        </IonContent>
        <Footer />
    </IonPage>
  )
}

export default Login