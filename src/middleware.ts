import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session cookie (optimistic check)
  const sessionCookie = getSessionCookie(request);

  // Handle auth routes when user is already authenticated
  if (sessionCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Skip middleware for public routes (root and login when not authenticated)
  const publicRoutes = ['/', '/login'];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

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
