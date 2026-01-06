'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Zap, TrendingUp, Clock, Plus, Play, Pause, Settings } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface AIAgent {
    id: string
    name: string
    description: string
    model: string
    status: 'active' | 'paused' | 'training'
    tasks_completed: number
    accuracy: number
    created_at: string
}

export default function AIPage() {
    const [agents, setAgents] = useState<AIAgent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAgents()
    }, [])

    const fetchAgents = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/ai/agents')

            if (!response.ok) {
                throw new Error('Failed to fetch AI agents')
            }

            const data = await response.json()
            setAgents(data.agents || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const stats = [
        {
            label: 'Total Agents',
            value: agents.length.toString(),
            icon: Bot,
            color: 'text-blue-400'
        },
        {
            label: 'Active Agents',
            value: agents.filter(a => a.status === 'active').length.toString(),
            icon: Zap,
            color: 'text-green-400'
        },
        {
            label: 'Tasks Completed',
            value: agents.reduce((sum, a) => sum + (a.tasks_completed || 0), 0).toString(),
            icon: TrendingUp,
            color: 'text-purple-400'
        },
        {
            label: 'Avg Accuracy',
            value: agents.length > 0
                ? `${Math.round(agents.reduce((sum, a) => sum + (a.accuracy || 0), 0) / agents.length)}%`
                : '0%',
            icon: TrendingUp,
            color: 'text-orange-400'
        },
    ]

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            active: 'bg-green-500/20 text-green-400',
            paused: 'bg-yellow-500/20 text-yellow-400',
            training: 'bg-blue-500/20 text-blue-400',
        }
        return colors[status] || 'bg-gray-500/20 text-gray-400'
    }

    const getModelBadge = (model: string) => {
        const badges: Record<string, string> = {
            'gpt-4': 'bg-purple-500/20 text-purple-400',
            'gpt-3.5': 'bg-blue-500/20 text-blue-400',
            'claude': 'bg-orange-500/20 text-orange-400',
            'custom': 'bg-gray-500/20 text-gray-400',
        }
        return badges[model] || badges.custom
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading AI agents...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card variant="glass" className="p-8 text-center max-w-md">
                    <div className="text-red-400 mb-4">⚠️ Error</div>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <Button onClick={fetchAgents} variant="default">
                        Try Again
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        AI <span className="gradient-text">Agents</span>
                    </h1>
                    <p className="text-gray-400">Deploy and manage your AI-powered automation</p>
                </div>
                <Button variant="premium">
                    <Plus size={20} className="mr-2" />
                    Deploy Agent
                </Button>
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
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color === 'text-blue-400' ? 'from-blue-500/20 to-blue-700/20' :
                                        stat.color === 'text-green-400' ? 'from-green-500/20 to-green-700/20' :
                                            stat.color === 'text-purple-400' ? 'from-purple-500/20 to-purple-700/20' :
                                                'from-orange-500/20 to-orange-700/20'
                                    } flex items-center justify-center`}>
                                    <stat.icon className={stat.color} size={24} />
                                </div>
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* AI Agents List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Your AI Agents</h2>

                {agents.length === 0 ? (
                    <Card variant="glass" className="p-12 text-center">
                        <Bot size={48} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No AI agents yet</h3>
                        <p className="text-gray-400 mb-6">Deploy your first AI agent to automate tasks</p>
                        <Button variant="premium">
                            <Plus size={20} className="mr-2" />
                            Deploy Your First Agent
                        </Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {agents.map((agent, index) => (
                            <motion.div
                                key={agent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glass" className="card-hover">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start space-x-3 flex-1">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                                <Bot size={24} className="text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold mb-1">{agent.name}</h3>
                                                <p className="text-sm text-gray-400 mb-2">{agent.description}</p>
                                                <div className="flex items-center space-x-2">
                                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getModelBadge(agent.model)}`}>
                                                        {agent.model}
                                                    </div>
                                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                                                        {agent.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="text-center p-3 bg-white/5 rounded-lg">
                                            <div className="text-2xl font-bold text-primary-400">
                                                {agent.tasks_completed || 0}
                                            </div>
                                            <div className="text-xs text-gray-400">Tasks Completed</div>
                                        </div>
                                        <div className="text-center p-3 bg-white/5 rounded-lg">
                                            <div className="text-2xl font-bold text-green-400">
                                                {agent.accuracy || 0}%
                                            </div>
                                            <div className="text-xs text-gray-400">Accuracy</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                                            <Clock size={14} />
                                            <span>Created {new Date(agent.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="sm">
                                                {agent.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Settings size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
