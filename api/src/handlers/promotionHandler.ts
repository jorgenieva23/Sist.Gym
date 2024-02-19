import { Request, Response } from "express";
import {
  getAllPromotion,
  registerPromotionControllers,
} from "../controllers/promotionControllers";
import { IPromotion } from "../utils/types";

export const postPromotion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const promotion = req.body as IPromotion;
    const createPromotion = await registerPromotionControllers(promotion);
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
