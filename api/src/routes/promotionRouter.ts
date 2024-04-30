import { Router, Request, Response } from "express";
import {
  postPromotion,
  getPromotionHandler,
  updatePromotionById,
  deleteParterHandler,
} from "../handlers/promotionHandler";

const promotionRouter = Router();

interface IPromotionHandler {
  (req: Request, res: Response): void;
}

promotionRouter.post("/createProm", postPromotion as IPromotionHandler);
promotionRouter.get("/getAllProm", getPromotionHandler as IPromotionHandler);
promotionRouter.put("/upDateProm/:id", updatePromotionById as IPromotionHandler);
promotionRouter.delete(
  "/deletePromo/:id",
  deleteParterHandler as IPromotionHandler
);

export default promotionRouter;
