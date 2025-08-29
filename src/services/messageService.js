import axios from 'axios';

const API_URL_LOCAL = 'http://localhost:8080/api/mensajes';

const API_URL = `${import.meta.env.VITE_URL_API}/api/mensajes`;

export const getMessagesByChatID = async (chatId) => {
    try {
        const res = await axios.get(`${API_URL}/porChat/${chatId}`);
        return { ok: true, data: res.data };
    } catch (err) {
        return { ok: false, messageError: err.message };
    }
};

export const sendMessageToIA = async (chatId, mensaje, userId) => {
    try {
        const res = await axios.post(`${API_URL}/ia`, {
            chatId: chatId,
            mensaje: mensaje,
            userId: userId
        });
        return { ok: true, data: res.data };
    } catch (err) {
        console.log("Error en sendMessageToIA:", err);
        return { ok: false, messageError: err.message };
    }
};
