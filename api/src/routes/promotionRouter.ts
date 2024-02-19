import { Router, Request, Response } from "express";
import {
  postPromotion,
  getPromotionHandler,
} from "../handlers/promotionHandler";

const promotionRouter = Router();

interface IPromotionHandler {
  (req: Request, res: Response): void;
}

promotionRouter.post("/createProm", postPromotion as IPromotionHandler);
promotionRouter.get("/allProm", getPromotionHandler as IPromotionHandler);

export default promotionRouter;
