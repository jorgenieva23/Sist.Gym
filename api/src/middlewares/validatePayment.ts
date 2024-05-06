import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../utils/types";
import MonthlyPayment from "../models/monthlyPayment";
import dotenv from "dotenv";
dotenv.config();
interface AuthRequest extends Request {
  user?: IUser;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const checkPaymentStatus = () => {
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

      const allowedRoles = ["admin"];

      if (!allowedRoles.includes(decoded.user_rol)) {
        return res.status(403).json({
          message: "No tienes permiso para realizar esta acción",
        });
      }
      const now = new Date();
      const payment = await MonthlyPayment.findOne({
        creatorId: decoded.user_id,
        dateFrom: { $lte: now },
        dateTo: { $gte: now },
      }).exec();

      if (!payment) {
        return res.status(403).json({
          message:
            "No ha realizado su pago mensual o su mensualidad ha vencido",
        });
      }
      next();
    } catch (err) {
      console.log(err);

      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
};
