import { useCallback } from "react"
import {getDailyRecordsByUserID} from '../services/dailyRecordService'
export const useDailyRecord = () =>{

    const getDailyRecord = useCallback(async (userId) =>{
        const dailyRecords = await getDailyRecordsByUserID(userId);

        if(dailyRecords.ok){
            return dailyRecords.data;
        }else{
            return dailyRecords.messageError;
        }
    }, []);

    return{
        getDailyRecord
    }
}