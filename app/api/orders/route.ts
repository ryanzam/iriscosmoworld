import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/order";
import mongoConnect from "@/lib/mongoConnect";
import getSignedinUser from "@/app/actions/getSignedinUser";
import Address from "@/models/address";

export async function POST(request: NextRequest) {
    try {
        const user = await getSignedinUser()
        if (!user)
            return NextResponse.error()

        const body = await request.json()
        const { address, cartItems, netTotal } = body

        const itemsOrdered = await getItemsInCart(cartItems);

        const paymentInfo = {
            id: user._id + new Date().getMilliseconds(),
            paidAmount: netTotal,
            paidTax: 0,
            paymentStatus: "DONE",
        };

        const data = {
            user: user._id,
            paymentInfo,
            orderItems: itemsOrdered,
            deliveryInfo: address._id
        }

        const order = await Order.create(data)

        return NextResponse.json(order)
    }
    catch (err) {
        return NextResponse.error()
    }
}

async function getItemsInCart(line_items: any) {
    return new Promise((resolve, reject) => {
        let items: any = [];

        line_items?.forEach(async (itm: any) => {

            items.push({
                product: itm.id,
                name: itm.name,
                price: itm.price,
                quantity: itm.quantity,
                image: itm.image,
            });

            if (items.length === line_items?.length) {
                resolve(items);
            }
        });
    });
}

export async function GET(request: NextRequest) {
    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    const params: URLSearchParams = request.nextUrl.searchParams

    let query
    let pageSize = 4
    let currentPage

    await mongoConnect()
    const total = await Order.countDocuments()

    if (params.size > 0) {
        if (params.has("page")) {
            currentPage = Number(params.get("page")) || 1
            const skip = pageSize * (currentPage - 1)
            query = Order.find({ user: user._id })
                .populate("user")
                .populate({ path: "deliveryInfo", model: Address })
                .sort({ createdAt: -1 }).skip(skip).limit(pageSize)
        }

    } else {
        query = Order.find({ user: user._id })
            .populate("user")
            .populate({ path: "deliveryInfo", model: Address })
            .sort({ createdAt: -1 })
            .limit(pageSize)
    }

    const orders = await query?.exec()
    const response = {
        orders,
        pageSize,
        total
    }

    return NextResponse.json(response)
}