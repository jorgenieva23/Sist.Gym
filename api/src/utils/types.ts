import { Types } from "mongoose";

export interface IPartner {
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
  name: string;
  email: string;
  emailVerifiedAt: string;
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
  lastConnectoin: Date;
}
export interface IRoles {
  name: string;
  created_at: Date;
  updated_at: Date;
}
export interface IIncome {
  partnerId: Types.ObjectId | string | null;
  dateOfAdmission: Date;
  stateId: Types.ObjectId | string | null;
  deleted: number;
  creatorId: Types.ObjectId | string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface IStates {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPayments {
  amount: number;
  total: number;
  dateFrom: Date;
  dateTo: Date;
  stateId: Types.ObjectId | string | null;
  deleted: boolean;
  creatorId: Types.ObjectId | string | null;
  partnerId: Types.ObjectId | string | null;
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
