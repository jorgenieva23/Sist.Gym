import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new Schema<IUser>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: "Invalid email format",
    },
  },
  emailVerifiedAt: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) =>
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/.test(
          value
        ),
      message: "Invalid password format",
    },
  },

  token: {
    type: String,
    default: null,
  },
  stateId: {
    type: String,
    ref: "States",
    default: "active",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  creatorId: {
    type: String,
    ref: "Users",
  },
  lastConnection: {
    type: Date,
  },
  partners: {
    type: [{ type: Schema.Types.String }],
    ref: "Partner",
  },
  rol: {
    type: String,
    ref: "Roles",
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
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

const User = mongoose.model<IUser>("User", userSchema);
export default User;
