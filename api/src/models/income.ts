import mongoose, { Schema } from "mongoose";
import { IIncome } from "../utils/types";

const incomeSchema = new Schema<IIncome>({
  id: {
    type: Number,
    Required: true,
    unique: true,
  },
  partnerId: {
    type: String,
    required: true
  },
  dateOfAdmission: {
    type: Date,
    required: true
  },
  estateId: {
    type: String,
    required: true
  },
  deleted: {
    type: Number,
    required: false
  },
  creatorId: {
    type: String,
    required: false
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

const Income = mongoose.model("Income", incomeSchema)
export default Income