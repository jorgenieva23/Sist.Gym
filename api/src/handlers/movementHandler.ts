import { Request, Response } from "express";
import {
  //   createMovementType,
  getAllMovementType,
} from "../controllers/movementControllers";
import MovementType from "../models/movementType";
import Movement from "../models/movement";
import { IMovementType } from "../utils/types";
import { IMovement } from "../utils/types";

// MANEJADORES DE LOS TIPOS DE MOVIMIENTOS

export const getMovementTypeHandlers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let results = await getAllMovementType();
    res.status(200).send(results);
  } catch (error: any) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};

// MANEJADOR QUE CREAR UN ROL POR ID

// export const postMovementTypeHandler = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const movementType = req.body as IMovementType;
//     const createdmovementType = await createMovementType(movementType);
//     res.status(200).json(createdmovementType);
//   } catch (error: any) {
//     res.status(400).json(error.message);
//   }
// };

// MANEJADORES DE LOS TIPOS DE MOVIMIENTOS
