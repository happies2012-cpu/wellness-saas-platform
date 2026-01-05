'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'

const navigation = [
    { name: 'Platform', href: '/platform' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-dark backdrop-blur-glass-lg">
            <nav className="container-custom flex items-center justify-between py-4">
                <Logo />

                <div className="hidden md:flex items-center space-x-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="premium">Get Started</Button>
                    </Link>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {mobileMenuOpen && (
                <div className="md:hidden glass-dark border-t border-white/10">
                    <div className="container-custom py-4 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-gray-300 hover:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2">
                            <Link href="/login" className="block">
                                <Button variant="ghost" className="w-full">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup" className="block">
                                <Button variant="premium" className="w-full">
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
