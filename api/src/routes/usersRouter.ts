import { Router, Request, Response } from "express";
import {
  getUserHandler,
  postUserHandler,
  upDateUserById,
  deleteUsers,
  getUserId,
  loginUser,
  logoutUser,
  profile,
  refreshAccessToken,
} from "../handlers/usersHandlers";
import { authRequired } from "../middlewares/vlaidateToken";

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
usersRouter.post("/logout/:id", logoutUser as IusersHandler);
usersRouter.get("/profile", authRequired, profile as IusersHandler);
usersRouter.post("/refreshToken", refreshAccessToken as IusersHandler);

export default usersRouter;
