'use client';

import { useState, useEffect } from 'react';
import { AdminRole } from '@/types/user';
import { authClient } from '@/lib/auth-client';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // Get session from BetterAuth (custom fields are already in user object)
    const getSession = async () => {
      try {
        const response = await authClient.getSession();
        if (response.data?.user) {
          const sessionUser = response.data.user as Record<string, unknown>;

          const userData: AuthUser = {
            id: sessionUser.id as string,
            email: sessionUser.email as string,
            name: sessionUser.name as string,
            role: (sessionUser.role as AdminRole) || 'editor',
            permissions: (sessionUser.permissions as string[]) || [],
            isActive: (sessionUser.isActive as boolean) ?? true,
            lastLogin: sessionUser.lastLogin as Date,
          };
          setUser(userData);
        }
      } catch (err) {
        console.error('Session check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();
  }, []);

  const signOut = async () => {
    try {
      await authClient.signOut();
      setUser(null);
      window.location.href = '/login';
    } catch (err) {
      console.error('Sign out failed:', err);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in with BetterAuth client...');

      const result = await authClient.signIn.email({
        email,
        password,
      });

      console.log('BetterAuth sign in result:', result);

      // Check if the result contains an error
      if (result.error) {
        console.error('BetterAuth sign in error:', result.error);
        return { error: result.error };
      }

      if (result.data?.user) {
        const signInUser = result.data.user as Record<string, unknown>;
        const userData: AuthUser = {
          id: signInUser.id as string,
          email: signInUser.email as string,
          name: signInUser.name as string,
          role: (signInUser.role as AdminRole) || 'editor',
          permissions: (signInUser.permissions as string[]) || [],
          isActive: (signInUser.isActive as boolean) ?? true,
          lastLogin: signInUser.lastLogin as Date,
        };
        setUser(userData);
        return { success: true, data: result.data };
      }

      return { error: { message: 'Login failed - no user data received' } };
    } catch (err: unknown) {
      console.error('Sign in failed:', err);

      // Parse BetterAuth error messages
      let errorMessage = 'Login failed';

      if (err instanceof Error) {
        if (err.message.includes('Invalid password')) {
          errorMessage = 'Invalid email or password';
        } else if (err.message.includes('User not found')) {
          errorMessage = 'Invalid email or password';
        } else if (err.message.includes('Account is not active')) {
          errorMessage = 'Your account has been deactivated';
        } else {
          errorMessage = err.message;
        }
      }

      return { error: { message: errorMessage } };
    }
  };

  const hasPermission = (permission: string) => {
    if (!user?.permissions) return false;
    return (
      user.permissions.includes(permission) || user.permissions.includes('all')
    );
  };

  const hasRole = (role: AdminRole | AdminRole[]) => {
    if (!user?.role) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    signOut,
    signIn,
    hasPermission,
    hasRole,
    isAdmin,
  };
}
