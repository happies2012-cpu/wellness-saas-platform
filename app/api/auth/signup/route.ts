import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const { email, password, fullName, role, workspaceName } = await request.json()

        const supabase = createClient()

        // Create user account
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })

        if (authError) {
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            )
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            )
        }

        // Create workspace
        const { data: workspace, error: workspaceError } = await supabase
            .from('workspaces')
            .insert({
                name: workspaceName,
                slug: workspaceName.toLowerCase().replace(/\s+/g, '-'),
                owner_id: authData.user.id,
            })
            .select()
            .single()

        if (workspaceError) {
            return NextResponse.json(
                { error: 'Failed to create workspace' },
                { status: 500 }
            )
        }

        // Create user profile
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: authData.user.id,
                email,
                full_name: fullName,
                role,
                workspace_id: workspace.id,
            })

        if (profileError) {
            return NextResponse.json(
                { error: 'Failed to create profile' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            user: authData.user,
            workspace,
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
