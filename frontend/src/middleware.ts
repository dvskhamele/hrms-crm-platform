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
    path.startsWith('/rooms/') ||
    path.startsWith('/api/bench-list')
  )) {
    // Return appropriate mock data for RSC requests to prevent 404 errors
    let responseData = {
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
    };

    // Special handling for bench-related API routes
    if (path.includes('/api/bench-list')) {
      responseData = {
        benchResources: [
          { id: '1', name: 'John Smith', skill: 'React, Node.js', experience: 5, status: 'Available', department: 'Technology', lastUpdated: '2025-10-26' },
          { id: '2', name: 'Jane Doe', skill: 'Python, Django', experience: 4, status: 'Available', department: 'Technology', lastUpdated: '2025-10-25' },
          { id: '3', name: 'Robert Johnson', skill: 'Java, Spring', experience: 7, status: 'In Training', department: 'Technology', lastUpdated: '2025-10-24' },
          { id: '4', name: 'Emily Davis', skill: 'React Native', experience: 3, status: 'Available', department: 'Mobile', lastUpdated: '2025-10-23' },
          { id: '5', name: 'Michael Wilson', skill: 'DevOps, AWS', experience: 6, status: 'On Project', department: 'Technology', lastUpdated: '2025-10-22' },
        ],
        message: 'Demo data - Bench API not available in prototype mode'
      };
    }
    
    return new NextResponse(
      JSON.stringify(responseData),
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