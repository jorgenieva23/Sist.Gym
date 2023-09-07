import {Router, Request, Response} from "express"
import { getPartnerHandler,getPartnerId,postPartner,upDatePartnerById,deletePartner, deleteAllPartner } from "../handlers/partnerHandler"

const partnerRouter = Router()

interface IpartnerHandler{
    (req: Request, res: Response):void
}

partnerRouter.get("/", getPartnerHandler as IpartnerHandler)
partnerRouter.get("/:id", getPartnerId as IpartnerHandler)
partnerRouter.post("/", postPartner as IpartnerHandler)
partnerRouter.put("/:id", upDatePartnerById as IpartnerHandler)
partnerRouter.delete("/:id", deletePartner as IpartnerHandler)
partnerRouter.delete("/", deleteAllPartner as IpartnerHandler)


export default partnerRouter