'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695a500ce95682b1d7a5b656/9474b0b61_gslogo.png'

const navigation = [
    { name: 'Platform', href: '/platform' },
    { name: 'Workflows', href: '/workflows' },
    { name: 'AI Agents', href: '/ai-agents' },
    { name: 'Workforce', href: '/workforce' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-dark backdrop-blur-glass-lg">
            <nav className="container-custom flex items-center justify-between py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src={LOGO_URL}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="rounded-lg"
                    />
                    <span className="text-xl font-display font-bold gradient-text">
                        WellnessPlatform
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden lg:flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="premium" size="sm">
                            Get Started
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden glass-dark backdrop-blur-glass-lg border-t border-white/10">
                    <div className="container-custom py-6 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2">
                            <Link href="/login" className="block">
                                <Button variant="ghost" size="sm" className="w-full">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup" className="block">
                                <Button variant="premium" size="sm" className="w-full">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
