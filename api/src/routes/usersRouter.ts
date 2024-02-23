import { Router, Request, Response } from "express";
import {
  getUserHandler,
  postUserHandler,
  upDateUserById,
  deleteUsers,
  getUserId,
  loginUser,
  logoutUser,
  // signuptUser,
  // signoutUser,
  // refreshToken,
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

usersRouter.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!!username || !!password) {
    return res.status(400).send(400);
  }
  res.status(200).send("todoOk");
});

usersRouter.post("/logout", loginUser as IusersHandler);

usersRouter.post("/signup", (req: Request, res: Response) => {
  const { username, name, password } = req.body;
  if (!username || !name || !password) {
    return res.status(400).send(400);
  }
  res.status(200).send("todoOk");
});

// usersRouter.post("/signout", signoutUser as IusersHandler);
// usersRouter.post("/refresh-token", refreshToken as IusersHandler);
usersRouter.post("/signout", logoutUser as IusersHandler);

export default usersRouter;
