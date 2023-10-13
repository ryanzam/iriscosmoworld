import mongoConnect from "@/lib/mongoConnect"
import { NextResponse } from "next/server"
import Order from "@/models/order";
import getSignedinUser from "@/app/actions/getSignedinUser";

interface IParams {
    orderId?: string
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const user = await getSignedinUser()

    if (user.role !== "admin")
        return NextResponse.error()
    
    await mongoConnect()

    const { orderId } = params;
    if(!orderId || typeof orderId !== "string") throw new Error("Invalid order id.")

    const order = await Order.findByIdAndDelete(params.orderId)
    return NextResponse.json(order)
}