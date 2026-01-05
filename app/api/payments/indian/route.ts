import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { method, amount, planId, customerDetails } = body

        const supabase = createClient()

        // Create order record
        const orderId = `ORD${Date.now()}`
        const { data: order, error } = await supabase
            .from('orders')
            .insert({
                order_id: orderId,
                amount,
                currency: 'INR',
                payment_method: method,
                status: 'pending',
                customer_email: customerDetails.email,
                customer_name: customerDetails.name,
                customer_phone: customerDetails.phone,
                plan_id: planId,
            })
            .select()
            .single()

        if (error) throw error

        // Return payment details based on method
        let paymentData = {}

        switch (method) {
            case 'payu':
                paymentData = {
                    merchantKey: process.env.PAYU_MERCHANT_KEY,
                    txnid: orderId,
                    amount,
                    productinfo: 'HumanAI Subscription',
                    firstname: customerDetails.name,
                    email: customerDetails.email,
                    phone: customerDetails.phone,
                    surl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
                    furl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure`,
                }
                break

            case 'cashfree':
                // Create Cashfree order via API
                const cfResponse = await fetch(
                    `${process.env.CASHFREE_MODE === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg'}/orders`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-client-id': process.env.CASHFREE_APP_ID || '',
                            'x-client-secret': process.env.CASHFREE_SECRET_KEY || '',
                            'x-api-version': '2023-08-01',
                        },
                        body: JSON.stringify({
                            order_id: orderId,
                            order_amount: amount,
                            order_currency: 'INR',
                            customer_details: {
                                customer_id: customerDetails.email,
                                customer_name: customerDetails.name,
                                customer_email: customerDetails.email,
                                customer_phone: customerDetails.phone,
                            },
                        }),
                    }
                )
                paymentData = await cfResponse.json()
                break

            case 'upi':
                paymentData = {
                    vpa: process.env.UPI_MERCHANT_VPA || 'merchant@upi',
                    amount,
                    name: 'HumanAI',
                    note: 'Subscription Payment',
                    transactionId: orderId,
                }
                break
        }

        return NextResponse.json({
            orderId,
            method,
            paymentData,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
