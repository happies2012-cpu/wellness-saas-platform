'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Mail } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

function VerifyEmailContent() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')
    const token = searchParams.get('token')

    useEffect(() => {
        if (token) {
            verifyEmail(token)
        } else {
            setStatus('error')
            setMessage('Invalid verification link')
        }
    }, [token])

    const verifyEmail = async (token: string) => {
        try {
            const response = await fetch(`/api/auth/verify-email?token=${token}`)
            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setMessage(data.message || 'Email verified successfully!')
            } else {
                setStatus('error')
                setMessage(data.error || 'Verification failed')
            }
        } catch (error) {
            setStatus('error')
            setMessage('An error occurred during verification')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
            >
                <Card variant="glass">
                    {status === 'loading' && (
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2">Verifying Email...</h2>
                            <p className="text-gray-400">Please wait while we verify your email address</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle size={32} className="text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
                            <p className="text-gray-400 mb-6">{message}</p>
                            <Link href="/login">
                                <Button variant="premium" className="w-full">
                                    Continue to Login
                                </Button>
                            </Link>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                                <XCircle size={32} className="text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
                            <p className="text-gray-400 mb-6">{message}</p>
                            <Link href="/signup">
                                <Button variant="outline" className="w-full">
                                    Back to Signup
                                </Button>
                            </Link>
                        </div>
                    )}
                </Card>
            </motion.div>
        </div>
    )
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    )
}
