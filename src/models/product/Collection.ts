import mongoose, { Schema, Document } from 'mongoose';

export interface ICollection extends Document {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const CollectionSchema = new Schema<ICollection>(
  {
    name: {
      type: String,
      required: [true, 'Collection name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

CollectionSchema.index({ name: 'text', description: 'text' });
CollectionSchema.index({ status: 1 });
CollectionSchema.index({ slug: 1 });

export const Collection =
  mongoose.models.Collection ||
  mongoose.model<ICollection>('Collection', CollectionSchema);
