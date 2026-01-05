'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function DeviceShowcase() {
    const [activeDevice, setActiveDevice] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveDevice((prev) => (prev + 1) % 3)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const devices = [
        {
            name: 'Desktop',
            icon: '💻',
            description: 'Full-featured dashboard',
            scale: 1,
        },
        {
            name: 'Tablet',
            icon: '📱',
            description: 'Optimized for iPad',
            scale: 0.8,
        },
        {
            name: 'Mobile',
            icon: '📱',
            description: 'On-the-go access',
            scale: 0.6,
        },
    ]

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center">
            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 blur-3xl"
            />

            {/* MacBook */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{
                    opacity: activeDevice === 0 ? 1 : 0.4,
                    y: 0,
                    scale: activeDevice === 0 ? 1 : 0.9,
                    z: activeDevice === 0 ? 0 : -100,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="relative">
                    {/* MacBook Frame */}
                    <div className="w-[800px] h-[500px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl">
                        {/* Screen */}
                        <div className="w-full h-full bg-dark-50 rounded-lg overflow-hidden relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-dark-100 rounded-b-2xl z-10" />

                            {/* Content Preview */}
                            <div className="p-8 space-y-6">
                                <div className="h-12 w-48 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg animate-pulse" />
                                <div className="grid grid-cols-3 gap-4">
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="h-32 glass rounded-xl"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Base */}
                    <div className="w-[850px] h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-3xl -mt-1 mx-auto" />
                </div>
            </motion.div>

            {/* iPad */}
            <motion.div
                initial={{ opacity: 0, x: -100, rotateY: -20 }}
                animate={{
                    opacity: activeDevice === 1 ? 1 : 0.4,
                    x: activeDevice === 1 ? 0 : -200,
                    rotateY: activeDevice === 1 ? 0 : -20,
                    scale: activeDevice === 1 ? 1 : 0.8,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute left-0"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="w-[600px] h-[800px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl p-3 shadow-2xl">
                    <div className="w-full h-full bg-dark-50 rounded-2xl overflow-hidden">
                        <div className="p-6 space-y-4">
                            <div className="h-10 w-40 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg" />
                            <div className="grid grid-cols-2 gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-28 glass rounded-xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* iPhone */}
            <motion.div
                initial={{ opacity: 0, x: 100, rotateY: 20 }}
                animate={{
                    opacity: activeDevice === 2 ? 1 : 0.4,
                    x: activeDevice === 2 ? 0 : 200,
                    rotateY: activeDevice === 2 ? 0 : 20,
                    scale: activeDevice === 2 ? 1 : 0.8,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute right-0"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="w-[300px] h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    {/* Dynamic Island */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-8 bg-black rounded-full z-10" />

                    <div className="w-full h-full bg-dark-50 rounded-[2.5rem] overflow-hidden">
                        <div className="p-4 pt-12 space-y-3">
                            <div className="h-8 w-32 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg mx-auto" />
                            <div className="space-y-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="h-20 glass rounded-xl" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Device Indicators */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-4">
                {devices.map((device, index) => (
                    <motion.button
                        key={device.name}
                        onClick={() => setActiveDevice(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-xl transition-all ${activeDevice === index
                                ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white'
                                : 'glass text-gray-400 hover:text-white'
                            }`}
                    >
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">{device.icon}</span>
                            <div className="text-left">
                                <div className="font-semibold text-sm">{device.name}</div>
                                <div className="text-xs opacity-75">{device.description}</div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
