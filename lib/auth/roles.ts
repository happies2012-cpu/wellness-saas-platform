import { UserRole } from '@/types'

export const ROLE_HIERARCHY: Record<UserRole, number> = {
    super_admin: 9,
    admin: 8,
    brand_owner: 7,
    business_owner: 6,
    employee: 5,
    freelancer: 4,
    vendor: 3,
    client: 2,
    ai_agent: 1,
}

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    super_admin: ['*'], // All permissions
    admin: [
        'manage_users',
        'manage_workspaces',
        'manage_subscriptions',
        'manage_platform',
        'view_analytics',
    ],
    brand_owner: [
        'manage_workspace',
        'manage_team',
        'manage_products',
        'manage_orders',
        'manage_workflows',
        'manage_ai_agents',
        'view_revenue',
    ],
    business_owner: [
        'manage_workspace',
        'manage_team',
        'manage_products',
        'manage_orders',
        'view_revenue',
    ],
    employee: [
        'view_workspace',
        'manage_tasks',
        'view_products',
        'view_orders',
    ],
    freelancer: [
        'view_workspace',
        'manage_tasks',
        'view_products',
    ],
    vendor: [
        'manage_products',
        'view_orders',
        'manage_inventory',
    ],
    client: [
        'view_products',
        'create_orders',
        'view_own_orders',
    ],
    ai_agent: [
        'execute_workflows',
        'manage_tasks',
    ],
}

export function hasPermission(userRole: UserRole, permission: string): boolean {
    const permissions = ROLE_PERMISSIONS[userRole]
    return permissions.includes('*') || permissions.includes(permission)
}

export function hasHigherRole(userRole: UserRole, targetRole: UserRole): boolean {
    return ROLE_HIERARCHY[userRole] > ROLE_HIERARCHY[targetRole]
}

export function canAccessResource(
    userRole: UserRole,
    resourceOwnerId: string,
    userId: string
): boolean {
    // Super admin and admin can access everything
    if (userRole === 'super_admin' || userRole === 'admin') {
        return true
    }

    // Users can access their own resources
    if (resourceOwnerId === userId) {
        return true
    }

    return false
}
