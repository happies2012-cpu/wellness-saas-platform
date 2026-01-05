'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 'md', text }: { size?: 'sm' | 'md' | 'lg', text?: string }) {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24',
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
                className={`${sizes[size]} relative`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute inset-0 rounded-full border-4 border-primary-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500" />
            </motion.div>
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-sm"
                >
                    {text}
                </motion.p>
            )}
        </div>
    )
}
