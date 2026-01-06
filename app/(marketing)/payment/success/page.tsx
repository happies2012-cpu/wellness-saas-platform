'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Download, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function PaymentSuccessContent() {
    const searchParams = useSearchParams()
    const [orderDetails, setOrderDetails] = useState({
        orderId: searchParams.get('orderId') || 'N/A',
        amount: searchParams.get('amount') || '0',
        planName: searchParams.get('plan') || 'Pro',
    })

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl"
            >
                <Card variant="glass" className="text-center">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle size={48} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-4">
                        Payment Successful! 🎉
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Thank you for subscribing to HumanAI
                    </p>

                    {/* Order Details */}
                    <div className="bg-white/5 rounded-xl p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Order ID</div>
                                <div className="font-semibold">{orderDetails.orderId}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Plan</div>
                                <div className="font-semibold">{orderDetails.planName}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Amount Paid</div>
                                <div className="font-semibold text-green-400">
                                    ₹{parseInt(orderDetails.amount).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* What's Next */}
                    <div className="text-left mb-8">
                        <h3 className="font-semibold mb-4">What&apos;s Next?</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">
                                    A confirmation email has been sent to your registered email address
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">
                                    Your account has been upgraded to {orderDetails.planName} plan
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-300">
                                    You can now access all premium features from your dashboard
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="flex-1">
                            <Download size={20} className="mr-2" />
                            Download Invoice
                        </Button>
                        <Link href="/dashboard" className="flex-1">
                            <Button variant="premium" className="w-full">
                                Go to Dashboard
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {/* Support */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-sm text-gray-400">
                            Need help? Contact us at{' '}
                            <a href="mailto:support@humanai.com" className="text-primary-400 hover:text-primary-300">
                                support@humanai.com
                            </a>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400">Loading...</p></div></div>}>
            <PaymentSuccessContent />
        </Suspense>
    )
}
