import mongoConnect from "@/lib/mongoConnect"
import { NextResponse } from "next/server"
import Product from "@/models/product";

interface IParams {
    productId?: string
}

export async function GET(request: Request, {params}: {params: IParams}) {
    await mongoConnect()
    console.log(params)
    const { productId } = params;
    if(!productId || typeof productId !== "string") throw new Error("Invalid product id.")

    const product = await Product.findById(params.productId)
    return NextResponse.json(product)
}