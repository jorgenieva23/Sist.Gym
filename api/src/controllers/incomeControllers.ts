import { IIncome } from "../utils/types";
import Income from "../models/income";

export const getAllIncome = async () => {
    try {
      const income = await Income.find();
      return income;
    } catch (error: any) {
      throw new Error("Error when searching for income in the database");
    }
  };


  export const createdIncome = async (income: IIncome) => {
    const { 
      partnerId,
      dateOfAdmission,
      stateId,
      creatorId
    } = income
    return await Income.create({
      partnerId, 
      dateOfAdmission, 
      stateId,
      creatorId
    })
  }