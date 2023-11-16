import {Router, Request, Response} from "express"
import { getPaymentHandler, postPayment } from "../handlers/paymentsHandlers"

const paymentRouter = Router()

interface IPaymentHandler{
    (req: Request, res: Response):void
}

paymentRouter.post("/", postPayment as IPaymentHandler)
paymentRouter.get("/", getPaymentHandler as IPaymentHandler)

export default paymentRouter