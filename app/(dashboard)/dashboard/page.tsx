'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Workflow, DollarSign, Bot, Package, MessageSquare, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

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
    { label: 'Create Workflow', href: '/dashboard/workflows/builder', icon: Workflow, color: 'from-blue-500 to-blue-700' },
    { label: 'Add Product', href: '/dashboard/ecommerce/products', icon: Package, color: 'from-green-500 to-green-700' },
    { label: 'New AI Agent', href: '/dashboard/ai/agents', icon: Bot, color: 'from-purple-500 to-purple-700' },
    { label: 'Assign Task', href: '/dashboard/workforce/tasks', icon: Zap, color: 'from-orange-500 to-orange-700' },
]

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    Welcome back, <span className="gradient-text">Brand Owner</span>
                </h1>
                <p className="text-gray-400">Here&apos;s what&apos;s happening with your business today</p>
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
                        <Card variant="glass" className="card-hover">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color === 'text-green-400' ? 'from-green-500/20 to-green-700/20' : stat.color === 'text-blue-400' ? 'from-blue-500/20 to-blue-700/20' : stat.color === 'text-purple-400' ? 'from-purple-500/20 to-purple-700/20' : 'from-orange-500/20 to-orange-700/20'} flex items-center justify-center`}>
                                    <stat.icon className={stat.color} size={24} />
                                </div>
                                <span className="text-sm font-medium text-green-400">{stat.change}</span>
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <Link key={action.label} href={action.href}>
                            <Card variant="glass" className="card-hover cursor-pointer">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                                    <action.icon className="text-white" size={24} />
                                </div>
                                <div className="font-semibold">{action.label}</div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity & Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card variant="glass">
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <activity.icon size={20} className="text-primary-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">{activity.title}</div>
                                    <div className="text-sm text-gray-400">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Revenue Chart Placeholder */}
                <Card variant="glass">
                    <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-xl">
                        <div className="text-center">
                            <TrendingUp size={48} className="text-primary-400 mx-auto mb-2" />
                            <p className="text-gray-400">Revenue chart coming soon</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
