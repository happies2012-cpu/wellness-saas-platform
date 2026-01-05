'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Building, Eye, EyeOff, ArrowRight, Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const roles = [
    { id: 'brand_owner', name: 'Brand Owner', icon: '👑' },
    { id: 'business_owner', name: 'Business Owner', icon: '💼' },
    { id: 'employee', name: 'Employee', icon: '👨‍💼' },
    { id: 'freelancer', name: 'Freelancer', icon: '🎨' },
]

export default function SignupPage() {
    const [step, setStep] = useState(1)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: '',
        workspaceName: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (step < 2) {
            setStep(2)
            return
        }

        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Signup attempt:', formData)
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Hero */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-primary-600 to-dark-100 opacity-90" />

                {/* Floating Elements */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{
                            x: Math.random() * 600,
                            y: Math.random() * 800,
                        }}
                        animate={{
                            y: [null, Math.random() * 800],
                            x: [null, Math.random() * 600],
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <div className="w-3 h-3 bg-white/30 rounded-full blur-sm" />
                    </motion.div>
                ))}

                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full mb-8">
                            <Sparkles className="text-neon-blue" size={20} />
                            <span className="text-sm font-medium">Join the Future</span>
                        </div>

                        <h1 className="text-5xl font-display font-bold mb-6 leading-tight">
                            Build. Automate.
                            <br />
                            <span className="gradient-text">Scale.</span>
                        </h1>

                        <p className="text-xl text-gray-200 mb-12 max-w-md">
                            Join thousands of teams using AI-powered workflows to transform their business operations.
                        </p>

                        {/* Features */}
                        <div className="space-y-4 max-w-md">
                            {[
                                'Unlimited workflow automation',
                                'AI-powered task management',
                                'Real-time collaboration',
                                'Advanced analytics & insights',
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center">
                                        <Check className="text-primary-400" size={16} />
                                    </div>
                                    <span className="text-gray-200">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-full blur-3xl"
                />
            </motion.div>

            {/* Right Side - Signup Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-dark-50">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-8">
                        {[1, 2].map((s) => (
                            <div key={s} className="flex items-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: s * 0.2 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s
                                            ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white'
                                            : 'bg-dark-200 text-gray-500'
                                        }`}
                                >
                                    {s}
                                </motion.div>
                                {s < 2 && (
                                    <div className={`w-16 h-1 mx-2 ${step > s ? 'bg-primary-500' : 'bg-dark-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-display font-bold mb-2">
                            {step === 1 ? 'Create Account' : 'Choose Your Role'}
                        </h2>
                        <p className="text-gray-400">
                            {step === 1 ? 'Start your journey with us' : 'Select how you want to use the platform'}
                        </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-sm font-medium mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <Input
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="pl-12"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <Input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="pl-12"
                                            required
                                        />
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <label className="block text-sm font-medium mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="pl-12 pr-12"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    {roles.map((role, index) => (
                                        <motion.button
                                            key={role.id}
                                            type="button"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => setFormData({ ...formData, role: role.id })}
                                            className={`p-6 rounded-xl border-2 transition-all ${formData.role === role.id
                                                    ? 'border-primary-500 bg-primary-500/10'
                                                    : 'border-dark-200 hover:border-dark-300'
                                                }`}
                                        >
                                            <div className="text-4xl mb-3">{role.icon}</div>
                                            <div className="font-semibold">{role.name}</div>
                                        </motion.button>
                                    ))}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <label className="block text-sm font-medium mb-2">Workspace Name</label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <Input
                                            type="text"
                                            placeholder="My Workspace"
                                            value={formData.workspaceName}
                                            onChange={(e) => setFormData({ ...formData, workspaceName: e.target.value })}
                                            className="pl-12"
                                            required
                                        />
                                    </div>
                                </motion.div>
                            </>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex space-x-4"
                        >
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setStep(1)}
                                    className="flex-1"
                                >
                                    Back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                variant="premium"
                                className="flex-1 group"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Creating...</span>
                                    </div>
                                ) : (
                                    <>
                                        {step === 1 ? 'Continue' : 'Create Account'}
                                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                    </>
                                )}
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-center"
                        >
                            <p className="text-sm text-gray-400">
                                Already have an account?{' '}
                                <Link href="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}
