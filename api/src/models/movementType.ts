import mongoose, { Schema } from "mongoose";
import { IMovementType } from "../utils/types";

const MovementTypeSchema = new Schema<IMovementType>({
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

const MovementType = mongoose.model("MovementType", MovementTypeSchema);
export default MovementType;
