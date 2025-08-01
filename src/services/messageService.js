import axios from "axios";

const API_URL = 'http://localhost:8080/api/mensajes';

const errorService = 'Error al conectar con el servidor.';

export const getMessagesByChatID = async (chatId) => {
    try{
        const response = await axios.get(API_URL + `/porChat/${chatId}`);
        return{ok: true, data: response.data}
    }catch(error){
        console.log("Error en getChatsById:", error);
        const messageError = error.response?.data || errorService;
        return { ok: false, messageError}
    }
}