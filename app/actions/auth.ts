'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    redirect('/dashboard')
}

export async function signup(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as string
    const workspaceName = formData.get('workspaceName') as string

    const supabase = createClient()
    const adminSoup = createAdminClient()

    // 1. Sign Up User (sets session cookie)
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
        return { error: authError.message }
    }

    const userId = authData.user?.id
    if (!userId) {
        return { error: 'Failed to create user' }
    }

    // 2. Insert Profile (Admin Bypass)
    const { error: profileError } = await adminSoup
        .from('profiles')
        .insert({
            id: userId,
            email,
            full_name: fullName,
            role: role || 'viewer', // Default or chosen role
        })

    if (profileError) {
        console.error('Profile Error', profileError)
        // Attempt rollback/delete user? For now just return error
        return { error: 'Failed to create profile: ' + profileError.message }
    }

    // 3. Create Workspace
    const { data: workspaceData, error: workspaceError } = await adminSoup
        .from('workspaces')
        .insert({
            name: workspaceName,
            owner_id: userId,
        })
        .select()
        .single()

    if (workspaceError) {
        console.error('Workspace Error', workspaceError)
        return { error: 'Failed to create workspace' }
    }

    // 4. Add Member (Owner)
    const { error: memberError } = await adminSoup
        .from('workspace_members')
        .insert({
            workspace_id: workspaceData.id,
            user_id: userId,
            role: 'admin', // Owner is admin of workspace
        })

    if (memberError) {
        console.error('Member Error', memberError)
        return { error: 'Failed to add owner to workspace' }
    }

    redirect('/dashboard')
}
