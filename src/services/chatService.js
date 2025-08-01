import axios from "axios";

const API_URL = 'http://localhost:8080/api/chats';

const errorService = 'Error al conectar con el servidor.';

export const getChatsById = async (userId) => {
    try{
        const response = await axios.get(API_URL + `/usuario/${userId}/resumen`);
        return{ok: true, data: response.data}
    }catch(error){
        console.log("Error en getChatsById:", error);
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}

export const creatChat = async (chat) => {
    try{
        const response = await axios.post(API_URL, chat);
        return{ok: true, data: response.data}
    }catch(error){
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}

export const deletechat = async (id) => {
    try{
        const response = await axios.delete(API_URL + `/eliminar/${id}`);
        return{ok: true, data: response.data}
    }catch(error){
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}