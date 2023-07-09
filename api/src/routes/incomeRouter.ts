import {Router, Request, Response} from "express"
import { getIncomeHandler, postIncome } from "../handlers/incomeHandler"

const incomeRouter = Router()

interface IIncomeHandler{
    (req: Request, res: Response):void
}

incomeRouter.post("/", postIncome as IIncomeHandler)
incomeRouter.get("/", getIncomeHandler as IIncomeHandler)

export default incomeRouter