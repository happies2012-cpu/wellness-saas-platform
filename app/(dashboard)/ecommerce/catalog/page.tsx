'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Plus, Edit, Trash2, Eye, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface Product {
    id: string
    name: string
    sku: string
    price: number
    stock: number
    category: string
    status: 'active' | 'draft' | 'archived'
    sales: number
}

export default function ProductCatalogPage() {
    const [products] = useState<Product[]>([
        { id: '1', name: 'Premium Subscription', sku: 'SUB-001', price: 49, stock: 999, category: 'Subscription', status: 'active', sales: 234 },
        { id: '2', name: 'Enterprise Plan', sku: 'SUB-002', price: 499, stock: 999, category: 'Subscription', status: 'active', sales: 45 },
        { id: '3', name: 'AI Agent Credits', sku: 'CRD-001', price: 29, stock: 500, category: 'Credits', status: 'active', sales: 567 },
        { id: '4', name: 'Workflow Templates Pack', sku: 'TPL-001', price: 99, stock: 250, category: 'Templates', status: 'active', sales: 123 },
    ])

    const stats = [
        { label: 'Total Products', value: products.length, icon: Package, color: 'text-blue-400' },
        { label: 'Total Revenue', value: `$${products.reduce((sum, p) => sum + (p.price * p.sales), 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
        { label: 'Total Sales', value: products.reduce((sum, p) => sum + p.sales, 0), icon: ShoppingCart, color: 'text-purple-400' },
        { label: 'Avg Price', value: `$${Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length)}`, icon: TrendingUp, color: 'text-yellow-400' },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Product <span className="gradient-text">Catalog</span>
                    </h1>
                    <p className="text-gray-400">Manage your product inventory</p>
                </div>
                <Button variant="premium">
                    <Plus size={16} className="mr-2" />
                    Add Product
                </Button>
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
                        <Card variant="glass" className="card-hover">
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon className={stat.color} size={20} />
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-4">
                <div className="flex-1">
                    <Input placeholder="Search products..." />
                </div>
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
            </div>

            {/* Products Table */}
            <Card variant="glass">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Product</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">SKU</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Price</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Stock</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Sales</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <motion.tr
                                    key={product.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b border-white/5 hover:bg-white/5"
                                >
                                    <td className="py-4 px-4">
                                        <div>
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-sm text-gray-400">{product.category}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-gray-400">{product.sku}</td>
                                    <td className="py-4 px-4 text-right font-semibold">${product.price}</td>
                                    <td className="py-4 px-4 text-right">
                                        <span className={product.stock < 100 ? 'text-red-400' : 'text-gray-400'}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-right text-gray-400">{product.sales}</td>
                                    <td className="py-4 px-4">
                                        <span className={`text-xs px-2 py-1 rounded ${product.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                product.status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex justify-end space-x-2">
                                            <button className="p-2 hover:bg-white/10 rounded">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded">
                                                <Edit size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded text-red-400">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
