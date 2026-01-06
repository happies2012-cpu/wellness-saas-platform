'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Users, CreditCard, ShoppingBag, Zap, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Analytics {
    overview: {
        totalRevenue: number
        monthlyRevenue: number
        growth: number
        activeSubscriptions: number
    }
    monthlyData: Array<{
        month: string
        revenue: number
        subscriptions: number
    }>
    planBreakdown: Array<{
        plan: string
        users: number
        revenue: number
    }>
    topCustomers: Array<{
        name: string
        plan: string
        revenue: number
        mrr: number
    }>
    recentTransactions: Array<{
        id: string
        customer: string
        amount: number
        plan: string
        status: string
        date: string
    }>
}

export default function RevenuePage() {
    const [analytics, setAnalytics] = useState<Analytics | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/analytics/revenue')

            if (!response.ok) {
                throw new Error('Failed to fetch analytics')
            }

            const data = await response.json()
            setAnalytics(data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading analytics...</p>
                </div>
            </div>
        )
    }

    if (error || !analytics) {
        return (
            <Card variant="glass" className="text-center py-12">
                <p className="text-red-400 mb-4">{error || 'Failed to load analytics'}</p>
                <Button onClick={fetchAnalytics} variant="default">
                    Try Again
                </Button>
            </Card>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Revenue <span className="gradient-text">Analytics</span>
                    </h1>
                    <p className="text-gray-400">Track your revenue metrics and growth</p>
                </div>
                <Button variant="outline">
                    <Download size={20} className="mr-2" />
                    Export Report
                </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: `₹${analytics.overview.totalRevenue.toLocaleString()}`, change: `+${analytics.overview.growth}%`, icon: DollarSign },
                    { label: 'Monthly Revenue', value: `₹${analytics.overview.monthlyRevenue.toLocaleString()}`, change: '+12.5%', icon: TrendingUp },
                    { label: 'Active Subscriptions', value: analytics.overview.activeSubscriptions, change: '+8.1%', icon: Users },
                    { label: 'ARPU', value: `₹${Math.round(analytics.overview.monthlyRevenue / analytics.overview.activeSubscriptions)}`, change: '+5.2%', icon: CreditCard },
                ].map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover">
                            <div className="flex items-center justify-between mb-4">
                                <metric.icon className="text-primary-400" size={32} />
                                <span className="text-sm text-green-400">{metric.change}</span>
                            </div>
                            <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                            <div className="text-sm text-gray-400">{metric.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Plan Breakdown */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-6">Revenue by Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {analytics.planBreakdown.map((plan, index) => (
                        <motion.div
                            key={plan.plan}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-3"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{plan.plan}</span>
                                <span className="text-sm text-gray-400">{plan.users} users</span>
                            </div>
                            <div className="text-2xl font-bold gradient-text">
                                ₹{plan.revenue.toLocaleString()}
                            </div>
                            <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 to-primary-700"
                                    style={{ width: `${(plan.revenue / analytics.overview.monthlyRevenue) * 100}%` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Top Customers & Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="glass">
                    <h3 className="text-xl font-semibold mb-6">Top Customers</h3>
                    <div className="space-y-4">
                        {analytics.topCustomers.map((customer, index) => (
                            <motion.div
                                key={customer.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                            >
                                <div>
                                    <div className="font-semibold mb-1">{customer.name}</div>
                                    <div className="text-sm text-gray-400">{customer.plan} Plan</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold gradient-text">₹{customer.revenue.toLocaleString()}</div>
                                    <div className="text-xs text-gray-400">₹{customer.mrr}/mo</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>

                <Card variant="glass">
                    <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
                    <div className="space-y-4">
                        {analytics.recentTransactions.map((txn, index) => (
                            <motion.div
                                key={txn.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                            >
                                <div>
                                    <div className="font-medium mb-1">{txn.customer}</div>
                                    <div className="text-sm text-gray-400">{txn.plan} • {new Date(txn.date).toLocaleDateString()}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-green-400">₹{txn.amount}</div>
                                    <div className="text-xs text-gray-400 capitalize">{txn.status}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Monthly Trend */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-6">Monthly Revenue Trend</h3>
                <div className="grid grid-cols-5 gap-4">
                    {analytics.monthlyData.map((month, index) => (
                        <motion.div
                            key={month.month}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="mb-2 text-sm text-gray-400">{month.month}</div>
                            <div className="h-32 bg-dark-200 rounded-lg relative overflow-hidden">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-500 to-primary-700"
                                    style={{ height: `${(month.revenue / 50000) * 100}%` }}
                                />
                            </div>
                            <div className="mt-2 font-bold">₹{(month.revenue / 1000).toFixed(0)}k</div>
                            <div className="text-xs text-gray-400">{month.subscriptions} subs</div>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
