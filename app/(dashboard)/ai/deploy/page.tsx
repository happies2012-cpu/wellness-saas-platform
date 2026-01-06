'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Zap, Settings, MessageSquare, TrendingUp, DollarSign, Clock, Play } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AIAgentDeployPage() {
    const [step, setStep] = useState(1)
    const [config, setConfig] = useState({
        name: '',
        model: 'gpt-4',
        purpose: '',
        systemPrompt: '',
    })

    const models = [
        { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', cost: '$0.03/1K tokens' },
        { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', provider: 'OpenAI', cost: '$0.001/1K tokens' },
        { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', cost: '$0.015/1K tokens' },
        { id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google', cost: '$0.0005/1K tokens' },
    ]

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    Deploy AI <span className="gradient-text">Agent</span>
                </h1>
                <p className="text-gray-400">Configure and deploy your AI agent</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
                {[
                    { num: 1, label: 'Basic Info' },
                    { num: 2, label: 'Model Selection' },
                    { num: 3, label: 'Configuration' },
                    { num: 4, label: 'Deploy' },
                ].map((s, index) => (
                    <div key={s.num} className="flex items-center flex-1">
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s.num ? 'bg-primary-500' : 'bg-white/10'
                                }`}>
                                <span className="font-semibold">{s.num}</span>
                            </div>
                            <span className={`ml-3 text-sm ${step >= s.num ? 'text-white' : 'text-gray-400'}`}>
                                {s.label}
                            </span>
                        </div>
                        {index < 3 && (
                            <div className={`flex-1 h-1 mx-4 ${step > s.num ? 'bg-primary-500' : 'bg-white/10'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <Card variant="glass">
                {step === 1 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Basic Information</h3>
                        <div>
                            <label className="block text-sm font-medium mb-2">Agent Name</label>
                            <Input
                                value={config.name}
                                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                                placeholder="e.g., Customer Support Bot"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Purpose</label>
                            <textarea
                                value={config.purpose}
                                onChange={(e) => setConfig({ ...config, purpose: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                                rows={4}
                                placeholder="Describe what this agent will do..."
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Select AI Model</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {models.map((model) => (
                                <motion.div
                                    key={model.id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${config.model === model.id
                                            ? 'border-primary-500 bg-primary-500/10'
                                            : 'border-white/10 bg-white/5'
                                        }`}
                                    onClick={() => setConfig({ ...config, model: model.id })}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="font-semibold">{model.name}</div>
                                            <div className="text-sm text-gray-400">{model.provider}</div>
                                        </div>
                                        <Bot size={24} className="text-primary-400" />
                                    </div>
                                    <div className="text-sm text-gray-400">{model.cost}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Agent Configuration</h3>
                        <div>
                            <label className="block text-sm font-medium mb-2">System Prompt</label>
                            <textarea
                                value={config.systemPrompt}
                                onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                                rows={6}
                                placeholder="You are a helpful assistant that..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Temperature</label>
                                <Input type="number" defaultValue="0.7" min="0" max="2" step="0.1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Max Tokens</label>
                                <Input type="number" defaultValue="2000" />
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6 text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto">
                            <Bot size={40} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold">Ready to Deploy!</h3>
                        <p className="text-gray-400">Your AI agent is configured and ready to go</p>

                        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                            <div className="p-4 bg-white/5 rounded-lg">
                                <MessageSquare className="mx-auto mb-2 text-primary-400" />
                                <div className="text-sm text-gray-400">Conversations</div>
                                <div className="text-2xl font-bold">0</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <Clock className="mx-auto mb-2 text-primary-400" />
                                <div className="text-sm text-gray-400">Avg Response</div>
                                <div className="text-2xl font-bold">-</div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-lg">
                                <DollarSign className="mx-auto mb-2 text-primary-400" />
                                <div className="text-sm text-gray-400">Total Cost</div>
                                <div className="text-2xl font-bold">$0</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                    <Button
                        variant="outline"
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                    >
                        Previous
                    </Button>
                    {step < 4 ? (
                        <Button
                            variant="premium"
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button variant="premium">
                            <Play size={16} className="mr-2" />
                            Deploy Agent
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    )
}
