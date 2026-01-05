'use client'

import { DollarSign, TrendingUp, Users, CreditCard, ShoppingBag, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export default function RevenuePage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">Revenue Analytics</h1>
                <p className="text-gray-400">Track your revenue metrics and growth</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'MRR', value: '$127,500', change: '+12.5%', icon: DollarSign },
                    { label: 'ARPU', value: '$85', change: '+5.2%', icon: Users },
                    { label: 'LTV', value: '$1,020', change: '+8.1%', icon: TrendingUp },
                ].map((metric) => (
                    <Card key={metric.label} variant="glass">
                        <div className="flex items-center justify-between mb-4">
                            <metric.icon className="text-primary-400" size={32} />
                            <span className="text-sm text-green-400">{metric.change}</span>
                        </div>
                        <div className="text-3xl font-bold gradient-text mb-2">{metric.value}</div>
                        <div className="text-sm text-gray-400">{metric.label}</div>
                    </Card>
                ))}
            </div>

            {/* Revenue Streams */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-6">Revenue Streams</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: 'Subscriptions', amount: '$89,250', percentage: 70, icon: CreditCard },
                        { name: 'Marketplace Sales', amount: '$25,500', percentage: 20, icon: ShoppingBag },
                        { name: 'AI Credits', amount: '$12,750', percentage: 10, icon: Zap },
                    ].map((stream) => (
                        <div key={stream.name} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <stream.icon className="text-primary-400" size={20} />
                                    <span className="font-medium">{stream.name}</span>
                                </div>
                                <span className="text-sm text-gray-400">{stream.percentage}%</span>
                            </div>
                            <div className="text-2xl font-bold">{stream.amount}</div>
                            <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 to-primary-700"
                                    style={{ width: `${stream.percentage}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Customer Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="glass">
                    <h3 className="text-xl font-semibold mb-6">Customer Breakdown</h3>
                    <div className="space-y-4">
                        {[
                            { plan: 'Free', customers: 450, mrr: '$0' },
                            { plan: 'Pro', customers: 850, mrr: '$41,650' },
                            { plan: 'Business', customers: 180, mrr: '$26,820' },
                            { plan: 'Enterprise', customers: 20, mrr: '$9,980' },
                        ].map((tier) => (
                            <div key={tier.plan} className="flex items-center justify-between p-4 glass-dark rounded-xl">
                                <div>
                                    <div className="font-semibold mb-1">{tier.plan}</div>
                                    <div className="text-sm text-gray-400">{tier.customers} customers</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xl font-bold gradient-text">{tier.mrr}</div>
                                    <div className="text-xs text-gray-400">MRR</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card variant="glass">
                    <h3 className="text-xl font-semibold mb-6">Growth Metrics</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'New Customers (30d)', value: '156', change: '+23%' },
                            { label: 'Churn Rate', value: '2.3%', change: '-0.5%' },
                            { label: 'Expansion Revenue', value: '$12,450', change: '+18%' },
                            { label: 'Net Revenue Retention', value: '115%', change: '+5%' },
                        ].map((metric) => (
                            <div key={metric.label} className="flex items-center justify-between">
                                <span className="text-gray-400">{metric.label}</span>
                                <div className="text-right">
                                    <div className="text-xl font-bold">{metric.value}</div>
                                    <div className="text-xs text-green-400">{metric.change}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
