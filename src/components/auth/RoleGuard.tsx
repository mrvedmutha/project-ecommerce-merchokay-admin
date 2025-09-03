"use client"

import { useAuth } from "@/hooks/useAuth"
import { AdminRole } from "@/types/user"

interface RoleGuardProps {
  children: React.ReactNode
  roles?: AdminRole | AdminRole[]
  permissions?: string | string[]
  fallback?: React.ReactNode
}

export function RoleGuard({ 
  children, 
  roles, 
  permissions, 
  fallback = null 
}: RoleGuardProps) {
  const { hasRole, hasPermission } = useAuth()

  // Check roles
  if (roles && !hasRole(roles)) {
    return <>{fallback}</>
  }

  // Check permissions
  if (permissions) {
    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions]
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    )
    
    if (!hasAllPermissions) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}