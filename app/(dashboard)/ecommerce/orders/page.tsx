'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Order {
    id: string
    orderNumber: string
    customer: string
    email: string
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    items: number
    date: Date
}

export default function OrderManagementPage() {
    const [orders] = useState<Order[]>([
        {
            id: '1',
            orderNumber: 'ORD-001',
            customer: 'John Doe',
            email: 'john@example.com',
            total: 149,
            status: 'delivered',
            items: 2,
            date: new Date(Date.now() - 86400000 * 5),
        },
        {
            id: '2',
            orderNumber: 'ORD-002',
            customer: 'Jane Smith',
            email: 'jane@example.com',
            total: 499,
            status: 'shipped',
            items: 1,
            date: new Date(Date.now() - 86400000 * 2),
        },
        {
            id: '3',
            orderNumber: 'ORD-003',
            customer: 'Bob Johnson',
            email: 'bob@example.com',
            total: 99,
            status: 'processing',
            items: 3,
            date: new Date(Date.now() - 86400000),
        },
    ])

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return Clock
            case 'processing': return Package
            case 'shipped': return Truck
            case 'delivered': return CheckCircle
            case 'cancelled': return AlertCircle
            default: return Package
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/20 text-yellow-400'
            case 'processing': return 'bg-blue-500/20 text-blue-400'
            case 'shipped': return 'bg-purple-500/20 text-purple-400'
            case 'delivered': return 'bg-green-500/20 text-green-400'
            case 'cancelled': return 'bg-red-500/20 text-red-400'
            default: return 'bg-gray-500/20 text-gray-400'
        }
    }

    const stats = [
        { label: 'Total Orders', value: orders.length, change: '+12%' },
        { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, change: '+5%' },
        { label: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, change: '+8%' },
        { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, change: '+15%' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    Order <span className="gradient-text">Management</span>
                </h1>
                <p className="text-gray-400">Track and manage customer orders</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass">
                            <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
                            <div className="flex items-end justify-between">
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <div className="text-sm text-green-400">{stat.change}</div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.map((order, index) => {
                    const StatusIcon = getStatusIcon(order.status)
                    return (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card variant="glass" className="card-hover">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 flex-1">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                            <Package size={24} className="text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-1">
                                                <h3 className="font-semibold">{order.orderNumber}</h3>
                                                <span className={`text-xs px-2 py-1 rounded flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                                                    <StatusIcon size={12} />
                                                    <span>{order.status}</span>
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {order.customer} • {order.email}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-8">
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">Items</div>
                                            <div className="font-semibold">{order.items}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">Total</div>
                                            <div className="text-lg font-bold text-green-400">${order.total}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-400">Date</div>
                                            <div className="font-medium">{order.date.toLocaleDateString()}</div>
                                        </div>
                                        <Button variant="outline" size="sm">View Details</Button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
