import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
    typescript: true,
})

export const SUBSCRIPTION_PLANS = {
    free: {
        name: 'Free',
        price: 0,
        interval: 'month' as const,
        features: [
            '1 workspace',
            '5 team members',
            '10 workflows',
            '100 AI credits/month',
            'Basic CRM',
            'Basic E-commerce',
        ],
    },
    pro: {
        name: 'Pro',
        price: 49,
        interval: 'month' as const,
        stripePriceId: process.env.STRIPE_PRO_PRICE_ID,
        features: [
            '5 workspaces',
            '25 team members',
            'Unlimited workflows',
            '1,000 AI credits/month',
            'Advanced CRM',
            'Advanced E-commerce',
            'Workflow marketplace',
            'AI agents (5)',
        ],
    },
    business: {
        name: 'Business',
        price: 149,
        interval: 'month' as const,
        stripePriceId: process.env.STRIPE_BUSINESS_PRICE_ID,
        features: [
            'Unlimited workspaces',
            'Unlimited team members',
            'Unlimited workflows',
            '10,000 AI credits/month',
            'Full CRM suite',
            'Full E-commerce suite',
            'Workflow marketplace',
            'AI agents (25)',
            'White-label options',
            'Priority support',
        ],
    },
    enterprise: {
        name: 'Enterprise',
        price: 499,
        interval: 'month' as const,
        stripePriceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
        features: [
            'Everything in Business',
            'Unlimited AI credits',
            'Unlimited AI agents',
            'Custom integrations',
            'Dedicated support',
            'SLA guarantees',
            'Custom contracts',
        ],
    },
}

export async function createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string
) {
    return await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
    })
}

export async function createCustomerPortalSession(
    customerId: string,
    returnUrl: string
) {
    return await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    })
}
