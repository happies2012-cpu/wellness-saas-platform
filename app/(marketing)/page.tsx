'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Users, Workflow, Bot, TrendingUp, Star, Mail, Phone, MessageCircle, Globe, Shield, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Image from 'next/image'
import DeviceShowcase from '@/components/ui/DeviceShowcase'

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
        image: '/images/sarah.png',
    },
    {
        name: 'Michael Chen',
        role: 'Founder, StartupXYZ',
        content: 'The workflow marketplace alone paid for our subscription. We are now selling our own workflows!',
        image: '/images/michael.png',
    },
    {
        name: 'Emily Rodriguez',
        role: 'Operations Director',
        content: 'Best investment we made. The AI agents handle 70% of routine tasks, freeing our team for strategic work.',
        image: '/images/emily.png',
    },
]

export default function HomePage() {
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="section-padding relative overflow-hidden bg-surface-50">
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
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/50 backdrop-blur rounded-full mb-8 border border-primary-100"
                        >
                            <Sparkles className="text-secondary-500" size={20} />
                            <span className="text-sm font-medium text-primary-700">Tier-1 Global SaaS Platform</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-primary-900">
                            The Future of{' '}
                            <span className="gradient-text">Human-AI</span>
                            <br />
                            Collaboration
                        </h1>

                        <p className="text-xl text-primary-500 mb-12 max-w-2xl mx-auto">
                            Build workflows, manage teams, sell products, and scale your business with the unified SaaS Workforce + AI Operating System.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link href="/signup">
                                <Button variant="default" size="lg" className="btn-primary group">
                                    Get Started Free
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </Button>
                            </Link>
                            <Link href="/platform">
                                <Button variant="outline" size="lg" className="btn-outline">
                                    Explore Platform
                                </Button>
                            </Link>
                        </div>

                        {/* Device Showcase (Replaced with Image) */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="mt-20 relative z-10"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary-100 bg-white">
                                <Image
                                    src="/images/hero-dashboard.png"
                                    alt="Platform Dashboard"
                                    width={1200}
                                    height={800}
                                    className="w-full h-auto"
                                    layout="responsive"
                                />
                            </div>
                        </motion.div>

                        {/* Floating Elements (Subtle) */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-secondary-200/30 blur-3xl -z-10"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-accent-200/30 blur-3xl -z-10"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-y border-primary-100">
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
                                <div className="text-sm text-primary-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding bg-surface-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-900">
                            Everything You Need to{' '}
                            <span className="gradient-text">Scale</span>
                        </h2>
                        <p className="text-xl text-primary-500 max-w-2xl mx-auto">
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
                                <Card variant="glass" className="card-hover h-full bg-white border-primary-100 shadow-sm hover:shadow-md transition-all">
                                    <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4 text-secondary-600">
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-primary-900">{feature.title}</h3>
                                    <p className="text-primary-500">{feature.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Marketplace Preview */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-900">
                            Workflow <span className="gradient-text">Marketplace</span>
                        </h2>
                        <p className="text-xl text-primary-500 max-w-2xl mx-auto">
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
                                <Card variant="glass" className="card-hover bg-surface-50 border-primary-100">
                                    <div className="aspect-video bg-secondary-50 rounded-xl mb-4 flex items-center justify-center">
                                        <Workflow size={48} className="text-secondary-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-primary-900">{workflow.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold gradient-text">{workflow.price}</span>
                                        <span className="text-sm text-primary-500">{workflow.sales} sales</span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/workflows">
                            <Button variant="default" size="lg" className="btn-primary">
                                Browse Marketplace
                                <ArrowRight className="ml-2" size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="section-padding bg-surface-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-900">
                            Loved by <span className="gradient-text">Thousands</span>
                        </h2>
                        <p className="text-xl text-primary-500">
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
                                <Card variant="glass" className="h-full bg-white border-primary-100 p-8 hover:shadow-lg transition-all">
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-secondary-100">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-primary-900 text-lg">{testimonial.name}</div>
                                            <div className="text-sm text-primary-500">{testimonial.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-primary-600 italic leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-primary-900">
                            Get In Touch
                        </h2>
                        <p className="text-xl text-primary-500 max-w-2xl mx-auto">
                            Have questions? We&apos;re here to help. Reach out through any of these channels.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                icon: Mail,
                                title: 'Email Us',
                                description: 'Get in touch via email',
                                action: 'hello@humanai.com',
                                href: 'mailto:hello@humanai.com',
                                color: 'bg-blue-100 text-blue-600',
                            },
                            {
                                icon: MessageCircle,
                                title: 'Live Chat',
                                description: 'Chat with our team',
                                action: 'Start Chat',
                                href: '#',
                                color: 'bg-purple-100 text-purple-600',
                            },
                            {
                                icon: Phone,
                                title: 'Call Us',
                                description: 'Speak with an expert',
                                action: '+1 (555) 123-4567',
                                href: 'tel:+15551234567',
                                color: 'bg-pink-100 text-pink-600',
                            },
                        ].map((contact, index) => (
                            <motion.a
                                key={contact.title}
                                href={contact.href}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass rounded-2xl p-8 text-center group cursor-pointer bg-surface-50 border-primary-100"
                            >
                                <div className={`w-16 h-16 rounded-full ${contact.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                                    <contact.icon size={32} />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-primary-900">{contact.title}</h3>
                                <p className="text-primary-500 mb-4">{contact.description}</p>
                                <div className="text-secondary-600 font-medium group-hover:text-secondary-700 transition-colors">
                                    {contact.action}
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <p className="text-primary-400 mb-6">Follow us on social media</p>
                        <div className="flex items-center justify-center space-x-6">
                            {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-secondary-50 transition-colors text-primary-600 border border-primary-200"
                                >
                                    <span className="text-sm font-medium">{social[0]}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-primary-900 relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
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
                        <p className="text-xl mb-8 opacity-90 text-primary-100">
                            Join thousands of teams already using our platform to scale with AI
                        </p>
                        <Link href="/signup">
                            <Button variant="default" size="lg" className="bg-white text-primary-900 hover:bg-primary-50 font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
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
