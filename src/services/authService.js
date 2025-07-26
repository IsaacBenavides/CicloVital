import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios";

export const createUser = async (userData) => {
    try{
        const response = await axios.post(API_URL, userData);
        return { ok: true, data: response.data };
    }catch(error){
        const messageError = error.response?.data || "Error desconocido al crear el usuario, intente de nuevo más tarde.";
        return { ok: false, messageError}
    }
}

export const login = async ( userData ) => {
    try{
        const response = await axios.post(API_URL + '/login', userData);
        return {ok: true, data: response.data}
    }catch(error){
        const messageError = error.response?.data || "Error desconocido al crear el usuario, intente de nuevo más tarde.";
        return { ok: false, messageError}
    }
}




