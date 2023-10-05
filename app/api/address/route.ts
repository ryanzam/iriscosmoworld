import Address from "@/models/address";
import { NextRequest, NextResponse } from "next/server"
import mongoConnect from "@/lib/mongoConnect"
import getSignedinUser from "@/app/actions/getSignedinUser";

export async function POST(request: NextRequest) {
    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    await mongoConnect()
    const body = await request.json()

    const address = await Address.create({ ...body, user: user._id })
    return NextResponse.json(address)
}

export async function GET() {
    const user = await getSignedinUser()

    if (!user)
        return NextResponse.error()

    await mongoConnect()

    const address = await Address.find({ user: user._id })
    
    return NextResponse.json(address)
}

export async function PUT(request: NextRequest) {
    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    await mongoConnect()
    const body = await request.json()
    const { id, ...newAddr } = body
    const address = await Address.findByIdAndUpdate(id, newAddr)
    return NextResponse.json(address)
}