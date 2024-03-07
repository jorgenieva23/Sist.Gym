import mongoose, { Schema } from "mongoose";
import { IPermission } from "../utils/types";

const PermissionSchema = new Schema<IPermission>({
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

const Permission = mongoose.model<IPermission>("Permission", PermissionSchema);
export default Permission;
