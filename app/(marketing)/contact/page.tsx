'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { toast } from 'sonner'

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) throw new Error(data.error || 'Failed to send message')

            toast.success('Message sent successfully! We will get back to you soon.')
            setFormData({ name: '', email: '', message: '' })
        } catch (error: any) {
            console.error('Contact error:', error)
            toast.error(error.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4"
                    >
                        Get in <span className="text-secondary-400">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-primary-400 max-w-2xl mx-auto"
                    >
                        Have questions about our AI platform? We&apos;re here to help you automate and scale.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                        <div className="space-y-6">
                            <Card variant="glass" className="hover:border-secondary-500/50 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center shrink-0">
                                        <Mail className="text-secondary-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                                        <p className="text-primary-400 mb-2">For general inquiries and support</p>
                                        <a href="mailto:hello@guidesoft.ai" className="text-white hover:text-secondary-400 transition-colors">
                                            hello@guidesoft.ai
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            <Card variant="glass" className="hover:border-secondary-500/50 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center shrink-0">
                                        <Phone className="text-secondary-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                                        <p className="text-primary-400 mb-2">Mon-Fri from 9am to 6pm EST</p>
                                        <a href="tel:+15550000000" className="text-white hover:text-secondary-400 transition-colors">
                                            +1 (555) 000-0000
                                        </a>
                                    </div>
                                </div>
                            </Card>

                            <Card variant="glass" className="hover:border-secondary-500/50 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="text-secondary-400" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                                        <p className="text-primary-400 mb-2">Come say hello at our office</p>
                                        <p className="text-white">
                                            100 Innovation Drive<br />
                                            Tech City, TC 90210
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="p-8">
                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-primary-300">Your Name</label>
                                    <Input
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-surface-800 border-surface-700"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-primary-300">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-surface-800 border-surface-700"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-primary-300">Message</label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-lg bg-surface-800 border border-surface-700 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none transition-all resize-none min-h-[150px] text-white placeholder-primary-500"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    variant="premium"
                                    className="w-full btn-primary"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                            Sending...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            Send Message
                                            <Send size={18} className="ml-2" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
