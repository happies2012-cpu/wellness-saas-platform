'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, DollarSign, ShoppingCart, TrendingUp, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface Product {
    id: string
    name: string
    description: string
    price: number
    stock: number
    category: string
    status: 'active' | 'draft' | 'out_of_stock'
    sales: number
    created_at: string
}

export default function EcommercePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/ecommerce/products')

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const data = await response.json()
            setProducts(data.products || [])
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const stats = [
        {
            label: 'Total Products',
            value: products.length.toString(),
            icon: Package,
            color: 'text-blue-400'
        },
        {
            label: 'Active Products',
            value: products.filter(p => p.status === 'active').length.toString(),
            icon: ShoppingCart,
            color: 'text-green-400'
        },
        {
            label: 'Total Revenue',
            value: `$${products.reduce((sum, p) => sum + (p.price * p.sales || 0), 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'text-purple-400'
        },
        {
            label: 'Total Sales',
            value: products.reduce((sum, p) => sum + (p.sales || 0), 0).toString(),
            icon: TrendingUp,
            color: 'text-orange-400'
        },
    ]

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            active: 'bg-green-500/20 text-green-400',
            draft: 'bg-yellow-500/20 text-yellow-400',
            out_of_stock: 'bg-red-500/20 text-red-400',
        }
        return colors[status] || 'bg-gray-500/20 text-gray-400'
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading products...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Card variant="glass" className="p-8 text-center max-w-md">
                    <div className="text-red-400 mb-4">⚠️ Error</div>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <Button onClick={fetchProducts} variant="default">
                        Try Again
                    </Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        E-commerce <span className="gradient-text">Dashboard</span>
                    </h1>
                    <p className="text-gray-400">Manage your products and inventory</p>
                </div>
                <Button variant="premium">
                    <Plus size={20} className="mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" className="card-hover">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color === 'text-blue-400' ? 'from-blue-500/20 to-blue-700/20' :
                                        stat.color === 'text-green-400' ? 'from-green-500/20 to-green-700/20' :
                                            stat.color === 'text-purple-400' ? 'from-purple-500/20 to-purple-700/20' :
                                                'from-orange-500/20 to-orange-700/20'
                                    } flex items-center justify-center`}>
                                    <stat.icon className={stat.color} size={24} />
                                </div>
                            </div>
                            <div className="text-2xl font-bold mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Products Grid */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Products</h2>

                {products.length === 0 ? (
                    <Card variant="glass" className="p-12 text-center">
                        <Package size={48} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No products yet</h3>
                        <p className="text-gray-400 mb-6">Start adding products to your store</p>
                        <Button variant="premium">
                            <Plus size={20} className="mr-2" />
                            Add Your First Product
                        </Button>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card variant="glass" className="card-hover">
                                    {/* Product Image Placeholder */}
                                    <div className="w-full h-48 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                                        <Package size={48} className="text-gray-600" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1 line-clamp-1">{product.name}</h3>
                                                <p className="text-sm text-gray-400 line-clamp-2">{product.description}</p>
                                            </div>
                                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                                {product.status.replace('_', ' ')}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                            <div>
                                                <div className="text-2xl font-bold text-green-400">
                                                    ${product.price.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {product.stock} in stock • {product.sales || 0} sold
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 pt-2">
                                            <Button variant="ghost" size="sm" className="flex-1">
                                                <Eye size={16} className="mr-1" />
                                                View
                                            </Button>
                                            <Button variant="ghost" size="sm" className="flex-1">
                                                <Edit size={16} className="mr-1" />
                                                Edit
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Trash2 size={16} className="text-red-400" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
