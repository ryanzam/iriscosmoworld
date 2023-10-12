import mongoConnect from "@/lib/mongoConnect"
import { NextResponse } from "next/server"
import Product from "@/models/product";
import getAdminRole from "@/app/actions/getAdminRoles";

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
    const user = await getAdminRole()
    if (!user)
        return NextResponse.error()
    
    await mongoConnect()

    const { productId } = params;
    if(!productId || typeof productId !== "string") throw new Error("Invalid product id.")

    const product = await Product.findByIdAndDelete(params.productId)
    return NextResponse.json(product)
}