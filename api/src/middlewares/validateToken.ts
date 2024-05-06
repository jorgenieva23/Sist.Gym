import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../utils/types";
import Users from "../models/user";
import Roles from "../models/rol";
import dotenv from "dotenv";
dotenv.config();
interface AuthRequest extends Request {
  user?: IUser;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const auth = (requiredPermissions: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No se proporcionó ningún token, acceso denegado" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
        user_id: string;
        user_rol: string;
      };
      console.log(decoded.user_rol);

      const role = await Roles.findOne({ name: decoded.user_rol }).exec();
      if (!role?.name) {
        return res
          .status(403)
          .json({ message: "El rol del usuario no fue encontrado" });
      }
      const userPermissions = role.permissions;
      const hasPermission = userPermissions.some((permission) =>
        requiredPermissions.includes(permission)
      );
      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: "No tiene permiso para acceder a esta ruta" });
      }
      console.log("pasaste por authResponse");
      next();
    } catch (err) {
      console.log(err);

      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
};

// si cambio por cookies
// export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "No se proporcionó ningún token, acceso denegado" });
//   }
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET_KEY);
//     req.user = decoded as IUser;
//     console.log("pasaste por authResponse");
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Token inválido o expirado" });
//   }
// };
