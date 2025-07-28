import axios from "axios";

const API_URL = "http://localhost:8080/api/usuarios";

const errorService = 'Error al conectar con el servidor.';

export const createUser = async (userData) => {
    try{
        const response = await axios.post(API_URL, userData);
        return { ok: true, data: response.data };
    }catch(error){
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}

export const loginUser = async ( userData ) => {
    try{
        const response = await axios.post(API_URL + '/login', userData);
        return {ok: true, data: response.data}
    }catch(error){
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}

export const getUserById = async ( userId ) => {
    try{
        const response = await axios.get(API_URL + userId);
        return {ok: true, userData: response.data}
    }catch(error){
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}




