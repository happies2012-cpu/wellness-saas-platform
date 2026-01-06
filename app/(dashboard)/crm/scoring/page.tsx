'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Target, Award, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface LeadScore {
    leadId: string
    name: string
    email: string
    company: string
    score: number
    factors: {
        engagement: number
        companySize: number
        budget: number
        timeline: number
        authority: number
    }
    trend: 'up' | 'down' | 'stable'
}

export default function LeadScoringPage() {
    const [leads, setLeads] = useState<LeadScore[]>([
        {
            leadId: '1',
            name: 'John Doe',
            email: 'john@acme.com',
            company: 'Acme Corp',
            score: 85,
            factors: { engagement: 90, companySize: 80, budget: 85, timeline: 75, authority: 95 },
            trend: 'up',
        },
        {
            leadId: '2',
            name: 'Jane Smith',
            email: 'jane@techstart.com',
            company: 'TechStart Inc',
            score: 72,
            factors: { engagement: 70, companySize: 75, budget: 80, timeline: 60, authority: 75 },
            trend: 'stable',
        },
        {
            leadId: '3',
            name: 'Bob Johnson',
            email: 'bob@design.com',
            company: 'Design Studio',
            score: 58,
            factors: { engagement: 60, companySize: 50, budget: 55, timeline: 70, authority: 55 },
            trend: 'down',
        },
    ])

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-400'
        if (score >= 60) return 'text-yellow-400'
        return 'text-red-400'
    }

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Hot'
        if (score >= 60) return 'Warm'
        return 'Cold'
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    Lead <span className="gradient-text">Scoring</span>
                </h1>
                <p className="text-gray-400">AI-powered lead qualification and scoring</p>
            </div>

            {/* Score Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Hot Leads</span>
                        <Award className="text-green-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-green-400">
                        {leads.filter(l => l.score >= 80).length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Score 80+</div>
                </Card>

                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Warm Leads</span>
                        <Target className="text-yellow-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">
                        {leads.filter(l => l.score >= 60 && l.score < 80).length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Score 60-79</div>
                </Card>

                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Cold Leads</span>
                        <AlertCircle className="text-red-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-red-400">
                        {leads.filter(l => l.score < 60).length}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Score 0-59</div>
                </Card>
            </div>

            {/* Lead List */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-6">Scored Leads</h3>
                <div className="space-y-4">
                    {leads.map((lead, index) => (
                        <motion.div
                            key={lead.leadId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary-500/50 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <h4 className="font-semibold">{lead.name}</h4>
                                        <span className={`text-xs px-2 py-1 rounded ${getScoreColor(lead.score)} bg-current/10`}>
                                            {getScoreLabel(lead.score)}
                                        </span>
                                        {lead.trend === 'up' && <TrendingUp size={16} className="text-green-400" />}
                                        {lead.trend === 'down' && <TrendingDown size={16} className="text-red-400" />}
                                    </div>
                                    <div className="text-sm text-gray-400 mt-1">
                                        {lead.email} • {lead.company}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-3xl font-bold ${getScoreColor(lead.score)}`}>
                                        {lead.score}
                                    </div>
                                    <div className="text-xs text-gray-400">Score</div>
                                </div>
                            </div>

                            {/* Score Factors */}
                            <div className="grid grid-cols-5 gap-3">
                                {Object.entries(lead.factors).map(([factor, value]) => (
                                    <div key={factor} className="text-center">
                                        <div className="text-xs text-gray-400 mb-1 capitalize">{factor}</div>
                                        <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-primary-500 to-primary-700"
                                                style={{ width: `${value}%` }}
                                            />
                                        </div>
                                        <div className="text-xs font-medium mt-1">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            {/* Scoring Configuration */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-4">Scoring Configuration</h3>
                <p className="text-sm text-gray-400 mb-4">
                    Adjust the weight of each factor in the lead scoring algorithm
                </p>
                <div className="space-y-4">
                    {['Engagement', 'Company Size', 'Budget', 'Timeline', 'Authority'].map((factor) => (
                        <div key={factor} className="flex items-center space-x-4">
                            <div className="w-32 text-sm">{factor}</div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                defaultValue="50"
                                className="flex-1"
                            />
                            <div className="w-12 text-right text-sm">50%</div>
                        </div>
                    ))}
                </div>
                <Button variant="premium" className="mt-6">
                    Save Configuration
                </Button>
            </Card>
        </div>
    )
}
