import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

export default app;