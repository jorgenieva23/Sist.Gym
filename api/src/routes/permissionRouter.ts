import { Router, Request, Response } from "express";
import {
  // postMovementType,
  getPermissionTypeHandlers,
} from "../handlers/PermissionHandler";

const permissionRouter = Router();

interface IPermissionHandler {
  (req: Request, res: Response): void;
}

// movementRouter.post("/create", postMovementType as IMovementHandler);
permissionRouter.get("/all", getPermissionTypeHandlers as IPermissionHandler);

export default permissionRouter;
