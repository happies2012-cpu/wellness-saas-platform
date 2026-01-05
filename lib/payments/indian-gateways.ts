// PayU Payment Integration
export interface PayUConfig {
    merchantKey: string
    merchantSalt: string
    mode: 'test' | 'production'
}

export interface PayUPaymentParams {
    txnid: string
    amount: number
    productinfo: string
    firstname: string
    email: string
    phone: string
    surl: string // success URL
    furl: string // failure URL
}

export function generatePayUHash(
    params: PayUPaymentParams,
    config: PayUConfig
): string {
    const { merchantKey, merchantSalt } = config
    const { txnid, amount, productinfo, firstname, email } = params

    const hashString = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${merchantSalt}`

    // In production, use crypto.createHash
    return hashString // Placeholder - implement actual SHA-512 hash
}

export function initiatePayUPayment(
    params: PayUPaymentParams,
    config: PayUConfig
) {
    const hash = generatePayUHash(params, config)
    const payuUrl = config.mode === 'production'
        ? 'https://secure.payu.in/_payment'
        : 'https://test.payu.in/_payment'

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = payuUrl

    const fields = {
        key: config.merchantKey,
        ...params,
        hash,
    }

    Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = String(value)
        form.appendChild(input)
    })

    document.body.appendChild(form)
    form.submit()
}

// Cashfree Payment Integration
export interface CashfreeConfig {
    appId: string
    secretKey: string
    mode: 'test' | 'production'
}

export interface CashfreeOrderParams {
    orderId: string
    orderAmount: number
    orderCurrency: string
    customerName: string
    customerEmail: string
    customerPhone: string
    returnUrl: string
    notifyUrl: string
}

export async function createCashfreeOrder(
    params: CashfreeOrderParams,
    config: CashfreeConfig
) {
    const baseUrl = config.mode === 'production'
        ? 'https://api.cashfree.com/pg'
        : 'https://sandbox.cashfree.com/pg'

    const response = await fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-client-id': config.appId,
            'x-client-secret': config.secretKey,
            'x-api-version': '2023-08-01',
        },
        body: JSON.stringify({
            order_id: params.orderId,
            order_amount: params.orderAmount,
            order_currency: params.orderCurrency,
            customer_details: {
                customer_id: params.customerEmail,
                customer_name: params.customerName,
                customer_email: params.customerEmail,
                customer_phone: params.customerPhone,
            },
            order_meta: {
                return_url: params.returnUrl,
                notify_url: params.notifyUrl,
            },
        }),
    })

    return response.json()
}

// UPI Payment Integration
export interface UPIPaymentParams {
    vpa: string // Virtual Payment Address (UPI ID)
    amount: number
    name: string
    note: string
    transactionId: string
}

export function generateUPILink(params: UPIPaymentParams): string {
    const { vpa, amount, name, note, transactionId } = params

    return `upi://pay?pa=${vpa}&pn=${encodeURIComponent(name)}&am=${amount}&tn=${encodeURIComponent(note)}&tr=${transactionId}`
}

export function initiateUPIPayment(params: UPIPaymentParams) {
    const upiLink = generateUPILink(params)
    window.location.href = upiLink
}

// Combined Payment Gateway
export type PaymentMethod = 'payu' | 'cashfree' | 'upi'

export interface PaymentConfig {
    method: PaymentMethod
    payu?: PayUConfig
    cashfree?: CashfreeConfig
}

export async function processPayment(
    method: PaymentMethod,
    amount: number,
    customerDetails: {
        name: string
        email: string
        phone: string
    },
    config: PaymentConfig
) {
    const orderId = `ORD${Date.now()}`

    switch (method) {
        case 'payu':
            if (!config.payu) throw new Error('PayU config missing')
            initiatePayUPayment(
                {
                    txnid: orderId,
                    amount,
                    productinfo: 'HumanAI Subscription',
                    firstname: customerDetails.name,
                    email: customerDetails.email,
                    phone: customerDetails.phone,
                    surl: `${window.location.origin}/payment/success`,
                    furl: `${window.location.origin}/payment/failure`,
                },
                config.payu
            )
            break

        case 'cashfree':
            if (!config.cashfree) throw new Error('Cashfree config missing')
            const order = await createCashfreeOrder(
                {
                    orderId,
                    orderAmount: amount,
                    orderCurrency: 'INR',
                    customerName: customerDetails.name,
                    customerEmail: customerDetails.email,
                    customerPhone: customerDetails.phone,
                    returnUrl: `${window.location.origin}/payment/success`,
                    notifyUrl: `${window.location.origin}/api/payments/cashfree/webhook`,
                },
                config.cashfree
            )
            window.location.href = order.payment_link
            break

        case 'upi':
            initiateUPIPayment({
                vpa: 'merchant@upi', // Replace with actual merchant UPI
                amount,
                name: 'HumanAI',
                note: 'Subscription Payment',
                transactionId: orderId,
            })
            break
    }
}
