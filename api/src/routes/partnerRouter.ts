import {Router, Request, Response} from "express"
import { getPartnerHandler } from "../handlers/partnerHandler"

const partnerRouter = Router()

interface IpartnerHandler{
    (req: Request, res: Response):void
}

partnerRouter.get("/", getPartnerHandler as IpartnerHandler)

export default partnerRouter 