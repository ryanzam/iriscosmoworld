import mongoConnect from "@/lib/mongoConnect"
import { NextResponse } from "next/server"
import Product from "@/models/product";
import getSignedinUser from "@/app/actions/getSignedinUser";

interface IParams {
    productId?: string
}

export async function GET(request: Request, {params}: {params: IParams}) {
    await mongoConnect()

    const { productId } = params;
    if(!productId || typeof productId !== "string") throw new Error("Invalid product id.")

    const product = await Product.findById(params.productId)
    return NextResponse.json(product)
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const user = await getSignedinUser()
    if (user.role !== "admin")
        return NextResponse.error()
    
    const { productId } = params;
    if(!productId || typeof productId !== "string") throw new Error("Invalid product id.")

    await mongoConnect()
    const product = await Product.findByIdAndDelete(params.productId)
    return NextResponse.json(product)
}