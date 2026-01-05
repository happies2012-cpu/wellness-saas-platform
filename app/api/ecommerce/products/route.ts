import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
    try {
        const supabase = createClient()

        const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json({ products })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const supabase = createClient()

        const { data: product, error } = await supabase
            .from('products')
            .insert({
                name: body.name,
                description: body.description,
                price: body.price,
                type: body.type,
                status: 'active',
                workspace_id: body.workspaceId,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ product }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
