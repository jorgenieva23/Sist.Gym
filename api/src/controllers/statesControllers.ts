import { IIncome, IStates } from "../utils/types";
import StateIncome from "../models/states";

export const getAllStates = async () => {
  try {
    const states = await StateIncome.find();
    return states;
  } catch (error: any) {
    throw new Error("Error when searching for income in the database");
  }
};

export const createdStates = async (states: IStates) => {
  const { name } = states;
  return await StateIncome.create({
    name
  });
};
