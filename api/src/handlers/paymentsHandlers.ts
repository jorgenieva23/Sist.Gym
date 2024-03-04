import { Request, Response } from "express";
import {
  registerPaymentController,
  getAllPayment,
  updateUserPayment,
  getPaymentById,
  historyPaymentByPartner,
} from "../controllers/paymentsControllers";
import { IPayment } from "../utils/types";
import Payment from "../models/payment";

export const postPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payment = req.body as IPayment;
    const createPayment = await registerPaymentController(payment, req);
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

export const getPaymentId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.params;
    const response = await getPaymentById(_id);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const upDatePaymentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const updatedPaymen = await updateUserPayment(id, dataToUpdate);
    res.status(200).json(updatedPaymen);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      console.log(`No payment found with ID: ${id}`);
      return res.status(404).json({ error: `No payment found with ID: ${id}` });
    }
    console.log(`payment successfully removed: ${id} ${payment} `);
    return res
      .status(200)
      .json({ message: "Partner successfully removed", payment });
  } catch (error) {
    console.error(`Error deleting payment ${id}: ${error}`);
    return res.status(500).json({ error: `Error deleting payment ${id}` });
  }
};
