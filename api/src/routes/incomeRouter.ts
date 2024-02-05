import {Router, Request, Response} from "express"
import { getIncomeHandler, postIncome } from "../handlers/incomeHandler"

const incomeRouter = Router()

interface IIncomeHandler{
    (req: Request, res: Response):void
}

incomeRouter.post("/create", postIncome as IIncomeHandler)
incomeRouter.get("/all", getIncomeHandler as IIncomeHandler)

export default incomeRouter