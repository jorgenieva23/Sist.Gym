import mongoose, { Schema } from "mongoose";
import { IIncome } from "../utils/types";

const incomeSchema = new Schema<IIncome>({
  partnerId: {
    type: Schema.Types.String,
    ref: "Partner",
    default: null,
  },
  dateOfAdmission: {
    type: Date,
    default: new Date(),
  },
  stateId: {
    type: Schema.Types.String,
    ref: "States",
    default: null,
  },
  creatorId: {
    type: Schema.Types.String,
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
