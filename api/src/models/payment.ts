import mongoose, { Schema } from "mongoose";
import { IPayment } from "../utils/types";

const PaymentsSchema = new Schema<IPayment>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // total: {
  //   type: Number,
  //   required: false,
  // },
  dateFrom: {
    type: Date,
    required: false,
  },
  dateTo: {
    type: Date,
    required: false,
  },
  stateId: {
    type: Schema.Types.String,
    ref: "State",
    default: null,
  },
  deleted: {
    type: Boolean,
    required: false,
  },
  creatorId: {
    type: Schema.Types.String,
    ref: "Users",
    default: null,
  },
  partnerId: {
    type: Schema.Types.String,
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

const Payment = mongoose.model<IPayment>("Payment", PaymentsSchema);
export default Payment;
