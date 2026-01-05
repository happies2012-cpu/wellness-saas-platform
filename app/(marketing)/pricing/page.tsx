'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const plans = [
    {
        name: 'Free',
        price: 0,
        interval: 'month',
        description: 'Perfect for getting started',
        features: [
            '1 workspace',
            '5 team members',
            '10 workflows',
            '100 AI credits/month',
            'Basic CRM',
            'Basic E-commerce',
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Pro',
        price: 49,
        interval: 'month',
        description: 'For growing teams',
        features: [
            '5 workspaces',
            '25 team members',
            'Unlimited workflows',
            '1,000 AI credits/month',
            'Advanced CRM',
            'Advanced E-commerce',
            'Workflow marketplace',
            'AI agents (5)',
        ],
        cta: 'Start Free Trial',
        popular: true,
    },
    {
        name: 'Business',
        price: 149,
        interval: 'month',
        description: 'For scaling businesses',
        features: [
            'Unlimited workspaces',
            'Unlimited team members',
            'Unlimited workflows',
            '10,000 AI credits/month',
            'Full CRM suite',
            'Full E-commerce suite',
            'Workflow marketplace',
            'AI agents (25)',
            'White-label options',
            'Priority support',
        ],
        cta: 'Start Free Trial',
        popular: false,
    },
    {
        name: 'Enterprise',
        price: 499,
        interval: 'month',
        description: 'For large organizations',
        features: [
            'Everything in Business',
            'Unlimited AI credits',
            'Unlimited AI agents',
            'Custom integrations',
            'Dedicated support',
            'SLA guarantees',
            'Custom contracts',
        ],
        cta: 'Contact Sales',
        popular: false,
    },
]

export default function PricingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="section-padding bg-gradient-to-b from-dark-50 to-dark-100">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                            Simple, <span className="gradient-text">Transparent</span> Pricing
                        </h1>
                        <p className="text-xl text-gray-400">
                            Choose the perfect plan for your team. All plans include a 14-day free trial.
                        </p>
                    </motion.div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card
                                    variant="glass"
                                    className={`h-full relative ${plan.popular ? 'ring-2 ring-primary-500 shadow-neon' : ''
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <span className="px-4 py-1 bg-gradient-to-r from-primary-500 to-primary-700 text-white text-sm font-semibold rounded-full">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                        <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                                        <div className="mb-4">
                                            <span className="text-5xl font-bold gradient-text">
                                                ${plan.price}
                                            </span>
                                            <span className="text-gray-400">/{plan.interval}</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start space-x-3">
                                                <Check className="text-primary-400 flex-shrink-0 mt-1" size={18} />
                                                <span className="text-sm text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/signup" className="block">
                                        <Button
                                            variant={plan.popular ? 'premium' : 'outline'}
                                            className="w-full"
                                        >
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-padding">
                <div className="container-custom max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-display font-bold mb-4">
                            Frequently Asked Questions
                        </h2>
                    </motion.div>

                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can I change plans later?',
                                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
                            },
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept all major credit cards, debit cards, and support payment via Stripe.',
                            },
                            {
                                q: 'Is there a free trial?',
                                a: 'Yes! All paid plans include a 14-day free trial. No credit card required.',
                            },
                            {
                                q: 'What happens when I run out of AI credits?',
                                a: 'You can purchase additional AI credits or upgrade to a higher plan for more monthly credits.',
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card variant="glass">
                                    <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                                    <p className="text-gray-400">{faq.a}</p>
                                </Card>
                            </motion.div>
                        ))}
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
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
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
