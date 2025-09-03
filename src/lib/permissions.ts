import { AdminRole } from '@/types/user';

export const PERMISSIONS = {
  // User Management
  USERS_VIEW: 'users.view',
  USERS_CREATE: 'users.create',
  USERS_EDIT: 'users.edit',
  USERS_DELETE: 'users.delete',

  // Product Management
  PRODUCTS_VIEW: 'products.view',
  PRODUCTS_CREATE: 'products.create',
  PRODUCTS_EDIT: 'products.edit',
  PRODUCTS_DELETE: 'products.delete',

  // Order Management
  ORDERS_VIEW: 'orders.view',
  ORDERS_CREATE: 'orders.create',
  ORDERS_EDIT: 'orders.edit',
  ORDERS_DELETE: 'orders.delete',
  ORDERS_FULFILL: 'orders.fulfill',

  // Customer Management
  CUSTOMERS_VIEW: 'customers.view',
  CUSTOMERS_CREATE: 'customers.create',
  CUSTOMERS_EDIT: 'customers.edit',
  CUSTOMERS_DELETE: 'customers.delete',

  // Analytics & Reports
  ANALYTICS_VIEW: 'analytics.view',
  REPORTS_VIEW: 'reports.view',
  REPORTS_EXPORT: 'reports.export',

  // Settings
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_EDIT: 'settings.edit',

  // Marketing
  MARKETING_VIEW: 'marketing.view',
  MARKETING_CREATE: 'marketing.create',
  MARKETING_EDIT: 'marketing.edit',

  // Payments
  PAYMENTS_VIEW: 'payments.view',
  PAYMENTS_PROCESS: 'payments.process',
  PAYMENTS_REFUND: 'payments.refund',
} as const;

export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  admin: ['all'], // Admin has access to everything
  
  manager: [
    // Product Management
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_EDIT,
    PERMISSIONS.PRODUCTS_DELETE,
    
    // Order Management
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.ORDERS_CREATE,
    PERMISSIONS.ORDERS_EDIT,
    PERMISSIONS.ORDERS_FULFILL,
    
    // Customer Management
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_CREATE,
    PERMISSIONS.CUSTOMERS_EDIT,
    
    // Analytics & Reports
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    
    // Marketing
    PERMISSIONS.MARKETING_VIEW,
    PERMISSIONS.MARKETING_CREATE,
    PERMISSIONS.MARKETING_EDIT,
    
    // Payments
    PERMISSIONS.PAYMENTS_VIEW,
    PERMISSIONS.PAYMENTS_PROCESS,
    PERMISSIONS.PAYMENTS_REFUND,
  ],
  
  editor: [
    // Product Management
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_EDIT,
    
    // Order Management (limited)
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.ORDERS_EDIT,
    
    // Customer Management (limited)
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_EDIT,
    
    // Marketing
    PERMISSIONS.MARKETING_VIEW,
    PERMISSIONS.MARKETING_CREATE,
    PERMISSIONS.MARKETING_EDIT,
  ],
  
  accounts: [
    // Order Management
    PERMISSIONS.ORDERS_VIEW,
    PERMISSIONS.ORDERS_EDIT,
    PERMISSIONS.ORDERS_FULFILL,
    
    // Customer Management
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_EDIT,
    
    // Analytics & Reports (financial focus)
    PERMISSIONS.ANALYTICS_VIEW,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
    
    // Payments
    PERMISSIONS.PAYMENTS_VIEW,
    PERMISSIONS.PAYMENTS_PROCESS,
    PERMISSIONS.PAYMENTS_REFUND,
  ],
};

export function getUserPermissions(role: AdminRole): string[] {
  return ROLE_PERMISSIONS[role] || [];
}