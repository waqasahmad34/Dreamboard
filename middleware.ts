import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // Basic authentication check
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      // Authentication successful, continue with existing logic

      // With basePath, the root path is already /your-dreamboard-results
      // No redirect needed as the app is configured to run under this path

      return NextResponse.next();
    }
  }

  // Authentication failed or missing
  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|public|fonts|images).*)',
  ],
};
