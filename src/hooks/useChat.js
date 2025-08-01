import { getChatsById, creatChat, deletechat } from "../services/chatService"

export const useChat = () => {

    const chatsList = async (user) => {
        const chats = await getChatsById(user.id);
        if(chats.ok){
            
            return chats.data;
        }else{
            return chats.messageError;
        }
    }

    const newChat = async (chat) =>{
        const newChat = await creatChat(chat);

        if(newChat.ok){
            return newChat.data;
        }else{
            return newChat.messageError;
        }
    }

    const deleteChat = async (id) =>{
        const chatDeleted = await deletechat(id);

        if(chatDeleted.ok){
            return 'Chat eliminado';
        }else{
            return chatDeleted.messageError;
        }
    }

    return {
        chatsList,
        newChat,
        deleteChat
    }
}