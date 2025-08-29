import axios from "axios";

const API_URL_LOCAL = 'http://localhost:8080/api/registros';

const API_URL = `${import.meta.env.VITE_URL_API}api/registros`;

const errorService = 'Error al conectar con el servidor.';

export const getDailyRecordsByUserID = async (userId) =>{
    try{
        const response = await axios.get(API_URL + `/usuario/${userId}`);
        return{ok: true, data: response.data}
    }catch(error){
        console.log("Error en getChatsById:", error);
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}

export const createDailyRecord = async (recordData) =>{
    try{
        const response = await axios.post(API_URL, recordData);
        return{ok: true, data: response.data}
    }catch(error){
        console.log("Error en createDailyRecord:", error);
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}