import { Request, Response } from "express";
import {
  getAllIncome,
  registerUserIncome,
  getUserIncome,
  searchIncomeByUser,
} from "../controllers/incomeControllers";
import Income from "../models/income";

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

export const deleteIncome = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const income = await Income.findByIdAndDelete(id);
    if (!income) {
      console.log(`No income found with ID: ${id}`);
      return res.status(404).json({ error: `No income found with ID: ${id}` });
    }
    console.log(`income successfully removed: ${id} ${income} `);
    return res
      .status(200)
      .json({ message: "Partner successfully removed", income });
  } catch (error) {
    console.error(`Error deleting income ${id}: ${error}`);
    return res.status(500).json({ error: `Error deleting income ${id}` });
  }
};
