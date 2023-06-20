import mongoose, { Schema } from "mongoose";
import { IStatePayments } from "../utils/types";

const StatePaymentsSchema = new Schema<IStatePayments>({
  id: {
    type: Number,
    Required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const StatePayments = mongoose.model<IStatePayments>(
  "StatePayments",
  StatePaymentsSchema
);
