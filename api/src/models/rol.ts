import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IRoles } from "../utils/types";

const rolesSchema = new Schema<IRoles>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Roles = mongoose.model<IRoles>("Roles", rolesSchema);