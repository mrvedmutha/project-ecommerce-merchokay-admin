import { createAuthClient } from "better-auth/react"
import { AdminRole } from "@/types/user"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: AdminRole
  permissions: string[]
  isActive: boolean
  lastLogin?: Date
}

export const authClient = createAuthClient({
  baseURL: process.env.AUTH_URL || "http://localhost:3000",
})