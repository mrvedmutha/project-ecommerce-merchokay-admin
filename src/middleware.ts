import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  // For now, we'll handle auth client-side
  // TODO: Implement proper session checking when BetterAuth supports edge runtime
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}