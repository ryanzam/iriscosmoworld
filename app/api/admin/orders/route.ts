import mongoConnect from "@/lib/mongoConnect"
import { NextRequest, NextResponse } from "next/server"
import Order from "@/models/order"
import Address from "@/models/address"
import getSignedinUser from "@/app/actions/getSignedinUser"

export async function GET(request: NextRequest) {
    const user = await getSignedinUser()

    if (!(user?.role === "admin"))
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
            query = Order.find()
                .populate("user")
                .populate({ path: "deliveryInfo", model: Address })
                .sort({ createdAt: -1 }).skip(skip).limit(pageSize)
        }

    } else {
        query = Order.find()
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

export async function PUT(request: NextRequest) {
    const user = await getSignedinUser()

    if (!(user?.role === "admin"))
        return NextResponse.error()

    const body = await request.json()
    const { id, orderStatus } = body
    if(!id || typeof id !== "string") throw new Error("Invalid order id.")

    await mongoConnect()
    const order = await Order.findByIdAndUpdate(id, { orderStatus })

    return NextResponse.json(order)
}