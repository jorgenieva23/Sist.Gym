export interface IPartner {
  _id?: string | null;
  firstName: string;
  lastName: string;
  dni: string | number;
  address: string;
  phone: number;
  email: string;
  picture: string | null;
  deleted?: boolean | null;
  date: number;
  datePhysicalAttitude: number;
  medicalCoverage: string;
  phoneEmergency: number;
  phoneEmergencyName: string;
  stateId?: string | null;
  userId?: string | null;
  condition?: string | null;
  rol?: string | null;
  createdAt?: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  emailVerifiedAt?: string;
  password: string;
  stateId?: string | null;
  creatorId?: string | null;
  partners?: string[];
  rol: string;
  active?: boolean;
  deleted?: boolean;
  token?: string;
  updatedAt?: Date;
  createdAt?: Date;
  lastConnectoin?: Date;
}

export interface IRoles {
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IIncome {
  _id?: string;
  partnerId: string | null;
  dateOfAdmission: number;
  stateId: string | null;
  deleted?: boolean;
  creatorId: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IStates {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPayments {
  _id: string;
  amount: number;
  total: number;
  dateFrom: Date;
  dateTo: Date;
  stateId: string | null;
  deleted: boolean;
  creatorId: string | null;
  partnerId: string | null;
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
