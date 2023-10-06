import getSignedinUser from "@/app/actions/getSignedinUser"
import mongoConnect from "@/lib/mongoConnect"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/user";

export async function PUT(request: NextRequest) {
    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    await mongoConnect()
    const body = await request.json()
    const { id, ...newProfile } = body
    const updatedUser = await User.findByIdAndUpdate(id, newProfile)
    return NextResponse.json(updatedUser)
}