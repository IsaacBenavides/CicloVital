import { IonAlert, IonButton, IonInput, IonItem, IonLabel, IonRouterLink, IonTitle } from '@ionic/react'
import { Controller, useForm } from 'react-hook-form'
import './LoginForm.css'
import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {

    //Control del form
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    //Hook de autntificación
    const {
        login, 
        showAlert,
        alertMessage,
        alertHeader,
        handleAlert
    } = useAuth();

    //Manejo del evento del envio de datos
    const onSubmit = (logindata) => {
        login(logindata, reset)
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
          Iniciar Sesión
        </IonButton>

        <IonAlert
          color="primary"
          isOpen={showAlert}
          onDidDismiss={() => handleAlert(false, '', '')}
          header={alertHeader}
          message={alertMessage}
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