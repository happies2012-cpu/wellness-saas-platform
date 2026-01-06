'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Lock, Eye } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ROLE_DISPLAY_NAMES, ROLE_DESCRIPTIONS, Permission } from '@/lib/rbac/permissions'

export default function RolesManagement() {
    const roles = Object.entries(ROLE_DISPLAY_NAMES).map(([key, name]) => ({
        id: key,
        name,
        description: ROLE_DESCRIPTIONS[key as keyof typeof ROLE_DESCRIPTIONS] || '',
        userCount: Math.floor(Math.random() * 50), // TODO: Fetch real data
    }))

    const getRoleColor = (roleId: string) => {
        const colors: Record<string, string> = {
            super_admin: 'from-red-500 to-red-700',
            admin: 'from-purple-500 to-purple-700',
            manager: 'from-blue-500 to-blue-700',
            team_lead: 'from-cyan-500 to-cyan-700',
            developer: 'from-green-500 to-green-700',
            designer: 'from-pink-500 to-pink-700',
            marketer: 'from-orange-500 to-orange-700',
            sales: 'from-yellow-500 to-yellow-700',
            customer_support: 'from-indigo-500 to-indigo-700',
            analyst: 'from-teal-500 to-teal-700',
            viewer: 'from-gray-500 to-gray-700',
        }
        return colors[roleId] || 'from-gray-500 to-gray-700'
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">
                    Role <span className="gradient-text">Management</span>
                </h1>
                <p className="text-gray-400">Configure roles and permissions for your platform</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Total Roles</div>
                    <div className="text-2xl font-bold">{roles.length}</div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Permissions</div>
                    <div className="text-2xl font-bold text-purple-400">30+</div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Admin Roles</div>
                    <div className="text-2xl font-bold text-blue-400">3</div>
                </Card>
                <Card variant="glass">
                    <div className="text-sm text-gray-400 mb-1">Custom Roles</div>
                    <div className="text-2xl font-bold text-green-400">0</div>
                </Card>
            </div>

            {/* Roles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role, index) => (
                    <motion.div
                        key={role.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card variant="glass" className="card-hover cursor-pointer group">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRoleColor(role.id)} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <Shield size={24} className="text-white" />
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                    <Users size={16} />
                                    <span>{role.userCount}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mb-2">{role.name}</h3>
                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{role.description}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                    <Lock size={14} />
                                    <span>Permissions</span>
                                </div>
                                <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
                                    View Details
                                </button>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Permission Matrix */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-4">Permission Overview</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left py-3 px-4 font-semibold text-gray-400">Permission</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-400">Admin</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-400">Manager</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-400">Developer</th>
                                <th className="text-center py-3 px-2 font-semibold text-gray-400">Viewer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                'Create Users',
                                'Edit Users',
                                'Delete Users',
                                'Create Workflows',
                                'Execute Workflows',
                                'View Analytics',
                                'Manage Products',
                                'Process Payments',
                                'Deploy AI Agents',
                                'View Audit Logs',
                            ].map((permission, index) => (
                                <tr key={permission} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="py-3 px-4">{permission}</td>
                                    <td className="text-center py-3 px-2">
                                        <div className="w-5 h-5 rounded bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">✓</div>
                                    </td>
                                    <td className="text-center py-3 px-2">
                                        <div className="w-5 h-5 rounded bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">✓</div>
                                    </td>
                                    <td className="text-center py-3 px-2">
                                        {index < 5 ? (
                                            <div className="w-5 h-5 rounded bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">✓</div>
                                        ) : (
                                            <div className="w-5 h-5 rounded bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">✗</div>
                                        )}
                                    </td>
                                    <td className="text-center py-3 px-2">
                                        <div className="w-5 h-5 rounded bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto">
                                            <Eye size={14} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
