import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { UserRole, canAccessRoute } from '@/lib/rbac/permissions'

// Protected routes that require authentication
const protectedRoutes = [
    '/dashboard',
    '/workflows',
    '/ai',
    '/crm',
    '/ecommerce',
    '/revenue',
    '/settings',
]

// Public routes that don't require authentication
const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/about',
    '/platform',
    '/pricing',
]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isPublicRoute = publicRoutes.some(route => pathname === route)

    // Allow public routes
    if (isPublicRoute) {
        return NextResponse.next()
    }

    // Check authentication for protected routes
    if (isProtectedRoute) {
        // Check if Supabase is configured
        const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        // If Supabase not configured, allow access (development mode)
        if (!hasSupabaseConfig) {
            console.warn('Supabase not configured - allowing route access')
            const response = NextResponse.next()
            response.headers.set('x-user-role', 'super_admin') // Default to super admin in dev
            return response
        }

        try {
            const supabase = createClient()
            const { data: { session }, error } = await supabase.auth.getSession()

            if (error || !session) {
                // Redirect to login if not authenticated
                const loginUrl = new URL('/login', request.url)
                loginUrl.searchParams.set('redirect', pathname)
                return NextResponse.redirect(loginUrl)
            }

            // Get user profile with role
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single()

            // If profile doesn't exist or error, allow access with default role
            if (profileError || !profile) {
                console.warn('Profile not found, allowing access with viewer role')
                const response = NextResponse.next()
                response.headers.set('x-user-id', session.user.id)
                response.headers.set('x-user-role', 'viewer')
                return response
            }

            // Check role-based access
            const userRole = profile.role as UserRole
            if (!canAccessRoute(userRole, pathname)) {
                // Redirect to dashboard if user doesn't have permission
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }

            // Add user info to headers for use in pages
            const response = NextResponse.next()
            response.headers.set('x-user-id', session.user.id)
            response.headers.set('x-user-role', userRole)

            return response
        } catch (error) {
            console.error('Middleware error:', error)
            // Allow access on error instead of redirecting
            const response = NextResponse.next()
            response.headers.set('x-user-role', 'viewer')
            return response
        }
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
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
    ],
}
