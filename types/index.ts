export type UserRole =
    | 'super_admin'
    | 'admin'
    | 'brand_owner'
    | 'business_owner'
    | 'employee'
    | 'freelancer'
    | 'vendor'
    | 'client'
    | 'ai_agent'

export interface User {
    id: string
    email: string
    full_name: string
    avatar_url?: string
    role: UserRole
    workspace_id?: string
    created_at: string
    updated_at: string
}

export interface Workspace {
    id: string
    name: string
    slug: string
    logo_url?: string
    owner_id: string
    subscription_tier: 'free' | 'pro' | 'business' | 'enterprise'
    created_at: string
    updated_at: string
}

export interface Subscription {
    id: string
    workspace_id: string
    plan_id: string
    status: 'active' | 'canceled' | 'past_due' | 'trialing'
    current_period_start: string
    current_period_end: string
    cancel_at_period_end: boolean
    amount: number
    interval: 'month' | 'year'
    stripe_subscription_id?: string
    created_at: string
    updated_at: string
}

export interface Product {
    id: string
    workspace_id: string
    name: string
    description: string
    price: number
    currency: string
    images: string[]
    category: string
    stock: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Order {
    id: string
    workspace_id: string
    customer_id: string
    total: number
    status: 'pending' | 'processing' | 'completed' | 'canceled'
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
    items: OrderItem[]
    created_at: string
    updated_at: string
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: string
    quantity: number
    price: number
    total: number
}

export interface Workflow {
    id: string
    workspace_id: string
    name: string
    description: string
    category: string
    is_public: boolean
    is_marketplace: boolean
    price?: number
    version: number
    steps: WorkflowStep[]
    created_by: string
    created_at: string
    updated_at: string
}

export interface WorkflowStep {
    id: string
    type: 'trigger' | 'condition' | 'action'
    name: string
    config: Record<string, any>
    position: { x: number; y: number }
    next_step_id?: string
}

export interface AIAgent {
    id: string
    workspace_id: string
    name: string
    description: string
    role: string
    goals: string[]
    memory: Record<string, any>
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Task {
    id: string
    workspace_id: string
    title: string
    description: string
    assigned_to: string
    assigned_to_type: 'human' | 'ai'
    status: 'pending' | 'in_progress' | 'completed' | 'canceled'
    priority: 'low' | 'medium' | 'high' | 'urgent'
    due_date?: string
    sla_hours?: number
    created_at: string
    updated_at: string
}

export interface Lead {
    id: string
    workspace_id: string
    name: string
    email: string
    phone?: string
    company?: string
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
    source: string
    value?: number
    created_at: string
    updated_at: string
}

export interface RevenueMetrics {
    mrr: number
    arr: number
    arpu: number
    ltv: number
    churn_rate: number
    total_customers: number
    active_subscriptions: number
    total_revenue: number
}
