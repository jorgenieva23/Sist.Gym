import mongoose, { Schema } from "mongoose";
import { IPartner } from "../utils/types";

const partnerSchema = new Schema({
    id: {
        type: String,
        primaryKey: true,
        autoIncrement: true,
      },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    dni:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required :true,
    },
    phone:{
        type: Number,
        required:true,
    },
    email:{
        type: String,
        required:false,
    },
    picture:{
        type: String,
        required:true,
    },
    deleted:{
        type: Boolean,
        required: true,
    },
    date:{
        type:Date,
        required: false,
    },
    datePhysicalAttitude:{
        type: Date,
        required: false,
    },
    medicalCoverage:{
        type: String,
        required: false,
    },
    phoneEmergency:{
        type: Number,
        required: false,
    },
    phoneEmergencyName:{
        type: String,
        required: false,
    },
    estateId:{
        type: Number,
        enum: ["active", "no active"],
        default : "active"
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        required:true
    },
    role: {
        type: mongoose.SchemaTypes.ObjectId, 
        ref: 'Roles',
        required:true
    },
    creatorId:{
        type: Number,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
})

const Partner = mongoose.model("Partner", partnerSchema)
export default Partner