'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Logo({ className = '' }: { className?: string }) {
    return (
        <Link href="/" className={`flex items-center space-x-3 ${className}`}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3"
            >
                {/* Logo Image */}
                <div className="relative w-10 h-10">
                    <Image
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695a500ce95682b1d7a5b656/9474b0b61_gslogo.png"
                        alt="HumanAI Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Brand Text */}
                <div className="flex flex-col">
                    <span className="text-xl font-display font-bold gradient-text">
                        HumanAI
                    </span>
                    <span className="text-[10px] text-gray-400 -mt-1">
                        Workforce OS
                    </span>
                </div>
            </motion.div>
        </Link>
    )
}
