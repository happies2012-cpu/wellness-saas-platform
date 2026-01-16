import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
    try {
        const supabase = createClient()

        const { data: metrics, error } = await supabase
            .from('revenue_metrics')
            .select('date, amount')
            .order('date', { ascending: true })
            .limit(30)

        if (error) {
            console.error('Revenue fetch error:', error)
            // Fallback to mock data if table doesn't exist or is empty (dev experience)
            return NextResponse.json({
                data: [
                    { date: '2024-01-01', amount: 1200 },
                    { date: '2024-01-02', amount: 2100 },
                    { date: '2024-01-03', amount: 1800 },
                    { date: '2024-01-04', amount: 3200 },
                    { date: '2024-01-05', amount: 2800 },
                    { date: '2024-01-06', amount: 4500 },
                    { date: '2024-01-07', amount: 3800 },
                ],
                isMock: true
            })
        }

        return NextResponse.json({ data: metrics, isMock: false })
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
