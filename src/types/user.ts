// Admin Dashboard User types
export type AdminRole = 'admin' | 'manager' | 'editor' | 'accounts';

export interface AdminUser {
  _id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminSession {
  user: AdminUser;
  token: string;
  expiresAt: Date;
}
