import mongoose, { Schema, Document } from 'mongoose';

interface ICustomerAddress {
  type: 'billing' | 'shipping';
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone?: string;
}

interface ICustomerPreferences {
  currency: string;
  language: string;
  marketingEmails: boolean;
  smsNotifications: boolean;
  whatsappUpdates: boolean;
}

export interface ICustomer extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  addresses: ICustomerAddress[];
  preferences: ICustomerPreferences;
  tags: string[];
  segments: string[];
  notes: string[];
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate?: Date;
  acquisitionSource: string;
  referralCode?: string;
  loyaltyPoints: number;
  status: 'active' | 'inactive' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    addresses: [
      {
        type: { type: String, enum: ['billing', 'shipping'], required: true },
        isDefault: { type: Boolean, default: false },
        name: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
        phone: { type: String },
      },
    ],
    preferences: {
      currency: { type: String, default: 'INR' },
      language: { type: String, default: 'en' },
      marketingEmails: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: true },
      whatsappUpdates: { type: Boolean, default: true },
    },
    tags: [{ type: String }],
    segments: [{ type: String }],
    notes: [{ type: String }],
    totalOrders: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    averageOrderValue: {
      type: Number,
      default: 0,
    },
    lastOrderDate: {
      type: Date,
    },
    acquisitionSource: {
      type: String,
      default: 'direct',
    },
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

CustomerSchema.index({ email: 1 });
CustomerSchema.index({ phone: 1 });
CustomerSchema.index({ firstName: 'text', lastName: 'text' });
CustomerSchema.index({ status: 1 });
CustomerSchema.index({ tags: 1 });
CustomerSchema.index({ segments: 1 });
CustomerSchema.index({ totalSpent: -1 });
CustomerSchema.index({ lastOrderDate: -1 });

export const Customer = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);