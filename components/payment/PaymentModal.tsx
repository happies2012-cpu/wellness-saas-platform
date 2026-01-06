'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Zap, CreditCard } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface PaymentModalProps {
    isOpen: boolean
    onClose: () => void
    plan: {
        name: string
        price: number
        planId: string
    }
}

export default function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
    const [selectedMethod, setSelectedMethod] = useState<'payu' | 'cashfree' | 'upi'>('payu')
    const [loading, setLoading] = useState(false)
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        email: '',
        phone: '',
    })

    const paymentMethods = [
        {
            id: 'payu' as const,
            name: 'PayU',
            description: 'Credit/Debit Cards, Net Banking',
            icon: CreditCard,
            color: 'from-blue-500 to-blue-700',
        },
        {
            id: 'cashfree' as const,
            name: 'Cashfree',
            description: 'All Payment Methods',
            icon: Zap,
            color: 'from-purple-500 to-purple-700',
        },
        {
            id: 'upi' as const,
            name: 'UPI',
            description: 'Google Pay, PhonePe, Paytm',
            icon: Zap,
            color: 'from-green-500 to-green-700',
        },
    ]

    const handlePayment = async () => {
        try {
            setLoading(true)

            // Validate customer details
            if (!customerDetails.name || !customerDetails.email || !customerDetails.phone) {
                alert('Please fill in all customer details')
                setLoading(false)
                return
            }

            // Call payment API
            const response = await fetch('/api/payments/indian', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    method: selectedMethod,
                    amount: plan.price,
                    planId: plan.planId,
                    customerDetails,
                }),
            })

            if (!response.ok) {
                throw new Error('Payment initiation failed')
            }

            const data = await response.json()

            // Redirect to payment gateway
            if (data.paymentUrl) {
                window.location.href = data.paymentUrl
            } else if (data.paymentData) {
                // For PayU, submit form
                const form = document.createElement('form')
                form.method = 'POST'
                form.action = data.paymentData.action

                Object.keys(data.paymentData.params).forEach(key => {
                    const input = document.createElement('input')
                    input.type = 'hidden'
                    input.name = key
                    input.value = data.paymentData.params[key]
                    form.appendChild(input)
                })

                document.body.appendChild(form)
                form.submit()
            }
        } catch (error: any) {
            console.error('Payment error:', error)
            alert('Payment failed. Please try again.')
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl"
                        >
                            <Card variant="glass" className="relative">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                {/* Header */}
                                <div className="border-b border-white/10 pb-6 mb-6">
                                    <h2 className="text-2xl font-bold mb-2">Complete Your Purchase</h2>
                                    <p className="text-gray-400">
                                        {plan.name} Plan - ₹{plan.price.toLocaleString()}/month
                                    </p>
                                </div>

                                {/* Customer Details */}
                                <div className="space-y-4 mb-6">
                                    <h3 className="font-semibold mb-3">Customer Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={customerDetails.name}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email</label>
                                            <input
                                                type="email"
                                                value={customerDetails.email}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={customerDetails.phone}
                                                onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                                                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                                                placeholder="+91 9876543210"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Select Payment Method</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {paymentMethods.map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setSelectedMethod(method.id)}
                                                className={`p-4 rounded-xl border-2 transition-all ${selectedMethod === method.id
                                                        ? 'border-primary-500 bg-primary-500/10'
                                                        : 'border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-3 mx-auto`}>
                                                    <method.icon size={24} className="text-white" />
                                                </div>
                                                <div className="font-semibold mb-1">{method.name}</div>
                                                <div className="text-xs text-gray-400">{method.description}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center space-x-4">
                                    <Button
                                        variant="outline"
                                        onClick={onClose}
                                        className="flex-1"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="premium"
                                        onClick={handlePayment}
                                        className="flex-1"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            <>
                                                Pay ₹{plan.price.toLocaleString()}
                                            </>
                                        )}
                                    </Button>
                                </div>

                                {/* Security Notice */}
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <p className="text-xs text-gray-400 text-center">
                                        🔒 Your payment is secured with industry-standard encryption
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
