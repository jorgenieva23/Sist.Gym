import mongoose, { Schema } from "mongoose";
import { IIncome } from "../utils/types";

const incomeSchema = new Schema<IIncome>({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  partnerId: {
    type: Schema.Types.ObjectId, 
    ref: "Partner",
    default: null,
  },
  dateOfAdmission: {
    type: Date,
    required: true,
  },
  stateId: {
    type: Schema.Types.ObjectId, 
    ref: "StateIncome",
    default: null,
  },
  deleted: {
    type: Number,
    required: false,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    default: null,
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

const Income = mongoose.model("Income", incomeSchema);
export default Income;
