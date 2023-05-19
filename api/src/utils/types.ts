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

export interface IUser {
  id:string;
  name:string;
  email:string;
  emailVerifiedAt:string;
  password:string;
  deleted:boolean;
  estateId:number;
  creatorId:Date;
  lastConnectoin:Date;
  createdAt:Date;
  updatedAt:Date
}
