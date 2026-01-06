'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

export default function AIAgentChatPage({ params }: { params: { id: string } }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Hello! I\'m your AI assistant. How can I help you today?',
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        }

        setMessages([...messages, userMessage])
        setInput('')
        setLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'This is a simulated response. In production, this would connect to your AI model API.',
                timestamp: new Date(),
            }
            setMessages(prev => [...prev, aiMessage])
            setLoading(false)
        }, 1000)
    }

    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <div className="border-b border-white/10 bg-dark-100/50 backdrop-blur-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="font-semibold">AI Assistant</h1>
                            <p className="text-xs text-gray-400">GPT-4 • Online</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Clear Chat</Button>
                        <Button variant="outline" size="sm">Export</Button>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                    <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex space-x-3 max-w-2xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                    ? 'bg-primary-500'
                                    : 'bg-gradient-to-br from-purple-500 to-purple-700'
                                }`}>
                                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div>
                                <Card variant="glass" className={message.role === 'user' ? 'bg-primary-500/20' : ''}>
                                    <p className="text-sm">{message.content}</p>
                                </Card>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="text-xs text-gray-400">
                                        {message.timestamp.toLocaleTimeString()}
                                    </span>
                                    {message.role === 'assistant' && (
                                        <>
                                            <button className="text-gray-400 hover:text-white">
                                                <Copy size={14} />
                                            </button>
                                            <button className="text-gray-400 hover:text-green-400">
                                                <ThumbsUp size={14} />
                                            </button>
                                            <button className="text-gray-400 hover:text-red-400">
                                                <ThumbsDown size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="flex space-x-3 max-w-2xl">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                                <Bot size={16} />
                            </div>
                            <Card variant="glass">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/10 bg-dark-100/50 backdrop-blur-xl p-4">
                <div className="flex space-x-4">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1"
                    />
                    <Button variant="premium" onClick={handleSend} disabled={loading || !input.trim()}>
                        <Send size={16} className="mr-2" />
                        Send
                    </Button>
                </div>
            </div>
        </div>
    )
}
