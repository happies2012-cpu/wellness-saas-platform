'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Workflow, Play, Pause, Trash2, Plus, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface WorkflowData {
    id: string
    name: string
    description: string
    status: 'active' | 'paused' | 'draft'
    executions: number
    success_rate: number
    created_at: string
}

export default function WorkflowsPage() {
    const [workflows, setWorkflows] = useState<WorkflowData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchWorkflows()
    }, [])

    const fetchWorkflows = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/workflows')

            if (!response.ok) {
                throw new Error('Failed to fetch workflows')
            }

            const data = await response.json()
            setWorkflows(data.workflows || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const stats = [
        {
            label: 'Total Workflows',
            value: workflows.length.toString(),
            icon: Workflow,
            color: 'text-blue-400'
        },
        {
            label: 'Active',
            value: workflows.filter(w => w.status === 'active').length.toString(),
            icon: Play,
            color: 'text-green-400'
        },
        {
            label: 'Total Executions',
            value: workflows.reduce((sum, w) => sum + (w.executions || 0), 0).toString(),
            icon: TrendingUp,
            color: 'text-purple-400'
        },
        {
            label: 'Success Rate',
            value: workflows.length > 0
                ? `${Math.round(workflows.reduce((sum, w) => sum + (w.success_rate || 0), 0) / workflows.length)}%`
                : '0%',
            icon: CheckCircle,
            color: 'text-orange-400'
        },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading workflows...</p>
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
                    <Button onClick={fetchWorkflows} variant="default">
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
                        Workflow <span className="gradient-text">Automation</span>
                    </h1>
                    <p className="text-gray-400">Build, manage, and automate your business processes</p>
                </div>
                <Button variant="premium" className="group">
                    <Plus size={20} className="mr-2" />
                    Create Workflow
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

            {/* Workflows List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Your Workflows</h2>

                {workflows.length === 0 ? (
                    <Card variant="glass" className="p-12 text-center">
                        <Workflow size={48} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No workflows yet</h3>
                        <p className="text-gray-400 mb-6">Create your first workflow to automate your business processes</p>
                        <Button variant="premium">
                            <Plus size={20} className="mr-2" />
                            Create Your First Workflow
                        </Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {workflows.map((workflow, index) => (
                            <motion.div
                                key={workflow.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glass" className="card-hover">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold mb-1">{workflow.name}</h3>
                                            <p className="text-sm text-gray-400">{workflow.description}</p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${workflow.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                            workflow.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {workflow.status}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center space-x-2 text-sm">
                                            <Play size={16} className="text-gray-400" />
                                            <span className="text-gray-300">{workflow.executions || 0} runs</span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-sm">
                                            <CheckCircle size={16} className="text-gray-400" />
                                            <span className="text-gray-300">{workflow.success_rate || 0}% success</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                                            <Clock size={14} />
                                            <span>Created {new Date(workflow.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="sm">
                                                {workflow.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Trash2 size={16} className="text-red-400" />
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
