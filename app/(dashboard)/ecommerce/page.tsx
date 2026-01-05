'use client'

import { Plus, Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const products = [
    {
        id: '1',
        name: 'Premium Workflow Bundle',
        price: '$99',
        sales: 234,
        revenue: '$23,166',
        status: 'active',
    },
    {
        id: '2',
        name: 'AI Agent Starter Pack',
        price: '$49',
        sales: 456,
        revenue: '$22,344',
        status: 'active',
    },
    {
        id: '3',
        name: 'Enterprise Template',
        price: '$199',
        sales: 89,
        revenue: '$17,711',
        status: 'active',
    },
]

const recentOrders = [
    {
        id: '#ORD-1234',
        customer: 'John Doe',
        product: 'Premium Workflow Bundle',
        amount: '$99',
        status: 'completed',
        date: '2 hours ago',
    },
    {
        id: '#ORD-1235',
        customer: 'Jane Smith',
        product: 'AI Agent Starter Pack',
        amount: '$49',
        status: 'processing',
        date: '5 hours ago',
    },
]

export default function EcommercePage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">E-Commerce</h1>
                    <p className="text-gray-400">Manage your products and orders</p>
                </div>
                <Link href="/dashboard/ecommerce/products/create">
                    <Button variant="premium">
                        <Plus size={20} className="mr-2" />
                        Add Product
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Revenue', value: '$127.5K', icon: DollarSign, change: '+12.5%' },
                    { label: 'Total Orders', value: '1,234', icon: ShoppingCart, change: '+8.2%' },
                    { label: 'Products', value: '45', icon: Package, change: '+3' },
                    { label: 'Avg Order Value', value: '$103', icon: TrendingUp, change: '+5.1%' },
                ].map((stat) => (
                    <Card key={stat.label} variant="glass">
                        <div className="flex items-center justify-between mb-2">
                            <stat.icon className="text-primary-400" size={24} />
                            <span className="text-xs text-green-400">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </Card>
                ))}
            </div>

            {/* Top Products */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Top Products</h2>
                <div className="space-y-4">
                    {products.map((product) => (
                        <Card key={product.id} variant="glass" className="card-hover">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                                        <Package className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <span>{product.sales} sales</span>
                                            <span className="text-primary-400">{product.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-8">
                                    <div className="text-right">
                                        <div className="text-xl font-bold gradient-text">{product.revenue}</div>
                                        <div className="text-xs text-gray-400">Total Revenue</div>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                <Card variant="glass">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Order ID</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Customer</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Product</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Amount</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-3 px-4 text-sm font-mono">{order.id}</td>
                                        <td className="py-3 px-4 text-sm">{order.customer}</td>
                                        <td className="py-3 px-4 text-sm">{order.product}</td>
                                        <td className="py-3 px-4 text-sm font-semibold">{order.amount}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${order.status === 'completed'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-400">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}
