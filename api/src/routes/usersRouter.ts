import { Router, Request, Response } from "express";
import { getUserHandler, postUser, upDateUserById, deleteUsers, handleLogin, handleLogout } from "../handlers/usersHandlers";

const usersRouter = Router();

interface IusersHandler {
  (req: Request, res: Response): void;
}

usersRouter.get("/", getUserHandler as IusersHandler);
usersRouter.post("/", postUser as IusersHandler);
usersRouter.put("/:id", upDateUserById as IusersHandler);
usersRouter.delete("/:id", deleteUsers as IusersHandler);
// usersRouter.get("/:id", getUserId as IusersHandler);

// Autenticacion
usersRouter.post("/login", handleLogin as IusersHandler);
usersRouter.post("/logout", handleLogout as IusersHandler);

export default usersRouter;
