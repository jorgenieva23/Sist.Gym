import { Router, Request, Response } from "express";
import { auth } from "../middlewares/vlaidateToken";
import {
  getUserHandler,
  getUserId,
  upDateUserById,
  postUserHandler,
  deleteUserHandler,
} from "../handlers/usersHandlers";
import {
  loginUser,
  logoutUser,
  profile,
  refreshAccessToken,
} from "../auth/auth";

const usersRouter = Router();

interface IusersHandler {
  (req: Request, res: Response): void;
}

usersRouter.get("/all", getUserHandler as IusersHandler);
usersRouter.get("/getUserId/:id", getUserId as IusersHandler);
usersRouter.post("/create", postUserHandler as IusersHandler);
usersRouter.put("/update/:id", upDateUserById as IusersHandler);
usersRouter.delete("/delete/:id", deleteUserHandler as IusersHandler);

// Autenticacion
usersRouter.post("/login", loginUser as IusersHandler);
usersRouter.post("/logout/:id", logoutUser as IusersHandler);
usersRouter.get("/profile", auth(["indexUsuario"]), profile as IusersHandler);
usersRouter.post("/refreshToken", refreshAccessToken as IusersHandler);

export default usersRouter;
