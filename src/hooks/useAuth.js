import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {createUser, loginUser} from '../services/authService'
import { useCallback, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

export const useAuth = () =>{

    //Manejo de rutas
    const history = useHistory();

    //Contexto de usuario
    const {setUser} = useContext(UserContext);

    //Manejo de datos el alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertHeader, setAlertHeader] = useState("");


    //Manejo del alert
    const handleAlert = (show, message, header) => {
        setShowAlert(show);
        setAlertMessage(message);
        setAlertHeader(header);
    };

    //Registro de usuario
    const registerUser = useCallback( async(data, resetFormCallback) =>{
        if (data.password !== data.confirmPassword) {
            handleAlert(true, "Las contraseñas no coinciden.", "Advertencia");
            return;
        }
    
        delete data.confirmPassword;
    
        try {
            const createdUser = await createUser(data);
        
            if (createdUser.ok) {
                //Ajusta los datos para el logueo
                const loginUserData = {correo: data.correo, password : data.password}
        
                //Loguea al usuario
                const registeduserData = await loginUser(loginUserData);
        
                if(registeduserData.ok){
                setUser(registeduserData.data);
                handleAlert(true, `Bienvenido ${registeduserData.data.nombre}`, "Usuario creado");
                resetFormCallback?.();
                history.push("/chat");
                }else{
                handleAlert(true, registeduserData.messageError, "Advertencia");
                }
                
            } else {
                handleAlert(true, createdUser.messageError, "Advertencia");
            }
        } catch (error) {
        console.error(`Mensaje de error: ${error}`);
        }
        history.push("/chat");
    }, [history, setUser]);//Fin del metodo resgisterUser

    //Inicio de sesión
    const login = useCallback( async (logindata, resetFormCallback) => {
        try {
            const registedUserData = await loginUser(logindata);

            if (registedUserData.ok) {
                setUser(registedUserData.data);
            
                handleAlert(true, `Bienvenido ${registedUserData.data.nombre}`, "Sesión iniciada");
                resetFormCallback?.();
                history.push("/chat");
            } else {
                handleAlert(true, registedUserData.messageError, "Advertencia");
            }
        } catch (error) {
            console.error(`Mensaje de error: ${error}`);
        }
    }, [history, setUser]);//Fin del metodo login

    //Cerrar seción
    const logout = () =>{
        setUser(null);
        history.push('/login');
    }
    
    //Retorno del hook
    return {
        registerUser,
        login,
        logout,
        showAlert,
        alertMessage,
        alertHeader,
        handleAlert
    }

}//Fin del hook useAuth