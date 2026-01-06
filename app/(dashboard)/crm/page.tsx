'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, DollarSign, Mail, Phone, Plus, Filter } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Lead {
    id: string
    name: string
    email: string
    phone?: string
    company?: string
    status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'
    value: number
    created_at: string
}

export default function CRMPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchLeads()
    }, [])

    const fetchLeads = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/crm/leads')

            if (!response.ok) {
                throw new Error('Failed to fetch leads')
            }

            const data = await response.json()
            setLeads(data.leads || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const stats = [
        {
            label: 'Total Leads',
            value: leads.length.toString(),
            icon: Users,
            color: 'text-blue-400'
        },
        {
            label: 'Qualified',
            value: leads.filter(l => l.status === 'qualified').length.toString(),
            icon: TrendingUp,
            color: 'text-green-400'
        },
        {
            label: 'Pipeline Value',
            value: `$${leads.reduce((sum, l) => sum + (l.value || 0), 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'text-purple-400'
        },
        {
            label: 'Won Deals',
            value: leads.filter(l => l.status === 'won').length.toString(),
            icon: TrendingUp,
            color: 'text-orange-400'
        },
    ]

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            new: 'bg-blue-500/20 text-blue-400',
            contacted: 'bg-yellow-500/20 text-yellow-400',
            qualified: 'bg-green-500/20 text-green-400',
            proposal: 'bg-purple-500/20 text-purple-400',
            won: 'bg-emerald-500/20 text-emerald-400',
            lost: 'bg-red-500/20 text-red-400',
        }
        return colors[status] || 'bg-gray-500/20 text-gray-400'
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading leads...</p>
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
                    <Button onClick={fetchLeads} variant="default">
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
                        CRM <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Manage your leads and customer relationships</p>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline">
                        <Filter size={20} className="mr-2" />
                        Filter
                    </Button>
                    <Button variant="premium">
                        <Plus size={20} className="mr-2" />
                        Add Lead
                    </Button>
                </div>
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

            {/* Leads List */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Leads</h2>

                {leads.length === 0 ? (
                    <Card variant="glass" className="p-12 text-center">
                        <Users size={48} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No leads yet</h3>
                        <p className="text-gray-400 mb-6">Start adding leads to manage your sales pipeline</p>
                        <Button variant="premium">
                            <Plus size={20} className="mr-2" />
                            Add Your First Lead
                        </Button>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {leads.map((lead, index) => (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card variant="glass" className="card-hover">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 flex-1">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">{lead.name}</h3>
                                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                                    {lead.email && (
                                                        <div className="flex items-center space-x-1">
                                                            <Mail size={14} />
                                                            <span>{lead.email}</span>
                                                        </div>
                                                    )}
                                                    {lead.phone && (
                                                        <div className="flex items-center space-x-1">
                                                            <Phone size={14} />
                                                            <span>{lead.phone}</span>
                                                        </div>
                                                    )}
                                                    {lead.company && (
                                                        <span>• {lead.company}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="font-semibold text-green-400">
                                                    ${lead.value?.toLocaleString() || 0}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(lead.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </div>
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
