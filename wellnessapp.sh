#!/bin/bash

# Base44 Master Prompt Auto-Generator (SaaS + Ecommerce Edition)
# Usage: ./generate_base44_prompt.sh "WellnessHub Pro" "wellness supplements" "health coaches in India" "manage inventory, take orders, track coaching clients"

# Default values if no args
APP_NAME="${1:-MySaaSApp}"
PRODUCT_NICHE="${2:-digital products}"
TARGET_USERS="${3:-small business owners}"
MAIN_JOB="${4:-manage customers and sales}"

# Ecommerce-specific entities (customize these per niche)
case $PRODUCT_NICHE in
  "wellness supplements"|"wellness")
    ENTITIES="products (supplements, plans), coaching clients, inventory, subscriptions"
    WORKFLOWS="order fulfillment, client progress tracking, subscription renewals"
    ;;
  "construction materials")
    ENTITIES="materials, projects, suppliers, quotes, inventory"
    WORKFLOWS="quote generation, supplier orders, project inventory tracking"
    ;;
  *)
    ENTITIES="products, orders, customers, inventory"
    WORKFLOWS="order processing, customer management"
    ;;
esac

# Generate the full master prompt
cat << EOF
You are an expert full-stack SaaS architect, UX designer, growth marketer, DevOps engineer, and automation specialist. 

**Goal:** Build a production-ready, monetizable SaaS web app (PWA-ready) called **$APP_NAME** that helps **$TARGET_USERS** to **$MAIN_JOB**. Include all workflows, AI, ecommerce, marketing in one build.

### 1. Product definition
- B2B SaaS + Ecommerce for $PRODUCT_NICHE.
- Core entities: users, workspaces, $ENTITIES.
- Value prop: Easy $MAIN_JOB with AI insights, automations, and built-in store.

### 2. Architecture
- Frontend: SPA with sidebar nav. Screens: Auth, Dashboard, Products Catalog, Cart/Checkout, Orders, Workflows, Analytics, Billing, Admin Ecom, Growth.
- Backend: Tables for users/roles, products/variants/inventory, orders/payments, workflows.
- Services: Auth, Stripe payments, AI ops, notifications.

### 3. UX & design system
- Modern minimal design: shadcn-style components, responsive, tokens for colors/spacing.

### 4. AI features
- AI assistant: Generate product descriptions, email copy, social posts, insights from sales/orders/clients.

### 5. Ecommerce system
- Catalog: Filters/search/grid, product details (images/variants/stock).
- Cart/Checkout: Multi-step with Stripe (one-time + subs).
- Orders: Customer history, admin dashboard (CRUD products/orders, analytics).
- Inventory: Stock tracking, low-stock alerts.

### 6. Marketing & automations
- Growth section: Leads CRM, abandoned cart emails, referral system.
- Workflows: Triggers/actions for orders, trials, payments (IF/THEN).
- Social tab: AI post generator/scheduler.

### 7. Billing & Stripe
- Plans: Free/Pro/Business with limits. Stripe integration for subs + ecommerce.

### 8. Ops & deployment
- Admin DevOps helper (pseudo-shell: deploy/backup/migrate checklists).
- Seed demo data, validation, onboarding checklist.

Build everything end-to-end, stable and editable. Prioritize core SaaS + ecommerce flows.
EOF

echo ""
echo "✅ Generated Base44 prompt for '$APP_NAME' saved above."
echo "📋 Copy-paste directly into Base44 (1 credit)."
echo "🔄 Run again with: ./generate_base44_prompt.sh \"NewApp\" \"niche\" \"users\" \"job\""
