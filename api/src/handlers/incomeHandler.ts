import { Request, Response } from "express";
import {
  getAllIncome,
  registerUserIncome,
  getUserIncome,
  searchIncomeByUser,
} from "../controllers/incomeControllers";

import { IIncome, IPartner } from "../utils/types";

export const getIncomeHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let result = await getAllIncome();
    res.status(200).json(result);
  } catch (error) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};

export const postIncome = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const income = req.body as IIncome;
    const createIncome = await registerUserIncome(income);
    res.status(200).json(createIncome);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};
