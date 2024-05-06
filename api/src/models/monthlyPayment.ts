import mongoose, { Schema } from "mongoose";
import { IMonthlyPayment } from "../utils/types";

const monthlyPaymentSchema = new Schema<IMonthlyPayment>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dateFrom: {
    type: Date,
    required: false,
  },
  dateTo: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
  },
  creatorId: {
    type: Schema.Types.String,
    ref: "Users",
    default: null,
  },
  stateId: {
    type: String,
    ref: "States",
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

const MonthlyPayment = mongoose.model("MonthlyPayment", monthlyPaymentSchema);
export default MonthlyPayment;