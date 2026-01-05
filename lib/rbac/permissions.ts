// Role-Based Access Control System
export enum UserRole {
    SUPER_ADMIN = 'super_admin',
    ADMIN = 'admin',
    MANAGER = 'manager',
    TEAM_LEAD = 'team_lead',
    DEVELOPER = 'developer',
    DESIGNER = 'designer',
    MARKETER = 'marketer',
    SALES = 'sales',
    CUSTOMER_SUPPORT = 'customer_support',
    ANALYST = 'analyst',
    VIEWER = 'viewer',
}

export enum Permission {
    // User Management
    CREATE_USER = 'create_user',
    READ_USER = 'read_user',
    UPDATE_USER = 'update_user',
    DELETE_USER = 'delete_user',
    MANAGE_ROLES = 'manage_roles',

    // Workflow Management
    CREATE_WORKFLOW = 'create_workflow',
    READ_WORKFLOW = 'read_workflow',
    UPDATE_WORKFLOW = 'update_workflow',
    DELETE_WORKFLOW = 'delete_workflow',
    EXECUTE_WORKFLOW = 'execute_workflow',
    PUBLISH_WORKFLOW = 'publish_workflow',

    // AI Agent Management
    CREATE_AI_AGENT = 'create_ai_agent',
    READ_AI_AGENT = 'read_ai_agent',
    UPDATE_AI_AGENT = 'update_ai_agent',
    DELETE_AI_AGENT = 'delete_ai_agent',
    DEPLOY_AI_AGENT = 'deploy_ai_agent',

    // CRM
    CREATE_LEAD = 'create_lead',
    READ_LEAD = 'read_lead',
    UPDATE_LEAD = 'update_lead',
    DELETE_LEAD = 'delete_lead',
    ASSIGN_LEAD = 'assign_lead',

    // E-Commerce
    CREATE_PRODUCT = 'create_product',
    READ_PRODUCT = 'read_product',
    UPDATE_PRODUCT = 'update_product',
    DELETE_PRODUCT = 'delete_product',
    MANAGE_ORDERS = 'manage_orders',
    PROCESS_REFUNDS = 'process_refunds',

    // Analytics & Revenue
    VIEW_ANALYTICS = 'view_analytics',
    VIEW_REVENUE = 'view_revenue',
    EXPORT_DATA = 'export_data',

    // Settings
    UPDATE_WORKSPACE = 'update_workspace',
    MANAGE_BILLING = 'manage_billing',
    MANAGE_INTEGRATIONS = 'manage_integrations',

    // System
    VIEW_AUDIT_LOGS = 'view_audit_logs',
    MANAGE_API_KEYS = 'manage_api_keys',
    SYSTEM_SETTINGS = 'system_settings',
}

