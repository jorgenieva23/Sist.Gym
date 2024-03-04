import express from "express";
import morgan from "morgan";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.set("trust proxy", true);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(router);

export default app;
