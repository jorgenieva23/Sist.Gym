import { Document, Schema, Types } from "mongoose";
import { TypeAssertion } from "typescript";

export interface IPartner {
  id: string
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
  stateId: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt: string;
  password: string;
  stateId: string | null;
  creatorId: Date;
  partners: Types.ObjectId[];
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
  id: string
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
  // promotions: string;
  dateFrom: Date;
  dateTo: Date;
  stateId: Types.ObjectId[];
  deleted: boolean;
  creatorId: Types.ObjectId[];
  partnerId: Types.ObjectId[];
  // secondariId: string;
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
