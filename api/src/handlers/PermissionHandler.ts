import { Request, Response } from "express";
import {
  //   createPermissionType,
  getAllPermissionType,
} from "../controllers/permissionControllers";

export const getPermissionTypeHandlers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let results = await getAllPermissionType();
    res.status(200).send(results);
  } catch (error: any) {
    console.log("possible mistake");
    res.status(400).json({ error });
  }
};

// export const postPermissionTypeHandler = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const permissionType = req.body as IPermissionType;
//     const createdpermissionType = await createPermissionType(permissionType);
//     res.status(200).json(createdpermissionType);
//   } catch (error: any) {
//     res.status(400).json(error.message);
//   }
// };
