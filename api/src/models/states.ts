import mongoose, { Schema } from "mongoose";
import { IStates } from "../utils/types";

const StatesSchema = new Schema<IStates>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
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

const States = mongoose.model("States", StatesSchema);
export default States;
