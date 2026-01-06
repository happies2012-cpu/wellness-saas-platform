'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Search, Filter, Download } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface AuditLog {
    id: string
    user_email: string
    action: string
    resource_type: string
    resource_id?: string
    details: any
    ip_address?: string
    created_at: string
}

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<AuditLog[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedAction, setSelectedAction] = useState<string>('all')

    useEffect(() => {
        fetchLogs()
    }, [])

    const fetchLogs = async () => {
        try {
            setLoading(true)
            // TODO: Fetch from API
            // Mock data for now
            setLogs([
                {
                    id: '1',
                    user_email: 'admin@humanai.com',
                    action: 'user.created',
                    resource_type: 'user',
                    resource_id: 'user_123',
                    details: { role: 'developer' },
                    ip_address: '192.168.1.1',
                    created_at: new Date().toISOString(),
                },
                {
                    id: '2',
                    user_email: 'john@example.com',
                    action: 'workflow.created',
                    resource_type: 'workflow',
                    resource_id: 'wf_456',
                    details: { name: 'Lead Nurturing' },
                    ip_address: '192.168.1.2',
                    created_at: new Date(Date.now() - 900000).toISOString(),
                },
                {
                    id: '3',
                    user_email: 'sarah@example.com',
                    action: 'payment.completed',
                    resource_type: 'order',
                    resource_id: 'ord_789',
                    details: { amount: 4900, plan: 'pro' },
                    ip_address: '192.168.1.3',
                    created_at: new Date(Date.now() - 3600000).toISOString(),
                },
            ])
        } catch (error) {
            console.error('Error fetching logs:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesAction = selectedAction === 'all' || log.action.startsWith(selectedAction)
        return matchesSearch && matchesAction
    })

    const getActionColor = (action: string) => {
        if (action.includes('created')) return 'text-green-400 bg-green-500/20'
        if (action.includes('updated')) return 'text-blue-400 bg-blue-500/20'
        if (action.includes('deleted')) return 'text-red-400 bg-red-500/20'
        if (action.includes('payment')) return 'text-purple-400 bg-purple-500/20'
        return 'text-gray-400 bg-gray-500/20'
    }

    const formatTimeAgo = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
        if (seconds < 60) return `${seconds}s ago`
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
        return `${Math.floor(seconds / 86400)}d ago`
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading audit logs...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Audit <span className="gradient-text">Logs</span>
                    </h1>
                    <p className="text-gray-400">Track all system activities and changes</p>
                </div>
                <Button variant="outline">
                    <Download size={20} className="mr-2" />
                    Export Logs
                </Button>
            </div>

            {/* Filters */}
            <Card variant="glass">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            type="text"
                            placeholder="Search logs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12"
                        />
                    </div>
                    <select
                        value={selectedAction}
                        onChange={(e) => setSelectedAction(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                    >
                        <option value="all">All Actions</option>
                        <option value="user">User Actions</option>
                        <option value="workflow">Workflow Actions</option>
                        <option value="payment">Payment Actions</option>
                        <option value="system">System Actions</option>
                    </select>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Total Events</div>
                    <div className="text-2xl font-bold">{logs.length}</div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Today</div>
                    <div className="text-2xl font-bold text-green-400">
                        {logs.filter(l => formatTimeAgo(l.created_at).includes('m') || formatTimeAgo(l.created_at).includes('s')).length}
                    </div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Unique Users</div>
                    <div className="text-2xl font-bold text-blue-400">
                        {new Set(logs.map(l => l.user_email)).size}
                    </div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Critical Events</div>
                    <div className="text-2xl font-bold text-red-400">
                        {logs.filter(l => l.action.includes('deleted')).length}
                    </div>
                </Card>
            </div>

            {/* Logs List */}
            <Card variant="glass">
                <div className="space-y-3">
                    {filteredLogs.map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                                            {log.action}
                                        </span>
                                        <span className="text-sm text-gray-400">{log.user_email}</span>
                                    </div>
                                    <div className="text-sm text-gray-300 mb-2">
                                        {log.resource_type} {log.resource_id && `• ${log.resource_id}`}
                                    </div>
                                    {log.details && (
                                        <div className="text-xs text-gray-500 font-mono">
                                            {JSON.stringify(log.details)}
                                        </div>
                                    )}
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-400">{formatTimeAgo(log.created_at)}</div>
                                    {log.ip_address && (
                                        <div className="text-xs text-gray-500">{log.ip_address}</div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {filteredLogs.length === 0 && (
                        <div className="text-center py-12">
                            <Activity size={48} className="text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No audit logs found</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
