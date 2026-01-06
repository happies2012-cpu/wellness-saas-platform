'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Play, Pause, Zap, Clock, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Automation {
    id: string
    name: string
    description: string
    trigger: string
    actions: string[]
    status: 'active' | 'paused'
    executions: number
}

export default function CRMAutomationPage() {
    const [automations] = useState<Automation[]>([
        {
            id: '1',
            name: 'Lead Assignment',
            description: 'Automatically assign new leads to sales reps',
            trigger: 'New lead created',
            actions: ['Check lead score', 'Assign to rep', 'Send notification'],
            status: 'active',
            executions: 234,
        },
        {
            id: '2',
            name: 'Follow-up Reminder',
            description: 'Send reminders for follow-up tasks',
            trigger: '3 days after last contact',
            actions: ['Check last activity', 'Create task', 'Send email'],
            status: 'active',
            executions: 156,
        },
        {
            id: '3',
            name: 'Deal Stage Update',
            description: 'Update deal stage based on activity',
            trigger: 'Proposal sent',
            actions: ['Update stage', 'Set reminder', 'Notify manager'],
            status: 'paused',
            executions: 89,
        },
    ])

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        CRM <span className="gradient-text">Automation</span>
                    </h1>
                    <p className="text-gray-400">Automate repetitive CRM tasks</p>
                </div>
                <Button variant="premium">
                    <Plus size={16} className="mr-2" />
                    Create Automation
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Active Automations</span>
                        <Zap className="text-primary-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold">
                        {automations.filter(a => a.status === 'active').length}
                    </div>
                </Card>

                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Total Executions</span>
                        <CheckCircle className="text-green-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold">
                        {automations.reduce((sum, a) => sum + a.executions, 0)}
                    </div>
                </Card>

                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Time Saved</span>
                        <Clock className="text-yellow-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold">24h</div>
                </Card>
            </div>

            {/* Automations List */}
            <div className="space-y-4">
                {automations.map((automation, index) => (
                    <motion.div
                        key={automation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold">{automation.name}</h3>
                                        <span className={`text-xs px-2 py-1 rounded ${automation.status === 'active'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {automation.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">{automation.description}</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">Trigger</div>
                                            <div className="text-sm font-medium">{automation.trigger}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-400 mb-1">Actions</div>
                                            <div className="text-sm font-medium">{automation.actions.length} steps</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end space-y-2">
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">{automation.executions}</div>
                                        <div className="text-xs text-gray-400">executions</div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm">
                                            {automation.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                                        </Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
