import mongoose from "mongoose";
import { Schema } from "mongoose";

const rolesSchema = new Schema({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    require: true,
  },
  userId: {},
});
