import { Router, Request, Response } from "express";
import {
  getPartnerHandler,
  getPartnerId,
  postPartner,
  upDatePartnerById,
  deleteParterHandler,
} from "../handlers/partnerHandler";

const partnerRouter = Router();

interface IpartnerHandler {
  (req: Request, res: Response): void;
}

partnerRouter.get("/all", getPartnerHandler as IpartnerHandler);
partnerRouter.get("/getById/:id", getPartnerId as IpartnerHandler);
partnerRouter.post("/create", postPartner as IpartnerHandler);
partnerRouter.put("/update/:id", upDatePartnerById as IpartnerHandler);
partnerRouter.delete("/delete/:id", deleteParterHandler as IpartnerHandler);

export default partnerRouter;
