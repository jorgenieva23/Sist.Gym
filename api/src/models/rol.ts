import mongoose from "mongoose";
import { Schema } from "mongoose";
import { IRoles } from "../utils/types";

const rolesSchema = new Schema<IRoles>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [{ type: Schema.Types.String }],
    ref: "Prmissions",
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

const Roles = mongoose.model<IRoles>("Roles", rolesSchema);
export default Roles;
