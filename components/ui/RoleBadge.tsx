import { Shield, Crown, Star, User } from 'lucide-react'

interface RoleBadgeProps {
    role: string
    size?: 'sm' | 'md' | 'lg'
}

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
    const getRoleConfig = (role: string) => {
        switch (role.toLowerCase()) {
            case 'super_admin':
                return {
                    icon: Crown,
                    color: 'from-yellow-500 to-yellow-700',
                    label: 'Super Admin',
                    glow: 'shadow-yellow-500/50',
                }
            case 'admin':
                return {
                    icon: Shield,
                    color: 'from-red-500 to-red-700',
                    label: 'Admin',
                    glow: 'shadow-red-500/50',
                }
            case 'manager':
                return {
                    icon: Star,
                    color: 'from-purple-500 to-purple-700',
                    label: 'Manager',
                    glow: 'shadow-purple-500/50',
                }
            case 'team_lead':
                return {
                    icon: Star,
                    color: 'from-blue-500 to-blue-700',
                    label: 'Team Lead',
                    glow: 'shadow-blue-500/50',
                }
            default:
                return {
                    icon: User,
                    color: 'from-gray-500 to-gray-700',
                    label: role.replace('_', ' '),
                    glow: 'shadow-gray-500/50',
                }
        }
    }

    const config = getRoleConfig(role)
    const Icon = config.icon

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    }

    const iconSizes = {
        sm: 12,
        md: 14,
        lg: 16,
    }

    return (
        <div
            className={`inline-flex items-center space-x-1.5 rounded-full bg-gradient-to-r ${config.color} ${sizeClasses[size]} font-semibold text-white shadow-lg ${config.glow}`}
        >
            <Icon size={iconSizes[size]} />
            <span className="capitalize">{config.label}</span>
        </div>
    )
}
