import getSignedinUser from "@/app/actions/getSignedinUser"
import mongoConnect from "@/lib/mongoConnect"
import { emailOrder } from "@/utils/mailer"
import { NextRequest, NextResponse } from "next/server"

mongoConnect()

export async function POST(request: NextRequest) {
    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    const body = await request.json()
    const { address, total } = body
    emailOrder(user, address, total)
    return NextResponse.json({})
}