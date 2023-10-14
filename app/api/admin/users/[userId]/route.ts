import mongoConnect from "@/lib/mongoConnect"
import { NextResponse } from "next/server"
import User from "@/models/order";
import getSignedinUser from "@/app/actions/getSignedinUser";

interface IParams {
    userId?: string
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const user = await getSignedinUser()

    if (user.role !== "admin")
        return NextResponse.error()
    
    await mongoConnect()

    const { userId } = params;
    if(!userId || typeof userId !== "string") throw new Error("Invalid user id.")

    const users = await User.findByIdAndDelete(params.userId)
    return NextResponse.json(users)
}