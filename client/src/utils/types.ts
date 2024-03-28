export interface IPartner {
  _id?: string;
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
  updatedAt?: Date;
}

export interface IUser {
  _id?: string;
  name?: string;
  email: string;
  emailVerifiedAt?: string;
  password: string;
  stateId?: string | null;
  creatorId?: string | null;
  partners?: string[];
  rol?: string;
  active?: boolean;
  deleted?: boolean;
  token?: string;
  updatedAt?: Date;
  createdAt?: Date;
  lastConnectoin?: Date;
}

export interface newIRol {
  name: string;
  permissions: string[];
}
export interface IRoles extends newIRol {
  _id: string;
  created_at: Date;
  updated_at: Date;
}

export interface IIncome {
  _id?: string;
  partnerId: string;
  dateOfAdmission?: number;
  stateId?: string | null;
  deleted?: boolean;
  creatorId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
// export interface newIIncome {
//   partnerId: string;
//   dateOfAdmission: number;
// }

// export interface IIncome extends newIIncome {
//   _id: string;
//   stateId: string | null;
//   deleted: boolean;
//   creatorId: string | null;
//   createdAt: Date;
//   updatedAt: Date;
// }
export interface IStates {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IPayments {
  _id?: string;
  amount: number;
  total?: number;
  dateFrom: number;
  dateTo?: number;
  deleted?: boolean;
  promotionId: string;
  stateId?: string | undefined;
  creatorId?: string | undefined;
  partnerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPromotion {
  _id?: string;
  name: string;
  percentage: number;
  referredDate: number;
  description: string;
  deleted?: boolean;
  stateId?: string | null;
  creatorId?: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMovement {
  _id: string;
  movementType: string | null;
  creatorId: string | null;
  ip: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponseError {
  error: string;
}

export interface IAccessTokenResponse {
  statusCode: number;
  accessToken: string;
  error?: string;
}

export interface IPermission {
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
