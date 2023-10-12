import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server"
import mongoConnect from "@/lib/mongoConnect"
import getSignedinUser from "@/app/actions/getSignedinUser";

export async function POST(request: NextRequest) {

    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    await mongoConnect()
    const body = await request.json()
    
    const product = await Product.create({...body, user: user._id})
    return NextResponse.json(product)
}

export async function GET(request: NextRequest) {
    await mongoConnect()

    const params: URLSearchParams = request.nextUrl.searchParams

    let query
    let pageSize = 4
    let currentPage

    const total = await Product.countDocuments()

    if (params.size > 0) {

        if (params.has("ratings")) {
            query = Product.find({
                "ratings": {
                    $eq: params.get("ratings")
                }
            })
        }
        if (params.has("category")) {
            query = Product.find({
                "category": {
                    $eq: params.get("category")
                }
            })
        }
        if (params.has("min") && params.has("max")) {
            query = Product.find({
                "price": {
                    $gt: params.get("min"),
                    $lt: params.get("max")
                }
            })
        }
        if (params.has("search")) {
            query = Product.find({
                "name": {
                    $regex: params.get("search"), $options: "i"
                }
            }).limit(5)
        }
        if (params.has("page")) {
            currentPage = Number(params.get("page")) || 1
            const skip = pageSize * (currentPage - 1)
            query = Product.find().skip(skip).limit(pageSize)
        }

    } else {
        query = Product.find().limit(pageSize)
    }

    const products = await query?.exec()
    const response = {
        products,
        pageSize,
        total
    }
    return NextResponse.json(response)
}