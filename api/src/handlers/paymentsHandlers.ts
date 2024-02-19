import { Request, Response } from "express";
import {
  registerPaymentController,
  getAllPayment,
} from "../controllers/paymentsControllers";
import { IPayment } from "../utils/types";

export const postPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payment = req.body as IPayment;
    const createPayment = await registerPaymentController(payment);
    res.status(200).json(createPayment);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

export const getPaymentHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let result = await getAllPayment();
    res.status(200).json(result);
  } catch (error) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};
