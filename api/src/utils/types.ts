import { Types } from "mongoose";
import { Request } from "express";
import { Schema, Document } from "mongoose";

export interface IPartner extends Document {
  // _id?: Schema.Types.ObjectId;
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
  phoneEmergency: number | string;
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
  rol: string;
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

export interface IPayment extends Document {
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

export interface IPromotion extends Document {
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

export interface IMovement extends Document {
  _id: Schema.Types.ObjectId;
  movementType: Types.ObjectId | string | null;
  creatorId: Types.ObjectId | string | null;
  ip: string;
  rolUser: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMovementType extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoles extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPermission extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStates extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthRequest extends Request {
  user?: IUser;
}
