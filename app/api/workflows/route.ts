import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    try {
        const supabase = createClient()

        const { data: workflows, error } = await supabase
            .from('workflows')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10)

        if (error) throw error

        return NextResponse.json({ workflows })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const supabase = createClient()

        const { data: workflow, error } = await supabase
            .from('workflows')
            .insert({
                name: body.name,
                description: body.description,
                trigger_type: body.triggerType,
                status: 'draft',
                created_by: body.userId,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ workflow }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
