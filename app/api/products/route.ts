import Product from "@/models/product";
import { NextRequest, NextResponse } from "next/server"
import mongoConnect from "@/lib/mongoConnect"
import getSignedinUser from "@/app/actions/getSignedinUser";

export async function PUT(request: Request) {
    const user = await getSignedinUser()

    if (user.role !== "admin")
        return NextResponse.error()

    await mongoConnect()

    const body = await request.json()
    const { id, ...newProduct } = body
    if(!id || typeof id !== "string") throw new Error("Invalid product id.")

    const product = await Product.findByIdAndUpdate(id, newProduct)
    return NextResponse.json(product)
}

export async function POST(request: NextRequest) {
    
    const user = await getSignedinUser()

    if (user.role !== "admin")
        return NextResponse.error()

    const body = await request.json()
    
    await mongoConnect()    
    const product = await Product.create({...body, user: user._id})
    return NextResponse.json(product)
}

export async function GET(request: NextRequest) {
    const params: URLSearchParams = request.nextUrl.searchParams

    let query
    let pageSize = 9
    let currentPage
    let total

    await mongoConnect()
    
    if(params.size === 0) {
        total = await Product.countDocuments()
        query = Product.find().sort({ createdAt: -1 }).limit(pageSize)
    }

    if(params.size === 1 && params.has("page")) {
        total = await Product.countDocuments()
        currentPage = Number(params.get("page")) || 1
        const skip = pageSize * (currentPage - 1)
        query = Product.find().skip(skip).sort({ createdAt: -1 }).limit(pageSize)
    }

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
            }).limit(pageSize)
        }
        if (params.has("page")) {
            total = await Product.countDocuments()
            currentPage = Number(params.get("page")) || 1
            const skip = pageSize * (currentPage - 1)
            query = Product.find().skip(skip).sort({ createdAt: -1 }).limit(pageSize)
        } 

    } 

    const products = await query?.exec()
    const response = {
        products,
        pageSize,
        total
    }
    return NextResponse.json(response)
}