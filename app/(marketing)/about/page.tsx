'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, Target, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function AboutPage() {
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
                            <span className="text-sm font-medium">Our Story</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Building the Future of{' '}
                            <span className="gradient-text">Work</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-12">
                            We believe in a world where humans and AI work together seamlessly, where anyone can build, sell, and earn through automation.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-dark-100/50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: 'Our Mission',
                                description: 'Democratize access to AI-powered automation and create opportunities for everyone to participate in the digital economy.',
                            },
                            {
                                icon: Users,
                                title: 'Our Vision',
                                description: 'A world where human creativity is amplified by AI, enabling unprecedented levels of productivity and innovation.',
                            },
                            {
                                icon: Zap,
                                title: 'Our Values',
                                description: 'Transparency, innovation, and empowerment. We build tools that put power back in the hands of creators.',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card variant="glass" className="h-full text-center">
                                    <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center mb-4">
                                        <item.icon className="text-white" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '50K+', label: 'Active Users' },
                            { value: '100K+', label: 'Workflows Created' },
                            { value: '25K+', label: 'AI Agents' },
                            { value: '$10M+', label: 'Revenue Generated' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-6">
                            Join Us on This Journey
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Be part of the revolution in human-AI collaboration
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
