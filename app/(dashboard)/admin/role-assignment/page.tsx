'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, UserPlus, Shield, Settings as SettingsIcon } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface RoleAssignment {
    userId: string
    userName: string
    email: string
    currentRole: string
    department: string
}

export default function RoleAssignmentPage() {
    const [users] = useState<RoleAssignment[]>([
        { userId: '1', userName: 'John Doe', email: 'john@company.com', currentRole: 'admin', department: 'Engineering' },
        { userId: '2', userName: 'Jane Smith', email: 'jane@company.com', currentRole: 'manager', department: 'Sales' },
        { userId: '3', userName: 'Bob Johnson', email: 'bob@company.com', currentRole: 'user', department: 'Marketing' },
    ])

    const roles = [
        'super_admin',
        'admin',
        'manager',
        'team_lead',
        'developer',
        'designer',
        'analyst',
        'sales_rep',
        'support_agent',
        'user',
        'viewer',
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        Role <span className="gradient-text">Assignment</span>
                    </h1>
                    <p className="text-gray-400">Assign roles and permissions to users</p>
                </div>
                <Button variant="premium">
                    <UserPlus size={16} className="mr-2" />
                    Invite User
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Total Users</span>
                        <Users className="text-primary-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold">{users.length}</div>
                </Card>
                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Roles Defined</span>
                        <Shield className="text-green-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold">{roles.length}</div>
                </Card>
                <Card variant="glass">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Pending Invites</span>
                        <UserPlus className="text-yellow-400" size={20} />
                    </div>
                    <div className="text-3xl font-bold">0</div>
                </Card>
            </div>

            {/* User List */}
            <Card variant="glass">
                <h3 className="text-xl font-semibold mb-6">User Role Assignments</h3>
                <div className="space-y-4">
                    {users.map((user, index) => (
                        <motion.div
                            key={user.userId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary-500/50 transition-colors"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">
                                        {user.userName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{user.userName}</h4>
                                        <p className="text-sm text-gray-400">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400 mb-1">Department</div>
                                        <div className="text-sm font-medium">{user.department}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-400 mb-1">Current Role</div>
                                        <select
                                            value={user.currentRole}
                                            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium focus:outline-none focus:border-primary-500"
                                        >
                                            {roles.map((role) => (
                                                <option key={role} value={role} className="bg-dark-100">
                                                    {role.replace('_', ' ')}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <SettingsIcon size={14} className="mr-2" />
                                        Configure
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
