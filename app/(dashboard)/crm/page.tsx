'use client'

import { Plus, Mail, Phone, Building, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const leads = [
    {
        id: '1',
        name: 'John Smith',
        email: 'john@example.com',
        company: 'Tech Corp',
        status: 'hot',
        value: '$50,000',
        lastContact: '2 hours ago',
    },
    {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@startup.com',
        company: 'Startup XYZ',
        status: 'warm',
        value: '$25,000',
        lastContact: '1 day ago',
    },
    {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@business.com',
        company: 'Business Inc',
        status: 'cold',
        value: '$10,000',
        lastContact: '1 week ago',
    },
]

export default function CRMPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">CRM</h1>
                    <p className="text-gray-400">Manage your leads and customers</p>
                </div>
                <Link href="/dashboard/crm/create">
                    <Button variant="premium">
                        <Plus size={20} className="mr-2" />
                        Add Lead
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Leads', value: '156', icon: TrendingUp, color: 'text-blue-400' },
                    { label: 'Hot Leads', value: '23', icon: TrendingUp, color: 'text-red-400' },
                    { label: 'Customers', value: '89', icon: Building, color: 'text-green-400' },
                    { label: 'Pipeline Value', value: '$2.4M', icon: TrendingUp, color: 'text-purple-400' },
                ].map((stat) => (
                    <Card key={stat.label} variant="glass">
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className={stat.color} size={24} />
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </Card>
                ))}
            </div>

            {/* Pipeline */}
            <Card variant="glass">
                <h3 className="text-lg font-semibold mb-4">Sales Pipeline</h3>
                <div className="grid grid-cols-4 gap-4">
                    {[
                        { stage: 'New', count: 45, value: '$450K' },
                        { stage: 'Qualified', count: 32, value: '$640K' },
                        { stage: 'Proposal', count: 18, value: '$900K' },
                        { stage: 'Closed', count: 12, value: '$480K' },
                    ].map((stage) => (
                        <div key={stage.stage} className="text-center p-4 glass-dark rounded-xl">
                            <div className="text-sm text-gray-400 mb-2">{stage.stage}</div>
                            <div className="text-2xl font-bold mb-1">{stage.count}</div>
                            <div className="text-xs text-primary-400">{stage.value}</div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Leads List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>
                <div className="space-y-4">
                    {leads.map((lead) => (
                        <Card key={lead.id} variant="glass" className="card-hover">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold">{lead.name}</h3>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${lead.status === 'hot'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : lead.status === 'warm'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-blue-500/20 text-blue-400'
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                                        <span className="flex items-center space-x-2">
                                            <Mail size={14} />
                                            <span>{lead.email}</span>
                                        </span>
                                        <span className="flex items-center space-x-2">
                                            <Building size={14} />
                                            <span>{lead.company}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8">
                                    <div className="text-right">
                                        <div className="text-xl font-bold gradient-text">{lead.value}</div>
                                        <div className="text-xs text-gray-400">Last contact: {lead.lastContact}</div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Phone size={16} className="mr-2" />
                                        Contact
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
