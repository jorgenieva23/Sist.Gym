import {Router, Request, Response} from "express"
import { postState, getAllStates } from "../handlers/statesHandler"

const statesRouter = Router()

interface IStatesHandler{
    (req: Request, res: Response):void
}

statesRouter.post("/createState", postState as IStatesHandler)
statesRouter.get("/getAll", getAllStates as IStatesHandler)

export default statesRouter