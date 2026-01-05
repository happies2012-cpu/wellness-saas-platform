'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle, Send } from 'lucide-react'

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695a500ce95682b1d7a5b656/9474b0b61_gslogo.png'

const footerLinks = {
    product: [
        { name: 'Platform', href: '/platform' },
        { name: 'Workflows', href: '/workflows' },
        { name: 'AI Agents', href: '/ai-agents' },
        { name: 'Workforce', href: '/workforce' },
        { name: 'Pricing', href: '/pricing' },
    ],
    company: [
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
    ],
}

const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, href: '#', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: '#0A66C2' },
    { name: 'Instagram', icon: Instagram, href: '#', color: '#E4405F' },
    { name: 'YouTube', icon: Youtube, href: '#', color: '#FF0000' },
]

export function Footer() {
    const handleWhatsApp = () => {
        window.open('https://wa.me/', '_blank')
    }

    const handleTelegram = () => {
        window.open('https://t.me/', '_blank')
    }

    return (
        <footer className="bg-dark-50 border-t border-dark-200">
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <Image
                                src={LOGO_URL}
                                alt="Logo"
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                            <span className="text-xl font-display font-bold gradient-text">
                                HumanAI
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            The unified SaaS Workforce + AI Operating System. Build, automate, and scale your business with human-AI collaboration.
                        </p>

                        {/* Mac-Dock Style Social Bar */}
                        <div className="flex items-center space-x-2 p-3 glass-dark rounded-2xl w-fit">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-xl hover:scale-110 transition-transform duration-200 glass hover:shadow-neon"
                                    style={{ color: social.color }}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* WhatsApp & Telegram */}
                        <div className="flex items-center space-x-3 mt-4">
                            <button
                                onClick={handleWhatsApp}
                                className="flex items-center space-x-2 px-4 py-2 bg-[#25D366] text-white rounded-xl hover:scale-105 transition-transform"
                            >
                                <MessageCircle size={18} />
                                <span className="text-sm font-medium">WhatsApp</span>
                            </button>
                            <button
                                onClick={handleTelegram}
                                className="flex items-center space-x-2 px-4 py-2 bg-[#0088cc] text-white rounded-xl hover:scale-105 transition-transform"
                            >
                                <Send size={18} />
                                <span className="text-sm font-medium">Telegram</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-dark-200">
                    <p className="text-center text-gray-400 text-sm">
                        © {new Date().getFullYear()} HumanAI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
