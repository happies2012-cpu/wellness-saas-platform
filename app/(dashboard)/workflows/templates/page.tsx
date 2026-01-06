'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock, Mail, Database, Code, Download, Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface Template {
    id: string
    name: string
    description: string
    category: string
    icon: any
    nodes: number
    uses: number
    rating: number
}

export default function WorkflowTemplatesPage() {
    const templates: Template[] = [
        {
            id: '1',
            name: 'Lead Nurturing Sequence',
            description: 'Automatically nurture leads with personalized emails',
            category: 'Marketing',
            icon: Mail,
            nodes: 8,
            uses: 1234,
            rating: 4.8,
        },
        {
            id: '2',
            name: 'Daily Data Sync',
            description: 'Sync data between multiple platforms daily',
            category: 'Integration',
            icon: Database,
            nodes: 5,
            uses: 892,
            rating: 4.6,
        },
        {
            id: '3',
            name: 'Customer Onboarding',
            description: 'Automate new customer onboarding process',
            category: 'Sales',
            icon: Zap,
            nodes: 12,
            uses: 2156,
            rating: 4.9,
        },
        {
            id: '4',
            name: 'Weekly Report Generator',
            description: 'Generate and send weekly performance reports',
            category: 'Analytics',
            icon: Clock,
            nodes: 6,
            uses: 567,
            rating: 4.5,
        },
        {
            id: '5',
            name: 'API Data Processor',
            description: 'Process and transform API data automatically',
            category: 'Integration',
            icon: Code,
            nodes: 10,
            uses: 1445,
            rating: 4.7,
        },
    ]

    const categories = ['All', 'Marketing', 'Sales', 'Integration', 'Analytics']
    const [selectedCategory, setSelectedCategory] = useState('All')

    const filteredTemplates = selectedCategory === 'All'
        ? templates
        : templates.filter(t => t.category === selectedCategory)

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Workflow <span className="gradient-text">Templates</span>
                    </h1>
                    <p className="text-gray-400">Start with pre-built workflow templates</p>
                </div>
                <Link href="/workflows/builder">
                    <Button variant="premium">
                        <Zap size={16} className="mr-2" />
                        Create from Scratch
                    </Button>
                </Link>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2">
                {categories.map((category) => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover h-full">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center`}>
                                    <template.icon size={24} className="text-white" />
                                </div>
                                <div className="flex items-center space-x-1 text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-medium">{template.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                            <p className="text-sm text-gray-400 mb-4">{template.description}</p>

                            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                                <span>{template.nodes} nodes</span>
                                <span>{template.uses.toLocaleString()} uses</span>
                            </div>

                            <div className="flex space-x-2">
                                <Link href={`/workflows/builder?template=${template.id}`} className="flex-1">
                                    <Button variant="premium" size="sm" className="w-full">
                                        Use Template
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm">
                                    <Download size={16} />
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
