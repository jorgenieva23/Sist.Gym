import mongoose, { Schema } from "mongoose";
import { IPartner } from "../utils/types";

const partnerSchema = new Schema({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dni: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  deleted: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  datePhysicalAttitude: {
    type: Date,
    required: false,
  },
  medicalCoverage: {
    type: String,
    required: false,
  },
  phoneEmergency: {
    type: Number,
    required: true,
  },
  phoneEmergencyName: {
    type: String,
    required: false,
  },
  stateId: {
    type: Schema.Types.String, 
    ref: "States",
    default: null,
  },
  userId: {
    type: Schema.Types.String,
    ref: "Users",
    default: null,
  },
  role: {
    type: Schema.Types.String,
    ref: "Roles",
    default: null,
  },
  condition: {
    type: String,
    enum: ["fit", "unfit"],
    default: "unfit",
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

const Partner = mongoose.model("Partner", partnerSchema);
export default Partner;
