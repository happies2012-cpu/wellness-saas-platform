'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import Image from 'next/image'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isGoogleLoading, setIsGoogleLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            })

            if (error) throw error

            toast.success('Successfully logged in!')
            router.push('/dashboard')
            router.refresh()
        } catch (err: any) {
            console.error('Login error:', err)
            setError(err.message || 'Failed to login')
            toast.error(err.message || 'Failed to login')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) throw error
        } catch (err: any) {
            console.error('Google login error:', err)
            toast.error(err.message || 'Failed to initialize Google login')
            setIsGoogleLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-surface-50">
            {/* Left Side - Hero Image with Overlay */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                {/* Background Image */}
                <div className="absolute inset-0 bg-primary-900">
                    <Image
                        src="/images/hero-dashboard.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay"
                    />
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-primary-800/80" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16 text-white h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-8 border border-white/20">
                            <Sparkles className="text-secondary-400" size={20} />
                            <span className="text-sm font-medium">Welcome Back</span>
                        </div>

                        <h1 className="text-5xl font-display font-bold mb-6 leading-tight">
                            Discover Your Space.
                            <br />
                            <span className="text-secondary-400">Redefined.</span>
                        </h1>

                        <p className="text-xl text-primary-100 mb-12 max-w-md">
                            Experience the future of human-AI collaboration. Build workflows, manage teams, and scale your business.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-md">
                            {[
                                { value: '50K+', label: 'Active Users' },
                                { value: '100K+', label: 'Workflows' },
                                { value: '98%', label: 'Success Rate' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl font-bold text-secondary-400 mb-1">{stat.value}</div>
                                    <div className="text-sm text-primary-200">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-primary-900">Sign In</h2>
                        <p className="text-sm text-primary-500 mt-2">to your GuideSoft account</p>
                    </div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-primary-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-12 bg-white border-primary-200 text-primary-900 focus:border-secondary-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-primary-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400" size={20} />
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-12 pr-12 bg-white border-primary-200 text-primary-900 focus:border-secondary-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-primary-300 text-secondary-600 focus:ring-secondary-500" />
                                <span className="text-sm text-primary-500">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-secondary-600 hover:text-secondary-700 font-medium">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full group btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </>
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-primary-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-surface-50 text-primary-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-1 gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full btn-outline"
                                onClick={handleGoogleLogin}
                                disabled={isGoogleLoading}
                            >
                                {isGoogleLoading ? (
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                )}
                                Sign in with Google
                            </Button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-primary-500">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="text-secondary-600 hover:text-secondary-700 font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    )
}
