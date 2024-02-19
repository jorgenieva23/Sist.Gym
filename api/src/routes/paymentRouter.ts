import { Router, Request, Response } from "express";
import { postPayment, getPaymentHandler } from "../handlers/paymentsHandlers";

const paymentRouter = Router();

interface IPaymentHandler {
  (req: Request, res: Response): void;
}

paymentRouter.post("/create", postPayment as IPaymentHandler);
paymentRouter.get("/all", getPaymentHandler as IPaymentHandler);

export default paymentRouter;
