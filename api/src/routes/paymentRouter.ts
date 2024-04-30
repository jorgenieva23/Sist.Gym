import { Router, Request, Response } from "express";
import {
  postPayment,
  getPaymentHandler,
  // getPaymentSumHandler,
  getPaymentId,
  upDatePaymentById,
  getAllPaymentsForDayHandler,
  getAllPaymentsForMonthHandler,
  getAllExpiredPayments,
  deletePaymentHandler,
} from "../handlers/paymentsHandlers";

const paymentRouter = Router();

interface IPaymentHandler {
  (req: Request, res: Response): void;
}

paymentRouter.post("/createPayment", postPayment as IPaymentHandler);
paymentRouter.get("/allPayment", getPaymentHandler as IPaymentHandler);
paymentRouter.get(
  "/allExpiredPayment",
  getAllExpiredPayments as IPaymentHandler
);
paymentRouter.get("/getById/id:", getPaymentId as IPaymentHandler);
paymentRouter.get(
  "/partnerPaymentsMonth",
  getAllPaymentsForMonthHandler as IPaymentHandler
);
paymentRouter.get(
  "/partnerPaymentsDay",
  getAllPaymentsForDayHandler as IPaymentHandler
);
paymentRouter.put("/update/:id", upDatePaymentById as IPaymentHandler);
paymentRouter.delete("/delete/:id", deletePaymentHandler as IPaymentHandler);

export default paymentRouter;
