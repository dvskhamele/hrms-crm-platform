import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if this is an RSC (React Server Component) request
  const isRSC = request.nextUrl.searchParams.get('_rsc') !== null
  
  // Handle API routes that don't exist by returning mock data for RSC requests
  // Skip static files, manifest, and service worker
  const path = request.nextUrl.pathname
  if (isRSC && (
    path.startsWith('/requests/') || 
    path.startsWith('/guests/') || 
    path.startsWith('/staff/') || 
    path.startsWith('/rooms/')
  )) {
    // Return empty mock data for RSC requests to prevent 404 errors
    return new NextResponse(
      JSON.stringify({
        // Return empty arrays or default values for common API responses
        requests: [],
        guests: [],
        staff: [],
        rooms: [],
        applications: [],
        positions: [],
        users: [],
        data: [],
        error: null,
        message: 'Demo data - API not available in prototype mode'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, manifest.json, sw.js (static files)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|manifest\\.json|sw\\.js).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}