// Email verification API endpoint
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            )
        }

        const supabase = createClient()

        // Send verification email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email`,
        })

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Verification email sent successfully',
        })
    } catch (error: any) {
        console.error('Email verification error:', error)
        return NextResponse.json(
            { error: 'Failed to send verification email' },
            { status: 500 }
        )
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const token = searchParams.get('token')

        if (!token) {
            return NextResponse.json(
                { error: 'Token is required' },
                { status: 400 }
            )
        }

        const supabase = createClient()

        // Verify the token
        const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'email',
        })

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
        })
    } catch (error: any) {
        console.error('Email verification error:', error)
        return NextResponse.json(
            { error: 'Failed to verify email' },
            { status: 500 }
        )
    }
}
