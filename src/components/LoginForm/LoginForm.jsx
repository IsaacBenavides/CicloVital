import { IonAlert, IonButton, IonInput, IonItem, IonLabel, IonRouterLink, IonTitle } from '@ionic/react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { loginUser } from '../../services/authService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './LoginForm.css'

const LoginForm = () => {

    //Manejo de rutas
      const history = useHistory();
    
      //Manejo de datos el alert
      const [showAlert, setShowAlert] = useState(false);
      const [alertmessage, setAlertMessage] = useState("");
      const [alertHeader, setAlertHeader] = useState("");
    
      //Manejo del alert
      const handleAlert = (show, message, header) => {
        setShowAlert(show);
        setAlertMessage(message);
        setAlertHeader(header);
      };
    
      //Control del form
      const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm();
    
      //Manejo del evento del envio de datos
      const onSubmit = async (data) => {
        try {
          const createdUser = await loginUser(data);
    
          if (createdUser.ok) {
            handleAlert(true, `Bienvenido ${data.nombre}`, "Usuario creado");
            reset();
            history.push("/chat");
          } else {
            handleAlert(true, createdUser.messageError, "Advertencia");
          }
        } catch (error) {
          console.error(`Mensaje de error: ${error}`);
        }
      };//Fin del metodo onSubmit

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <IonTitle className="login-form-title">Inicio de sesión</IonTitle>

        {/* Correo */}
        <Controller
          name="correo"
          control={control}
          rules={{
            required: "El correo es obligatorio",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/,
              message: "Formato de email inválido",
            },
            maxLength: 254,
          }}
          render={({ field }) => (
            <IonItem className="login-form-item">
              <IonLabel position="floating" className="login-form-label">
                Correo Electrónico:
              </IonLabel>
              <IonInput 
                type="email" 
                placeholder="ejemplo@gmail.com" {...field} 
                maxLength={254}
              />
            </IonItem>
          )}
        />
        {errors.correo && <p className="error-message">{errors.correo.message}</p>}

        {/* Contraseña */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "La contraseña es obligatoria",
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
            maxLength: { value: 12, message: "Máximo 12 caracteres" },
          }}
          render={({ field }) => (
            <IonItem className="login-form-item">
              <IonLabel position="floating" className="login-form-label">
                Contraseña:
              </IonLabel>
              <IonInput 
                type="password" 
                placeholder="12345678"
                minlength={8}
                maxlength={12}
                {...field} 
              />
            </IonItem>
          )}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <IonButton
          color="primary"
          expand="block"
          type="submit"
          className="login-form-button"
        >
          Registrarse
        </IonButton>

        <IonAlert
          color="primary"
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={alertHeader}
          message={alertmessage}
          buttons={["Ok"]}
        />

        <IonLabel className="login-form-label">
          ¿No tienes una cuenta?{" "}
          <IonRouterLink routerLink="/singup" className="login-form-link">
            Crear cuenta
          </IonRouterLink>
        </IonLabel>
      </form>
    </div>
  )
}

export default LoginForm