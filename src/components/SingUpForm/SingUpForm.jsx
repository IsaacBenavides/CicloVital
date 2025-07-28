import "./SingUpForm.css";
import {
  IonItem,
  IonTitle,
  IonLabel,
  IonInput,
  IonButton,
  IonRouterLink,
  IonAlert,
} from "@ionic/react";
import { createUser } from "../../services/authService";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const SingUpForm = () => {

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
    if (data.password !== data.confirmPassword) {
      handleAlert(true, "Las contraseñas no coinciden.", "Advertencia");
      return;
    }

    delete data.confirmPassword;

    try {
      const createdUser = await createUser(data);

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
    <div className="sing-up-form-container">
      <form className="sing-up-form" onSubmit={handleSubmit(onSubmit)}>
        <IonTitle className="sing-up-form-title">Registro de Usuario</IonTitle>

        {/* Nombre */}
        <Controller
          name="nombre"
          control={control}
          rules={{ required: "El nombre es obligatorio", nimLength: 1, maxLength: 30 }}
          render={({ field }) => (
            <IonItem className="sing-up-form-item">
              <IonLabel position="floating" className="sing-up-form-label">
                Nombre:
              </IonLabel>
              <IonInput 
                type="text" 
                placeholder="CicloVital"
                minlength={1}
                maxlength={30}   
                {...field} 
              />
            </IonItem>
          )}
        />
        {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}

        {/* Edad */}
        <Controller
          name="edad"
          control={control}
          rules={{
            required: "La edad es obligatoria",
            min: 0,
            max: 120,
            valueAsNumber: true,
          }}
          render={({ field }) => (
            <IonItem className="sing-up-form-item">
              <IonLabel position="floating" className="sing-up-form-label">
                Edad:
              </IonLabel>
              <IonInput 
                type="number" 
                placeholder="00" 
                min="0"
                max="120"
                {...field} 
              />
            </IonItem>
          )}
        />
        {errors.edad && <p className="error-message">{errors.edad.message}</p>}

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
            <IonItem className="sing-up-form-item">
              <IonLabel position="floating" className="sing-up-form-label">
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
            <IonItem className="sing-up-form-item">
              <IonLabel position="floating" className="sing-up-form-label">
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

        {/* Confirmar contraseña */}
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Debe confirmar la contraseña",
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
            maxLength: { value: 12, message: "Máximo 12 caracteres" },
          }}
          render={({ field }) => (
            <IonItem className="sing-up-form-item">
              <IonLabel position="floating" className="sing-up-form-label">
                Confirmar Contraseña:
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
        {errors.confirmPassword && (
          <p className="error-message">{errors.confirmPassword.message}</p>
        )}

        <IonButton
          color="primary"
          expand="block"
          type="submit"
          className="sing-up-form-button"
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

        <IonLabel className="sing-up-form-label">
          ¿Ya tienes una cuenta?{" "}
          <IonRouterLink routerLink="/login" className="sing-up-form-link">
            Inicia sesión
          </IonRouterLink>
        </IonLabel>
      </form>
    </div>
  );
};

export default SingUpForm;
