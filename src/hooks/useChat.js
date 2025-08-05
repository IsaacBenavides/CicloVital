import { useCallback } from "react";
import { getChatsById, creatChat, deletechat } from "../services/chatService";

export const useChat = () => {

  const chatsList = useCallback(async (user) => {
    const chats = await getChatsById(user.id);

    if (chats.ok) {
      return chats.data;
    } else {
      return chats.messageError;
    }
  }, []);

  const newChat = useCallback(async (chat) => {
    const newChatResult = await creatChat(chat);
    if (newChatResult.ok) {
      return newChatResult.data;
    } else {
      return newChatResult.messageError;
    }
  }, []);

  const deleteChat = useCallback(async (id) => {
    const chatDeleted = await deletechat(id);
    if (chatDeleted.ok) {
      return 'Chat eliminado';
    } else {
      return chatDeleted.messageError;
    }
  }, []);

  return {
    chatsList,
    newChat,
    deleteChat
  };
};
