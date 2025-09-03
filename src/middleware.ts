import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  const publicRoutes = ['/', '/login'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for session cookie (optimistic check)
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    // Redirect to login if no session cookie found
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
