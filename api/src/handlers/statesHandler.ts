import { IStates } from "../utils/types";
import States from "../models/state";
import { Request, Response } from "express";
import {createdStates} from "../controllers/statesControllers"

export const postState = async (req: Request, res: Response): Promise<void> => {
  try {
    const states = req.body as IStates;
    const createStates = await createdStates(states);
    res.status(200).json(createStates);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllStates = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await States.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error });
        console.log(error);
        
    }
};

