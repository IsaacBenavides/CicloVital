import {getMessagesByChatID} from '../services/messageService'
export const useMessage = () =>{

    const getChatMessages = async (chatId) =>{
        const messages = await getMessagesByChatID(chatId);

        if(messages.ok){
            return messages.data;
        }else{
            return messages.messageError;
        }
    }


    return{
        getChatMessages
    }
}