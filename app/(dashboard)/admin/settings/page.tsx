'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Globe, Mail, CreditCard, Shield, Bell, Database } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SystemSettingsPage() {
    const [settings, setSettings] = useState({
        siteName: 'GUIDESOFT AI',
        siteUrl: 'https://guidesoft-ai-platform-one.vercel.app',
        supportEmail: 'support@humanai.com',
        fromEmail: 'noreply@humanai.com',
        smtpHost: 'smtp.gmail.com',
        smtpPort: '587',
        enableSignups: true,
        requireEmailVerification: true,
        enable2FA: false,
        sessionTimeout: '30',
        maxLoginAttempts: '5',
    })

    const [saved, setSaved] = useState(false)

    const handleSave = () => {
        // TODO: Save to API
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const settingsSections = [
        {
            title: 'General Settings',
            icon: Globe,
            color: 'from-blue-500 to-blue-700',
            fields: [
                { key: 'siteName', label: 'Site Name', type: 'text' },
                { key: 'siteUrl', label: 'Site URL', type: 'url' },
            ],
        },
        {
            title: 'Email Configuration',
            icon: Mail,
            color: 'from-purple-500 to-purple-700',
            fields: [
                { key: 'supportEmail', label: 'Support Email', type: 'email' },
                { key: 'fromEmail', label: 'From Email', type: 'email' },
                { key: 'smtpHost', label: 'SMTP Host', type: 'text' },
                { key: 'smtpPort', label: 'SMTP Port', type: 'number' },
            ],
        },
        {
            title: 'Security Settings',
            icon: Shield,
            color: 'from-red-500 to-red-700',
            fields: [
                { key: 'enableSignups', label: 'Enable Signups', type: 'boolean' },
                { key: 'requireEmailVerification', label: 'Require Email Verification', type: 'boolean' },
                { key: 'enable2FA', label: 'Enable 2FA', type: 'boolean' },
                { key: 'sessionTimeout', label: 'Session Timeout (minutes)', type: 'number' },
                { key: 'maxLoginAttempts', label: 'Max Login Attempts', type: 'number' },
            ],
        },
    ]

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold mb-2">
                        System <span className="gradient-text">Settings</span>
                    </h1>
                    <p className="text-gray-400">Configure platform-wide settings</p>
                </div>
                <Button variant="premium" onClick={handleSave}>
                    {saved ? '✓ Saved!' : 'Save Changes'}
                </Button>
            </div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {settingsSections.map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                                    <section.icon size={20} className="text-white" />
                                </div>
                                <h3 className="text-xl font-semibold">{section.title}</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.fields.map((field) => (
                                    <div key={field.key}>
                                        <label className="block text-sm font-medium mb-2">{field.label}</label>
                                        {field.type === 'boolean' ? (
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={settings[field.key as keyof typeof settings] as boolean}
                                                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.checked })}
                                                    className="w-5 h-5 rounded bg-white/5 border border-white/10 checked:bg-primary-500"
                                                />
                                                <span className="text-sm text-gray-400">
                                                    {settings[field.key as keyof typeof settings] ? 'Enabled' : 'Disabled'}
                                                </span>
                                            </label>
                                        ) : (
                                            <Input
                                                type={field.type}
                                                value={settings[field.key as keyof typeof settings] as string}
                                                onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Payment Gateway Settings */}
            <Card variant="glass">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                        <CreditCard size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Payment Gateways</h3>
                </div>

                <div className="space-y-4">
                    {['PayU', 'Cashfree', 'UPI'].map((gateway) => (
                        <div key={gateway} className="p-4 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{gateway}</div>
                                    <div className="text-sm text-gray-400">Configure {gateway} integration</div>
                                </div>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* System Info */}
            <Card variant="glass">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center">
                        <Database size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">System Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Platform Version</div>
                        <div className="font-semibold">1.0.0</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Database Status</div>
                        <div className="font-semibold text-green-400">Connected</div>
                    </div>
                    <div>
                        <div className="text-sm text-gray-400 mb-1">Last Backup</div>
                        <div className="font-semibold">2 hours ago</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
