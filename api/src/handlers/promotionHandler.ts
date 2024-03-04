import { Request, Response } from "express";
import {
  getAllPromotion,
  updatePromotion,
  deletePayment,
  registerPromotionControllers,
} from "../controllers/promotionControllers";
import { IPromotion } from "../utils/types";
import Promotion from "../models/promotion";

export const postPromotion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const promotion = req.body as IPromotion;
    const createPromotion = await registerPromotionControllers(promotion, req);
    res.status(200).json(createPromotion);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

export const getPromotionHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAllPromotion();
    res.status(200).json(result);
  } catch (error) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};

export const updatePromotionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updata = await updatePromotion({
      id,
      req,
      updatedData: dataToUpdate,
    });
    res.status(200).json(updata);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deleteParterHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    let result: any = id
      ? await deletePayment(id, req)
      : await Promotion.deleteMany();
    if (!result) {
      console.log(`No income found`);
      res.status(404).json({ error: `No promotion found` });
    }
    res.status(200).json({ message: "promotion successfully removed" });
  } catch (error) {
    res.status(500).json({ error: `Error deleting promotion ${id}` });
  }
};
