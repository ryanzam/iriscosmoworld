import getSignedinUser from "@/app/actions/getSignedinUser"
import mongoConnect from "@/lib/mongoConnect"
import { emailStatusOrder } from "@/utils/mailer"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {
    await mongoConnect()

    const user = await getSignedinUser()
    if (!user)
        return NextResponse.error()

    const body = await request.json()
    const { email, orderStatus } = body
    emailStatusOrder(email, orderStatus)
    return NextResponse.json({})
}