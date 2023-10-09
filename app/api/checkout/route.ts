import getSignedinUser from "@/app/actions/getSignedinUser";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-08-16"
})

export async function POST(request: NextRequest) {
    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()
    
    const body = await request.json()
    const { deliveryInfomation, items } = body

    const line_items = items.map((itm: any) => {
        return {
            price_data: {
                currency: "eur",
                product_data: {
                    name: itm.name,
                    metadata: { productId: itm.id }
                },
                unit_amount: itm.price * 100
            },
            quantity: itm.quantity,
            tax_rates: ["txr_1Nyy0hBkufHaUMANZXXxARfH"]
        }
    })

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: `${process.env.BASE_URL}/user/orders?order_confirm=true`,
            cancel_url: `${process.env.BASE_URL}`,
            client_reference_id: user._id,
            customer_email: user.email,
            mode: "payment",
            shipping_options: [{
                shipping_rate: "shr_1NyxvLBkufHaUMANvcpBwpgB"
            }],
            line_items: line_items
        })

        return new NextResponse(session.url);
    } catch (error: any) {
        return NextResponse.error()
    }
}