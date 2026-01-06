'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Shield, Activity, Settings as SettingsIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalWorkspaces: 0,
        systemHealth: 100,
    })

    useEffect(() => {
        // TODO: Fetch real stats from API
        setStats({
            totalUsers: 156,
            activeUsers: 89,
            totalWorkspaces: 42,
            systemHealth: 98,
        })
    }, [])

    const adminCards = [
        {
            title: 'User Management',
            description: 'Manage users, roles, and permissions',
            icon: Users,
            href: '/admin/users',
            color: 'from-blue-500 to-blue-700',
            stat: `${stats.totalUsers} users`,
        },
        {
            title: 'Role Management',
            description: 'Configure roles and permissions',
            icon: Shield,
            href: '/admin/roles',
            color: 'from-purple-500 to-purple-700',
            stat: '11 roles',
        },
        {
            title: 'Audit Logs',
            description: 'View system activity and logs',
            icon: Activity,
            href: '/admin/audit-logs',
            color: 'from-green-500 to-green-700',
            stat: 'Real-time',
        },
        {
            title: 'System Settings',
            description: 'Configure platform settings',
            icon: SettingsIcon,
            href: '/admin/settings',
            color: 'from-orange-500 to-orange-700',
            stat: `${stats.systemHealth}% health`,
        },
    ]

    const quickStats = [
        { label: 'Total Users', value: stats.totalUsers, change: '+12%' },
        { label: 'Active Users', value: stats.activeUsers, change: '+8%' },
        { label: 'Workspaces', value: stats.totalWorkspaces, change: '+5%' },
        { label: 'System Health', value: `${stats.systemHealth}%`, change: '+2%' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    Admin <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="text-gray-400">Manage your platform and users</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover">
                            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                            <div className="flex items-end justify-between">
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <div className="text-sm text-green-400">{stat.change}</div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Admin Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={card.href}>
                            <Card variant="glass" className="card-hover cursor-pointer group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <card.icon size={28} className="text-white" />
                                    </div>
                                    <div className="text-sm font-semibold text-gray-400">{card.stat}</div>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                                <p className="text-gray-400 text-sm">{card.description}</p>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Recent Activity */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    {[
                        { action: 'New user registered', user: 'john@example.com', time: '2 minutes ago' },
                        { action: 'Role updated', user: 'admin@humanai.com', time: '15 minutes ago' },
                        { action: 'Workflow created', user: 'sarah@example.com', time: '1 hour ago' },
                        { action: 'Payment received', user: 'mike@example.com', time: '2 hours ago' },
                    ].map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <div>
                                <div className="font-medium">{activity.action}</div>
                                <div className="text-sm text-gray-400">{activity.user}</div>
                            </div>
                            <div className="text-sm text-gray-400">{activity.time}</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
