import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    try {
        const supabase = createClient()

        const { data: agents, error } = await supabase
            .from('ai_agents')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json({ agents })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const supabase = createClient()

        const { data: agent, error } = await supabase
            .from('ai_agents')
            .insert({
                name: body.name,
                role: body.role,
                model: body.model || 'gpt-4',
                status: 'idle',
                workspace_id: body.workspaceId,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ agent }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
