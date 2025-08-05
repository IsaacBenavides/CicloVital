import axios from 'axios';

const API_URL = 'http://localhost:8080/api/mensajes';

export const getMessagesByChatID = async (chatId) => {
    try {
        const res = await axios.get(`${API_URL}/porChat/${chatId}`);
        return { ok: true, data: res.data };
    } catch (err) {
        return { ok: false, messageError: err.message };
    }
};

export const sendMessageToIA = async (chatId, mensaje) => {
    try {
        const res = await axios.post(`${API_URL}/ia`, {
            chatId: chatId,
            mensaje: mensaje
        });
        return { ok: true, data: res.data };
    } catch (err) {
        return { ok: false, messageError: err.message };
    }
};
