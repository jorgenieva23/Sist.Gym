import { Router, Request, Response } from "express";
import {
  postPayment,
  getPaymentHandler,
  getPaymentId,
  upDatePaymentById,
  getPartnerPaymentsHandler,
  deletePaymentHandler,
} from "../handlers/paymentsHandlers";

const paymentRouter = Router();

interface IPaymentHandler {
  (req: Request, res: Response): void;
}

paymentRouter.post("/createPayment", postPayment as IPaymentHandler);
paymentRouter.get("/allPaymen", getPaymentHandler as IPaymentHandler);
paymentRouter.get("/getById/id:", getPaymentId as IPaymentHandler);
paymentRouter.get(
  "/partnerPayments/id:",
  getPartnerPaymentsHandler as IPaymentHandler
);
paymentRouter.put("/update/:id", upDatePaymentById as IPaymentHandler);
paymentRouter.delete("/delete/:id", deletePaymentHandler as IPaymentHandler);

export default paymentRouter;
