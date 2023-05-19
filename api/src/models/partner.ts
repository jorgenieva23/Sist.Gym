import mongoose from "mongoose";
import { Schema } from "mongoose";

const partnerSchema = new Schema({
    id:{
        type:String,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        require: true,
    },
    dni:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        require:true,
    },
    phone:{
        type: Number,
        require:true,
    },
    email:{
        type: String,
        require:false,
    },
    picture:{
        type: String,
        require:true,
    },
    deleted:{
        type: Boolean,
        require: true,
    },
    date:{
        type:Date,
        require: false,
    },
    datePhysicalAttitude:{
        type: Date,
        require: false,
    },
    medicalCoverage:{
        type: String,
        require: false,
    },
    phoneEmergency:{
        type: Number,
        require: false,
    },
    phoneEmergencyName:{
        type: String,
        require: false,
    },
    estateId:{
        // type: Number,
        // require: true,
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Users",
        require:true
    },
    creatorId:{
        type: Number,
        require:true,
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