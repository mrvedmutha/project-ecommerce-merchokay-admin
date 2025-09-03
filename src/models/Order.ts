import mongoose, { Schema, Document } from 'mongoose';
import { PaymentType, PaymentGateway } from '@/enum/payment-types';
import { OrderStatus, OrderPriority } from '@/enum/order-status';

interface IOrderItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  price: number;
  currency: string;
  variant?: string;
  image?: string;
}

interface ICustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
}

interface IPaymentTransaction {
  id: string;
  gateway: PaymentGateway;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  transactionId?: string;
  processedAt?: Date;
  failureReason?: string;
}

interface IShipping {
  method: string;
  cost: number;
  currency: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
}

export interface IOrder extends Document {
  _id: string;
  orderNumber: string;
  customerId?: string;
  customer: ICustomerInfo;
  items: IOrderItem[];
  subtotal: number;
  tax: number;
  shipping: IShipping;
  total: number;
  currency: string;
  paymentType: PaymentType;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'failed' | 'refunded';
  paymentTransactions: IPaymentTransaction[];
  partialCodAmount?: number;
  status: OrderStatus;
  priority: OrderPriority;
  notes: string[];
  internalNotes: string[];
  source: 'admin' | 'website' | 'phone' | 'whatsapp';
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerId: {
      type: String,
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
      },
    },
    items: [
      {
        productId: { type: String, required: true },
        productName: { type: String, required: true },
        sku: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        currency: { type: String, required: true },
        variant: { type: String },
        image: { type: String },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      default: 0,
    },
    shipping: {
      method: { type: String, required: true },
      cost: { type: Number, required: true },
      currency: { type: String, required: true },
      trackingNumber: { type: String },
      carrier: { type: String },
      estimatedDelivery: { type: Date },
      actualDelivery: { type: Date },
    },
    total: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentType: {
      type: String,
      enum: Object.values(PaymentType),
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentTransactions: [
      {
        id: { type: String, required: true },
        gateway: { type: String, enum: Object.values(PaymentGateway), required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'], required: true },
        transactionId: { type: String },
        processedAt: { type: Date },
        failureReason: { type: String },
      },
    ],
    partialCodAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    priority: {
      type: String,
      enum: Object.values(OrderPriority),
      default: OrderPriority.NORMAL,
    },
    notes: [{ type: String }],
    internalNotes: [{ type: String }],
    source: {
      type: String,
      enum: ['admin', 'website', 'phone', 'whatsapp'],
      default: 'admin',
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ customerId: 1 });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ paymentType: 1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ createdAt: -1 });

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);