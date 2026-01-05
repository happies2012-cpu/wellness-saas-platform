import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    try {
        const supabase = createClient()

        const { data: leads, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20)

        if (error) throw error

        return NextResponse.json({ leads })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const supabase = createClient()

        const { data: lead, error } = await supabase
            .from('leads')
            .insert({
                name: body.name,
                email: body.email,
                company: body.company,
                status: body.status || 'new',
                value: body.value,
                workspace_id: body.workspaceId,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ lead }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
