import { useEffect, useState } from 'react'

interface Permission {
    id: string
    name: string
    description: string
}

// Hook to check user permissions
export function usePermissions() {
    const [permissions, setPermissions] = useState<string[]>([])
    const [role, setRole] = useState<string>('viewer')

    useEffect(() => {
        // Get role from middleware header or localStorage
        const userRole = localStorage.getItem('userRole') || 'viewer'
        setRole(userRole)

        // Map roles to permissions
        const rolePermissions: Record<string, string[]> = {
            super_admin: ['*'], // All permissions
            admin: [
                'users.view',
                'users.create',
                'users.edit',
                'users.delete',
                'roles.manage',
                'workflows.manage',
                'ai.manage',
                'crm.manage',
                'ecommerce.manage',
            ],
            manager: [
                'users.view',
                'workflows.create',
                'workflows.edit',
                'ai.create',
                'crm.view',
                'crm.edit',
            ],
            team_lead: ['workflows.view', 'workflows.create', 'crm.view', 'ai.view'],
            developer: ['workflows.create', 'workflows.edit', 'ai.create'],
            user: ['workflows.view', 'crm.view', 'ai.view'],
            viewer: ['workflows.view'],
        }

        setPermissions(rolePermissions[userRole] || [])
    }, [])

    const hasPermission = (permission: string): boolean => {
        if (permissions.includes('*')) return true
        return permissions.includes(permission)
    }

    const hasAnyPermission = (perms: string[]): boolean => {
        if (permissions.includes('*')) return true
        return perms.some((p) => permissions.includes(p))
    }

    const hasAllPermissions = (perms: string[]): boolean => {
        if (permissions.includes('*')) return true
        return perms.every((p) => permissions.includes(p))
    }

    return {
        permissions,
        role,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
    }
}

// Component wrapper for permission-based rendering
interface PermissionGateProps {
    permission?: string
    anyPermission?: string[]
    allPermissions?: string[]
    fallback?: React.ReactNode
    children: React.ReactNode
}

export function PermissionGate({
    permission,
    anyPermission,
    allPermissions,
    fallback = null,
    children,
}: PermissionGateProps) {
    const { hasPermission, hasAnyPermission, hasAllPermissions } = usePermissions()

    let hasAccess = true

    if (permission) {
        hasAccess = hasPermission(permission)
    } else if (anyPermission) {
        hasAccess = hasAnyPermission(anyPermission)
    } else if (allPermissions) {
        hasAccess = hasAllPermissions(allPermissions)
    }

    if (!hasAccess) {
        return <>{fallback}</>
    }

    return <>{children}</>
}
