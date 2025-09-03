"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbNav() {
  const pathname = usePathname()
  
  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean)
    
    if (segments.length === 0 || (segments.length === 1 && segments[0] === "dashboard")) {
      return [{ label: "Home", href: "/dashboard", isActive: true }]
    }

    const breadcrumbs = [
      { label: "Home", href: "/dashboard", isActive: false }
    ]

    let currentPath = ""
    segments.forEach((segment, index) => {
      if (segment === "dashboard") return
      
      currentPath += `/${segment}`
      const fullPath = `/dashboard${currentPath}`
      const isLast = index === segments.length - 1
      
      // Format segment name
      const label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      breadcrumbs.push({
        label,
        href: fullPath,
        isActive: isLast
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            <BreadcrumbItem>
              {crumb.isActive ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href} className="flex items-center">
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {crumb.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}