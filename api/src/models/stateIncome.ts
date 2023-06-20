import mongoose, { Schema } from 'mongoose';
import { IStateIncome } from '../utils/types';

const StateIncomeSchema = new Schema<IStateIncome>({
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

export const StateIncome = mongoose.model<IStateIncome>("StateIncome", StateIncomeSchema )