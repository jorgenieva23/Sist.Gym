import { Request, Response } from "express";
import Income from "../models/income";
import { IIncome, IPartner } from "../utils/types";
import {
  getAllIncome, //trae todos los ingresos registrados de todos los socios
  getIncomeOfTheDay, //los ingresos que hubo en el dia
  registerPartnerIncome, //registra un ingreso
  getPartnerIncome, //trae los ingresos de un socio en un rango de fecha especificos,
  getAllIncomeByPartnerID, //trae todos los ingresos del socio
  deleteIncomeControllers, //borra un ingreso
} from "../controllers/incomeControllers";

export const postIncome = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const income = req.body as IIncome;
    const createIncome = await registerPartnerIncome(income, req);
    res.status(200).json(createIncome);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

export const getAllIncomeHandler = async (
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

export const getIncomeTodayHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let result = await getIncomeOfTheDay();
    res.status(200).json(result);
  } catch (error) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};

export const getPartnerIncomeHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fromDate, toDate, partnerId } = req.body;
    let result = await getPartnerIncome(fromDate, toDate, partnerId);
    res.status(200).json(result);
  } catch (error) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};

export const getAllIncomeByPartnerIDHandler = async (
  req: Request,
  res: Response
) => {
  const { partnerId } = req.params;
  try {
    let result = await getAllIncomeByPartnerID(partnerId);
    if (!result) {
      console.log(`No incomes found`);
      res.status(404).json({ error: `No incomes found` });
    }
    res
      .status(200)
      .json({ message: `income successfully removed  ${partnerId}` });
  } catch (error) {
    res.status(500).json({ error: `Error deleting income ${partnerId}` });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let result = await deleteIncomeControllers(id, req);
    if (!result) {
      console.log(`No income found`);
      return res.status(404).json({ error: `No income found` });
    }
    return res.status(200).json({ message: "income successfully removed" });
  } catch (error) {
    return res.status(500).json({ error: `Error deleting income ${id}` });
  }
};
