import mongoose, { Schema } from "mongoose";
import { IPayments } from "../utils/types";

const PaymentsSchema = new Schema<IPayments>({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: false
  },
  dateFrom: {
    type: Date,
    required: false
  },
  dateTo: {
    type: Date,
    required: false
  },
  stateId: {
    type: Schema.Types.ObjectId,
    ref: "StatePayments",
    default: null
  },
  deleted: {
    type: Boolean,
    required: false
  },
  creatorId: {
    type: Schema.Types.ObjectId,
      ref: "Users",
      default: null,
  },
  partnerId: {
    type: Schema.Types.ObjectId,
      ref: "Partner",
      default: [],
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

const Payments = mongoose.model<IPayments>("Payments", PaymentsSchema)
export default Payments