import mongoose, { Schema } from 'mongoose';
import { IStateUser } from '../utils/types';

const IStateUserSchema = new Schema<IStateUser>({
    id: {
      type: Number,
      Required: true,
      unique: true,
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

export const StateUser = mongoose.model<IStateUser>("StateUser", IStateUserSchema )