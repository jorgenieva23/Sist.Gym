import {Router, Request, Response} from "express"
import { getPartnerHandler,getPartnerId,postPartner,upDatePartnerById,deletePartner, deleteAllPartner } from "../handlers/partnerHandler"

const partnerRouter = Router()

interface IpartnerHandler{
    (req: Request, res: Response):void
}

partnerRouter.get("/all", getPartnerHandler as IpartnerHandler)
partnerRouter.get("/getById/:id", getPartnerId as IpartnerHandler)
partnerRouter.post("/create", postPartner as IpartnerHandler)
partnerRouter.put("/update/:id", upDatePartnerById as IpartnerHandler)
partnerRouter.delete("/delete/:id", deletePartner as IpartnerHandler)
partnerRouter.delete("/delete", deleteAllPartner as IpartnerHandler)


export default partnerRouter