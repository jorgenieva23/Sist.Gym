import { Types } from "mongoose";
import { Schema, Document } from "mongoose";

export interface IPartner extends Document {
  // _id: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  dni: number;
  address: string;
  phone: number;
  email: string;
  picture: string;
  deleted: boolean;
  date: Date;
  datePhysicalAttitude: Date;
  medicalCoverage: string;
  phoneEmergency: number;
  phoneEmergencyName: string;
  stateId: string;
  userId: string;
  rol: string;
  condition: "fit" | "unfit";
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  emailVerifiedAt: Date;
  password: string;
  stateId: Types.ObjectId | string | null;
  creatorId: Types.ObjectId | string | null;
  partners: string[];
  rol: string | null;
  active: boolean;
  deleted: boolean;
  token: string;
  updatedAt: Date;
  createdAt: Date;
  lastConnection: Date;
}

export interface IIncome extends Document {
  _id: Schema.Types.ObjectId;
  partnerId: Schema.Types.ObjectId | string | null;
  dateOfAdmission: Date;
  stateId: Schema.Types.ObjectId | string | null;
  creatorId: Schema.Types.ObjectId | string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  _id: Schema.Types.ObjectId;
  amount: number;
  total: number;
  dateFrom: Date;
  dateTo: Date;
  deleted: boolean;
  promotionId: number | string | null;
  stateId: Types.ObjectId | string | null;
  creatorId: Types.ObjectId | string | null;
  partnerId: Types.ObjectId | string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPromotion {
  _id: Schema.Types.ObjectId;
  name: string;
  percentage: number | null;
  referredDate: number | null;
  description: string;
  deleted: boolean;
  stateId: Types.ObjectId | string | null;
  creatorId: Types.ObjectId | string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoles {
  _id: Schema.Types.ObjectId;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IStates {
  _id: Schema.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
