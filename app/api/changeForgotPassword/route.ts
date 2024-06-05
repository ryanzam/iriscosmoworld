import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server"
import mongoConnect from "@/lib/mongoConnect"
import { emailNewPasswordChanged } from "@/utils/mailer";

export async function PUT(request: NextRequest) {
    await mongoConnect()
    const body = await request.json()
    const { email, password } = body

    const userFound = await User.findOne({ email });
    if (!userFound) {
        return NextResponse.error()
    }

    userFound.password = password
    userFound.resetPasswordExpired = true

    await userFound.save()
    await emailNewPasswordChanged(email)
    return NextResponse.json({ message: "password changed", success: true })
}

