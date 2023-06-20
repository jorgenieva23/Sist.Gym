import { Document, Schema, Types } from "mongoose";
import { TypeAssertion } from "typescript";

export interface IPartner {
  id: number;
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
export interface IStatePartner {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt: string;
  password: string;
  stateId: Types.ObjectId[];
  creatorId: Date;
  partners:  Types.ObjectId[];
  rol: String[];
  active: boolean;
  deleted: boolean;
  token:string,
  updatedAt: Date;
  createdAt: Date;
  lastConnectoin: Date;
}
export interface IStateUser {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IRoles {
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface IIncome {
  id: Number;
  partnerId: Types.ObjectId[];
  dateOfAdmission: Date;
  stateId: Types.ObjectId[];
  deleted: number;
  creatorId: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IStateIncome {
  id: Number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPayments {
  id: number;
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
export interface IStatePayments {
  id: Number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
// export interface IPromotion {
//   id: number;
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
// export interface IStatePromotion {
//   id: Number;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// export interface movements {
//   id: number;

// }