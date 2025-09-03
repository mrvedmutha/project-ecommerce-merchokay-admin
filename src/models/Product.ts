import mongoose, { Schema, Document } from 'mongoose';

interface IProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface IProductPricing {
  currency: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
}

interface IProductVariant {
  name: string;
  type: 'color' | 'size' | 'material' | 'style';
  values: string[];
  price?: number;
  inventory?: number;
  sku?: string;
}

interface IProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  slug: string;
}

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory?: string;
  sku: string;
  barcode?: string;
  pricing: IProductPricing[];
  images: IProductImage[];
  variants?: IProductVariant[];
  inventory: {
    quantity: number;
    lowStockAlert: number;
    trackInventory: boolean;
  };
  dimensions?: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
  seo: IProductSEO;
  status: 'active' | 'inactive' | 'draft';
  featured: boolean;
  tags: string[];
  vendor?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    subcategory: {
      type: String,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      uppercase: true,
    },
    barcode: {
      type: String,
      unique: true,
      sparse: true,
    },
    pricing: [
      {
        currency: { type: String, required: true },
        price: { type: Number, required: true },
        salePrice: { type: Number },
        costPrice: { type: Number },
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
      },
    ],
    variants: [
      {
        name: { type: String, required: true },
        type: { type: String, enum: ['color', 'size', 'material', 'style'], required: true },
        values: [{ type: String, required: true }],
        price: { type: Number },
        inventory: { type: Number },
        sku: { type: String },
      },
    ],
    inventory: {
      quantity: { type: Number, required: true, default: 0 },
      lowStockAlert: { type: Number, default: 5 },
      trackInventory: { type: Boolean, default: true },
    },
    dimensions: {
      weight: { type: Number },
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: [{ type: String }],
      slug: { type: String, required: true, unique: true },
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'draft'],
      default: 'draft',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [{ type: String }],
    vendor: {
      type: String,
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

ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ sku: 1 });
ProductSchema.index({ 'seo.slug': 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ tags: 1 });

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);