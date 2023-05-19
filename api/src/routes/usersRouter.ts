import { Router, Request, Response } from "express";
import { getUserHandler } from "../handlers/usersHandlers";

const usersRouter = Router();

interface IusersHandler {
  (req: Request, res: Response): void;
}

usersRouter.get("/", getUserHandler as IusersHandler);

export default usersRouter;
