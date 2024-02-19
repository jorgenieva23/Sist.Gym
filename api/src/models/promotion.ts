import mongoose, { Schema } from "mongoose";
import { IPromotion } from "../utils/types";

const PromotionSchema = new Schema<IPromotion>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  contadorReference: {
    type: Number,
  },
  description: {
    type: String,
  },
  deleted: {
    type: Boolean,
    required: false,
  },
  stateId: {
    type: Schema.Types.String,
    ref: "State",
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

const Promotion = mongoose.model<IPromotion>("Promotion", PromotionSchema);
export default Promotion;
