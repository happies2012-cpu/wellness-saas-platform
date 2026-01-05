'use client'

import { motion } from 'framer-motion'

export default function GalaxyBackground() {
    return (
        <>
            <div className="galaxy-bg">
                {/* Grid Overlay */}
                <div className="grid-overlay" />

                {/* Magic Glows */}
                <div className="magic-glow magic-glow-1" />
                <div className="magic-glow magic-glow-2" />
                <div className="magic-glow magic-glow-3" />

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="particle" />
                ))}
            </div>

            <style jsx global>{`
        @import url('/galaxy-background.css');
      `}</style>
        </>
    )
}
