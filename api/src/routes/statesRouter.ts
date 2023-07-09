import {Router, Request, Response} from "express"
import { postState, getAllStates } from "../handlers/statesHandler"

const statesRouter = Router()

interface IStatesHandler{
    (req: Request, res: Response):void
}

statesRouter.post("/", postState as IStatesHandler)
statesRouter.get("/", getAllStates as IStatesHandler)

export default statesRouter