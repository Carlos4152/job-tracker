import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
];
const privateRoutes = ['/jobs', '/jobs/new'];

export async function proxy(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      secureCookie:
        process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') ??
        process.env.NODE_ENV === 'production',
    });

    const { pathname } = request.nextUrl;

    const isProtectedRoute = privateRoutes.some((route) =>
      pathname.startsWith(route),
    );

    const isPublicRoute = publicRoutes.includes(pathname);

    // Redirect to login if accessing protected route without auth
    if (isProtectedRoute && !token) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }

    // Redirect to dashboard if accessing auth routes while authenticated
    if (isPublicRoute && token) {
      return NextResponse.redirect(new URL('/jobs', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
