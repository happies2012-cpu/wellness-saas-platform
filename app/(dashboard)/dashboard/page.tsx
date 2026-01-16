'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Workflow, DollarSign, Bot, Package, MessageSquare, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const stats = [
    { label: 'Monthly Revenue', value: '$12,450', change: '+23%', icon: DollarSign, color: 'text-green-400' },
    { label: 'Active Workflows', value: '47', change: '+12%', icon: Workflow, color: 'text-blue-400' },
    { label: 'AI Agents', value: '12', change: '+5', icon: Bot, color: 'text-purple-400' },
    { label: 'Team Members', value: '24', change: '+3', icon: Users, color: 'text-orange-400' },
]

const recentActivity = [
    { type: 'workflow', title: 'New workflow published', time: '2 hours ago', icon: Workflow },
    { type: 'order', title: 'Order #1234 completed', time: '3 hours ago', icon: Package },
    { type: 'message', title: 'New customer message', time: '5 hours ago', icon: MessageSquare },
    { type: 'ai', title: 'AI agent completed 15 tasks', time: '6 hours ago', icon: Bot },
]

const quickActions = [
    { label: 'Create Workflow', href: '/workflows', icon: Workflow, color: 'from-blue-500 to-blue-700' },
    { label: 'Add Product', href: '/ecommerce', icon: Package, color: 'from-green-500 to-green-700' },
    { label: 'New AI Agent', href: '/ai', icon: Bot, color: 'from-purple-500 to-purple-700' },
    { label: 'View CRM', href: '/crm', icon: Zap, color: 'from-orange-500 to-orange-700' },
]

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [revenueData, setRevenueData] = useState<any[]>([])
    const supabase = createClientComponentClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setIsLoading(false)
        }

        const getRevenue = async () => {
            try {
                const res = await fetch('/api/analytics/revenue')
                const data = await res.json()
                if (data.data) setRevenueData(data.data)
            } catch (err) {
                console.error(err)
            }
        }

        getUser()
        getRevenue()
    }, [supabase])

    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Brand Owner'

    // Simple bar chart calculation
    const maxRevenue = Math.max(...revenueData.map(d => Number(d.amount)), 1)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    Welcome back, <span className="text-secondary-400">
                        {isLoading ? '...' : displayName}
                    </span>
                </h1>
                <p className="text-primary-400">Here&apos;s what&apos;s happening with your business today</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color === 'text-green-400' ? 'from-green-500/20 to-green-700/20' : stat.color === 'text-blue-400' ? 'from-blue-500/20 to-blue-700/20' : stat.color === 'text-purple-400' ? 'from-purple-500/20 to-purple-700/20' : 'from-orange-500/20 to-orange-700/20'} flex items-center justify-center`}>
                                    <stat.icon className={stat.color} size={24} />
                                </div>
                                <span className="text-sm font-medium text-green-400">{stat.change}</span>
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-primary-400 group-hover:text-primary-300 transition-colors">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-primary-100">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <Link key={action.label} href={action.href}>
                            <Card variant="glass" className="card-hover cursor-pointer p-6">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4`}>
                                    <action.icon className="text-white" size={24} />
                                </div>
                                <div className="font-semibold text-lg">{action.label}</div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity & Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card variant="glass">
                    <h2 className="text-xl font-semibold mb-6 text-primary-100">Recent Activity</h2>
                    <div className="space-y-6">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-lg bg-surface-700 flex items-center justify-center">
                                    <activity.icon size={20} className="text-primary-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium text-primary-200">{activity.title}</div>
                                    <div className="text-sm text-primary-500">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Revenue Chart */}
                <Card variant="glass">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-primary-100">Revenue Overview</h2>
                        <select className="bg-surface-800 border-none text-sm text-primary-400 rounded-lg">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between space-x-2 px-2">
                        {revenueData.length > 0 ? (
                            revenueData.map((data, index) => (
                                <div key={index} className="flex-1 flex flex-col items-center group relative">
                                    <div
                                        className="w-full bg-secondary-500/20 rounded-t-sm group-hover:bg-secondary-500/40 transition-all relative overflow-hidden"
                                        style={{ height: `${(Number(data.amount) / maxRevenue) * 100}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-secondary-600/50 to-transparent" />
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 bg-surface-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        ${Number(data.amount).toLocaleString()}
                                    </div>
                                    <div className="text-xs text-primary-500 mt-2 rotate-45 md:rotate-0 truncate w-full text-center">
                                        {new Date(data.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary-500">
                                Loading chart...
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}
