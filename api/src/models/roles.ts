import mongoose, { Schema } from "mongoose";
import { IRoles } from "../utils/types";

const rolesSchema = new Schema<IRoles>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
rolesSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Roles = mongoose.model<IRoles>("Roles", rolesSchema);
export default Roles;
