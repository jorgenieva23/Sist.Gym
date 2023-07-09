import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "../utils/types";

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerifiedAt: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: null,
    required: false
  },
  stateId: {
    type: Schema.Types.String,
      ref: "StateUser",
      required: false
  },
  deleted: {
    type: Boolean,
    required: false,
  },
  creatorId: {
    type: Date,
    required: false,
  },
  lastConnectoin: {
    type: Date,
    required: false,
  },
  partners: {
    type: [{type: Schema.Types.ObjectId,
    ref: "Partner"}],
    default: [],
    required: false
  },
  rol: {
    type: Schema.Types.String,
      ref: "Roles",
      required: true
  },
  active: {
    type: Boolean,
    default: false,
    required: false
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

const Users = mongoose.model<IUser>("Users", userSchema);
export default Users;
