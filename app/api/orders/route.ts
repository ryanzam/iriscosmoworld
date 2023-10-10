import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Order from "@/models/order";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: "2023-08-16"
})

export async function POST(request: NextRequest) {
const body = await request.text();
    const wbSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const signature = headers().get("stripe-signature") as string;

    try {                
        const event: any = stripe.webhooks.constructEvent(body, signature, wbSecret);
        
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            const line_items = await stripe.checkout.sessions.listLineItems(
                event.data.object.id
            );
            
            const itemsOrdered = await getItemsInCart(line_items);
            const paidAmount = session.amount_total / 100;

            const paymentInfo = {
                id: session.payment_intent,
                paidAmount,
                paidTax: session.total_details.amount_tax / 100,
                paymentStatus: session.payment_status,
            };

            const data = {
                user: session.metadata.userId,
                paymentInfo,
                orderItems: itemsOrdered,
                deliveryInfo: session.metadata.deliveryId,
                orderStatus: session.status
            }
            const order = await Order.create(data)

            return NextResponse.json(order)
        } 
    } catch (err) {
        return NextResponse.error()
    }
}

async function getItemsInCart(line_items: any) {
    return new Promise((resolve, reject) => {
        let items: any = [];

        line_items?.data?.forEach(async (itm: any) => {
            const product = await stripe.products.retrieve(itm.price.product);
            const productId = product.metadata.productId;

            items.push({
                product: productId,
                name: product.name,
                price: itm.price.unit_amount_decimal / 100,
                quantity: itm.quantity,
                image: product.images.length === 0 ? "" : product.images[0],
            });

            if (items.length === line_items?.data.length) {
                resolve(items);
            }
        });
    });
}
