import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types/product';

// Mock data using your product images
const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Afrojack - Bringing It Back Premium T-Shirt',
    description:
      "High-quality premium t-shirt featuring Afrojack's latest album artwork. Made from 100% organic cotton with eco-friendly printing.",
    shortDescription: 'Premium Afrojack album t-shirt',
    category: 'Apparel',
    subcategory: 'T-Shirts',
    sku: 'AFRO-BIB-001',
    barcode: '1234567890123',
    pricing: [
      { currency: 'USD', price: 29.99, salePrice: 24.99, costPrice: 12.0 },
      { currency: 'EUR', price: 27.99, salePrice: 22.99, costPrice: 11.0 },
    ],
    images: [
      {
        url: '/productImages/Afrojack-BringingItBack-IMG00.jpg',
        alt: 'Afrojack T-Shirt Front',
        isPrimary: true,
        order: 0,
      },
      {
        url: '/productImages/Afrojack-BringingItBack-IMG01.jpg',
        alt: 'Afrojack T-Shirt Back',
        isPrimary: false,
        order: 1,
      },
      {
        url: '/productImages/Afrojack-BringingItBack-IMG02.jpg',
        alt: 'Afrojack T-Shirt Detail',
        isPrimary: false,
        order: 2,
      },
    ],
    variants: [
      { name: 'Size', type: 'size', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Color', type: 'color', values: ['Black', 'White', 'Navy'] },
    ],
    inventory: { quantity: 150, lowStockAlert: 10, trackInventory: true },
    dimensions: { weight: 0.2, length: 28, width: 20, height: 0.5 },
    seo: {
      metaTitle: 'Afrojack Bringing It Back T-Shirt | Official Merchandise',
      metaDescription:
        'Get the official Afrojack Bringing It Back t-shirt. Premium quality, eco-friendly materials.',
      keywords: [
        'afrojack',
        'edm',
        't-shirt',
        'merchandise',
        'bringing it back',
      ],
      slug: 'afrojack-bringing-it-back-t-shirt',
    },
    status: 'active',
    featured: true,
    tags: ['EDM', 'Music', 'Artist Merch', 'Premium'],
    vendor: 'Afrojack Official',
    collections: ['summer-collection', 'artist-merchandise', 'premium-line'],
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    _id: '2',
    name: 'Limited Edition Vinyl Record Player',
    description:
      'Professional-grade turntable perfect for DJs and music enthusiasts. Features direct drive motor and premium tonearm.',
    shortDescription: 'Professional DJ turntable',
    category: 'Electronics',
    subcategory: 'Audio Equipment',
    sku: 'VINYL-PRO-002',
    barcode: '2345678901234',
    pricing: [
      { currency: 'USD', price: 899.99, costPrice: 450.0 },
      { currency: 'EUR', price: 799.99, costPrice: 400.0 },
    ],
    images: [
      {
        url: '/productImages/Afrojack-BringingItBack-IMG00.jpg',
        alt: 'Turntable Front View',
        isPrimary: true,
        order: 0,
      },
    ],
    inventory: { quantity: 25, lowStockAlert: 5, trackInventory: true },
    seo: {
      metaTitle: 'Professional DJ Turntable | Limited Edition',
      metaDescription:
        'Professional-grade vinyl record player for DJs and audiophiles.',
      keywords: ['turntable', 'dj', 'vinyl', 'professional', 'audio'],
      slug: 'limited-edition-vinyl-turntable',
    },
    status: 'active',
    featured: false,
    tags: ['DJ Equipment', 'Vinyl', 'Professional', 'Limited Edition'],
    vendor: 'ProAudio Systems',
    collections: ['dj-equipment', 'professional-audio'],
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    _id: '3',
    name: 'Festival Glow Sticks Pack',
    description:
      'Pack of 50 premium LED glow sticks perfect for concerts, festivals, and parties. Multiple colors and effects.',
    shortDescription: 'LED glow sticks party pack',
    category: 'Accessories',
    subcategory: 'Party Supplies',
    sku: 'GLOW-FEST-003',
    pricing: [
      { currency: 'USD', price: 19.99, salePrice: 14.99, costPrice: 8.0 },
    ],
    images: [
      {
        url: '/productImages/Afrojack-BringingItBack-IMG01.jpg',
        alt: 'Glow Sticks Pack',
        isPrimary: true,
        order: 0,
      },
    ],
    inventory: { quantity: 0, lowStockAlert: 20, trackInventory: true },
    seo: {
      metaTitle: 'LED Glow Sticks Pack | Festival Party Supplies',
      metaDescription:
        'Premium LED glow sticks for festivals, concerts, and parties.',
      keywords: ['glow sticks', 'festival', 'party', 'led', 'concert'],
      slug: 'festival-led-glow-sticks-pack',
    },
    status: 'active',
    featured: false,
    tags: ['Festival', 'Party', 'LED', 'Accessories'],
    vendor: 'Party Lights Co',
    collections: ['festival-gear', 'party-supplies'],
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    _id: '4',
    name: 'Draft Headphones Prototype',
    description:
      'Noise-cancelling wireless headphones with premium sound quality. Still in development phase.',
    shortDescription: 'Premium wireless headphones (Draft)',
    category: 'Electronics',
    subcategory: 'Headphones',
    sku: 'HEAD-DRAFT-004',
    pricing: [{ currency: 'USD', price: 299.99, costPrice: 150.0 }],
    images: [
      {
        url: '/productImages/Afrojack-BringingItBack-IMG02.jpg',
        alt: 'Headphones Prototype',
        isPrimary: true,
        order: 0,
      },
    ],
    inventory: { quantity: 5, lowStockAlert: 2, trackInventory: true },
    seo: {
      metaTitle: 'Premium Wireless Headphones | Coming Soon',
      metaDescription:
        'Noise-cancelling wireless headphones with premium sound quality.',
      keywords: ['headphones', 'wireless', 'noise-cancelling', 'premium'],
      slug: 'premium-wireless-headphones-draft',
    },
    status: 'draft',
    featured: false,
    tags: ['Headphones', 'Wireless', 'Premium', 'Prototype'],
    vendor: 'AudioTech Innovation',
    collections: ['electronics', 'coming-soon'],
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    _id: '5',
    name: 'Archived Vintage Speaker Set',
    description:
      'Classic vintage speakers that are no longer in production. Kept for historical reference.',
    shortDescription: 'Vintage speaker set (Archived)',
    category: 'Electronics',
    subcategory: 'Speakers',
    sku: 'SPEAK-ARCH-005',
    pricing: [{ currency: 'USD', price: 199.99, costPrice: 100.0 }],
    images: [
      {
        url: '/productImages/Afrojack-BringingItBack-IMG00.jpg',
        alt: 'Vintage Speakers',
        isPrimary: true,
        order: 0,
      },
    ],
    inventory: { quantity: 2, lowStockAlert: 1, trackInventory: false },
    seo: {
      metaTitle: 'Vintage Speaker Set | Archived Product',
      metaDescription: 'Classic vintage speakers no longer in production.',
      keywords: ['vintage', 'speakers', 'classic', 'archived'],
      slug: 'vintage-speaker-set-archived',
    },
    status: 'archived',
    featured: false,
    tags: ['Vintage', 'Speakers', 'Classic', 'Rare'],
    vendor: 'Retro Audio Co',
    collections: ['vintage-electronics', 'archived-products'],
    createdBy: 'admin',
    updatedBy: 'admin',
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

const mockCollections = [
  { _id: 'summer-collection', name: 'Summer Collection', status: 'active' },
  { _id: 'artist-merchandise', name: 'Artist Merchandise', status: 'active' },
  { _id: 'premium-line', name: 'Premium Line', status: 'active' },
  { _id: 'dj-equipment', name: 'DJ Equipment', status: 'active' },
  { _id: 'professional-audio', name: 'Professional Audio', status: 'active' },
  { _id: 'festival-gear', name: 'Festival Gear', status: 'active' },
  { _id: 'party-supplies', name: 'Party Supplies', status: 'active' },
  { _id: 'electronics', name: 'Electronics', status: 'active' },
  { _id: 'coming-soon', name: 'Coming Soon', status: 'active' },
  { _id: 'vintage-electronics', name: 'Vintage Electronics', status: 'active' },
  { _id: 'archived-products', name: 'Archived Products', status: 'inactive' },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  let filteredProducts = mockProducts;

  // Filter by status
  if (status && status !== 'all') {
    filteredProducts = filteredProducts.filter(
      product => product.status === status
    );
  }

  // Search functionality
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.sku.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.vendor?.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    let aValue: string | number | Date;
    let bValue: string | number | Date;

    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'inventory.quantity':
        aValue = a.inventory.quantity;
        bValue = b.inventory.quantity;
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'vendor':
        aValue = a.vendor || '';
        bValue = b.vendor || '';
        break;
      case 'updatedAt':
        aValue = new Date(a.updatedAt);
        bValue = new Date(b.updatedAt);
        break;
      default:
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
    }

    if (typeof aValue === 'string') {
      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    } else {
      return sortOrder === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }
  });

  // Calculate total before pagination
  const total = filteredProducts.length;

  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return NextResponse.json({
    products: paginatedProducts,
    collections: mockCollections,
    total: total,
    page: page,
    limit: limit,
    totalPages: Math.ceil(total / limit),
  });
}
