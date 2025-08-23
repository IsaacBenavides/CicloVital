import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../../components/Header/Header'
import LoginForm from '../../components/LoginForm/LoginForm'

const Login = () => {
  return (
    <IonPage className='app-wrapper'>
        <IonContent className='main-content'>
            <Header/>
              <LoginForm/>
        </IonContent>
    </IonPage>
  )
}

export default Login