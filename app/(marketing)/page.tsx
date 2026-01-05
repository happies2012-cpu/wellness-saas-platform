'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, Users, Workflow, Bot, TrendingUp, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const features = [
    {
        icon: Workflow,
        title: 'Workflow Automation',
        description: 'Build, publish, and monetize workflows with drag-drop builder and AI generation',
    },
    {
        icon: Bot,
        title: 'AI Operating System',
        description: 'Multi-agent teams with memory, goals, and human-in-the-loop governance',
    },
    {
        icon: Users,
        title: 'SaaS Workforce',
        description: 'Assign tasks to humans or AI with SLA tracking and productivity analytics',
    },
    {
        icon: TrendingUp,
        title: 'Revenue Engine',
        description: 'MRR, ARPU, LTV tracking with subscriptions, marketplace, and white-label',
    },
    {
        icon: Globe,
        title: 'Full E-commerce',
        description: 'Products, orders, subscriptions, wallets, and payout management',
    },
    {
        icon: Shield,
        title: 'Enterprise CRM',
        description: 'Leads, customers, pipelines, conversations with AI assistance',
    },
]

const stats = [
    { label: 'Active Users', value: '50K+' },
    { label: 'Workflows Created', value: '100K+' },
    { label: 'AI Agents Deployed', value: '25K+' },
    { label: 'Revenue Generated', value: '$10M+' },
]

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'CEO, TechCorp',
        content: 'This platform transformed how we work. Our productivity increased 300% with AI-human collaboration.',
        avatar: '👩‍💼',
    },
    {
        name: 'Michael Chen',
        role: 'Founder, StartupXYZ',
        content: 'The workflow marketplace alone paid for our subscription. We are now selling our own workflows!',
        avatar: '👨‍💻',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Operations Director',
        content: 'Best investment we made. The AI agents handle 70% of routine tasks, freeing our team for strategic work.',
        avatar: '👩‍🔬',
    },
]

export default function HomePage() {
    return (
        <div className="relative">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 animated-gradient opacity-20" />

            {/* Hero Section */}
            <section className="section-padding relative overflow-hidden">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full mb-8"
                        >
                            <Sparkles className="text-neon-blue" size={20} />
                            <span className="text-sm font-medium">Tier-1 Global SaaS Platform</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            The Future of{' '}
                            <span className="gradient-text">Human-AI</span>
                            <br />
                            Collaboration
                        </h1>

                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                            Build workflows, manage teams, sell products, and scale your business with the unified SaaS Workforce + AI Operating System.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href="/signup">
                                <Button variant="premium" size="lg" className="group">
                                    Get Started Free
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </Button>
                            </Link>
                            <Link href="/platform">
                                <Button variant="outline" size="lg">
                                    Explore Platform
                                </Button>
                            </Link>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-neon-blue/20 blur-3xl"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-neon-purple/20 blur-3xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 glass-dark">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl font-display font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Everything You Need to{' '}
                            <span className="gradient-text">Scale</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            A complete platform with CMS, CRM, E-commerce, Workflows, AI Agents, and Workforce Management
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card variant="glass" className="card-hover h-full">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4">
                                        <feature.icon className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Marketplace Preview */}
            <section className="section-padding bg-dark-100/50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Workflow <span className="gradient-text">Marketplace</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Build once, sell forever. Publish your workflows and earn passive income
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Lead Nurturing Flow', price: '$49', sales: '1.2K' },
                            { name: 'E-commerce Automation', price: '$99', sales: '856' },
                            { name: 'AI Content Generator', price: '$79', sales: '2.1K' },
                        ].map((workflow, index) => (
                            <motion.div
                                key={workflow.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card variant="glass" className="card-hover">
                                    <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl mb-4 flex items-center justify-center">
                                        <Workflow size={48} className="text-neon-blue" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{workflow.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold gradient-text">{workflow.price}</span>
                                        <span className="text-sm text-gray-400">{workflow.sales} sales</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/workflows">
                            <Button variant="premium" size="lg">
                                Browse Marketplace
                                <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            Loved by <span className="gradient-text">Thousands</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            See what our customers are saying
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card variant="glass" className="h-full">
                                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                                    <p className="text-gray-300 mb-4 italic">{testimonial.content}</p>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="container-custom relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of teams already using our platform to scale with AI
                        </p>
                        <Link href="/signup">
                            <Button variant="default" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                                Start Free Trial
                                <Zap className="ml-2" size={20} />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
