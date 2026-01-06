// Password reset API endpoint
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const { email, newPassword, token } = await request.json()

        const supabase = createClient()

        // If token is provided, update password
        if (token && newPassword) {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            })

            if (error) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                )
            }

            return NextResponse.json({
                success: true,
                message: 'Password updated successfully',
            })
        }

        // Otherwise, send reset email
        if (email) {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
            })

            if (error) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                )
            }

            return NextResponse.json({
                success: true,
                message: 'Password reset email sent successfully',
            })
        }

        return NextResponse.json(
            { error: 'Email or token is required' },
            { status: 400 }
        )
    } catch (error: any) {
        console.error('Password reset error:', error)
        return NextResponse.json(
            { error: 'Failed to process password reset' },
            { status: 500 }
        )
    }
}
