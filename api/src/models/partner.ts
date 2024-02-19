import mongoose, { Schema } from "mongoose";
import { IPartner } from "../utils/types";

const partnerSchema = new Schema<IPartner>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    required: true,
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
    validate: {
      validator: (value: number) => /^\d{10}$/.test(value.toString()),
      message: "Invalid phone number format",
    },
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
  picture: {
    type: String,
  },
  deleted: {
    type: Boolean,
  },
  date: {
    type: Date,
  },
  datePhysicalAttitude: {
    type: Date,
  },
  medicalCoverage: {
    type: String,
  },
  phoneEmergency: {
    type: Number,
    required: true,
  },
  phoneEmergencyName: {
    type: String,
  },
  stateId: {
    type: Schema.Types.String,
    ref: "States",
    default: "inactive",
  },
  userId: {
    type: Schema.Types.String,
    ref: "User",

  },
  rol: {
    type: Schema.Types.String,
    ref: "Roles",
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

const Partner = mongoose.model<IPartner>("Partner", partnerSchema);
export default Partner;
