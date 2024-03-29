import { IStates } from "../utils/types";
import States from "../models/state";

export const getAllStates = async () => {
  try {
    const states = await States.find();
    return states;
  } catch (error: any) {
    throw new Error("Error when searching for income in the database");
  }
};

export const createdStates = async (states: IStates) => {
  try {
    const { name } = states;
    if (await States.findOne({ name })) {
      console.log("There is already a state with the same name");
      throw new Error("There is already a state with the same name");
    }
    return await States.create({
      name,
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(`error updating partner ${error.message}`);
  }
};
