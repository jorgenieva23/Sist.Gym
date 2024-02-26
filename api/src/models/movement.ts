import mongoose, { Schema } from "mongoose";
import { IMovement } from "../utils/types";

const MovementSchema = new Schema<IMovement>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  movementType: {
    type: Schema.Types.String,
    ref: "MovementType",
    default: null,
  },
  ip: {
    type: String,
    required: false,
  },
  creatorId: {
    type: Schema.Types.String,
    require: true,
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

const Movement = mongoose.model("Movement", MovementSchema);
export default Movement;
