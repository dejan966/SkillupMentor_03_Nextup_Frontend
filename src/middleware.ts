import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const access_token = request.cookies.get('access_token')

  if (access_token === undefined) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/me/:path*', '/admin', '/events/add', '/events/:id/edit'],
}
