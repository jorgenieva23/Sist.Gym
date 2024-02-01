import mongoose, { Schema } from "mongoose";
import { IIncome } from "../utils/types";

const incomeSchema = new Schema<IIncome>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  partnerId: {
    type: Schema.Types.String,
    ref: "Partner",
    default: null,
    index: true,
  },
  dateOfAdmission: {
    type: Date,
    default: new Date(),
    index: true,
    validate: {
      validator: (value: Date) =>
        value instanceof Date && !isNaN(value.getTime()),
      message: "Invalid date format",
    },
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
