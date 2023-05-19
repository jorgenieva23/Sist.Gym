import mongoose, { trusted } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  emailVerifiedAt: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  deleted: {
    type: Boolean,
    require: true,
  },
  estateId: {
    type: Number,
    require: true,
  },
  creatorId: {
    type: Number,
    require: true,
  },
  lastConnectoin: {
    type: Date,
    require: false,
  },
    partners: {
    type: [Schema.Types.ObjectId],
    ref: "Partner",
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

const Users = mongoose.model("Users", userSchema);
export default Users
