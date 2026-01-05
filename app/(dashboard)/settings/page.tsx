'use client'

import { User, Bell, Lock, CreditCard, Globe, Palette } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
                <p className="text-gray-400">Manage your account and preferences</p>
            </div>

            {/* Settings Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card variant="glass">
                        <nav className="space-y-2">
                            {[
                                { icon: User, label: 'Profile', active: true },
                                { icon: Bell, label: 'Notifications', active: false },
                                { icon: Lock, label: 'Security', active: false },
                                { icon: CreditCard, label: 'Billing', active: false },
                                { icon: Globe, label: 'Workspace', active: false },
                                { icon: Palette, label: 'Appearance', active: false },
                            ].map((item) => (
                                <button
                                    key={item.label}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${item.active
                                            ? 'bg-primary-500/20 text-primary-400'
                                            : 'text-gray-400 hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Settings */}
                    <Card variant="glass">
                        <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <Input placeholder="John Doe" defaultValue="Brand Owner" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <Input type="email" placeholder="john@example.com" defaultValue="owner@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Role</label>
                                <Input disabled defaultValue="Brand Owner" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Bio</label>
                                <textarea
                                    className="input-premium w-full min-h-[100px]"
                                    placeholder="Tell us about yourself..."
                                    defaultValue="Building the future of AI-powered business automation."
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <Button variant="outline">Cancel</Button>
                                <Button variant="premium">Save Changes</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Password */}
                    <Card variant="glass">
                        <h3 className="text-xl font-semibold mb-6">Change Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Current Password</label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">New Password</label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div className="flex justify-end">
                                <Button variant="premium">Update Password</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Danger Zone */}
                    <Card variant="glass" className="border border-red-500/20">
                        <h3 className="text-xl font-semibold mb-2 text-red-400">Danger Zone</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                            Delete Account
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}
