import dbConnect from '@/lib/database';
import { User } from '@/models/User';
import { Product } from '@/models/product/Product';
import { Customer } from '@/models/Customer';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    await dbConnect();
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      email: 'admin@merchokay.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
      permissions: ['all'],
      isActive: true,
    });
    await adminUser.save();
    console.log('Created admin user');

    // Create sample products
    const sampleProducts = [
      {
        name: 'Premium Cotton T-Shirt',
        description: 'High-quality cotton t-shirt perfect for everyday wear',
        shortDescription: 'Comfortable cotton t-shirt',
        category: 'Clothing',
        subcategory: 'T-Shirts',
        sku: 'CT001',
        pricing: [
          { currency: 'INR', price: 999, salePrice: 799 },
          { currency: 'USD', price: 12, salePrice: 10 },
        ],
        images: [
          {
            url: 'https://example.com/tshirt.jpg',
            alt: 'Premium Cotton T-Shirt',
            isPrimary: true,
            order: 0,
          },
        ],
        inventory: {
          quantity: 100,
          lowStockAlert: 10,
          trackInventory: true,
        },
        seo: {
          slug: 'premium-cotton-t-shirt',
          metaTitle: 'Premium Cotton T-Shirt - Comfortable & Stylish',
          metaDescription:
            'Shop our premium cotton t-shirt, perfect for casual wear',
        },
        status: 'active',
        featured: true,
        tags: ['cotton', 'casual', 'premium'],
        createdBy: adminUser._id.toString(),
        updatedBy: adminUser._id.toString(),
      },
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        shortDescription: 'Premium wireless headphones',
        category: 'Electronics',
        subcategory: 'Audio',
        sku: 'WH001',
        pricing: [
          { currency: 'INR', price: 4999, salePrice: 3999 },
          { currency: 'USD', price: 60, salePrice: 48 },
        ],
        images: [
          {
            url: 'https://example.com/headphones.jpg',
            alt: 'Wireless Bluetooth Headphones',
            isPrimary: true,
            order: 0,
          },
        ],
        inventory: {
          quantity: 50,
          lowStockAlert: 5,
          trackInventory: true,
        },
        seo: {
          slug: 'wireless-bluetooth-headphones',
          metaTitle: 'Wireless Bluetooth Headphones - Premium Audio',
          metaDescription:
            'Experience premium audio with our wireless headphones',
        },
        status: 'active',
        featured: false,
        tags: ['wireless', 'audio', 'bluetooth'],
        createdBy: adminUser._id.toString(),
        updatedBy: adminUser._id.toString(),
      },
    ];

    await Product.insertMany(sampleProducts);
    console.log('Created sample products');

    // Create sample customers
    const sampleCustomers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        addresses: [
          {
            type: 'billing',
            isDefault: true,
            name: 'John Doe',
            street: '123 Main Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India',
            zipCode: '400001',
          },
        ],
        preferences: {
          currency: 'INR',
          language: 'en',
          marketingEmails: true,
          smsNotifications: true,
          whatsappUpdates: true,
        },
        tags: ['vip', 'repeat-customer'],
        totalOrders: 5,
        totalSpent: 15000,
        averageOrderValue: 3000,
        acquisitionSource: 'website',
        loyaltyPoints: 150,
        status: 'active',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+91 9876543211',
        addresses: [
          {
            type: 'billing',
            isDefault: true,
            name: 'Jane Smith',
            street: '456 Oak Avenue',
            city: 'Delhi',
            state: 'Delhi',
            country: 'India',
            zipCode: '110001',
          },
        ],
        preferences: {
          currency: 'INR',
          language: 'en',
          marketingEmails: false,
          smsNotifications: true,
          whatsappUpdates: false,
        },
        tags: ['new-customer'],
        totalOrders: 1,
        totalSpent: 999,
        averageOrderValue: 999,
        acquisitionSource: 'social-media',
        loyaltyPoints: 10,
        status: 'active',
      },
    ];

    await Customer.insertMany(sampleCustomers);
    console.log('Created sample customers');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
