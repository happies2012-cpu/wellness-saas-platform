'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
    Workflow, Bot, Users, ShoppingCart, MessageSquare,
    FileText, TrendingUp, Zap, Globe, Shield, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const systems = [
    {
        icon: FileText,
        name: 'Content Management',
        description: 'Create and manage pages, blogs, and media with AI-powered SEO optimization',
        features: ['Dynamic page builder', 'Blog system', 'Media library', 'SEO tools'],
    },
    {
        icon: MessageSquare,
        name: 'Customer Relationship',
        description: 'Manage leads, customers, and conversations with AI assistance',
        features: ['Lead tracking', 'Pipeline management', 'AI chat support', 'Activity logs'],
    },
    {
        icon: ShoppingCart,
        name: 'E-Commerce Suite',
        description: 'Complete e-commerce platform with products, orders, and subscriptions',
        features: ['Product catalog', 'Order management', 'Subscriptions', 'Wallets & payouts'],
    },
    {
        icon: Workflow,
        name: 'Workflow Engine',
        description: 'Build, automate, and monetize workflows with drag-drop builder',
        features: ['Visual builder', 'AI generation', 'Marketplace', 'Versioning'],
    },
    {
        icon: Bot,
        name: 'AI Operating System',
        description: 'Deploy AI agents with memory, goals, and multi-agent collaboration',
        features: ['ChatGPT integration', 'Agent teams', 'Usage tracking', 'Human oversight'],
    },
    {
        icon: Users,
        name: 'Workforce Management',
        description: 'Assign tasks to humans or AI with SLA tracking and analytics',
        features: ['Task assignment', 'Productivity metrics', 'SLA tracking', 'Approvals'],
    },
    {
        icon: TrendingUp,
        name: 'Revenue Engine',
        description: 'Track MRR, ARPU, LTV with multiple monetization streams',
        features: ['Subscription tracking', 'Marketplace sales', 'AI credits', 'Analytics'],
    },
    {
        icon: Globe,
        name: 'Marketing Tools',
        description: 'AI-powered SEO, content generation, and social media management',
        features: ['SEO optimization', 'Content AI', 'Social scheduler', 'PPC tools'],
    },
]

export default function PlatformPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="absolute inset-0 -z-10 animated-gradient opacity-20" />

                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full mb-8"
                        >
                            <Sparkles className="text-neon-blue" size={20} />
                            <span className="text-sm font-medium">All-in-One Platform</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Everything You Need to{' '}
                            <span className="gradient-text">Scale</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-12">
                            A complete platform combining CMS, CRM, E-commerce, Workflows, AI Agents, and Workforce Management in one unified system.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href="/signup">
                                <Button variant="premium" size="lg">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button variant="outline" size="lg">
                                    View Pricing
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Systems Grid */}
            <section className="section-padding bg-dark-100/50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            8 Powerful Systems in One Platform
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything integrated and working together seamlessly
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {systems.map((system, index) => (
                            <motion.div
                                key={system.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card variant="glass" className="card-hover h-full">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4">
                                        <system.icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{system.name}</h3>
                                    <p className="text-gray-400 mb-4 text-sm">{system.description}</p>
                                    <ul className="space-y-2">
                                        {system.features.map((feature) => (
                                            <li key={feature} className="flex items-center space-x-2 text-sm text-gray-300">
                                                <Shield className="text-primary-400" size={14} />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Benefits */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-display font-bold mb-6">
                                Built for <span className="gradient-text">Everyone</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: 'Anyone Can Join',
                                        description: 'Public registration with role-based access control for 9 different user types',
                                    },
                                    {
                                        title: 'Anyone Can Work',
                                        description: 'Assign tasks to humans or AI agents with full productivity tracking',
                                    },
                                    {
                                        title: 'Anyone Can Sell',
                                        description: 'Publish workflows to the marketplace and earn passive income',
                                    },
                                    {
                                        title: 'Anyone Can Earn',
                                        description: 'Affiliate program, referrals, and multiple revenue streams',
                                    },
                                ].map((benefit, index) => (
                                    <motion.div
                                        key={benefit.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                        <p className="text-gray-400">{benefit.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                                <Zap size={120} className="text-primary-400 opacity-50" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-6">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Start your 14-day free trial today. No credit card required.
                        </p>
                        <Link href="/signup">
                            <Button variant="default" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                                Get Started Free
                                <Zap className="ml-2" size={20} />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
