// Admin Dashboard Role Enums
export enum AdminRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  EDITOR = 'editor',
  ACCOUNTS = 'accounts',
}

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  [AdminRole.ADMIN]: ['all'],
  [AdminRole.MANAGER]: [
    'products.read',
    'products.write',
    'orders.read',
    'orders.write',
    'customers.read',
    'customers.write',
    'analytics.read',
    'marketing.read',
    'marketing.write',
  ],
  [AdminRole.EDITOR]: [
    'products.read',
    'products.write',
    'customers.read',
    'marketing.read',
  ],
  [AdminRole.ACCOUNTS]: [
    'orders.read',
    'customers.read',
    'analytics.read',
    'payments.read',
    'payments.write',
  ],
} as const;
