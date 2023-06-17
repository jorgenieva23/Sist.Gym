import { Router, Request, Response } from "express";
import {
  getRolHandlers,
  postRolesHandler,
  deleteRol

} from "../handlers/rolesHandler";

const rolesRouter = Router()

interface IRolesHandler {
  (req: Request, res: Response): void;
}

rolesRouter.post("/", postRolesHandler as IRolesHandler)
rolesRouter.get("/", getRolHandlers as IRolesHandler)
rolesRouter.get("/:id", getRolHandlers as IRolesHandler)
rolesRouter.delete("/:id", deleteRol as IRolesHandler)

export default rolesRouter