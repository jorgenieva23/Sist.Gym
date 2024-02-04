import { Router, Request, Response } from "express";
import {
  getUserHandler,
  postUserHandler,
  upDateUserById,
  deleteUsers,
  getUserId,
  loginUser,
  logoutUser,
} from "../handlers/usersHandlers";

const usersRouter = Router();

interface IusersHandler {
  (req: Request, res: Response): void;
}

usersRouter.get("/all", getUserHandler as IusersHandler);
usersRouter.get("/getUserId/:id", getUserId as IusersHandler);
usersRouter.post("/create", postUserHandler as IusersHandler);
usersRouter.put("/update/:id", upDateUserById as IusersHandler);
usersRouter.delete("/delete/:id", deleteUsers as IusersHandler);

// Autenticacion
usersRouter.post("/login", loginUser as IusersHandler);
usersRouter.post("/logout", logoutUser as IusersHandler);

export default usersRouter;
