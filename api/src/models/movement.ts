import mongoose, { Schema } from "mongoose";

const movementSchema = new Schema({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  movementId: {
    type: Schema.Types.String,
    ref: "tipeMovement",
    default: null,
  },
  ip: {
    type: String,
    required: false,
  },
  data: {
    type: [{ type: Schema.Types.Mixed }],
    required: [],
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
