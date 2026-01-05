'use client'

import Link from 'next/link'
import { Plus, Play, Edit, Trash2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const workflows = [
    {
        id: '1',
        name: 'Lead Nurturing Automation',
        description: 'Automatically nurture leads through email sequences',
        status: 'active',
        executions: 1234,
        lastRun: '2 hours ago',
    },
    {
        id: '2',
        name: 'Order Fulfillment Process',
        description: 'Handle order processing and shipping notifications',
        status: 'active',
        executions: 856,
        lastRun: '5 hours ago',
    },
    {
        id: '3',
        name: 'Customer Onboarding',
        description: 'Welcome new customers and guide them through setup',
        status: 'draft',
        executions: 0,
        lastRun: 'Never',
    },
]

export default function WorkflowsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">Workflows</h1>
                    <p className="text-gray-400">Automate your business processes</p>
                </div>
                <Link href="/dashboard/workflows/builder">
                    <Button variant="premium">
                        <Plus size={20} className="mr-2" />
                        Create Workflow
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Workflows', value: '12' },
                    { label: 'Active', value: '8' },
                    { label: 'Total Executions', value: '45.2K' },
                    { label: 'Success Rate', value: '98.5%' },
                ].map((stat) => (
                    <Card key={stat.label} variant="glass">
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </Card>
                ))}
            </div>

            {/* Workflows List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Your Workflows</h2>
                <div className="space-y-4">
                    {workflows.map((workflow) => (
                        <Card key={workflow.id} variant="glass" className="card-hover">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold">{workflow.name}</h3>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${workflow.status === 'active'
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-gray-500/20 text-gray-400'
                                                }`}
                                        >
                                            {workflow.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">{workflow.description}</p>
                                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                                        <span>{workflow.executions} executions</span>
                                        <span>Last run: {workflow.lastRun}</span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm">
                                        <Play size={16} />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Edit size={16} />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Copy size={16} />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Trash2 size={16} />
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
