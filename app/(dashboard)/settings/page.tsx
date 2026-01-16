'use client'

import { useEffect, useState } from 'react'
import { User, Bell, Lock, CreditCard, Globe, Palette, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        bio: '',
    })

    const supabase = createClientComponentClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                setFormData({
                    fullName: user.user_metadata?.full_name || '',
                    email: user.email || '',
                    bio: user.user_metadata?.bio || '',
                })
            }
            setIsLoading(false)
        }
        getUser()
    }, [supabase])

    const handleSaveProfile = async () => {
        setIsSaving(true)
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.fullName,
                    bio: formData.bio,
                },
            })

            if (error) throw error

            toast.success('Profile updated successfully!')
        } catch (error: any) {
            console.error('Update error:', error)
            toast.error(error.message || 'Failed to update profile')
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
                <p className="text-primary-400">Manage your account and preferences</p>
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
                                <label className="block text-sm font-medium mb-2 text-primary-300">Full Name</label>
                                <Input
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-primary-300">Email</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="opacity-50 cursor-not-allowed"
                                />
                                <p className="text-xs text-primary-500 mt-1">Email cannot be changed directly.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-primary-300">Bio</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg bg-surface-800 border border-surface-700 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 outline-none transition-all resize-none min-h-[100px] text-white placeholder-primary-500"
                                    placeholder="Tell us about yourself..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <Button variant="outline">Cancel</Button>
                                <Button
                                    variant="premium"
                                    className="btn-primary"
                                    onClick={handleSaveProfile}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <div className="flex items-center space-x-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Saving...</span>
                                        </div>
                                    ) : (
                                        'Save Changes'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Password */}
                    <Card variant="glass">
                        <h3 className="text-xl font-semibold mb-6">Change Password</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-primary-300">Current Password</label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-primary-300">New Password</label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-primary-300">Confirm New Password</label>
                                <Input type="password" placeholder="••••••••" />
                            </div>
                            <div className="flex justify-end">
                                <Button variant="premium" className="btn-primary">Update Password</Button>
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
