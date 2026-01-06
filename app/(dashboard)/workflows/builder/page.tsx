'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Play, Save, Download, Upload, Settings, Zap, Clock, Database, Mail, Code } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface WorkflowNode {
    id: string
    type: 'trigger' | 'action' | 'condition'
    name: string
    icon: any
    x: number
    y: number
}

export default function WorkflowBuilderPage() {
    const [nodes, setNodes] = useState<WorkflowNode[]>([])
    const [selectedNode, setSelectedNode] = useState<string | null>(null)

    const nodeTypes = [
        { type: 'trigger', name: 'Trigger', icon: Zap, color: 'from-yellow-500 to-yellow-700' },
        { type: 'action', name: 'Action', icon: Settings, color: 'from-blue-500 to-blue-700' },
        { type: 'condition', name: 'Condition', icon: Code, color: 'from-purple-500 to-purple-700' },
    ]

    const triggerOptions = [
        { name: 'Schedule', icon: Clock, description: 'Run on a schedule' },
        { name: 'Webhook', icon: Database, description: 'Trigger via webhook' },
        { name: 'Email', icon: Mail, description: 'When email received' },
    ]

    const actionOptions = [
        { name: 'Send Email', icon: Mail, description: 'Send an email' },
        { name: 'API Call', icon: Database, description: 'Make HTTP request' },
        { name: 'Transform Data', icon: Code, description: 'Transform data' },
    ]

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="border-b border-white/10 bg-dark-100/50 backdrop-blur-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/workflows">
                            <Button variant="outline" size="sm">← Back</Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold">Workflow Builder</h1>
                            <p className="text-sm text-gray-400">Create automated workflows</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Upload size={16} className="mr-2" />
                            Import
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download size={16} className="mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Save size={16} className="mr-2" />
                            Save
                        </Button>
                        <Button variant="premium" size="sm">
                            <Play size={16} className="mr-2" />
                            Test Run
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar - Node Palette */}
                <div className="w-64 border-r border-white/10 bg-dark-100/30 backdrop-blur-xl p-4 overflow-y-auto">
                    <h3 className="text-sm font-semibold mb-4 text-gray-400">TRIGGERS</h3>
                    <div className="space-y-2 mb-6">
                        {triggerOptions.map((trigger) => (
                            <motion.div
                                key={trigger.name}
                                whileHover={{ scale: 1.02 }}
                                className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-move hover:border-yellow-500/50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center">
                                        <trigger.icon size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{trigger.name}</div>
                                        <div className="text-xs text-gray-400">{trigger.description}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <h3 className="text-sm font-semibold mb-4 text-gray-400">ACTIONS</h3>
                    <div className="space-y-2 mb-6">
                        {actionOptions.map((action) => (
                            <motion.div
                                key={action.name}
                                whileHover={{ scale: 1.02 }}
                                className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-move hover:border-blue-500/50 transition-colors"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                                        <action.icon size={16} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">{action.name}</div>
                                        <div className="text-xs text-gray-400">{action.description}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <h3 className="text-sm font-semibold mb-4 text-gray-400">CONDITIONS</h3>
                    <div className="space-y-2">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="p-3 bg-white/5 rounded-lg border border-white/10 cursor-move hover:border-purple-500/50 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                                    <Code size={16} className="text-white" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium">If/Else</div>
                                    <div className="text-xs text-gray-400">Conditional logic</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dark-100 via-dark-200 to-dark-100">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }}
                    />

                    {/* Empty State */}
                    {nodes.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-4">
                                    <Zap size={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Start Building Your Workflow</h3>
                                <p className="text-gray-400 mb-4">Drag nodes from the left panel to get started</p>
                                <Button variant="premium">
                                    <Plus size={16} className="mr-2" />
                                    Add Trigger
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Workflow Nodes */}
                    {nodes.map((node) => (
                        <motion.div
                            key={node.id}
                            drag
                            dragMomentum={false}
                            className={`absolute w-48 p-4 bg-dark-100 border-2 rounded-lg cursor-move ${selectedNode === node.id ? 'border-primary-500' : 'border-white/10'
                                }`}
                            style={{ left: node.x, top: node.y }}
                            onClick={() => setSelectedNode(node.id)}
                        >
                            <div className="flex items-center space-x-3 mb-2">
                                <div className={`w-8 h-8 rounded bg-gradient-to-br ${node.type === 'trigger' ? 'from-yellow-500 to-yellow-700' :
                                        node.type === 'action' ? 'from-blue-500 to-blue-700' :
                                            'from-purple-500 to-purple-700'
                                    } flex items-center justify-center`}>
                                    <node.icon size={16} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-400 uppercase">{node.type}</div>
                                    <div className="text-sm font-medium">{node.name}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Properties Panel */}
                <div className="w-80 border-l border-white/10 bg-dark-100/30 backdrop-blur-xl p-4 overflow-y-auto">
                    <h3 className="text-sm font-semibold mb-4">PROPERTIES</h3>
                    {selectedNode ? (
                        <Card variant="glass">
                            <p className="text-sm text-gray-400">Select a node to configure its properties</p>
                        </Card>
                    ) : (
                        <div className="text-center text-gray-400 text-sm py-8">
                            Select a node to view properties
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
