"use client"

import { useState, useEffect } from "react"
import { AdminRole } from "@/types/user"

interface AuthUser {
  id: string
  email: string
  name: string
  role: AdminRole
  permissions: string[]
  isActive: boolean
  lastLogin?: Date
}

export function useAuth() {
  // Mock authentication for now - replace with actual BetterAuth implementation
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Mock user for demonstration
    setUser({
      id: "1",
      email: "admin@merchokay.com",
      name: "Admin User",
      role: "admin",
      permissions: ["all"],
      isActive: true,
    })
  }, [])

  const signOut = async () => {
    setUser(null)
    // Redirect to login
    window.location.href = "/login"
  }

  const hasPermission = (permission: string) => {
    if (!user?.permissions) return false
    return user.permissions.includes(permission) || 
           user.permissions.includes('all')
  }

  const hasRole = (role: AdminRole | AdminRole[]) => {
    if (!user?.role) return false
    if (Array.isArray(role)) {
      return role.includes(user.role)
    }
    return user.role === role
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    signOut,
    hasPermission,
    hasRole,
    isAdmin,
  }
}