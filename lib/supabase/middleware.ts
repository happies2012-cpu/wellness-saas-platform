import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function createClient(request: NextRequest) {
    const response = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res: response })
    return { supabase, response }
}
