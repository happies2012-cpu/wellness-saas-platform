import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/platform', '/workflows', '/ai-agents', '/workforce', '/pricing', '/about', '/blog']
const authRoutes = ['/login', '/signup', '/forgot-password']

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Allow public routes
    if (publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next()
    }

    // Check for auth token
    const token = request.cookies.get('sb-access-token')

    // Redirect to login if no token and trying to access protected route
    if (!token && !authRoutes.some(route => pathname.startsWith(route))) {
        const url = new URL('/login', request.url)
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
    }

    // Redirect to dashboard if logged in and trying to access auth routes
    if (token && authRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