// Role Permission Matrix
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    [UserRole.SUPER_ADMIN]: Object.values(Permission), // All permissions

    [UserRole.ADMIN]: [
        Permission.CREATE_USER,
        Permission.READ_USER,
        Permission.UPDATE_USER,
        Permission.DELETE_USER,
        Permission.MANAGE_ROLES,
        Permission.CREATE_WORKFLOW,
        Permission.READ_WORKFLOW,
        Permission.UPDATE_WORKFLOW,
        Permission.DELETE_WORKFLOW,
        Permission.EXECUTE_WORKFLOW,
        Permission.PUBLISH_WORKFLOW,
        Permission.CREATE_AI_AGENT,
        Permission.READ_AI_AGENT,
        Permission.UPDATE_AI_AGENT,
        Permission.DELETE_AI_AGENT,
        Permission.DEPLOY_AI_AGENT,
        Permission.CREATE_LEAD,
        Permission.READ_LEAD,
        Permission.UPDATE_LEAD,
        Permission.DELETE_LEAD,
        Permission.ASSIGN_LEAD,
        Permission.CREATE_PRODUCT,
        Permission.READ_PRODUCT,
        Permission.UPDATE_PRODUCT,
        Permission.DELETE_PRODUCT,
        Permission.MANAGE_ORDERS,
        Permission.VIEW_ANALYTICS,
        Permission.VIEW_REVENUE,
        Permission.EXPORT_DATA,
        Permission.UPDATE_WORKSPACE,
        Permission.MANAGE_BILLING,
        Permission.MANAGE_INTEGRATIONS,
        Permission.VIEW_AUDIT_LOGS,
    ],

    [UserRole.MANAGER]: [
        Permission.READ_USER,
        Permission.UPDATE_USER,
        Permission.CREATE_WORKFLOW,
        Permission.READ_WORKFLOW,
        Permission.UPDATE_WORKFLOW,
        Permission.EXECUTE_WORKFLOW,
        Permission.CREATE_AI_AGENT,
        Permission.READ_AI_AGENT,
        Permission.UPDATE_AI_AGENT,
        Permission.CREATE_LEAD,
        Permission.READ_LEAD,
        Permission.UPDATE_LEAD,
        Permission.ASSIGN_LEAD,
        Permission.CREATE_PRODUCT,
        Permission.READ_PRODUCT,
        Permission.UPDATE_PRODUCT,
        Permission.MANAGE_ORDERS,
        Permission.VIEW_ANALYTICS,
        Permission.VIEW_REVENUE,
        Permission.EXPORT_DATA,
    ],

    [UserRole.TEAM_LEAD]: [
        Permission.READ_USER,
        Permission.CREATE_WORKFLOW,
        Permission.READ_WORKFLOW,
        Permission.UPDATE_WORKFLOW,
        Permission.EXECUTE_WORKFLOW,
        Permission.READ_AI_AGENT,
        Permission.CREATE_LEAD,
        Permission.READ_LEAD,
        Permission.UPDATE_LEAD,
        Permission.ASSIGN_LEAD,
        Permission.READ_PRODUCT,
        Permission.VIEW_ANALYTICS,
    ],

    [UserRole.DEVELOPER]: [
        Permission.CREATE_WORKFLOW,
        Permission.READ_WORKFLOW,
        Permission.UPDATE_WORKFLOW,
        Permission.EXECUTE_WORKFLOW,
        Permission.CREATE_AI_AGENT,
        Permission.READ_AI_AGENT,
        Permission.UPDATE_AI_AGENT,
        Permission.DEPLOY_AI_AGENT,
        Permission.MANAGE_API_KEYS,
    ],

    [UserRole.DESIGNER]: [
        Permission.READ_WORKFLOW,
        Permission.READ_PRODUCT,
        Permission.UPDATE_PRODUCT,
        Permission.VIEW_ANALYTICS,
    ],

    [UserRole.MARKETER]: [
        Permission.READ_WORKFLOW,
        Permission.CREATE_LEAD,
        Permission.READ_LEAD,
        Permission.UPDATE_LEAD,
        Permission.READ_PRODUCT,
        Permission.VIEW_ANALYTICS,
        Permission.EXPORT_DATA,
    ],

    [UserRole.SALES]: [
        Permission.CREATE_LEAD,
        Permission.READ_LEAD,
        Permission.UPDATE_LEAD,
        Permission.READ_PRODUCT,
        Permission.MANAGE_ORDERS,
        Permission.VIEW_ANALYTICS,
    ],

    [UserRole.CUSTOMER_SUPPORT]: [
        Permission.READ_LEAD,
        Permission.UPDATE_LEAD,
        Permission.READ_PRODUCT,
        Permission.MANAGE_ORDERS,
        Permission.PROCESS_REFUNDS,
    ],

    [UserRole.ANALYST]: [
        Permission.READ_WORKFLOW,
        Permission.READ_AI_AGENT,
        Permission.READ_LEAD,
        Permission.READ_PRODUCT,
        Permission.VIEW_ANALYTICS,
        Permission.VIEW_REVENUE,
        Permission.EXPORT_DATA,
    ],

    [UserRole.VIEWER]: [
        Permission.READ_WORKFLOW,
        Permission.READ_AI_AGENT,
        Permission.READ_LEAD,
        Permission.READ_PRODUCT,
        Permission.VIEW_ANALYTICS,
    ],
}

// Permission Check Functions
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
    const rolePermissions = ROLE_PERMISSIONS[userRole]
    return rolePermissions.includes(permission)
}

export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.some(permission => hasPermission(userRole, permission))
}

export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
    return permissions.every(permission => hasPermission(userRole, permission))
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
    const routePermissions: Record<string, Permission[]> = {
        '/dashboard': [Permission.READ_USER],
        '/workflows': [Permission.READ_WORKFLOW],
        '/ai': [Permission.READ_AI_AGENT],
        '/crm': [Permission.READ_LEAD],
        '/ecommerce': [Permission.READ_PRODUCT],
        '/revenue': [Permission.VIEW_REVENUE],
        '/settings': [Permission.UPDATE_WORKSPACE],
    }

    const requiredPermissions = routePermissions[route]
    if (!requiredPermissions) return true

    return hasAnyPermission(userRole, requiredPermissions)
}

// Role Display Names
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: 'Super Administrator',
    [UserRole.ADMIN]: 'Administrator',
    [UserRole.MANAGER]: 'Manager',
    [UserRole.TEAM_LEAD]: 'Team Lead',
    [UserRole.DEVELOPER]: 'Developer',
    [UserRole.DESIGNER]: 'Designer',
    [UserRole.MARKETER]: 'Marketer',
    [UserRole.SALES]: 'Sales Representative',
    [UserRole.CUSTOMER_SUPPORT]: 'Customer Support',
    [UserRole.ANALYST]: 'Business Analyst',
    [UserRole.VIEWER]: 'Viewer',
}

// Role Descriptions
export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
    [UserRole.SUPER_ADMIN]: 'Full system access with all permissions',
    [UserRole.ADMIN]: 'Manage users, workflows, and system settings',
    [UserRole.MANAGER]: 'Oversee teams, workflows, and business operations',
    [UserRole.TEAM_LEAD]: 'Lead team members and manage assigned workflows',
    [UserRole.DEVELOPER]: 'Build and deploy workflows and AI agents',
    [UserRole.DESIGNER]: 'Design and update product interfaces',
    [UserRole.MARKETER]: 'Manage leads and marketing campaigns',
    [UserRole.SALES]: 'Handle sales leads and customer orders',
    [UserRole.CUSTOMER_SUPPORT]: 'Assist customers and process refunds',
    [UserRole.ANALYST]: 'Analyze data and generate reports',
    [UserRole.VIEWER]: 'View-only access to platform data',
}
