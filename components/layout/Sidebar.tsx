'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Workflow,
    Bot,
    Users,
    Package,
    ShoppingCart,
    MessageSquare,
    FileText,
    TrendingUp,
    Settings,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workflows', href: '/dashboard/workflows', icon: Workflow },
    { name: 'AI Agents', href: '/dashboard/ai', icon: Bot },
    { name: 'Workforce', href: '/dashboard/workforce', icon: Users },
    { name: 'E-commerce', href: '/dashboard/ecommerce', icon: ShoppingCart },
    { name: 'CRM', href: '/dashboard/crm', icon: MessageSquare },
    { name: 'CMS', href: '/dashboard/cms', icon: FileText },
    { name: 'Revenue', href: '/dashboard/revenue', icon: TrendingUp },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside className={cn(
            'fixed left-0 top-0 h-screen glass-dark border-r border-white/10 transition-all duration-300 z-40',
            collapsed ? 'w-20' : 'w-64'
        )}>
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
                    {!collapsed && (
                        <span className="text-xl font-display font-bold gradient-text">
                            Wellness
                        </span>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200',
                                    isActive
                                        ? 'bg-primary-500 text-white shadow-neon'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                <item.icon size={20} />
                                {!collapsed && <span className="font-medium">{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}
