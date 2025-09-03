"use client"

import { useAuth } from "@/hooks/useAuth"
import { AdminRole } from "@/types/user"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  roles?: AdminRole | AdminRole[]
  permissions?: string | string[]
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  roles, 
  permissions, 
  fallback 
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, hasRole, hasPermission } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading...</span>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback || (
      <Alert variant="destructive">
        <AlertDescription>You need to be logged in to access this page.</AlertDescription>
      </Alert>
    )
  }

  // Check roles
  if (roles && !hasRole(roles)) {
    return fallback || (
      <Alert variant="destructive">
        <AlertDescription>You don&apos;t have the required role to access this page.</AlertDescription>
      </Alert>
    )
  }

  // Check permissions
  if (permissions) {
    const requiredPermissions = Array.isArray(permissions) ? permissions : [permissions]
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    )
    
    if (!hasAllPermissions) {
      return fallback || (
        <Alert variant="destructive">
          <AlertDescription>You don&apos;t have the required permissions to access this page.</AlertDescription>
        </Alert>
      )
    }
  }

  return <>{children}</>
}