import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')
  const refreshToken = request.cookies.get('refresh_token')
  const { pathname } = request.nextUrl

  // Nếu đang ở trang login/register và đã có token -> redirect về dashboard
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Nếu vào các route protected mà chưa có token -> redirect về login
  if (pathname.startsWith('/dashboard') && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
}
