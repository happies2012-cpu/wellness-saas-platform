'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, Edit, Trash2, Shield, Mail, Phone } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROLE_DISPLAY_NAMES } from '@/lib/rbac/permissions'

interface User {
    id: string
    email: string
    full_name: string
    role: string
    created_at: string
    last_active?: string
}

export default function UsersManagement() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRole, setSelectedRole] = useState<string>('all')

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            // TODO: Fetch from API
            // Temporary mock data
            setUsers([
                {
                    id: '1',
                    email: 'admin@humanai.com',
                    full_name: 'Admin User',
                    role: 'admin',
                    created_at: new Date().toISOString(),
                    last_active: '2 minutes ago',
                },
                {
                    id: '2',
                    email: 'john@example.com',
                    full_name: 'John Doe',
                    role: 'developer',
                    created_at: new Date().toISOString(),
                    last_active: '1 hour ago',
                },
                {
                    id: '3',
                    email: 'sarah@example.com',
                    full_name: 'Sarah Smith',
                    role: 'manager',
                    created_at: new Date().toISOString(),
                    last_active: '3 hours ago',
                },
            ])
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = selectedRole === 'all' || user.role === selectedRole
        return matchesSearch && matchesRole
    })

    const getRoleBadgeColor = (role: string) => {
        const colors: Record<string, string> = {
            super_admin: 'bg-red-500/20 text-red-400',
            admin: 'bg-purple-500/20 text-purple-400',
            manager: 'bg-blue-500/20 text-blue-400',
            developer: 'bg-green-500/20 text-green-400',
            viewer: 'bg-gray-500/20 text-gray-400',
        }
        return colors[role] || 'bg-gray-500/20 text-gray-400'
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading users...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        User <span className="gradient-text">Management</span>
                    </h1>
                    <p className="text-gray-400">Manage users, roles, and permissions</p>
                </div>
                <Button variant="premium">
                    <Users size={20} className="mr-2" />
                    Add User
                </Button>
            </div>

            {/* Filters */}
            <Card variant="glass">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12"
                        />
                    </div>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                    >
                        <option value="all">All Roles</option>
                        {Object.entries(ROLE_DISPLAY_NAMES).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Total Users</div>
                    <div className="text-2xl font-bold">{users.length}</div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Active Today</div>
                    <div className="text-2xl font-bold text-green-400">
                        {users.filter(u => u.last_active?.includes('minute')).length}
                    </div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Admins</div>
                    <div className="text-2xl font-bold text-purple-400">
                        {users.filter(u => u.role.includes('admin')).length}
                    </div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">This Month</div>
                    <div className="text-2xl font-bold text-blue-400">+12</div>
                </Card>
            </div>

            {/* Users Table */}
            <Card variant="glass">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">User</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Role</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Last Active</th>
                                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Joined</th>
                                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">
                                                {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">{user.full_name || 'No name'}</div>
                                                <div className="text-sm text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                            {ROLE_DISPLAY_NAMES[user.role as keyof typeof ROLE_DISPLAY_NAMES] || user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-400">
                                        {user.last_active || 'Never'}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-400">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit size={16} />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Trash2 size={16} className="text-red-400" />
                                            </Button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <Users size={48} className="text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400">No users found</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
