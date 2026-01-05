'use client'

import Link from 'next/link'
import { Plus, Bot, Play, Settings, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const agents = [
    {
        id: '1',
        name: 'Content Writer',
        role: 'Content Creation',
        status: 'active',
        tasksCompleted: 234,
        successRate: 96,
    },
    {
        id: '2',
        name: 'Customer Support',
        role: 'Support Agent',
        status: 'active',
        tasksCompleted: 1456,
        successRate: 98,
    },
    {
        id: '3',
        name: 'Data Analyst',
        role: 'Analytics',
        status: 'idle',
        tasksCompleted: 89,
        successRate: 94,
    },
]

export default function AIPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">AI Agents</h1>
                    <p className="text-gray-400">Manage your AI workforce</p>
                </div>
                <Link href="/dashboard/ai/create">
                    <Button variant="premium">
                        <Plus size={20} className="mr-2" />
                        Create Agent
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Agents', value: '12', icon: Bot },
                    { label: 'Active Now', value: '8', icon: Play },
                    { label: 'Tasks Completed', value: '2.4K', icon: TrendingUp },
                    { label: 'AI Credits Used', value: '456', icon: TrendingUp },
                ].map((stat) => (
                    <Card key={stat.label} variant="glass">
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className="text-primary-400" size={24} />
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </Card>
                ))}
            </div>

            {/* AI Credits */}
            <Card variant="glass">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">AI Credits</h3>
                        <p className="text-sm text-gray-400">544 of 1,000 credits remaining this month</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold gradient-text mb-1">54.4%</div>
                        <Link href="/dashboard/ai/credits">
                            <Button variant="outline" size="sm">
                                Buy More Credits
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="mt-4 h-2 bg-dark-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-primary-700" style={{ width: '54.4%' }} />
                </div>
            </Card>

            {/* Agents List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Your AI Agents</h2>
                <div className="space-y-4">
                    {agents.map((agent) => (
                        <Card key={agent.id} variant="glass" className="card-hover">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                                        <Bot className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-3 mb-1">
                                            <h3 className="text-lg font-semibold">{agent.name}</h3>
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${agent.status === 'active'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-gray-500/20 text-gray-400'
                                                    }`}
                                            >
                                                {agent.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{agent.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8">
                                    <div className="text-center">
                                        <div className="text-xl font-bold">{agent.tasksCompleted}</div>
                                        <div className="text-xs text-gray-400">Tasks</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-green-400">{agent.successRate}%</div>
                                        <div className="text-xs text-gray-400">Success</div>
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Settings size={16} />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
