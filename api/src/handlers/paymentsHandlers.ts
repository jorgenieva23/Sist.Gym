import { Request, Response } from "express";
import {
  registerPaymentController,
  getAllPayment,
  updateUserPayment,
  getPaymentById,
  getPartnerPayments,
  deletePayment,
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
    const updatedPaymen = await updateUserPayment({
      id,
      updatedData: dataToUpdate,
      req,
    });
    res.status(200).json(updatedPaymen);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export const getPartnerPaymentsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    let result = await getPartnerPayments(id);
    res.status(200).json(result);
  } catch (error) {
    console.log("possible mistake");
    res.status(400).json({ error });
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
      : await Payment.deleteMany();
    if (!result) {
      console.log(`No Payment found`);
      res.status(404).json({ error: `No Payment found` });
    }
    res.status(200).json({ message: "Payment successfully removed" });
  } catch (error) {
    res.status(500).json({ error: `Error deleting Payment ${id}` });
  }
};
