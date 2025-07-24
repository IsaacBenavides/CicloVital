import React from 'react'
import "./SingUpForm.css";
import { IonItem, IonTitle, IonLabel, IonInput, IonButton, IonRouterLink } from '@ionic/react';

const SingUpForm = () => {
  return (

    <div className="sing-up-form-container">
        <form className="sing-up-form">
            
            <IonTitle className='sing-up-form-title'>Registro de Usuario</IonTitle>

            <IonItem className='sing-up-form-item'>
                <IonLabel position="floating" className='sing-up-form-label'>Nombre:</IonLabel>
                <IonInput 
                    type="text" 
                    placeholder="CicloVital"
                    maxlength={30}
                    className='sing-up-form-input'
                    required
                >
                </IonInput>
            </IonItem>
            <IonItem className='sing-up-form-item'>
                <IonLabel position="floating" className='sing-up-form-label'>Edad:</IonLabel>
                <IonInput 
                    type="number" 
                    placeholder="00" 
                    min={0}
                    max={120}
                    className='sing-up-form-input'
                    required
                >
                </IonInput>
            </IonItem>
            <IonItem className='sing-up-form-item'>
                <IonLabel position="floating" className='sing-up-form-label'>Correo Electrónico:</IonLabel>
                <IonInput 
                    type="email" 
                    placeholder="ejemplo@gmail.com"
                    maxlength={150} 
                    className='sing-up-form-input'
                    required>
                </IonInput>
            </IonItem>
            <IonItem className='sing-up-form-item'>
                <IonLabel position="floating" className='sing-up-form-label'>Contraseña:</IonLabel>
                <IonInput 
                    type="password" 
                    placeholder="12345678"
                    minlength={8}
                    maxlength={12} 
                    className='sing-up-form-input'
                    required
                    >
                </IonInput>
            </IonItem>
            <IonItem className='sing-up-form-item'>
                <IonLabel position="floating" className='sing-up-form-label'>Confirmar Contraseña:</IonLabel>
                <IonInput 
                    type="password" 
                    placeholder="12345678"
                    minlength={8}
                    maxlength={12}
                    className='sing-up-form-input'
                    required
                >
                </IonInput>
            </IonItem>
            <IonButton 
                color="primary"
                expand="block" 
                type="submit"
                className='sing-up-form-button'
            >
                Registrarse
            </IonButton>
            <IonLabel className='sing-up-form-label'>
                ¿Ya tienes una cuenta? <IonRouterLink routerLink="/login" className='sing-up-form-link'>Inicia sesión</IonRouterLink>
            </IonLabel>
        </form> 
    </div>
    
  )
}

export default SingUpForm