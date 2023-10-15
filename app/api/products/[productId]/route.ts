import mongoConnect from "@/lib/mongoConnect"
import { NextRequest, NextResponse } from "next/server"
import Product from "@/models/product";
import getSignedinUser from "@/app/actions/getSignedinUser";
import User from "@/models/user";

interface IParams {
    productId?: string
}

export async function GET(NextRequest: Request, { params }: { params: IParams }) {
    await mongoConnect()

    const { productId } = params;
    if (!productId || typeof productId !== "string") throw new Error("Invalid product id.")

    const query = Product.findById(params.productId)
        .populate({ path: "productreviews.user", model: User })

    const product = await query?.exec()
    return NextResponse.json(product)
}

export async function DELETE(NextRequest: Request, { params }: { params: IParams }) {
    const user = await getSignedinUser()
    if (user.role !== "admin")
        return NextResponse.error()

    const { productId } = params;
    if (!productId || typeof productId !== "string") throw new Error("Invalid product id.")

    await mongoConnect()
    const product = await Product.findByIdAndDelete(productId)
    return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params }: { params: IParams }) {
    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    const { productId } = params;
    if (!productId || typeof productId !== "string") throw new Error("Invalid product id.")

    const body = await request.json()
    const { ratings, comment } = body

    await mongoConnect()
    let product = await Product.findById(productId)

    const alreadyReviewed = product?.productreviews?.find((pr: any) => pr.user.toString() === user._id)

    if (alreadyReviewed) {
        return NextResponse.json({ message: "You have already reviewed the product" })
    } else {
        product?.productreviews?.push({
            user: user._id, comment, ratings
        })
    }

    product.ratings = product.productreviews
        .reduce((acc: number, curr: any) => acc + curr.ratings, 0) /
        product.productreviews.length

    await product.save()
    return NextResponse.json(product)
}