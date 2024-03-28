import { connect } from "mongoose";
import { cronJobs } from "./cronJob";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.MONGODB_URI);

export const connectDB = connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("connected mongodb atlas");
    console.log("Leyendo tareas cron...");
    cronJobs();
  })
  .catch((error) => console.error(error));
