import mongoose, { Schema, Document } from 'mongoose';
import { AdminRole } from '@/types/user';

export interface IUser extends Document {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: AdminRole;
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'editor', 'accounts'],
      default: 'editor',
    },
    permissions: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
