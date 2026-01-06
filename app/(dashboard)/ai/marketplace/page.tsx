'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Star, Download, TrendingUp, Users } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Agent {
    id: string
    name: string
    description: string
    category: string
    rating: number
    downloads: number
    price: number
    author: string
}

export default function AIMarketplacePage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const agents: Agent[] = [
        {
            id: '1',
            name: 'Customer Support Pro',
            description: 'Advanced customer support agent with multi-language support',
            category: 'Support',
            rating: 4.9,
            downloads: 2456,
            price: 49,
            author: 'AI Solutions Inc',
        },
        {
            id: '2',
            name: 'Sales Assistant',
            description: 'AI-powered sales assistant for lead qualification',
            category: 'Sales',
            rating: 4.7,
            downloads: 1823,
            price: 39,
            author: 'SalesTech',
        },
        {
            id: '3',
            name: 'Content Writer',
            description: 'Generate high-quality content for blogs and social media',
            category: 'Marketing',
            rating: 4.8,
            downloads: 3124,
            price: 29,
            author: 'ContentAI',
        },
        {
            id: '4',
            name: 'Code Reviewer',
            description: 'Automated code review and quality analysis',
            category: 'Development',
            rating: 4.6,
            downloads: 1567,
            price: 59,
            author: 'DevTools Pro',
        },
    ]

    const categories = ['All', 'Support', 'Sales', 'Marketing', 'Development']

    const filteredAgents = agents.filter(agent =>
        (selectedCategory === 'All' || agent.category === selectedCategory) &&
        (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    AI Agent <span className="gradient-text">Marketplace</span>
                </h1>
                <p className="text-gray-400">Discover and deploy pre-built AI agents</p>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search agents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
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
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent, index) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover h-full flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                    <Bot size={24} className="text-white" />
                                </div>
                                <div className="flex items-center space-x-1 text-yellow-400">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm font-medium">{agent.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">{agent.name}</h3>
                            <p className="text-sm text-gray-400 mb-4 flex-1">{agent.description}</p>

                            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                                <div className="flex items-center space-x-1">
                                    <Download size={14} />
                                    <span>{agent.downloads.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Users size={14} />
                                    <span>{agent.author}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div>
                                    <div className="text-2xl font-bold gradient-text">${agent.price}</div>
                                    <div className="text-xs text-gray-400">one-time</div>
                                </div>
                                <Button variant="premium" size="sm">
                                    Deploy
                                </Button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
