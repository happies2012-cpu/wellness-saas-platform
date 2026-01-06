'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Logo({ className = '', size = 40 }: { className?: string; size?: number }) {
    return (
        <Link href="/" className={`flex items-center space-x-3 ${className}`}>
            <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
            >
                {/* Your Brand Logo */}
                <div className="relative" style={{ width: size, height: size }}>
                    <Image
                        src="/logo.png"
                        alt="GS Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Brand Text */}
                <div className="flex flex-col">
                    <span className="text-xl font-display font-bold gradient-text">
                        GUIDESOFT AI
                    </span>
                    <span className="text-[10px] text-gray-400 -mt-1">
                        Workforce OS
                    </span>
                </div>
            </motion.div>
        </Link>
    )
}
