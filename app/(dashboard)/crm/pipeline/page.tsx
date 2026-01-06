'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Lead {
    id: string
    name: string
    email: string
    company: string
    value: number
    stage: string
}

export default function CRMPipelinePage() {
    const stages = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

    const [leads] = useState<Lead[]>([
        { id: '1', name: 'John Doe', email: 'john@acme.com', company: 'Acme Corp', value: 50000, stage: 'New' },
        { id: '2', name: 'Jane Smith', email: 'jane@techstart.com', company: 'TechStart Inc', value: 75000, stage: 'Qualified' },
        { id: '3', name: 'Bob Johnson', email: 'bob@design.com', company: 'Design Studio', value: 30000, stage: 'Proposal' },
        { id: '4', name: 'Alice Brown', email: 'alice@startup.com', company: 'Startup Co', value: 100000, stage: 'Negotiation' },
    ])

    const getLeadsByStage = (stage: string) => leads.filter(lead => lead.stage === stage)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Sales <span className="gradient-text">Pipeline</span>
                    </h1>
                    <p className="text-gray-400">Visualize and manage your sales pipeline</p>
                </div>
                <Button variant="premium">
                    <Plus size={16} className="mr-2" />
                    Add Lead
                </Button>
            </div>

            {/* Filters */}
            <div className="flex space-x-4">
                <div className="flex-1">
                    <Input placeholder="Search leads..." />
                </div>
                <Button variant="outline">
                    <Filter size={16} className="mr-2" />
                    Filters
                </Button>
            </div>

            {/* Pipeline Board */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {stages.map((stage, index) => {
                    const stageLeads = getLeadsByStage(stage)
                    const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0)

                    return (
                        <div key={stage} className="flex-shrink-0 w-80">
                            <Card variant="glass" className="h-full">
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold">{stage}</h3>
                                        <span className="text-sm text-gray-400">{stageLeads.length}</span>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        ${stageValue.toLocaleString()}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {stageLeads.map((lead, leadIndex) => (
                                        <motion.div
                                            key={lead.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: leadIndex * 0.1 }}
                                            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary-500/50 cursor-pointer transition-colors"
                                        >
                                            <div className="font-medium mb-1">{lead.name}</div>
                                            <div className="text-sm text-gray-400 mb-2">{lead.company}</div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-400">{lead.email}</span>
                                                <span className="text-sm font-semibold text-green-400">
                                                    ${(lead.value / 1000).toFixed(0)}K
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>

            {/* Pipeline Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Total Pipeline Value</div>
                    <div className="text-2xl font-bold gradient-text">
                        ${leads.reduce((sum, lead) => sum + lead.value, 0).toLocaleString()}
                    </div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Active Deals</div>
                    <div className="text-2xl font-bold">{leads.length}</div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Avg Deal Size</div>
                    <div className="text-2xl font-bold">
                        ${Math.round(leads.reduce((sum, lead) => sum + lead.value, 0) / leads.length).toLocaleString()}
                    </div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Win Rate</div>
                    <div className="text-2xl font-bold text-green-400">0%</div>
                </Card>
            </div>
        </div>
    )
}
