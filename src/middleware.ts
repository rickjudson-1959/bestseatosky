import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  if (host !== 'bestseatosky.com' && host !== 'localhost:3000') {
    const url = new URL(request.url);
    url.host = 'bestseatosky.com';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }
}

export const config = {
  matcher: '/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)',
};
