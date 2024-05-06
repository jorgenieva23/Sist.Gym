import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IUser } from "./types";
import { Response } from "express";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

const createAccessToken = (user: IUser) => {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 3);
  const payload = {
    token_type: "access",
    user_id: user._id,
    user_rol: user.rol,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  console.log(payload);

  return jwt.sign(payload, JWT_SECRET_KEY);
};

const createRefreshToken = (user: IUser) => {
  const expToken = new Date();
  expToken.setMonth(expToken.getMonth() + 1);

  const payload = {
    token_type: "refresh",
    user_id: user._id,
    user_rol: user.rol,
    iat: Date.now(),
    exp: expToken.getTime(),
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
};

const decoded = (token: string) => {
  return jwt.decode(token, { complete: true }) as jwt.JwtPayload;
};

export { createAccessToken, createRefreshToken, decoded };

// const createAccessToken = (user: IUser, res: Response) => {
//   const expToken = new Date();
//   expToken.setHours(expToken.getHours() + 3);

//   const payload = {
//     token_type: "access",
//     userId: user._id,
//     // userRole: user.rol,
//     iat: Date.now(),
//     exp: expToken.getTime(),
//   };

//   const accessToken = jwt.sign(payload, JWT_SECRET_KEY);

//   res.cookie("token", accessToken);
//   return accessToken;
// };

// const createRefreshToken = (user: IUser) => {
//   const expToken = new Date();
//   expToken.setMonth(expToken.getMonth() + 1);

//   const payload = {
//     token_type: "refresh",
//     user_id: user._id,
//     iat: Date.now(),
//     exp: expToken.getTime(),
//   };

//   return jwt.sign(payload, JWT_SECRET_KEY);

//   // const refreshToken = jwt.sign(payload, JWT_SECRET_KEY);

//   // res.cookie("token", refreshToken, { httpOnly: true });

//   // return refreshToken;
// };
