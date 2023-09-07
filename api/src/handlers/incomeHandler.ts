import { Request, Response } from "express";
import { getAllIncome, createdIncome } from "../controllers/incomeControllers";
import Income from "../models/income";
import Partner from "../models/partner";
import States from "../models/states";
import Users from "../models/users";

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
    const { partnerId, stateId, creatorId } = income;
    // busca el id del socio
    const partner = await Partner.findById(partnerId).exec();
    const partnerIdFound = partner ? partner._id : null;
    income.partnerId = partnerIdFound;
    // busca el id del estado
    const state = await States.findById(stateId).exec();
    const stateIdFound = state ? state._id : null;
    income.stateId = stateIdFound;
    // busca el id del creador o usuario
    const creator = await Users.findById(creatorId).exec();
    const creatorIdFound = creator ? creator._id : null;
    income.creatorId = creatorIdFound;

    const createIncome = await createdIncome(income);
    res.status(200).json(createIncome);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};