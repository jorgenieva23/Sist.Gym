import { Router, Request, Response } from "express";
import {
  // postMovementType,
  getMovementTypeHandlers,
} from "../handlers/movementHandler";

const movementRouter = Router();

interface IMovementHandler {
  (req: Request, res: Response): void;
}

// movementRouter.post("/create", postMovementType as IMovementHandler);
movementRouter.get("/all", getMovementTypeHandlers as IMovementHandler);

export default movementRouter;
