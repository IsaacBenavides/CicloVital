import { useCallback } from 'react';
import { getMessagesByChatID, sendMessageToIA } from '../services/messageService';

export const useMessage = () => {
    const getChatMessages = useCallback(async (chatId) => {
        const messages = await getMessagesByChatID(chatId);
        return messages.ok ? messages.data : messages.messageError;
    }, []);

    const sendMessage = useCallback(async (chatId, mensajeUsuario, userId) => {
        const response = await sendMessageToIA(chatId, mensajeUsuario, userId);
        return response.ok ? response.data : response.messageError;
    }, []);

    return {
        getChatMessages,
        sendMessage
    }
};
