import { Router, Request, Response } from "express";
import {
  postPayment,
  getPaymentHandler,
  getPaymentId,
  upDatePaymentById,
  deletePayment,
} from "../handlers/paymentsHandlers";

const paymentRouter = Router();

interface IPaymentHandler {
  (req: Request, res: Response): void;
}

paymentRouter.post("/create", postPayment as IPaymentHandler);
paymentRouter.get("/all", getPaymentHandler as IPaymentHandler);
paymentRouter.get("/getById/id:", getPaymentId as IPaymentHandler);
paymentRouter.put("/update/:id", upDatePaymentById as IPaymentHandler);
paymentRouter.delete("/deleteById/id:", deletePayment as IPaymentHandler);

export default paymentRouter;
