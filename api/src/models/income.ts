import mongoose, { Schema } from "mongoose";
import { IIncome } from "../utils/types";

const incomeSchema = new Schema<IIncome>({
  id: {
    type: Number,
    Required: true,
    unique: true,
  },
  partnerId: {
    type: [{type: Schema.Types.ObjectId,
      ref: "Users"}],
      default: [],
  },
  dateOfAdmission: {
    type: Date,
    required: true
  },
  estateId: {
    type: [{type: Schema.Types.ObjectId,
    ref: "StateIncome"}],
    default:[]
  },
  deleted: {
    type: Number,
    required: false
  },
  creatorId: {
    type: [{type: Schema.Types.ObjectId,
      ref: "Users"}],
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

const Income = mongoose.model("Income", incomeSchema)
export default Income