import mongoConnect from "@/lib/mongoConnect"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/user"
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
    const total = await User.countDocuments()

    if (params.size > 0) {
        if (params.has("page")) {
            currentPage = Number(params.get("page")) || 1
            const skip = pageSize * (currentPage - 1)
            query = User.find()
                .sort({ createdAt: -1 }).skip(skip).limit(pageSize)
        }

    } else {
        query = User.find()
            .sort({ createdAt: -1 })
            .limit(pageSize)
    }

    const users = await query?.exec()
    const response = {
        users,
        pageSize,
        total
    }
    return NextResponse.json(response)
}

export async function PUT(request: NextRequest) {
    const user = await getSignedinUser()
    if (user?.role !== "admin")
        return NextResponse.error()

    const body = await request.json()
    const { id, ...newUser } = body

    if (!id || typeof id !== "string") throw new Error("Invalid order id.")

    await mongoConnect()
    const order = await User.findByIdAndUpdate(id, newUser)

    return NextResponse.json(order)
}