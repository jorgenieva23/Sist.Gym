import mongoose, { Schema } from "mongoose";
import { IPayments } from "../utils/types";

const PaymentsSchema = new Schema<IPayments>({
  id: {
    type: Number,
    Required: true,
    unique: true,
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
    type: [{type: Schema.Types.ObjectId,
    ref: "StatePayments"}],
    default:[]
  },
  deleted: {
    type: Boolean,
    required: false
  },
  creatorId: {
    type: [{type: Schema.Types.ObjectId,
      ref: "Users"}],
      default: [],
  },
  partnerId: {
    type: [{type: Schema.Types.ObjectId,
      ref: "Partner"}],
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