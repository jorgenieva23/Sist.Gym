import { Router, Request, Response } from "express";
import {
  getRolHandlers,
  postRolesHandler,
  deleteRol,
} from "../handlers/rolesHandler";

const rolesRouter = Router();

interface IRolesHandler {
  (req: Request, res: Response): void;
}

rolesRouter.get("/all", getRolHandlers as IRolesHandler);
rolesRouter.get("/getById/:id", getRolHandlers as IRolesHandler);
rolesRouter.post("/create", postRolesHandler as IRolesHandler);
rolesRouter.delete("/delete/:id", deleteRol as IRolesHandler);

export default rolesRouter;
