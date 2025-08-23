import { useCallback } from "react";
import {
  getDailyRecordsByUserID,
  createDailyRecord as createDailyRecordService, // 👈 alias
} from "../services/dailyRecordService";

export const useDailyRecord = () => {
  const getDailyRecord = useCallback(async (userId) => {
    const dailyRecords = await getDailyRecordsByUserID(userId);
    return dailyRecords.ok ? dailyRecords.data : dailyRecords.messageError;
  }, []);

  const createDailyRecord = useCallback(async (recordData) => {
    const createdDailyRecord = await createDailyRecordService(recordData);
    return createdDailyRecord; 
  }, []);

  return { getDailyRecord, createDailyRecord };
};
