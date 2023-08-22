import { Document, Schema, Types } from "mongoose";

export interface IPartner {
  id: string;
  firstName: string;
  lastName: string;
  dni: number;
  address: string;
  phone: number;
  email: string;
  picture: string;
  deleted: boolean;
  date: number;
  datePhysicalAttitude: Date;
  medicalCoverage: string;
  phoneEmergency: number;
  phoneEmergencyName: string;
  stateId: string | null;
  userId: string | null;
  role: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt: string;
  password: string;
  stateId: Types.ObjectId | string | null;
  creatorId: Types.ObjectId | string | null;
  partners: string[]
  rol: string | null;
  active: boolean;
  deleted: boolean;
  token: string;
  updatedAt: Date;
  createdAt: Date;
  lastConnectoin: Date;
}
export interface IRoles {
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface IIncome {
  id: string;
  partnerId: Types.ObjectId | null;
  dateOfAdmission: Date;
  stateId: Types.ObjectId | null;
  deleted: number;
  creatorId: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface IStates {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPayments {
  id: string;
  amount: number;
  total: number;
  dateFrom: Date;
  dateTo: Date;
  stateId: Types.ObjectId | null;
  deleted: boolean;
  creatorId: Types.ObjectId | null;
  partnerId: Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

// export interface IPromotion {
// id: string;
//   name: string;
//   descuento: number;
//   counter_reference: number;
//   description: string;
//   stateId: Types.ObjectId[];
//   deleted: boolean;
//   creatorId: Types.ObjectId[];
//   secondariId: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface movements {
// id: string;

// }
