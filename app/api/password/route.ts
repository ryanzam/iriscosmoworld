import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server"
import mongoConnect from "@/lib/mongoConnect"
import getSignedinUser from "@/app/actions/getSignedinUser";
import bcrypt from "bcryptjs"

export async function PUT(request: NextRequest) {

    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    await mongoConnect()
    const body = await request.json()
    const { id, currentPassword, password } = body

    const usr = await User.findById(id).select("+password")

    const matchedPasswords = await bcrypt.compare(currentPassword, usr.password)

    if (!matchedPasswords)
        return NextResponse.error()

    usr.password = password
    await usr.save()

    return NextResponse.json({ message: "password changed", success: true})
}
