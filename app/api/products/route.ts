import Product from "@/models/product";
import { NextResponse } from "next/server"
import mongoConnect from "@/lib/mongoConnect"

export async function POST(request: Request) {  
    await mongoConnect()  
    const body = await request.json()

    const product = await Product.create(body)
    return NextResponse.json(product)
}

export async function GET() {
    await mongoConnect()
    const products = await Product.find()
    return NextResponse.json(products)
}