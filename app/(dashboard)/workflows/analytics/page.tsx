'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Clock, CheckCircle, XCircle, Play } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function WorkflowAnalyticsPage() {
    const [timeRange, setTimeRange] = useState('7d')

    const stats = [
        { label: 'Total Executions', value: '1,234', change: '+12%', icon: Play, color: 'text-blue-400' },
        { label: 'Success Rate', value: '98.5%', change: '+2.1%', icon: CheckCircle, color: 'text-green-400' },
        { label: 'Avg Duration', value: '2.3s', change: '-15%', icon: Clock, color: 'text-yellow-400' },
        { label: 'Failed Runs', value: '18', change: '-8%', icon: XCircle, color: 'text-red-400' },
    ]

    const workflows = [
        { name: 'Lead Nurturing', executions: 456, success: 99.1, avgTime: 1.8 },
        { name: 'Data Sync', executions: 342, success: 98.2, avgTime: 3.2 },
        { name: 'Customer Onboarding', executions: 234, success: 97.8, avgTime: 2.5 },
        { name: 'Weekly Reports', executions: 156, success: 100, avgTime: 4.1 },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Workflow <span className="gradient-text">Analytics</span>
                    </h1>
                    <p className="text-gray-400">Monitor workflow performance and execution metrics</p>
                </div>
                <div className="flex space-x-2">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                        <Button
                            key={range}
                            variant={timeRange === range ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTimeRange(range)}
                        >
                            {range}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover">
                            <div className="flex items-center justify-between mb-4">
                                <stat.icon className={stat.color} size={24} />
                                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Execution Chart */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-6">Execution Trend</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                    {[65, 78, 82, 71, 88, 92, 85, 79, 95, 89, 91, 87, 93, 98].map((height, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                                className="w-full bg-gradient-to-t from-primary-500 to-primary-700 rounded-t transition-all hover:opacity-80"
                                style={{ height: `${height}%` }}
                            />
                            <div className="text-xs text-gray-400 mt-2">{index + 1}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Workflow Performance Table */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-6">Workflow Performance</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Workflow</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Executions</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Success Rate</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Avg Time</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workflows.map((workflow, index) => (
                                <motion.tr
                                    key={workflow.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b border-white/5 hover:bg-white/5"
                                >
                                    <td className="py-4 px-4 font-medium">{workflow.name}</td>
                                    <td className="py-4 px-4 text-right">{workflow.executions.toLocaleString()}</td>
                                    <td className="py-4 px-4 text-right">
                                        <span className="text-green-400">{workflow.success}%</span>
                                    </td>
                                    <td className="py-4 px-4 text-right text-gray-400">{workflow.avgTime}s</td>
                                    <td className="py-4 px-4 text-right">
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
