'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Mail, Phone, Calendar, MessageSquare, FileText } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Activity {
    id: string
    type: 'email' | 'call' | 'meeting' | 'note' | 'task'
    title: string
    description: string
    user: string
    timestamp: Date
}

export default function LeadDetailPage({ params }: { params: { id: string } }) {
    const [activities] = useState<Activity[]>([
        {
            id: '1',
            type: 'email',
            title: 'Sent proposal email',
            description: 'Sent detailed proposal with pricing options',
            user: 'John Doe',
            timestamp: new Date(Date.now() - 3600000),
        },
        {
            id: '2',
            type: 'call',
            title: 'Discovery call completed',
            description: 'Discussed requirements and timeline',
            user: 'Jane Smith',
            timestamp: new Date(Date.now() - 86400000),
        },
        {
            id: '3',
            type: 'meeting',
            title: 'Demo scheduled',
            description: 'Product demo scheduled for next week',
            user: 'Bob Johnson',
            timestamp: new Date(Date.now() - 172800000),
        },
    ])

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'email': return Mail
            case 'call': return Phone
            case 'meeting': return Calendar
            case 'note': return FileText
            case 'task': return MessageSquare
            default: return MessageSquare
        }
    }

    const getActivityColor = (type: string) => {
        switch (type) {
            case 'email': return 'from-blue-500 to-blue-700'
            case 'call': return 'from-green-500 to-green-700'
            case 'meeting': return 'from-purple-500 to-purple-700'
            case 'note': return 'from-yellow-500 to-yellow-700'
            case 'task': return 'from-red-500 to-red-700'
            default: return 'from-gray-500 to-gray-700'
        }
    }

    return (
        <div className="space-y-8">
            {/* Lead Header */}
            <Card variant="glass">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold mb-2">Acme Corporation</h1>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>john@acme.com</span>
                            <span>•</span>
                            <span>+1 (555) 123-4567</span>
                            <span>•</span>
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">Hot Lead</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold text-green-400 mb-1">$50,000</div>
                        <div className="text-sm text-gray-400">Deal Value</div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Activity Timeline */}
                <div className="lg:col-span-2">
                    <Card variant="glass">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold">Activity Timeline</h3>
                            <Button variant="premium" size="sm">
                                <Plus size={16} className="mr-2" />
                                Add Activity
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {activities.map((activity, index) => {
                                const Icon = getActivityIcon(activity.type)
                                return (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex space-x-4"
                                    >
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getActivityColor(activity.type)} flex items-center justify-center flex-shrink-0`}>
                                            <Icon size={16} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-medium">{activity.title}</h4>
                                                <span className="text-xs text-gray-400">
                                                    {activity.timestamp.toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 mb-1">{activity.description}</p>
                                            <p className="text-xs text-gray-500">by {activity.user}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </Card>
                </div>

                {/* Lead Info */}
                <div className="space-y-6">
                    <Card variant="glass">
                        <h3 className="text-lg font-semibold mb-4">Lead Information</h3>
                        <div className="space-y-3">
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Stage</div>
                                <div className="font-medium">Proposal</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Source</div>
                                <div className="font-medium">Website</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Owner</div>
                                <div className="font-medium">John Doe</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Created</div>
                                <div className="font-medium">Jan 1, 2026</div>
                            </div>
                        </div>
                    </Card>

                    <Card variant="glass">
                        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Mail size={16} className="mr-2" />
                                Send Email
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Phone size={16} className="mr-2" />
                                Log Call
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Calendar size={16} className="mr-2" />
                                Schedule Meeting
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <FileText size={16} className="mr-2" />
                                Add Note
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
