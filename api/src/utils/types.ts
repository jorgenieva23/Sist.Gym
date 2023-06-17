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
  estateId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  emailVerifiedAt: string;
  password: string;
  estateId: number;
  creatorId: Date;
  partners:  Types.ObjectId[];
  rol: Types.ObjectId[];
  active: boolean;
  deleted: boolean;
  token:string,
  updatedAt: Date;
  createdAt: Date;
  lastConnectoin: Date;
}

export interface IRoles {
  id: number;
  name: string;
}

export interface IIncome {
  id: Number;
  partnerId: string;
  dateOfAdmission: Date;
  estateId: string;
  deleted: number;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}
