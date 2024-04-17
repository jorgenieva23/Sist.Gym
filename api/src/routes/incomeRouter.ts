import { Router, Request, Response } from "express";
import {
  postIncome,
  getAllIncomeHandler,
  getIncomeTodayHandler,
  getPartnerIncomeHandler,
  getAllIncomeByPartnerIDHandler,
  deleteIncome,
} from "../handlers/incomeHandler";

const incomeRouter = Router();

interface IIncomeHandler {
  (req: Request, res: Response): void;
}

incomeRouter.post("/create", postIncome as IIncomeHandler);
incomeRouter.get("/allIncome", getAllIncomeHandler as IIncomeHandler);
incomeRouter.get("/incomeToday", getIncomeTodayHandler as IIncomeHandler);
incomeRouter.get("/partnerIncome", getPartnerIncomeHandler as IIncomeHandler);
incomeRouter.get(
  "/allIncomeByPartnerId/:partnerId",
  getAllIncomeByPartnerIDHandler as IIncomeHandler
);
incomeRouter.delete("/deleteIncome/:id", deleteIncome as IIncomeHandler);

export default incomeRouter;
