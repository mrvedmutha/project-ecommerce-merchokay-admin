export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductPricing {
  currency: string;
  price: number;
  salePrice?: number;
  costPrice?: number;
}

export interface ProductVariant {
  name: string;
  type: 'color' | 'size' | 'material' | 'style';
  values: string[];
  price?: number;
  inventory?: number;
  sku?: string;
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  slug: string;
}

export interface ProductInventory {
  quantity: number;
  lowStockAlert: number;
  trackInventory: boolean;
}

export interface ProductDimensions {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  category: string;
  subcategory?: string;
  sku: string;
  barcode?: string;
  pricing: ProductPricing[];
  images: ProductImage[];
  variants?: ProductVariant[];
  inventory: ProductInventory;
  dimensions?: ProductDimensions;
  seo: ProductSEO;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  tags: string[];
  vendor?: string;
  collections?: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  slug: string;
  parentCategory?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export type ProductStatus = 'active' | 'draft' | 'archived';
export type ProductStatusFilter = ProductStatus | 'all';
export type ProductSortField =
  | 'name'
  | 'createdAt'
  | 'updatedAt'
  | 'inventory.quantity'
  | 'category'
  | 'vendor';
export type SortOrder = 'asc' | 'desc';

export interface ProductFilters {
  status?: ProductStatusFilter;
  search?: string;
  sortBy?: ProductSortField;
  sortOrder?: SortOrder;
}
