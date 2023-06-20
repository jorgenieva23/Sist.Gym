import mongoose, { Schema } from "mongoose";
import { IStatePartner } from "../utils/types";

const StatePartenerSchema = new Schema<IStatePartner>({
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

export const StatePartener = mongoose.model<IStatePartner>(
  "StatePartener",
  StatePartenerSchema
);
