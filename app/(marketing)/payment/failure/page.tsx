'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { XCircle, RefreshCw, ArrowLeft, Mail } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function PaymentFailureContent() {
    const searchParams = useSearchParams()
    const [errorDetails, setErrorDetails] = useState({
        message: searchParams.get('message') || 'Payment could not be processed',
        orderId: searchParams.get('orderId') || 'N/A',
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
                    {/* Error Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mx-auto mb-6"
                    >
                        <XCircle size={48} className="text-white" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold mb-4">
                        Payment Failed
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        {errorDetails.message}
                    </p>

                    {/* Error Details */}
                    <div className="bg-white/5 rounded-xl p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Reference ID</div>
                                <div className="font-semibold">{errorDetails.orderId}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 mb-1">Plan</div>
                                <div className="font-semibold">{errorDetails.planName}</div>
                            </div>
                        </div>
                    </div>

                    {/* Common Reasons */}
                    <div className="text-left mb-8">
                        <h3 className="font-semibold mb-4">Common Reasons for Payment Failure</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                                <span className="text-gray-300">
                                    Insufficient funds in your account
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                                <span className="text-gray-300">
                                    Incorrect card details or expired card
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                                <span className="text-gray-300">
                                    Bank declined the transaction
                                </span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0 mt-2" />
                                <span className="text-gray-300">
                                    Network or technical issues
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/pricing" className="flex-1">
                            <Button variant="outline" className="w-full">
                                <ArrowLeft size={20} className="mr-2" />
                                Back to Pricing
                            </Button>
                        </Link>
                        <Link href="/pricing" className="flex-1">
                            <Button variant="premium" className="w-full">
                                <RefreshCw size={20} className="mr-2" />
                                Try Again
                            </Button>
                        </Link>
                    </div>

                    {/* Support */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                            <Mail size={16} />
                            <span>
                                Need help?{' '}
                                <a href="mailto:support@humanai.com" className="text-primary-400 hover:text-primary-300">
                                    Contact Support
                                </a>
                            </span>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}

export default function PaymentFailurePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-400">Loading...</p></div></div>}>
            <PaymentFailureContent />
        </Suspense>
    )
}
