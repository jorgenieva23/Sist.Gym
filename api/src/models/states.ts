import mongoose, { Schema } from 'mongoose';
import { IStates } from '../utils/types';

const StatesSchema = new Schema<IStates>({
  id: {
    type: String,
    primaryKey: true,
    autoIncrement: true,
  },
    name: {
        type: String,
        required: true
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

const States = mongoose.model("States", StatesSchema )
export default States
