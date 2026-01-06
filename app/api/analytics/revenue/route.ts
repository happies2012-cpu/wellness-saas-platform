// Revenue Analytics API
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        // TODO: Fetch real analytics data from database
        // This is mock data for now
        const analytics = {
            overview: {
                totalRevenue: 125000,
                monthlyRevenue: 45000,
                growth: 23.5,
                activeSubscriptions: 156,
            },
            monthlyData: [
                { month: 'Jan', revenue: 32000, subscriptions: 120 },
                { month: 'Feb', revenue: 35000, subscriptions: 128 },
                { month: 'Mar', revenue: 38000, subscriptions: 135 },
                { month: 'Apr', revenue: 42000, subscriptions: 145 },
                { month: 'May', revenue: 45000, subscriptions: 156 },
            ],
            planBreakdown: [
                { plan: 'Free', users: 450, revenue: 0 },
                { plan: 'Pro', users: 89, revenue: 4361 },
                { plan: 'Business', users: 45, revenue: 6705 },
                { plan: 'Enterprise', users: 22, revenue: 10978 },
            ],
            topCustomers: [
                { name: 'Acme Corp', plan: 'Enterprise', revenue: 4990, mrr: 499 },
                { name: 'TechStart Inc', plan: 'Business', revenue: 1490, mrr: 149 },
                { name: 'Design Studio', plan: 'Pro', revenue: 490, mrr: 49 },
            ],
            recentTransactions: [
                {
                    id: 'txn_001',
                    customer: 'john@acme.com',
                    amount: 499,
                    plan: 'Enterprise',
                    status: 'completed',
                    date: new Date().toISOString(),
                },
                {
                    id: 'txn_002',
                    customer: 'sarah@techstart.com',
                    amount: 149,
                    plan: 'Business',
                    status: 'completed',
                    date: new Date(Date.now() - 86400000).toISOString(),
                },
                {
                    id: 'txn_003',
                    customer: 'mike@design.com',
                    amount: 49,
                    plan: 'Pro',
                    status: 'completed',
                    date: new Date(Date.now() - 172800000).toISOString(),
                },
            ],
        }

        return NextResponse.json(analytics)
    } catch (error: any) {
        console.error('Analytics fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch analytics data' },
            { status: 500 }
        )
    }
}
